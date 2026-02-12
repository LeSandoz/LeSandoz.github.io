import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// ================= ⚙️ 設定區 =================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../lanetalk_extended_history.json');
const BASE_URL = 'https://shared.lanetalk.com/';
const SAVE_INTERVAL = 10;

// ================= 🛠️ 核心工具：PowerShell 執行器 =================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const psFetch = (url) => {
    return new Promise((resolve, reject) => {
        // 這是最關鍵的一行！
        // 我們召喚 PowerShell，並強制使用 TLS 1.2 (許多防火牆只吃這個)
        // 然後偽裝成標準瀏覽器
        const psCommand = `
            [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
            $userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
            try {
                $response = Invoke-WebRequest -Uri '${url}' -UseBasicParsing -UserAgent $userAgent -TimeoutSec 15;
                Write-Output $response.Content;
            } catch {
                Write-Error $_.Exception.Message;
                exit 1;
            }
        `;

        // 將多行指令壓縮成一行，並移除換行符號以免干擾 exec
        const flatCommand = psCommand.replace(/\s+/g, ' ').trim();
        const command = `powershell -NoProfile -ExecutionPolicy Bypass -Command "${flatCommand.replace(/"/g, '\\"')}"`;

        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                // 如果 PowerShell 報錯，通常 stderr 會有訊息
                reject(new Error(stderr || stdout || error.message));
                return;
            }
            resolve(stdout);
        });
    });
};

const extractStats = (html) => {
    if (!html) return null;
    const stats = {};
    
    // 1. 抓圓餅圖數據
    const pieRegex = /let\s+data\s*=\s*\[\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\]/;
    const pieMatch = html.match(pieRegex);
    
    if (pieMatch) {
        stats.strikePct = parseFloat(pieMatch[1]);
        stats.sparePct = parseFloat(pieMatch[2]);
        stats.splitPct = parseFloat(pieMatch[3]);
    }

    // 2. 抓 Pocket Hits
    const pocketRegex = /Pocket hits[\s\S]{1,150}?(\d+(?:\.\d+)?)%/i;
    const pocketMatch = html.match(pocketRegex);
    if (pocketMatch) {
        stats.pocketHitsPct = parseFloat(pocketMatch[1]);
    }

    return Object.keys(stats).length > 0 ? stats : null;
};

// ================= 🚀 主程式 =================

(async () => {
    console.log('⚡ 啟動 PowerShell 隱形戰機爬蟲...');

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌ 找不到檔案: ${INPUT_FILE}`);
        process.exit(1);
    }

    const matches = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
    console.log(`📂 目標：${matches.length} 筆資料`);

    let updatedCount = 0;
    let processedCount = 0;

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (!match.blockId) continue;

        // 斷點續傳：已有資料就跳過
        if (match.stats && !match.stats.empty) {
            continue;
        }

        const url = `${BASE_URL}${match.blockId}`;
        process.stdout.write(`[${i + 1}/${matches.length}] ${match.blockId.substring(0,6)}... `);

        try {
            const html = await psFetch(url);
            
            // 檢查是否抓到資料
            const extracted = extractStats(html);
            if (extracted) {
                match.stats = extracted;
                updatedCount++;
                console.log(`✅ Strike: ${extracted.strikePct}%`);
            } else {
                match.stats = { empty: true };
                // 為了不讓畫面太亂，只印出前 50 個字檢查是不是被導向登入頁
                const preview = html.substring(0, 50).replace(/\s+/g, ' ');
                console.log(`⚠️ 無數據 (HTML: ${preview}...)`);
            }
            
        } catch (err) {
            // PowerShell 的錯誤通常比較乾淨
            console.log(`❌ PS 失敗: ${err.message.split('\n')[0]}`); // 只印第一行錯誤
        }

        processedCount++;
        if (processedCount % SAVE_INTERVAL === 0) {
            fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
        }

        // PowerShell 比較重，間隔稍微久一點點
        await sleep(800 + Math.random() * 500); 
    }

    fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
    console.log(`\n🎉 任務完成。共更新 ${updatedCount} 筆。`);
})();