import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');

    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    if (decoded.role !== 'admin') return navigate('/dashboard');

    axios.get('http://localhost:5000/api/applications', {
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(res => setApps(res.data))
      .catch(() => alert('❌ Failed to load applications'));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`http://localhost:5000/api/applications/process/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApps(apps.map(app => app.id === id ? { ...app, status } : app));
    } catch {
      alert('❌ Failed to update status');
    }
  };

  return (
    <div className="admin-panel">
      <h2>📋 All Applications</h2>
      {apps.map(app => {
        let details = {};
        try {
          details = JSON.parse(app.preferences);
        } catch (error) {
          console.error('Failed to parse preferences for app id', app.id, ':', error);
          details = { roomType: '-', phone: '-' };
        }

        return (
          <div key={app.id} className="admin-card border p-4 m-2 rounded shadow">
            <p><strong>Name:</strong> {app.name || '-'}</p>
            <p><strong>Email:</strong> {app.email || '-'}</p>
            <p><strong>Room Type:</strong> {details.roomType || '-'}</p>
            <p><strong>Phone:</strong> {details.phone || '-'}</p>
            <p><strong>Status:</strong> {app.status || 'pending'}</p>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(app.id, 'accepted')}
              >
                ✅ Accept
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(app.id, 'rejected')}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
