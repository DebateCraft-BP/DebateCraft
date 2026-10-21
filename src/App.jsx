import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { Hero, Impact, Programs, News } from './components/Homepage';
import { useRef } from 'react';
import useReveals from './useReveals';
import Team from './components/Team';

export default function App() {
  const root = useRef(null);
  const teamPage = window.location.pathname === '/pages/team.html';
  useReveals(root);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="overall" id="top" ref={root}><Header lightHero={!teamPage} /><main id="main" className="main-container">{teamPage ? <Team /> : <article className="front-page"><Hero /><Impact /><Programs /><News /></article>}</main><Footer><CookieConsent /></Footer></div>
  </>;
}
