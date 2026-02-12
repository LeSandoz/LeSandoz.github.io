
/**
 * BACKEND SERVER TEMPLATE (Node.js)
 * 
 * Since I cannot host a server in this browser environment, here is the code
 * you would run on your own machine (e.g., using AWS, Heroku, or your laptop)
 * to create a real backend that stores data and scrapes websites.
 * 
 * INSTRUCTIONS:
 * 1. Create a folder locally.
 * 2. Run `npm init -y`
 * 3. Run `npm install express sqlite3 cors cheerio axios`
 * 4. Paste this code into `server.js`
 * 5. Run `node server.js`
 */

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio'); // Library for web scraping

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- Database Setup (SQLite) ---
const db = new sqlite3.Database('./bowling.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the bowling database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS games (
    id TEXT PRIMARY KEY,
    date TEXT,
    location TEXT,
    score INTEGER,
    player_id TEXT
  )`);
});

// --- API Endpoints ---

// 1. Get All Games
app.get('/api/games', (req, res) => {
  db.all("SELECT * FROM games ORDER BY date DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ games: rows });
  });
});

// 2. Add a Game
app.post('/api/games', (req, res) => {
  const { id, date, location, score, playerId } = req.body;
  const sql = `INSERT INTO games (id, date, location, score, player_id) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [id, date, location, score, playerId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Game added", id: this.lastID });
  });
});

// 3. SCRAPER: Fetch data from Plano Super Bowl (Conceptual)
// Note: This requires Plano Super Bowl to have a public URL showing scores.
// Most centers use LeagueSecretary.com or generic Brunswick cloud links.
app.post('/api/scrape', async (req, res) => {
  const { url } = req.body; // User provides the URL to the league sheet
  
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    // A. Fetch the HTML
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const scrapedGames = [];

    // B. Parse HTML (This selector depends entirely on the specific website structure)
    // This is a GENERIC example assuming a table structure
    $('table.league-scores tr').each((index, element) => {
      const date = $(element).find('.date-col').text().trim();
      const score = $(element).find('.score-col').text().trim();
      
      if (date && score) {
        scrapedGames.push({
          id: `scraped-${Date.now()}-${index}`,
          date: new Date(date).toISOString().split('T')[0],
          location: 'Plano Super Bowl',
          score: parseInt(score),
          playerId: 'user-1'
        });
      }
    });

    // C. Save to DB
    // (Logic to insert scrapedGames into SQLite would go here)

    res.json({ message: `Successfully scraped ${scrapedGames.length} games`, data: scrapedGames });

  } catch (error) {
    console.error("Scraping failed:", error);
    res.status(500).json({ error: "Failed to fetch data from URL. The site might block bots." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
