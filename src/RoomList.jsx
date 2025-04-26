import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";
import "../styles/rooms.css";


export default function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms") 
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  return (
    <div className="room-grid">
      {rooms.map((room) => (
        <RoomCard key={room.room_id} room={room} />
      ))}
    </div>
  );
}
