import './Rooms.css';
import { useNavigate } from 'react-router-dom'; 
import doubleFan from '../assets/double-fan.jpg';
import doubleFanAC from '../assets/double-fan-ac.jpg';
import singleFanAC from '../assets/single-fan-ac.jpeg';

export default function Rooms() {
  const navigate = useNavigate();

  const rooms = [
    {
      name: 'Double with Fan',
      price: 900,
      description: 'Shared room for two students, includes fan.',
      occupancy: 2,
      photo: doubleFan
    },
    {
      name: 'Double with Fan and AC',
      price: 1200,
      description: 'Shared room for two students, includes fan and AC.',
      occupancy: 2,
      photo: doubleFanAC
    },
    {
      name: 'Single with Fan and AC',
      price: 2000,
      description: 'Private room, includes fan and AC.',
      occupancy: 1,
      photo: singleFanAC
    }
  ];

  const handleRoomClick = (room) => {
    
    localStorage.setItem('selectedRoom', room.name);

    
    navigate('/apply');
  };

  return (
    <div className="rooms-page">
      <h2>Available Rooms</h2>
      <div className="rooms-list">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="room-card cursor-pointer hover:shadow-lg transition"
            onClick={() => handleRoomClick(room)}
          >
            <img src={room.photo} alt={room.name} className="room-photo" />
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p><strong>Price:</strong> ${room.price} per semester</p>
            <p><strong>Occupancy:</strong> {room.occupancy} students</p>
          </div>
        ))}
      </div>
    </div>
  );
}
