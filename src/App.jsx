import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { Hero, Impact, Programs, News } from './components/Homepage';
import { useRef } from 'react';
import useReveals from './useReveals';
import Team from './components/Team';
import Contact from './components/Contact';
import Resources from './components/Resources';

const subpages = { '/pages/team.html': Team, '/pages/contact.html': Contact, '/pages/resources.html': Resources };

export default function App() {
  const root = useRef(null);
  const Subpage = subpages[window.location.pathname];
  useReveals(root);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="overall" id="top" ref={root}><Header lightHero={!Subpage} /><main id="main" className="main-container">{Subpage ? <Subpage /> : <article className="front-page"><Hero /><Impact /><Programs /><News /></article>}</main><Footer><CookieConsent /></Footer></div>
  </>;
}
