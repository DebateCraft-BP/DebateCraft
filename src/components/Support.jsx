// i18n:render-copy
import { t } from '../i18n';
import { StatementHero } from './EditorialPage';

const expenses = [
  ['Teaching materials', 'Help us make handouts, practice drills and debate motion banks.'],
  ['Website and online tools', 'Help cover hosting and the tools we use to run classes.'],
  ['Free debate classes', 'Help us offer free places so more students can learn to debate.'],
];

export default function Support() {
  return <article className="editorial-page">
    <StatementHero
      variant="statement-hero--identity"
      eyebrow={t('Give if you can')}
      intro={t('If DebateCraft has helped you, you can make an optional contribution to support our free debate classes and teaching resources.')}
      action={<a className="button button--filled" href="https://buymeacoffee.com/debatecraft">{t('Buy Me a Coffee')}</a>}
    >{t('Support DebateCraft')}</StatementHero>

    <section className="school-delivery editorial-inner" aria-labelledby="support-expenses">
      <div className="editorial-section-title">
        <h2 className="heading" id="support-expenses">{t('What your support helps cover')}</h2>
      </div>
      <ul className="school-cards">
        {expenses.map(([title, description]) => <li key={title}>
          <h3 className="heading">{t(title)}</h3>
          <p>{t(description)}</p>
        </li>)}
      </ul>
    </section>
  </article>;
}
