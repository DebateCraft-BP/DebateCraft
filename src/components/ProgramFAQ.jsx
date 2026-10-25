// i18n:render-copy
import { t, localeHref } from '../i18n';
import Disclosure from './Disclosure';
import { links } from '../content';

const questions = () => [
  ['Are student group classes free?', <p>{t("Yes. Our student group classes are free. School-program scope and arrangements are discussed separately with each school.")}</p>],
  ['Which ages and experience levels are suitable?', <p>{t("Introduction to Debate starts at ages 9+. WSDC and BP are for ages 13+ with two or more years of experience. The advanced seminar is for ages 15+ with five or more years and a tournament record. Bioethics starts at ages 13+. Intermediate Debate bridges from foundational experience.")}</p>],
  ['Are sessions online?', <p>{t("Our classes use live online teaching in small cohorts. Class size and session length depend on the track; bioethics uses ten one-hour sessions, while WSDC and BP use ten two-hour sessions.")}</p>],
  ['When is the next holiday cohort?', <p>{t("Ask us about the next available cohort and timetable. We confirm availability and session times by inquiry before you make plans.")}</p>],
  ['How do I choose a debate level?', <p>{t("Share your age, experience, preferred format and goals so we can discuss a suitable placement. ")}<a href={localeHref(`${links.programs}#holiday`)}>{t("View the track comparison")}</a>{t(" for each course’s starting point.")}</p>],
  ['What does a school need to provide?', <p>{t("Send cohort size and year groups, existing experience, the school calendar and weekly availability, a staff contact, target formats or competitions, and assessment needs. We shape the training plan around these details.")}</p>],
  ['Do bioethics students need prior debate experience?', <p>{t("The course is for students aged 13+ interested in science, medicine, philosophy or ethics. Prior debate experience is not a listed course requirement. Tell us about your science background if you are unsure whether it is a suitable starting point.")}</p>],
  ['What progress or work can we expect?', <p>{t("Schools receive progress and handover records. Debate students develop speeches, round experience and concrete feedback. Bioethics students develop a written project and presentation. Learning outcomes depend on participation and starting point; awards, grades, publication and competition selection are not guaranteed.")}</p>],
];

export default function ProgramFAQ() {
  return <section className="program-faq editorial-inner" aria-labelledby="faq-heading">
    <div className="faq-arc" aria-hidden="true">
      <svg viewBox="0 0 1440 260" focusable="false">
        <defs><path id="faq-text-curve" d="M -100 250 Q 720 -65 1540 250" /></defs>
        <text><textPath href={localeHref("#faq-text-curve")}>{t("Questions & answers · Questions & answers · Questions & answers")}</textPath></text>
      </svg>
    </div>
    <div className="editorial-section-title"><p className="editorial-eyebrow">{t("A few things you might be wondering")}</p><h2 className="heading" id="faq-heading">{t("Frequently asked questions")}</h2></div>
    <div className="program-faq__list">{t(questions().map(([title, answer]) => <Disclosure key={title} title={t(title)} headingLevel="h3">{t(answer)}</Disclosure>))}</div>
  </section>;
}
