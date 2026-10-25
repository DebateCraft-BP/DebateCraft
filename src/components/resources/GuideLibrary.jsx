// i18n:render-copy
import { t, localeHref, isChinese } from '../../i18n';
import { useState } from 'react';
import { guideResources, videoResources } from '../../resources/data';

const matches = (item, query) => !query || `${item.group} ${item.title} ${item.text} ${t(item.group)} ${t(item.text)}`.toLowerCase().includes(query);
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
      <div><h2>{t("Guides and Video Library")}</h2><p>{t("Search DebateCraft PDFs, documents, workshop videos, and classic rounds curated for practice.")}</p></div>
      <div className="segmented" role="group" aria-label={t("Library section")}>
        {t([['guides', 'Guides'], ['videos', 'Videos']].map(([id, label]) => <button type="button" key={id} aria-pressed={mode === id} onClick={() => setMode(id)}>{t(label)}</button>))}
      </div>
    </div>
    <label className="tool-field"><span className="visually-hidden">{t("Search guides or videos")}</span>
      <input className="tool-input" type="search" name="library-search" autoComplete="off" spellCheck={false} placeholder={t("Search guides or videos…")} value={query} onChange={event => setQuery(event.target.value)} />
    </label>
    {mode === 'guides' && (guides.length
      ? <ul className="resource-card-grid">{t(guides.map(item => <li className="resource-card" key={item.title}>
        {isChinese() && <p className="resource-language">英文資源</p>}<p className="resource-card__meta">{t(item.group)}</p><h3>{item.title}</h3><p>{t(item.text)}</p>
        <a className="tool-button" href={localeHref(item.href)} {...newTab}>{t("Open Resource")}<span className="visually-hidden">{t(" (opens in a new tab)")}</span></a>
      </li>))}</ul>
      : <p className="tool-empty" role="status">{t("No guides match your search.")}</p>)}
    {mode === 'videos' && (current
      ? <div className="video-shell">
        <div>
          <div className="video-frame"><iframe key={current.id} src={current.embed} title={current.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          <div className="resource-card">
            {isChinese() && <p className="resource-language">英文資源</p>}<p className="resource-card__meta">{t(current.group)}</p><h3>{current.title}</h3><p>{t(current.text)}</p>
            {current.transcript && <a className="tool-button" href={localeHref(current.transcript)} {...newTab}>{t("Read Transcript")}<span className="visually-hidden">{t(" (opens in a new tab)")}</span></a>}
          </div>
        </div>
        <ul className="video-list">{t(videos.map(item => <li key={item.id}>
          <button type="button" aria-pressed={current.id === item.id} onClick={() => setActiveVideo(item.id)}><strong>{item.title}</strong><span>{t(item.group)}</span></button>
        </li>))}</ul>
      </div>
      : <p className="tool-empty" role="status">{t("No videos match your search.")}</p>)}
  </div>;
}
