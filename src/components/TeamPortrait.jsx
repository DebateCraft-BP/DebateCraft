import { useState } from 'react';

export default function TeamPortrait({ member, className = '' }) {
  const [failed, setFailed] = useState(!member.image);
  const initials = member.name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join('');
  return <div className={`media media--image media--custom ${className}`}>
    <figure className="media__figure">{failed
      ? <span className="team-initials" role="img" aria-label={`Portrait unavailable for ${member.name}`}>{initials}</span>
      : <img className="media__image" src={`/${member.image}`} alt={member.name} loading="lazy" decoding="async" onError={() => setFailed(true)} />
    }</figure>
  </div>;
}
