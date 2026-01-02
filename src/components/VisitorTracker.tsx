import { useEffect } from 'react';

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get IP address
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();

        let name = null;
        let email = null;
        let identificationMethod = 'anonymous';

        // Try to identify user through various methods
        // Method 1: Check if user is logged in to common services
        try {
          // Check localStorage for any saved user data
          const savedUser = localStorage.getItem('userProfile') || 
                           localStorage.getItem('user') || 
                           localStorage.getItem('userData');
          if (savedUser) {
            const userData = JSON.parse(savedUser);
            name = userData.name || userData.displayName;
            email = userData.email;
            identificationMethod = 'localStorage';
          }
        } catch (e) {}

        // Method 2: Check for Google account info (if user is signed in)
        if (!email && window.google) {
          try {
            // This would work if user has Google Sign-In active
            identificationMethod = 'google_signin';
          } catch (e) {}
        }

        // Method 3: Check URL parameters for email/name
        const urlParams = new URLSearchParams(window.location.search);
        if (!email && urlParams.get('email')) {
          email = urlParams.get('email');
          name = urlParams.get('name');
          identificationMethod = 'url_params';
        }

        // Method 4: Check if they've filled the waitlist before
        if (!email) {
          const waitlistEmail = sessionStorage.getItem('waitlistEmail') || 
                               localStorage.getItem('waitlistEmail');
          if (waitlistEmail) {
            email = waitlistEmail;
            identificationMethod = 'previous_waitlist';
          }
        }

        const visitorData = {
          ip: ipData.ip,
          userAgent: navigator.userAgent,
          location: `${ipData.city}, ${ipData.country_name}`,
          referrer: document.referrer || 'Direct',
          name: name,
          email: email,
          identificationMethod: identificationMethod
        };

        // Send to backend
        await fetch('http://localhost:3002/api/track-visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visitorData)
        });

      } catch (error) {
        console.error('Visitor tracking error:', error);
      }
    };

    trackVisitor();
  }, []);

  return null;
};

export default VisitorTracker;