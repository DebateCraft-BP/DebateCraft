// i18n:render-copy
import { t, localeHref } from '../i18n';
import ProgramFAQ from './ProgramFAQ';
import LearningGallery from './LearningGallery';
import { links } from '../content';
import { learningHabits } from '../programContent';
import { ImageBubble, InquiryClosing, PagePhoto, schoolInquiry, StatementHero, studentInquiry } from './EditorialPage';

export default function HowWeWork() {
  return <article className="editorial-page how-page">
    <StatementHero eyebrow={t("How We Work")} variant="statement-hero--method" intro={t("Small-group teaching, thoughtful feedback and a clear next step for school teams, holiday learners and bioethics students.")}>{t("Learn by ")}<em>{t("questioning.")}</em> <ImageBubble file="Image2.jpeg" wide />{t(" Improve through practice. ")}<ImageBubble file="Image3.png" /></StatementHero>
    <LearningGallery />
    <section className="method-section editorial-inner" aria-labelledby="method-title"><div className="editorial-section-title"><p className="editorial-eyebrow">{t("The DebateCraft Method")}</p><h2 className="heading" id="method-title">{t("Ideas become skills")}<br />{t("through practice.")}</h2></div>
      <ul className="habit-cards">{t(learningHabits.map(([title, copy, file]) => <li key={title}><PagePhoto file={file} alt={t("")} /><h3 className="heading">{t(title)}</h3><p>{t(copy)}</p></li>))}</ul>
    </section>
    <section className="approach-section editorial-inner" aria-labelledby="approach-title"><div className="editorial-section-title"><p className="editorial-eyebrow">{t("Our Approach")}</p><h2 className="heading" id="approach-title">{t("A clear path, shaped")}<br />{t("around the learner.")}</h2></div>
      <div className="approach-layout"><div className="approach-photo"><PagePhoto file="Image1.jpeg" alt={t("DebateCraft students and their coach in an online lesson")} /><p>{t("Shared foundations. Individual next steps.")}</p></div>
        <div className="approach-panels">
          <section className="approach-panel" id="schools" aria-labelledby="school-path-title"><p className="editorial-eyebrow" id="school-path-title">{t("Schools")}</p><h3 className="heading">{t("Start with your school, not a generic workshop.")}</h3><p>{t("We agree the cohort, timetable, staff contact and competition goals before teaching begins. Live online sessions build a junior bench through analysis, case construction, rebuttal, delivery and disciplined round review.")}</p><p>{t("Our school pathway connects shared foundations, junior squad development, competition preparation and the records your school can retain.")}</p>
            <div className="editorial-actions"><a className="button" href={localeHref(`${links.schools}#pathway`)}>{t("Explore the school pathway")}</a><a className="editorial-text-link" href={localeHref(schoolInquiry)}>{t("Discuss a school program ↗")}</a></div>
          </section>
          <section className="approach-panel" id="holiday" aria-labelledby="holiday-path-title"><p className="editorial-eyebrow" id="holiday-path-title">{t("Holiday Programs")}</p><h3 className="heading">{t("Join at the right level. Practice with purpose.")}</h3><p>{t("Tell us your age, experience and goals. Together, we identify a suitable level and confirm the available cohort and timetable.")}</p><ol className="pathway-steps"><li>{t("Express interest and discuss placement.")}</li><li>{t("Confirm the cohort and session times.")}</li><li>{t("Learn through live small-group teaching, drills and practice rounds.")}</li><li>{t("Use specific feedback and next-level guidance to keep developing.")}</li></ol><p>{t("Class caps and lesson lengths vary by track. Ask about availability before making plans.")}</p><div className="editorial-actions"><a className="editorial-text-link" href={localeHref(`${links.programs}#holiday`)}>{t("Compare debate tracks")}</a><a className="button" href={localeHref(studentInquiry)}>{t("Ask about the next cohort")}</a></div></section>
          <section className="approach-panel" id="bioethics" aria-labelledby="bio-path-title"><p className="editorial-eyebrow" id="bio-path-title">{t("Bioethics")}</p><h3 className="heading">{t("Move from a scientific question to an informed position.")}</h3><p className="program-facts">{t("Ages 13+ · 10 one-hour sessions · Maximum 10 students")}</p><p>{t("Start with scientific concepts, examine a dilemma through Harkness discussion and build an argument grounded in evidence.")}</p><p>{t("Develop a research or review paper, with optional mentoring where scheduling allows. Finish with a panel presentation that parents may attend.")}</p><div className="editorial-actions"><a className="editorial-text-link" href={localeHref(`${links.programs}#bioethics`)}>{t("Explore the bioethics curriculum")}</a><a className="button" href={localeHref(studentInquiry)}>{t("Register student interest")}</a></div></section>
        </div>
      </div>
    </section>
    <section className="learning-outcomes editorial-inner" aria-labelledby="outcomes-title"><p className="editorial-eyebrow">{t("Progress you can build on")}</p><h2 className="heading" id="outcomes-title">{t("What students leave with.")}</h2><div><section><h3>{t("Schools")}</h3><p>{t("Skill and attendance records, round notes, a competition-preparation plan and handover materials for the next cohort.")}</p></section><section><h3>{t("Holiday learners")}</h3><p>{t("Structured speeches, practice-round experience and concrete next steps to work on after the course.")}</p></section><section><h3>{t("Bioethics students")}</h3><p>{t("A developed written project and experience presenting and defending an informed position.")}</p></section></div></section>
    <ProgramFAQ />
    <InquiryClosing />
  </article>;
}
