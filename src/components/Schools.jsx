// i18n:render-copy
import { t, localeHref } from '../i18n';
import { links } from '../content';
import { schoolStages } from '../programContent';
import { ImageBubble, PagePhoto, schoolInquiry, StatementHero } from './EditorialPage';

const priorities = [
  ['Shared foundations', 'Give new and experienced students a common language for arguments, rebuttal and useful feedback.'],
  ['Practical staff oversight', 'Keep school leads informed through concise records, without expecting teachers to coach every round.'],
  ['Readiness-based progression', 'Build a junior bench and help students move forward when their work shows they are ready.'],
];
const delivery = [
  ['Live online coaching', 'Live online groups of 5–10 students can meet weekly or every other week for two-hour sessions. We agree the schedule, time zone, exam dates, platform and school contact before launch.'],
  ['Visible progress', 'Attendance, skill checkpoints, round notes and student next steps give school leads a practical view of learning and areas to work on.'],
  ['Continuity between cohorts', 'A competition-preparation plan, staff checkpoints and curriculum handover help the next cohort build on the work already done.'],
];

export default function Schools() {
  return <article className="editorial-page schools-page">
    <StatementHero
      eyebrow={t("DebateCraft for Schools")}
      variant="statement-hero--schools"
      intro={t("Live online coaching, a shared curriculum and clear progress records, shaped around your students and school calendar.")}
      action={<a className="button button--filled" href={localeHref(schoolInquiry)}>{t("Discuss your school")}</a>}
    >{t("Build a school team ")}<ImageBubble file="Image2.jpeg" />{t(" that ")}<em>{t("keeps growing.")}</em></StatementHero>

    <nav className="program-jumps editorial-inner" aria-label={t("School program")}>
      <a href={localeHref("#pathway")}>{t("Pathway ")}<span aria-hidden="true">{t("↘")}</span></a>
      <a href={localeHref("#delivery")}>{t("Delivery ")}<span aria-hidden="true">{t("↘")}</span></a>
      <a href={localeHref("#inquiries")}>{t("School inquiries ")}<span aria-hidden="true">{t("↘")}</span></a>
    </nav>

    <section className="school-overview editorial-inner" aria-labelledby="school-overview-title">
      <div className="school-overview__intro">
        <div>
          <p className="editorial-eyebrow">{t("Built around your school")}</p>
          <h2 className="heading" id="school-overview-title">{t("Keep the next cohort moving forward.")}</h2>
          <p>{t("When senior debaters graduate, their experience should give the next team a starting point. We connect student progression, regular coaching, competition preparation and school handover into one continuing program.")}</p>
          <p>{t("For an existing team or a new debate club, we begin with your students’ experience, school calendar, staff capacity and goals.")}</p>
        </div>
        <PagePhoto file="Image7.png" alt={t("An argument-building exercise in an online DebateCraft class")} caption={t("Shared ideas, put into practice.")} />
      </div>
      <ul className="school-cards">{t(priorities.map(([title, copy]) => <li key={title}><h3 className="heading">{t(title)}</h3><p>{t(copy)}</p></li>))}</ul>
    </section>

    <section className="school-pathway-section editorial-inner" id="pathway" aria-labelledby="school-pathway-title">
      <div className="editorial-section-title">
        <p className="editorial-eyebrow">{t("A framework to tailor")}</p>
        <h2 className="heading" id="school-pathway-title">{t("From first speeches to a lasting team.")}</h2>
        <p>{t("We adapt the sequence and timing with your school.")}</p>
      </div>
      <ol className="school-pathway">{t(schoolStages.map(([title, timing, output, work], index) => <li key={title}>
        <span className="school-step-number" aria-hidden="true">{t("/0")}{t(index + 1)}</span>
        <div className="school-step-heading"><p className="school-step-timing">{t(timing)}</p><h3 className="heading">{t(title)}</h3></div>
        <div className="school-step-copy"><p>{t(work)}</p><p><strong>{t("What the school receives")}</strong>{t(output)}</p></div>
      </li>))}</ol>
    </section>

    <section className="school-delivery editorial-inner" id="delivery" aria-labelledby="school-delivery-title">
      <div className="editorial-section-title"><p className="editorial-eyebrow">{t("Delivery and records")}</p><h2 className="heading" id="school-delivery-title">{t("Useful teaching.")}<br />{t("Visible progress.")}</h2></div>
      <ul className="school-cards">{t(delivery.map(([title, copy]) => <li key={title}><h3 className="heading">{t(title)}</h3><p>{t(copy)}</p></li>))}</ul>
      <div className="school-team-link"><p>{t("Get to know the people who teach, plan and support our programs.")}</p><a className="editorial-text-link" href={localeHref(links.team)}>{t("Meet our team")}</a></div>
    </section>

    <section className="school-inquiries inquiry-closing editorial-inner" id="inquiries" aria-labelledby="school-inquiry-title">
      <p className="editorial-eyebrow">{t("School inquiries")}</p>
      <h2 className="heading" id="school-inquiry-title">{t("Tell us what your school needs.")}</h2>
      <div className="school-inquiries__layout">
        <div><p>{t("A few details help us shape a useful conversation:")}</p><ul>
          <li>{t("Student numbers, year groups and debate experience.")}</li>
          <li>{t("Preferred formats and target competitions.")}</li>
          <li>{t("Your school calendar and weekly availability.")}</li>
          <li>{t("A staff contact and any assessment needs.")}</li>
        </ul></div>
        <div><p>{t("We’ll discuss scope, timing and arrangements with you.")}</p><a className="button button--filled" href={localeHref(schoolInquiry)}>{t("Email a school inquiry")}</a><a className="editorial-text-link" href={localeHref(links.method)}>{t("See our overall teaching approach ↗")}</a></div>
      </div>
    </section>
  </article>;
}
