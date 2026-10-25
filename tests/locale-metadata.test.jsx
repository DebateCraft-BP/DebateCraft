import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
import { localePairs } from '../src/i18n';
const origin='https://debatecraft.org';
const file=path=>path==='/'?'index.html':path.slice(1);
test.each(localePairs)('paired metadata for %s and %s', (en,cn)=>{
 for(const [path,lang] of [[en,'en'],[cn,'zh-HK']]){
  const doc=new DOMParser().parseFromString(readFileSync(file(path),'utf8'),'text/html');
  expect(doc.documentElement.lang).toBe(lang);
  expect(doc.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(origin+path);
  for(const [language,target] of [['en',en],['zh-HK',cn],['x-default',en]]) expect(doc.querySelector(`link[hreflang="${language}"]`).getAttribute('href')).toBe(origin+target);
 }
});
