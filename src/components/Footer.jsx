import { links, socials } from '../content';
import { FooterMark } from './Logo';
import Newsletter from './Newsletter';

export default function Footer({ children }) {
  return <footer className="footer"><div className="footer__container"><div className="footer__left">
    <a className="footer__logo" href="/" aria-label="DebateCraft home"><FooterMark /></a>
    <ul className="footer__menu">{[['Contact', links.contact], ['Resources', links.resources], ['Privacy Policy', links.privacy], ['Terms of Service', links.terms]].map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
    <div className="footer__socials socials socials--default recreation-socials"><ul className="socials__list">{socials.map(([label, url]) => <li className="socials__item" key={label}><a className="socials__link-button button button--filled" href={url}>{label}</a></li>)}</ul></div>
  </div><div className="footer__right"><div className="footer__newsletter"><p className="label label--white">Newsletter</p><p className="footer__newsletter-description">Get debate drills, class dates and new teaching materials from DebateCraft.</p><Newsletter /><p className="footer__newsletter-privacy wysiwyg-content">Read more on <a href={links.subscribe}>DebateCraft’s Substack</a>. View our <a href={links.privacy}>Privacy Policy</a>.</p><a className="footer-email" href="mailto:info@debatecraft.org">info@debatecraft.org</a></div>
    <div className="footer__copyrights">© {new Date().getFullYear()} DebateCraft. All rights reserved</div>
  </div></div>{children}</footer>;
}
