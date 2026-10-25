// i18n:render-copy
import { t } from '../i18n';
import { useState } from 'react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return <form className="form form--newsletter" aria-label={t("Newsletter")} onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
    <div className="form__field">
      <label className="visually-hidden" htmlFor="newsletter-email">{t("Email address")}</label>
      <input className="form__input" id="newsletter-email" name="email" type="email" placeholder={t("Email address")} autoComplete="email" required />
    </div>
    <button className="form__submit" type="submit" aria-label={t("Submit")}><svg className="form__submit-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg></button>
    {submitted && <p className="newsletter-status" role="status">{t("Newsletter signup is unavailable in this preview.")}</p>}
  </form>;
}
