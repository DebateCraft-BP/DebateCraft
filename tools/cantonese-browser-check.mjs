import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const {chromium}=await import('playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:4173';
const folder=resolve('.firecrawl/verification/cantonese');await mkdir(folder,{recursive:true});
const browser=await chromium.launch();const results={views:[],errors:[],interactions:[]};
const paths=['/cnindex.html',...['who-we-are','what-we-do','how-we-work','schools','team','resources','contact'].map(slug=>`/pages/cn${slug}.html`)];
try{
 for(const width of [1440,390,900,1920]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1000},reducedMotion:'reduce'});
  page.on('pageerror',error=>results.errors.push(error.message));
  await page.addInitScript(()=>localStorage.setItem('debatecraft-consent-v1',JSON.stringify({required:true,analytics:false})));
  for(const path of paths){
   await page.goto(base+path);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
   if(path.includes('team'))await page.locator('.team-card').first().waitFor();
   for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=900){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(15);}
   await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));await page.evaluate(()=>scrollTo(0,0));
   assert.equal(await page.locator('html').getAttribute('lang'),'zh-HK');
   const geometry=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,heading:document.querySelector('h1').textContent,bodyFont:getComputedStyle(document.body).fontFamily}));
   assert.ok(geometry.scroll<=width+1,JSON.stringify({path,width,geometry}));
   assert.match(geometry.heading,/[\u3400-\u9fff]/);
   const language=page.getByRole('link',{name:'切換到英文版'});assert.ok(await language.isVisible());
   const a=await language.boundingBox(),b=await page.locator('.header__logo').boundingBox();assert.ok(a.x>=b.x+b.width-1,'language overlaps logo');
   if(width===390){await page.getByRole('button',{name:'選單',exact:true}).click();assert.equal(await page.getByRole('navigation',{name:'手機導覽'}).getByRole('link').count(),7);await page.keyboard.press('Escape');}
   const links=await page.locator('main a[href^="/pages/"]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));assert.ok(links.every(href=>href.startsWith('/pages/cn')),JSON.stringify(links));
   if([1440,390].includes(width))await page.screenshot({path:resolve(folder,`${path.split('/').pop().replace('.html','')}-${width}.png`),fullPage:true});
   results.views.push({path,...geometry});
  }
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await page.addInitScript(()=>localStorage.setItem('debatecraft-consent-v1',JSON.stringify({required:true,analytics:false})));
 for(const path of paths){
  await page.goto(base+path+'?source=locale');await page.locator('h1').waitFor();
  await page.getByRole('link',{name:'切換到英文版'}).click();
  await page.getByRole('link',{name:'Switch to Cantonese / Traditional Chinese'}).waitFor();
  assert.equal(new URL(page.url()).search,'?source=locale');
  await page.getByRole('link',{name:'Switch to Cantonese / Traditional Chinese'}).click();
  await page.locator('html[lang="zh-HK"]').waitFor();assert.equal(new URL(page.url()).pathname,path);
 }
 results.interactions.push('all eight language pairs navigate both ways and retain query');
 await page.goto(base+'/pages/cnhow-we-work.html');
 const caption=await page.locator('.learning-gallery__controls p').textContent();await page.getByRole('button',{name:'下一張相片'}).click();assert.notEqual(await page.locator('.learning-gallery__controls p').textContent(),caption);
 const faq=page.locator('.program-faq button');await faq.nth(0).click();await faq.nth(1).click();assert.equal(await faq.nth(0).getAttribute('aria-expanded'),'true');assert.equal(await faq.nth(1).getAttribute('aria-expanded'),'true');
 await page.goto(base+'/pages/cnwhat-we-do.html');const disclosure=page.locator('.course-comparison button').first();await disclosure.click();assert.equal(await disclosure.getAttribute('aria-expanded'),'true');results.interactions.push('gallery and independent curriculum/FAQ disclosures');
 await page.goto(base+'/pages/cncontact.html');await page.route('https://api.web3forms.com/submit',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true})}));
 const form=page.getByRole('form',{name:'聯絡表格'});await form.getByRole('textbox',{name:'名字',exact:true}).fill('Test');await form.getByRole('textbox',{name:'姓氏',exact:true}).fill('User');await form.getByRole('textbox',{name:'電郵地址',exact:true}).fill('test@example.com');await form.getByRole('textbox',{name:'你嘅訊息'}).fill('本機測試');await form.getByRole('button',{name:'傳送訊息'}).click();await form.getByRole('status').waitFor();assert.match(await form.getByRole('status').textContent(),/訊息已經傳送/);results.interactions.push('contact success with intercepted request; no live submission');
 await page.goto(base+'/pages/cnresources.html#even-if');await page.locator('.option-card').first().click();assert.match(await page.locator('.feedback-card').innerText(),/關鍵反擊|成功減輕|防線被突破/);results.interactions.push('game feedback');
 for(const hash of ['practice','frameworks','manner','even-if']){await page.goto(base+'/pages/cnresources.html#'+hash);await page.locator('h1').waitFor();await page.screenshot({path:resolve(folder,`tool-${hash}.png`),fullPage:true});}
 await page.goto(base+'/pages/cnteam.html#member-adrian-chan');await page.getByRole('dialog').waitFor();await page.screenshot({path:resolve(folder,'biography.png')});await page.keyboard.press('Escape');await page.getByRole('button',{name:'歷屆成員',exact:true}).click();assert.equal(await page.locator('.team-retired img,.team-retired button').count(),0);results.interactions.push('biography and text-only alumni');
 for(const [alias,target,hash] of [['cnabout','cnwho-we-are',''],['cnofferings','cnwhat-we-do',''],['cncourses','cnwhat-we-do','#holiday'],['cnbiology','cnwhat-we-do','#bioethics'],['cntraining-pathway','cnschools','#pathway'],['cnpartnership','cnschools','#inquiries']]){await page.goto(`${base}/pages/${alias}.html?source=test`);await page.waitForURL(`${base}/pages/${target}.html?source=test${hash}`);}
 results.interactions.push('six aliases preserve queries and destination sections');await page.close();assert.deepEqual(results.errors,[]);
 await writeFile(resolve(folder,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({views:results.views.length,interactions:results.interactions,errors:results.errors}));
}finally{await browser.close();}
