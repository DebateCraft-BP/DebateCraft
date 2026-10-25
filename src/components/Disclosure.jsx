// i18n:render-copy
import { t } from '../i18n';
import { useId, useState } from 'react';

export default function Disclosure({ title, facts, children, headingLevel: Heading = 'h4' }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <div className={`editorial-disclosure${open ? ' is-open' : ''}`}>
    <Heading><button type="button" id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-answer`} onClick={() => setOpen(value => !value)}><span>{t(title)}</span><span aria-hidden="true">{t(open ? '−' : '+')}</span></button></Heading>
    {facts && <p className="disclosure-facts">{t(facts)}</p>}
    <div id={`${id}-answer`} aria-labelledby={`${id}-trigger`} hidden={!open} className="disclosure-answer">{t(children)}</div>
  </div>;
}
