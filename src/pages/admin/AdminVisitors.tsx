import { useState, useEffect } from 'react';
import { formatTimestamp } from '@/lib/utils';

const AdminVisitors = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/visitors', {
          credentials: 'include' // Include cookies
        });
        const data = await response.json();
        setVisitors(data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Website Visitors</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border-b text-left">ID</th>
              <th className="px-4 py-2 border-b text-left">Timestamp</th>
              <th className="px-4 py-2 border-b text-left">IP Address</th>
              <th className="px-4 py-2 border-b text-left">Broadband</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Location</th>
              <th className="px-4 py-2 border-b text-left">Method</th>
              <th className="px-4 py-2 border-b text-left">Referrer</th>
              <th className="px-4 py-2 border-b text-left">Waitlist Status</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{visitor.id}</td>
                <td className="px-4 py-2 border-b">
                  {formatTimestamp(visitor.timestamp)}
                </td>
                <td className="px-4 py-2 border-b">{visitor.ip}</td>
                <td className="px-4 py-2 border-b">{visitor.broadband || 'Unknown'}</td>
                <td className="px-4 py-2 border-b">{visitor.name || 'Unknown'}</td>
                <td className="px-4 py-2 border-b">{visitor.email || 'Unknown'}</td>
                <td className="px-4 py-2 border-b">{visitor.location}</td>
                <td className="px-4 py-2 border-b">{visitor.identificationMethod}</td>
                <td className="px-4 py-2 border-b">{visitor.referrer || 'Direct'}</td>
                <td className="px-4 py-2 border-b">
                  <span className={`px-2 py-1 rounded text-xs ${
                    visitor.waitlistStatus === 'Yes' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {visitor.waitlistStatus || 'No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Total Visitors: {visitors.length}
      </div>
    </div>
  );
};

export default AdminVisitors;