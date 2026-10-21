import { useRef, useState } from 'react';

export default function DraggableCard({ children }) {
  const pointer = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, active: false });
  function start(event) {
    if (event.button !== 0 || !window.matchMedia('(min-width: 768px)').matches) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPosition({ x: 0, y: 0, active: true });
  }
  function move(event) {
    const origin = pointer.current;
    if (!origin || origin.id !== event.pointerId) return;
    setPosition({ x: event.clientX - origin.x, y: event.clientY - origin.y, active: true });
  }
  function settle() {
    pointer.current = null;
    setPosition({ x: 0, y: 0, active: false });
  }
  return <li className="programs-cards__card programs-card" onPointerDown={start} onPointerMove={move} onPointerUp={settle} onPointerCancel={settle} onLostPointerCapture={settle} onDragStart={event => event.preventDefault()} style={{ translate: `${position.x}px ${position.y}px`, transition: position.active ? 'none' : 'translate 250ms ease-out' }}>{children}</li>;
}
