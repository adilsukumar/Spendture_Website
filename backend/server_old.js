import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Spendture Backend API is running!' });
});

// Test visitors endpoint
app.get('/test-visitors', (req, res) => {
  db.all('SELECT COUNT(*) as count FROM visitors', (err, rows) => {
    if (err) {
      return res.json({ error: err.message });
    }
    res.json({ 
      message: 'Backend working!', 
      totalVisitors: rows[0].count,
      endpoints: {
        visitors: '/api/visitors',
        waitlist: '/api/waitlist'
      }
    });
  });
});

// SQLite Database Setup
const db = new sqlite3.Database('./spendture.db');

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    userAgent TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    location TEXT,
    referrer TEXT,
    name TEXT,
    email TEXT,
    identificationMethod TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    age INTEGER,
    location TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Google Sheets Setup
const sheets = google.sheets('v4');
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || 'your-sheet-id';

// Track visitor
app.post('/api/track-visitor', (req, res) => {
  const { ip, userAgent, location, referrer, name, email, identificationMethod } = req.body;
  
  db.run(
    'INSERT INTO visitors (ip, userAgent, location, referrer, name, email, identificationMethod) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ip, userAgent, location, referrer, name, email, identificationMethod],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Add to waitlist
app.post('/api/waitlist', async (req, res) => {
  const { name, email, age, location } = req.body;
  
  // Add to SQLite
  db.run(
    'INSERT INTO waitlist (name, email, age, location) VALUES (?, ?, ?, ?)',
    [name, email, age, location],
    async function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Add to Google Sheets
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Sheet1!A:E',
          valueInputOption: 'RAW',
          resource: {
            values: [[this.lastID, name, email, age, location, new Date().toISOString()]]
          }
        });
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError);
      }

      res.json({ success: true, id: this.lastID });
    }
  );
});

// Get visitors with better error handling
app.get('/api/visitors', (req, res) => {
  db.all('SELECT * FROM visitors ORDER BY timestamp DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    console.log(`Returning ${rows.length} visitors`);
    res.json(rows);
  });
});

// Get waitlist
app.get('/api/waitlist', (req, res) => {
  db.all('SELECT * FROM waitlist ORDER BY timestamp DESC', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});