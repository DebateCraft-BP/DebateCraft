// i18n:render-copy
import { t } from '../i18n';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TeamPortrait from './TeamPortrait';

export default function TeamBiography({ member, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (node.showModal) node.showModal();
    else node.setAttribute('open', '');
    node.querySelector('button').focus();
    return () => {
      if (node.open && node.close) node.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  function handleKey(event) {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); }
    if (event.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button,[tabindex="0"]')];
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  return createPortal(<dialog className="team-dialog dialog dialog--is-open" ref={dialog} aria-modal="true" aria-labelledby="biography-name" onKeyDown={handleKey} onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="team-dialog__container"><div className="team-dialog__content">
      <TeamPortrait member={member} className="team-dialog__content-image" />
      <div className="team-dialog__content-description">
        <h2 className="team-dialog__content-name" id="biography-name">{t(member.name)}</h2>
        {member.role && <p className="team-dialog__content-role">{t(member.role)}</p>}
        <div className="team-dialog__content-bio" tabIndex={0} role="region" aria-label={t("Biography details")}>
          {member.school && <p className="team-bio__school">{t(member.school)}</p>}
          {member.badge && <p className="team-bio__badge">{t(member.badge)}</p>}
          {member.bio && <p>{t(member.bio)}</p>}
          {member.achievements?.length > 0 && <><h3 className="team-bio__heading">{t("Experience & achievements")}</h3><ul className="team-bio__achievements">{t(member.achievements.map((achievement, index) => <li key={index}>{t(achievement)}</li>))}</ul></>}
        </div>
      </div>
    </div></div>
    <button className="team-dialog__close" type="button" aria-label={t("Close biography")} onClick={onClose}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.5" /></svg></button>
  </dialog>, document.body);
}
