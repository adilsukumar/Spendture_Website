import { google } from 'googleapis';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, age, location, role, referralCode } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Try Google Sheets integration
    try {
      // Clean the private key - remove quotes and properly handle newlines
      let privateKey = process.env.GOOGLE_PRIVATE_KEY;
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }
      privateKey = privateKey.replace(/\\n/g, '\n');

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: privateKey
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Waitlist!A:G',
        valueInputOption: 'RAW',
        resource: {
          values: [[
            new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
            name,
            email,
            age || '',
            location || '',
            role || '',
            referralCode || ''
          ]]
        }
      });
      
      return res.json({ success: true, message: 'Added to waitlist!' });
    } catch (sheetsError) {
      console.error('Google Sheets error details:', {
        message: sheetsError.message,
        code: sheetsError.code,
        status: sheetsError.status,
        details: sheetsError.details
      });
      // Still return success to user, but log the error
      return res.json({ 
        success: true, 
        message: 'Added to waitlist!', 
        debug: `Sheets error: ${sheetsError.message}` 
      });
    }
  } catch (error) {
    console.error('Waitlist error:', error);
    return res.status(500).json({ error: 'Failed to save to waitlist', details: error.message });
  }
}