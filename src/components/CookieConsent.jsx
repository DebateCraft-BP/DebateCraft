import { useEffect, useRef, useState } from 'react';

const storageKey = 'debatecraft-consent-v1';
function readConsent() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey));
    return value?.required === true && typeof value.analytics === 'boolean' ? value : null;
  } catch { return null; }
}
const description = 'We use cookies to enhance your browsing experience and deliver personalized content. By continuing to use this site, you accept our terms.';

export default function CookieConsent() {
  const [saved, setSaved] = useState(readConsent);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(() => saved?.analytics ?? false);
  const dialog = useRef(null);
  const opener = useRef(null);
  useEffect(() => {
    if (!manage) return;
    const node = dialog.current;
    const previousFocus = document.activeElement;
    if (node.showModal) node.showModal();
    else node.setAttribute('open', '');
    return () => {
      if (node.close) node.close();
      previousFocus?.focus();
    };
  }, [manage]);

  function save(allowAnalytics) {
    const choice = { required: true, analytics: allowAnalytics };
    try { localStorage.setItem(storageKey, JSON.stringify(choice)); } catch { /* Keep the session choice when storage is unavailable. */ }
    setAnalytics(allowAnalytics);
    setSaved(choice);
    setManage(false);
  }

  return <>
    {!saved && !manage && <aside className="cookies is-visible" aria-label="Cookie consent">
      <div className="cookies__container"><div className="cookies__dialog cookies__dialog--basic">
        <div className="cookies__content"><h2 className="cookies__heading">This website is using cookies</h2><p>{description}</p></div>
        <div className="cookies__buttons"><button ref={opener} className="cookies__button" onClick={() => setManage(true)}>Manage Cookies</button><button className="cookies__button" data-button="accept" onClick={() => save(true)}>Accept &amp; Close</button></div>
      </div></div>
    </aside>}
    <button className="consent-preferences" onClick={() => setManage(true)}>Cookie preferences</button>
    {manage && <dialog className="consent-settings" ref={dialog} aria-labelledby="cookies-title" onCancel={() => setManage(false)}>
      <h2 id="cookies-title" className="cookies__heading">Manage Cookies</h2><p>{description}</p>
      <div className="consent-options"><label className="consent-option"><span>Required (Always Active)</span><input type="checkbox" checked disabled /></label>
        <p>These cookies are crucial for the basic functionality of our website. They allow you to navigate the site and use its features. Without these cookies, certain services you request may not be available.</p>
        <label className="consent-option"><span>Analytics</span><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /></label>
        <p>We use analytical cookies to collect data on website usage, helping us enhance performance and user experience by tracking page visits and identifying issues. This information is anonymous and aggregated.</p>
      </div>
      <div className="cookies__buttons"><button className="cookies__button" onClick={() => save(false)}>Deny</button><button className="cookies__button" data-button="accept" onClick={() => save(analytics)}>Allow Selected</button></div>
    </dialog>}
  </>;
}
