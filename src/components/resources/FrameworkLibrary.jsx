import { useEffect, useState } from 'react';
import { frameworkLessons, motionBank } from '../../resources/data';

const idle = 'Click Generate Motion to get a practice topic.';
const lessonFromHash = () => {
  const hash = window.location.hash.slice(1);
  return frameworkLessons.some(lesson => lesson.id === hash) ? hash : frameworkLessons[0].id;
};

export default function FrameworkLibrary() {
  const [activeId, setActiveId] = useState(lessonFromHash);
  const [openAnswer, setOpenAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [generated, setGenerated] = useState(idle);
  const lesson = frameworkLessons.find(item => item.id === activeId);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!frameworkLessons.some(item => item.id === hash)) return;
      setActiveId(hash);
      setOpenAnswer('');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function choose(id) {
    setActiveId(id);
    setOpenAnswer('');
    window.history.replaceState(null, '', `#${id}`);
  }

  function generate() {
    const pool = motionBank.filter(item => difficulty === 'All' || item.difficulty === difficulty);
    setGenerated(pool.length ? pool[Math.floor(Math.random() * pool.length)].motion : 'No motions match that filter.');
  }

  return <div>
    <div className="tool-head"><div><h2>Interactive Framework Drills</h2><p>Motion types, roles, CPR, PEEL, POIs, rebuttal, clashes, and weighing as hands-on practice tools.</p></div></div>
    <div className="lesson-shell">
      <nav className="lesson-nav" aria-label="Framework lessons">
        {frameworkLessons.map(item => <button type="button" key={item.id} aria-current={activeId === item.id ? 'true' : undefined} className={activeId === item.id ? 'active' : ''} onClick={() => choose(item.id)}>{item.title}</button>)}
      </nav>
      <div>
        <article className="lesson-box" key={lesson.id}>
          <p className="resource-card__meta">Lesson</p><h3>{lesson.title}</h3><p>{lesson.lead}</p>
          {lesson.sections.map(([heading, body, example]) => <section key={heading}><h4>{heading}</h4><p>{body}</p>{example && <p className="example-strip">{example}</p>}</section>)}
          <h4>Practice</h4>
          {lesson.exercise.map((item, index) => {
            const id = `${lesson.id}-${index}`;
            return <div className="exercise" key={id}>
              <p className="exercise__prompt" id={`${id}-prompt`}>{item.prompt}</p>
              <textarea className="tool-input practice-area" aria-labelledby={`${id}-prompt`} placeholder="Write your answer here…" />
              <button type="button" className="mini-btn" aria-expanded={openAnswer === id} aria-controls={`${id}-answer`} onClick={() => setOpenAnswer(openAnswer === id ? '' : id)}>{openAnswer === id ? 'Hide Answer' : 'Show Answer'}</button>
              {openAnswer === id && <p className="answer-box" id={`${id}-answer`}>{item.answer}</p>}
            </div>;
          })}
        </article>
        <article className="lesson-box">
          <p className="resource-card__meta">Motion Generator</p><h3>Generate a Practice Motion</h3>
          <div className="generator">
            <label className="tool-field"><span className="visually-hidden">Motion difficulty</span>
              <select className="tool-input" name="difficulty" value={difficulty} onChange={event => setDifficulty(event.target.value)}>{['All', 'Easy', 'Medium', 'Hard'].map(item => <option key={item} value={item}>{item}</option>)}</select>
            </label>
            <button type="button" className="tool-button" onClick={generate}>Generate Motion</button>
          </div>
          <p className="motion-display" aria-live="polite">{generated}</p>
        </article>
      </div>
    </div>
  </div>;
}
