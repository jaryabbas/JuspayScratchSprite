import React, { useState, useEffect } from 'react';
import BlockPanel from './BlockPanel';
import StagePanel from './StagePanel';
import './App.css';

export default function App() {
  const [sprites, setSprites] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  
  useEffect(() => {
    const heroes = new Set();
    const threshold = 70;
    for (let i = 0; i < sprites.length; i++) {
      for (let j = i + 1; j < sprites.length; j++) {
        const a = sprites[i], b = sprites[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < threshold) {
          heroes.add(a.id);
          heroes.add(b.id);
        }
      }
    }
    setSprites(sprites.map(s => ({ ...s, hero: heroes.has(s.id) })));
  }, [sprites.map(s => `${s.x},${s.y}`).join('|')]); 

  
  const addSprite = (type, img) => {
    const id = Date.now();
    setSprites(prev => [...prev, { id, type, img, x: 100, y: 100, dir: 0, hero: false }]);
    setSelectedId(id);
  };

  
  const updateSprite = (id, changes) => {
    setSprites(prev =>
      prev.map(s => (s.id === id ? { ...s, ...changes } : s))
    );
  };

  
  const runCommand = (cmd, value = 10) => {
    if (!selectedId) return;
    const sp = sprites.find(s => s.id === selectedId);
    if (!sp) return;
    let { x, y, dir } = sp;
    switch (cmd) {
      case 'move': x += value; break;
      case 'turn': dir += value; break;
      case 'left': x -= value; break;
      case 'right': x += value; break;
      case 'up': y -= value; break;
      case 'down': y += value; break;
      default: return;
    }
    updateSprite(selectedId, { x, y, dir });
  };

  return (
    <div className="app-grid">
      <BlockPanel onAdd={addSprite} onCommand={runCommand} />
      <StagePanel
        sprites={sprites}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
