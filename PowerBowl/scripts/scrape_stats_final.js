import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// ================= ⚙️ 設定區 =================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../lanetalk_extended_history.json');
// 指向我們剛剛建立的 .ps1 檔案
const PS_SCRIPT = path.join(__dirname, 'fetch.ps1'); 
const BASE_URL = 'https://shared.lanetalk.com/';
const SAVE_INTERVAL = 10;

// ================= 🛠️ 核心工具：呼叫外部 PS 檔案 =================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const runPowerShell = (url) => {
    return new Promise((resolve, reject) => {
        // 這種呼叫方式最乾淨，不會有引號問題
        const command = `powershell -NoProfile -ExecutionPolicy Bypass -File "${PS_SCRIPT}" "${url}"`;

        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                // 優先回傳 stdout 裡的 "ERROR:" 訊息，如果沒有才回傳系統錯誤
                const errorMsg = stdout.includes('ERROR:') ? stdout.trim() : (stderr || error.message);
                reject(new Error(errorMsg));
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
    console.log('🤖 啟動外掛式 PowerShell 爬蟲...');
    console.log(`📜 使用腳本: ${PS_SCRIPT}`);

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌ 找不到檔案: ${INPUT_FILE}`);
        process.exit(1);
    }
    
    if (!fs.existsSync(PS_SCRIPT)) {
        console.error(`❌ 找不到 fetch.ps1，請確認它在 scripts 資料夾內！`);
        process.exit(1);
    }

    const matches = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
    console.log(`📂 目標：${matches.length} 筆資料`);

    let updatedCount = 0;
    let processedCount = 0;

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (!match.blockId) continue;

        if (match.stats && !match.stats.empty) {
            continue;
        }

        const url = `${BASE_URL}${match.blockId}`;
        process.stdout.write(`[${i + 1}/${matches.length}] ${match.blockId.substring(0,6)}... `);

        try {
            const html = await runPowerShell(url);
            
            // 檢查是否抓到資料
            const extracted = extractStats(html);
            if (extracted) {
                match.stats = extracted;
                updatedCount++;
                console.log(`✅ Strike: ${extracted.strikePct}%`);
            } else {
                match.stats = { empty: true };
                // 檢查是否被導向登入頁或其他錯誤
                const preview = html.trim().substring(0, 40).replace(/\n/g, '');
                console.log(`⚠️ 無數據 (HTML開頭: ${preview}...)`);
            }
            
        } catch (err) {
            // 這裡會印出乾淨的錯誤訊息
            console.log(`❌ 失敗: ${err.message.split('\n')[0]}`); 
        }

        processedCount++;
        if (processedCount % SAVE_INTERVAL === 0) {
            fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
        }

        await sleep(1000 + Math.random() * 500); 
    }

    fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
    console.log(`\n🎉 任務完成。共更新 ${updatedCount} 筆。`);
})();