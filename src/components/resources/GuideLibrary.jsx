import { useState } from 'react';
import { guideResources, videoResources } from '../../resources/data';

const matches = (item, query) => !query || `${item.group} ${item.title} ${item.text}`.toLowerCase().includes(query);
const newTab = { target: '_blank', rel: 'noopener noreferrer' };

export default function GuideLibrary() {
  const [mode, setMode] = useState('guides');
  const [query, setQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(videoResources[0].id);
  const q = query.trim().toLowerCase();
  const guides = guideResources.filter(item => matches(item, q));
  const videos = videoResources.filter(item => matches(item, q));
  const current = videos.find(item => item.id === activeVideo) || videos[0];

  return <div>
    <div className="tool-head">
      <div><h2>Guides and Video Library</h2><p>Search DebateCraft PDFs, documents, workshop videos, and classic rounds curated for practice.</p></div>
      <div className="segmented" role="group" aria-label="Library section">
        {[['guides', 'Guides'], ['videos', 'Videos']].map(([id, label]) => <button type="button" key={id} aria-pressed={mode === id} onClick={() => setMode(id)}>{label}</button>)}
      </div>
    </div>
    <label className="tool-field"><span className="visually-hidden">Search guides or videos</span>
      <input className="tool-input" type="search" name="library-search" autoComplete="off" spellCheck={false} placeholder="Search guides or videos…" value={query} onChange={event => setQuery(event.target.value)} />
    </label>
    {mode === 'guides' && (guides.length
      ? <ul className="resource-card-grid">{guides.map(item => <li className="resource-card" key={item.title}>
        <p className="resource-card__meta">{item.group}</p><h3>{item.title}</h3><p>{item.text}</p>
        <a className="tool-button" href={item.href} {...newTab}>Open Resource<span className="visually-hidden"> (opens in a new tab)</span></a>
      </li>)}</ul>
      : <p className="tool-empty" role="status">No guides match your search.</p>)}
    {mode === 'videos' && (current
      ? <div className="video-shell">
        <div>
          <div className="video-frame"><iframe key={current.id} src={current.embed} title={current.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          <div className="resource-card">
            <p className="resource-card__meta">{current.group}</p><h3>{current.title}</h3><p>{current.text}</p>
            {current.transcript && <a className="tool-button" href={current.transcript} {...newTab}>Read Transcript<span className="visually-hidden"> (opens in a new tab)</span></a>}
          </div>
        </div>
        <ul className="video-list">{videos.map(item => <li key={item.id}>
          <button type="button" aria-pressed={current.id === item.id} onClick={() => setActiveVideo(item.id)}><strong>{item.title}</strong><span>{item.group}</span></button>
        </li>)}</ul>
      </div>
      : <p className="tool-empty" role="status">No videos match your search.</p>)}
  </div>;
}
