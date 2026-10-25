// i18n:render-copy
import { t } from '../i18n';
import { useState } from 'react';

export default function TeamPortrait({ member, className = '' }) {
  const [failed, setFailed] = useState(!member.image);
  const initials = member.name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join('');
  return <div className={`media media--image media--custom ${className}`}>
    <figure className="media__figure">{t(failed
      ? <span className="team-initials" role="img" aria-label={t("Portrait unavailable for {0}", [t(member.name)])}>{t(initials)}</span>
      : <img className="media__image" src={`/${member.image}`} alt={t(member.name)} loading="lazy" decoding="async" onError={() => setFailed(true)} />)
    }</figure>
  </div>;
}
