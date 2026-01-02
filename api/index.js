import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

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
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=isp,org,as,status`);
    const data = await response.json();
    
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
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Waitlist!A:E'
    });
    
    const rows = response.data.values || [];
    const found = rows.slice(1).find(row => row[2] && row[2].toLowerCase() === email.toLowerCase());
    
    return found ? 'Yes' : 'No';
  } catch (error) {
    console.error('Waitlist check error:', error);
    return 'No';
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, url } = req;
  const path = new URL(url, 'https://example.com').pathname.replace('/api', '');

  try {
    // Root endpoint
    if (method === 'GET' && path === '/') {
      return res.json({ 
        message: 'Spendture API - Connected to Google Sheets',
        sheetId: SPREADSHEET_ID
      });
    }

    // Test endpoint
    if (method === 'GET' && path === '/test') {
      return res.json({ 
        message: 'API is working!', 
        timestamp: new Date().toISOString(),
        env: {
          hasGoogleSheetId: !!process.env.GOOGLE_SHEET_ID,
          hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY
        }
      });
    }

    // Track visitor endpoint
    if (method === 'POST' && path === '/track-visitor') {
      const { ip, userAgent, location, referrer, identificationMethod } = req.body;
      
      // Get or create session ID
      let sessionId = req.cookies.spendture_session || uuidv4();
      
      // Get user data from session if available
      const userData = userSessions.get(sessionId) || {};
      const name = userData.name || 'Unknown';
      const email = userData.email || 'Unknown';
      
      // Get ISP info
      const broadband = await getISPInfo(ip);
      
      // Check waitlist status
      let waitlistStatus = 'No';
      if (userData.inWaitlist) {
        waitlistStatus = 'Yes';
      } else {
        waitlistStatus = await checkWaitlistStatus(email);
      }
      
      // Save to Google Sheets
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
      
      return res.json({ success: true, sessionId, debug: { broadband, waitlistStatus } });
    }

    // Waitlist endpoint
    if (method === 'POST' && path === '/waitlist') {
      const { name, email, age, location } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
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
              age || '',
              location || ''
            ]]
          }
        });
        
        // Store user data in session
        if (sessionId) {
          userSessions.set(sessionId, { name, email, inWaitlist: true });
        }
        
        return res.json({ success: true });
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError);
        return res.status(500).json({ error: 'Failed to save to waitlist', details: sheetError.message });
      }
    }

    // Get visitors endpoint
    if (method === 'GET' && path === '/visitors') {
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
      
      return res.json(visitors);
    }

    // 404 for unknown endpoints
    return res.status(404).json({ error: 'Endpoint not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}