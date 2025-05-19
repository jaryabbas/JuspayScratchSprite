import React, { useState, useEffect } from 'react';
import './Animal/Animal.css';

const Stage = ({ animals }) => {
  const [positions, setPositions] = useState([]);
  const [heroIndexes, setHeroIndexes] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize random positions and empty messages
    const initialPositions = animals.map(() => ({
      x: Math.random() * 500,
      y: Math.random() * 300,
    }));
    setPositions(initialPositions);

    const initialMessages = animals.map(() => '');
    setMessages(initialMessages);
  }, [animals]);

  // Movement controls
  const move = (index, dx, dy) => {
    const newPos = [...positions];
    newPos[index].x += dx;
    newPos[index].y += dy;
    setPositions(newPos);
    detectCollisions(newPos);
  };

  const rotate = (index, angle) => {
    const newRotation = [...positions];
    newRotation[index].rotation = (newRotation[index].rotation || 0) + angle;
    setPositions(newRotation);
  };

  // Speech message
  const speak = (index, text) => {
    const newMessages = [...messages];
    newMessages[index] = text;
    setMessages(newMessages);
    setTimeout(() => {
      newMessages[index] = '';
      setMessages([...newMessages]);
    }, 2000);
  };

  // Collision detection
  const detectCollisions = (positions) => {
    const collided = new Set();

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i];
        const b = positions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          collided.add(i);
          collided.add(j);
        }
      }
    }

    setHeroIndexes([...collided]);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        marginTop: '20px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #e3f2fd, #ffffff)',
      }}
    >
      {animals.map((animal, index) => (
        <div
          key={index}
          className={`animal ${heroIndexes.includes(index) ? 'hero' : ''}`}
          style={{
            top: positions[index]?.y || 0,
            left: positions[index]?.x || 0,
            transform: `rotate(${positions[index]?.rotation || 0}deg)`,
          }}
        >
          <img src={animal.image} alt={animal.name} />
          {messages[index] && <div className="speech-bubble">{messages[index]}</div>}
          <div className="controls">
            <button onClick={() => move(index, -10, 0)}>←</button>
            <button onClick={() => move(index, 10, 0)}>→</button>
            <button onClick={() => move(index, 0, -10)}>↑</button>
            <button onClick={() => move(index, 0, 10)}>↓</button>
            <button onClick={() => rotate(index, 15)}>⟳</button>
            <button onClick={() => speak(index, 'Hello!')}>💬</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stage;
