import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    setUser(decoded);

    async function fetchApplication() {
      try {
        const res = await axios.get('http://localhost:5000/api/applications/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplication(res.data);
      } catch (err) {
        console.error('No application yet', err);
      }
    }

    if (decoded.role !== 'admin') {
      fetchApplication();
    }
  }, []);

  if (!user) return null;

  return (
    <div className="dashboard-main">
      <h1>Welcome to the Hostel Dashboard</h1>
      <p>Hi, {user?.role === 'admin' ? 'Admin' : 'Student'}!</p>

      <div className="action-buttons">
        {user?.role === 'admin' ? (
          <>
            <button onClick={() => navigate('/admin')} className="action-btn">
              🛠 Admin Panel
            </button>
          </>
        ) : (
          <>
            {!application ? (
              <button onClick={() => navigate('/apply')} className="action-btn">
                📝 Apply for Housing
              </button>
            ) : (
              <>
                <p className="application-status">📄 Application Status: <strong>{application.status}</strong></p>

                {application.status === 'accepted' && application.room_id ? (
                  <p className="assigned-room">🏠 You are assigned to Room ID: {application.room_id}</p>
                ) : application.status === 'accepted' && !application.room_id ? (
                  <p>✅ Application Accepted. Room assignment pending...</p>
                ) : (
                  <p>🕐 Waiting for Admin decision...</p>
                )}
              </>
            )}
            <button onClick={() => navigate('/rooms')} className="action-btn">
              🏢 View Available Rooms
            </button>
          </>
        )}
      </div>
    </div>
  );
}
