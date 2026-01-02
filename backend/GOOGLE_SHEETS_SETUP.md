# Google Sheets Setup for Spendture

## 1. Create Google Sheet
1. Go to Google Sheets: https://sheets.google.com
2. Create a new spreadsheet
3. Name it "Spendture Data"

## 2. Setup Two Tabs

### Tab 1: "Visitors"
- Rename Sheet1 to "Visitors"
- Add headers in row 1:
  A1: Timestamp
  B1: IP Address  
  C1: Name
  D1: Email
  E1: Location
  F1: Method
  G1: Referrer

### Tab 2: "Waitlist" 
- Create new tab called "Waitlist"
- Add headers in row 1:
  A1: Timestamp
  B1: Name
  C1: Email
  D1: Age
  E1: Location

## 3. Get Sheet ID
- Copy the Sheet ID from URL: 
  https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
- Add to .env file: GOOGLE_SHEET_ID=your_sheet_id

## 4. Setup Google Service Account
1. Go to Google Cloud Console
2. Create service account
3. Download JSON key file
4. Add path to .env: GOOGLE_SERVICE_ACCOUNT_KEY=path/to/key.json
5. Share your Google Sheet with the service account email

## 5. Install Dependencies
```bash
cd backend
npm install
```

## 6. Start Backend
```bash
npm run dev
```

Your data will now be saved directly to Google Sheets with clean formatting!