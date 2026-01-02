import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = './data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const visitorsFile = path.join(dataDir, 'visitors.json');
const waitlistFile = path.join(dataDir, 'waitlist.json');

// Initialize files if they don't exist
if (!fs.existsSync(visitorsFile)) {
  fs.writeFileSync(visitorsFile, JSON.stringify([]));
}
if (!fs.existsSync(waitlistFile)) {
  fs.writeFileSync(waitlistFile, JSON.stringify([]));
}

app.get('/', (req, res) => {
  const visitors = JSON.parse(fs.readFileSync(visitorsFile, 'utf8'));
  const waitlist = JSON.parse(fs.readFileSync(waitlistFile, 'utf8'));
  
  res.json({ 
    message: 'Spendture API - Clean Data Storage',
    stats: {
      totalVisitors: visitors.length,
      totalWaitlist: waitlist.length
    },
    files: {
      visitors: './data/visitors.json',
      waitlist: './data/waitlist.json'
    }
  });
});

// Track visitor
app.post('/api/track-visitor', (req, res) => {
  const { ip, userAgent, location, referrer, name, email, identificationMethod } = req.body;
  
  const visitors = JSON.parse(fs.readFileSync(visitorsFile, 'utf8'));
  
  const newVisitor = {
    id: visitors.length + 1,
    timestamp: new Date().toISOString(),
    ip: ip,
    name: name || 'Unknown',
    email: email || 'Unknown',
    location: location,
    method: identificationMethod,
    referrer: referrer
  };
  
  visitors.push(newVisitor);
  fs.writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2));
  
  res.json({ success: true });
});

// Add to waitlist
app.post('/api/waitlist', (req, res) => {
  const { name, email, age, location } = req.body;
  
  const waitlist = JSON.parse(fs.readFileSync(waitlistFile, 'utf8'));
  
  // Check if email already exists
  if (waitlist.find(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: waitlist.length + 1,
    timestamp: new Date().toISOString(),
    name: name,
    email: email,
    age: age,
    location: location
  };
  
  waitlist.push(newUser);
  fs.writeFileSync(waitlistFile, JSON.stringify(waitlist, null, 2));
  
  res.json({ success: true, id: newUser.id });
});

// Get visitors
app.get('/api/visitors', (req, res) => {
  const visitors = JSON.parse(fs.readFileSync(visitorsFile, 'utf8'));
  res.json(visitors.reverse()); // Most recent first
});

// Get waitlist
app.get('/api/waitlist', (req, res) => {
  const waitlist = JSON.parse(fs.readFileSync(waitlistFile, 'utf8'));
  res.json(waitlist.reverse()); // Most recent first
});

app.listen(PORT, () => {
  console.log(`🚀 Spendture API running on http://localhost:${PORT}`);
  console.log(`📁 Data saved to: ${path.resolve(dataDir)}`);
});