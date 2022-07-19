
import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './chat';

const socket = io.connect("http://localhost:3002")

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('');

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(!userName !== '' && room !== ''){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }


  return (
    <div className="App">
      {!showChat ?
      <div className='joinChatContainer'>
      <h2>Join a chat</h2>
      <input type="text" value={userName} placeholder="John..." onChange={(e) =>{
        setUserName(e.target.value)
      }}/>
      <input type="text" value={room} placeholder="RoomID..."
      onChange={(e) =>{
        setRoom(e.target.value)
      }}
      />
      <button onClick={joinRoom}>Join</button>

      
      </div>
      : (<Chat socket={socket} userName={userName} room={room}/>)}
    </div>
  );
}

export default App;
