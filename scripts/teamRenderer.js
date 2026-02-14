export function renderTeamGrid(members, category = null) {
  const grid = document.querySelector('.team-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const normalizedCategory = category ? String(category).toLowerCase() : null;

  const filteredMembers = normalizedCategory
    ? members.filter((m) => {
        if (Array.isArray(m.categories)) {
          return m.categories.some(
            (c) => String(c).toLowerCase() === normalizedCategory
          );
        }
        if (m.category) {
          return String(m.category).toLowerCase() === normalizedCategory;
        }
        return false;
      })
    : members;

  if (!filteredMembers.length) {
    grid.insertAdjacentHTML(
      'beforeend',
      '<p class="no-members">No team members found in this section yet. Check back soon!</p>'
    );
    return;
  }

  filteredMembers.forEach((m) => {
    grid.insertAdjacentHTML(
      'beforeend',
      `
      <article class="team-card reflective-team-card" tabindex="0">
        <svg class="team-reflective-filter" aria-hidden="true">
          <defs>
            <filter id="team-card-metallic" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <div class="member-image-container profile-toggle" role="button" tabindex="0" aria-expanded="false">
          ${
            m.image
              ? `<img src="../${m.image}"
            alt="Photo of ${m.name}"
            loading="lazy" decoding="async"
            onerror="this.onerror=null;this.src='../Images/placeholder.jpg'"
            style="--member-focus:${m.imageFocus || '50% 20%'}"
            class="member-image">`
              : '<div class="placeholder-image"></div>'
          }
          <div class="reflective-noise-overlay"></div>
        </div>

        <div class="member-info reflective-content">
          <h3>${m.name}</h3>
          ${m.role ? `<h4>${m.role}</h4>` : ''}
          ${m.school ? `<p class="member-school">${m.school}</p>` : ''}

          <div class="member-bio-panel" hidden>
            ${m.bio ? `<p>${m.bio}</p>` : '<p>Bio coming soon.</p>'}
          </div>
        </div>
      </article>
      `
    );
  });

  const toggleCard = (card) => {
    if (!card) return;
    const panel = card.querySelector('.member-bio-panel');
    const trigger = card.querySelector('.profile-toggle');
    if (!panel || !trigger) return;
    const willOpen = panel.hasAttribute('hidden');
    panel.toggleAttribute('hidden');
    trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    card.classList.toggle('expanded', willOpen);
  };

  grid.querySelectorAll('.profile-toggle').forEach((trigger) => {
    trigger.addEventListener('click', () => toggleCard(trigger.closest('.team-card')));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(trigger.closest('.team-card'));
      }
    });
  });
}

export function initTeamFilters(members) {
  const filterContainer = document.querySelector('.team-filters');

  if (!filterContainer) {
    renderTeamGrid(members);
    return;
  }

  const buttons = filterContainer.querySelectorAll('.filter-btn[data-category]');

  const handleClick = (btn) => {
    const category = btn.getAttribute('data-category');

    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (!category || category.toLowerCase() === 'all') {
      renderTeamGrid(members, null);
    } else {
      renderTeamGrid(members, category);
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => handleClick(btn));
  });

  const defaultButton =
    filterContainer.querySelector('.filter-btn.active') || buttons[0];

  if (defaultButton) {
    handleClick(defaultButton);
  } else {
    renderTeamGrid(members);
  }
}
