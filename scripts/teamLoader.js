import { renderTeamGrid } from './teamRenderer.js';

fetch('../data/team_members.json')
  .then((r) => r.json())
  .then(renderTeamGrid)
  .catch((e) => {
    console.error('Failed to load team data:', e)
    window.alert("Failed to load team members. Please contact us for help.")
});