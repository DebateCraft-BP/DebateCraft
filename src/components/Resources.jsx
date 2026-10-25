// i18n:render-copy
import { t, localeHref, isChinese } from '../i18n';
import { replaceLocation } from '../i18n';
import { useEffect, useState } from 'react';
import { frameworkLessons } from '../resources/data';
import { links } from '../content';
import Tabs from './resources/Tabs';
import GuideLibrary from './resources/GuideLibrary';
import PracticeToolkit from './resources/PracticeToolkit';
import FrameworkLibrary from './resources/FrameworkLibrary';
import MannerLab from './resources/MannerLab';
import EvenIfGame from './resources/EvenIfGame';

const tools = [
  { id: 'guides', label: 'Guides', meta: 'PDF', Panel: GuideLibrary },
  { id: 'practice', label: 'Practice Toolkit', meta: 'Tools', Panel: PracticeToolkit },
  { id: 'frameworks', label: 'Frameworks', meta: 'Drills', Panel: FrameworkLibrary },
  { id: 'manner', label: 'Manner', meta: 'Lab', Panel: MannerLab },
  { id: 'even-if', label: 'Even If', meta: 'Game', Panel: EvenIfGame },
];
// Hashes from the previous resources pages keep working.
const aliases = { learn: 'frameworks', mitigation: 'even-if' };
const practiceImages = [
  { file: 'Image3.png', width: 2582, height: 1650, caption: 'Guided argument practice', alt: 'Online lesson screenshot showing a debate timer, class materials, and video call participants' },
  { file: 'Image6.png', width: 2580, height: 1558, caption: 'Interactive lesson materials', alt: 'Online lesson screenshot showing debate slide materials and video call participants' },
  { file: 'Image7.png', width: 2566, height: 1588, caption: 'Guided PEEL argument practice', alt: 'Online lesson screenshot showing a highlighted debate argument slide and video call participants' },
];

function toolFromHash() {
  const hash = window.location.hash.slice(1);
  if (tools.some(tool => tool.id === hash)) return hash;
  if (aliases[hash]) return aliases[hash];
  return frameworkLessons.some(lesson => lesson.id === hash) ? 'frameworks' : 'guides';
}

export default function Resources() {
  const [active, setActive] = useState(toolFromHash);
  const { Panel } = tools.find(tool => tool.id === active);

  useEffect(() => {
    const onHashChange = () => setActive(toolFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function choose(id) {
    setActive(id);
    replaceLocation(`#${id}`);
  }

  return <article className="page-about-us resources-page">
    <div className="resources-intro">
      <h1 className="hero-about__heading heading">{t("Debate Resource Library")}</h1>
      <p>{t("Guides, videos, the Practice Toolkit, framework drills, delivery practice, and the Even If mitigation game in one resource hub. Everything is free.")}</p>
    </div>
    <div className="resource-layout">
      <Tabs label={t("Resource sections")} items={tools} value={active} onChange={choose} idPrefix="resources" orientation="vertical" className="resource-sidebar" />
      <div className="resource-panel" role="tabpanel" id="resources-panel" aria-labelledby={`resources-tab-${active}`}><Panel key={active} /></div>
    </div>
    <section className="resources-practice" aria-labelledby="practice-title">
      <p className="label label--green">{t("Skill Practice")}</p>
      <h2 className="heading" id="practice-title">{t("Materials That ")}<em>{t("Become Practice.")}</em></h2>
      <p>{t("Classroom visuals show how lesson materials, timed drills, and guided debate practice connect to the resource hub.")}</p>
      <ul className="resources-practice__list">{t(practiceImages.map(image => <li key={image.file}><figure>
        <img src={`/media/debatecraft/${image.file}`} width={image.width} height={image.height} alt={t(image.alt)} loading="lazy" decoding="async" />
        <figcaption>{t(image.caption)}</figcaption>
      </figure></li>))}</ul>
    </section>
    <section className="resources-blog" aria-labelledby="blog-title">
      <p className="label label--sea">{t("Blog")}</p>
      <h2 className="heading" id="blog-title">{t("Notes on debate training, tournaments, and teaching.")}</h2>
      <ul className="resources-blog__list">
        <li className="resource-card">
          {isChinese() && <p className="resource-language">英文資源</p>}<p className="resource-card__meta">{t("July 6, 2025 · Adrian Chan")}</p><h3>{t("Why I Debate")}</h3>
          <p>{t("Debate sharpens arguments, but practice also teaches teammates to test controversial ideas without tearing each other down.")}</p>
          <a className="tool-button" href={localeHref("https://debatecraft.substack.com/p/e79f3fbf-a404-402f-9702-6e962aa5660a")} target="_blank" rel="noopener noreferrer">{t("Read More")}<span className="visually-hidden">{t(" about Why I Debate (opens in a new tab)")}</span></a>
        </li>
        <li className="resource-card">
          <p className="resource-card__meta">{t("Newsletter")}</p><h3>{t("Subscribe")}</h3>
          <p>{t("Receive debate drills, class dates, and new teaching materials.")}</p>
          <a className="tool-button" href={localeHref(links.subscribe)} target="_blank" rel="noopener noreferrer">{t("Subscribe")}<span className="visually-hidden">{t(" on Substack (opens in a new tab)")}</span></a>
        </li>
      </ul>
    </section>
  </article>;
}
