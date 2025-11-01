export function renderTeamGrid(members) {
  const grid = document.querySelector('.team-grid');
  if (!grid) return;

  // Clear any hard‑coded placeholder cards
  grid.innerHTML = '';

  members.forEach((m) => {
    grid.insertAdjacentHTML(
      'beforeend',
      `
      <div class="team-card">
        <div class="member-image-container">
          ${
            m.image
              ? `<img src="../${(m.image)}"
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