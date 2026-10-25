// i18n:render-copy
import { t, localeHref } from '../i18n';
import { useState } from 'react';

const endpoint = 'https://api.web3forms.com/submit';
const accessKey = '03926511-dade-45aa-9d38-40147f166d96';

function Field({ label, required = false, children }) {
  return <label className="contact-field"><span className="contact-field__label">{t(label)}{t(required ? <span aria-hidden="true">{t("*")}</span> : ' (optional)')}</span>{t(children)}</label>;
}

export default function Contact() {
  const [phase, setPhase] = useState('idle');

  async function send(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('name', `${data.get('first_name')} ${data.get('last_name')}`.trim());
    data.delete('first_name');
    data.delete('last_name');
    data.set('subject', 'New message from the DebateCraft website');
    data.set('from_name', 'DebateCraft website');
    data.set('access_key', accessKey);
    setPhase('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setPhase('sent');
    } catch {
      setPhase('error');
    }
  }

  return <article className="page-about-us contact-page">
    <div className="contact-intro">
      <h1 className="hero-about__heading heading">{t("Send us a message")}</h1>
      <p>{t("We appreciate your interest in DebateCraft. We reply to every message in the order we receive it, or you can email ")}<a href={localeHref("mailto:info@debatecraft.org")}>{t("info@debatecraft.org")}</a>{t(".")}</p>
    </div>
    <form className="contact-form" aria-label={t("Contact form")} onSubmit={send}>
      <div className="contact-form__row">
        <Field label={t("First name")} required><input name="first_name" type="text" autoComplete="given-name" required /></Field>
        <Field label={t("Last name")} required><input name="last_name" type="text" autoComplete="family-name" required /></Field>
      </div>
      <Field label={t("Email address")} required><input name="email" type="email" autoComplete="email" required /></Field>
      <Field label={t("Organization")}><input name="organization" type="text" autoComplete="organization" /></Field>
      <Field label={t("Your message")} required><textarea name="message" rows="5" required /></Field>
      <input className="visually-hidden" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-form__actions">
        <button className="contact-form__submit button button--filled" type="submit" disabled={phase === 'sending'}>{t(phase === 'sending' ? 'Sending…' : 'Send message')}</button>
        {phase === 'sent' && <p className="contact-form__status" role="status">{t("Thank you. Your message has been sent. We’ll reply as soon as we can.")}</p>}
        {phase === 'error' && <p className="contact-form__error" role="alert">{t("We couldn’t send your message. Please try again, or email ")}<a href={localeHref("mailto:info@debatecraft.org")}>{t("info@debatecraft.org")}</a>{t(".")}</p>}
      </div>
    </form>
  </article>;
}
