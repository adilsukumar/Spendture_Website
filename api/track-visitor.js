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
    const { ip, userAgent, location, referrer, identificationMethod } = req.body;
    
    // Clean the private key
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
      range: 'Visitors!A:I',
      valueInputOption: 'RAW',
      resource: {
        values: [[
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
          ip || 'Unknown',
          'Unknown ISP',
          'Unknown',
          'Unknown',
          location || 'Unknown',
          identificationMethod || 'Browser',
          referrer || 'Direct',
          'No'
        ]]
      }
    });
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return res.json({ success: true }); // Still return success to not break frontend
  }
}