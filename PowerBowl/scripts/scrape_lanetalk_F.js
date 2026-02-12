
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ==========================================
// 1. CONFIGURATION (設定區)
// ==========================================

// 這是您給的 Plano Super Bowl ID
const CENTER_ID = '862d3650-ffb8-49d2-8c02-ed91e00032b5';

// 固定 API Key (已更新為您提供的修正版本)
const API_KEY = '8tLtPc8UwWvdvbpzRIr0ifCWy250TXUXrGUn';

// Authorization Token
// 注意：我們加上 'Bearer ' 前綴以符合標準 JWT 驗證格式
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IlVPWkdRajR0In0.eyJpc3MiOiJodHRwczovL2FwaS5sYW5ldGFsay5jb20vdjEvIiwiaWF0IjoxNzcwOTExODEwLCJleHAiOjE3NzM1MDM4MTAsInVzZXJfaWQiOjQ1NzMzNywic2NvcGVzIjpbIm1hdGNoZXMuY3JlYXRlIiwidGFncy5jcmVhdGUiLCJ0YWdzLmVkaXQiLCJ0YWdzLmRlbGV0ZSIsInRhZ3MudmlldyIsInRhZ3Mudmlld19hbGwiLCJ0YWdzLnNlYXJjaCIsInNjb3JlY2FyZHMuZmlsdGVyQnlBcnNlbmFsIiwic2NvcmVjYXJkcy5maWx0ZXJTdGF0c0J5QXJzZW5hbCIsInNjb3JlY2FyZHMuZmlsdGVyU3RhdHNCeVRhZ3MiLCJzY29yZWNhcmRzLmZpbHRlckdhbWVzQnlUYWdzIiwic2NvcmVjYXJkcy5tYW5hZ2VBcnNlbmFsIiwic2NvcmVjYXJkcy5tYW5hZ2VBcnNlbmFsIiwic2NvcmVjYXJkcy5tYW5hZ2VHYW1lc1RhZ3MiLCJzY29yZWNhcmRzLmZpbHRlckJ5R2FtZXNMaW1pdCIsImFyY2hpdmUuY2xhaW1HYW1lc1JldHJvYWN0aXZlbHkiLCJhcmNoaXZlLmNvbXBhcmVTdGF0c0J5VGFncyIsImFyY2hpdmUuY2xhaW1HYW1lc1JldHJvYWN0aXZlbHkiLCJib3dsaW5nY2VudGVyLmxpdmVHYW1lcyJdfQ.LOdYXPh66fqqFmvgCoLjSiYjxhlePMmIxx07kCoG7RYQ6EuUK4XcpqatbILKJD7fp3W5efGkU-5Z3sD9i5k54g';

// 輸出檔案名稱
const OUTPUT_FILENAME = 'lanetalk_full_history.json';
const OUTPUT_PATH = path.join(__dirname, '..', OUTPUT_FILENAME);

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

// 為了不被封鎖，強制睡眠函式
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrape() {
  console.log('🎳 Starting LaneTalk Scraper for Plano Super Bowl...');
  console.log(`🔑 Using API Key: ${API_KEY.substring(0, 5)}...`);
  console.log(`📂 Output will be saved to: ${OUTPUT_PATH}`);

  let page = 1; // 從第 1 頁開始
  let allGames = [];
  let isFinished = false;

  // 設定 Headers
  const headers = {
    'apikey': API_KEY,
    'Authorization': AUTH_TOKEN,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json'
  };

  while (!isFinished) {
    const url = `https://api.lanetalk.com/v1/bowlingcenters/${CENTER_ID}/completed/${page}`;
    
    try {
      process.stdout.write(`⏳ 下載第 ${page} 頁... `);
      
      const response = await axios.get(url, { headers });
      
      // LaneTalk 回傳的結構通常是直接的陣列，或是 { matches: [...] }
      let items = [];
      if (Array.isArray(response.data)) {
        items = response.data;
      } else if (response.data.matches) {
        items = response.data.matches;
      } else if (response.data.games) {
        items = response.data.games;
      }

      // 檢查是否為空陣列 (結束條件)
      if (items.length === 0) {
        console.log('✅ 空陣列 (已無更多資料)');
        isFinished = true;
        break;
      }

      console.log(`✅ 成功取得 ${items.length} 筆資料`);
      
      // 加入總表
      allGames = allGames.concat(items);

      // 立即寫入檔案 (避免中途當機資料全失)
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allGames, null, 2));

      // 準備下一頁
      page++;

      // 🛑 Rate Limiting: 休息 1.5 秒
      await sleep(1500);

    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        console.log(`❌ 失敗 (Status: ${status})`);
        
        if (status === 401) {
          console.error('\n🚨 [CRITICAL ERROR] 401 Unauthorized');
          console.error('您的 Token 可能已過期或無效。請確認 Token 是否正確。');
          process.exit(1);
        } else if (status === 404) {
          console.log('✅ 遇到 404 (視為終點)');
          isFinished = true;
        } else {
          console.error(`未預期的錯誤: ${error.message}`);
          isFinished = true; 
        }
      } else {
        console.error(`❌ 網路錯誤: ${error.message}`);
        isFinished = true;
      }
    }
  }

  console.log('\n=============================================');
  console.log('🎉 爬蟲結束 (Scraping Complete)');
  console.log(`📊 總共抓取: ${allGames.length} 筆比賽資料`);
  console.log(`💾 檔案位置: ${OUTPUT_PATH}`);
  console.log('=============================================');
  console.log('👉 現在，請回到 LaneSync 網頁，點擊 "Import JSON" 按鈕匯入此檔案。');
}

scrape();
