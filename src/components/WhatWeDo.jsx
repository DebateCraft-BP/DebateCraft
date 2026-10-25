// i18n:render-copy
import { t, localeHref } from '../i18n';
import { links } from '../content';
import Disclosure from './Disclosure';
import { debateTracks, bioethicsUnits } from '../programContent';
import { ImageBubble, InquiryClosing, PagePhoto, schoolInquiry, StatementHero, studentInquiry } from './EditorialPage';

function Offering({ id, number, title, file, alt, children }) {
  return <section className="offering editorial-inner" id={id} aria-labelledby={`${id}-label`}>
    <div className="offering__copy"><p className="editorial-eyebrow" id={`${id}-label`}><span aria-hidden="true">{t("/")}{t(number)}</span> {t(id === 'holiday' ? 'Holiday Programs' : id === 'schools' ? 'Schools' : 'Bioethics')}</p><h2 className="heading">{t(title)}</h2><div className="offering__body">{t(children)}</div></div>
    <PagePhoto file={file} alt={t(alt)} caption={t(alt)} />
  </section>;
}

export default function WhatWeDo() {
  return <article className="editorial-page what-page">
    <StatementHero eyebrow={t("What We Do")} variant="statement-hero--offerings" intro={t("Debate, public speaking and bioethics education for students, school teams and holiday cohorts.")}>{t("Clear thinking. ")}<ImageBubble file="Image7.png" />{t(" Confident voices. ")}<em>{t("New possibilities.")}</em> <ImageBubble file="Image2.jpeg" /></StatementHero>
    <nav className="program-jumps editorial-inner" aria-label={t("Our programs")}><a href={localeHref("#schools")}>{t("Schools ")}<span aria-hidden="true">{t("↘")}</span></a><a href={localeHref("#holiday")}>{t("Holiday Programs ")}<span aria-hidden="true">{t("↘")}</span></a><a href={localeHref("#bioethics")}>{t("Bioethics ")}<span aria-hidden="true">{t("↘")}</span></a></nav>
    <Offering id="schools" number="01" title={t("Build a team that keeps growing.")} file="Image7.png" alt={t("Building a structured argument in a DebateCraft online class")}>
      <p>{t("We help schools establish shared foundations, develop junior squads and prepare for competition, with a curriculum and progress records the next cohort can build on.")}</p>
      <p>{t("For existing teams and new debate programs, we align live online coaching with students’ experience, the school calendar and target competitions. Students build arguments, practice rebuttal, rotate roles and review each round with specific feedback.")}</p>
      <p>{t("Attendance, skill checkpoints and clear next steps give school leads a practical view of progress.")}</p>
      <div className="editorial-actions"><a className="button button--filled" href={localeHref(links.schools)}>{t("Explore school programs")}</a><a className="editorial-text-link" href={localeHref(`${links.method}#schools`)}>{t("How school training works")}</a><a className="editorial-text-link" href={localeHref(schoolInquiry)}>{t("Discuss your school ↗")}</a></div>
    </Offering>
    <Offering id="holiday" number="02" title={t("Make room for deeper practice.")} file="Image3.png" alt={t("Timed speaking practice in a DebateCraft online class")}>
      <p>{t("Seasonal small-group courses give students time to build arguments, practice speaking and work through debate rounds with focused feedback.")}</p>
      <p>{t("Our free student group classes range from a first complete speech to advanced competition preparation. Find a starting point below, then ask about the next cohort and timetable.")}</p>
      <div className="course-comparison"><h3>{t("Find your debate level")}</h3><p>{t("Course formats vary by track. Availability and placement are confirmed by inquiry.")}</p>
        {t(debateTracks.map(track => <Disclosure key={track.title} title={t(track.title)} facts={track.facts}><p>{t(track.detail)}</p></Disclosure>))}
      </div>
      <div className="editorial-actions"><a className="button button--filled" href={localeHref("/pages/how-we-work.html#holiday")}>{t("How holiday cohorts work")}</a><a className="editorial-text-link" href={localeHref(studentInquiry)}>{t("Ask about the next cohort ↗")}</a></div>
    </Offering>
    <Offering id="bioethics" number="03" title={t("Explore the choices behind scientific progress.")} file="Image2.jpeg" alt={t("Students and coaches in live online discussion")}>
      <p>{t("Students examine gene editing, AI in healthcare and scientific responsibility, then turn discussion into evidence-based writing and a final project.")}</p>
      <p className="program-facts">{t("Ages 13+ · 10 one-hour sessions · Maximum 10 students · Free student group class")}</p>
      <div className="curriculum"><h3>{t("From scientific foundations to your own ideas")}</h3>{t(bioethicsUnits.map(unit => <Disclosure key={unit.title} title={t(unit.title)}><p>{t(unit.detail)}</p></Disclosure>))}</div>
      <div className="editorial-actions"><a className="button button--filled" href={localeHref("/pages/how-we-work.html#bioethics")}>{t("How bioethics learning works")}</a><a className="editorial-text-link" href={localeHref(studentInquiry)}>{t("Register student interest ↗")}</a></div>
    </Offering>
    <div className="learning-strip" aria-hidden="true"><span>{t("Reason · Speak · Question · Reflect · ")}</span><span>{t("Reason · Speak · Question · Reflect · ")}</span></div>
    <InquiryClosing title={t("Find the right starting point.")} />
  </article>;
}
