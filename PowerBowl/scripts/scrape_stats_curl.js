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

// ================= 🛠️ 核心工具：CURL 執行器 =================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const curlFetch = (url) => {
    return new Promise((resolve, reject) => {
        // 🔍 診斷模式修改：
        // 1. 移除 -s (靜音)，改用 -v (顯示詳細除錯資訊)
        // 2. 移除 -L (自動轉址)，有時候轉址會造成問題，我們先抓第一層看看
        // 3. 簡化 User-Agent，避免 Windows CMD 引號解析問題
        // 4. 保留 --ssl-no-revoke (這是對付你公司防火牆的關鍵)
        
        const command = `curl --ssl-no-revoke -k -v -A "Chrome" "${url}"`;

        // 執行指令，並加大緩衝區以免 log 被切斷
        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                // ❌ 發生錯誤時，回傳 stderr (錯誤詳情)
                // 有時候 curl 雖然成功抓到網頁，但因為 -v 輸出太多資訊到 stderr，node 會誤判為 error，所以這裡要判斷 stdout 是否有內容
                if (stdout && stdout.length > 500) {
                    resolve(stdout);
                } else {
                    reject(new Error(`CURL Error:\n${stderr}`)); // 把詳細錯誤吐出來
                }
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
    console.log('🚑 啟動 CURL 診斷模式 (Verbose Mode)...');

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

        // 如果已經有資料，就跳過
        if (match.stats && !match.stats.empty) {
            continue;
        }

        const url = `${BASE_URL}${match.blockId}`;
        process.stdout.write(`[${i + 1}/${matches.length}] ${match.blockId.substring(0,6)}... `);

        try {
            const html = await curlFetch(url);
            
            // 檢查內容是否過短 (例如只抓到 403 Forbidden 頁面)
            if (html.length < 500) {
                console.log('⚠️ 內容過短，可能被阻擋或網址錯誤');
                // 在診斷模式下，我們印出前 200 個字來看看抓到了什麼
                console.log(`   HTML預覽: ${html.substring(0, 200).replace(/\n/g, ' ')}`);
            } else {
                const extracted = extractStats(html);
                if (extracted) {
                    match.stats = extracted;
                    updatedCount++;
                    console.log(`✅ Strike: ${extracted.strikePct}%`);
                } else {
                    match.stats = { empty: true };
                    console.log(`⚠️ 無數據 (但連線成功)`);
                }
            }
        } catch (err) {
            console.log(`❌ 失敗!`);
            console.log('---------------- 錯誤詳情 (請截圖給我) ----------------');
            console.log(err.message); // 這裡會印出 curl -v 的所有連線細節
            console.log('----------------------------------------------------');
            
            // 為了避免洗版，如果遇到錯誤我們就先暫停程式，讓你截圖
            console.log('🛑 程式暫停，請檢查上方錯誤訊息。');
            process.exit(1);
        }

        processedCount++;
        if (processedCount % SAVE_INTERVAL === 0) {
            fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
        }

        await sleep(1000); // 診斷模式慢一點
    }

    fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
    console.log(`\n🎉 任務完成。共更新 ${updatedCount} 筆。`);
})();