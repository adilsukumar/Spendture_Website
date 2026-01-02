import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_BASE = 'http://localhost:3002/api';

export const DataDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitorsRes, waitlistRes] = await Promise.all([
          fetch(`${API_BASE}/visitors`),
          fetch(`${API_BASE}/waitlist`)
        ]);
        
        setVisitors(await visitorsRes.json());
        setWaitlist(await waitlistRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Spendture Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitors ({visitors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {visitors.map((visitor) => (
                <div key={visitor.id} className="p-2 border rounded text-sm">
                  <div><strong>Location:</strong> {visitor.location}</div>
                  <div><strong>Time:</strong> {new Date(visitor.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                  <div><strong>IP:</strong> {visitor.ip}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waitlist ({waitlist.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {waitlist.map((user) => (
                <div key={user.id} className="p-2 border rounded text-sm">
                  <div><strong>Name:</strong> {user.name}</div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Age:</strong> {user.age}</div>
                  <div><strong>Location:</strong> {user.location}</div>
                  <div><strong>Joined:</strong> {new Date(user.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};