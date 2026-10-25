import { useEffect, useState } from 'react';
import { counterpartHref, isChinese } from '../i18n';

export default function LanguageSwitch() {
  const [href, setHref] = useState(counterpartHref);
  useEffect(() => {
    const update = () => setHref(counterpartHref());
    const events = ['hashchange', 'popstate', 'dc:location'];
    events.forEach(event => window.addEventListener(event, update));
    return () => events.forEach(event => window.removeEventListener(event, update));
  }, []);
  return <a className="language-switch" href={href} lang={isChinese() ? 'en' : 'zh-HK'} aria-label={isChinese() ? '切換到英文版' : 'Switch to Cantonese / Traditional Chinese'}>{isChinese() ? 'English' : '繁體中文'}</a>;
}
