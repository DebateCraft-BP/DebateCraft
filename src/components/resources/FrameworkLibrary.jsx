// i18n:render-copy
import { t } from '../../i18n';
import { replaceLocation } from '../../i18n';
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
    replaceLocation(`#${id}`);
  }

  function generate() {
    const pool = motionBank.filter(item => difficulty === 'All' || item.difficulty === difficulty);
    setGenerated(pool.length ? pool[Math.floor(Math.random() * pool.length)].motion : 'No motions match that filter.');
  }

  return <div>
    <div className="tool-head"><div><h2>{t("Interactive Framework Drills")}</h2><p>{t("Motion types, roles, CPR, PEEL, POIs, rebuttal, clashes, and weighing as hands-on practice tools.")}</p></div></div>
    <div className="lesson-shell">
      <nav className="lesson-nav" aria-label={t("Framework lessons")}>
        {t(frameworkLessons.map(item => <button type="button" key={item.id} aria-current={activeId === item.id ? 'true' : undefined} className={activeId === item.id ? 'active' : ''} onClick={() => choose(item.id)}>{t(item.title)}</button>))}
      </nav>
      <div>
        <article className="lesson-box" key={lesson.id}>
          <p className="resource-card__meta">{t("Lesson")}</p><h3>{t(lesson.title)}</h3><p>{t(lesson.lead)}</p>
          {t(lesson.sections.map(([heading, body, example]) => <section key={heading}><h4>{t(heading)}</h4><p>{t(body)}</p>{example && <p className="example-strip">{t(example)}</p>}</section>))}
          <h4>{t("Practice")}</h4>
          {t(lesson.exercise.map((item, index) => {
            const id = `${lesson.id}-${index}`;
            return <div className="exercise" key={id}>
              <p className="exercise__prompt" id={`${id}-prompt`}>{t(item.prompt)}</p>
              <textarea className="tool-input practice-area" aria-labelledby={`${id}-prompt`} placeholder={t("Write your answer here…")} />
              <button type="button" className="mini-btn" aria-expanded={openAnswer === id} aria-controls={`${id}-answer`} onClick={() => setOpenAnswer(openAnswer === id ? '' : id)}>{t(openAnswer === id ? 'Hide Answer' : 'Show Answer')}</button>
              {openAnswer === id && <p className="answer-box" id={`${id}-answer`}>{t(item.answer)}</p>}
            </div>;
          }))}
        </article>
        <article className="lesson-box">
          <p className="resource-card__meta">{t("Motion Generator")}</p><h3>{t("Generate a Practice Motion")}</h3>
          <div className="generator">
            <label className="tool-field"><span className="visually-hidden">{t("Motion difficulty")}</span>
              <select className="tool-input" name="difficulty" value={difficulty} onChange={event => setDifficulty(event.target.value)}>{t(['All', 'Easy', 'Medium', 'Hard'].map(item => <option key={item} value={item}>{t(item)}</option>))}</select>
            </label>
            <button type="button" className="tool-button" onClick={generate}>{t("Generate Motion")}</button>
          </div>
          <p className="motion-display" aria-live="polite">{t(generated)}</p>
        </article>
      </div>
    </div>
  </div>;
}
