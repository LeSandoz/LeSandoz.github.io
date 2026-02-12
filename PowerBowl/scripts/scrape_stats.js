import fs from 'fs';
import path from 'path';
import axios from 'axios'; // 👈 改回使用強大的 axios
import https from 'https';
import { fileURLToPath } from 'url';

// ================= ⚙️ 設定區 (Configuration) =================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../lanetalk_extended_history.json');
const BASE_URL = 'https://shared.lanetalk.com/';
const SAVE_INTERVAL = 10;
const MIN_DELAY = 1000;
const MAX_DELAY = 2500;

// ================= 🛠️ 工具函式 (Helpers) =================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomDelay = () => {
    const ms = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY);
    return sleep(ms);
};

// 💎 改用 Axios 來抓網頁，穩定度提升 200%
const fetchHtml = async (url) => {
    try {
        const response = await axios.get(url, {
            // 忽略 SSL 錯誤 (公司防火牆對策)
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            },
            timeout: 15000 // 15秒超時設定
        });
        return response.data;
    } catch (error) {
        // 如果是 404，代表網頁不存在，回傳 null
        if (error.response && error.response.status === 404) return null;
        throw error;
    }
};

const extractStats = (html) => {
    if (!html) return null; // 如果沒抓到網頁就跳過
    
    const stats = {};
    
    // 1. 抓取圓餅圖數據
    const pieRegex = /let\s+data\s*=\s*\[\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\]/;
    const pieMatch = html.match(pieRegex);
    
    if (pieMatch) {
        stats.strikePct = parseFloat(pieMatch[1]);
        stats.sparePct = parseFloat(pieMatch[2]);
        stats.splitPct = parseFloat(pieMatch[3]);
    }

    // 2. 抓取 Pocket Hits
    const pocketRegex = /Pocket hits[\s\S]{1,150}?(\d+(?:\.\d+)?)%/i;
    const pocketMatch = html.match(pocketRegex);
    if (pocketMatch) {
        stats.pocketHitsPct = parseFloat(pocketMatch[1]);
    }

    // 3. 抓取 Carry
    const carryRegex = /Carry[\s\S]{1,150}?(\d+(?:\.\d+)?)%/i;
    const carryMatch = html.match(carryRegex);
    if (carryMatch) {
        stats.carryPct = parseFloat(carryMatch[1]);
    }

    return Object.keys(stats).length > 0 ? stats : null;
};

// ================= 🚀 主程式 (Main Execution) =================

(async () => {
    console.log('⛏️ 啟動 LaneTalk 數據礦工 (Axios 版)...');

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌ 找不到輸入檔案: ${INPUT_FILE}`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
    let matches = [];
    try {
        matches = JSON.parse(rawData);
    } catch (e) {
        console.error('❌ JSON 解析失敗');
        process.exit(1);
    }

    console.log(`📂 已載入 ${matches.length} 筆比賽紀錄。`);

    let updatedCount = 0;
    let processedCount = 0;

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];

        if (!match.blockId) continue;
        
        // 斷點續傳：已有資料就跳過
        if (match.stats && !match.stats.empty && !process.argv.includes('--force')) {
            continue;
        }

        const url = `${BASE_URL}${match.blockId}`;
        
        try {
            process.stdout.write(`[${i + 1}/${matches.length}] 挖掘 ${match.blockId.substring(0,8)}... `);
            
            const html = await fetchHtml(url);
            const extracted = extractStats(html);

            if (extracted) {
                match.stats = extracted;
                updatedCount++;
                console.log(`✅ 成功! Strike: ${extracted.strikePct}%`);
            } else {
                match.stats = { empty: true }; 
                console.log(`⚠️ 無數據`);
            }

        } catch (err) {
            console.log(`❌ 失敗: ${err.message}`);
        }

        processedCount++;

        // 定期存檔
        if (processedCount % SAVE_INTERVAL === 0) {
            fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
            process.stdout.write(`(💾 存檔) `);
        }

        await randomDelay();
    }

    fs.writeFileSync(INPUT_FILE, JSON.stringify(matches, null, 2));
    console.log('\n🎉 挖掘完成！');
    console.log(`📊 共更新 ${updatedCount} 筆數據。`);
})();