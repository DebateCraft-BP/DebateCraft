import { useEffect, useMemo, useState } from 'react';
import { mitigationDifficulties, mitigationGameData } from '../../resources/data';
import { shuffle } from '../../resources/hooks';

const START_HEALTH = 100;
const DAMAGE = 25;
const HEAL = 5;
const RANKS = [[12000, 'S'], [9000, 'A'], [6000, 'B'], [3000, 'C']];

function outcomeFor(type, ratio, streak) {
  if (type === 'TURN') return { points: Math.floor(1000 + 1000 * ratio + (streak + 1) * 50), verdict: 'CRITICAL HIT', sub: 'Strategic turn. You reversed the logic of the argument.', streak: streak + 1, health: HEAL };
  if (type === 'MITIGATE') return { points: Math.floor(500 + 500 * ratio), verdict: 'DEFLECTED', sub: 'Mitigation. You reduced the size or likelihood of the impact.', streak, health: 0 };
  const timedOut = type === 'TIMEOUT';
  return { points: 0, verdict: 'BREACHED', sub: timedOut ? 'You need a direct response before the timer expires.' : 'Trap answer. It does not reduce or reverse the argument.', streak: 0, health: -DAMAGE };
}

export default function EvenIfGame() {
  const [difficulty, setDifficulty] = useState('RECRUIT');
  const [playlist, setPlaylist] = useState(() => shuffle(mitigationGameData.RECRUIT));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [health, setHealth] = useState(START_HEALTH);
  const [timeLeft, setTimeLeft] = useState(mitigationDifficulties.RECRUIT.time);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('playing');
  const timeLimit = mitigationDifficulties[difficulty].time;
  const current = playlist[round];
  const options = useMemo(() => shuffle(current.o), [current]);

  function start(name = difficulty) {
    setDifficulty(name);
    setPlaylist(shuffle(mitigationGameData[name]));
    setRound(0); setScore(0); setStreak(0); setMaxStreak(0);
    setHealth(START_HEALTH); setSelected(null); setStatus('playing');
    setTimeLeft(mitigationDifficulties[name].time);
  }

  function choose(option) {
    if (selected || status !== 'playing') return;
    const outcome = outcomeFor(option.type, timeLeft / timeLimit, streak);
    const nextHealth = Math.min(START_HEALTH, health + outcome.health);
    setSelected({ ...option, ...outcome });
    setScore(value => value + outcome.points);
    setHealth(nextHealth);
    setStreak(outcome.streak);
    setMaxStreak(value => Math.max(value, outcome.streak));
    if (nextHealth <= 0) setStatus('defeat');
  }

  function next() {
    if (round + 1 >= playlist.length) { setStatus('victory'); return; }
    setRound(value => value + 1);
    setSelected(null);
    setTimeLeft(timeLimit);
  }

  useEffect(() => {
    if (status !== 'playing' || selected) return undefined;
    const id = window.setInterval(() => setTimeLeft(value => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, [status, selected, round, difficulty]);

  useEffect(() => {
    if (status === 'playing' && !selected && timeLeft === 0) choose({ type: 'TIMEOUT', text: 'Time ran out.' });
  }, [timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const rank = (RANKS.find(([minimum]) => score > minimum) || [0, 'D'])[1];
  const lastRound = round + 1 >= playlist.length;

  return <div>
    <div className="tool-head"><div><h2>Even If Mitigation Game</h2><p>Choose turns or mitigations, avoid traps, and answer before the timer expires.</p></div></div>
    <div className="segmented game-levels" role="group" aria-label="Difficulty">
      {Object.entries(mitigationDifficulties).map(([key, item]) => <button type="button" key={key} aria-pressed={difficulty === key} onClick={() => start(key)}>{`${item.label} · ${item.time}s`}</button>)}
    </div>
    <div className="game-shell">
      <dl className="game-hud">
        <div className="hud-card"><dt>Score</dt><dd>{score.toLocaleString()}</dd></div>
        <div className="hud-card"><dt>Health</dt><dd>{Math.max(0, health)}%</dd><div className="meter" aria-hidden="true"><div className="meter-fill" data-low={health < 35} style={{ '--fill': Math.max(0, health) / 100 }} /></div></div>
        <div className="hud-card"><dt>Timer</dt><dd>{timeLeft}s</dd><div className="meter" aria-hidden="true"><div className="meter-fill" data-low={timeLeft < timeLimit / 3} style={{ '--fill': timeLeft / timeLimit }} /></div></div>
        <div className="hud-card"><dt>Round</dt><dd>{`${Math.min(round + 1, playlist.length)}/${playlist.length}`}</dd></div>
      </dl>
      {status === 'playing'
        ? <>
          <div className="game-argument"><p className="resource-card__meta">{mitigationDifficulties[difficulty].text}</p><h3>{current.t}</h3></div>
          <ul className="game-options">{options.map(option => <li key={option.text}><button type="button" className="option-card" aria-pressed={selected?.text === option.text} disabled={!!selected} onClick={() => choose(option)}>{option.text}</button></li>)}</ul>
          {selected && <div className="feedback-card" role="status">
            <h3>{selected.verdict}</h3><p>{selected.sub}</p>
            {selected.points > 0 && <p className="feedback-card__points">{`+${selected.points.toLocaleString()} points`}</p>}
            <button type="button" className="tool-button" onClick={next}>{lastRound ? 'Finish Game' : 'Next Round'}</button>
          </div>}
        </>
        : <div className="feedback-card" role="status">
          <p className="resource-card__meta">{status === 'victory' ? 'Complete' : 'Defense Collapsed'}</p>
          <h3>{status === 'victory' ? `Rank ${rank}` : 'Try Again'}</h3>
          <p>{`Final score: ${score.toLocaleString()}. Best turn streak: ${maxStreak}.`}</p>
          <button type="button" className="tool-button" onClick={() => start(difficulty)}>Restart</button>
        </div>}
    </div>
  </div>;
}
