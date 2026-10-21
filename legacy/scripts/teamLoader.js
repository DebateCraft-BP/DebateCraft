import { initTeamFilters } from './teamRenderer.js';

fetch('../data/team_members.json')
  .then((r) => r.json())
  .then((members) => {
    initTeamFilters(members);
  })
  .catch((e) => {
    console.error('Failed to load team data:', e);
    window.alert('Failed to load team members. Please contact us for help.');
  });