(() => {
  const h = React.createElement;
  const { useEffect, useMemo, useRef, useState } = React;

  const NAVY = "#111d3c";
  const NAVY2 = "#0d1730";
  const ORANGE = "#F7A234";
  const SKY = "#3DC3E8";
  const CREAM = "#f5f0e8";
  const WHITE = "#ffffff";

  const pageId = window.DC_PAGE_ID || "about";
  const lang = pageId.startsWith("cn") ? "zh" : "en";
  const isZh = lang === "zh";

  const cn = {
    nav: {
      home: "../cnindex.html",
      about: "關於我哋",
      programs: "課程",
      involved: "參與我哋",
      contact: "聯絡我哋",
      lang: "English",
      langHref: pageId.replace(/^cn/, "") ? `${pageId.replace(/^cn/, "")}.html` : "../index.html",
      cta: "免費申請 →",
    },
    footerSummary: "為 3 至 12 年級學生提供免費辯論與科學課程，連結全球 12+ 國家學生。",
  };

  const en = {
    nav: {
      home: "../index.html",
      about: "About",
      programs: "Programs",
      involved: "Get Involved",
      contact: "Contact Us",
      lang: "中文 (繁體)",
      langHref: pageId === "even-if" ? "../cnindex.html" : `cn${pageId}.html`,
      cta: "Apply Free →",
    },
    footerSummary: "Free debate and science programs for Grades 3-12 across 12+ countries.",
  };

  const t = isZh ? cn : en;

  const pageTitles = {
    about: "About DebateCraft",
    story: "Our Mission",
    team: "Our Team",
    offerings: "Debate Programs",
    cnofferings: "辯論課程",
    cncourses: "辯論課程",
    biology: "Bioethics: Science and Future of Medicine",
    partnership: "Partner With Us",
    "get-involved": "Get Involved",
    donate: "Donate",
    contact: "Contact Us",
    resources: "Resources",
    guides: "Guides",
    blog: "Blog",
    manner: "Public Speaking Lab",
    mannernew: "Debate Resource Library",
    "even-if": "Mitigation Trainer",
    others: "More Programs",
    cnabout: "關於 DebateCraft",
    cnstory: "我哋嘅使命",
    cnteam: "我哋嘅團隊",
    cnbiology: "生物倫理：科學與醫學未來",
    cnpartnership: "合作夥伴",
    "cnget-involved": "參與我哋",
    cndonate: "捐款",
    cncontact: "聯絡我哋",
    cnresources: "資源",
    cnothers: "更多課程",
  };

  const style = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',sans-serif;background:${CREAM};color:${NAVY};min-height:100vh}
    a{color:inherit;text-decoration:none}
    button,input,select,textarea{font:inherit}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:${NAVY2}}
    ::-webkit-scrollbar-thumb{background:${ORANGE};border-radius:3px}
    .serif{font-family:'Playfair Display',Georgia,serif}
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes countUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pillPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
    .dc-shell{min-height:100vh;background:${CREAM}}
    .dc-nav-wrap{position:sticky;top:0;z-index:200}
    .dc-nav{height:60px;overflow:hidden;background:${NAVY};border-bottom:1px solid rgba(255,255,255,.07);transition:height .42s cubic-bezier(.22,1,.36,1)}
    .dc-nav.open{height:260px}
    .dc-nav-top{height:60px;display:flex;align-items:center;gap:12px;padding:0 28px}
    .dc-burger{width:26px;height:18px;display:flex;flex-direction:column;justify-content:space-between;flex-shrink:0;padding:1px 0;background:transparent;border:0;cursor:pointer}
    .dc-burger span{height:2px;background:${WHITE};border-radius:1px;transition:all .3s ease}
    .dc-nav.open .dc-burger span:nth-child(1){transform:rotate(45deg) translateY(8px)}
    .dc-nav.open .dc-burger span:nth-child(2){opacity:0}
    .dc-nav.open .dc-burger span:nth-child(3){transform:rotate(-45deg) translateY(-8px)}
    .dc-brand{display:flex;align-items:center;gap:10px;margin-left:4px;color:${WHITE}}
    .dc-brand img{width:28px;height:28px;object-fit:contain}
    .dc-wordmark{font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:700;line-height:1}
    .dc-right-links{display:flex;align-items:center;gap:2px;margin-left:auto}
    .dc-right-links a{color:rgba(255,255,255,.62);font-size:12px;font-weight:600;padding:7px 12px;letter-spacing:.04em;white-space:nowrap}
    .dc-right-links a:hover{color:${WHITE}}
    .dc-divider{width:1px;height:16px;background:rgba(255,255,255,.12);margin:0 6px}
    .dc-lang{color:rgba(255,255,255,.35)!important;font-size:11px!important}
    .dc-top-cta{background:${ORANGE};color:${NAVY}!important;border-radius:5px;padding:8px 16px!important;font-weight:700!important;font-size:12px!important;letter-spacing:.07em!important;text-transform:uppercase;margin-left:6px}
    .dc-nav-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 28px 18px}
    .dc-nav-card{border-radius:8px;padding:16px 18px;opacity:0;transform:translateY(40px);transition:opacity .38s ease,transform .38s ease;background:${NAVY}}
    .dc-nav.open .dc-nav-card{opacity:1;transform:translateY(0)}
    .dc-nav-card:nth-child(2){background:${NAVY2};border:1px solid rgba(255,255,255,.08);transition-delay:.07s}
    .dc-nav-card:nth-child(3){background:${ORANGE};transition-delay:.14s}
    .dc-nav-label{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:12px}
    .dc-nav-card:nth-child(3) .dc-nav-label{color:rgba(17,29,60,.5)}
    .dc-nav-card a{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.9);font-size:14px;font-weight:500}
    .dc-nav-card a:last-child{border-bottom:0}
    .dc-nav-card:nth-child(3) a{color:${NAVY};border-bottom-color:rgba(17,29,60,.1)}
    .page-header{background:${NAVY2};position:relative;overflow:hidden;padding:96px 0 82px;color:${WHITE};text-align:center}
    .page-header:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(247,162,52,.12),transparent 45%),linear-gradient(225deg,rgba(61,195,232,.11),transparent 42%)}
    .section{padding:88px 0}
    .band-white{background:${WHITE}}
    .band-cream{background:${CREAM}}
    .band-dark{background:${NAVY2};color:${WHITE}}
    .inner{width:94%;max-width:1200px;margin:0 auto;padding:0 32px}
    .eyebrow{font-size:11px;font-weight:700;color:${ORANGE};letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}
    .title{font-family:'Playfair Display',Georgia,serif;font-size:52px;font-weight:800;line-height:1.08;color:${NAVY};margin-bottom:20px}
    .band-dark .title{color:${WHITE}}
    .lead{font-size:16px;line-height:1.75;color:rgba(17,29,60,.66);max-width:760px}
    .band-dark .lead{color:rgba(255,255,255,.62)}
    .grid{display:grid;gap:24px}
    .grid-2{grid-template-columns:repeat(2,1fr)}
    .grid-3{grid-template-columns:repeat(3,1fr)}
    .grid-4{grid-template-columns:repeat(4,1fr)}
    .card{background:${WHITE};border-radius:4px;border-top:4px solid var(--accent,${ORANGE});padding:28px 24px;box-shadow:0 4px 14px rgba(17,29,60,.06);transition:transform .25s ease,box-shadow .25s ease}
    .card:hover{transform:translateY(-6px);box-shadow:0 16px 32px rgba(17,29,60,.12)}
    .dark-card{background:${NAVY};color:${WHITE};border-top-color:var(--accent,${ORANGE})}
    .card h3{font-size:18px;font-weight:700;color:${NAVY};margin-bottom:10px}
    .dark-card h3{color:${WHITE}}
    .card p{font-size:14px;line-height:1.65;color:rgba(17,29,60,.62)}
    .dark-card p{color:rgba(255,255,255,.62)}
    .course-detail-list{margin-top:16px;padding-left:18px;color:rgba(17,29,60,.68);font-size:13px;line-height:1.55}
    .course-detail-list li{margin-bottom:8px}
    .pill{display:inline-block;border-radius:999px;padding:5px 10px;font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;background:rgba(247,162,52,.12);color:${ORANGE};margin-bottom:12px}
    .btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:5px;padding:13px 24px;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease;background:${ORANGE};color:${NAVY}}
    .btn:hover{transform:translateY(-2px);box-shadow:0 12px 35px rgba(247,162,52,.35)}
    .btn.dark{background:${NAVY};color:${WHITE}}
    .btn.ghost{background:transparent;color:${WHITE};border:1.5px solid rgba(255,255,255,.22);box-shadow:none}
    .stats-band{background:${ORANGE};color:${NAVY}}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr)}
    .stat{padding:40px 16px;text-align:center;border-right:1px solid rgba(17,29,60,.15);animation:countUp .5s ease both}
    .stat:last-child{border-right:0}
    .stat strong{display:block;font-family:'Playfair Display',Georgia,serif;font-size:52px;line-height:1;font-weight:800;margin-bottom:6px}
    .stat span{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;opacity:.72;line-height:1.5}
    .footer{background:${NAVY};color:${WHITE}}
    .footer-top{border-bottom:1px solid rgba(255,255,255,.07);padding:32px}
    .footer-brand-row{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:24px}
    .footer-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid rgba(255,255,255,.07)}
    .footer-col{padding:32px;border-right:1px solid rgba(255,255,255,.06)}
    .footer-col:last-child{border-right:0}
    .footer-heading{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.32);margin-bottom:16px}
    .footer-col a{display:block;font-size:13px;color:rgba(255,255,255,.65);margin-bottom:9px}
    .footer-bottom{max-width:1200px;margin:0 auto;padding:16px 32px;display:flex;justify-content:space-between;color:rgba(255,255,255,.22);font-size:11px}
    .team-img{width:100%;height:270px;object-fit:cover;display:block;background:${CREAM}}
    .filter-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:30px 0}
    .filter-row button{border:1px solid rgba(17,29,60,.12);background:${WHITE};color:${NAVY};border-radius:999px;padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer}
    .filter-row button.active{background:${NAVY};color:${WHITE}}
    .resource-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0;border-bottom:1px solid rgba(17,29,60,.08)}
    .resource-row:last-child{border-bottom:0}
    .lab-panel{background:${WHITE};border-radius:4px;border-top:4px solid ${ORANGE};padding:28px;box-shadow:0 4px 14px rgba(17,29,60,.06)}
    .slider{width:100%;accent-color:${ORANGE}}
    .resource-layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:24px;align-items:start}
    .resource-sidebar{position:sticky;top:86px;background:${NAVY};padding:14px;border-radius:8px;box-shadow:0 18px 40px rgba(17,29,60,.12)}
    .resource-tab{width:100%;border:0;border-radius:6px;background:transparent;color:rgba(255,255,255,.62);padding:13px 14px;margin-bottom:7px;text-align:left;font-weight:800;font-size:13px;letter-spacing:.03em;cursor:pointer;display:flex;justify-content:space-between;gap:12px;align-items:center}
    .resource-tab:hover,.resource-tab.active{background:${ORANGE};color:${NAVY}}
    .resource-tab span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;opacity:.68}
    .resource-panel{min-width:0}
    .tool-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;flex-wrap:wrap;margin-bottom:24px}
    .tool-head h2{font-family:'Playfair Display',Georgia,serif;font-size:38px;line-height:1.08;margin-bottom:10px}
    .tool-head p{max-width:680px;color:rgba(17,29,60,.64);line-height:1.7}
    .segmented{display:flex;flex-wrap:wrap;gap:8px}
    .segmented button,.mini-btn{border:1px solid rgba(17,29,60,.12);background:${WHITE};color:${NAVY};border-radius:999px;padding:9px 14px;font-size:12px;font-weight:800;cursor:pointer}
    .segmented button.active,.mini-btn.active{background:${NAVY};color:${WHITE};border-color:${NAVY}}
    .search-input,.select-input,.practice-area{width:100%;border:1px solid rgba(17,29,60,.12);background:${WHITE};color:${NAVY};border-radius:6px;padding:12px 14px;outline:none}
    .search-input:focus,.select-input:focus,.practice-area:focus{border-color:${SKY};box-shadow:0 0 0 3px rgba(61,195,232,.16)}
    .practice-area{min-height:104px;resize:vertical;line-height:1.55}
    .resource-card-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
    .compact-card{background:${WHITE};border:1px solid rgba(17,29,60,.08);border-top:4px solid var(--accent,${ORANGE});border-radius:6px;padding:22px;box-shadow:0 4px 14px rgba(17,29,60,.05)}
    .compact-card h3{font-size:18px;margin-bottom:8px;color:${NAVY}}
    .compact-card p{font-size:14px;line-height:1.65;color:rgba(17,29,60,.62)}
    .compact-meta{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:${ORANGE};margin-bottom:10px}
    .video-shell{display:grid;grid-template-columns:1.1fr .9fr;gap:20px;align-items:start}
    .video-frame{position:relative;aspect-ratio:16/9;background:${NAVY};border-radius:6px;overflow:hidden;box-shadow:0 18px 40px rgba(17,29,60,.16)}
    .video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
    .lesson-shell{display:grid;grid-template-columns:230px minmax(0,1fr);gap:20px;align-items:start}
    .lesson-nav{background:${WHITE};border:1px solid rgba(17,29,60,.08);border-radius:6px;padding:10px}
    .lesson-nav button{width:100%;border:0;background:transparent;border-radius:5px;padding:11px 12px;text-align:left;font-size:13px;font-weight:800;color:rgba(17,29,60,.7);cursor:pointer}
    .lesson-nav button.active{background:${NAVY};color:${WHITE}}
    .lesson-box{background:${WHITE};border-radius:6px;border-top:4px solid ${SKY};padding:26px;box-shadow:0 4px 14px rgba(17,29,60,.06)}
    .lesson-box h3{font-size:26px;margin-bottom:10px}
    .lesson-box h4{font-size:17px;margin:20px 0 8px;color:${NAVY}}
    .lesson-box p,.lesson-box li{font-size:14px;line-height:1.72;color:rgba(17,29,60,.68)}
    .lesson-box ul{padding-left:20px}
    .example-strip{background:${CREAM};border:1px dashed rgba(17,29,60,.18);border-radius:6px;padding:16px;margin:18px 0;text-align:center}
    .answer-box{background:rgba(13,148,136,.1);border:1px solid rgba(13,148,136,.2);border-radius:6px;padding:14px;margin-top:12px;color:${NAVY};font-size:14px;line-height:1.6}
    .motion-display{background:${NAVY};color:${WHITE};border-radius:6px;padding:30px;text-align:center;min-height:150px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',Georgia,serif;font-size:28px;line-height:1.2}
    .emphasis-sentence{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;background:${CREAM};border-radius:6px;padding:22px;margin:18px 0;font-family:'Playfair Display',Georgia,serif;font-size:30px}
    .emphasis-word{border:0;background:transparent;color:${NAVY};padding:4px 7px;border-radius:5px;cursor:pointer}
    .emphasis-word.active{background:${ORANGE};color:${NAVY};transform:translateY(-2px)}
    .spectrum-buttons{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
    .spectrum-buttons button,.archetype-button{border:1px solid rgba(17,29,60,.1);background:${CREAM};color:${NAVY};border-radius:6px;padding:11px 12px;text-align:left;font-size:13px;font-weight:800;cursor:pointer}
    .spectrum-buttons button.active,.archetype-button:hover{background:${NAVY};color:${WHITE}}
    .range-row{display:grid;grid-template-columns:1fr 130px;gap:14px;align-items:center;margin:14px 0}
    .range-label{font-size:12px;font-weight:800;color:${ORANGE};text-align:right}
    .analysis-list{margin-top:14px;display:grid;gap:10px}
    .analysis-item{background:${CREAM};border-left:4px solid var(--accent,${SKY});border-radius:5px;padding:12px 14px;font-size:13px;line-height:1.55;color:rgba(17,29,60,.68)}
    .game-shell{background:${NAVY2};color:${WHITE};border-radius:8px;padding:24px;box-shadow:0 18px 40px rgba(17,29,60,.18)}
    .game-hud{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
    .hud-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:12px}
    .hud-card span{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.45);margin-bottom:5px}
    .hud-card strong{font-size:20px;color:${WHITE}}
    .meter{height:9px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:8px}
    .meter-fill{height:100%;border-radius:999px;background:${ORANGE};transition:width .25s ease}
    .game-argument{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:22px;margin:18px 0}
    .game-argument h3{font-family:'Playfair Display',Georgia,serif;font-size:32px;line-height:1.15;color:${WHITE}}
    .option-card{width:100%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.07);color:${WHITE};border-radius:6px;padding:15px 16px;text-align:left;cursor:pointer;line-height:1.5}
    .option-card:hover,.option-card.selected{border-color:${ORANGE};background:rgba(247,162,52,.16)}
    .feedback-card{background:${WHITE};color:${NAVY};border-left:4px solid ${ORANGE};border-radius:6px;padding:18px;margin-top:18px}
    .feedback-card h3{font-size:18px;margin-bottom:6px}
    @media(max-width:900px){
      .dc-nav.open{height:430px}
      .dc-nav-top{padding:0 18px}
      .dc-right-links{display:none}
      .dc-nav-cards{grid-template-columns:1fr;padding:0 18px 18px}
      .page-header{padding:76px 0 64px}
      .title{font-size:40px}
      .grid-2,.grid-3,.grid-4,.stats-grid,.footer-grid{grid-template-columns:1fr}
      .footer-brand-row,.footer-bottom{align-items:flex-start;flex-direction:column}
      .footer-col{border-right:0;border-bottom:1px solid rgba(255,255,255,.06)}
      .stat{border-right:0;border-bottom:1px solid rgba(17,29,60,.15)}
      .section{padding:64px 0}
      .inner{padding:0 20px}
      .resource-layout,.lesson-shell,.video-shell{grid-template-columns:1fr}
      .resource-sidebar{position:static}
      .resource-card-grid,.spectrum-buttons,.game-hud{grid-template-columns:1fr}
      .range-row{grid-template-columns:1fr}
      .range-label{text-align:left}
      .motion-display{font-size:23px}
    }
  `;

  document.head.insertAdjacentHTML("beforeend", `<style>${style}</style>`);

  function extProps(href) {
    return /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
  }

  function Brand({ footer = false }) {
    const wordmark = footer
      ? [h("span", { key: "debate", style: { color: ORANGE } }, "Debate"), h("span", { key: "craft", style: { color: SKY } }, "Craft")]
      : "DebateCraft";
    return h(
      "a",
      { className: "dc-brand", href: t.nav.home },
      h("img", { src: "../Images/Logo-white-transparent.png", alt: "DebateCraft" }),
      h("span", { className: "dc-wordmark" }, wordmark)
    );
  }

  function Arrow() {
    return h(
      "svg",
      { width: 11, height: 11, viewBox: "0 0 12 12", fill: "none" },
      h("path", {
        d: "M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      })
    );
  }

  function Nav() {
    const [open, setOpen] = useState(false);
    const navCards = isZh
      ? [
          { label: "關於我哋", links: [["我哋嘅使命", "cnstory.html"], ["我哋嘅團隊", "cnteam.html"], ["合作夥伴", "cnpartnership.html"]] },
          { label: "課程", links: [["辯論課程", "cncourses.html"], ["生物倫理", "cnbiology.html"], ["資源", "cnresources.html"]] },
          { label: "參與我哋", links: [["學生申請", "https://form.jotform.com/261003548067049"], ["成為教練", "https://docs.google.com/forms/d/e/1FAIpQLSfombgLTJ0oDbWfCaSumrnLAjkdvT_K9FW1KJakbr9ZAQxwnQ/viewform?usp=header"], ["捐款", "https://buymeacoffee.com/debatecraft"]] },
        ]
      : [
          { label: "About", links: [["Our Mission", "story.html"], ["Our Team", "team.html"], ["Partnership", "partnership.html"]] },
          { label: "Programs", links: [["Debate Courses", "offerings.html"], ["Bioethics", "biology.html"], ["Resources", "resources.html"]] },
          { label: "Get Involved", links: [["Apply as Student", "https://form.jotform.com/261003548067049"], ["Become a Coach", "https://docs.google.com/forms/d/e/1FAIpQLSfombgLTJ0oDbWfCaSumrnLAjkdvT_K9FW1KJakbr9ZAQxwnQ/viewform?usp=header"], ["Donate", "https://buymeacoffee.com/debatecraft"]] },
        ];

    return h(
      "div",
      { className: "dc-nav-wrap" },
      h(
        "nav",
        { className: `dc-nav${open ? " open" : ""}` },
        h(
          "div",
          { className: "dc-nav-top" },
          h("button", { className: "dc-burger", onClick: () => setOpen(!open), "aria-label": "Toggle navigation", "aria-expanded": open }, h("span"), h("span"), h("span")),
          h(Brand),
          h(
            "div",
            { className: "dc-right-links" },
            h("a", { href: isZh ? "cnget-involved.html" : "get-involved.html" }, t.nav.involved),
            h("a", { href: isZh ? "cncontact.html" : "contact.html" }, t.nav.contact),
            h("div", { className: "dc-divider" }),
            h("a", { className: "dc-lang", href: t.nav.langHref }, t.nav.lang),
            h("a", { className: "dc-top-cta", href: "https://form.jotform.com/261003548067049", ...extProps("https://form.jotform.com/261003548067049") }, t.nav.cta)
          )
        ),
        h(
          "div",
          { className: "dc-nav-cards" },
          navCards.map((card) =>
            h(
              "div",
              { className: "dc-nav-card", key: card.label },
              h("div", { className: "dc-nav-label" }, card.label),
              card.links.map(([label, href]) => h("a", { key: label, href, ...extProps(href) }, h(Arrow), label))
            )
          )
        )
      )
    );
  }

  function PageHeader({ eyebrow, title, emphasis, subtitle }) {
    return h(
      "section",
      { className: "page-header" },
      h(
        "div",
        { className: "inner", style: { position: "relative", zIndex: 2 } },
        eyebrow && h("div", { className: "eyebrow", style: { animation: "fadeUp .55s ease both" } }, eyebrow),
        h(
          "h1",
          { className: "serif", style: { fontSize: "clamp(42px, 8vw, 64px)", fontWeight: 800, color: WHITE, lineHeight: 1.05, marginBottom: 18, animation: "fadeUp .6s ease .08s both" } },
          title,
          emphasis && h("em", { style: { color: ORANGE, fontStyle: "italic" } }, ` ${emphasis}`)
        ),
        subtitle && h("p", { style: { maxWidth: 720, margin: "0 auto", color: "rgba(255,255,255,.64)", fontSize: 17, lineHeight: 1.72, animation: "fadeUp .6s ease .16s both" } }, subtitle)
      )
    );
  }

  function Section({ dark = false, cream = false, children }) {
    return h("section", { className: `section ${dark ? "band-dark" : cream ? "band-cream" : "band-white"}` }, h("div", { className: "inner" }, children));
  }

  function TitleBlock({ eyebrow, title, emphasis, lead, dark = false, center = false }) {
    return h(
      "div",
      { style: { textAlign: center ? "center" : "left", marginBottom: 46 } },
      eyebrow && h("div", { className: "eyebrow" }, eyebrow),
      h("h2", { className: "title" }, title, emphasis && h("em", { style: { color: dark ? SKY : ORANGE, fontStyle: "italic" } }, ` ${emphasis}`)),
      lead && h("p", { className: "lead", style: { margin: center ? "0 auto" : 0 } }, lead)
    );
  }

  function Button({ href, children, dark = false, ghost = false }) {
    const props = href ? { href, ...extProps(href) } : {};
    return h("a", { className: `btn${dark ? " dark" : ""}${ghost ? " ghost" : ""}`, ...props }, children);
  }

  function InfoCard({ title, text, accent = ORANGE, tag, dark = false, children }) {
    return h(
      "article",
      { className: `card${dark ? " dark-card" : ""}`, style: { "--accent": accent } },
      tag && h("div", { className: "pill", style: { color: accent, background: `${accent}18` } }, tag),
      h("h3", null, title),
      text && h("p", null, text),
      children
    );
  }

  function StatsBand({ stats }) {
    return h("section", { className: "stats-band" }, h("div", { className: "inner" }, h("div", { className: "stats-grid" }, stats.map((s) => h("div", { className: "stat", key: s.n }, h("strong", null, s.n), h("span", null, s.label))))));
  }

  const commonStats = isZh
    ? [
        { n: "220+", label: "全球學生" },
        { n: "200+", label: "教學時數" },
        { n: "100+", label: "累積教練經驗" },
        { n: "100%", label: "學生推薦率" },
      ]
    : [
        { n: "220+", label: "Students Worldwide" },
        { n: "200+", label: "Hours Taught" },
        { n: "100+", label: "Years Experience" },
        { n: "100%", label: "Recommendation Rate" },
      ];

  const programs = isZh
    ? [
        {
          title: "Level 1 Introduction to Debate",
          tag: "Level 1 · 9歲以上 · 初學者",
          text: "為九歲或以上、沒有辯論經驗的學生設計。課程以溫和但嚴謹的方式引入邏輯、蘇格拉底式推理和公開演說自信。",
          accent: ORANGE,
          details: ["13 節完整課程", "PEEL 立論方法", "作業禁令、一次性塑膠等適齡模擬辯論", "首兩週包含 1-on-1 coaching meeting", "每班最多 8 人"],
        },
        {
          title: "Level 2 Intermediate Debate",
          tag: "Level 2 · 有基礎 · 最多約一年經驗",
          text: "適合較年長學生、完成基礎課程的學生，或已有 DebateCraft 經驗的學生。課程延續結構化論證，但節奏更快、議題更複雜。",
          accent: "#e07b2a",
          details: ["強化反駁技巧", "深入 motion analysis 和策略判斷", "由基本公開演說過渡到競技辯論邏輯", "每班最多 10 人"],
        },
        {
          title: "Public Forum Mastery",
          tag: "PF · 13歲以上 · 有經驗",
          text: "專為想精進美式 Public Forum 的學生設計，平衡扎實證據研究與有說服力的表達。",
          accent: "#764ba2",
          details: ["10 節兩小時課程", "每班最多 8 人", "訓練 crossfire 技巧和 summary speech", "建立資料驅動的現代競技辯論能力"],
        },
        {
          title: "Level 3 WSDC Mastery",
          tag: "Level 3 · WSDC · 13歲以上 · 2年以上",
          text: "由 Team HK WSDC 成員教授，適合已有兩年以上經驗、希望掌握五分鐘演講與 World Schools 策略的高表現辯手。",
          accent: "#dc2626",
          details: ["10 節兩小時專項課程", "每班最多 10 人", "訓練 style、content 和 strategic preparation", "對標國際賽事標準"],
        },
        {
          title: "Level 3 BP Competitive Track",
          tag: "Level 3 · BP · 13歲以上 · 2年以上",
          text: "面向有至少兩年經驗的學生，訓練大學式 British Parliamentary 快節奏辯論和有衝擊力的五分鐘演講。",
          accent: SKY,
          details: ["10 節兩小時課程", "每班最多 8 人", "密集訓練 extensions 和 POI 技巧", "另設 Saturday Lab，整個夏天每週與積極同儕練習 BP"],
        },
        {
          title: "Level 4 Advanced Debate Seminar",
          tag: "Level 4 · 15歲以上 · 5年以上",
          text: "面向已有五年以上經驗和賽事成績的高階辯手，進一步打磨國際競賽所需的 case-building、matter-loading 和策略比較。",
          accent: "#4f46e5",
          details: ["適合能完成成熟 8 分鐘演講的學生", "深度 matter-loading", "進階 weighing 與 motion analysis", "高強度 tournament-ready seminar"],
        },
      ]
    : [
        {
          title: "Level 1 Introduction to Debate",
          tag: "Level 1 · Ages 9+ · Beginner",
          text: "Ignite your child's critical thinking with a gentle yet rigorous introduction to logic and Socratic reasoning for younger beginners with no prior experience.",
          accent: ORANGE,
          details: ["13 comprehensive sessions", "Industry-standard PEEL argumentation method", "Mock debates on age-appropriate topics like banning homework or single-use plastics", "1-on-1 coaching meetings during the first two weeks", "Small cohort of 8 students"],
        },
        {
          title: "Level 2 Intermediate Debate",
          tag: "Level 2 · Prior DebateCraft or up to 1 year",
          text: "A natural progression for older students or students who have completed our foundational programs, with more complex challenges and a faster pace.",
          accent: "#e07b2a",
          details: ["Structured argumentation at a higher level", "Sharper rebuttal technique", "Strategic motion analysis", "Strict limit of 10 students per class"],
        },
        {
          title: "Public Forum Mastery",
          tag: "Public Forum · Ages 13+ · Prior experience",
          text: "Master the art of persuasion in the American PF format by balancing rigorous evidence-based research with persuasive delivery.",
          accent: "#764ba2",
          details: ["10 two-hour sessions", "Small cohort of 8 students", "Crossfire technique and summary speeches", "Professional communication and data-driven argumentation"],
        },
        {
          title: "Level 3 WSDC Mastery",
          tag: "Level 3 · WSDC · Ages 13+ · 2+ years",
          text: "A high-performance World Schools track taught by members of Team HK WSDC for experienced debaters ready to master five-minute speeches and advanced strategy.",
          accent: "#dc2626",
          details: ["10 specialized two-hour sessions", "Maximum of 10 students", "Style, content, and strategic preparation", "Training modeled on international championship standards"],
        },
        {
          title: "Level 3 BP Competitive Track",
          tag: "Level 3 · British Parliamentary · Ages 13+ · 2+ years",
          text: "Master university-style British Parliamentary debating through rapid critical thinking, impactful five-minute speeches, and intensive individualized feedback.",
          accent: SKY,
          details: ["10 two-hour sessions", "Strict limit of 8 students per class", "Extensions and POI techniques", "Optional Saturday Lab for weekly summer BP practice against motivated peers"],
        },
        {
          title: "Level 4 Advanced Debate Seminar",
          tag: "Level 4 · Ages 15+ · 5+ years",
          text: "An elite seminar for high-level debaters with proven tournament records who want to refine case-building for international competition.",
          accent: "#4f46e5",
          details: ["For students already delivering sophisticated 8-minute speeches", "Deep matter-loading", "Advanced strategic weighing and nuanced motion analysis", "Rigorous tournament-ready environment"],
        },
      ];

  function GlobalMap() {
    const [visible, setVisible] = useState(false);
    const mapRef = useRef(null);
    const sectionRef = useRef(null);
    const pins = isZh
      ? [
          { name: "加拿大", lat: 56, lon: -96, flag: "🇨🇦", labelDir: "above" },
          { name: "美國", lat: 37, lon: -98, flag: "🇺🇸", labelDir: "below" },
          { name: "巴拿馬", lat: 9, lon: -80, flag: "🇵🇦", labelDir: "below" },
          { name: "英國", lat: 54, lon: -2, flag: "🇬🇧", labelDir: "above" },
          { name: "巴基斯坦", lat: 30, lon: 69, flag: "🇵🇰", labelDir: "above" },
          { name: "印度", lat: 22, lon: 80, flag: "🇮🇳", labelDir: "below" },
          { name: "卡塔爾", lat: 25.3, lon: 51.2, flag: "🇶🇦", labelDir: "above" },
          { name: "印尼", lat: -4, lon: 118, flag: "🇮🇩", labelDir: "below" },
          { name: "越南", lat: 14, lon: 106, flag: "🇻🇳", labelDir: "below" },
          { name: "南韓", lat: 37, lon: 128, flag: "🇰🇷", labelDir: "above" },
          { name: "中國", lat: 36, lon: 100, flag: "🇨🇳", labelDir: "above" },
          { name: "香港", lat: 21.5, lon: 119, flag: "🇭🇰", labelDir: "above" },
        ]
      : [
          { name: "Canada", lat: 56, lon: -96, flag: "🇨🇦", labelDir: "above" },
          { name: "United States", lat: 37, lon: -98, flag: "🇺🇸", labelDir: "below" },
          { name: "Panama", lat: 9, lon: -80, flag: "🇵🇦", labelDir: "below" },
          { name: "United Kingdom", lat: 54, lon: -2, flag: "🇬🇧", labelDir: "above" },
          { name: "Pakistan", lat: 30, lon: 69, flag: "🇵🇰", labelDir: "above" },
          { name: "India", lat: 22, lon: 80, flag: "🇮🇳", labelDir: "below" },
          { name: "Qatar", lat: 25.3, lon: 51.2, flag: "🇶🇦", labelDir: "above" },
          { name: "Indonesia", lat: -4, lon: 118, flag: "🇮🇩", labelDir: "below" },
          { name: "Vietnam", lat: 14, lon: 106, flag: "🇻🇳", labelDir: "below" },
          { name: "South Korea", lat: 37, lon: 128, flag: "🇰🇷", labelDir: "above" },
          { name: "China", lat: 36, lon: 100, flag: "🇨🇳", labelDir: "above" },
          { name: "Hong Kong", lat: 21.5, lon: 119, flag: "🇭🇰", labelDir: "above" },
        ];

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      }, { threshold: 0.15 });
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!visible || !mapRef.current) return;
      const el = mapRef.current;
      const loadScript = (src, check) =>
        new Promise((resolve, reject) => {
          if (window[check]) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

      Promise.all([
        loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js", "d3"),
        loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js", "topojson"),
      ])
        .then(() => {
          const width = el.parentElement.clientWidth || 620;
          const height = Math.round(width * 0.62);
          const d3 = window.d3;
          const topojson = window.topojson;
          const svg = d3.select(el).attr("viewBox", `0 0 ${width} ${height}`).attr("width", width).attr("height", height);
          svg.selectAll("*").remove();
          const projection = d3.geoNaturalEarth1().scale(width / 6.3).translate([width / 2, height / 2]);
          const path = d3.geoPath().projection(projection);
          svg.append("path").datum({ type: "Sphere" }).attr("d", path).attr("fill", "rgba(255,255,255,.03)").attr("stroke", "rgba(255,255,255,.08)").attr("stroke-width", 0.5);
          return fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
            .then((r) => r.json())
            .then((world) => {
              const countries = topojson.feature(world, world.objects.countries);
              svg.append("path").datum(d3.geoGraticule()()).attr("d", path).attr("fill", "none").attr("stroke", "rgba(255,255,255,.04)").attr("stroke-width", 0.4);
              svg.append("g").selectAll("path").data(countries.features).join("path").attr("d", path).attr("fill", "rgba(255,255,255,.07)").attr("stroke", "rgba(255,255,255,.18)").attr("stroke-width", 0.5);
              pins.forEach((pin, i) => {
                const coords = projection([pin.lon, pin.lat]);
                if (!coords) return;
                const [x, y] = coords;
                const above = pin.labelDir === "above";
                const group = svg.append("g").attr("opacity", 0).style("animation", `pillPop .45s ease ${i * 0.07}s both`);
                group.append("text").attr("x", x).attr("y", y + 6).attr("text-anchor", "middle").attr("font-size", 14).attr("font-family", "Apple Color Emoji, Segoe UI Emoji, sans-serif").text(pin.flag);
                const labelY = above ? y - 8 : y + 22;
                const labelW = pin.name.length * 5.2 + 12;
                group.append("rect").attr("x", x - labelW / 2).attr("y", labelY - 9).attr("width", labelW).attr("height", 12).attr("rx", 3).attr("fill", "rgba(13,23,48,.82)");
                group.append("text").attr("x", x).attr("y", labelY).attr("text-anchor", "middle").attr("fill", "rgba(255,255,255,.9)").attr("font-size", 7.5).attr("font-family", "DM Sans, sans-serif").attr("font-weight", 600).text(pin.name);
              });
            });
        })
        .catch(() => {
          if (el) el.setAttribute("viewBox", "0 0 620 320");
        });
    }, [visible]);

    return h(
      "section",
      { ref: sectionRef, className: "band-dark", style: { padding: "80px 0" } },
      h(
        "div",
        { className: "inner", style: { display: "flex", flexDirection: "column", gap: 36 } },
        h(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" } },
          h(
            "div",
            null,
            h("div", { className: "eyebrow" }, isZh ? "全球社群" : "Global Community"),
            h("h2", { className: "serif", style: { fontSize: "clamp(34px, 6vw, 44px)", fontWeight: 800, color: WHITE, lineHeight: 1.08 } }, isZh ? "辯論無" : "Debate Has No ", h("em", { style: { color: SKY, fontStyle: "italic" } }, isZh ? "邊界。" : "Borders."))
          ),
          h(
            "div",
            { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" } },
            [[isZh ? "12+" : "12+", isZh ? "國家及地區" : "Countries"], ["220+", isZh ? "學生" : "Students"], ["100%", isZh ? "推薦率" : "Recommendation"]].map(([number, label], i) =>
              h("div", { key: label, style: { textAlign: "center", minWidth: 90 } }, h("div", { className: "serif", style: { fontSize: 36, fontWeight: 800, color: [ORANGE, SKY, WHITE][i] } }, number), h("div", { style: { fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.42)", letterSpacing: ".08em", textTransform: "uppercase" } }, label))
            )
          )
        ),
        h("div", { style: { background: "rgba(255,255,255,.03)", borderRadius: 8, overflow: "hidden", padding: 12 } }, h("svg", { ref: mapRef, style: { width: "100%", minHeight: 260, display: "block" } }))
      )
    );
  }

  function MissionPage() {
    const missionParagraphs = isZh
      ? [
          "由第一日起，DebateCraft 就係一個由學生營運嘅非牟利項目，目標係賦能中學生，培養佢哋喺論證、倡議同公開演說上嘅核心能力。",
          "我哋希望為資源不足、代表性不足嘅學生提供高質素教育，幫助佢哋喺學術同人生中都能更有信心地表達、分析同領導。",
          "為咗擴闊學生創造正面改變嘅能力，我哋相信課程應覆蓋由九歲初學者到大學一年級學生，讓更多人掌握辯論技巧。",
          "同時，生物學正快速發展，並且喺學術以外越來越具社會影響力。因此我哋今年夏天首次推出生物倫理課程，由出色嘅生物導師團隊帶領。",
        ]
      : [
          "From day one, DebateCraft has been a student-run nonprofit initiative designed to empower middle and high school students. Our focus is on equipping them with essential skills in argumentation, advocacy, and public speaking.",
          "We aim to provide high-quality education to under-resourced and underrepresented students, empowering them to excel academically and in life.",
          "To expand students' ability to create positive change in the world, we believe our student base benefits from expanded offerings that serve learners from age nine through their first year of university and equip them with the craft of debate.",
          "Similarly, biology is a rapidly expanding field that is becoming increasingly relevant beyond academic contexts. This summer, we are offering Bioethics for the first time under the instruction of our decorated Biology instructor team.",
        ];
    const summerCards = isZh
      ? [
          ["辯論課程全面升級", "過去一年，我哋持續優化辯論課程架構同內容，確保唔同程度嘅學生都能被放喺最合適嘅學習路徑。教練同課程開發者定期分析學生回饋，提升課堂參與度同內容保留率。", ORANGE],
          ["世界級課程顧問", "為建立世界級團隊，Sandeep Chulani（前香港校際辯論及公共演講社群主席、亞太地區前十評審）同 Angga Djovanka（現任摩洛哥國家辯論隊教練）都協助我哋打造更有參與感、更有效嘅辯論課程。", SKY],
          ["首次推出生物倫理", "生物倫理係全新課程。我哋多次迭代課綱，並參考前 DebateCraft 學生焦點小組意見，刻意設計成能補足辯論教育、同時聚焦近期生物科技發展嘅課程。", "#0d9488"],
        ]
      : [
          ["Debate Courses, Rebuilt", "Over the last year, we refined and upgraded our debate course structure and content to place students at every level more effectively. Coaches and curriculum developers met regularly to analyze student feedback and improve engagement and content retention.", ORANGE],
          ["World-Class Curriculum Support", "Sandeep Chulani, former chair of the Hong Kong Schools Debating and Public Speaking Community and a top-ten judge in the Asia-Pacific region, and Angga Djovanka, current coach of the Moroccan national debate team, helped us build a debate curriculum that is uniquely engaging and effective.", SKY],
          ["Bioethics Launch", "For our completely new Bioethics course, we iterated the curriculum numerous times with consultation from former DebateCraft student focus groups. The result is designed to complement debate education with a topical focus on recent biological advancements.", "#0d9488"],
        ];

    return h(
      React.Fragment,
      null,
      h(PageHeader, {
        eyebrow: isZh ? "我哋相信" : "What We Stand For",
        title: isZh ? "每位學生都值得擁有" : "Every Student Deserves",
        emphasis: isZh ? "發聲機會。" : "a Voice.",
        subtitle: isZh ? "DebateCraft 由學生營運，為全球學生提供免費辯論教育。" : "DebateCraft turns quiet ideas into commanding voices, led entirely by students for students across the world.",
      }),
      h(
        Section,
        null,
        h("div", { className: "grid grid-2", style: { alignItems: "start" } },
          h(TitleBlock, { eyebrow: isZh ? "使命宣言" : "Our Mission", title: isZh ? "學生賦能" : "Students Empowering", emphasis: isZh ? "學生。" : "Students.", lead: isZh ? "DebateCraft 將多年國際辯論、教練同課程設計經驗濃縮成清晰、免費、可持續嘅訓練，幫學生建立論證、倡議同公開演說能力。" : "DebateCraft makes rigorous debate education accessible while expanding into science and ethics education that helps students think clearly about the world they will inherit." }),
          h("div", { className: "card", style: { "--accent": ORANGE } }, missionParagraphs.map((paragraph) => h("p", { key: paragraph, style: { marginBottom: 14 } }, paragraph)))
        )
      ),
      h(GlobalMap),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "今年夏天" : "What Is New This Summer?", title: isZh ? "課程更精準，" : "A Sharper", emphasis: isZh ? "內容更深入。" : "Summer Offering.", center: true }),
        h(
          "div",
          { className: "grid grid-3" },
          summerCards.map(([title, text, accent]) => h(InfoCard, { key: title, title, text, accent }))
        )
      ),
      h(StatsBand, { stats: commonStats }),
      h(CTA)
    );
  }

  function ProgramsPage({ biology = false, other = false }) {
    if (biology) return h(BiologyPage);
    if (other) return h(OtherProgramsPage);
    return h(
      React.Fragment,
      null,
      h(PageHeader, {
        eyebrow: isZh ? "免費課程" : "Free Programs",
        title: isZh ? "世界級辯論訓練" : "World-Class Debate Training",
        emphasis: isZh ? "免費開放。" : "For Free.",
        subtitle: isZh ? "適合唔同年齡、程度同學習目標，由國際賽經驗教練帶領。" : "Comprehensive debate education for students of all levels, designed by experienced coaches and competitive debaters.",
      }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "課程" : "Available Programs", title: isZh ? "選擇適合你嘅" : "Find the Right", emphasis: isZh ? "路徑。" : "Path.", center: true }),
        h(
          "div",
          { className: "grid grid-2" },
          programs.map((program) =>
            h(
              InfoCard,
              { key: program.title, title: program.title, tag: program.tag, text: program.text, accent: program.accent },
              h("ul", { className: "course-detail-list" }, program.details.map((detail) => h("li", { key: detail }, detail))),
              h("div", { style: { marginTop: 20 } }, h(Button, { href: "https://form.jotform.com/261003548067049" }, isZh ? "登記興趣 →" : "Express Interest →"))
            )
          )
        )
      ),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "點解辯論重要" : "Why Debate Matters", title: isZh ? "訓練一生受用嘅" : "Skills That Last", emphasis: isZh ? "能力。" : "a Lifetime.", center: true }),
        h(
          "div",
          { className: "grid grid-3" },
          [
            [isZh ? "穩定自信" : "Unshakable Confidence", isZh ? "用練習將緊張轉化成穩定、清晰、有力量嘅表達。" : "Structured practice turns hesitation into calm, persuasive presence."],
            [isZh ? "批判思考" : "Critical Thinking", isZh ? "快速分析資訊、找出謬誤、建立完整論證。" : "Students learn to process information and construct airtight arguments."],
            [isZh ? "全球視野" : "Global Awareness", isZh ? "辯題連結國際關係、經濟、政策同倫理議題。" : "Debaters explore international relations, economics, policy, and ethics."],
          ].map(([title, text]) => h(InfoCard, { key: title, title, text }))
        )
      ),
      h(CTA)
    );
  }

  function BiologyPage() {
    const courseTitle = isZh ? "生物倫理：科學與醫學未來" : "Bioethics: Science and Future of Medicine";
    const logistics = isZh
      ? [
          ["教練團隊", "由 Phillips Exeter 學生帶領，包括 USABO 前約 500 名參賽者、醫學期刊作者同 Scholastic Writing Awards 決賽級寫作者。", ORANGE],
          ["課程安排", "10 節一小時課程，處理科學家和醫療專業人士面對的倫理難題。", SKY],
          ["小班教學", "每班嚴格限制 10 人，確保每位學生都能深入參與討論。", "#0d9488"],
          ["年齡要求", "專為 13 歲以上、對醫學、法律或哲學有興趣嘅學生設計。", "#764ba2"],
        ]
      : [
          ["Instructor Team", "Run by Phillips Exeter students: United States Biology Olympiad top performers, including students in roughly the top 500 out of 10,000, published medical journal authors, and experienced Scholastic Writing Awards finalists.", ORANGE],
          ["Course Format", "10 thought-provoking one-hour sessions on the ethical dilemmas scientists and medical professionals face.", SKY],
          ["Class Size", "Strict limit of 10 students per class so every student can participate deeply.", "#0d9488"],
          ["Age Requirement", "Designed for inquisitive students aged 13 and up, especially those interested in medicine, law, or philosophy.", "#764ba2"],
        ];
    const outcomes = isZh
      ? [
          ["Harkness 討論", "學生用圓桌討論處理胚胎篩查、基因治療、AI 醫療和科學責任等真實案例。"],
          ["研究與寫作", "課程訓練學生把科學概念轉化成清晰、有證據、有倫理框架嘅研究或評論文章。"],
          ["專家評審項目", "最後項目會向專家評審團進行 Panel Presentation，家長可旁聽，成果可進一步打磨提交比賽。"],
        ]
      : [
          ["Harkness Debates", "Students test ideas through structured discussions on embryo testing, gene therapy, AI in healthcare, and scientific responsibility."],
          ["Research and Writing", "Students learn to turn scientific concepts into clear, evidence-based review or argumentative writing."],
          ["Expert Panel Project", "The course culminates in a final project and Panel Presentation to a panel of field experts, with parents able to attend."],
        ];
    const units = isZh
      ? [
          {
            title: "Unit 1: 生物與遺傳基礎",
            lessons: [
              "Lesson 1: 細胞、DNA 和基因定義",
              "Lesson 2: 性狀遺傳，包括基因、突變、變異、自然選擇，並重點訓練實驗設計",
              "Lesson 3: 兩場 Harkness 討論：「我哋應否檢測胚胎疾病？」及另一個由班級選定題目",
            ],
          },
          {
            title: "Unit 2: 生物倫理歷史",
            lessons: [
              "Lesson 4: 從紐倫堡審判和二戰後歷史理解生物倫理；討論科技發展點解必須有倫理，以及 race 等性狀和實驗如何曾被用作歧視正當化。",
            ],
          },
          {
            title: "Unit 3: 現代生物倫理",
            lessons: [
              "Lesson 5: CRISPR 和基因治療是甚麼？它們是否合乎倫理？",
              "Lesson 6: AI 如何應用於醫療？點解逐漸成為倫理和政策關注？",
            ],
          },
          {
            title: "Unit 4: 項目式學習與專家展示",
            lessons: [
              "Lesson 7: 項目介紹與 proposal",
              "Lesson 8: 與導師工作坊（一），可按時間表選修",
              "Lesson 9: 與導師工作坊（二），可討論提交 Scholastic 等比賽或其他適合機會",
              "Lesson 10: Panel Presentation，家長可旁聽，並把項目打磨成 research/review paper，例如 3D bioprinting 等方向",
            ],
          },
        ]
      : [
          {
            title: "Unit 1: Foundations of Biology and Genetics",
            lessons: [
              "Lesson 1: Definition of cells, DNA, and genes",
              "Lesson 2: Inheritance of traits: genes, mutation, variation, natural selection, with a major emphasis on designing experiments",
              "Lesson 3: Two Harkness conversations: “Should we test embryos for disease?” plus one additional selected topic",
            ],
          },
          {
            title: "Unit 2: History of Bioethics",
            lessons: [
              "Lesson 4: Bioethics from the Nuremberg Trials and post-WWII history. Why is ethical knowledge essential when developing technology? How were traits like race and scientific experiments used to justify discrimination?",
            ],
          },
          {
            title: "Unit 3: Bioethics in the Modern Era",
            lessons: [
              "Lesson 5: What are CRISPR and gene therapy? Are they ethical?",
              "Lesson 6: How is AI used in healthcare, and why is it becoming a concern?",
            ],
          },
          {
            title: "Unit 4: Project-Based Learning and Expert Panel",
            lessons: [
              "Lesson 7: Project introduction and proposal",
              "Lesson 8: Work with instructor (optional, schedule-dependent)",
              "Lesson 9: Work with instructor (optional, with competition submission planning if desired, including Scholastic argumentative essay pathways and other competitions)",
              "Lesson 10: Panel Presentation, with parents invited to attend, culminating in a research or review paper on topics such as 3D bioprinting",
            ],
          },
        ];
    return h(
      React.Fragment,
      null,
      h(PageHeader, { eyebrow: isZh ? "科學、倫理與未來醫學" : "Science, Ethics, and Future Medicine", title: courseTitle, subtitle: isZh ? "由 Phillips Exeter 學生帶領，訓練學生理解現代生物、遺傳學和醫療科技背後嘅倫理問題。" : "A discussion, writing, and research course on the ethical questions raised by modern biology, genetics, and medical technology." }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "課程描述" : "Course Description", title: isZh ? "唔只學科學點運作" : "Not Just How Science Works", emphasis: isZh ? "更學點樣使用。" : "How It Should Be Used.", lead: isZh ? "學生會探索 gene editing、AI in healthcare、medical decision-making 和 scientific responsibility 等真實案例。課程以 Phillips Exeter Academy 的 Harkness Discussion 方法推動深入、接近大學程度的討論，再延伸至寫作和最後項目。" : "Students explore real-world case studies involving gene editing, AI in healthcare, medical decision-making, and scientific responsibility. The course uses collegiate-level Harkness Discussions, a pedagogical method pioneered at Phillips Exeter Academy, before extending into writing and a final project." }),
        h("div", { className: "grid grid-3" }, logistics.map(([title, text, accent]) => h(InfoCard, { key: title, title, text, accent })))
      ),
      h(
        Section,
        { dark: true },
        h(TitleBlock, { eyebrow: isZh ? "學生收穫" : "Student Outcomes", title: isZh ? "建立可展示嘅" : "Build an Admissions-Ready", emphasis: isZh ? "學術作品。" : "Academic Portfolio.", lead: isZh ? "最後項目可發展成研究或評論文章，並視學生興趣提交 Scholastic argumentative essay 類別或其他適合嘅高水平比賽，成為高中和大學申請中更有力嘅學術展示。" : "The final project can become a research or review paper and, when appropriate, be adapted for prestigious competitions such as Scholastic argumentative writing or other science and ethics opportunities, giving students a stronger academic piece for selective high school and college applications.", dark: true }),
        h("div", { className: "grid grid-3" }, outcomes.map(([title, text], i) => h(InfoCard, { key: title, title, text, accent: [ORANGE, SKY, "#0d9488"][i], dark: true })))
      ),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "課程大綱" : "Curriculum", title: isZh ? "四個學習" : "Four Course", emphasis: isZh ? "單元。" : "Units.", center: true }),
        h(
          "div",
          { className: "grid grid-2" },
          units.map((unit, i) =>
            h(
              InfoCard,
              { key: unit.title, title: unit.title, accent: [ORANGE, SKY, "#0d9488", "#764ba2"][i] },
              h(
                "ul",
                { style: { marginTop: 14, paddingLeft: 18, color: "rgba(17,29,60,.66)", fontSize: 14, lineHeight: 1.7 } },
                unit.lessons.map((lesson) => h("li", { key: lesson, style: { marginBottom: 8 } }, lesson))
              )
            )
          )
        )
      ),
      h(CTA)
    );
  }

  function OtherProgramsPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "即將推出" : "Coming Soon", title: isZh ? "更多學習路徑" : "More Programs", emphasis: isZh ? "籌備中。" : "In Development.", subtitle: isZh ? "我哋正設計更多公開演說、研究同跨學科課程。" : "We are developing additional public speaking, research, and interdisciplinary programs." }), h(Section, null, h("div", { className: "grid grid-3" }, [h(InfoCard, { key: 1, title: isZh ? "公開演說" : "Public Speaking", text: isZh ? "聲線、節奏、語氣同台風訓練。" : "Voice, pacing, tone, and presence training." }), h(InfoCard, { key: 2, title: isZh ? "研究工作坊" : "Research Workshops", text: isZh ? "搵資料、評估來源、整理證據。" : "Source discovery, evidence evaluation, and card cutting.", accent: SKY }), h(InfoCard, { key: 3, title: isZh ? "跨學科議題" : "Interdisciplinary Issues", text: isZh ? "連結倫理、科學、政策同社會議題。" : "Ethics, science, policy, and society.", accent: "#0d9488" })])), h(CTA));
  }

  function TeamPage() {
    const [members, setMembers] = useState([]);
    const [filter, setFilter] = useState("all");
    useEffect(() => {
      fetch(`${isZh ? "../data/cnteam_members.json" : "../data/team_members.json"}?v=react-pages`)
        .then((r) => r.json())
        .then(setMembers)
        .catch(() =>
          setMembers([
            { name: "Adrian C", role: isZh ? "執行總監" : "Executive Director", image: "Images/Adrian.png", categories: ["executive", "coaching"], bio: isZh ? "DebateCraft 創辦成員之一。" : "One of DebateCraft's student leaders." },
            { name: "Gavin Z", role: isZh ? "執行總監" : "Executive Director", image: "Images/Gavin.png", categories: ["executive", "PF"], bio: isZh ? "負責營運、PF 同中文外展。" : "Leads operations, PF, and Chinese outreach." },
          ])
        );
    }, []);
    const filters = [
      ["all", isZh ? "全部" : "All"],
      ["executive", isZh ? "核心團隊" : "Executive"],
      ["coaching", isZh ? "教練" : "Coaching"],
      ["private", isZh ? "私人教練" : "Private"],
      ["PF", "PF"],
      ["epi", isZh ? "生物倫理" : "Epidemiology"],
    ];
    const visible = filter === "all" ? members : members.filter((m) => (m.categories || []).includes(filter));
    return h(
      React.Fragment,
      null,
      h(PageHeader, { eyebrow: isZh ? "團隊" : "Team", title: isZh ? "我哋嘅學生導師" : "Meet the Team", emphasis: isZh ? "團隊。" : "Behind DebateCraft.", subtitle: isZh ? "由國際辯手、教練、研究者同學生領袖組成。" : "A global team of competitive debaters, coaches, researchers, and student leaders." }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "加入我哋" : "Join Our Team", title: isZh ? "一齊建立免費" : "Help Build Free", emphasis: isZh ? "教育。" : "Education.", lead: isZh ? "如果你熱衷辯論、教學或外展，我哋歡迎你加入。" : "If you care about debate, teaching, or outreach, we are always looking for dedicated instructors.", center: true }),
        h("div", { style: { textAlign: "center" } }, h(Button, { href: "https://form.jotform.com/253297599452473" }, isZh ? "申請加入 →" : "Join Us →"))
      ),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "成員" : "Members", title: isZh ? "認識我哋嘅" : "Meet Our", emphasis: isZh ? "團隊。" : "Team.", center: true }),
        h("div", { className: "filter-row" }, filters.map(([key, label]) => h("button", { key, className: filter === key ? "active" : "", onClick: () => setFilter(key) }, label))),
        h(
          "div",
          { className: "grid grid-3" },
          visible.map((m) =>
            h(
              "article",
              { className: "card", key: `${m.name}-${m.role}`, style: { padding: 0, overflow: "hidden" } },
              h("img", { className: "team-img", src: `../${m.image}`, alt: m.name, onError: (e) => (e.currentTarget.style.display = "none") }),
              h("div", { style: { padding: "22px 20px 26px" } }, h("h3", null, m.name), h("div", { style: { fontSize: 12, fontWeight: 700, color: ORANGE, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 } }, m.role), m.school && h("p", { style: { fontWeight: 700, marginBottom: 10 } }, m.school), h("p", null, m.bio || ""))
            )
          )
        )
      )
    );
  }

  function PartnershipPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "合作" : "Partnership", title: isZh ? "同我哋合作" : "Partner With Us", emphasis: isZh ? "擴大影響。" : "To Expand Access.", subtitle: isZh ? "為學校、非牟利機構同社群設計免費辯論訓練。" : "Bring DebateCraft coaching to your school, nonprofit, or community." }), h(Section, null, h(TitleBlock, { eyebrow: isZh ? "合作模式" : "Who We Partner With", title: isZh ? "為唔同機構度身" : "Built for Schools and", emphasis: isZh ? "設計。" : "Nonprofits.", center: true }), h("div", { className: "grid grid-2" }, h(InfoCard, { title: isZh ? "學校" : "For School Administrators", text: isZh ? "開設辯論隊、公開演說工作坊或比賽訓練，減輕校方師資壓力。" : "Launch clubs, workshops, or tournament training without straining faculty resources." }), h(InfoCard, { title: isZh ? "非牟利機構" : "For Nonprofits and NGOs", text: isZh ? "為缺乏資源嘅學生提供免費、可持續、可量度嘅訓練。" : "Deliver free, sustainable, measurable training to students who lack access.", accent: SKY }))), h(CTA));
  }

  function GetInvolvedPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "參與我哋" : "Get Involved", title: isZh ? "用你嘅聲音" : "Use Your Voice", emphasis: isZh ? "改變更多人。" : "To Help Others.", subtitle: isZh ? "無論你係學生、教練、學校或支持者，都可以參與。" : "Whether you are a student, coach, partner, or supporter, there is a clear way to help." }), h(Section, null, h("div", { className: "grid grid-4" }, [[isZh ? "成為學生" : "Apply as Student", isZh ? "加入免費課程，建立辯論和表達能力。" : "Join a free cohort and build debate skills.", "https://form.jotform.com/261003548067049"], [isZh ? "成為教練" : "Become a Coach", isZh ? "用你嘅經驗支持下一代辯手。" : "Use your experience to support younger debaters.", "https://docs.google.com/forms/d/e/1FAIpQLSfombgLTJ0oDbWfCaSumrnLAjkdvT_K9FW1KJakbr9ZAQxwnQ/viewform?usp=header"], [isZh ? "學校合作" : "Partner With Us", isZh ? "為你嘅學校或機構建立課程。" : "Bring DebateCraft to your school or organization.", "partnership.html"], [isZh ? "捐款支持" : "Donate", isZh ? "支持免費教育資源持續運作。" : "Support free education and operating costs.", "https://buymeacoffee.com/debatecraft"]].map(([title, text, href]) => h(InfoCard, { key: title, title, text }, h("div", { style: { marginTop: 20 } }, h(Button, { href }, isZh ? "前往 →" : "Start →")))))), h(StatsBand, { stats: commonStats }));
  }

  function DonatePage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "支持我哋" : "Support DebateCraft", title: isZh ? "令免費教育" : "Keep DebateCraft", emphasis: isZh ? "持續。" : "Free.", subtitle: isZh ? "捐款用於網站、教材、外展和學生支援。" : "Donations support web hosting, teaching materials, outreach, and student access." }), h(Section, null, h("div", { className: "grid grid-3" }, h(InfoCard, { title: isZh ? "教材" : "Teaching Materials", text: isZh ? "幫助製作講義、練習、題庫和課程資源。" : "Funds handouts, drills, motion banks, and course resources." }), h(InfoCard, { title: isZh ? "平台" : "Platforms", text: isZh ? "支持網站、表格、通訊和線上工具。" : "Supports the website, forms, communications, and online tools.", accent: SKY }), h(InfoCard, { title: isZh ? "外展" : "Outreach", text: isZh ? "幫助更多學校同學生知道免費機會。" : "Helps more schools and students discover free programs.", accent: "#0d9488" })), h("div", { style: { textAlign: "center", marginTop: 42 } }, h(Button, { href: "https://buymeacoffee.com/debatecraft" }, isZh ? "捐款支持 →" : "Donate →"))));
  }

  function ContactPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "聯絡" : "Contact", title: isZh ? "同我哋傾吓" : "Talk to DebateCraft", emphasis: isZh ? "吧。" : "Today.", subtitle: isZh ? "有關課程、合作或媒體查詢，歡迎聯絡我哋。" : "Reach out about programs, partnerships, press, or student support." }), h(Section, null, h("div", { className: "grid grid-3" }, h(InfoCard, { title: "Email", text: "info@debatecraft.org" }, h("div", { style: { marginTop: 18 } }, h(Button, { href: "mailto:info@debatecraft.org", dark: true }, isZh ? "發送電郵" : "Email Us"))), h(InfoCard, { title: "Instagram", text: isZh ? "追蹤課程消息和學生故事。" : "Follow program updates and student stories.", accent: SKY }, h("div", { style: { marginTop: 18 } }, h(Button, { href: "https://www.instagram.com/debate_craft/" }, "Instagram"))), h(InfoCard, { title: "Facebook", text: isZh ? "接收活動、資源和合作更新。" : "See events, resources, and partnership updates.", accent: "#0d9488" }, h("div", { style: { marginTop: 18 } }, h(Button, { href: "https://www.facebook.com/profile.php?id=61577761071956" }, "Facebook"))))));
  }

  const guideResources = [
    { group: "Intro", title: "Actor Analysis", text: "How to identify and analyze the actors inside a debate motion.", href: "https://drive.google.com/file/d/1s3Pxih9tYPR0wxWfwcMtbMbb0baq2v8C/view?usp=drive_link" },
    { group: "Intro", title: "POIs", text: "What Points of Information are and how to use them strategically.", href: "https://drive.google.com/file/d/1t1_pRtyKPTS2FcdXMI_kIOZXaomlFjnm/view?usp=drive_link" },
    { group: "Intro", title: "ESU Introduction to WSDC", text: "A beginner-friendly overview of World Schools format and expectations.", href: "https://drive.google.com/file/d/1c-I9MElNcUhFFxk7wuZs9kh_bJae287w/view?usp=drive_link" },
    { group: "Intro", title: "WSDC Motion Prep", text: "A DebateCraft prep document for using limited preparation time well.", href: "https://drive.google.com/file/d/1bIUDilinW43CM-aeis_wz_jBvgZKC3or/view?usp=drive_link" },
    { group: "Intermediate", title: "Accelerated Introduction to Debate", text: "Framing, mechanization, impacting, and BP fundamentals.", href: "https://docs.google.com/document/d/1dCh-skFd872tflOcMX-SEJP0ZogdVy-n1679vK5HSkY/edit?usp=sharing" },
    { group: "Intermediate", title: "WSDC 2026 Debater Handbook", text: "Format, speeches, judging, and common WSDC terminology.", href: "https://docs.google.com/document/d/10I7HdhOEDC2JtekXl-xQ--5DIlMrxegWXWwlL7z9DIs/edit?tab=t.5q6m8rewq23a" },
    { group: "Intermediate", title: "BP Opening Teams Prep", text: "How opening teams should use prep and build a durable bench.", href: "https://drive.google.com/file/d/1v6DSFjK0cAoFp53lSCuOIqqrJm5ktXDT/view?usp=drive_link" },
    { group: "Intermediate", title: "BP Closing Teams Prep", text: "How closing teams build extensions and distinguish their contribution.", href: "https://drive.google.com/file/d/10yxAV9gZMj0BEGYdt-1nCK4E3cC1OMaY/view?usp=drive_link" },
    { group: "Advanced", title: "Winning Debates", text: "Steven L. Johnson's guide to strategy, mechanization, and impact work.", href: "https://drive.google.com/file/d/1OsQDt1PaoY6hrrJD_DQX904cRXse8g54/view?usp=drive_link" },
    { group: "Advanced", title: "Ryan Lafferty Workshop Resources", text: "Advanced workshop notes and curated practice material.", href: "https://docs.google.com/document/d/1yZnTmzlvEZW61lgA5RWzdaM3Yb9_KsWWy0vjNuyl1Dc/edit?tab=t.0" },
  ];

  const videoResources = [
    { id: "burdens", group: "Lecture", title: "Burdens of Proof", text: "Katharina Margareta Jansen on how burdens work.", embed: "https://www.youtube.com/embed/gihbX8zt8kM?si=gQaOlyt-As2VXWKX" },
    { id: "manchester-1", group: "Workshop", title: "Manchester Debating Union Workshop I", text: "Workshop material for debaters building argument depth.", embed: "https://www.youtube.com/embed/Xd_8jrid_mk?si=TpgUizL63HMH8_7l" },
    { id: "manchester-2", group: "Workshop", title: "Manchester Debating Union Workshop II", text: "More practice on competitive debating fundamentals.", embed: "https://www.youtube.com/embed/hN55gM0f4dw?si=EIAZQbN8lHoqTkWW" },
    { id: "manchester-3", group: "Workshop", title: "Manchester Debating Union Workshop III", text: "Applied debating strategy and speech construction.", embed: "https://www.youtube.com/embed/t2-RrvOtf0M?si=wKU_BnfgpjztS03V" },
    { id: "uchicago-1", group: "BP", title: "UChicago BP Workshop I", text: "British Parliamentary training for competitive debaters.", embed: "https://www.youtube.com/embed/zJz94XG9kkc?si=Ei-xtz1hlxYwI2p7" },
    { id: "uchicago-2", group: "BP", title: "UChicago BP Workshop II", text: "BP strategy, matter, and extension development.", embed: "https://www.youtube.com/embed/EpLqPTdHy80?si=u3h6hBKfe1W5UTdp" },
    { id: "uchicago-3", group: "BP", title: "UChicago BP Workshop III", text: "Advanced BP ideas for stronger rooms.", embed: "https://www.youtube.com/embed/-oicMC4_ylE?si=Nn5j0ukpmGBA42kq" },
    { id: "sundo", group: "Workshop", title: "SUNDO Workshop", text: "A selected workshop for practice and review.", embed: "https://www.youtube.com/embed/5RSVnsywbfA?si=Hcdv5Ceviw57NNwO" },
    { id: "wsdc-2025", group: "Rounds", title: "WSDC 2025 Grand Final", text: "India vs Australia, with transcript.", embed: "https://www.youtube.com/embed/_kjeQW-RNyw?si=33RNaAEGOqvl_BbN&start=420", transcript: "https://debating404.com/full-debate-panama-wsdc-2025-grand-final-india-vs-australia-th-prefers-a-world-with-a-strong-belief-in-seriti/" },
    { id: "wsdc-2024", group: "Rounds", title: "WSDC 2024 Grand Final", text: "Scotland vs Bulgaria, with transcript.", embed: "https://www.youtube.com/embed/1xohrV5pheM?si=OLexTKI1jW9tc2Ft&start=218", transcript: "https://debating404.com/serbia-wsdc-2024-grand-final-scotland-vs-bulgaria/" },
    { id: "wsdc-2017", group: "Rounds", title: "WSDC 2017 Grand Final", text: "England vs Singapore, with transcript.", embed: "https://www.youtube.com/embed/4HUFM3JZaLQ?si=a15LLPLnlL08gwD8&start=351", transcript: "https://debating404.com/full-indonesia-wsdc-2017-grand-final-england-vs-singapore/" },
  ];

  const frameworkLessons = [
    {
      id: "motion-types",
      title: "Understanding Motion Types",
      lead: "Learn how motion wording changes your burden.",
      sections: [
        ["This House Would", "A policy motion asks Proposition to defend a specific action or model. The debate is about whether the action is desirable, practical, and comparatively better than the status quo.", "Example: This House Would ban single-use plastics."],
        ["This House Believes That", "A value motion asks you to defend a principle, truth claim, or moral judgment. You do not need a detailed implementation model, but you do need a clear standard for judgment.", "Example: This House Believes That professional athletes are overpaid."],
        ["This House Regrets", "A regret motion compares the real world with a counterfactual world where a past trend or decision did not happen. The burden is comparative.", "Example: This House Regrets the rise of social media."],
      ],
      exercise: [
        { prompt: "This House Would provide a universal basic income.", answer: "Policy motion. Prop must propose a plausible funding and distribution model, then prove the benefits outweigh costs and harms." },
        { prompt: "This House Believes That nationalism is a force for good.", answer: "Value judgment. Prop must prove the positive aspects of nationalism outweigh harms like exclusion, conflict, or xenophobia." },
        { prompt: "This House Regrets the commercialization of space.", answer: "Regret motion. Prop compares our current world with a counterfactual world where space exploration stayed mostly public." },
      ],
    },
    {
      id: "wsdc-roles",
      title: "WSDC Speaker Roles",
      lead: "Know what each speech must accomplish in World Schools.",
      sections: [
        ["First Speakers", "Define the motion, set up the debate, establish the model if needed, and present the first constructive arguments.", "First Opposition should also clearly state the opposition stance and answer the setup."],
        ["Second Speakers", "Rebuild the team's case, respond to major attacks, and add new constructive material that advances the bench.", "A strong second speech makes the case feel deeper, not merely repeated."],
        ["Third Speakers and Replies", "Third speakers should organize rebuttal around the central clashes. Reply speeches compare the debate from above and explain why your side won the most important questions.", "Reply speeches should be persuasive summaries, not new arguments."],
      ],
      exercise: [
        { prompt: "You are second proposition and your first speaker was heavily attacked. What are your first two jobs?", answer: "Rebuild the damaged setup or argument, then extend the case with new material that still fits the team's framing." },
      ],
    },
    {
      id: "cpr",
      title: "CPR Framework",
      lead: "Context, Problem, Resolution: a quick way to deconstruct motions.",
      sections: [
        ["Context", "Explain the world of the debate. Define important terms, identify the status quo, and give judges enough background to understand why the motion exists.", "Motion: This House would ban private, for-profit prisons."],
        ["Problem", "Show what is wrong with the status quo. For private prisons, the central problem is a profit incentive that rewards higher inmate numbers and lower operating costs.", "This creates risks around lobbying, poor conditions, and underinvestment in rehabilitation."],
        ["Resolution", "State how your side solves or improves the problem. The model might phase out private contracts and return facilities to public control.", "The resolution should connect directly to the problem you identified."],
      ],
      exercise: [
        { prompt: "Build CPR for: This House supports a Right to be Forgotten from the internet.", answer: "Context: online records are permanent and searchable. Problem: outdated or harmful information can block work, safety, and reintegration. Resolution: create a narrow process for eligible removal requests with public-interest exceptions." },
      ],
    },
    {
      id: "peel",
      title: "PEEL Structure",
      lead: "Point, Explain, Example, Link: a reliable structure for full arguments.",
      sections: [
        ["Point", "Make one clear claim in a sentence. Avoid vague labels like 'this is bad' unless you specify why.", "Example: Social media helps social movements organize faster and at lower cost."],
        ["Explain", "Describe the mechanism. How does the claim happen in the real world?", "Speed, scale, and low barriers let organizers coordinate protests, fundraising, and information sharing."],
        ["Example and Link", "Use a concrete example, then link back to why it matters in the debate.", "The link tells the judge why this argument defeats or outweighs the other side."],
      ],
      exercise: [
        { prompt: "Turn this idea into PEEL: social media helps movements organize.", answer: "Point: Social media empowers grassroots movements. Explain: it reduces coordination costs and reaches supporters quickly. Example: movements can publish evidence, organize protests, and fundraise online. Link: this proves social media can create political voice, not only harm." },
      ],
    },
    {
      id: "stakeholders",
      title: "Stakeholder Analysis",
      lead: "Arguments get stronger when you identify who is affected and why.",
      sections: [
        ["Affected Groups", "List direct groups, powerful institutions, and vulnerable groups. Debate is rarely about abstract policy alone.", "For fossil fuel advertising, stakeholders include fossil fuel companies, governments, consumers, and future generations."],
        ["MICE Incentives", "Money, Ideology, Coercion, and Ego help explain why actors behave the way they do.", "This prevents arguments from assuming everyone will simply act morally or rationally."],
      ],
      exercise: [
        { prompt: "Analyze stakeholders for: This House would replace most human customer service agents with advanced AI.", answer: "Workers lose employment and bargaining power; companies gain efficiency; consumers may gain speed but lose empathy; elderly or less tech-savvy users may be excluded." },
      ],
    },
    {
      id: "nile",
      title: "NILE Framework",
      lead: "Need, Importance, Likelihood, Effect: a tool for generating complete impacts.",
      sections: [
        ["Need", "What urgent problem requires action? Show why the current situation is not acceptable.", "For development vs environment, immediate poverty can be framed as a life-threatening need."],
        ["Importance and Likelihood", "Explain why the impact matters and why it is likely to happen under your mechanism.", "Judges need both moral weight and a believable pathway."],
        ["Effect", "Describe the practical change in behavior, institutions, or incentives.", "Good effects are concrete enough to compare against the other side."],
      ],
      exercise: [
        { prompt: "Use NILE for: This House would replace most human customer service agents with advanced AI.", answer: "Need: current service is slow and costly. Importance: access affects millions of consumers. Likelihood: firms already have incentives to automate. Effect: faster service, lower costs, but also worker displacement that must be weighed." },
      ],
    },
    {
      id: "rebuttals",
      title: "Rebuttals",
      lead: "Answer arguments directly, then rebuild your side.",
      sections: [
        ["They Said", "Represent the other side fairly and concisely. This shows the judge you are answering the real argument.", "Do not strawman a weak version."],
        ["But and Because", "State your core disagreement, then explain the mechanism or evidence that makes you right.", "The best rebuttals attack assumptions, links, impact size, or comparative importance."],
        ["Therefore", "Tell the judge what happens to the argument after your response.", "Does it collapse, shrink, become unlikely, or get outweighed?"],
      ],
      exercise: [
        { prompt: "They say free speech should include hate speech because all speech deserves protection. Build a four-step rebuttal.", answer: "They said all speech deserves protection. But rights have limits when they silence or endanger others. Because hate speech can intimidate targeted groups out of public participation. Therefore their free-speech principle can reduce speech overall." },
      ],
    },
    {
      id: "pois",
      title: "Points of Information",
      lead: "Use short interruptions to test and expose arguments.",
      sections: [
        ["Rules", "In WSDC, POIs are usually offered after the first minute and before the last minute of an eight-minute speech. The speaker can accept or decline.", "Offer several, accept one or two."],
        ["Types", "Attacking POIs challenge logic. Clarification POIs force detail. Expansion POIs test whether their principle goes too far.", "A ticking-time-bomb POI sets up an argument you will make later."],
      ],
      exercise: [
        { prompt: "Craft a POI against: university should be free because tuition blocks social mobility.", answer: "If social mobility is the goal, why subsidize wealthy students who would attend university anyway instead of targeting support to low-income students?" },
      ],
    },
    {
      id: "clashes",
      title: "Clashes and Weighing",
      lead: "Identify the core disagreement and compare impacts.",
      sections: [
        ["Clash", "A clash is the central question both teams are fighting over, not just a list of arguments.", "For UBI, a clash might be dignity and poverty relief versus fiscal cost."],
        ["Weighing", "Compare using scale, severity, probability, timeframe, reversibility, and vulnerability.", "Good weighing explains why your impact should matter more to the judge."],
      ],
      exercise: [
        { prompt: "Weigh Prop's UBI poverty relief against Opp's tax burden.", answer: "Prop can weigh severity and vulnerability: poverty affects basic health and dignity for the least secure people, while tax costs are more diffuse and can be progressively designed." },
      ],
    },
  ];

  const motionBank = [
    { motion: "THW ban zoos.", difficulty: "Easy" },
    { motion: "THBT all students should be required to learn a musical instrument.", difficulty: "Easy" },
    { motion: "THW ban homework for primary school students.", difficulty: "Easy" },
    { motion: "THBT professional athletes are overpaid.", difficulty: "Easy" },
    { motion: "THW make school uniforms compulsory in all schools.", difficulty: "Easy" },
    { motion: "THW ban advertisements for junk food targeted at children.", difficulty: "Easy" },
    { motion: "THBT voting in national elections should be compulsory.", difficulty: "Easy" },
    { motion: "THBT social media has done more harm than good for society.", difficulty: "Easy" },
    { motion: "THW implement a universal basic income.", difficulty: "Medium" },
    { motion: "THW abolish private schools.", difficulty: "Medium" },
    { motion: "THW ban for-profit prisons.", difficulty: "Medium" },
    { motion: "THW allow and regulate the sale of human organs.", difficulty: "Medium" },
    { motion: "THR the rise of cancel culture.", difficulty: "Medium" },
    { motion: "THBT developed countries should have open borders.", difficulty: "Medium" },
    { motion: "THW replace trial by jury with trial by professional judges.", difficulty: "Hard" },
    { motion: "THR the principle of absolute state sovereignty.", difficulty: "Hard" },
    { motion: "THW allow parents to genetically enhance their unborn children.", difficulty: "Hard" },
    { motion: "THBT nationalism is, on balance, destructive.", difficulty: "Hard" },
    { motion: "THW ban lethal autonomous weapons.", difficulty: "Hard" },
    { motion: "THBT conscientious objection should not justify doctors refusing legal procedures.", difficulty: "Hard" },
  ];

  const deliverySpectrums = {
    volume: { label: "Volume", levels: ["Very Soft", "Soft", "Conversational", "Loud", "Yelling"], why: "Appropriate volume ensures you are heard and respected. It conveys confidence and matches the room." },
    tone: { label: "Tone", levels: ["Monotone", "Flat", "Expressive", "Emphatic", "Dramatic"], why: "Tone conveys emotion and intent. A mismatched tone can confuse your audience, while a rich tone builds connection." },
    pace: { label: "Pace & Pauses", levels: ["Rushed", "Deliberate", "Moderate", "Strategic", "Masterful"], why: "Pacing controls the flow of information. Strategic pauses give important ideas more weight." },
    articulation: { label: "Articulation", levels: ["Mumbled", "Poor", "Adequate", "Clear", "Pristine"], why: "If your audience cannot understand your words, your message is lost. Crisp articulation builds credibility." },
    emphasis: { label: "Emphasis", levels: ["Monotonous", "Weak", "Moderate", "Strong", "Exaggerated"], why: "Emphasis guides interpretation. Stressing a different word can change the meaning of a sentence." },
    certainty: { label: "Certainty", levels: ["Very Uncertain", "Uncertain", "Neutral", "Certain", "Very Certain"], why: "A confident delivery makes arguments sound more credible, but overconfidence can feel unsupported." },
    gestures: { label: "Gestures", levels: ["Stiff", "Subtle", "Expressive", "Animated", "Distracting"], why: "Purposeful gestures illustrate ideas and make you more dynamic. Random movement distracts." },
    eyeContact: { label: "Eye Contact", levels: ["Avoidant", "Glancing", "Conversational", "Sustained", "Intense"], why: "Eye contact builds trust and tells the audience you are present with them." },
  };

  const deliveryAnalysis = {
    volume: [
      { s: [], w: ["Very soft volume makes you hard to hear."], ex: "Whispering a secret to pull a small audience in." },
      { s: [], w: ["Soft volume can create intimacy, but risks being missed."], ex: "Sharing a personal story in a quiet room." },
      { s: ["Conversational volume works well for most classrooms."], w: [], ex: "Presenting to a seminar table." },
      { s: ["A projected voice helps in larger rooms."], w: [], ex: "Speaking in an auditorium without a microphone." },
      { s: [], w: ["Yelling can feel aggressive if overused."], ex: "An actor portraying anger on stage." },
    ],
    tone: [
      { s: [], w: ["Monotone delivery can lose attention quickly."], ex: "Reading a legal document without inflection." },
      { s: [], w: ["Flat tone may seem disengaged."], ex: "Delivering a routine announcement." },
      { s: ["Expressive tone keeps listeners engaged."], w: [], ex: "Telling an exciting story with varied pitch." },
      { s: ["Emphatic tone is useful for persuasion."], w: [], ex: "Arguing passionately for a policy." },
      { s: [], w: ["Highly dramatic tone can feel insincere."], ex: "Creating a theatrical atmosphere." },
    ],
    pace: [
      { s: [], w: ["Rushed pace is hard to follow."], ex: "Trying to finish a speech too quickly." },
      { s: [], w: ["A slow pace adds weight but can drag."], ex: "Reading a solemn verdict." },
      { s: ["Moderate pace is easy to follow."], w: [], ex: "Explaining a new concept clearly." },
      { s: ["Strategic pauses make key lines land."], w: [], ex: "Pausing before revealing the main impact." },
      { s: ["Masterful pacing can be captivating."], w: [], ex: "Holding silence before a final line." },
    ],
    articulation: [
      { s: [], w: ["Mumbled speech can become impossible to understand."], ex: "Speaking without opening your mouth clearly." },
      { s: [], w: ["Poor articulation weakens credibility."], ex: "Speaking fast without finishing consonants." },
      { s: ["Adequate articulation works for casual settings."], w: [], ex: "Speaking with friends in a relaxed setting." },
      { s: ["Clear articulation boosts credibility."], w: [], ex: "A newsreader delivering a broadcast." },
      { s: ["Pristine articulation sounds polished."], w: [], ex: "A trained actor performing formal text." },
    ],
    emphasis: [
      { s: [], w: ["Monotonous emphasis makes important ideas blend together."], ex: "Reciting a list with no variation." },
      { s: [], w: ["Weak emphasis can hide your central argument."], ex: "Giving every sentence the same weight." },
      { s: ["Moderate emphasis guides listeners naturally."], w: [], ex: "Marking key words in a story." },
      { s: ["Strong emphasis is powerful for persuasion."], w: [], ex: "Stressing words like justice or urgency." },
      { s: [], w: ["Exaggerated emphasis can sound unnatural."], ex: "An over-the-top cartoon voice." },
    ],
    certainty: [
      { s: [], w: ["High uncertainty undermines your message."], ex: "Starting every point with maybe or I guess." },
      { s: [], w: ["Uncertain delivery reduces persuasive force."], ex: "Hedging on your main argument." },
      { s: ["Neutral certainty suits objective reporting."], w: [], ex: "Presenting data without overclaiming." },
      { s: ["Clear certainty makes you more persuasive."], w: [], ex: "An expert stating a conclusion." },
      { s: [], w: ["Absolute certainty can seem arrogant if unsupported."], ex: "Giving an order that allows no doubt." },
    ],
    gestures: [
      { s: [], w: ["Stiff posture can look nervous."], ex: "Clutching a lectern for the whole speech." },
      { s: ["Subtle gestures add naturalness."], w: [], ex: "Counting points on your fingers." },
      { s: ["Expressive gestures clarify ideas."], w: [], ex: "Spreading hands to show scale." },
      { s: ["Animated gestures show passion."], w: [], ex: "Filling the stage in a motivational speech." },
      { s: [], w: ["Distracting gestures pull focus from words."], ex: "Fidgeting with a pen throughout." },
    ],
    eyeContact: [
      { s: [], w: ["Avoiding eye contact can look untrustworthy."], ex: "Reading entirely from notes." },
      { s: [], w: ["Fleeting glances are better than none but weak."], ex: "Looking up only at sentence ends." },
      { s: ["Conversational eye contact builds rapport."], w: [], ex: "Moving gaze around the room naturally." },
      { s: ["Sustained eye contact looks confident."], w: [], ex: "Holding one person for a complete thought." },
      { s: [], w: ["Intense staring can make people uncomfortable."], ex: "Locking eyes for too long." },
    ],
  };

  const deliveryArchetypes = {
    "Polished TED Speaker": { volume: 3, tone: 3, pace: 4, articulation: 4, emphasis: 3, certainty: 4, gestures: 3, eyeContact: 4 },
    "Classic Politician": { volume: 4, tone: 4, pace: 4, articulation: 4, emphasis: 4, certainty: 5, gestures: 4, eyeContact: 4 },
    "Boring Professor": { volume: 3, tone: 1, pace: 2, articulation: 4, emphasis: 1, certainty: 4, gestures: 1, eyeContact: 2 },
    "Stand-up Comedian": { volume: 4, tone: 5, pace: 4, articulation: 4, emphasis: 4, certainty: 3, gestures: 4, eyeContact: 4 },
    "Machine Gun": { volume: 3, tone: 2, pace: 1, articulation: 2, emphasis: 2, certainty: 4, gestures: 2, eyeContact: 2 },
    "Angry Philosopher": { volume: 5, tone: 4, pace: 4, articulation: 4, emphasis: 5, certainty: 5, gestures: 4, eyeContact: 5 },
    "Mumbling Student": { volume: 1, tone: 1, pace: 3, articulation: 1, emphasis: 1, certainty: 2, gestures: 1, eyeContact: 1 },
  };

  const emphasisWords = [
    ["I", "It is me, specifically, who feels this way, not someone else."],
    ["love", "This is a deep, heartfelt feeling, not just casual liking."],
    ["your", "It is your mother's cooking, not your cousin's or anyone else's."],
    ["mother's", "The affection is directed at this specific family member."],
    ["cooking", "The praise is for this specific skill, not every quality she has."],
  ];

  const mitigationDifficulties = {
    RECRUIT: { time: 30, label: "Recruit", text: "More time, familiar topics." },
    VETERAN: { time: 18, label: "Veteran", text: "Faster rounds, sharper links." },
    LEGEND: { time: 10, label: "Legend", text: "High pressure, abstract arguments." },
  };

  const mitigationGameData = {
    RECRUIT: [
      { t: "Banning homework improves student mental health.", o: [{ type: "TURN", text: "Homework reinforces inequality because rich parents can help while poor parents often cannot." }, { type: "MITIGATE", text: "Most teachers barely grade it, so the stress impact is smaller than the claim suggests." }, { type: "TRAP", text: "Homework is boring and nobody likes it." }] },
      { t: "Schools should ban junk food to stop obesity.", o: [{ type: "TURN", text: "A ban can make students binge outside school because the food becomes forbidden." }, { type: "MITIGATE", text: "Students eat only part of their daily diet at school, so the effect is limited." }, { type: "TRAP", text: "Vegetables taste bad." }] },
      { t: "Social media makes teenagers insecure.", o: [{ type: "TURN", text: "For isolated teenagers, online spaces can provide community they lack offline." }, { type: "MITIGATE", text: "Teen insecurity existed long before social media; the platform is only one factor." }, { type: "TRAP", text: "Phones are too expensive." }] },
      { t: "Zoos are cruel prisons for animals.", o: [{ type: "TURN", text: "Well-run zoos fund conservation that protects animals from extinction in the wild." }, { type: "MITIGATE", text: "Many captive animals live longer and avoid predators." }, { type: "TRAP", text: "Tickets are too expensive." }] },
      { t: "Voting should be mandatory.", o: [{ type: "TURN", text: "Forced turnout can create random voting by people with no interest or information." }, { type: "MITIGATE", text: "People can spoil ballots, so they are not forced to choose a side." }, { type: "TRAP", text: "I do not like politics." }] },
    ],
    VETERAN: [
      { t: "The death penalty deters crime.", o: [{ type: "TURN", text: "State killing can legitimize violence and create a brutalization effect." }, { type: "MITIGATE", text: "Criminals rarely expect to get caught, so severity does little to change behavior." }, { type: "TRAP", text: "It is mean to kill people." }] },
      { t: "AI will destroy human employment.", o: [{ type: "TURN", text: "AI can lower the cost of goods, raising real wages and creating demand elsewhere." }, { type: "MITIGATE", text: "It mostly automates repetitive tasks; human judgment remains legally and socially required." }, { type: "TRAP", text: "Robots are scary." }] },
      { t: "Free speech should include hate speech.", o: [{ type: "TURN", text: "Hate speech can silence minorities, reducing the total speech available in society." }, { type: "MITIGATE", text: "Even if legal, social taboo and platform rules reduce how common it is." }, { type: "TRAP", text: "Words cannot hurt you." }] },
      { t: "Universities should be free for everyone.", o: [{ type: "TURN", text: "Universal free tuition can subsidize richer students at the expense of poorer taxpayers." }, { type: "MITIGATE", text: "Degrees are losing value, so some students will still choose trade routes." }, { type: "TRAP", text: "Students party too much." }] },
      { t: "Nuclear energy is unsafe.", o: [{ type: "TURN", text: "Fossil fuels kill far more people through air pollution; nuclear can save lives." }, { type: "MITIGATE", text: "New reactor designs reduce meltdown risk significantly." }, { type: "TRAP", text: "Cartoons show nuclear waste glowing green." }] },
    ],
    LEGEND: [
      { t: "Sanctions on dictatorships work.", o: [{ type: "TURN", text: "Sanctions can make citizens more dependent on the dictator for scarce goods." }, { type: "MITIGATE", text: "Dictators often shield themselves with offshore assets and patronage networks." }, { type: "TRAP", text: "Dictators are bad people." }] },
      { t: "Globalization helps the poor.", o: [{ type: "TURN", text: "It can trigger a race to the bottom where states cut labor rights to attract firms." }, { type: "MITIGATE", text: "Protectionist politics are already reversing parts of globalization." }, { type: "TRAP", text: "Fast food chains are everywhere." }] },
      { t: "Invading to stop human rights abuses is just.", o: [{ type: "TURN", text: "Invasion can destabilize a region and create even more abuses." }, { type: "MITIGATE", text: "International institutions usually block or slow interventions." }, { type: "TRAP", text: "War costs money." }] },
      { t: "Private healthcare is more efficient.", o: [{ type: "TURN", text: "Profit incentives can reward treating symptoms repeatedly rather than curing causes." }, { type: "MITIGATE", text: "Emergency care is often treated regardless of payment." }, { type: "TRAP", text: "Doctors are smart." }] },
      { t: "Patents promote innovation.", o: [{ type: "TURN", text: "Patent trolls can buy ideas mainly to sue, blocking new products." }, { type: "MITIGATE", text: "Many important software tools are open-source anyway." }, { type: "TRAP", text: "Inventors need money." }] },
    ],
  };

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function ResourceHubPage({ initialTool = "guides" }) {
    const [activeTool, setActiveTool] = useState(initialTool);
    useEffect(() => setActiveTool(initialTool), [initialTool]);
    const tools = [
      ["guides", isZh ? "指南庫" : "Guides", "PDF"],
      ["learn", isZh ? "框架練習" : "Frameworks", "Drills"],
      ["manner", isZh ? "演說實驗室" : "Manner", "Lab"],
      ["mitigation", isZh ? "Even If" : "Even If", "Game"],
    ];
    const renderTool = () => {
      if (activeTool === "learn") return h(FrameworkLibrary);
      if (activeTool === "manner") return h(MannerLab);
      if (activeTool === "mitigation") return h(MitigationTrainer);
      return h(GuideLibrary);
    };
    return h(
      React.Fragment,
      null,
      h(PageHeader, {
        eyebrow: isZh ? "資源" : "Resources",
        title: isZh ? "辯論工具庫" : "Debate Resource Library",
        emphasis: isZh ? "練習。" : "For Practice.",
        subtitle: isZh ? "指南、影片、框架練習、表達方式訓練同 Even If 反駁遊戲，集中喺同一個 React 工具庫。" : "Guides, videos, framework drills, delivery practice, and the Even If mitigation game in one React resource hub.",
      }),
      h(
        Section,
        null,
        h(
          "div",
          { className: "resource-layout" },
          h("aside", { className: "resource-sidebar", "aria-label": "Resource sections" }, tools.map(([id, label, meta]) => h("button", { key: id, className: `resource-tab${activeTool === id ? " active" : ""}`, onClick: () => setActiveTool(id) }, label, h("span", null, meta)))),
          h("div", { className: "resource-panel" }, renderTool())
        )
      )
    );
  }

  function GuideLibrary() {
    const [mode, setMode] = useState("guides");
    const [query, setQuery] = useState("");
    const [activeVideo, setActiveVideo] = useState(videoResources[0].id);
    const q = query.trim().toLowerCase();
    const visibleGuides = guideResources.filter((item) => !q || `${item.group} ${item.title} ${item.text}`.toLowerCase().includes(q));
    const visibleVideos = videoResources.filter((item) => !q || `${item.group} ${item.title} ${item.text}`.toLowerCase().includes(q));
    const currentVideo = videoResources.find((item) => item.id === activeVideo) || visibleVideos[0] || videoResources[0];
    useEffect(() => {
      if (visibleVideos.length && !visibleVideos.some((item) => item.id === activeVideo)) setActiveVideo(visibleVideos[0].id);
    }, [query]);
    return h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "指南同影片庫" : "Guides and Video Library"), h("p", null, isZh ? "搜尋 DebateCraft 教練整理嘅 PDF、文件、工作坊影片同經典賽事。" : "Search DebateCraft PDFs, documents, workshop videos, and classic rounds curated for practice.")), h("div", { className: "segmented" }, [["guides", "Guides"], ["videos", "Videos"]].map(([id, label]) => h("button", { key: id, className: mode === id ? "active" : "", onClick: () => setMode(id) }, label)))),
      h("input", { className: "search-input", value: query, onChange: (e) => setQuery(e.target.value), placeholder: isZh ? "搜尋指南或影片..." : "Search guides or videos..." }),
      mode === "guides"
        ? h("div", { className: "resource-card-grid", style: { marginTop: 22 } }, visibleGuides.map((item, i) => h("article", { key: item.title, className: "compact-card", style: { "--accent": [ORANGE, SKY, "#0d9488", "#764ba2"][i % 4] } }, h("div", { className: "compact-meta" }, item.group), h("h3", null, item.title), h("p", null, item.text), h("div", { style: { marginTop: 18 } }, h(Button, { href: item.href }, isZh ? "打開資源" : "Open Resource")))))
        : h("div", { className: "video-shell", style: { marginTop: 22 } }, h("div", null, h("div", { className: "video-frame" }, h("iframe", { src: currentVideo.embed, title: currentVideo.title, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true })), h("div", { className: "compact-card", style: { marginTop: 16, "--accent": SKY } }, h("div", { className: "compact-meta" }, currentVideo.group), h("h3", null, currentVideo.title), h("p", null, currentVideo.text), currentVideo.transcript && h("div", { style: { marginTop: 18 } }, h(Button, { href: currentVideo.transcript }, isZh ? "睇逐字稿" : "Read Transcript")))), h("div", { className: "grid", style: { gap: 10 } }, visibleVideos.map((item) => h("button", { key: item.id, className: `option-card${activeVideo === item.id ? " selected" : ""}`, onClick: () => setActiveVideo(item.id), style: { color: NAVY, background: activeVideo === item.id ? "rgba(247,162,52,.16)" : WHITE, borderColor: activeVideo === item.id ? ORANGE : "rgba(17,29,60,.1)" } }, h("strong", null, item.title), h("div", { style: { fontSize: 12, color: "rgba(17,29,60,.55)", marginTop: 4 } }, item.group)))))
    );
  }

  function FrameworkLibrary() {
    const [activeLesson, setActiveLesson] = useState(frameworkLessons[0].id);
    const [openAnswer, setOpenAnswer] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [generated, setGenerated] = useState("Click Generate Motion to get a practice topic.");
    const lesson = frameworkLessons.find((item) => item.id === activeLesson) || frameworkLessons[0];
    const generateMotion = () => {
      const pool = motionBank.filter((item) => difficulty === "All" || item.difficulty === difficulty);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setGenerated(pick ? pick.motion : "No motions match that filter.");
    };
    return h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "互動框架練習" : "Interactive Framework Drills"), h("p", null, isZh ? "由 motion type 到 POI、rebuttal、clash 同 weighing，將舊資源頁嘅練習整理成 React 互動頁。" : "Motion types, roles, CPR, PEEL, POIs, rebuttal, clashes, and weighing rebuilt as React practice tools."))),
      h(
        "div",
        { className: "lesson-shell" },
        h("nav", { className: "lesson-nav", "aria-label": "Framework lessons" }, frameworkLessons.map((item) => h("button", { key: item.id, className: activeLesson === item.id ? "active" : "", onClick: () => { setActiveLesson(item.id); setOpenAnswer(""); } }, item.title))),
        h(
          "div",
          null,
          h("article", { className: "lesson-box" }, h("div", { className: "compact-meta" }, "Lesson"), h("h3", null, lesson.title), h("p", null, lesson.lead), lesson.sections.map(([heading, body, example]) => h("section", { key: heading }, h("h4", null, heading), h("p", null, body), example && h("div", { className: "example-strip" }, example))), h("h4", null, "Practice"), lesson.exercise.map((item, i) => {
            const id = `${lesson.id}-${i}`;
            return h("div", { key: id, style: { marginTop: 16 } }, h("p", { style: { fontWeight: 800, color: NAVY } }, item.prompt), h("textarea", { className: "practice-area", placeholder: "Write your answer here..." }), h("div", { style: { marginTop: 10 } }, h("button", { className: "mini-btn", onClick: () => setOpenAnswer(openAnswer === id ? "" : id) }, openAnswer === id ? "Hide Answer" : "Show Answer")), openAnswer === id && h("div", { className: "answer-box" }, item.answer));
          })),
          h("article", { className: "lesson-box", style: { marginTop: 20, borderTopColor: ORANGE } }, h("div", { className: "compact-meta" }, "Motion Generator"), h("h3", null, "Generate a Practice Motion"), h("div", { className: "grid grid-2", style: { margin: "16px 0" } }, h("select", { className: "select-input", value: difficulty, onChange: (e) => setDifficulty(e.target.value) }, ["All", "Easy", "Medium", "Hard"].map((item) => h("option", { key: item, value: item }, item))), h("button", { className: "btn", onClick: generateMotion }, "Generate Motion")), h("div", { className: "motion-display" }, generated))
        )
      )
    );
  }

  function MannerLab() {
    const keys = Object.keys(deliverySpectrums);
    const [activeSpectrum, setActiveSpectrum] = useState("volume");
    const [values, setValues] = useState(() => keys.reduce((acc, key) => ({ ...acc, [key]: 3 }), {}));
    const [activeWord, setActiveWord] = useState("I");
    const spectrum = deliverySpectrums[activeSpectrum];
    const currentValue = values[activeSpectrum];
    const currentAnalysis = deliveryAnalysis[activeSpectrum][currentValue - 1];
    const profile = useMemo(() => {
      const strengths = [];
      const weaknesses = [];
      keys.forEach((key) => {
        const item = deliveryAnalysis[key][values[key] - 1];
        strengths.push(...item.s);
        weaknesses.push(...item.w);
      });
      return { strengths: strengths.slice(0, 6), weaknesses: weaknesses.slice(0, 6) };
    }, [values]);
    const updateValue = (key, value) => setValues((prev) => ({ ...prev, [key]: Number(value) }));
    return h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "Manner Matters 演說實驗室" : "Manner Matters Speaking Lab"), h("p", null, isZh ? "練習聲量、語氣、節奏、咬字、重音、自信、手勢同眼神接觸。" : "Practice volume, tone, pace, articulation, emphasis, certainty, gestures, and eye contact."))),
      h("div", { className: "grid grid-2" }, h("article", { className: "lesson-box", style: { borderTopColor: ORANGE } }, h("div", { className: "compact-meta" }, "Emphasis"), h("h3", null, "The Power of Emphasis"), h("p", null, "Click each word to see how emphasis changes the sentence."), h("div", { className: "emphasis-sentence" }, emphasisWords.map(([word]) => h("button", { key: word, className: `emphasis-word${activeWord === word ? " active" : ""}`, onClick: () => setActiveWord(word) }, word)), h("span", null, ".")), h("div", { className: "answer-box" }, emphasisWords.find(([word]) => word === activeWord)?.[1])), h("article", { className: "lesson-box", style: { borderTopColor: SKY } }, h("div", { className: "compact-meta" }, "Spectrum"), h("h3", null, spectrum.label), h("p", null, spectrum.why), h("div", { className: "range-row" }, h("input", { className: "slider", type: "range", min: 1, max: 5, value: currentValue, onChange: (e) => updateValue(activeSpectrum, e.target.value) }), h("div", { className: "range-label" }, spectrum.levels[currentValue - 1])), h("div", { className: "analysis-list" }, h("div", { className: "analysis-item", style: { "--accent": ORANGE } }, `Example: ${currentAnalysis.ex}`), currentAnalysis.s.map((text) => h("div", { key: text, className: "analysis-item", style: { "--accent": "#0d9488" } }, text)), currentAnalysis.w.map((text) => h("div", { key: text, className: "analysis-item", style: { "--accent": "#dc2626" } }, text))))),
      h("div", { className: "grid grid-2", style: { marginTop: 20 } }, h("article", { className: "lesson-box" }, h("div", { className: "compact-meta" }, "Choose a Spectrum"), h("div", { className: "spectrum-buttons" }, keys.map((key) => h("button", { key, className: activeSpectrum === key ? "active" : "", onClick: () => setActiveSpectrum(key) }, deliverySpectrums[key].label))), h("h4", null, "Archetype Explorer"), h("div", { className: "grid", style: { gap: 8 } }, Object.entries(deliveryArchetypes).map(([name, profileValues]) => h("button", { key: name, className: "archetype-button", onClick: () => setValues(profileValues) }, name)))), h("article", { className: "lesson-box", style: { borderTopColor: "#0d9488" } }, h("div", { className: "compact-meta" }, "Profile Lab"), keys.map((key) => h("div", { key }, h("div", { className: "range-row" }, h("label", { style: { fontWeight: 800 } }, deliverySpectrums[key].label), h("div", { className: "range-label" }, deliverySpectrums[key].levels[values[key] - 1])), h("input", { className: "slider", type: "range", min: 1, max: 5, value: values[key], onChange: (e) => updateValue(key, e.target.value) }))), h("div", { className: "analysis-list" }, profile.strengths.map((text) => h("div", { key: text, className: "analysis-item", style: { "--accent": "#0d9488" } }, text)), profile.weaknesses.map((text) => h("div", { key: text, className: "analysis-item", style: { "--accent": "#dc2626" } }, text)))))
    );
  }

  function MitigationTrainer() {
    const [difficulty, setDifficulty] = useState("RECRUIT");
    const [playlist, setPlaylist] = useState(() => shuffle(mitigationGameData.RECRUIT));
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [health, setHealth] = useState(100);
    const [timeLeft, setTimeLeft] = useState(mitigationDifficulties.RECRUIT.time);
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState("playing");
    const timeLimit = mitigationDifficulties[difficulty].time;
    const current = playlist[round] || playlist[0];
    const options = useMemo(() => shuffle(current.o), [current]);
    const startGame = (name = difficulty) => {
      setDifficulty(name);
      setPlaylist(shuffle(mitigationGameData[name]));
      setRound(0);
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      setHealth(100);
      setSelected(null);
      setStatus("playing");
      setTimeLeft(mitigationDifficulties[name].time);
    };
    useEffect(() => {
      if (status !== "playing" || selected) return undefined;
      const timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(timer);
            setSelected({ type: "TIMEOUT", text: "Time ran out.", points: 0, verdict: "BREACHED", sub: "You need a direct response before the timer expires." });
            setHealth((h0) => {
              const next = h0 - 25;
              if (next <= 0) setStatus("defeat");
              return next;
            });
            setStreak(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => window.clearInterval(timer);
    }, [status, selected, round, difficulty]);
    const chooseOption = (opt) => {
      if (selected || status !== "playing") return;
      const ratio = Math.max(0, timeLeft / timeLimit);
      let points = 0;
      let nextHealth = health;
      let nextStreak = streak;
      let verdict = "BREACHED";
      let sub = "Trap answer. It does not reduce or reverse the argument.";
      if (opt.type === "TURN") {
        points = Math.floor(1000 + 1000 * ratio + (streak + 1) * 50);
        nextStreak = streak + 1;
        nextHealth = Math.min(100, health + 5);
        verdict = "CRITICAL HIT";
        sub = "Strategic turn. You reversed the logic of the argument.";
      } else if (opt.type === "MITIGATE") {
        points = Math.floor(500 + 500 * ratio);
        verdict = "DEFLECTED";
        sub = "Mitigation. You reduced the size or likelihood of the impact.";
      } else {
        nextHealth = health - 25;
        nextStreak = 0;
      }
      setSelected({ ...opt, points, verdict, sub });
      setScore((s) => s + points);
      setHealth(nextHealth);
      setStreak(nextStreak);
      setMaxStreak((m) => Math.max(m, nextStreak));
      if (nextHealth <= 0) setStatus("defeat");
    };
    const nextRound = () => {
      if (round + 1 >= playlist.length) {
        setStatus("victory");
        return;
      }
      setRound((r) => r + 1);
      setSelected(null);
      setTimeLeft(timeLimit);
    };
    const finalRank = score > 12000 ? "S" : score > 9000 ? "A" : score > 6000 ? "B" : score > 3000 ? "C" : "D";
    return h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "Even If 反駁遊戲" : "Even If Mitigation Game"), h("p", null, isZh ? "選擇 turn、mitigate，避開 trap。時間越快，分數越高。" : "Choose turns or mitigations, avoid traps, and answer before the timer expires."))),
      h("div", { className: "segmented", style: { marginBottom: 18 } }, Object.entries(mitigationDifficulties).map(([key, item]) => h("button", { key, className: difficulty === key ? "active" : "", onClick: () => startGame(key) }, `${item.label} · ${item.time}s`))),
      h(
        "div",
        { className: "game-shell" },
        h("div", { className: "game-hud" }, h("div", { className: "hud-card" }, h("span", null, "Score"), h("strong", null, score.toLocaleString())), h("div", { className: "hud-card" }, h("span", null, "Health"), h("strong", null, `${Math.max(0, health)}%`), h("div", { className: "meter" }, h("div", { className: "meter-fill", style: { width: `${Math.max(0, health)}%`, background: health < 35 ? "#dc2626" : ORANGE } }))), h("div", { className: "hud-card" }, h("span", null, "Timer"), h("strong", null, `${timeLeft}s`), h("div", { className: "meter" }, h("div", { className: "meter-fill", style: { width: `${(timeLeft / timeLimit) * 100}%`, background: timeLeft < timeLimit / 3 ? "#dc2626" : SKY } }))), h("div", { className: "hud-card" }, h("span", null, "Round"), h("strong", null, `${Math.min(round + 1, playlist.length)}/${playlist.length}`))),
        status === "playing"
          ? h(React.Fragment, null, h("div", { className: "game-argument" }, h("div", { className: "compact-meta", style: { color: ORANGE } }, mitigationDifficulties[difficulty].text), h("h3", null, current.t)), h("div", { className: "grid", style: { gap: 12 } }, options.map((opt) => h("button", { key: opt.text, className: `option-card${selected?.text === opt.text ? " selected" : ""}`, disabled: !!selected, onClick: () => chooseOption(opt) }, opt.text))), selected && h("div", { className: "feedback-card" }, h("h3", null, selected.verdict), h("p", null, selected.sub), selected.points > 0 && h("p", { style: { fontWeight: 900, color: ORANGE, marginTop: 8 } }, `+${selected.points.toLocaleString()} points`), h("div", { style: { marginTop: 14 } }, h("button", { className: "btn", onClick: nextRound }, round + 1 >= playlist.length ? "Finish Game" : "Next Round"))))
          : h("div", { className: "feedback-card" }, h("div", { className: "compact-meta" }, status === "victory" ? "Complete" : "Defense Collapsed"), h("h3", null, status === "victory" ? `Rank ${finalRank}` : "Try Again"), h("p", null, `Final score: ${score.toLocaleString()}. Best turn streak: ${maxStreak}.`), h("div", { style: { marginTop: 14 } }, h("button", { className: "btn", onClick: () => startGame(difficulty) }, "Restart")))
      )
    );
  }

  function ResourcesPage() {
    return h(ResourceHubPage);
  }

  function GuidesPage() {
    return h(ResourceHubPage, { initialTool: "guides" });
  }

  function MannerPage() {
    return h(ResourceHubPage, { initialTool: "manner" });
  }

  function MitigationPage() {
    return h(ResourceHubPage, { initialTool: "mitigation" });
  }

  function BlogPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "文章" : "Blog", title: isZh ? "DebateCraft 文章" : "DebateCraft Blog", emphasis: "", subtitle: isZh ? "辯論學習、項目故事和團隊觀察。" : "Insights, tips, and stories from debate education." }), h(Section, null, h("div", { className: "grid grid-2" }, h(InfoCard, { title: "Why I Debate", tag: "July 6, 2025 · Adrian Chan", text: "Debate is not only about dissecting arguments and winning. It is also about building peers and teammates up in practice to understand controversial issues from different angles." }, h("div", { style: { marginTop: 20 } }, h(Button, { href: "https://debatecraft.substack.com/p/e79f3fbf-a404-402f-9702-6e962aa5660a?postPreview=paid&updated=2025-07-06T22%3A40%3A32.998Z&audience=everyone&free_preview=false&freemail=true" }, isZh ? "閱讀 →" : "Read More →"))), h(InfoCard, { title: isZh ? "訂閱更新" : "Stay Updated", text: isZh ? "訂閱最新辯論技巧、課程更新和教育資源。" : "Subscribe for debate tips, program updates, and educational resources.", accent: SKY }, h("div", { style: { marginTop: 20 } }, h(Button, { href: "https://debatecraft.substack.com/subscribe" }, isZh ? "訂閱 →" : "Subscribe →"))))));
  }

  function CTA() {
    return h("section", { style: { background: ORANGE, padding: "64px 0" } }, h("div", { className: "inner", style: { display: "flex", justifyContent: "space-between", gap: 32, alignItems: "center", flexWrap: "wrap" } }, h("div", { style: { flex: "1 1 340px" } }, h("h2", { className: "serif", style: { fontSize: "clamp(32px, 6vw, 42px)", lineHeight: 1.1, marginBottom: 10 } }, isZh ? "準備加入 DebateCraft？" : "Ready to Find Your Voice?"), h("p", { style: { color: "rgba(17,29,60,.72)", lineHeight: 1.65 } }, isZh ? "加入全球學生社群，免費接受高質素辯論教育。" : "Join a global student community with free, high-quality debate education.")), h("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } }, h(Button, { href: "https://form.jotform.com/261003548067049", dark: true }, isZh ? "免費申請 →" : "Apply Free →"), h(Button, { href: isZh ? "cnget-involved.html" : "get-involved.html" }, isZh ? "更多方式" : "Get Involved"))));
  }

  function Footer() {
    const cols = isZh
      ? [
          ["課程", [["辯論課程", "cncourses.html"], ["生物倫理", "cnbiology.html"], ["資源", "cnresources.html"]]],
          ["組織", [["我哋嘅使命", "cnstory.html"], ["我哋嘅團隊", "cnteam.html"], ["合作夥伴", "cnpartnership.html"]]],
          ["參與", [["學生申請", "https://form.jotform.com/261003548067049"], ["成為教練", "https://docs.google.com/forms/d/e/1FAIpQLSfombgLTJ0oDbWfCaSumrnLAjkdvT_K9FW1KJakbr9ZAQxwnQ/viewform?usp=header"], ["捐款", "https://buymeacoffee.com/debatecraft"]]],
          ["聯絡", [["info@debatecraft.org", "mailto:info@debatecraft.org"], ["Instagram", "https://www.instagram.com/debate_craft/"], ["Facebook", "https://www.facebook.com/profile.php?id=61577761071956"]]],
        ]
      : [
          ["Programs", [["Debate Courses", "offerings.html"], ["Bioethics", "biology.html"], ["Resources", "resources.html"]]],
          ["Organisation", [["Our Mission", "story.html"], ["Our Team", "team.html"], ["Partnership", "partnership.html"]]],
          ["Get Involved", [["Apply as Student", "https://form.jotform.com/261003548067049"], ["Become a Coach", "https://docs.google.com/forms/d/e/1FAIpQLSfombgLTJ0oDbWfCaSumrnLAjkdvT_K9FW1KJakbr9ZAQxwnQ/viewform?usp=header"], ["Donate", "https://buymeacoffee.com/debatecraft"]]],
          ["Contact", [["info@debatecraft.org", "mailto:info@debatecraft.org"], ["Instagram", "https://www.instagram.com/debate_craft/"], ["Facebook", "https://www.facebook.com/profile.php?id=61577761071956"]]],
        ];

    return h(
      "footer",
      { className: "footer" },
      h("div", { className: "footer-top" }, h("div", { className: "footer-brand-row" }, h(Brand, { footer: true }), h("p", { style: { maxWidth: 320, color: "rgba(255,255,255,.32)", fontSize: 13, lineHeight: 1.6, textAlign: "right" } }, t.footerSummary))),
      h("div", { className: "footer-grid" }, cols.map(([heading, links]) => h("div", { className: "footer-col", key: heading }, h("div", { className: "footer-heading" }, heading), links.map(([label, href]) => h("a", { key: label, href, ...extProps(href) }, label))))),
      h("div", { className: "footer-bottom" }, h("span", null, "© 2026 DebateCraft. All rights reserved."), h("span", null, isZh ? "學生營運 · 非牟利 · 免費" : "Student-run · Nonprofit · Free"))
    );
  }

  function renderPage() {
    if (["about", "story", "cnabout", "cnstory"].includes(pageId)) return h(MissionPage);
    if (["offerings", "cnofferings", "cncourses"].includes(pageId)) return h(ProgramsPage);
    if (["biology", "cnbiology"].includes(pageId)) return h(ProgramsPage, { biology: true });
    if (["others", "cnothers"].includes(pageId)) return h(ProgramsPage, { other: true });
    if (["team", "cnteam"].includes(pageId)) return h(TeamPage);
    if (["partnership", "cnpartnership"].includes(pageId)) return h(PartnershipPage);
    if (["get-involved", "cnget-involved"].includes(pageId)) return h(GetInvolvedPage);
    if (["donate", "cndonate"].includes(pageId)) return h(DonatePage);
    if (["contact", "cncontact"].includes(pageId)) return h(ContactPage);
    if (["resources", "cnresources"].includes(pageId)) return h(ResourcesPage);
    if (pageId === "mannernew") return h(ResourceHubPage, { initialTool: "learn" });
    if (pageId === "guides") return h(GuidesPage);
    if (pageId === "blog") return h(BlogPage);
    if (pageId === "manner") return h(MannerPage);
    if (pageId === "even-if") return h(MitigationPage);
    return h(ResourcesPage);
  }

  function App() {
    return h("div", { className: "dc-shell" }, h(Nav), renderPage(), h(Footer));
  }

  document.title = `${pageTitles[pageId] || "DebateCraft"} | DebateCraft`;
  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
