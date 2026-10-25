// i18n:render-copy
import { t, localeHref } from '../i18n';
import { links } from '../content';
import { ImageBubble, InquiryClosing, PagePhoto, StatementHero } from './EditorialPage';

const values = [
  ['Access', 'Make room for curiosity.', 'Free student group classes make debate, public speaking and science ethics available to more young people.'],
  ['Reasoning', 'Ask the next question.', 'We examine assumptions, seek evidence and learn to explain why an argument should persuade.'],
  ['Practice', 'Build skills by using them.', 'Speaking, listening, discussion and specific feedback turn ideas into habits students can keep developing.'],
  ['Community', 'Learn with one another.', 'Students and coaches share knowledge, listen carefully and help the next person take a step forward.'],
];

export default function WhoWeAre() {
  return <article className="editorial-page who-page">
    <StatementHero eyebrow={t("Who We Are")} variant="statement-hero--identity" intro={t("DebateCraft is a student-run initiative providing free student group classes in debate, public speaking and science ethics.")}>{t("Young people ")}<ImageBubble file="Image2.jpeg" />{t(" helping young people ")}<em>{t("find their voice.")}</em> <ImageBubble file="Image1.jpeg" wide /></StatementHero>
    <PagePhoto className="identity-photo editorial-inner" file="Image1.jpeg" alt={t("DebateCraft students and a coach learning together online")} caption={t("Learning together, wherever we are.")} eager />
    <section className="identity-mission editorial-inner" aria-labelledby="mission-label"><div><p className="editorial-eyebrow" id="mission-label">{t("Our mission")}</p><h2 className="heading">{t("Clear thinking.")}<br />{t("Shared opportunity.")}</h2></div><div><p className="editorial-lead">{t("A good question can open a new way of seeing the world. Every young person deserves the chance to ask it.")}</p><p>{t("We bring structured debate training, thoughtful discussion and practical feedback to middle- and high-school students. From a first speech to a difficult ethical question, our aim is to help students reason carefully and communicate with confidence.")}</p><p>{t("Our programs connect free student group classes, school-team development and bioethics learning. Schools can build shared foundations and a junior bench, then progress toward WSDC and British Parliamentary debate.")}</p><div className="editorial-actions"><a className="button button--filled" href={localeHref(links.programs)}>{t("Explore our programs")}</a><a className="editorial-text-link" href={localeHref(links.method)}>{t("How we work ↗")}</a></div></div></section>
    <section className="identity-values editorial-inner" aria-labelledby="values-title"><div className="editorial-section-title"><p className="editorial-eyebrow">{t("Our Values")}</p><h2 className="heading" id="values-title">{t("What we believe in.")}</h2></div><ul>{t(values.map(([title, lead, copy], index) => <li key={title}><span className="value-number" aria-hidden="true">{t("0")}{t(index + 1)}</span><h3 className="heading">{t(title)}</h3><p className="value-lead">{t(lead)}</p><p>{t(copy)}</p></li>))}</ul></section>
    <section className="identity-team editorial-inner" aria-labelledby="people-title"><PagePhoto file="Image5.png" alt={t("Coaches and students taking part in a DebateCraft discussion")} /><div><p className="editorial-eyebrow">{t("Our People")}</p><h2 className="heading" id="people-title">{t("Experience shared.")}<br />{t("Confidence grown.")}</h2><p>{t("Our leadership, coaches and operations team bring debating, adjudication and teaching experience to each part of DebateCraft. Meet the people who plan the classes, guide the discussion and support our learners.")}</p><a className="button button--filled" href={localeHref(links.team)}>{t("Meet our team")}</a></div></section>
    <InquiryClosing title={t("There’s a place to start.")} />
  </article>;
}
