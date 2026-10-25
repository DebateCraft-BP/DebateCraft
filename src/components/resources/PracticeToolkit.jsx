// i18n:render-copy
import { t } from '../../i18n';
import { useState } from 'react';
import { practiceMotionBank } from '../../resources/data';
import { formatClock, removeStored, useCountdown, useStoredState } from '../../resources/hooks';
import Tabs from './Tabs';

const KEYS = { drafts: 'dcPracticeDrafts:v1', favorites: 'dcPracticeFavorites:v1', timer: 'dcTimerPreset:v1' };
const defaults = { motion: 'THW ban zoos.', side: 'Proposition', format: 'WSDC', prepMinutes: 15, context: '', model: '', argumentOne: '', argumentTwo: '', rebuttal: '', weighing: '' };
const DEFAULT_PREP_MINUTES = 15;
const MAX_PREP_MINUTES = 60;
const DEFAULT_CUSTOM_MINUTES = 4;
const MAX_CUSTOM_MINUTES = 20;
const POI_PROTECTED_SECONDS = 60;
const tabs = [{ id: 'bank', label: 'Motion Bank' }, { id: 'prep', label: 'Prep Workspace' }, { id: 'timer', label: 'Speech Timer' }];
const timerPresets = [
  { key: 'wsdc', label: 'WSDC 5:00', seconds: 300, poi: true },
  { key: 'bp', label: 'BP 5:00', seconds: 300, poi: true },
  { key: 'custom', label: 'Custom', seconds: DEFAULT_CUSTOM_MINUTES * 60, poi: false },
];
const noteFields = [['context', 'Context'], ['model', 'Model'], ['argumentOne', 'Argument 1'], ['argumentTwo', 'Argument 2'], ['rebuttal', 'Rebuttal'], ['weighing', 'Weighing']];
const unique = key => ['All', ...new Set(practiceMotionBank.map(item => item[key]))];

function Select({ label, value, options, onChange, name }) {
  return <label className="tool-field"><span className="visually-hidden">{t(label)}</span>
    <select className="tool-input" name={name} value={value} onChange={event => onChange(event.target.value)}>{t(options.map(item => <option key={item} value={item}>{t(item)}</option>))}</select>
  </label>;
}

function TimerFace({ status, remaining, total, running, onToggle, onReset, tone }) {
  return <div className="timer-face">
    <p className="timer-status" aria-live="polite">{t(status)}</p>
    <p className="timer-time" role="timer">{t(formatClock(remaining))}</p>
    <div className="timer-track" aria-hidden="true"><div className="timer-fill" data-tone={tone} style={{ '--fill': total ? remaining / total : 0 }} /></div>
    <div className="timer-actions"><button type="button" className="tool-button tool-button--light" onClick={onToggle}>{t(running ? 'Pause' : 'Start')}</button><button type="button" className="tool-button tool-button--ghost-light" onClick={onReset}>{t("Reset")}</button></div>
  </div>;
}

export default function PracticeToolkit() {
  const [tool, setTool] = useState('bank');
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [format, setFormat] = useState('All');
  const [theme, setTheme] = useState('All');
  const [favorites, setFavorites] = useStoredState(KEYS.favorites, []);
  const initialDraft = { ...defaults, motion: t(defaults.motion) };
  const [storedDraft, setDraft] = useStoredState(KEYS.drafts, initialDraft);
  const [timerPreset, setTimerPreset] = useStoredState(KEYS.timer, 'wsdc');
  const [customMinutes, setCustomMinutes] = useState(DEFAULT_CUSTOM_MINUTES);
  const [notice, setNotice] = useState('');
  const draft = { ...initialDraft, ...storedDraft };
  const preset = timerPresets.find(item => item.key === timerPreset) || timerPresets[0];
  const prepTotal = Math.min(MAX_PREP_MINUTES, Math.max(1, Number(draft.prepMinutes) || DEFAULT_PREP_MINUTES)) * 60;
  const speechTotal = preset.key === 'custom' ? Math.min(MAX_CUSTOM_MINUTES, Math.max(1, Number(customMinutes) || DEFAULT_CUSTOM_MINUTES)) * 60 : preset.seconds;
  const prep = useCountdown(prepTotal);
  const speech = useCountdown(speechTotal);
  const q = query.trim().toLowerCase();
  const motions = practiceMotionBank.filter(item => (!q || `${item.motion} ${t(item.motion)} ${item.difficulty} ${t(item.difficulty)} ${item.format} ${t(item.format)} ${item.theme} ${t(item.theme)}`.toLowerCase().includes(q))
    && (difficulty === 'All' || item.difficulty === difficulty) && (format === 'All' || item.format === format) && (theme === 'All' || item.theme === theme));
  const elapsed = speechTotal - speech.remaining;
  const poiOpen = preset.poi && elapsed >= POI_PROTECTED_SECONDS && speech.remaining > POI_PROTECTED_SECONDS;
  const speechStatus = speech.remaining === 0 ? 'Complete' : preset.poi ? (poiOpen ? 'POI window open' : 'Protected time') : 'Speech time';

  const updateDraft = (key, value) => setDraft(previous => ({ ...defaults, ...previous, [key]: value }));
  const toggleFavorite = id => setFavorites(previous => (previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]));
  function useMotion(item) {
    setDraft(previous => ({ ...defaults, ...previous, motion: t(item.motion), format: item.format === 'Bioethics' ? 'WSDC' : item.format }));
    setTool('prep');
  }
  function clearDraft() { removeStored(KEYS.drafts); setDraft(initialDraft); setNotice(''); }
  function clearAll() {
    if (!window.confirm(t('Clear your saved drafts, favorites, and timer choice from this browser?'))) return;
    Object.values(KEYS).forEach(removeStored);
    setDraft(initialDraft); setFavorites([]); setTimerPreset('wsdc'); setCustomMinutes(DEFAULT_CUSTOM_MINUTES);
    prep.reset(); speech.reset(); setNotice('');
  }
  async function copyNotes() {
    const text = [`${t("Motion")}: ${draft.motion}`, `${t("Side")}: ${t(draft.side)}`, `${t("Format")}: ${t(draft.format)}`, '', ...noteFields.map(([key, label]) => `${t(label)}: ${draft[key]}`)].join('\n');
    try { await navigator.clipboard.writeText(text); setNotice('Copied to clipboard'); } catch { setNotice('Copy unavailable; select the notes manually.'); }
  }

  return <div>
    <div className="tool-head">
      <div><h2>{t("Practice Toolkit")}</h2><p>{t("Search motions, favorite practice topics, build prep notes, and train speech timing for common debate formats.")}</p></div>
      <button type="button" className="mini-btn" onClick={clearAll}>{t("Clear toolkit data")}</button>
    </div>
    <Tabs label={t("Practice toolkit")} items={tabs} value={tool} onChange={setTool} idPrefix="toolkit" className="toolkit-tabs" />
    <div className="toolkit-panel" role="tabpanel" id="toolkit-panel" aria-labelledby={`toolkit-tab-${tool}`}>
      {tool === 'bank' && <>
        <div className="filter-bar">
          <label className="tool-field"><span className="visually-hidden">{t("Search motions")}</span><input className="tool-input" type="search" name="motion-search" autoComplete="off" spellCheck={false} placeholder={t("Search motions…")} value={query} onChange={event => setQuery(event.target.value)} /></label>
          <Select label={t("Difficulty")} name="difficulty" value={difficulty} options={['All', 'Easy', 'Medium', 'Hard']} onChange={setDifficulty} />
          <Select label={t("Format")} name="format" value={format} options={unique('format')} onChange={setFormat} />
          <Select label={t("Theme")} name="theme" value={theme} options={unique('theme')} onChange={setTheme} />
        </div>
        {t(motions.length
          ? <ul className="motion-list">{t(motions.map(item => <li className="motion-card" key={item.id}>
            <h3>{t(item.motion)}</h3>
            <p className="motion-meta">{t([item.difficulty, item.format, item.theme].map(meta => <span key={meta}>{t(meta)}</span>))}</p>
            <div className="motion-actions">
              <button type="button" className="mini-btn" onClick={() => useMotion(item)}>{t("Use in Prep")}</button>
              <button type="button" className="mini-btn" aria-pressed={favorites.includes(item.id)} onClick={() => toggleFavorite(item.id)}>{t(favorites.includes(item.id) ? 'Saved' : 'Favorite')}</button>
            </div>
          </li>))}</ul>
          : <p className="tool-empty" role="status">{t("No motions match those filters.")}</p>)}
      </>}
      {tool === 'prep' && <div>
        <div className="tool-head">
          <div><h3>{t("Prep Workspace")}</h3><p>{t("Draft your model, case, rebuttal, and weighing. Notes stay only in this browser.")}</p></div>
          <div className="tool-actions"><button type="button" className="mini-btn" onClick={copyNotes}>{t("Copy Notes")}</button><button type="button" className="mini-btn" onClick={clearDraft}>{t("Clear Draft")}</button></div>
        </div>
        {notice && <p className="answer-box" role="status">{t(notice)}</p>}
        <div className="tool-grid">
          <TimerFace status="Prep Timer" remaining={prep.remaining} total={prepTotal} running={prep.running} onToggle={prep.toggle} onReset={prep.reset} />
          <div className="prep-grid">
            <label className="prep-field"><span>{t("Side")}</span><select className="tool-input" name="side" value={draft.side} onChange={event => updateDraft('side', event.target.value)}>{t(['Proposition', 'Opposition', 'Government', 'Opposition/Closing'].map(item => <option key={item} value={item}>{t(item)}</option>))}</select></label>
            <label className="prep-field"><span>{t("Format")}</span><select className="tool-input" name="format" value={draft.format} onChange={event => updateDraft('format', event.target.value)}>{t(['WSDC', 'BP', 'General'].map(item => <option key={item} value={item}>{t(item)}</option>))}</select></label>
            <label className="prep-field"><span>{t("Prep minutes")}</span><input className="tool-input" type="number" name="prep-minutes" inputMode="numeric" min="1" max={MAX_PREP_MINUTES} autoComplete="off" value={draft.prepMinutes} onChange={event => updateDraft('prepMinutes', event.target.value)} /></label>
          </div>
        </div>
        <label className="prep-field"><span>{t("Motion")}</span><textarea className="tool-input practice-area" name="motion" autoComplete="off" value={draft.motion} onChange={event => updateDraft('motion', event.target.value)} /></label>
        <div className="prep-grid">{t(noteFields.map(([key, label]) => <label className="prep-field" key={key}><span>{t(label)}</span><textarea className="tool-input practice-area" name={key} autoComplete="off" value={draft[key]} onChange={event => updateDraft(key, event.target.value)} /></label>))}</div>
      </div>}
      {tool === 'timer' && <div>
        <div className="tool-head"><div><h3>{t("Speech Timer")}</h3><p>{t("Choose a speech format and track protected time and POI windows. No audio will play.")}</p></div></div>
        <div className="segmented" role="group" aria-label={t("Speech format")}>{t(timerPresets.map(item => <button type="button" key={item.key} aria-pressed={timerPreset === item.key} onClick={() => { setTimerPreset(item.key); speech.reset(); }}>{t(item.label)}</button>))}</div>
        {preset.key === 'custom' && <label className="prep-field prep-field--narrow"><span>{t("Custom minutes")}</span><input className="tool-input" type="number" name="custom-minutes" inputMode="numeric" min="1" max={MAX_CUSTOM_MINUTES} autoComplete="off" value={customMinutes} onChange={event => setCustomMinutes(event.target.value)} /></label>}
        <TimerFace status={speechStatus} remaining={speech.remaining} total={speechTotal} running={speech.running} onToggle={speech.toggle} onReset={speech.reset} tone={poiOpen ? 'poi' : undefined} />
      </div>}
    </div>
  </div>;
}
