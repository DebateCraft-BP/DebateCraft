import { parseSync } from 'rolldown/experimental';
import { readFile, writeFile } from 'node:fs/promises';
const known = Object.assign({}, ...await Promise.all(['zh-HK','pages.zh-HK','resources.zh-HK','team.zh-HK'].map(async name => {try { return JSON.parse(await readFile(`src/i18n/${name}.json`,'utf8')); } catch { return {}; }})));
const items = new Set();
for (const file of process.argv.slice(2)) {
 const source=await readFile(file,'utf8'); const ast=parseSync(file,source,{lang:file.endsWith('jsx')?'jsx':'js'});
 function add(value) { const key=value.trim().replace(/\u00a0/g,' '); if (/[A-Za-z]/.test(key) && (/\s/.test(key)||/^[A-Z][a-z]+$/.test(key)) && !/^(?:https?:|mailto:|\.|\/|#)/.test(key) && !/\.html(?:#|$)|\.png$|\.jsx$|\.jpeg$|className|querySelector/.test(key) && !Object.hasOwn(known,key)) items.add(key); }
 function walk(node,parent) {
  if(!node||typeof node!=='object')return;
  if(node.type==='JSXText') add(node.value.replace(/\s*\n\s*/g,' '));
  if(node.type==='Literal'&&typeof node.value==='string') {
   const attr=parent?.type==='JSXAttribute'?parent.name.name:null;
   if(!attr||['title','alt','label','intro','eyebrow','caption','placeholder','aria-label','aria-valuetext'].includes(attr))add(node.value);
  }
  for(const [key,value]of Object.entries(node)){if(['start','end'].includes(key))continue;if(Array.isArray(value))value.forEach(n=>walk(n,node));else if(value&&typeof value==='object')walk(value,node);}
 } walk(ast.program);
}
await writeFile('.firecrawl/pending-copy.json',JSON.stringify([...items],null,2));
console.log([...items].map((s,i)=>`${i}: ${s}`).join('\n'));
