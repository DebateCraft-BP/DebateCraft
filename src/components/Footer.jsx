// i18n:render-copy
import { t, localeHref } from '../i18n';
import { links, socials } from '../content';
import { FooterMark } from './Logo';
import Newsletter from './Newsletter';

export default function Footer({ children }) {
  return <footer className="footer"><div className="footer__container"><div className="footer__left">
    <a className="footer__logo" href={localeHref("/")} aria-label={t("DebateCraft home")}><FooterMark /></a>
    <ul className="footer__menu">{t([['Contact', links.contact], ['Resources', links.resources]].map(([label, href]) => <li key={href}><a href={localeHref(href)}>{t(label)}</a></li>))}</ul>
    <div className="footer__socials socials socials--default recreation-socials"><ul className="socials__list">{t(socials.map(([label, url]) => <li className="socials__item" key={label}><a className="socials__link-button button button--filled" href={localeHref(url)}>{t(label)}</a></li>))}</ul></div>
  </div><div className="footer__right"><div className="footer__newsletter"><p className="label label--white">{t("Newsletter")}</p><p className="footer__newsletter-description">{t("Get debate drills, class dates and new teaching materials from DebateCraft.")}</p><Newsletter /><p className="footer__newsletter-privacy wysiwyg-content">{t("Read more on ")}<a href={localeHref(links.subscribe)}>{t("DebateCraft’s Substack")}</a>{t(".")}</p><a className="footer-email" href={localeHref("mailto:info@debatecraft.org")}>{t("info@debatecraft.org")}</a></div>
    <div className="footer__copyrights">{t("© ")}{t(new Date().getFullYear())}{t(" DebateCraft. All rights reserved")}</div>
  </div></div>{t(children)}</footer>;
}
