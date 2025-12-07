export function renderTeamGrid(members, category) {
  const grid = document.querySelector('.team-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const normalizedCategory = category ? category.toLowerCase() : null;

  const filteredMembers = normalizedCategory
    ? members.filter((m) =>
        Array.isArray(m.categories)
          ? m.categories
              .map((c) => c.toLowerCase())
              .includes(normalizedCategory)
          : false
      )
    : members;


  if (filteredMembers.length === 0) {
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
      <div class="team-card">
        <div class="member-image-container">
          ${
            m.image
              ? `<img src="../${m.image}"
            alt="Photo of ${m.name}"
            loading="lazy" decoding="async"
            onerror="this.onerror=null;this.src='../Images/placeholder.jpg'"
            class="member-image">`
              : '<div class="placeholder-image"></div>'
          }
        </div>
        <div class="member-info">
          <h3>${m.name}</h3>
          ${m.role ? `<h4>${m.role}</h4>` : ''}
          ${m.school ? `<h4>${m.school}</h4>` : ''}
          ${m.bio ? `<p>${m.bio}</p>` : ''}
        </div>
      </div>
      `
    );
  });
}

export function initTeamFilters(members) {
  const filterContainer = document.querySelector('.team-filters');

  // If there are no filter buttons for some reason, just render everyone.
  if (!filterContainer) {
    renderTeamGrid(members);
    return;
  }

  const buttons = filterContainer.querySelectorAll('.filter-btn[data-category]');

  const handleClick = (btn) => {
    const category = btn.getAttribute('data-category');

    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    renderTeamGrid(members, category);
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => handleClick(btn));
  });

  // Initial render: use the button already marked active, or the first button.
  const defaultButton =
    filterContainer.querySelector('.filter-btn.active') || buttons[0];

  if (defaultButton) {
    handleClick(defaultButton);
  } else {
    renderTeamGrid(members);
  }
}