export default function handler(req, res) {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    env: {
      hasGoogleSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      sheetIdLength: process.env.GOOGLE_SHEET_ID?.length || 0,
      emailLength: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.length || 0,
      keyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
      keyStart: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 50) || 'missing'
    }
  });
}