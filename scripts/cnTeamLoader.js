import { renderTeamGrid, initTeamFilters } from './teamRenderer.js';

fetch('../data/cnteam_members.json')
  .then((r) => r.json())
  .then((members) => {
    initTeamFilters(members);
  })
  .catch((e) => {
    console.error('Failed to load team data:', e);
    window.alert("Failed to load team members. Please contact us for help.");
    
    const grid = document.querySelector('.team-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="team-card">
          <div class="member-image">
            <div class="placeholder-image"></div>
          </div>
          <h3>數據加載失敗</h3>
          <h4>請稍後再試或聯絡我們。</h4>
        </div>
      `;
    }
  });
