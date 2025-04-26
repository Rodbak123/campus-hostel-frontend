import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Apply() {
  const [roomType, setRoomType] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const navigate = useNavigate();

  const roomOptions = [
    { name: 'Double with Fan', price: 900 },
    { name: 'Double with Fan and AC', price: 1200 },
    { name: 'Single with Fan and AC', price: 2000 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/applications', {
        roomType, phone, gender
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Application submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('❌ Failed to submit application.');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-heading">Apply for Housing</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-layout">
          
          <div>
            <label>Room Type</label>
            <select 
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)} 
              required
            >
              <option value="">Select Room Type</option>
              {roomOptions.map((room, idx) => (
                <option key={idx} value={room.name}>
                  {room.name} (${room.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Phone</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex-center" style={{ marginTop: '20px' }}>
            <button type="submit" className="action-btn">
              📝 Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
