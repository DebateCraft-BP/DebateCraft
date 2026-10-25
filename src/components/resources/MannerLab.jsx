// i18n:render-copy
import { t } from '../../i18n';
import { useMemo, useState } from 'react';
import { deliveryAnalysis, deliveryArchetypes, deliverySpectrums, emphasisWords } from '../../resources/data';

const keys = Object.keys(deliverySpectrums);
const initialValues = Object.fromEntries(keys.map(key => [key, 3]));
const MAX_PROFILE_NOTES = 6;

function Analysis({ example, strengths, weaknesses }) {
  return <div className="analysis-list">
    {example && <p className="analysis-item" data-tone="example">{t("Example: ")}{t(example)}</p>}
    {t(strengths.map(text => <p key={text} className="analysis-item" data-tone="strength"><span className="visually-hidden">{t("Strength: ")}</span>{t(text)}</p>))}
    {t(weaknesses.map(text => <p key={text} className="analysis-item" data-tone="weakness"><span className="visually-hidden">{t("Weakness: ")}</span>{t(text)}</p>))}
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
    <div className="tool-head"><div><h2>{t("Manner Matters Speaking Lab")}</h2><p>{t("Practice volume, tone, pace, articulation, emphasis, certainty, gestures, and eye contact.")}</p></div></div>
    <div className="tool-grid">
      <article className="lesson-box">
        <p className="resource-card__meta">{t("Emphasis")}</p><h3>{t("The Power of Emphasis")}</h3><p>{t("Click each word to see how emphasis changes the sentence.")}</p>
        <div className="emphasis-sentence">
          {t(emphasisWords.map(([text]) => <button type="button" key={text} className="emphasis-word" aria-pressed={word === text} onClick={() => setWord(text)}>{t(text)}</button>))}
          <span aria-hidden="true">{t(".")}</span>
        </div>
        <p className="answer-box" aria-live="polite">{t(emphasisWords.find(([text]) => text === word)?.[1])}</p>
      </article>
      <article className="lesson-box">
        <p className="resource-card__meta">{t("Spectrum")}</p><h3>{t(spectrum.label)}</h3><p>{t(spectrum.why)}</p>
        <div className="range-row"><label htmlFor="spectrum-slider">{t(spectrum.label)}</label><output htmlFor="spectrum-slider" className="range-label">{t(spectrum.levels[level - 1])}</output></div>
        <input id="spectrum-slider" className="slider" type="range" min="1" max="5" value={level} aria-valuetext={t(spectrum.levels[level - 1])} onChange={event => update(active, event.target.value)} />
        <Analysis example={analysis.ex} strengths={analysis.s} weaknesses={analysis.w} />
      </article>
    </div>
    <div className="tool-grid">
      <article className="lesson-box">
        <p className="resource-card__meta">{t("Choose a Spectrum")}</p>
        <div className="spectrum-buttons" role="group" aria-label={t("Delivery spectrum")}>
          {t(keys.map(key => <button type="button" key={key} aria-pressed={active === key} onClick={() => setActive(key)}>{t(deliverySpectrums[key].label)}</button>))}
        </div>
        <h4>{t("Archetype Explorer")}</h4>
        <ul className="archetype-list">{t(Object.entries(deliveryArchetypes).map(([name, preset]) => <li key={name}><button type="button" className="archetype-button" onClick={() => setValues(preset)}>{t(name)}</button></li>))}</ul>
      </article>
      <article className="lesson-box">
        <p className="resource-card__meta">{t("Profile Lab")}</p>
        {t(keys.map(key => <div className="profile-row" key={key}>
          <div className="range-row"><label htmlFor={`profile-${key}`}>{t(deliverySpectrums[key].label)}</label><output htmlFor={`profile-${key}`} className="range-label">{t(deliverySpectrums[key].levels[values[key] - 1])}</output></div>
          <input id={`profile-${key}`} className="slider" type="range" min="1" max="5" value={values[key]} aria-valuetext={t(deliverySpectrums[key].levels[values[key] - 1])} onChange={event => update(key, event.target.value)} />
        </div>))}
        <Analysis strengths={profile.strengths} weaknesses={profile.weaknesses} />
      </article>
    </div>
  </div>;
}
