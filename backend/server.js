import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ 
  credentials: true, 
  origin: true, // Allow all origins in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Store user sessions in memory (use Redis in production)
const userSessions = new Map();

// Google Sheets Setup
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Get ISP/Broadband info from IP
async function getISPInfo(ip) {
  try {
    console.log(`Getting ISP info for IP: ${ip}`);
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=isp,org,as,status`);
    const data = await response.json();
    console.log('ISP API response:', data);
    
    if (data.status === 'success') {
      return data.isp || data.org || 'Unknown ISP';
    }
    return 'Unknown ISP';
  } catch (error) {
    console.error('ISP lookup error:', error);
    return 'Unknown ISP';
  }
}

// Check if user is in waitlist
async function checkWaitlistStatus(email) {
  if (!email || email === 'Unknown') return 'No';
  
  try {
    console.log(`Checking waitlist status for email: ${email}`);
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Waitlist!A:E'
    });
    
    const rows = response.data.values || [];
    console.log('Waitlist rows:', rows.length);
    
    // Skip header row and check email column (index 2)
    const found = rows.slice(1).find(row => row[2] && row[2].toLowerCase() === email.toLowerCase());
    console.log('Found in waitlist:', !!found);
    
    return found ? 'Yes' : 'No';
  } catch (error) {
    console.error('Waitlist check error:', error);
    return 'No';
  }
}

app.get('/', (req, res) => {
  res.json({ 
    message: 'Spendture API - Connected to Google Sheets',
    sheetId: SPREADSHEET_ID
  });
});

// Track visitor with enhanced data
app.post('/api/track-visitor', async (req, res) => {
  const { ip, userAgent, location, referrer, identificationMethod } = req.body;
  
  console.log('Tracking visitor:', { ip, location, identificationMethod });
  
  // Get or create session ID
  let sessionId = req.cookies.spendture_session;
  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie('spendture_session', sessionId, { 
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: false // Set to true in production with HTTPS
    });
  }
  
  // Get user data from session if available
  const userData = userSessions.get(sessionId) || {};
  const name = userData.name || 'Unknown';
  const email = userData.email || 'Unknown';
  
  console.log('Session data:', { sessionId, name, email });
  
  try {
    // Get ISP info
    const broadband = await getISPInfo(ip);
    
    // Check waitlist status - prioritize session flag for immediate updates
    let waitlistStatus = 'No';
    if (userData.inWaitlist) {
      waitlistStatus = 'Yes';
    } else {
      waitlistStatus = await checkWaitlistStatus(email);
    }
    
    console.log('Final data:', { broadband, waitlistStatus });
    
    // New column order: Timestamp, IP Address, Broadband, Name, Email, Location, Method, Referrer, Waitlist Status
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Visitors!A:I',
      valueInputOption: 'RAW',
      resource: {
        values: [[
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ip,
          broadband,
          name,
          email,
          location,
          identificationMethod,
          referrer || 'Direct',
          waitlistStatus
        ]]
      }
    });
    
    res.json({ success: true, sessionId, debug: { broadband, waitlistStatus } });
  } catch (error) {
    console.error('Google Sheets error:', error);
    res.status(500).json({ error: 'Failed to save visitor data' });
  }
});

// Add to waitlist and update session
app.post('/api/waitlist', async (req, res) => {
  const { name, email, age, location } = req.body;
  
  // Get session ID from cookie
  const sessionId = req.cookies.spendture_session;
  
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Waitlist!A:E',
      valueInputOption: 'RAW',
      resource: {
        values: [[
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          name,
          email,
          age,
          location
        ]]
      }
    });
    
    // Store user data in session for future visitor tracking with waitlist flag
    if (sessionId) {
      userSessions.set(sessionId, { name, email, inWaitlist: true });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Google Sheets error:', error);
    res.status(500).json({ error: 'Failed to save waitlist data' });
  }
});

// Test endpoint to check waitlist status
app.get('/api/test-waitlist/:email', async (req, res) => {
  const { email } = req.params;
  const status = await checkWaitlistStatus(email);
  res.json({ email, status });
});

// Get visitors data
app.get('/api/visitors', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Visitors!A:I'
    });
    
    const rows = response.data.values || [];
    const visitors = rows.slice(1).map((row, index) => ({
      id: index + 1,
      timestamp: row[0],
      ip: row[1],
      broadband: row[2],
      name: row[3],
      email: row[4],
      location: row[5],
      identificationMethod: row[6],
      referrer: row[7],
      waitlistStatus: row[8]
    }));
    
    res.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

// Export for Vercel
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Spendture API running on http://localhost:${PORT}`);
    console.log(`📊 Connected to Google Sheets: ${SPREADSHEET_ID}`);
  });
}