import fs from 'fs';
import path from 'path';
import axios from 'axios';
import https from 'https'; // 引入 https 以忽略憑證錯誤
import { fileURLToPath } from 'url';

// ================= ⚙️ 設定區 (Configuration) =================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
    // 1. 球館 ID
    centerId: '862d3650-ffb8-49d2-8c02-ed91e00032b5',

    // 2. API Key
    apiKey: '8tLtPc8UwWvdvbpzRIr0ifCWy250TXUXrGUn',

    // 3. Authorization Token (使用您最新提供的 cURL 中的 Token)
    authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlVPWkdRajR0In0.eyJpc3MiOiJodHRwczovL2FwaS5sYW5ldGFsay5jb20vdjEvIiwiaWF0IjoxNzcwOTI3NTQ1LCJleHAiOjE3NzM1MTk1NDUsInVzZXJfaWQiOjQ1NzMzNywic2NvcGVzIjpbIm1hdGNoZXMuY3JlYXRlIiwidGFncy5jcmVhdGUiLCJ0YWdzLmVkaXQiLCJ0YWdzLmRlbGV0ZSIsInRhZ3MudmlldyIsInRhZ3Mudmlld19hbGwiLCJ0YWdzLnNlYXJjaCIsInNjb3JlY2FyZHMuZmlsdGVyQnlBcnNlbmFsIiwic2NvcmVjYXJkcy5maWx0ZXJTdGF0c0J5QXJzZW5hbCIsInNjb3JlY2FyZHMuZmlsdGVyU3RhdHNCeVRhZ3MiLCJzY29yZWNhcmRzLmZpbHRlckdhbWVzQnlUYWdzIiwic2NvcmVjYXJkcy5tYW5hZ2VBcnNlbmFsIiwic2NvcmVjYXJkcy5tYW5hZ2VBcnNlbmFsIiwic2NvcmVjYXJkcy5tYW5hZ2VHYW1lc1RhZ3MiLCJzY29yZWNhcmRzLmZpbHRlckJ5R2FtZXNMaW1pdCIsImFyY2hpdmUuY2xhaW1HYW1lc1JldHJvYWN0aXZlbHkiLCJhcmNoaXZlLmNvbXBhcmVTdGF0c0J5VGFncyIsImFyY2hpdmUuY2xhaW1HYW1lc1JldHJvYWN0aXZlbHkiLCJib3dsaW5nY2VudGVyLmxpdmVHYW1lcyJdfQ.KWHCOrx1wGcPL7kPK3C8WF6t8R3sBhLyVQ573oHEDeznAfl19sttK68MoAU3lVC-eE1HxlcKfkgJGv1Vsn9kpA',
    
    // 4. Cookie (關鍵！這是讓伺服器知道你是 VIP 會員的識別證)
    cookie: '_gcl_au=1.1.12297149.1770911791; PHPSESSID=0732c065615b48eae77f9dd024d4b139; userID=457337; _gid=GA1.2.517990233.1770921997; _ga=GA1.1.847438246.1770921997; _ga_PKHQK3MFZX=GS2.1.s1770927533$o2$g1$t1770927554$j39$l0$h0',

    // 5. 輸出檔名 (我們存成一個新檔案，以免覆蓋舊的)
    outputFile: 'lanetalk_extended_history.json',
    
    delayMs: 1500 
};

// ================= 🚀 主程式邏輯 (Main Logic) =================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeLaneTalk() {
    console.log(`\n🕵️‍♂️ LaneTalk 深度爬蟲啟動！(含 Cookie 偽裝)`);
    console.log(`📍 目標球館 ID: ${CONFIG.centerId}`);
    
    // 設定輸出路徑
    const outputPath = path.join(__dirname, '..', CONFIG.outputFile);

    let allGames = [];
    // 策略調整：為了接續之前的進度，我們從第 15 頁開始嘗試
    // (因為之前第 15 頁只有 23 筆，代表那是訪客視角的盡頭，但在會員視角下應該還有更多)
    let page = 15; 
    let hasMore = true;
    let consecutiveErrors = 0;

    while (hasMore) {
        const url = `https://api.lanetalk.com/v1/bowlingcenters/${CONFIG.centerId}/completed/${page}`;

        try {
            process.stdout.write(`⏳ 正在挖掘第 ${page} 頁... `);

            const response = await axios.get(url, {
                // 忽略公司防火牆 SSL 憑證檢查
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                
                headers: {
                    'apikey': CONFIG.apiKey,
                    'authorization': CONFIG.authToken,
                    'Cookie': CONFIG.cookie, // <--- 注入靈魂 Cookie
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                    'Accept': 'application/json, text/plain, */*',
                    'Referer': 'https://livescore.lanetalk.com/',
                    'Origin': 'https://livescore.lanetalk.com'
                }
            });

            const data = response.data;

            if (Array.isArray(data) && data.length > 0) {
                console.log(`✅ 成功！取得 ${data.length} 筆資料。`);
                allGames = allGames.concat(data);
                
                page++; 
                consecutiveErrors = 0; 
                await sleep(CONFIG.delayMs);
            } else {
                console.log(`\n🏁 第 ${page} 頁真的是空的了，抓取結束！`);
                hasMore = false;
            }

        } catch (error) {
            console.log(`❌ 失敗`);
            
            if (error.response) {
                console.error(`⚠️ API 錯誤: ${error.response.status} - ${error.response.statusText}`);
                if (error.response.status === 401) {
                     console.error(`🚨 Token 或 Cookie 可能失效，請重新抓取 cURL。`);
                     hasMore = false;
                }
            } else {
                console.error(`⚠️ 網路錯誤: ${error.message}`);
            }
            
            consecutiveErrors++;
            if (consecutiveErrors >= 3) {
                console.error(`\n💀 連續失敗，停止程式。`);
                hasMore = false;
            }
        }
    }

    if (allGames.length > 0) {
        console.log(`\n💾 正在寫入檔案...`);
        fs.writeFileSync(outputPath, JSON.stringify(allGames, null, 2));
        console.log(`🎉 抓取完成！這次總共抓了 ${allGames.length} 筆資料。`);
        console.log(`📂 檔案位置: ${outputPath}`);
    } else {
        console.log(`\n⚠️ 還是沒有抓到資料，請檢查 Cookie 是否過期。`);
    }
}

scrapeLaneTalk();