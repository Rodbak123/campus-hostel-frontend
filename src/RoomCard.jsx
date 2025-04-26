import React from 'react';

export default function RoomCard({ room }) {
  const imagePath = require(`../assets/images/rooms/${room.image}`).default;

  return (
    <div className="room-card">
      <img src={imagePath} alt={room.room_number} /> {/* Dynamically loaded image */}
      <h2>{room.room_number}</h2>
      <p>Type: {room.type}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Floor: {room.floor} | Building: {room.building}</p>
      <p>Description: {room.description}</p>
      <button>Apply Now</button>
    </div>
  );
}
