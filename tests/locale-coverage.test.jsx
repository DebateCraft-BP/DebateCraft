import {readFileSync,readdirSync} from 'node:fs';
import {parseSync} from 'rolldown/experimental';
import {expect,test} from 'vitest';
import common from '../src/i18n/zh-HK.json';
import pages from '../src/i18n/pages.zh-HK.json';
import team from '../src/i18n/team.zh-HK.json';
import resources from '../src/i18n/resources.zh-HK.json';
import roster from '../public/data/team_members.json';
import * as data from '../src/resources/data';
const catalog={...common,...pages,...team,...resources};
const allowed=new Set(['DebateCraft','Facebook','Instagram','Substack','WSDC','BP','PDF','info@debatecraft.org']);
const missing=[];
function check(value,where){if(typeof value==='string'&&/[a-zA-Z]/.test(value)&&!allowed.has(value.trim())&&!Object.hasOwn(catalog,value.trim().replace(/\u00a0/g,' ')))missing.push(`${where}: ${value}`);}
function walk(node,visit){if(!node||typeof node!=='object')return;visit(node);for(const [key,value]of Object.entries(node)){if(key==='parent')continue;if(Array.isArray(value))value.forEach(child=>walk(child,visit));else if(value&&typeof value==='object')walk(value,visit);}}
test('explicit rendered copy and all current team fields have translations',()=>{
 missing.length=0;
 const files=['src/App.jsx',...readdirSync('src/components').filter(f=>f.endsWith('.jsx')).map(f=>'src/components/'+f),...readdirSync('src/components/resources').filter(f=>f.endsWith('.jsx')).map(f=>'src/components/resources/'+f)];
 for(const file of files){const {program}=parseSync(file,readFileSync(file,'utf8'),{lang:'jsx'});walk(program,node=>{if(node.type==='CallExpression'&&node.callee.name==='t'&&node.arguments[0]?.type==='Literal')check(node.arguments[0].value,file);});}
 for(const m of roster)for(const field of ['role','school','badge','bio','achievements'])for(const text of [].concat(m[field]||[]))check(text,m.name+' '+field);
 expect(missing).toEqual([]);
});
test('all owned resource lessons, motions and feedback data have translations',()=>{
 missing.length=0;
 const strings=[];
 function collect(value){if(typeof value==='string')strings.push(value);else if(Array.isArray(value))value.forEach(collect);else if(value&&typeof value==='object')Object.entries(value).filter(([key])=>!['id','type','difficulty','format','theme','href','embed','transcript'].includes(key)).forEach(([,v])=>collect(v));}
 for(const [name,value]of Object.entries(data)){if(['guideResources','videoResources'].includes(name)){value.forEach(item=>{check(item.group,name);check(item.text,name);});}else collect(value);}
 strings.forEach(value=>check(value,'resource data'));
 expect(missing).toEqual([]);
});
