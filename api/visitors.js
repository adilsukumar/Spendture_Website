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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Visitors!A:I'
    });
    
    const rows = response.data.values || [];
    const visitors = rows.slice(1).map((row, index) => ({
      id: index + 1,
      timestamp: row[0] || '',
      ip: row[1] || '',
      broadband: row[2] || '',
      name: row[3] || '',
      email: row[4] || '',
      location: row[5] || '',
      identificationMethod: row[6] || '',
      referrer: row[7] || '',
      waitlistStatus: row[8] || ''
    }));
    
    return res.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return res.status(500).json({ error: 'Failed to fetch visitors', details: error.message });
  }
}