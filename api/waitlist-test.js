export default function handler(req, res) {
  res.json({ 
    message: 'Waitlist endpoint is working!',
    method: req.method,
    body: req.body,
    env: {
      hasGoogleSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY
    }
  });
}