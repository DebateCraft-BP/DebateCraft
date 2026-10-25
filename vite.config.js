import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: { input: ['index.html', 'pages/team.html', 'pages/contact.html', 'pages/resources.html', 'pages/who-we-are.html', 'pages/what-we-do.html', 'pages/how-we-work.html', 'pages/schools.html', 'pages/about.html', 'pages/offerings.html', 'pages/biology.html', 'pages/training-pathway.html', 'pages/partnership.html', 'cnindex.html', 'pages/cnwho-we-are.html', 'pages/cnwhat-we-do.html', 'pages/cnhow-we-work.html', 'pages/cnschools.html', 'pages/cnresources.html', 'pages/cnteam.html', 'pages/cncontact.html', 'pages/cnabout.html', 'pages/cnofferings.html', 'pages/cncourses.html', 'pages/cnbiology.html', 'pages/cntraining-pathway.html', 'pages/cnpartnership.html'] },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    include: ['tests/**/*.test.jsx'],
  },
});
