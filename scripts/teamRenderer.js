export function renderTeamGrid(members, category = null) {
  const grid = document.querySelector('.team-grid');
  if (!grid) return;

  // Clear any existing cards
  grid.innerHTML = '';

  const normalizedCategory = category ? String(category).toLowerCase() : null;

  const filteredMembers = normalizedCategory
    ? members.filter((m) => {
        // Prefer `categories` (array)
        if (Array.isArray(m.categories)) {
          return m.categories.some(
            (c) => String(c).toLowerCase() === normalizedCategory
          );
        }
        // Fallback if some entries still have a single `category` string
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
      <div class="team-card">
        <div class="member-image-container">
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

  if (!filterContainer) {
    renderTeamGrid(members);
    return;
  }

  const buttons = filterContainer.querySelectorAll('.filter-btn[data-category]');

  const handleClick = (btn) => {
    const category = btn.getAttribute('data-category');

    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // "All" => no filtering
    if (!category || category.toLowerCase() === 'all') {
      renderTeamGrid(members, null);
    } else {
      renderTeamGrid(members, category);
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => handleClick(btn));
  });

  // Initial: use active button or first
  const defaultButton =
    filterContainer.querySelector('.filter-btn.active') || buttons[0];

  if (defaultButton) {
    handleClick(defaultButton);
  } else {
    renderTeamGrid(members);
  }
}