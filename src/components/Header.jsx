import { useEffect, useRef, useState } from 'react';
import { HeaderMark } from './Logo';
import { navigation, socials } from '../content';

export default function Header({ lightHero = true }) {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(() => lightHero && window.scrollY < window.innerHeight * 0.7);
  const trigger = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    const onScroll = () => setLight(lightHero && window.scrollY < window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lightHero]);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia?.('(min-width: 768px)');
    const onResize = () => {
      if (desktop.matches) {
        setOpen(false);
        requestAnimationFrame(() => document.querySelector('.desktop-nav a')?.focus());
      }
    };
    desktop?.addEventListener('change', onResize);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current.querySelector('a').focus();
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab') {
        const controls = [...panel.current.querySelectorAll('a,button')];
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', onKey);
      desktop?.removeEventListener('change', onResize);
      trigger.current?.focus();
    };
  }, [open]);

  const links = () => navigation.map(([label, href]) => <li className="menu-item" key={href}><a href={href}>{label}</a></li>);
  return <header className={`header ${light && !open ? 'header-light' : ''}`}>
    <div className="header__container">
      <a className="header__logo" href="/" aria-label="DebateCraft home"><HeaderMark /></a>
      <button className="burger header__burger" ref={trigger} aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
        <span className="burger__label">Menu</span><span className="burger__face burger__face--front"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.25 8.25h19.5v1.5H2.25zm0 6h19.5v1.5H2.25z" fill="currentColor" /></svg></span>
      </button>
      <nav className="nav desktop-nav" aria-label="Primary navigation"><div className="nav__container"><ul className="nav__menu">{links()}</ul></div></nav>
    </div>
    {open && <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation" ref={panel}>
      <nav aria-label="Mobile navigation"><ul>{links()}</ul></nav>
      <div className="mobile-socials">{socials.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
      <button className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
    </div>}
  </header>;
}
