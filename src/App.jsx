import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Apply from './pages/Apply';
import Rooms from './pages/Rooms';
import Admin from './pages/Admin';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/rooms" element={<Rooms />} />   
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
