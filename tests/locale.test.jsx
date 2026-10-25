import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import App from '../src/App';
import {t} from '../src/i18n';
import {mitigationGameData} from '../src/resources/data';

afterEach(() => { window.history.replaceState(null, '', '/'); vi.unstubAllGlobals(); });
function visit(path) { window.history.replaceState(null, '', path); return render(<App />); }

test('language links pair the current page and track updated section fragments', () => {
  visit('/pages/schools.html?source=school#delivery');
  const link = screen.getByRole('link', { name: 'Switch to Cantonese / Traditional Chinese' });
  expect(link).toHaveAttribute('href', '/pages/cnschools.html?source=school#delivery');
  window.history.replaceState(null, '', '#pathway');
  fireEvent(window, new Event('hashchange'));
  expect(link).toHaveAttribute('href', '/pages/cnschools.html?source=school#pathway');
});

test('Chinese shared navigation, home link, newsletter and consent controls stay in the chosen language', async () => {
  const user = userEvent.setup();
  visit('/cnindex.html');
  expect(document.documentElement).toHaveAttribute('lang', 'zh-HK');
  const nav = within(screen.getByRole('navigation', { name: '主要導覽' }));
  expect(nav.getByRole('link', { name: '學校課程' })).toHaveAttribute('href', '/pages/cnschools.html');
  expect(screen.getByRole('banner').querySelector('a.header__logo')).toHaveAttribute('href', '/cnindex.html');
  expect(screen.getByRole('link', { name: '切換到英文版' })).toHaveAttribute('href', '/');
  await user.click(screen.getByRole('button', { name: '管理 Cookie' }));
  expect(screen.getByRole('dialog', { name: '管理 Cookie' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: '拒絕非必要 Cookie' }));
  expect(JSON.parse(localStorage.getItem('debatecraft-consent-v1')).analytics).toBe(false);
  const footer = within(screen.getByRole('contentinfo'));
  await user.type(footer.getByRole('textbox', { name: '電郵地址' }), 'reader@example.com');
  await user.click(footer.getByRole('button', { name: '提交' }));
  expect(footer.getByRole('status')).toHaveTextContent('預覽版暫時未能訂閱電子通訊。');
});

test('the Cantonese homepage translates its full program and impact content and keeps local destinations', () => {
  visit('/cnindex.html');
  expect(screen.getByRole('heading', { level: 1, name: '諗得清楚，講得自信。辯論，唔設界限。' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '睇吓我哋嘅課程' })).toHaveAttribute('href', '/pages/cnwhat-we-do.html');
  expect(screen.getByRole('link', { name: '認識我哋嘅團隊' })).toHaveAttribute('href', '/pages/cnteam.html');
  expect(screen.getByText(/450 小時/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '生物倫理', exact: true })).toBeInTheDocument();
});

test('Who We Are has its Cantonese mission and connects to the localized team and approach pages', () => {
  visit('/pages/cnwho-we-are.html');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('搵到自己嘅聲音。');
  expect(screen.getByRole('region', { name: '我哋嘅使命' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '認識團隊', exact: true })).toHaveAttribute('href', '/pages/cnteam.html');
  expect(screen.getByRole('link', { name: '教學方式 ↗' })).toHaveAttribute('href', '/pages/cnhow-we-work.html');
});

test.each([
 ['/pages/cnwhat-we-do.html', '生物倫理'],
 ['/pages/cnhow-we-work.html', '教學方式'],
 ['/pages/cnschools.html', '持續成長。'],
])('Cantonese editorial page %s translates its main content and internal destinations', (path, copy) => {
 visit(path);
 expect(screen.getByRole('main')).toHaveTextContent(copy);
 expect(screen.getByRole('main')).not.toHaveTextContent('Free student group class');
 expect(screen.getByRole('main').querySelectorAll('a[href^="/pages/"]')).not.toHaveLength(0);
 for (const link of screen.getByRole('main').querySelectorAll('a[href^="/pages/"]')) expect(link.getAttribute('href')).toMatch(/^\/pages\/cn/);
});

test('Cantonese team retains current roster, translated biographies and text-only alumni', async () => {
 const roster = (await import('../public/data/team_members.json')).default;
 vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok:true,json:async()=>roster}));
 const user = userEvent.setup(); visit('/pages/cnteam.html');
 await user.click(await screen.findByRole('button',{name:'睇Adrian Chan嘅簡介'}));
 expect(screen.getByRole('dialog')).toHaveTextContent('全球執行總監');
 expect(screen.getByRole('dialog')).toHaveTextContent('2026');
 await user.click(screen.getByRole('button',{name:'關閉簡介'}));
 await user.click(screen.getByRole('button',{name:'歷屆成員',exact:true}));
 const alumni=screen.getByRole('region',{name:'歷屆成員'});
 expect(within(alumni).getAllByRole('heading',{level:3})).toHaveLength(6);
 expect(within(alumni).queryByRole('img')).not.toBeInTheDocument();
 expect(within(alumni).queryByRole('button')).not.toBeInTheDocument();
});

test('Cantonese contact uses translated field and failure feedback with the original form contract', async () => {
 vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new Error('offline')));
 const user=userEvent.setup(); visit('/pages/cncontact.html');
 await user.type(screen.getByRole('textbox',{name:'名字'}),'Ada');
 await user.type(screen.getByRole('textbox',{name:'姓氏'}),'Chan');
 await user.type(within(screen.getByRole('main')).getByRole('textbox',{name:'電郵地址',exact:true}),'ada@example.com');
 await user.type(screen.getByRole('textbox',{name:'你嘅訊息'}),'測試內容');
 await user.click(screen.getByRole('button',{name:'傳送訊息'}));
 expect(await screen.findByRole('alert')).toHaveTextContent('傳送唔到');
 expect(fetch.mock.calls[0][1].body.get('message')).toBe('測試內容');
});

test('Cantonese resource search finds translated descriptions and clearly labels English source material', async () => {
 const user=userEvent.setup(); visit('/pages/cnresources.html');
 expect(screen.getByRole('heading',{level:1})).toHaveTextContent('辯論資源庫');
 await user.type(screen.getByRole('searchbox',{name:'搜尋指南或影片'}),'分析');
 expect(screen.getByRole('main')).toHaveTextContent('英文資源');
 expect(screen.queryByText('No guides match your search.')).not.toBeInTheDocument();
});

test('Cantonese practice filters and drafts keep original enum values and saved text', async () => {
 const user=userEvent.setup(); visit('/pages/cnresources.html#practice');
 await user.selectOptions(screen.getByRole('combobox',{name:'難度'}),'Easy');
 expect(screen.getByRole('combobox',{name:'難度'})).toHaveValue('Easy');
 await user.click(screen.getAllByRole('button',{name:'用嚟備賽'})[0]);
 expect(screen.getByRole('textbox',{name:'辯題'}).value).toMatch(/本院/);
 await user.selectOptions(screen.getByRole('combobox',{name:'立場'}),'Opposition');
 expect(JSON.parse(localStorage.getItem('dcPracticeDrafts:v1')).side).toBe('Opposition');
 await user.type(screen.getByRole('textbox',{name:'背景'}),'My own 原文');
 expect(JSON.parse(localStorage.getItem('dcPracticeDrafts:v1')).context).toBe('My own 原文');
 expect(screen.getByRole('link',{name:'切換到英文版'})).toHaveAttribute('href','/pages/resources.html#practice');
});

test('Cantonese framework answers, emphasis chunks, and game feedback are localized', async () => {
 const user=userEvent.setup(); const view=visit('/pages/cnresources.html#frameworks');
 await user.click(screen.getAllByRole('button',{name:'顯示答案'})[0]);
 expect(screen.getByRole('main')).toHaveTextContent('政策辯題。正方');
 view.unmount(); visit('/pages/cnresources.html#manner');
 await user.click(screen.getByRole('button',{name:'煮嘅餸',exact:true}));
 expect(screen.getByRole('main')).toHaveTextContent('讚嘅係「煮嘅餸」');
 view.unmount();
});

test('Cantonese game completes all rounds with translated scoring and rank', async () => {
 const user=userEvent.setup();visit('/pages/cnresources.html#even-if');
 expect(screen.getByRole('heading',{name:'「即使如此」減輕影響遊戲'})).toBeInTheDocument();
 expect(screen.getByRole('button',{name:'新手 · 30 秒'})).toHaveAttribute('aria-pressed','true');
 for(let round=0;round<5;round++){
  const question=mitigationGameData.RECRUIT.find(item=>t(item.t)===document.querySelector('.game-argument h3').textContent);
  await user.click(screen.getByRole('button',{name:t(question.o.find(option=>option.type==='TURN').text)}));
  expect(document.querySelector('.feedback-card')).not.toHaveTextContent(/CRITICAL HIT|DEFLECTED|BREACHED|points/);
  if(round<4) await user.click(screen.getByRole('button',{name:'下一回合'}));
  else await user.click(screen.getByRole('button',{name:'完成遊戲'}));
 }
 expect(screen.getByRole('status')).toHaveTextContent('最終分數：');
 expect(screen.getByRole('status')).not.toHaveTextContent('Rank');
});

test('new Cantonese drafts start with a translated sample while existing drafts remain exact', async()=>{
 const user=userEvent.setup();const view=visit('/pages/cnresources.html#practice');
 await user.click(screen.getByRole('tab',{name:'備賽工作區'}));
 expect(screen.getByRole('textbox',{name:'辯題'})).toHaveValue('本院會禁止動物園。');
 view.unmount();localStorage.setItem('dcPracticeDrafts:v1',JSON.stringify({motion:'My original English 辯題',side:'Opposition',context:'Do not translate me'}));
 visit('/pages/cnresources.html#practice');await user.click(screen.getByRole('tab',{name:'備賽工作區'}));
 expect(screen.getByRole('textbox',{name:'辯題'})).toHaveValue('My original English 辯題');
 expect(screen.getByRole('textbox',{name:'背景'})).toHaveValue('Do not translate me');
});

test('Cantonese timer controls keep clock behavior and localized status', async()=>{
 const user=userEvent.setup();visit('/pages/cnresources.html#practice');
 await user.click(screen.getByRole('tab',{name:'演講計時器'}));
 expect(screen.getByRole('timer')).toHaveTextContent('05:00');
 expect(screen.getByText('受保護時間')).toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:'開始',exact:true}));
 expect(screen.getByRole('button',{name:'暫停',exact:true})).toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:'重設',exact:true}));
 expect(screen.getByRole('timer')).toHaveTextContent('05:00');
});
