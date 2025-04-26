import React, { useState, useEffect } from 'react';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h1>Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              ID: {app.id} - Preferences: {app.preferences}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApplications;
