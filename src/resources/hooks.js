import { useCallback, useEffect, useRef, useState } from 'react';

export function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function removeStored(key) {
  try { window.localStorage.removeItem(key); } catch { /* Storage is optional; the tool keeps working in memory. */ }
}

export function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => readStored(key, fallback));
  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* Keep the in-memory value. */ }
  }, [key, value]);
  return [value, setValue];
}

// Counts against a wall-clock deadline so background-tab throttling cannot slow it down.
export function useCountdown(totalSeconds) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const remainingRef = useRef(remaining);
  remainingRef.current = remaining;

  useEffect(() => {
    if (!running) return undefined;
    const deadline = Date.now() + remainingRef.current * 1000;
    const id = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) setRunning(false);
    }, 250);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) setRemaining(totalSeconds);
  }, [totalSeconds]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => { setRunning(false); setRemaining(totalSeconds); }, [totalSeconds]);
  const toggle = useCallback(() => {
    if (remainingRef.current === 0) setRemaining(totalSeconds);
    setRunning(value => !value);
  }, [totalSeconds]);
  return { remaining, running, toggle, reset };
}

export function formatClock(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(Math.floor(safe % 60)).padStart(2, '0')}`;
}

export function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}
