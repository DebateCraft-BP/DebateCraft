import common from './zh-HK.json';
import pages from './pages.zh-HK.json';
import team from './team.zh-HK.json';
import resources from './resources.zh-HK.json';
const cantonese = { ...common, ...pages, ...team, ...resources };

export const localePairs = [
  ['/', '/cnindex.html'],
  ...['who-we-are', 'what-we-do', 'how-we-work', 'schools', 'resources', 'team', 'contact'].map(page => [`/pages/${page}.html`, `/pages/cn${page}.html`]),
];
export function isChinese() {
  return typeof window !== 'undefined' && localePairs.some(([, chinese]) => chinese === window.location.pathname);
}
export function englishPath(path = window.location.pathname) {
  return localePairs.find(([, chinese]) => chinese === path)?.[0] || path;
}
export function localeHref(href) {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return href;
  const split = href.search(/[?#]/);
  const path = split < 0 ? href : href.slice(0, split);
  const suffix = split < 0 ? '' : href.slice(split);
  const pair = localePairs.find(pair => pair.includes(path));
  return (pair ? pair[isChinese() ? 1 : 0] : path) + suffix;
}
export function counterpartHref() {
  const pair = localePairs.find(pair => pair.includes(window.location.pathname)) || localePairs[0];
  return pair[isChinese() ? 0 : 1] + window.location.search + window.location.hash;
}
// Keys are explicit English source text. State IDs, URLs and user input stay untouched.
export function t(source, values) {
  if (typeof source !== 'string') return source;
  const key = source.trim().replace(/\u00a0/g, ' ');
  let result = isChinese() && Object.hasOwn(cantonese, key)
    ? source.slice(0, source.indexOf(source.trim())) + cantonese[key] + source.slice(source.indexOf(source.trim()) + source.trim().length)
    : source;
  if (values) result = result.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  return result;
}
export function replaceLocation(url) {
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event('dc:location'));
}
