import { useMemo, useState } from 'react';
import { deliveryAnalysis, deliveryArchetypes, deliverySpectrums, emphasisWords } from '../../resources/data';

const keys = Object.keys(deliverySpectrums);
const initialValues = Object.fromEntries(keys.map(key => [key, 3]));
const MAX_PROFILE_NOTES = 6;

function Analysis({ example, strengths, weaknesses }) {
  return <div className="analysis-list">
    {example && <p className="analysis-item" data-tone="example">Example: {example}</p>}
    {strengths.map(text => <p key={text} className="analysis-item" data-tone="strength"><span className="visually-hidden">Strength: </span>{text}</p>)}
    {weaknesses.map(text => <p key={text} className="analysis-item" data-tone="weakness"><span className="visually-hidden">Weakness: </span>{text}</p>)}
  </div>;
}

export default function MannerLab() {
  const [active, setActive] = useState('volume');
  const [values, setValues] = useState(initialValues);
  const [word, setWord] = useState('I');
  const spectrum = deliverySpectrums[active];
  const level = values[active];
  const analysis = deliveryAnalysis[active][level - 1];
  const profile = useMemo(() => {
    const notes = keys.map(key => deliveryAnalysis[key][values[key] - 1]);
    return {
      strengths: notes.flatMap(item => item.s).slice(0, MAX_PROFILE_NOTES),
      weaknesses: notes.flatMap(item => item.w).slice(0, MAX_PROFILE_NOTES),
    };
  }, [values]);
  const update = (key, value) => setValues(previous => ({ ...previous, [key]: Number(value) }));

  return <div>
    <div className="tool-head"><div><h2>Manner Matters Speaking Lab</h2><p>Practice volume, tone, pace, articulation, emphasis, certainty, gestures, and eye contact.</p></div></div>
    <div className="tool-grid">
      <article className="lesson-box">
        <p className="resource-card__meta">Emphasis</p><h3>The Power of Emphasis</h3><p>Click each word to see how emphasis changes the sentence.</p>
        <div className="emphasis-sentence">
          {emphasisWords.map(([text]) => <button type="button" key={text} className="emphasis-word" aria-pressed={word === text} onClick={() => setWord(text)}>{text}</button>)}
          <span aria-hidden="true">.</span>
        </div>
        <p className="answer-box" aria-live="polite">{emphasisWords.find(([text]) => text === word)?.[1]}</p>
      </article>
      <article className="lesson-box">
        <p className="resource-card__meta">Spectrum</p><h3>{spectrum.label}</h3><p>{spectrum.why}</p>
        <div className="range-row"><label htmlFor="spectrum-slider">{spectrum.label}</label><output htmlFor="spectrum-slider" className="range-label">{spectrum.levels[level - 1]}</output></div>
        <input id="spectrum-slider" className="slider" type="range" min="1" max="5" value={level} aria-valuetext={spectrum.levels[level - 1]} onChange={event => update(active, event.target.value)} />
        <Analysis example={analysis.ex} strengths={analysis.s} weaknesses={analysis.w} />
      </article>
    </div>
    <div className="tool-grid">
      <article className="lesson-box">
        <p className="resource-card__meta">Choose a Spectrum</p>
        <div className="spectrum-buttons" role="group" aria-label="Delivery spectrum">
          {keys.map(key => <button type="button" key={key} aria-pressed={active === key} onClick={() => setActive(key)}>{deliverySpectrums[key].label}</button>)}
        </div>
        <h4>Archetype Explorer</h4>
        <ul className="archetype-list">{Object.entries(deliveryArchetypes).map(([name, preset]) => <li key={name}><button type="button" className="archetype-button" onClick={() => setValues(preset)}>{name}</button></li>)}</ul>
      </article>
      <article className="lesson-box">
        <p className="resource-card__meta">Profile Lab</p>
        {keys.map(key => <div className="profile-row" key={key}>
          <div className="range-row"><label htmlFor={`profile-${key}`}>{deliverySpectrums[key].label}</label><output htmlFor={`profile-${key}`} className="range-label">{deliverySpectrums[key].levels[values[key] - 1]}</output></div>
          <input id={`profile-${key}`} className="slider" type="range" min="1" max="5" value={values[key]} aria-valuetext={deliverySpectrums[key].levels[values[key] - 1]} onChange={event => update(key, event.target.value)} />
        </div>)}
        <Analysis strengths={profile.strengths} weaknesses={profile.weaknesses} />
      </article>
    </div>
  </div>;
}
