// src/Animal/Animal.js
import React, { useEffect, useRef, useState } from 'react';
import './Animal.css';

const Animal = ({ id, type, image, x, y, isHero, onUpdatePosition }) => {
  const animalRef = useRef(null);
  const [position, setPosition] = useState({ x, y });
  const [rotation, setRotation] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');

  useEffect(() => {
    onUpdatePosition(id, position);
  }, [position]);

  const move = (dx, dy) => {
    setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const rotate = angle => {
    setRotation(prev => prev + angle);
  };

  const say = (text) => {
    setBubbleText(text);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 2000);
  };

  return (
    <div
      ref={animalRef}
      className={`animal ${isHero ? 'hero' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`
      }}
    >
      <img src={image} alt={type} />
      {showBubble && <div className="speech-bubble">{bubbleText}</div>}

      <div className="controls">
        <button onClick={() => move(10, 0)}>➡</button>
        <button onClick={() => move(-10, 0)}>⬅</button>
        <button onClick={() => move(0, -10)}>⬆</button>
        <button onClick={() => move(0, 10)}>⬇</button>
        <button onClick={() => rotate(15)}>⤵</button>
        <button onClick={() => say('Hello!')}>💬</button>
      </div>
    </div>
  );
};

export default Animal;
