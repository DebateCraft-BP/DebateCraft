// i18n:render-copy
import { t, localeHref, englishPath, isChinese } from './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { Hero, Impact, Programs, News } from './components/Homepage';
import { useEffect, useRef } from 'react';
import useReveals from './useReveals';
import Team from './components/Team';
import Contact from './components/Contact';
import Resources from './components/Resources';
import WhatWeDo from './components/WhatWeDo';
import HowWeWork from './components/HowWeWork';
import WhoWeAre from './components/WhoWeAre';
import Schools from './components/Schools';

const subpages = {
  '/pages/who-we-are.html': WhoWeAre,
  '/pages/what-we-do.html': WhatWeDo,
  '/pages/how-we-work.html': HowWeWork,
  '/pages/schools.html': Schools,
  '/pages/team.html': Team,
  '/pages/contact.html': Contact,
  '/pages/resources.html': Resources,
};

export default function App() {
  const root = useRef(null);
  const Subpage = subpages[englishPath()];
  useReveals(root);
  useEffect(() => { document.documentElement.lang = isChinese() ? 'zh-HK' : 'en'; }, []);
  useEffect(() => {
    if (![WhoWeAre, WhatWeDo, HowWeWork, Schools].includes(Subpage) || !window.location.hash) return;
    let cancelled = false;
    let target;
    try { target = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    // Static HTML contains the React root, so the first native fragment jump may
    // precede the section. Retry after mounting and local fonts have settled.
    const frame = requestAnimationFrame(() => {
      Promise.resolve(document.fonts?.ready).then(() => {
        if (!cancelled) document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [Subpage]);
  return <>
    <a className="skip-link" href={localeHref("#main")}>{t("Skip to content")}</a>
    <div className="overall" id="top" ref={root}>
      <Header lightHero={!Subpage} />
      <main id="main" className="main-container">
        {t(Subpage ? <Subpage /> : <article className="front-page"><Hero /><Impact /><Programs /><News /></article>)}
      </main>
      <Footer><CookieConsent /></Footer>
    </div>
  </>;
}
