// i18n:render-copy
import { t, localeHref } from '../i18n';
import { links } from '../content';

// The archived intake is Summer 2026-specific; evergreen inquiries use email.
export const schoolInquiry = 'mailto:info@debatecraft.org?subject=School%20debate%20program';
export const studentInquiry = 'mailto:info@debatecraft.org?subject=Student%20class%20inquiry';

export function PagePhoto({ file, alt, caption, className = '', eager = false }) {
  return <figure className={`editorial-photo ${className}`}>
    <img src={`/media/debatecraft/${file}`} alt={t(alt)} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    {caption && <figcaption>{t(caption)}</figcaption>}
  </figure>;
}

export function ImageBubble({ file, wide = false }) {
  return <span className={`statement-bubble${wide ? ' statement-bubble--wide' : ''}`} aria-hidden="true"><img src={`/media/debatecraft/${file}`} alt={t("")} /></span>;
}

export function StatementHero({ eyebrow, children, intro, variant = '', action }) {
  return <div className={`statement-hero ${variant}`}>
    <div className="statement-hero__disk" aria-hidden="true" />
    <div className="statement-hero__content"><p className="editorial-eyebrow">{t(eyebrow)}</p><h1 className="heading">{t(children)}</h1><p className="statement-hero__intro">{t(intro)}</p>{action && <div className="statement-hero__action">{t(action)}</div>}</div>
  </div>;
}

export function InquiryClosing({ title = 'Start with a conversation.' }) {
  return <section className="inquiry-closing editorial-inner" aria-labelledby="inquiry-title">
    <p className="editorial-eyebrow">{t("Your next step")}</p><h2 className="heading" id="inquiry-title">{t(title)}</h2>
    <div className="inquiry-closing__options"><div><h3>{t("For schools")}</h3><p>{t("Tell us about your students, timetable and training goals.")}</p><a className="button button--filled" href={localeHref(schoolInquiry)}>{t("School inquiries")}</a></div><div><h3>{t("For students")}</h3><p>{t("Share your age, experience and interests. We’ll help you find a starting point.")}</p><a className="button" href={localeHref(studentInquiry)}>{t("Student interest")}</a></div></div>
    <a className="editorial-text-link" href={localeHref(links.contact)}>{t("More ways to get in touch ↗")}</a>
  </section>;
}
