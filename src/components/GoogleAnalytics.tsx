import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Local analytics - no external services
export const initGA = () => {
  console.log('Local Analytics: Initialized');
};

export const logPageView = (path: string) => {
  console.log('Local Analytics: Page view -', path);
};

export const logEvent = (action: string, category: string, label?: string, value?: number) => {
  console.log('Local Analytics: Event -', { action, category, label, value });
};

export const trackWaitlistSignup = (source?: string) => {
  console.log('Local Analytics: Waitlist signup -', source || 'main_form');
};

export const trackWaitlistView = () => {
  console.log('Local Analytics: Waitlist view');
};

export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);
};

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default GoogleAnalytics;