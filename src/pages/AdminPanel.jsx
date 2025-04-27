
import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

export default function AdminPanel() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://campus-hostel-backend-ztbe.onrender.com/api/applications', { headers: { Authorization: `Bearer ${token}` } });
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Fetch applications error:', err);
      setError('Failed to fetch applications');
    }
  }

  async function handleAction(id, status) {
    console.log('Clicked Accept/Reject', id, status); 
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://campus-hostel-backend-ztbe.onrender.com/api/applications/process/${id}', { status }, { headers: { Authorization: `Bearer ${token}` } });
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
        { status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Status updated successfully!');
      fetchApplications(); 
    } catch (err) {
      console.error('Failed to update application status:', err);
      alert('❌ Failed to update status');
    }
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Applications</h2>
      {error && <p className="error">{error}</p>}
      <div className="application-list">
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="application-card">
              <h3>{app.name}</h3>
              <p>Email: {app.email}</p>
              <p>Room Preference: {JSON.parse(app.preferences)?.roomType}</p>
              <p>Status: <strong>{app.status}</strong></p>

              {app.status === 'pending' && (
                <div className="action-buttons">
                  <button className="accept-btn" onClick={() => handleAction(app.id, 'accepted')}>
                    ✅ Accept
                  </button>
                  <button className="reject-btn" onClick={() => handleAction(app.id, 'rejected')}>
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
