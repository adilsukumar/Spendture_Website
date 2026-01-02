import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Replace with your Google Apps Script webhook URLs
const VISITORS_WEBHOOK = process.env.VISITORS_WEBHOOK_URL;
const WAITLIST_WEBHOOK = process.env.WAITLIST_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Spendture API - Google Sheets Integration',
    status: 'Ready to save data to Google Sheets'
  });
});

// Track visitor - Send to Google Apps Script
app.post('/api/track-visitor', async (req, res) => {
  const { ip, userAgent, location, referrer, name, email, identificationMethod } = req.body;
  
  try {
    const response = await fetch(VISITORS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ip, name: name || 'Unknown', email: email || 'Unknown',
        location, method: identificationMethod, referrer
      })
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.json({ success: true }); // Don't fail the frontend
  }
});

// Add to waitlist - Send to Google Apps Script
app.post('/api/waitlist', async (req, res) => {
  const { name, email, age, location } = req.body;
  
  try {
    const response = await fetch(WAITLIST_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name, email, age, location
      })
    });
    
    res.json({ success: true, id: Date.now() });
  } catch (error) {
    console.error('Webhook error:', error);
    res.json({ success: true, id: Date.now() }); // Don't fail the frontend
  }
});

// Mock endpoints for admin (since we can't easily read from Apps Script)
app.get('/api/visitors', (req, res) => {
  res.json([{ message: 'Check your Google Sheet for visitor data' }]);
});

app.get('/api/waitlist', (req, res) => {
  res.json([{ message: 'Check your Google Sheet for waitlist data' }]);
});

app.listen(PORT, () => {
  console.log(`🚀 Spendture API running on http://localhost:${PORT}`);
  console.log(`📊 Data will be saved to Google Sheets via webhooks`);
});