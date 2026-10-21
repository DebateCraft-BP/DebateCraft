import { useEffect, useState } from 'react';
import TeamBiography from './TeamBiography';
import TeamPortrait from './TeamPortrait';

const leaders = new Set(['Adrian Chan', 'Gavin Zhao', 'Sandeep Chulani']);
const isRetired = member => member.categories.includes('retired');
const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const filters = [['all', 'All'], ['executive', 'Leadership'], ['coaching', 'Coaching'], ['hk', 'Hong Kong'], ['bioethics', 'Bioethics'], ['retired', 'Retired']];

function isValidMember(member) {
  return typeof member?.name === 'string' && member.name.trim().length > 0
    && Array.isArray(member.categories) && member.categories.every(category => typeof category === 'string')
    && ['role', 'school', 'badge', 'bio', 'image'].every(field => member[field] == null || typeof member[field] === 'string')
    && (member.achievements == null || Array.isArray(member.achievements) && member.achievements.every(item => typeof item === 'string'));
}

function MemberGroup({ title, members, primary = false, onSelect }) {
  if (!members.length) return null;
  const prefix = primary ? 'leaders-about' : 'members-about';
  const id = primary ? 'leadership-title' : 'members-title';
  return <section className={prefix} aria-labelledby={id}>
    <div className={`${prefix}__header`}><p className={`label label--${primary ? 'green' : 'sea'}`}>{primary ? 'Our Leadership' : 'Our People'}</p><h2 className={`${prefix}__heading heading`} id={id}>{title}</h2></div>
    <ul className={`${prefix}__list`}>{members.map(member => <li className={`${prefix}__item team-card`} key={member.name}>
      <TeamPortrait member={member} />
      <div className={`${prefix}__item-content`}><h3 className={`${prefix}__item-name`}><button type="button" className="team-card__trigger" aria-label={`View biography for ${member.name}`} aria-haspopup="dialog" onClick={() => onSelect(member)}>{member.name}</button></h3>{member.role && <p className={`${prefix}__item-role`}>{member.role}</p>}</div>
    </li>)}</ul>
  </section>;
}

function RetiredMembers({ members }) {
  if (!members.length) return null;
  return <section className="members-about team-retired" aria-labelledby="retired-title">
    <div className="members-about__header"><p className="label label--sea">Former Members</p><h2 className="members-about__heading heading" id="retired-title">Retired Members</h2></div>
    <ul className="members-about__list">{members.map(member => <li className="members-about__item" key={member.name}>
      <div className="members-about__item-content"><h3 className="members-about__item-name">{member.name}</h3>{member.role && <p className="members-about__item-role">{member.role}</p>}</div>
    </li>)}</ul>
  </section>;
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [phase, setPhase] = useState('loading');
  const [request, setRequest] = useState(0);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    setPhase('loading');
    fetch('/data/team_members.json', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Roster request failed');
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data) || !data.every(isValidMember)) throw new Error('Invalid roster');
        if (!controller.signal.aborted) { setMembers(data); setPhase('ready'); }
      })
      .catch(() => { if (!controller.signal.aborted) setPhase('error'); });
    return () => controller.abort();
  }, [request]);
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash;
      setActive(members.find(member => !isRetired(member) && hash === `#member-${slug(member.name)}`) || null);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [members]);
  function openMember(member) {
    window.history.replaceState(null, '', `#member-${slug(member.name)}`);
    setActive(member);
  }
  function closeMember() {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setActive(null);
  }
  const visible = members.filter(member => {
    const categoryMatches = filter === 'retired' ? isRetired(member) : !isRetired(member) && (filter === 'all' || member.categories.includes(filter));
    return categoryMatches && member.name.toLowerCase().includes(query.trim().toLowerCase());
  });
  return <article className="page-about-us team-page">
    <div className="team-intro">
      <h1 className="hero-about__heading heading">The people behind DebateCraft.</h1>
      <p>Team members combine Hong Kong, Asian, and global results with Hong Kong WSDC, high-level adjudication, and workshop training experience.</p>
    </div>
    <div className="team-tools">
      <label className="team-search"><span>Find a team member</span><input type="search" aria-label="Search team members by name" placeholder="Search by name…" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <div className="team-filters" role="group" aria-label="Filter team members">{filters.map(([value, label]) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>
    </div>
    {phase === 'loading' && <p role="status" className="team-state">Loading our team…</p>}
    {phase === 'error' && <div className="team-state"><p role="alert">We couldn’t load the team.</p><button type="button" className="button" onClick={() => setRequest(value => value + 1)}>Retry</button></div>}
    {phase === 'ready' && <>
      {!visible.length && <p role="status" className="team-state">No team members match your search.</p>}
      {filter === 'retired' ? <RetiredMembers members={visible} /> : <>
        <MemberGroup title="Leadership" members={visible.filter(member => leaders.has(member.name))} primary onSelect={openMember} />
        <MemberGroup title="Our Team" members={visible.filter(member => !leaders.has(member.name))} onSelect={openMember} />
      </>}
    </>}
    {active && <TeamBiography key={active.name} member={active} onClose={closeMember} />}
  </article>;
}
