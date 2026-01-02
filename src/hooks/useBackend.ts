import { useEffect } from 'react';

const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3002/api';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();
        
        await fetch(`${API_BASE}/track-visitor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: locationData.ip,
            userAgent: navigator.userAgent,
            location: `${locationData.city}, ${locationData.country_name}`,
            referrer: document.referrer
          })
        });
      } catch (error) {
        console.error('Visitor tracking error:', error);
      }
    };

    trackVisitor();
  }, []);
};

export const submitToWaitlist = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Waitlist submission error:', error);
    throw error;
  }
};