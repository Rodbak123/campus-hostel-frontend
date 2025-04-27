import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    console.log('Register Form Data:', form);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
     
      console.log('Backend URL:', backendUrl);

      
      await axios.post(`${backendUrl}/api/users/register`, form);

     
      setMsg('✅ Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500); 
    } catch (err) {
      // Enhanced error handling
      if (err.response?.data?.error === 'Email already exists') {
        setMsg('❌ Email already exists.');
      } else if (err.response?.data?.error) {
        setMsg(`❌ ${err.response.data.error}`);
      } else {
        setMsg('❌ Something went wrong.');
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

