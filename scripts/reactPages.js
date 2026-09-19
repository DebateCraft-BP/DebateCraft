(() => {
  const h = React.createElement;
  const { useEffect, useMemo, useRef, useState } = React;

  const NAVY = "#071a2f";
  const NAVY2 = "#102b49";
  const ORANGE = "#ae9562";
  const SKY = "#0d5ea6";
  const CREAM = "#f4f3ee";
  const WHITE = "#ffffff";

  const pageId = window.DC_PAGE_ID || "about";
  const lang = pageId.startsWith("cn") ? "zh" : "en";
  const isZh = lang === "zh";
  const isHome = pageId === "home" || pageId === "cnhome";
  const assetPrefix = isHome ? "" : "../";
  const localHref = (href = "") => {
    if (!isHome || /^(?:https?:|mailto:|tel:|#)/.test(href)) return href;
    if (href === "../index.html") return "index.html";
    if (href === "../cnindex.html") return "cnindex.html";
    return href.endsWith(".html") || href.includes(".html#") ? `pages/${href}` : href;
  };
  const slugify = (value = "") => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const displayName = (value = "") => value.trim();

  const cn = {
    nav: {
      home: isHome ? "cnindex.html" : "../cnindex.html",
      about: "關於我們",
      programs: "小班課程",
      involved: "學校合作",
      contact: "聯絡我們",
      search: "搜尋",
      searchPlaceholder: "搜尋課程、教練、指南……",
      lang: "English",
      langHref: pageId === "cnhome" ? "index.html" : `${pageId.replace(/^cn/, "")}.html`,
      cta: "DebateCraft 方法 →",
    },
    footerSummary: "為香港及亞洲學校提供初中辯論隊訓練及校本辯論課程設計。",
  };

  const en = {
    nav: {
      home: isHome ? "index.html" : "../index.html",
      about: "About",
      programs: "Group Classes",
      involved: "For Schools",
      contact: "Contact Us",
      search: "Search",
      searchPlaceholder: "Search courses, coaches, guides…",
      lang: "中文 (繁體)",
      langHref: pageId === "home" ? "cnindex.html" : pageId === "even-if" ? "../cnindex.html" : `cn${pageId}.html`,
      cta: "DebateCraft Method for Schools →",
    },
    footerSummary: "Junior-team training and school debate program development across Hong Kong and Asia.",
  };

  const t = isZh ? cn : en;

  const pageTitles = {
    about: "About DebateCraft",
    story: "Our Mission",
    team: "Coaches, Judges and Results",
    offerings: "Group Debate Classes",
    cnofferings: "辯論小班課程",
    cncourses: "辯論小班課程",
    "training-pathway": "DebateCraft Method for Schools",
    "cntraining-pathway": "DebateCraft 校本方法",
    biology: "Bioethics: Science and Future of Medicine",
    partnership: "School Partnerships",
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
    cnstory: "我們的使命",
    cnteam: "教練、評判與成績",
    cnbiology: "生物倫理：科學與醫學未來",
    cnpartnership: "合作夥伴",
    "cnget-involved": "參與我們",
    cndonate: "捐款",
    cncontact: "聯絡我們",
    cnresources: "資源",
    cnothers: "更多課程",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  };

  const SITE_URL = "https://debatecraft.org";
  const STUDENT_FORM_URL = "https://form.jotform.com/261003548067049";
  const SCHOOL_CONTACT_URL = "mailto:info@debatecraft.org?subject=School%20debate%20program";

  const pageFileMap = {
    about: "about.html",
    story: "story.html",
    team: "team.html",
    offerings: "offerings.html",
    "training-pathway": "training-pathway.html",
    biology: "biology.html",
    partnership: "partnership.html",
    "get-involved": "get-involved.html",
    donate: "donate.html",
    contact: "contact.html",
    resources: "resources.html",
    guides: "guides.html",
    blog: "blog.html",
    manner: "manner.html",
    mannernew: "mannernew.html",
    "even-if": "even-if.html",
    others: "others.html",
    cnabout: "cnabout.html",
    cnstory: "cnstory.html",
    cnteam: "cnteam.html",
    cnofferings: "cnofferings.html",
    cncourses: "cncourses.html",
    "cntraining-pathway": "cntraining-pathway.html",
    cnbiology: "cnbiology.html",
    cnpartnership: "cnpartnership.html",
    "cnget-involved": "cnget-involved.html",
    cndonate: "cndonate.html",
    cncontact: "cncontact.html",
    cnresources: "cnresources.html",
    cnothers: "cnothers.html",
    privacy: "privacy.html",
    terms: "terms.html",
  };

  const pageDescriptions = {
    about: "Learn how DebateCraft combines competitive success with structured junior-team coaching for schools in Hong Kong and Asia.",
    story: "See how DebateCraft approaches curriculum, student progression, coaching, and school-team handover.",
    team: "Meet DebateCraft coaches, judges, and trainers with competitive results across Hong Kong, Asia, and global debate circuits.",
    offerings: "Compare DebateCraft live group classes in debate foundations, WSDC, BP, competition preparation, and bioethics.",
    "training-pathway": "See how the DebateCraft Method for Schools supports junior squad development, competition preparation, and handover.",
    biology: "A free Bioethics course covering genetics, CRISPR, AI in healthcare, medical decision-making, and student research projects.",
    partnership: "Review DebateCraft's online coaching, assessment, and competition support for school debate teams.",
    "get-involved": "Apply as a student, become a coach, partner with DebateCraft, or support free debate education.",
    donate: "Donate toward DebateCraft teaching materials, online tools, and free student places.",
    contact: "Contact DebateCraft about cohort size, timetable, debate format, assessment, and competition goals.",
    resources: "Use DebateCraft's free debate resource hub with guides, framework drills, speaking practice, videos, and mitigation games.",
    guides: "Browse DebateCraft's debate guides, WSDC and BP resources, motion preparation materials, and practice tools.",
    blog: "Read DebateCraft updates, debate education reflections, and student learning resources.",
    manner: "Practice delivery, emphasis, pace, tone, and public speaking manner with DebateCraft's interactive speaking lab.",
    mannernew: "Explore DebateCraft's React resource library for debate frameworks, guides, and practice drills.",
    "even-if": "Train mitigation and turn responses through DebateCraft's Even If debate practice game.",
    others: "Preview additional DebateCraft public speaking, research, and interdisciplinary programs in development.",
    privacy: "How DebateCraft Academy collects, uses, and protects information for DebateCraft, BioCraft, and its other programs.",
    terms: "DebateCraft Academy's Student and Family Agreement, which governs enrollment in DebateCraft.",
    wsdc: "Learn the World Schools format — motion types, definitions, and all five speaker roles — at beginner, intermediate, or advanced depth.",
    bp: "Learn the British Parliamentary format — teams, Points of Information, motion types, and role fulfilment — at beginner, intermediate, or advanced depth.",
    judging: "How to judge WSDC and British Parliamentary debates: the ordinary intelligent voter, clash resolution, persuasiveness, and deliberation.",
    scorer: "A guided speaker-score calculator for WSDC and BP judges with limited experience, built from the official scoring criteria.",
    cnabout: "了解 DebateCraft 如何結合競賽成績及有結構的初中梯隊訓練，服務香港及亞洲學校。",
    cnstory: "了解 DebateCraft 如何規劃校本辯論課程、學生進度及初中梯隊交接。",
    cnteam: "認識具備香港、亞洲及全球賽事成績、評判及工作坊培訓經驗的 DebateCraft 教練。",
    cnofferings: "比較 DebateCraft 網上辯論小班，由初學基礎到 WSDC、BP、高階賽事準備與生物倫理。",
    cncourses: "比較 DebateCraft 網上辯論小班，由初學基礎到 WSDC、BP、高階賽事準備與生物倫理。",
    "cntraining-pathway": "了解 DebateCraft 校本方法如何支援香港、馬來西亞及新加坡學校的初中梯隊、賽事準備及校內交接。",
    cnbiology: "免費生物倫理課程，討論遺傳學、CRISPR、AI 醫療、醫療決策和專家評審項目。",
    cnpartnership: "了解 DebateCraft 線上教練路線是否適合貴校的初中梯隊或校本辯論課程。",
    "cnget-involved": "學生可以申請免費課程，教練、學校和支持者亦可以參與 DebateCraft。",
    cndonate: "支持 DebateCraft 免費學生營運非牟利課程、教材和學生機會。",
    cncontact: "聯絡 DebateCraft，提供學生人數、校曆、賽制、評估需要及賽事目標。",
    cnresources: "使用 DebateCraft 免費辯論資源庫，包括指南、框架練習、演說訓練、影片和反駁遊戲。",
    cnothers: "預覽 DebateCraft 正在籌備的公開演說、研究和跨學科課程。",
  };

  const langPairs = {
    about: "cnabout",
    story: "cnstory",
    team: "cnteam",
    offerings: "cncourses",
    "training-pathway": "cntraining-pathway",
    biology: "cnbiology",
    partnership: "cnpartnership",
    "get-involved": "cnget-involved",
    donate: "cndonate",
    contact: "cncontact",
    resources: "cnresources",
    others: "cnothers",
    cnabout: "about",
    cnstory: "story",
    cnteam: "team",
    cnofferings: "offerings",
    cncourses: "offerings",
    "cntraining-pathway": "training-pathway",
    cnbiology: "biology",
    cnpartnership: "partnership",
    "cnget-involved": "get-involved",
    cndonate: "donate",
    cncontact: "contact",
    cnresources: "resources",
    cnothers: "others",
  };

  function pageUrl(id = pageId) {
    const file = pageFileMap[id] || `${id}.html`;
    return `${SITE_URL}/pages/${file}`;
  }

  function applyPageMeta() {
    const title = `${pageTitles[pageId] || "DebateCraft"} | DebateCraft`;
    const description = pageDescriptions[pageId] || "DebateCraft provides free student-run debate, public speaking, and science ethics education.";
    const canonical = pageUrl();
    const image = `${SITE_URL}/Images/Logo-white-transparent.png`;
    const altId = langPairs[pageId];
    const graph = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "DebateCraft",
        url: SITE_URL,
        logo: image,
        sameAs: ["https://www.instagram.com/debate_craft/", "https://www.facebook.com/profile.php?id=61577761071956"],
        nonprofitStatus: "NonprofitType",
        description: "A student-run nonprofit initiative providing free debate, public speaking, and science ethics education.",
      },
    ];

    if (["offerings", "cnofferings", "cncourses"].includes(pageId)) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "Course",
        name: isZh ? "DebateCraft 免費辯論課程" : "DebateCraft Free Debate Courses",
        description: pageDescriptions[pageId],
        provider: { "@type": "Organization", name: "DebateCraft", sameAs: SITE_URL },
        educationalLevel: isZh ? "中小學及高中學生" : "Middle and high school students",
        isAccessibleForFree: true,
      });
    }

    if (["biology", "cnbiology"].includes(pageId)) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "Course",
        name: isZh ? "生物倫理：科學與醫學未來" : "Bioethics: Science and Future of Medicine",
        description: pageDescriptions[pageId],
        provider: { "@type": "Organization", name: "DebateCraft", sameAs: SITE_URL },
        educationalLevel: isZh ? "13 歲以上學生" : "Students ages 13 and up",
        isAccessibleForFree: true,
      });
    }

    document.documentElement.lang = isZh ? "zh-Hant" : "en";
    document.title = title;
    document.head.querySelectorAll("[data-dc-meta]").forEach((node) => node.remove());
    const tags = [
      ["meta", { name: "description", content: description }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "DebateCraft" }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: canonical }],
      ["meta", { property: "og:image", content: image }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: image }],
      ["link", { rel: "canonical", href: canonical }],
      ["link", { rel: "alternate", hrefLang: isZh ? "zh-HK" : "en", href: canonical }],
      ["link", { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` }],
    ];
    if (altId) tags.push(["link", { rel: "alternate", hrefLang: isZh ? "en" : "zh-HK", href: pageUrl(altId) }]);
    tags.forEach(([tagName, attrs]) => {
      const node = document.createElement(tagName);
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key === "hrefLang" ? "hreflang" : key, value));
      node.setAttribute("data-dc-meta", "true");
      document.head.appendChild(node);
    });
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify(graph.length > 1 ? { "@context": "https://schema.org", "@graph": graph } : graph[0]);
    schema.setAttribute("data-dc-meta", "true");
    document.head.appendChild(schema);
  }

  const style = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',sans-serif;background:${CREAM};color:${NAVY};min-height:100vh}
    a{color:inherit;text-decoration:none}
    button,input,select,textarea{font:inherit}
    a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid ${SKY};outline-offset:3px}
    .btn:focus-visible,.dc-top-cta:focus-visible,.resource-tab:focus-visible,.mini-btn:focus-visible{box-shadow:0 0 0 4px rgba(61,195,232,.24)}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:${NAVY2}}
    ::-webkit-scrollbar-thumb{background:${ORANGE};border-radius:3px}
    .serif{font-family:'Playfair Display',Georgia,serif}
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
    .dc-search-btn{margin-left:auto;flex-shrink:0;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:rgba(255,255,255,.72);cursor:pointer;transition:background .2s ease,color .2s ease}
    .dc-search-btn:hover{background:rgba(255,255,255,.12);color:${WHITE}}
    .dc-right-links{display:flex;align-items:center;gap:2px}
    .dc-right-links a{color:rgba(255,255,255,.62);font-size:12px;font-weight:600;padding:7px 12px;letter-spacing:.04em;white-space:nowrap}
    .dc-right-links a:hover{color:${WHITE}}
    .dc-divider{width:1px;height:16px;background:rgba(255,255,255,.12);margin:0 6px}
    .dc-lang{color:rgba(255,255,255,.35)!important;font-size:11px!important}
    .dc-top-cta{background:${ORANGE};color:${NAVY}!important;border-radius:5px;padding:8px 16px!important;font-weight:700!important;font-size:12px!important;letter-spacing:.07em!important;text-transform:uppercase;margin-left:6px}
    .dc-search-overlay{position:fixed;inset:0;background:rgba(7,26,47,.62);display:flex;align-items:flex-start;justify-content:center;padding:12vh 24px 24px;z-index:500}
    .dc-search-panel{width:100%;max-width:620px;max-height:74vh;display:flex;flex-direction:column;background:${WHITE};border-radius:10px;border-top:4px solid ${ORANGE};box-shadow:0 30px 70px rgba(13,23,48,.4);overflow:hidden}
    .dc-search-input-row{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid rgba(17,29,60,.1);color:rgba(17,29,60,.4);flex-shrink:0}
    .dc-search-input{flex:1;border:0;outline:0;font-size:16px;color:${NAVY};background:transparent}
    .dc-search-input::placeholder{color:rgba(17,29,60,.35)}
    .dc-search-close{border:0;background:transparent;color:rgba(17,29,60,.4);font-size:22px;line-height:1;cursor:pointer;padding:0 2px}
    .dc-search-close:hover{color:${NAVY}}
    .dc-search-results{overflow-y:auto;padding:8px 10px 14px}
    .dc-search-hint,.dc-search-empty{padding:26px 14px;text-align:center;color:rgba(17,29,60,.45);font-size:13px;line-height:1.6}
    .dc-search-group{margin-top:10px}
    .dc-search-group-label{padding:6px 10px;font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(17,29,60,.4)}
    .dc-search-result{display:block;padding:9px 12px;border-radius:6px;text-decoration:none}
    .dc-search-result:hover,.dc-search-result:focus-visible{background:rgba(247,162,52,.1)}
    .dc-search-result-title{font-size:14px;font-weight:700;color:${NAVY}}
    .dc-search-result-subtitle{margin-top:2px;font-size:12px;color:rgba(17,29,60,.55);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
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
    .page-header:before{display:none}
    .section{padding:88px 0}
    .band-white{background:${WHITE}}
    .band-cream{background:${CREAM}}
    .band-dark{background:${NAVY2};color:${WHITE}}
    .inner{width:94%;max-width:1200px;margin:0 auto;padding:0 32px}
    .title{font-family:'Playfair Display',Georgia,serif;font-size:52px;font-weight:800;line-height:1.08;color:${NAVY};margin-bottom:20px}
    .band-dark .title{color:${WHITE}}
    .lead{font-size:16px;line-height:1.75;color:rgba(17,29,60,.66);max-width:760px}
    .band-dark .lead{color:rgba(255,255,255,.62)}
    .grid{display:grid;gap:24px}
    .grid-2{grid-template-columns:repeat(2,1fr)}
    .grid-3{grid-template-columns:repeat(3,1fr)}
    .grid-4{grid-template-columns:repeat(4,1fr)}
    .card{background:${WHITE};border-radius:4px;border:1px solid rgba(7,26,47,.16);padding:28px 24px;box-shadow:0 4px 14px rgba(17,29,60,.06);transition:transform .25s ease,box-shadow .25s ease}
    .card:hover{transform:translateY(-6px);box-shadow:0 16px 32px rgba(17,29,60,.12)}
    .dark-card{background:${NAVY};color:${WHITE}}
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
    .stat strong{display:block;font-family:'Playfair Display',Georgia,serif;font-size:clamp(34px,4.4vw,52px);line-height:1;font-weight:800;margin-bottom:6px}
    .stat span{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;opacity:.72;line-height:1.5}
    .proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .proof-grid.two{grid-template-columns:repeat(2,1fr)}
    .proof-card{background:${WHITE};border-radius:6px;border:1px solid rgba(7,26,47,.16);overflow:hidden;box-shadow:0 6px 18px rgba(17,29,60,.08);transition:transform .25s ease,box-shadow .25s ease}
    .proof-card:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(17,29,60,.14)}
    .proof-frame{aspect-ratio:16/10;background:${NAVY2};display:flex;align-items:center;justify-content:center;overflow:hidden}
    .proof-frame img{width:100%;height:100%;object-fit:contain;display:block}
    .proof-copy{padding:18px 18px 20px}
    .proof-copy h3{font-size:18px;color:${NAVY};margin-bottom:7px}
    .proof-copy p{font-size:13px;line-height:1.55;color:rgba(17,29,60,.62)}
    .band-dark .proof-card{background:${NAVY};box-shadow:0 10px 24px rgba(0,0,0,.2)}
    .band-dark .proof-copy h3{color:${WHITE}}
    .band-dark .proof-copy p{color:rgba(255,255,255,.62)}
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
    .team-search{width:100%;border:1px solid rgba(17,29,60,.12);background:${WHITE};color:${NAVY};border-radius:8px;padding:11px 14px;font-size:14px;outline:none}
    .team-search:focus{border-color:${SKY};box-shadow:0 0 0 3px rgba(61,195,232,.16)}
    .team-card{display:flex;flex-direction:column;height:100%}
    .team-card-body{display:flex;flex-direction:column;flex:1}
    .team-badge{display:inline-flex;align-self:flex-start;align-items:center;gap:5px;background:rgba(17,29,60,.06);color:rgba(17,29,60,.56);border-radius:999px;padding:5px 11px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
    .team-achievements{list-style:none;margin:2px 0 14px;padding:0;display:grid;gap:6px}
    .team-achievements li{position:relative;padding-left:16px;font-size:13px;line-height:1.5;color:rgba(17,29,60,.68)}
    .team-achievements li:before{content:"▸";position:absolute;left:0;color:${ORANGE};font-weight:700}
    .team-bio-btn{display:inline-block;border:0;background:transparent;padding:0;color:${ORANGE};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;margin-top:auto;align-self:flex-start}
    .team-bio-btn:hover{text-decoration:underline}
    .bio-modal-backdrop{position:fixed;inset:0;background:rgba(7,26,47,.6);display:flex;align-items:center;justify-content:center;z-index:400;padding:24px}
    .bio-modal{position:relative;background:${WHITE};max-width:560px;width:100%;max-height:88vh;overflow-y:auto;border-radius:8px;border-top:4px solid ${ORANGE};padding:32px 28px;box-shadow:0 30px 70px rgba(13,23,48,.35)}
    .bio-modal-close{position:absolute;top:14px;right:14px;width:32px;height:32px;border:0;border-radius:999px;background:${CREAM};color:${NAVY};font-size:20px;line-height:1;cursor:pointer}
    .bio-modal-close:hover{background:rgba(17,29,60,.12)}
    .bio-modal-img{width:100%;max-height:260px;object-fit:cover;border-radius:6px;margin-bottom:18px;background:${CREAM}}
    .faq-list{display:grid;gap:12px;max-width:760px;margin:0 auto}
    .faq-item{background:${WHITE};border:1px solid rgba(17,29,60,.1);border-radius:8px;padding:0;overflow:hidden}
    .faq-item summary{cursor:pointer;list-style:none;padding:18px 22px;font-weight:700;color:${NAVY};font-size:15px;display:flex;justify-content:space-between;align-items:center;gap:12px}
    .faq-item summary::-webkit-details-marker{display:none}
    .faq-item summary:after{content:"+";flex-shrink:0;font-size:20px;font-weight:400;color:${ORANGE};transition:transform .2s ease}
    .faq-item[open] summary:after{transform:rotate(45deg)}
    .faq-item .faq-answer{padding:0 22px 20px;color:rgba(17,29,60,.68);font-size:14px;line-height:1.7}
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
    .compact-card{background:${WHITE};border:1px solid rgba(7,26,47,.16);border-radius:6px;padding:22px;box-shadow:0 4px 14px rgba(17,29,60,.05)}
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
    .legal-wrap{max-width:820px;margin:0 auto}
    .legal-note{background:${CREAM};border:1px solid rgba(17,29,60,.14);border-left:4px solid ${ORANGE};border-radius:6px;padding:18px 20px;margin-bottom:28px;font-size:13px;line-height:1.7;color:rgba(17,29,60,.72)}
    .legal-intro{font-size:15px;line-height:1.75;color:rgba(17,29,60,.72);margin-bottom:28px}
    .legal-intro a{color:${SKY};font-weight:700;border-bottom:1px solid currentColor}
    .legal-toc{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 20px;background:${WHITE};border:1px solid rgba(17,29,60,.1);border-radius:8px;padding:18px 22px;margin-bottom:36px}
    .legal-toc a{font-size:13px;font-weight:700;color:${NAVY};padding:4px 0}
    .legal-toc a:hover{color:${SKY}}
    .legal-section{padding:26px 0;border-top:1px solid rgba(17,29,60,.1);scroll-margin-top:96px}
    .legal-section:first-of-type{border-top:0}
    .legal-section h2{font-family:'Playfair Display',Georgia,serif;font-size:24px;margin-bottom:14px;color:${NAVY}}
    .legal-section h3{font-size:16px;margin:18px 0 8px;color:${NAVY}}
    .legal-section p,.legal-section li{font-size:14px;line-height:1.75;color:rgba(17,29,60,.7)}
    .legal-section ul{padding-left:20px;margin:10px 0}
    .legal-section li{margin-bottom:6px}
    .legal-table-wrap{overflow-x:auto;margin:16px 0}
    .legal-table{width:100%;border-collapse:collapse;font-size:13px}
    .legal-table th{background:${NAVY};color:${WHITE};text-align:left;padding:10px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
    .legal-table td{padding:10px 14px;border-bottom:1px solid rgba(17,29,60,.1);color:rgba(17,29,60,.72);vertical-align:top}
    .legal-table tr:nth-child(even) td{background:${CREAM}}
    .tier-block{margin-top:14px;padding:14px 18px;border-left:3px solid ${SKY};background:${CREAM};border-radius:0 6px 6px 0}
    .tier-block p,.tier-block li{font-size:14px;line-height:1.72;color:rgba(17,29,60,.68)}
    .tier-advanced{border-left-color:${ORANGE};background:rgba(174,149,98,.1)}
    .tiered-section{padding:28px 0;border-top:1px solid rgba(17,29,60,.1);scroll-margin-top:96px}
    .tiered-section:first-of-type{border-top:0}
    .tiered-section h3{font-family:'Playfair Display',Georgia,serif;font-size:24px;margin-bottom:10px;color:${NAVY}}
    .tiered-section h4{font-size:15px;margin:14px 0 6px;color:${NAVY}}
    .tiered-section p,.tiered-section li{font-size:14px;line-height:1.75;color:rgba(17,29,60,.7)}
    .tiered-section ul{padding-left:20px}
    .band-table-wrap{overflow-x:auto;margin:16px 0}
    .band-table{width:100%;border-collapse:collapse;font-size:12px}
    .band-table th{background:${NAVY};color:${WHITE};text-align:left;padding:9px 12px;font-size:10px;text-transform:uppercase;letter-spacing:.06em}
    .band-table td{padding:9px 12px;border-bottom:1px solid rgba(17,29,60,.1);color:rgba(17,29,60,.72)}
    .score-result{background:${NAVY};color:${WHITE};border-radius:8px;padding:32px;text-align:center;margin-top:20px}
    .score-result .score-number{font-family:'Playfair Display',Georgia,serif;font-size:56px;line-height:1;color:${ORANGE}}
    .score-result .score-label{font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin-top:8px}
    .score-result .score-range{font-size:12px;color:rgba(255,255,255,.6);margin-top:10px}
    .scorer-question{background:${WHITE};border:1px solid rgba(17,29,60,.1);border-radius:8px;padding:22px;margin-bottom:18px}
    .scorer-question h4{font-size:15px;margin-bottom:12px;color:${NAVY}}
    .scorer-options{display:grid;gap:8px}
    .scorer-options .choice-btn{white-space:normal}
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
    .finder-shell{background:${WHITE};border-radius:8px;border-top:4px solid ${ORANGE};box-shadow:0 8px 24px rgba(17,29,60,.08);padding:26px}
    .finder-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:22px;align-items:start}
    .finder-question{margin-bottom:18px}
    .finder-question h3{font-size:14px;margin-bottom:10px;color:${NAVY}}
    .choice-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
    .choice-btn{border:1px solid rgba(17,29,60,.12);background:${CREAM};color:${NAVY};border-radius:6px;padding:11px 12px;text-align:left;font-size:12px;font-weight:800;line-height:1.35;cursor:pointer}
    .choice-btn.active{background:${NAVY};border-color:${NAVY};color:${WHITE}}
    .finder-result{background:${NAVY2};color:${WHITE};border-radius:8px;padding:24px;position:sticky;top:86px}
    .finder-result h3{font-family:'Playfair Display',Georgia,serif;font-size:30px;line-height:1.1;margin-bottom:8px;color:${WHITE}}
    .finder-result p{font-size:14px;line-height:1.65;color:rgba(255,255,255,.66)}
    .match-tag{display:inline-flex;border-radius:999px;background:rgba(247,162,52,.14);color:${ORANGE};padding:5px 10px;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
    .backup-list{display:grid;gap:9px;margin:16px 0}
    .backup-item{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:11px 12px;font-size:13px;color:rgba(255,255,255,.82)}
    .finder-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
    .link-btn{border:0;background:transparent;color:${SKY};font-size:12px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:0}
    .toolkit-layout{display:grid;grid-template-columns:220px minmax(0,1fr);gap:20px;align-items:start}
    .toolkit-menu{display:grid;gap:8px}
    .toolkit-menu button{border:1px solid rgba(17,29,60,.1);background:${WHITE};color:${NAVY};border-radius:6px;padding:12px 14px;text-align:left;font-size:13px;font-weight:900;cursor:pointer}
    .toolkit-menu button.active{background:${NAVY};color:${WHITE};border-color:${NAVY}}
    .toolkit-panel{min-width:0}
    .filter-bar{display:grid;grid-template-columns:1.2fr repeat(3,.65fr);gap:10px;margin-bottom:16px}
    .motion-list{display:grid;gap:10px}
    .motion-card{background:${WHITE};border:1px solid rgba(17,29,60,.08);border-left:4px solid var(--accent,${ORANGE});border-radius:6px;padding:16px;display:grid;gap:10px}
    .motion-card h3{font-size:17px;line-height:1.35;color:${NAVY}}
    .motion-meta{display:flex;flex-wrap:wrap;gap:7px}
    .motion-meta span{border-radius:999px;background:${CREAM};color:rgba(17,29,60,.68);font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;padding:5px 8px}
    .motion-actions{display:flex;gap:9px;flex-wrap:wrap}
    .prep-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .prep-field{display:grid;gap:7px}
    .prep-field label{font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:${ORANGE}}
    .timer-face{background:${NAVY2};color:${WHITE};border-radius:8px;padding:24px;text-align:center}
    .timer-time{font-family:'Playfair Display',Georgia,serif;font-size:clamp(50px,9vw,82px);font-weight:800;line-height:1;color:${WHITE};margin:10px 0}
    .timer-status{font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:${ORANGE}}
    .timer-track{height:11px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;margin:18px 0}
    .timer-fill{height:100%;background:${ORANGE};border-radius:999px;transition:width .25s ease}
    .card,.proof-card,.finder-shell,.lesson-box,.compact-card,.faq-item,.resource-sidebar,.finder-result,.game-shell,.video-frame,.bio-modal,.dc-search-panel,.dc-nav-card,.btn,.pill,.team-badge,.teaching-chip,.filter-row button,.segmented button,.mini-btn,.choice-btn{border-radius:0!important}
    @media (prefers-reduced-motion:reduce){
      html{scroll-behavior:auto!important}
      *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}
      .card:hover,.btn:hover,.proof-card:hover{transform:none!important}
    }
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
      .proof-grid,.proof-grid.two{grid-template-columns:1fr}
      .finder-grid,.toolkit-layout,.filter-bar,.prep-grid,.choice-grid{grid-template-columns:1fr}
      .finder-result{position:static}
      .range-row{grid-template-columns:1fr}
      .range-label{text-align:left}
      .motion-display{font-size:23px}
      .bio-modal-backdrop{padding:0}
      .bio-modal{max-width:100%;width:100%;height:100%;max-height:100%;border-radius:0;padding:24px 18px}
      .dc-search-overlay{padding:0}
      .dc-search-panel{max-width:100%;width:100%;height:100%;max-height:100%;border-radius:0}
    }
  `;

  document.head.insertAdjacentHTML("beforeend", `<style>${style}</style>`);
  const sharedStyles = document.createElement("link");
  sharedStyles.rel = "stylesheet";
  sharedStyles.href = `${assetPrefix}styles/main.css`;
  document.head.appendChild(sharedStyles);

  function extProps(href) {
    return /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
  }

  function readStored(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStored(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Local storage can be unavailable in private browsing; the UI still works for the session.
    }
  }

  function removeStored(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore storage cleanup errors.
    }
  }

	  function useStoredState(key, fallback) {
	    const [value, setValue] = useState(() => readStored(key, fallback));
	    useEffect(() => {
	      if (JSON.stringify(value) === JSON.stringify(fallback)) {
	        removeStored(key);
	      } else {
	        writeStored(key, value);
	      }
	    }, [key, value]);
	    return [value, setValue];
	  }

  function Brand({ footer = false }) {
    const wordmark = footer
      ? [h("span", { key: "debate", style: { color: ORANGE } }, "Debate"), h("span", { key: "craft", style: { color: SKY } }, "Craft")]
      : "DebateCraft";
    return h(
      "a",
      { className: "dc-brand", href: localHref(t.nav.home) },
      h("img", { src: `${assetPrefix}Images/Logo-white-transparent.png`, alt: isZh ? "DebateCraft 標誌" : "DebateCraft logo" }),
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

  function SearchIcon() {
    return h(
      "svg",
      { width: 17, height: 17, viewBox: "0 0 20 20", fill: "none" },
      h("circle", { cx: 9, cy: 9, r: 6.5, stroke: "currentColor", strokeWidth: "1.6" }),
      h("path", { d: "M18 18L13.7 13.7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })
    );
  }

  const SEARCH_TYPE_LABELS = {
    page: { en: "Pages", zh: "頁面" },
    person: { en: "Team", zh: "團隊成員" },
    course: { en: "Programs", zh: "課程" },
    cohort: { en: "Summer Cohorts", zh: "暑期小班" },
    guide: { en: "Guides", zh: "指南" },
    video: { en: "Videos", zh: "影片" },
    framework: { en: "Frameworks", zh: "框架練習" },
    faq: { en: "FAQ", zh: "常見問題" },
  };
  const SEARCH_TYPE_ORDER = ["page", "person", "course", "cohort", "guide", "video", "framework", "faq"];
  const SEARCH_RESULTS_PER_GROUP = 6;

  function SearchOverlay({ open, onClose }) {
    const [query, setQuery] = useState("");
    const [members, setMembers] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
      if (!open) return;
      fetch(`${assetPrefix}${isZh ? "data/cnteam_members.json" : "data/team_members.json"}?v=search`)
        .then((r) => r.json())
        .then(setMembers)
        .catch(() => setMembers([]));
    }, [open]);

    const index = useMemo(() => buildSearchIndex(members), [members]);

    useEffect(() => {
      if (!open) return;
      setQuery("");
      const focusTimer = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKey);
      };
    }, [open]);

    if (!open) return null;

    const q = query.trim().toLowerCase();
    const results = q ? index.filter((r) => r.keywords.includes(q)) : [];
    const grouped = SEARCH_TYPE_ORDER.map((type) => ({
      type,
      label: isZh ? SEARCH_TYPE_LABELS[type].zh : SEARCH_TYPE_LABELS[type].en,
      items: results.filter((r) => r.type === type).slice(0, SEARCH_RESULTS_PER_GROUP),
    })).filter((g) => g.items.length > 0);
    const totalShown = grouped.reduce((sum, g) => sum + g.items.length, 0);

    return h(
      "div",
      { className: "dc-search-overlay", onClick: onClose },
      h(
        "div",
        { className: "dc-search-panel", role: "dialog", "aria-modal": "true", "aria-label": t.nav.search, onClick: (e) => e.stopPropagation() },
        h(
          "div",
          { className: "dc-search-input-row" },
          h(SearchIcon),
          h("input", {
            ref: inputRef,
            type: "text",
            className: "dc-search-input",
            placeholder: t.nav.searchPlaceholder,
            value: query,
            onChange: (e) => setQuery(e.target.value),
          }),
          h("button", { type: "button", className: "dc-search-close", onClick: onClose, "aria-label": isZh ? "關閉" : "Close" }, "×")
        ),
        h(
          "div",
          { className: "dc-search-results" },
          !q && h("div", { className: "dc-search-hint" }, isZh ? "輸入關鍵字搜尋頁面、課程、教練、指南與常見問題。" : "Start typing to search pages, programs, coaches, guides, and FAQ."),
          q && totalShown === 0 && h("div", { className: "dc-search-empty" }, isZh ? `尋找不到「${query}」的結果。` : `No results for "${query}".`),
          grouped.map((g) =>
            h(
              "div",
              { className: "dc-search-group", key: g.type },
              h("div", { className: "dc-search-group-label" }, g.label),
              g.items.map((item, i) =>
                h(
                  "a",
                  {
                    key: `${g.type}-${i}`,
                    className: "dc-search-result",
                    href: localHref(item.href),
                    ...(item.external ? extProps(item.href) : { onClick: onClose }),
                  },
                  h("div", { className: "dc-search-result-title" }, item.title),
                  item.subtitle && h("div", { className: "dc-search-result-subtitle" }, item.subtitle)
                )
              )
            )
          )
        )
      )
    );
  }

  function Nav() {
    const [open, setOpen] = useState(false);
    const [navHeight, setNavHeight] = useState(60);
    const navRef = useRef(null);
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(() => {
      const onKey = (e) => {
        const tag = (document.activeElement && document.activeElement.tagName) || "";
        const typing = tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable;
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setSearchOpen(true);
        } else if (e.key === "/" && !typing) {
          e.preventDefault();
          setSearchOpen(true);
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, []);
    const navCards = isZh
      ? [
          { label: "關於我們", links: [["關於 DebateCraft", "cnabout.html"], ["教練與成績", "cnteam.html"], ["使命", "cnstory.html"], ["生物倫理", "cnbiology.html"]] },
          { label: "學校", links: [["DebateCraft 校本方法", "cntraining-pathway.html"], ["辯論資源", "cnresources.html"], ["學校聯絡", SCHOOL_CONTACT_URL]] },
          { label: "競技訓練", links: [["網上小班課程", "cncourses.html"], ["報名參與", "cnget-involved.html"]] },
        ]
      : [
          { label: "About", links: [["About DebateCraft", "about.html"], ["Coaches and results", "team.html"], ["Mission", "story.html"], ["Bioethics", "biology.html"]] },
          { label: "School", links: [["DebateCraft Method for Schools", "training-pathway.html"], ["Debate resources", "resources.html"], ["School contact", SCHOOL_CONTACT_URL]] },
        ];

    useEffect(() => {
      const updateHeight = () => {
        if (!navRef.current) return;
        setNavHeight(open ? navRef.current.scrollHeight : 60);
      };
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }, [open]);

    return h(
      "div",
      { className: "dc-nav-wrap" },
      h(
        "nav",
        { className: `dc-nav${open ? " open" : ""}`, ref: navRef, style: { height: open ? navHeight : 60 } },
        h(
          "div",
          { className: "dc-nav-top" },
          h("button", { className: "dc-burger", onClick: () => setOpen(!open), "aria-label": isZh ? "開關導覽選單" : "Toggle navigation", "aria-expanded": open }, h("span"), h("span"), h("span")),
          h(Brand),
          h("button", { type: "button", className: "dc-search-btn", onClick: () => setSearchOpen(true), "aria-label": t.nav.search }, h(SearchIcon)),
          h(
            "div",
            { className: "dc-right-links" },
            h("a", { href: localHref(isZh ? "cnget-involved.html" : "get-involved.html") }, t.nav.involved),
            h("a", { href: localHref(isZh ? "cncontact.html" : "contact.html") }, t.nav.contact),
            h("div", { className: "dc-divider" }),
            h("a", { className: "dc-lang", href: t.nav.langHref }, t.nav.lang),
            h("a", { className: "dc-top-cta", href: SCHOOL_CONTACT_URL }, t.nav.cta)
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
              card.links.map(([label, href]) => h("a", { key: label, href: localHref(href), ...extProps(href), onClick: () => setOpen(false) }, h(Arrow), label))
            )
          )
        )
      ),
      h(SearchOverlay, { open: searchOpen, onClose: () => setSearchOpen(false) })
    );
  }

  function PageHeader({ eyebrow, title, emphasis, subtitle }) {
    return h(
      "section",
      { className: "page-header" },
      h(
        "div",
        { className: "inner", style: { position: "relative", zIndex: 2 } },
        h(
          "h1",
          { className: "serif", style: { fontSize: "clamp(42px, 8vw, 64px)", fontWeight: 800, color: WHITE, lineHeight: 1.05, marginBottom: 18 } },
          title,
          emphasis && h("em", { style: { color: ORANGE, fontStyle: "italic" } }, ` ${emphasis}`)
        ),
        subtitle && h("p", { style: { maxWidth: 720, margin: "0 auto", color: "rgba(255,255,255,.72)", fontSize: 17, lineHeight: 1.72 } }, subtitle)
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
      { className: `card${dark ? " dark-card" : ""}` },
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
        { n: "400+", label: "全球學生" },
        { n: "19", label: "國家及地區" },
        { n: "450+", label: "教學時數" },
        { n: "學生營運", label: "非牟利項目" },
      ]
    : [
        { n: "400+", label: "Students Worldwide" },
        { n: "19", label: "Countries" },
        { n: "450+", label: "Hours Taught" },
        { n: "Student-run", label: "Nonprofit Initiative" },
      ];

  const credibilityItems = isZh
    ? [
        {
          title: "學生營運，免費開放",
          text: "DebateCraft 由學生營運，以非牟利方式為中小學及高中學生提供免費辯論和科學倫理課程。",
          accent: ORANGE,
        },
        {
          title: "Team HK 與課程顧問",
          text: "教學團隊包括香港 WSDC 成員；Sandeep Chulani 與 Angga Djovanka 曾提供課程意見。",
          accent: SKY,
        },
        {
          title: "生物倫理導師經歷",
          text: "生物倫理課程由 Phillips Exeter 學生帶領。導師包括 USABO 約一萬名參賽者中排名前500、醫學期刊作者及 Scholastic Writing Awards 決賽選手。",
          accent: "#0d9488",
        },
      ]
    : [
        {
          title: "Student-run and free",
          text: "DebateCraft is a student-run nonprofit initiative offering free debate, public speaking, and science ethics education to middle and high school students.",
          accent: ORANGE,
        },
        {
          title: "Team HK and curriculum advisers",
          text: "Teaching team includes Hong Kong WSDC team members. Sandeep Chulani and Angga Djovanka have contributed curriculum guidance.",
          accent: SKY,
        },
        {
          title: "Bioethics instructor record",
          text: "Phillips Exeter students teach bioethics. Instructors include a USABO participant ranked about 500th among 10,000 entrants, medical journal authors, and Scholastic Writing Awards finalists.",
          accent: "#0d9488",
        },
      ];

  const proofImageText = isZh
    ? {
        image1: {
          title: "線上辯論小班",
          caption: "線上辯論小班",
          alt: "線上辯論課堂截圖，學生正在參與視像課堂",
        },
        image2: {
          title: "小組辯論課堂",
          caption: "小組辯論課堂",
          alt: "線上小組課堂截圖，畫面顯示學生和 DebateCraft 課堂畫面",
        },
        image3: {
          title: "引導式論證練習",
          caption: "引導式論證練習",
          alt: "線上課堂截圖，顯示辯論計時器、教材和視像課堂參與者",
        },
        image4: {
          title: "完成與學生進度",
          caption: "完成與學生進度",
          alt: "線上課堂截圖，顯示 DebateCraft 完成證書和視像課堂參與者",
        },
        image5: {
          title: "即時課堂討論",
          caption: "即時課堂討論",
          alt: "線上課堂截圖，顯示 DebateCraft 課堂畫面和學生參與者",
        },
        image6: {
          title: "互動教材",
          caption: "互動教材",
          alt: "線上課堂截圖，顯示辯論教材和視像課堂參與者",
        },
        image7: {
          title: "PEEL 論證練習",
          caption: "PEEL 論證練習",
          alt: "線上課堂截圖，顯示已標示的辯論論證教材和視像課堂參與者",
        },
      }
    : {
        image1: {
          title: "Live online debate cohort",
          caption: "Live online debate cohort",
          alt: "Online debate class screenshot with students in a video call",
        },
        image2: {
          title: "Small-group debate session",
          caption: "Small-group debate session",
          alt: "Online small-group class screenshot with students and DebateCraft class materials",
        },
        image3: {
          title: "Guided argument practice",
          caption: "Guided argument practice",
          alt: "Online lesson screenshot showing a debate timer, class materials, and video call participants",
        },
        image4: {
          title: "Completion and student progress",
          caption: "Completion and student progress",
          alt: "Online class screenshot showing a DebateCraft completion certificate and video call participants",
        },
        image5: {
          title: "Live lesson discussion",
          caption: "Live lesson discussion",
          alt: "Online class screenshot with DebateCraft branding and student participants",
        },
        image6: {
          title: "Interactive lesson materials",
          caption: "Interactive lesson materials",
          alt: "Online lesson screenshot showing debate slide materials and video call participants",
        },
        image7: {
          title: "Guided PEEL argument practice",
          caption: "Guided PEEL argument practice",
          alt: "Online lesson screenshot showing a highlighted debate argument slide and video call participants",
        },
      };

  const proofImageLibrary = {
    image1: { id: "image1", src: "../Images/Image1.jpeg", ...proofImageText.image1 },
    image2: { id: "image2", src: "../Images/Image2.jpeg", ...proofImageText.image2 },
    image3: { id: "image3", src: "../Images/Image3.png", ...proofImageText.image3 },
    image4: { id: "image4", src: "../Images/Image4.png", ...proofImageText.image4 },
    image5: { id: "image5", src: "../Images/Image5.png", ...proofImageText.image5 },
    image6: { id: "image6", src: "../Images/Image6.png", ...proofImageText.image6 },
    image7: { id: "image7", src: "../Images/Image7.png", ...proofImageText.image7 },
  };

  const proofSets = {
    mission: ["image2", "image5"],
    offerings: ["image4", "image7"],
    resources: ["image3", "image6", "image7"],
    partnership: ["image1", "image2", "image5"],
  };

  const proofCopy = {
    en: { testimonials: [], studentOutcomes: [], partnerBlurbs: [], partnerLogos: [] },
    zh: { testimonials: [], studentOutcomes: [], partnerBlurbs: [], partnerLogos: [] },
  };

  const suppliedProofCopy = proofCopy[lang];

  function proofImagesFor(set) {
    return (proofSets[set] || []).map((key) => proofImageLibrary[key]).filter(Boolean);
  }

  function CredibilitySection({ cream = false }) {
    return h(
      Section,
      { cream },
      h(TitleBlock, {
        eyebrow: isZh ? "可信度" : "Why Families Trust DebateCraft",
        title: isZh ? "嚴謹教學，" : "Built by Students",
        emphasis: isZh ? "免費參與。" : "With Serious Credentials.",
        lead: isZh
          ? "由辯論和科學背景扎實的學生導師設計，讓更多學生能免費接觸高質素課程。"
          : "Student instructors teach free debate and science classes using their own competition and research experience.",
        center: true,
      }),
      h(
        "div",
        { className: "grid grid-3" },
        credibilityItems.map((item) => h(InfoCard, { key: item.title, title: item.title, text: item.text, accent: item.accent }))
      )
    );
  }

  function ProofImageCard({ item, accent = ORANGE }) {
    return h(
      "article",
      { className: "proof-card", style: { "--accent": accent } },
      h("div", { className: "proof-frame" }, h("img", { src: item.src, alt: item.alt, loading: "lazy", decoding: "async" })),
      h("div", { className: "proof-copy" }, h("h3", null, item.title), h("p", null, item.caption))
    );
  }

  function ProofGallerySection({ set, eyebrow, title, emphasis, lead, cream = false, dark = false }) {
    const images = proofImagesFor(set);
    if (!images.length) return null;
    const accents = [ORANGE, SKY, "#0d9488"];
    return h(
      Section,
      { cream, dark },
      h(TitleBlock, { eyebrow, title, emphasis, lead, dark, center: true }),
      h(
        "div",
        { className: `proof-grid${images.length === 2 ? " two" : ""}` },
        images.map((item, index) => h(ProofImageCard, { key: item.id, item, accent: accents[index % accents.length] }))
      ),
      (suppliedProofCopy.testimonials.length > 0 || suppliedProofCopy.studentOutcomes.length > 0 || suppliedProofCopy.partnerBlurbs.length > 0 || suppliedProofCopy.partnerLogos.length > 0) &&
        h("div", { className: "proof-supplied" })
    );
  }

  const courseFinderDefaultAnswers = {
    age: "13-14",
    experience: "none",
    goal: "confidence",
    format: "unsure",
    intensity: "steady",
  };

  const courseFinderQuestions = isZh
    ? [
        { key: "age", title: "學生年齡", options: [["under9", "9 歲以下"], ["9-12", "9-12 歲"], ["13-14", "13-14 歲"], ["15plus", "15 歲以上"]] },
        { key: "experience", title: "辯論經驗", options: [["none", "零經驗"], ["basic", "學過基本概念"], ["oneYear", "最多約一年"], ["twoPlus", "兩年以上"], ["fivePlus", "五年以上 / 有賽績"]] },
        { key: "goal", title: "主要目標", options: [["confidence", "自信與表達"], ["competitive", "競技辯論"], ["research", "證據研究"], ["wsdc", "World Schools"], ["bp", "BP / 大學式辯論"], ["bioethics", "科學、醫學、倫理"]] },
        { key: "format", title: "偏好格式", options: [["unsure", "未確定"], ["wsdc", "WSDC"], ["bp", "British Parliamentary"], ["bioethics", "Bioethics"]] },
        { key: "intensity", title: "課程強度", options: [["gentle", "循序漸進"], ["steady", "穩定進步"], ["intensive", "高強度訓練"]] },
      ]
    : [
        { key: "age", title: "Student age", options: [["under9", "Under 9"], ["9-12", "Ages 9-12"], ["13-14", "Ages 13-14"], ["15plus", "Ages 15+"]] },
        { key: "experience", title: "Debate experience", options: [["none", "No experience"], ["basic", "Some basics"], ["oneYear", "Up to 1 year"], ["twoPlus", "2+ years"], ["fivePlus", "5+ years / tournament record"]] },
        { key: "goal", title: "Main goal", options: [["confidence", "Confidence and speaking"], ["competitive", "Competitive debate"], ["research", "Evidence research"], ["wsdc", "World Schools"], ["bp", "BP / university style"], ["bioethics", "Science, medicine, ethics"]] },
        { key: "format", title: "Preferred format", options: [["unsure", "Not sure yet"], ["wsdc", "WSDC"], ["bp", "British Parliamentary"], ["bioethics", "Bioethics"]] },
        { key: "intensity", title: "Preferred intensity", options: [["gentle", "Gentle start"], ["steady", "Steady growth"], ["intensive", "Intensive training"]] },
      ];

  const finderCourses = isZh
    ? {
        placement: { title: "申請後由團隊協助分班", tag: "Placement Review", detail: "適合需要更仔細評估年齡、目標或課程適配的學生。", cta: "免費申請分班 →" },
        level1: { title: "Level 1 Introduction to Debate", tag: "9歲以上 · 初學者", detail: "以 PEEL、邏輯、蘇格拉底式推理和公開演說自信作起點。", cta: "申請辯論 →" },
        level2: { title: "Level 2 Intermediate Debate", tag: "有基礎 / 約一年內", detail: "加快節奏，深化反駁、結構化論證和 motion analysis。", cta: "申請辯論 →" },
        bioethics: { title: "Bioethics: Science and Future of Medicine", tag: "13歲以上 · 科學倫理", detail: "適合對醫學、法律、哲學、AI 醫療和基因科技有興趣的學生。", cta: "申請生物倫理 →" },
        wsdc: { title: "Level 3 WSDC Mastery", tag: "13歲以上 · 2年以上", detail: "為有經驗辯手訓練五分鐘演講、style、content 和國際賽策略。", cta: "申請辯論 →" },
        bp: { title: "Level 3 BP Competitive Track", tag: "13歲以上 · 2年以上", detail: "聚焦 extensions、POI、快速分析和大學式 British Parliamentary 辯論。", cta: "申請辯論 →" },
        level4: { title: "Level 4 Advanced Debate Seminar", tag: "15歲以上 · 5年以上", detail: "為有賽事成績的高階辯手打磨 case-building、matter-loading 和 weighing。", cta: "申請辯論 →" },
      }
    : {
        placement: { title: "Apply for placement review", tag: "Placement Review", detail: "Best when age, goals, or readiness need a closer placement decision by the team.", cta: "Apply for Placement →" },
        level1: { title: "Level 1 Introduction to Debate", tag: "Ages 9+ · Beginner", detail: "Learn PEEL, basic logic, Socratic questioning, and complete short speeches.", cta: "Apply for Debate →" },
        level2: { title: "Level 2 Intermediate Debate", tag: "Basics / up to 1 year", detail: "A faster progression into rebuttal, structured argumentation, and motion analysis.", cta: "Apply for Debate →" },
        bioethics: { title: "Bioethics: Science and Future of Medicine", tag: "Ages 13+ · Science ethics", detail: "For students interested in medicine, law, philosophy, AI healthcare, and genetic technology.", cta: "Apply for Bioethics →" },
        wsdc: { title: "Level 3 WSDC Mastery", tag: "Ages 13+ · 2+ years", detail: "Five-minute speeches, style, content, and international World Schools strategy.", cta: "Apply for Debate →" },
        bp: { title: "Level 3 BP Competitive Track", tag: "Ages 13+ · 2+ years", detail: "Extensions, POIs, rapid analysis, and university-style British Parliamentary debating.", cta: "Apply for Debate →" },
        level4: { title: "Level 4 Advanced Debate Seminar", tag: "Ages 15+ · 5+ years", detail: "Advanced case-building, matter-loading, weighing, and tournament-ready refinement.", cta: "Apply for Debate →" },
      };

  const backupCourses = {
    placement: ["level1", "bioethics"],
    level1: ["level2", "bioethics"],
    level2: ["wsdc", "bp"],
    bioethics: ["level2", "wsdc"],
    wsdc: ["bp", "level4"],
    bp: ["wsdc", "level4"],
    level4: ["wsdc", "bp"],
  };

  function buildCourseMatch(answers) {
    const age13 = answers.age === "13-14" || answers.age === "15plus";
    const age15 = answers.age === "15plus";
    const beginner = answers.experience === "none" || answers.experience === "basic";
    const experienced = answers.experience === "twoPlus" || answers.experience === "fivePlus";
    const science = answers.goal === "bioethics" || answers.format === "bioethics";
    let key = "level1";
    if (answers.age === "under9") key = "placement";
    else if (age15 && answers.experience === "fivePlus") key = "level4";
    else if (science) key = age13 ? "bioethics" : "placement";
    else if (answers.goal === "research" && age13 && !beginner) key = "level2";
    else if ((answers.goal === "wsdc" || answers.format === "wsdc") && age13 && experienced) key = "wsdc";
    else if ((answers.goal === "bp" || answers.format === "bp") && age13 && experienced) key = "bp";
    else if (answers.experience === "oneYear" || (!beginner && !experienced)) key = "level2";
    else if (experienced && age15 && answers.intensity === "intensive") key = "level4";
    else if (experienced && age13) key = answers.format === "bp" ? "bp" : "wsdc";

    const reasonMap = isZh
      ? {
          placement: "你的資料需要由團隊協助判斷最合適安排；這個結果不代表保證分班。",
          level1: "你目前最需要一個清晰、低壓但有系統的辯論起點。",
          level2: "你已經適合進入更快節奏，強化反駁、分析與論證結構。",
          bioethics: "你的興趣集中在科學、醫學與倫理，符合 Bioethics 課程方向。",
          wsdc: "你已有足夠經驗，可集中訓練 World Schools 五分鐘演講與策略。",
          bp: "你偏好快速分析、extensions 與 POI，適合 BP 競技訓練。",
          level4: "你的年齡和經驗顯示已適合高階、賽事導向的訓練。",
        }
      : {
          placement: "Your answers need a closer team placement decision; this is guidance, not a guaranteed cohort assignment.",
          level1: "You need a clear, low-pressure but structured starting point for debate.",
          level2: "You are ready for a faster pace with more rebuttal, analysis, and argument structure.",
          bioethics: "Your interests point toward science, medicine, and ethics, which fits the Bioethics course.",
          wsdc: "You have enough experience to focus on World Schools five-minute speeches and strategy.",
          bp: "Your preferences fit rapid analysis, extensions, and POIs in BP debate.",
          level4: "Your age and experience point toward an advanced, tournament-ready track.",
        };

    return {
      key,
      primary: finderCourses[key],
      reason: reasonMap[key],
      backups: (backupCourses[key] || []).map((item) => finderCourses[item]).slice(0, 2),
    };
  }

  function CourseFinder({ compact = false }) {
    const [answers, setAnswers] = useStoredState("dcCourseFinder:v1", courseFinderDefaultAnswers);
    const match = buildCourseMatch({ ...courseFinderDefaultAnswers, ...answers });
    const setAnswer = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
    const resetFinder = () => {
      removeStored("dcCourseFinder:v1");
      setAnswers(courseFinderDefaultAnswers);
    };
    return h(
      "div",
      { className: "finder-shell" },
      h(
        "div",
        { className: "finder-grid" },
        h(
          "div",
          null,
          h("div", { className: "compact-meta" }, isZh ? "課程配對" : "Course Finder"),
          h("h2", { className: "serif", style: { fontSize: compact ? 34 : 42, lineHeight: 1.08, marginBottom: 12 } }, isZh ? "尋找到最適合你的課程" : "Find Your Best-Fit Course"),
          h("p", { style: { marginBottom: 22, color: "rgba(17,29,60,.64)", lineHeight: 1.7 } }, isZh ? "回答幾條問題，即時獲得建議課程。最終分班仍會由 DebateCraft 團隊確認。" : "Answer a few questions for an instant recommendation. Final placement is still confirmed by the DebateCraft team."),
          courseFinderQuestions.map((question) =>
            h(
              "div",
              { className: "finder-question", key: question.key },
              h("h3", null, question.title),
              h(
                "div",
                { className: "choice-grid" },
                question.options.map(([value, label]) => h("button", { key: value, className: `choice-btn${answers[question.key] === value ? " active" : ""}`, onClick: () => setAnswer(question.key, value) }, label))
              )
            )
          ),
          h("button", { className: "link-btn", onClick: resetFinder }, isZh ? "清除配對資料" : "Clear finder data")
        ),
        h(
          "aside",
          { className: "finder-result", "aria-live": "polite" },
          h("h3", null, match.primary.title),
          h("p", null, match.reason),
          h("p", { style: { marginTop: 12 } }, match.primary.detail),
          h("div", { className: "backup-list" }, match.backups.map((course) => h("div", { className: "backup-item", key: course.title }, h("strong", null, course.title), h("div", { style: { fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 4 } }, course.tag)))),
          h("div", { className: "finder-actions" }, h(Button, { href: STUDENT_FORM_URL }, match.primary.cta), h(Button, { href: isZh ? "cnresources.html" : "resources.html", ghost: true }, isZh ? "練習工具" : "Practice Toolkit"))
        )
      )
    );
  }

  function CourseFinderSection({ cream = false }) {
    return h(Section, { cream }, h(CourseFinder));
  }

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
          title: "Level 3 WSDC Mastery",
          tag: "Level 3 · WSDC · 13歲以上 · 2年以上",
          text: "由香港 WSDC 團隊成員教授，適合已有兩年以上經驗、希望掌握五分鐘演講與 World Schools 策略的高表現辯手。",
          accent: "#dc2626",
          details: ["10 節兩小時專項課程", "每班最多 10 人", "訓練 style、content 和 strategic preparation", "對標國際賽事標準"],
        },
        {
          title: "Level 3 BP Competitive Track",
          tag: "Level 3 · BP · 13歲以上 · 2年以上",
          text: "面向有至少兩年經驗的學生，訓練大學式 British Parliamentary 快節奏辯論和有衝擊力的五分鐘演講。",
          accent: SKY,
          details: ["10 節兩小時課程", "每班最多 8 人", "密集訓練 extensions 和 POI 技巧", "另設 Saturday Lab，整個夏天每週與積極的同儕練習 BP"],
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
          text: "Younger beginners learn logic, Socratic questioning, PEEL, and public speaking in a small group.",
          accent: ORANGE,
          details: ["13 sessions", "PEEL argumentation method", "Mock debates on topics such as banning homework or single-use plastics", "1-on-1 coaching meetings during the first two weeks", "Small cohort of 8 students"],
        },
        {
          title: "Level 2 Intermediate Debate",
          tag: "Level 2 · Prior DebateCraft or up to 1 year",
          text: "For older students or Level 1 graduates. Sessions move faster and add rebuttal, motion analysis, and more complex cases.",
          accent: "#e07b2a",
          details: ["Structured argumentation at a higher level", "Sharper rebuttal technique", "Strategic motion analysis", "Strict limit of 10 students per class"],
        },
        {
          title: "Level 3 WSDC Mastery",
          tag: "Level 3 · WSDC · Ages 13+ · 2+ years",
          text: "Hong Kong WSDC team members teach five-minute speeches, comparative weighing, role fulfilment, and tournament strategy.",
          accent: "#dc2626",
          details: ["10 specialized two-hour sessions", "Maximum of 10 students", "Style, content, and strategic preparation", "Training modeled on international championship standards"],
        },
        {
          title: "Level 3 BP Competitive Track",
          tag: "Level 3 · British Parliamentary · Ages 13+ · 2+ years",
          text: "Students practice five-minute BP speeches, extensions, POIs, rapid analysis, and receive individual feedback.",
          accent: SKY,
          details: ["10 two-hour sessions", "Strict limit of 8 students per class", "Extensions and POI techniques", "Optional Saturday Lab for weekly summer BP practice against motivated peers"],
        },
        {
          title: "Level 4 Advanced Debate Seminar",
          tag: "Level 4 · Ages 15+ · 5+ years",
          text: "For debaters with five or more years of experience and a tournament record. Sessions focus on case-building for international competition.",
          accent: "#4f46e5",
          details: ["For students already delivering sophisticated 8-minute speeches", "Deep matter-loading", "Advanced strategic weighing and motion analysis", "Tournament-focused seminar"],
        },
      ];

  function GlobalMap() {
    const [visible, setVisible] = useState(false);
    const mapRef = useRef(null);
    const sectionRef = useRef(null);
    const pins = isZh
      ? [
          { name: "孟加拉國", lat: 23.685, lon: 90.356, flag: "🇧🇩", labelDir: "above" },
          { name: "加拿大", lat: 56.13, lon: -106.347, flag: "🇨🇦", labelDir: "above" },
          { name: "中國", lat: 35.861, lon: 104.195, flag: "🇨🇳", labelDir: "above" },
          { name: "加納", lat: 7.946, lon: -1.023, flag: "🇬🇭", labelDir: "below" },
          { name: "香港", lat: 22.319, lon: 114.169, flag: "🇭🇰", labelDir: "above" },
          { name: "印度", lat: 20.594, lon: 78.963, flag: "🇮🇳", labelDir: "below" },
          { name: "日本", lat: 36.205, lon: 138.253, flag: "🇯🇵", labelDir: "above" },
          { name: "馬來西亞", lat: 4.211, lon: 101.976, flag: "🇲🇾", labelDir: "below", pinDx: -8, labelDx: -18 },
          { name: "尼日利亞", lat: 9.082, lon: 8.675, flag: "🇳🇬", labelDir: "below" },
          { name: "巴基斯坦", lat: 30.375, lon: 69.345, flag: "🇵🇰", labelDir: "above" },
          { name: "秘魯", lat: -9.19, lon: -75.015, flag: "🇵🇪", labelDir: "below" },
          { name: "菲律賓", lat: 12.88, lon: 121.774, flag: "🇵🇭", labelDir: "above" },
          { name: "新加坡", lat: 1.352, lon: 103.82, flag: "🇸🇬", labelDir: "above", pinDx: 8, labelDx: 18 },
          { name: "南非", lat: -30.56, lon: 22.938, flag: "🇿🇦", labelDir: "below" },
          { name: "斯里蘭卡", lat: 7.873, lon: 80.772, flag: "🇱🇰", labelDir: "above" },
          { name: "匈牙利", lat: 47.162, lon: 19.503, flag: "🇭🇺", labelDir: "above" },
          { name: "英國", lat: 55.378, lon: -3.436, flag: "🇬🇧", labelDir: "above" },
          { name: "美國", lat: 37.09, lon: -95.713, flag: "🇺🇸", labelDir: "below" },
          { name: "越南", lat: 14.058, lon: 108.277, flag: "🇻🇳", labelDir: "below" },
        ]
      : [
          { name: "Bangladesh", lat: 23.685, lon: 90.356, flag: "🇧🇩", labelDir: "above" },
          { name: "Canada", lat: 56.13, lon: -106.347, flag: "🇨🇦", labelDir: "above" },
          { name: "China", lat: 35.861, lon: 104.195, flag: "🇨🇳", labelDir: "above" },
          { name: "Ghana", lat: 7.946, lon: -1.023, flag: "🇬🇭", labelDir: "below" },
          { name: "Hong Kong", lat: 22.319, lon: 114.169, flag: "🇭🇰", labelDir: "above" },
          { name: "India", lat: 20.594, lon: 78.963, flag: "🇮🇳", labelDir: "below" },
          { name: "Japan", lat: 36.205, lon: 138.253, flag: "🇯🇵", labelDir: "above" },
          { name: "Malaysia", lat: 4.211, lon: 101.976, flag: "🇲🇾", labelDir: "below", pinDx: -8, labelDx: -18 },
          { name: "Nigeria", lat: 9.082, lon: 8.675, flag: "🇳🇬", labelDir: "below" },
          { name: "Pakistan", lat: 30.375, lon: 69.345, flag: "🇵🇰", labelDir: "above" },
          { name: "Peru", lat: -9.19, lon: -75.015, flag: "🇵🇪", labelDir: "below" },
          { name: "Philippines", lat: 12.88, lon: 121.774, flag: "🇵🇭", labelDir: "above" },
          { name: "Singapore", lat: 1.352, lon: 103.82, flag: "🇸🇬", labelDir: "above", pinDx: 8, labelDx: 18 },
          { name: "South Africa", lat: -30.56, lon: 22.938, flag: "🇿🇦", labelDir: "below" },
          { name: "Sri Lanka", lat: 7.873, lon: 80.772, flag: "🇱🇰", labelDir: "above" },
          { name: "Hungary", lat: 47.162, lon: 19.503, flag: "🇭🇺", labelDir: "above" },
          { name: "United Kingdom", lat: 55.378, lon: -3.436, flag: "🇬🇧", labelDir: "above" },
          { name: "United States", lat: 37.09, lon: -95.713, flag: "🇺🇸", labelDir: "below" },
          { name: "Vietnam", lat: 14.058, lon: 108.277, flag: "🇻🇳", labelDir: "below" },
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
                const [x0, y0] = coords;
                const x = x0 + (pin.pinDx || 0);
                const y = y0 + (pin.pinDy || 0);
                const above = pin.labelDir === "above";
                const group = svg.append("g").attr("opacity", 0).style("animation", `pillPop .45s ease ${i * 0.07}s both`);
                group.append("text").attr("x", x).attr("y", y + 6).attr("text-anchor", "middle").attr("font-size", 14).attr("font-family", "Apple Color Emoji, Segoe UI Emoji, sans-serif").text(pin.flag);
                const labelX = x + (pin.labelDx || 0);
                const labelY = y + (above ? -8 : 22) + (pin.labelDy || 0);
                const labelW = pin.name.length * 5.2 + 12;
                group.append("rect").attr("x", labelX - labelW / 2).attr("y", labelY - 9).attr("width", labelW).attr("height", 12).attr("rx", 3).attr("fill", "rgba(13,23,48,.82)");
                group.append("text").attr("x", labelX).attr("y", labelY).attr("text-anchor", "middle").attr("fill", "rgba(255,255,255,.9)").attr("font-size", 7.5).attr("font-family", "DM Sans, sans-serif").attr("font-weight", 600).text(pin.name);
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
            h("h2", { className: "serif", style: { fontSize: "clamp(34px, 6vw, 44px)", fontWeight: 800, color: WHITE, lineHeight: 1.08 } }, isZh ? "學生來自" : "Students Join From ", h("em", { style: { color: SKY, fontStyle: "italic" } }, isZh ? "19 個國家及地區。" : "19 Countries."))
          ),
          h(
            "div",
            { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" } },
            [["19", isZh ? "國家及地區" : "Countries"], ["400+", isZh ? "學生" : "Students"], ["450+", isZh ? "教學時數" : "Hours Taught"], [isZh ? "學生營運" : "Student-run", isZh ? "非牟利" : "Nonprofit"]].map(([number, label], i) =>
              h("div", { key: label, style: { textAlign: "center", minWidth: 90 } }, h("div", { className: "serif", style: { fontSize: 36, fontWeight: 800, color: [ORANGE, SKY, WHITE, ORANGE][i] } }, number), h("div", { style: { fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.42)", letterSpacing: ".08em", textTransform: "uppercase" } }, label))
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
          "DebateCraft 為學校提供有結構的辯論課程、形成性回饋及賽事準備。",
          "我們由初中梯隊開始，建立分析、立論、反駁、演說及賽後檢討習慣，再逐步進入 WSDC 及 BP。",
          "團隊帶來香港、亞洲及國際賽事經驗；課程以學習成果、評估證據及校內交接為重點。",
        ]
      : [
          "DebateCraft provides schools with structured debate curriculum, formative feedback, and competition preparation.",
          "We start with the junior bench: analysis, case construction, rebuttal, delivery, and disciplined round review. Students then progress into WSDC and BP.",
          "Our team brings experience from Hong Kong, Asian, and global circuits. The curriculum records learning outcomes, assessment evidence, and handover requirements.",
        ];
    const learningCards = isZh
      ? [
          ["辯論與溝通", "學生練習清晰推理、認真聆聽及具說服力的溝通。", ORANGE],
          ["香港領導與 Team HK 經驗", "顧問 Sandeep Chulani 曾任 Team HK 教練及選拔人、香港學校辯論及演講社區主席，亦是 HKBPDC 聯合創辦人。團隊亦包括香港 WSDC 發展梯隊成員。", SKY],
          ["科學與倫理", "生物倫理將科學問題及倫理反思連結起來。", "#0d9488"],
        ]
      : [
          ["Debate & Communication", "Students practice clear reasoning, careful listening, and persuasive communication.", ORANGE],
          ["Hong Kong Leadership & Team HK", "Adviser Sandeep Chulani was Coach and Selector of Team HK and formerly chaired Hong Kong Schools Debating and Public Speaking Community. He also co-founded HKBPDC. Team includes Hong Kong WSDC Development Team members.", SKY],
          ["Science & Ethics", "Bioethics connects scientific questions with ethical reflection.", "#0d9488"],
        ];

    return h(
      React.Fragment,
      null,
      h(PageHeader, {
        eyebrow: isZh ? "競技教育" : "Competitive Education",
        title: isZh ? "強隊需要" : "Strong Teams Need",
        emphasis: isZh ? "一套系統。" : "a System.",
        subtitle: isZh ? "為香港及亞洲學校建立初中梯隊、賽事訓練及校內交接。" : "Junior-team foundations, competition preparation, and institutional handover for schools across Hong Kong and Asia.",
      }),
      h(
        Section,
        null,
        h("div", { className: "grid grid-2", style: { alignItems: "start" } },
          h(TitleBlock, { eyebrow: isZh ? "課程目標" : "Program objectives", title: isZh ? "建立初中" : "Junior-team", emphasis: isZh ? "競技梯隊。" : "development.", lead: isZh ? "以課程內容、形成性回饋及評估記錄，支援學校提供通往賽事的有結構訓練。" : "Use curriculum content, formative feedback, and assessment records to support structured training towards competition." }),
          h("div", { className: "card", style: { "--accent": ORANGE } }, missionParagraphs.map((paragraph) => h("p", { key: paragraph, style: { marginBottom: 14 } }, paragraph)))
        )
      ),
      h(GlobalMap),
      h(ProofGallerySection, {
        set: "mission",
        eyebrow: isZh ? "訓練實況" : "Training in Action",
        title: isZh ? "由講解到" : "From Instruction",
        emphasis: isZh ? "實戰回饋。" : "to Round Review.",
        lead: isZh ? "真實線上小班畫面，展示講解、限時練習、對賽與回饋如何連成一套訓練。" : "Real cohort visuals showing instruction, timed drills, practice rounds, and feedback as one training system.",
      }),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "訓練內容" : "What Students Practice", title: isZh ? "分析、表達與" : "Reasoning, Speaking and", emphasis: isZh ? "賽後修正。" : "Round Review.", center: true }),
        h(
          "div",
          { className: "grid grid-3" },
          learningCards.map(([title, text, accent]) => h(InfoCard, { key: title, title, text, accent }))
        )
      ),
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
        eyebrow: isZh ? "網上小班" : "Live Group Classes",
        title: isZh ? "按程度選擇" : "Choose the Right",
        emphasis: isZh ? "辯論課程。" : "Group Class.",
        subtitle: isZh ? "為個別學生而設的小班課程，包括辯論基礎、WSDC、BP、賽事準備與生物倫理。學校如需要完整培訓體系，請查看校本培訓路線。" : "Small live cohorts for individual students in debate foundations, WSDC, BP, competition preparation, and bioethics. Schools seeking a full program should use the DebateCraft Method for Schools.",
      }),
      h(StatsBand, { stats: commonStats }),
      h(CourseFinderSection),
      h(ProofGallerySection, {
        set: "offerings",
        cream: true,
        eyebrow: isZh ? "課程成果" : "Course Proof",
        title: isZh ? "由課堂走向" : "From Course Work",
        emphasis: isZh ? "學生進度。" : "to Progress.",
        lead: isZh ? "以中性課堂畫面呈現練習、完成和學習進度；未加入未核實的成果或引言。" : "Neutral classroom visuals showing practice, completion, and learning progress without adding unverified outcomes or quotes.",
      }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "現有小班" : "Available Classes", title: isZh ? "選擇適合你的" : "Find the Right", emphasis: isZh ? "班別。" : "Class.", center: true }),
        h(
          "div",
          { className: "grid grid-2" },
          programs.map((program) =>
            h(
              InfoCard,
              { key: program.title, title: program.title, tag: program.tag, text: program.text, accent: program.accent },
              h("ul", { className: "course-detail-list" }, program.details.map((detail) => h("li", { key: detail }, detail))),
              h("div", { style: { marginTop: 20 } }, h(Button, { href: STUDENT_FORM_URL }, isZh ? "查詢課程 →" : "Inquiry Form →"))
            )
          )
        )
      ),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "小班訓練內容" : "Inside Each Class", title: isZh ? "學生實際練習" : "Students Practice", emphasis: isZh ? "三件事。" : "Three Things.", center: true }),
        h(
          "div",
          { className: "grid grid-3" },
          [
            [isZh ? "演說" : "Speaking", isZh ? "每節都有計時演說與直接回饋。" : "Every session includes timed speeches and direct feedback."],
            [isZh ? "分析" : "Analysis", isZh ? "拆解辯題、找出假設，再建立完整論證。" : "Students break down motions, test assumptions, and build complete arguments."],
            [isZh ? "知識" : "Subject Knowledge", isZh ? "辯題涵蓋國際關係、經濟、政策與倫理。" : "Motions cover international relations, economics, policy, and ethics."],
          ].map(([title, text]) => h(InfoCard, { key: title, title, text }))
        )
      ),
      h(CredibilitySection),
      h(CTA)
    );
  }

  function TrainingPathwayPage() {
    const adminProblems = isZh
      ? [
          ["學生斷層", "資深辯手畢業後，學會無人帶新手，下一屆由零開始。"],
          ["老師時間不足", "負責老師要兼顧課堂、行政與活動，無法逐場查看片或跟進每位學生。"],
          ["新手流失", "招生活動人多，但無清晰分級、固定練習與上場路線，幾星期後開始流失。"],
          ["外援無連貫", "不同外聘教練各自教一套，學生重複學概念，但能力無法逐年累積。"],
          ["賽前先救火", "報名後先發現隊伍未齊、角色未定、即席準備與賽後檢討都未建立。"],
        ]
      : [
          ["Graduation resets the team", "Senior debaters leave. Junior students inherit no shared method, curriculum, or leadership pipeline."],
          ["Teacher capacity is limited", "Activities staff coordinate students and tournaments but cannot review every round or coach every skill."],
          ["Mixed readiness stalls progress", "Beginners and experienced debaters share one room, so neither group receives the right level of work."],
          ["External coaching fragments", "Separate workshops create activity without a common syllabus, baseline, or year-on-year progression."],
          ["Competition becomes emergency prep", "Schools enter tournaments before roles, prep routines, and review habits are stable."],
        ];
    const stages = isZh
      ? [
          ["00", "現況審視", "第 1–2 週", "檢視學生人數、年級、經驗、校曆、現有比賽與老師可投入時間。", "分組基準、年度目標、教練責任表"],
          ["01", "共同基礎", "8–12 週", "全體學生建立分析、立論、反駁、演說與有效回饋的共同語言。", "新手完成整篇演說；老師查看到清晰能力記錄"],
          ["02", "初中梯隊", "一個學期", "按能力分組，以角色輪換、限時準備、練習賽與賽後檢討建立上場能力。", "穩定初中隊、替補名單、學生領袖梯隊"],
          ["03", "賽事周期", "每項賽事前 6–10 週", "對準賽制、辯題類型、選手角色與實際賽程，集中處理最影響勝負的短板。", "選隊依據、賽前計劃、每場賽後行動項目"],
          ["04", "校內延續", "每年檢討", "將課綱、評核、學生領袖工作與老師監察點留在學校，而不是只留在某位教練。", "下一屆不需要由零開始"],
        ]
      : [
          ["00", "Baseline audit", "Weeks 1–2", "Map roster size, age, experience, school calendar, target competitions, and staff capacity.", "Placement bands, annual objectives, coach responsibility map"],
          ["01", "Shared foundations", "8–12 weeks", "Create one language for analysis, case construction, rebuttal, delivery, and useful feedback.", "Beginners deliver complete speeches; staff receive visible skill records"],
          ["02", "Junior squad", "One term", "Group by readiness. Rotate roles through limited preparation, practice rounds, and disciplined review.", "Reliable junior team, reserve bench, emerging student leaders"],
          ["03", "Competition cycle", "6–10 weeks per event", "Align training to format, motion profile, speaker roles, and tournament calendar.", "Selection evidence, tournament plan, post-round action items"],
          ["04", "Institutional handover", "Annual review", "Leave curriculum, assessment, leadership roles, and staff checkpoints inside the school.", "Next cohort starts ahead instead of starting over"],
        ];
    const delivery = isZh
      ? [
          ["每週教練節奏", "固定技巧教學、限時練習、對賽、個別回饋；每節有明確重點，不靠即興工作坊。"],
          ["老師只查看關鍵資料", "簡短出席、能力與下一步記錄，減少老師追問每位學生進度的行政負擔。"],
          ["分級但保持流動", "學生按能力進入適合組別，達標後可以升級，避免永久標籤或資源只集中在明星隊員。"],
          ["線上優先", "5至10人直播小班，可按校曆安排每週課堂或隔週兩小時課堂；開課前確認時區、考試日期與平台。"],
          ["交給學校的資料", "出席、能力檢查、練習賽筆記、學生下一步與賽前計劃，方便負責老師掌握進度。"],
        ]
      : [
          ["Weekly coaching rhythm", "Skill instruction, timed drills, rounds, and individual feedback. Every session has a defined job."],
          ["Light staff oversight", "Short attendance, skill, and next-step records give school leads visibility without asking them to coach every round."],
          ["Flexible progression", "Students enter at the right level and move when evidence supports it. Resources do not stay locked around senior stars."],
          ["Online by default", "Live cohorts of 5–10 students can meet weekly or fortnightly for two hours. We confirm timezone, exam dates, platform, and school contact before launch."],
          ["School-ready records", "Staff receive attendance, skill checkpoints, round notes, student next steps, and a competition-prep plan."],
        ];
    const regionalFit = isZh
      ? [
          ["香港", "對應課外活動及全方位學習：先列明學習目標、課堂時段、負責老師與可交給學校的進度資料。"],
          ["新加坡", "按 CCA 方式規劃：負責老師、學期時段、出席、人數、試堂或選拔安排、目標賽事。"],
          ["馬來西亞", "對準 WSDC、WIDPSC 或校際賽事：確認賽制、隊伍角色、選拔依據、訓練周期與賽前目標。"],
        ]
      : [
          ["Hong Kong", "Fit life-wide learning and co-curricular planning: state learning objectives, timetable, staff contact, and evidence the school can retain."],
          ["Singapore", "Use a CCA brief: teacher-in-charge, term slot, attendance, cohort size, trial or selection process, and target competition."],
          ["Malaysia", "Align to WSDC, WIDPSC, or school competitions: confirm format, speaker roles, selection evidence, training cycle, and tournament goal."],
        ];
    return h(
      React.Fragment,
      null,
      h(PageHeader, {
        eyebrow: isZh ? "DebateCraft 校本方法" : "DebateCraft Method for Schools",
        title: isZh ? "學校需要" : "Schools need the",
        emphasis: isZh ? "DebateCraft 方法。" : "DebateCraft Method for Schools.",
        subtitle: isZh ? "為香港、馬來西亞及新加坡學校負責教師而設：以線上教練配合校曆、課外活動、賽制及教師可用時間。" : "Online coaching for school leads in Hong Kong, Malaysia, and Singapore, aligned to timetable, club structure, competition format, and staff capacity.",
      }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "我們要解決甚麼？" : "What are we solving?", title: isZh ? "讓校隊不再" : "The problems behind", emphasis: isZh ? "每年重新開始。" : "a reset each year.", lead: isZh ? "DebateCraft 方法將學生進度、練習節奏、賽事準備及校內交接連成一套可延續的方法。" : "The DebateCraft Method for Schools connects student progression, coaching rhythm, competition preparation, and school handover into one repeatable method.", center: true }),
        h("div", { className: "pathway-problems" }, adminProblems.map(([title, text], index) => h("article", { key: title }, h("span", null, String(index + 1).padStart(2, "0")), h("h3", null, title), h("p", null, text))))
      ),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "課程範圍及次序" : "Scope and sequence", title: isZh ? "由基礎進入" : "From foundations", emphasis: isZh ? "校隊梯隊。" : "to squad development.", lead: isZh ? "每個階段均列明時間、教學內容、教練工作及可檢視的評估證據。" : "Each stage specifies timing, curriculum content, coaching work, and assessable evidence." }),
        h("div", { className: "pathway-steps" }, stages.map(([number, title, timing, work, output]) => h("article", { key: number }, h("div", { className: "pathway-step-index" }, number), h("div", null, h("span", { className: "pathway-timing" }, timing), h("h3", null, title)), h("p", null, work), h("p", { className: "pathway-output" }, h("strong", null, isZh ? "交付：" : "Output: "), output))))
      ),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "交付及評估" : "Delivery and assessment", title: isZh ? "可靠的" : "Proven", emphasis: isZh ? "交付記錄。" : "Delivery Record.", center: true }),
        h("div", { className: "grid grid-3" }, delivery.map(([title, text]) => h(InfoCard, { key: title, title, text })))
      ),
      h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "學校合作" : "School partnership", title: isZh ? "我們理解學校" : "We understand", emphasis: isZh ? "需要。" : "what you need.", lead: isZh ? "我們先了解學校的課外活動安排、學生組成、教師聯絡方式及目標賽事，再安排合適的線上教練及進度記錄。" : "We begin with your co-curricular structure, student profile, staff contact, and competition goals before setting the coaching and reporting arrangement.", center: true }),
        h("div", { className: "grid grid-3" }, regionalFit.map(([title, text]) => h(InfoCard, { key: title, title, text })))
      ),
      h(
        Section,
        { dark: true },
        h(TitleBlock, { eyebrow: isZh ? "評判與培訓視角" : "Judging and Training Perspective", title: isZh ? "教練知道評判" : "Coaching Informed by", emphasis: isZh ? "如何判一場辯論。" : "How Rounds Are Judged.", lead: isZh ? "除了競賽成績，DebateCraft 亦將高水平評判與培訓經驗帶入課綱、練習賽與賽後檢討。" : "Competition results matter. So does understanding how adjudicators evaluate framing, contribution, comparison, and team strategy.", dark: true }),
        h("div", { className: "grid grid-3" }, [
          ["Mr. Sandeep Chulani", isZh ? "DebateCraft 顧問；曾任 Team HK 教練及選拔人；前香港學校辯論及演講社區主席；HKBPDC 聯合創辦人。" : "DebateCraft adviser; former Coach and Selector of Team HK; former Chair of Hong Kong Schools Debating and Public Speaking Community; HKBPDC co-founder."],
          ["Adrian Chan", isZh ? "2026年 IIUM IDC 及 HKEDO 評判；將評判標準轉化成清晰練習與賽後行動。" : "Judge at IIUM IDC 2026 and HKEDO; translates adjudication standards into drills and post-round actions."],
          ["Theodore W", isZh ? "2024年重慶 WSDC 工作坊導師及 2025年南京 WSDC 評判，兼具培訓與賽場視角。" : "Trainer at Chongqing WSDC Workshop 2024 and judge at Nanjing WSDC 2025, bringing both training and adjudication perspective."],
          ["Matthew Wong", isZh ? "曾帶領 Winchester College 辯論社訓練校隊；具 BP、評判及執教經驗。" : "Led Winchester College's Debate Society; brings BP, adjudication, and coaching experience."],
          ["Rachel Rhodes", isZh ? "帶領德瑞國際學校辯論隊；2026年香港初中學校辯論比賽準決賽及第七名最佳辯手。" : "Leads the German Swiss International School Debate Team; 2026 Hong Kong Junior Schools semifinalist and 7th best speaker."],
          ["Valmik Dagayach", isZh ? "香港代表隊發展梯隊成員；2026年美國全國賽公開組第二名最佳辯手、牛津 WSDC U17 冠軍，並已教授 DebateCraft 超過50小時。" : "Team Hong Kong Development Squad member; 2nd open speaker at US Nationals 2026, Oxford WSDC U17 winner, and 50+ DebateCraft teaching hours."],
        ].map(([title, text]) => h(InfoCard, { key: title, title, text, dark: true })))
      ),
      h(CTA)
    );
  }

  function BiologyPage() {
    const courseTitle = isZh ? "生物倫理：科學與醫學未來" : "Bioethics: Science and Future of Medicine";
    const logistics = isZh
      ? [
          ["教練團隊", "由 Phillips Exeter 學生帶領，包括 USABO 前約 500 名參賽者、醫學期刊作者與 Scholastic Writing Awards 決賽級寫作者。", ORANGE],
          ["課程安排", "10 節一小時課程，處理科學家和醫療專業人士面對的倫理難題。", SKY],
          ["小班教學", "每班嚴格限制 10 人，確保每位學生都能深入參與討論。", "#0d9488"],
          ["年齡要求", "專為 13 歲以上、對醫學、法律或哲學有興趣的學生設計。", "#764ba2"],
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
          ["研究與寫作", "課程訓練學生把科學概念轉化成清晰、有證據、有倫理框架的研究或評論文章。"],
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
              "Lesson 3: 兩場 Harkness 討論：「我們應否檢測胚胎疾病？」及另一個由班級選定題目",
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
      h(PageHeader, { eyebrow: isZh ? "科學、倫理與未來醫學" : "Science, Ethics, and Future Medicine", title: courseTitle, subtitle: isZh ? "由 Phillips Exeter 學生帶領，訓練學生理解現代生物、遺傳學和醫療科技背後的倫理問題。" : "A discussion, writing, and research course on the ethical questions raised by modern biology, genetics, and medical technology." }),
      h(StatsBand, { stats: commonStats }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "課程描述" : "Course Description", title: isZh ? "分析科學決定" : "Study Scientific", emphasis: isZh ? "及其後果。" : "Decisions.", lead: isZh ? "學生討論基因編輯、人工智能醫療、醫療決策與科研責任。課堂採用 Phillips Exeter Academy 的 Harkness Discussion 方法，再將討論發展成寫作與最後項目。" : "Students discuss gene editing, AI in healthcare, medical decisions, and scientific responsibility. Classes use the Harkness Discussion method developed at Phillips Exeter Academy, then turn that discussion into writing and a final project." }),
        h("div", { className: "grid grid-3" }, logistics.map(([title, text, accent]) => h(InfoCard, { key: title, title, text, accent }))),
        h("div", { style: { textAlign: "center", marginTop: 34 } }, h(Button, { href: STUDENT_FORM_URL }, isZh ? "申請生物倫理 →" : "Apply for Bioethics →"))
      ),
      h(
        Section,
        { dark: true },
        h(TitleBlock, { eyebrow: isZh ? "學生作品" : "Student Work", title: isZh ? "完成研究或" : "Produce a Research or", emphasis: isZh ? "評論文章。" : "Review Paper.", lead: isZh ? "學生將最後項目整理成研究或評論文章。合適作品可以再修改，提交 Scholastic argumentative writing 或其他科學及倫理比賽。" : "Students turn the final project into a research or review paper. Suitable work can be revised for Scholastic argumentative writing or another science and ethics competition.", dark: true }),
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
      h(CredibilitySection),
      h(CTA)
    );
  }

  function OtherProgramsPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "即將推出" : "Coming Soon", title: isZh ? "更多學習路徑" : "More Programs", emphasis: isZh ? "籌備中。" : "In Development.", subtitle: isZh ? "我們正設計更多公開演說、研究與跨學科課程。" : "We are developing additional public speaking, research, and interdisciplinary programs." }), h(Section, null, h("div", { className: "grid grid-3" }, [h(InfoCard, { key: 1, title: isZh ? "公開演說" : "Public Speaking", text: isZh ? "聲線、節奏、語氣與台風訓練。" : "Voice, pacing, tone, and presence training." }), h(InfoCard, { key: 2, title: isZh ? "研究工作坊" : "Research Workshops", text: isZh ? "尋找資料、評估來源、整理證據。" : "Source discovery, evidence evaluation, and card cutting.", accent: SKY }), h(InfoCard, { key: 3, title: isZh ? "跨學科議題" : "Interdisciplinary Issues", text: isZh ? "連結倫理、科學、政策與社會議題。" : "Ethics, science, policy, and society.", accent: "#0d9488" })])), h(CTA));
  }

  function TeamPage() {
    const [members, setMembers] = useState([]);
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(null);
    const [loadError, setLoadError] = useState(false);
    useEffect(() => {
      const clean = (data) => data.filter((member) => member.name !== "Aarohan S").map((member) => ({
        ...member,
        bio: typeof member.bio === "string" ? member.bio.replace("programme administration", "program administration") : member.bio,
      }));
      const embedded = document.getElementById("dc-team-data");
      const dataUrl = `${assetPrefix}${isZh ? "data/cnteam_members.json" : "data/team_members.json"}?v=team-20260817`;
      fetch(dataUrl)
        .then((r) => {
          if (!r.ok) throw new Error(`Team data request failed: ${r.status}`);
          return r.json();
        })
        .then((data) => {
          if (!Array.isArray(data)) throw new Error("Team data is not an array");
          setMembers(clean(data));
          setLoadError(false);
        })
        .catch(() => {
          try {
            const data = embedded ? JSON.parse(embedded.textContent || "[]") : [];
            if (Array.isArray(data) && data.length) {
              setMembers(clean(data));
              return;
            }
          } catch {
            // Use basic contact records below.
          }
          setLoadError(true);
          setMembers([
            { name: "Adrian Chan", role: "", image: "Images/Adrian.png", categories: ["executive", "coaching"], bio: isZh ? "DebateCraft 創辦成員之一。" : "One of DebateCraft's student leaders." },
            { name: "Gavin Zhao", role: "", image: "Images/Gavin.png", categories: ["executive", "prepared"], bio: isZh ? "DebateCraft 學生團隊成員。" : "A DebateCraft student team member." },
          ]);
        });
    }, []);

    // Deep-link in: open the matching member's modal from the URL hash once members load.
    useEffect(() => {
      if (!members.length) return;
      const openFromHash = () => {
        const hash = window.location.hash.replace(/^#member-/, "");
        if (!hash) return;
        const match = members.find((m) => slugify(m.name) === hash);
        if (match) setActive(match);
      };
      openFromHash();
      window.addEventListener("hashchange", openFromHash);
      return () => window.removeEventListener("hashchange", openFromHash);
    }, [members]);

    // Deep-link out + Esc-to-close + scroll-lock while a modal is open.
    useEffect(() => {
      if (!active) return;
      const memberHash = `#member-${slugify(active.name)}`;
      window.history.replaceState(null, "", memberHash);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") setActive(null);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKey);
        if (window.location.hash === memberHash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      };
    }, [active]);

    const publicRole = (member) => {
      if (member.name !== "Sandeep Chulani") return null;
      return isZh ? "DebateCraft 顧問" : "Adviser to DebateCraft";
    };
    const roleFor = (member) => publicRole(member) || member.role || null;
    const filters = [
      ["all", isZh ? "全部" : "All"],
      ["coaching", isZh ? "教練" : "Coaching"],
      ["hk", isZh ? "香港" : "Hong Kong"],
      ["epi", isZh ? "生物倫理" : "Bioethics"],
    ];
    const byCategory = filter === "all" ? members : members.filter((m) => (m.categories || []).includes(filter));
    const q = query.trim().toLowerCase();
    const visible = q ? byCategory.filter((m) => String(m.name || "").toLowerCase().includes(q)) : byCategory;

    return h(
      React.Fragment,
      null,
      h(PageHeader, { eyebrow: isZh ? "教練、評判與成績" : "Coaches, Judges & Results", title: isZh ? "競賽與評判經驗" : "Coaching and judging", emphasis: isZh ? "記錄。" : "record.", subtitle: isZh ? "團隊結合香港、亞洲及全球賽事成績、香港 WSDC 經驗、高水平評判及工作坊培訓。" : "Team members combine Hong Kong, Asian, and global results with Hong Kong WSDC, high-level adjudication, and workshop training experience." }),
      h(
        Section,
        { dark: true },
        h(TitleBlock, { eyebrow: isZh ? "評判與培訓經驗" : "Judging and Training Experience", title: isZh ? "根據評判標準" : "Teach Through the", emphasis: isZh ? "改進辯論。" : "Ballot.", lead: isZh ? "評判經驗令課堂回饋更具體：哪個比較取勝、哪項貢獻改變賽果，以及下一場需要修正的地方。" : "Judging experience makes feedback specific: which comparison won, which contribution changed the round, and what must change next.", dark: true }),
        h("div", { className: "grid grid-3" }, [
          ["Mr. Sandeep Chulani", isZh ? "DebateCraft 顧問；曾任 Team HK 教練及選拔人；前香港學校辯論及演講社區主席；HKBPDC 聯合創辦人。" : "DebateCraft adviser; former Coach and Selector of Team HK; former Chair of Hong Kong Schools Debating and Public Speaking Community; HKBPDC co-founder."],
          ["Adrian Chan", isZh ? "2026年 IIUM IDC 及 HKEDO 評判；將評判標準轉化成訓練與賽後行動。" : "Judge at IIUM IDC 2026 and HKEDO; translates ballot standards into drills and post-round actions."],
          ["Theodore W", isZh ? "2024年重慶 WSDC 工作坊導師及 2025年南京 WSDC 評判。" : "Trainer at Chongqing WSDC Workshop 2024 and judge at Nanjing WSDC 2025."],
        ].map(([title, text]) => h(InfoCard, { key: title, title, text, dark: true })))
      ),
        h(
        Section,
        { cream: true },
        h(TitleBlock, { eyebrow: isZh ? "成員" : "Members", title: isZh ? "認識我們的" : "Meet Our", emphasis: isZh ? "團隊。" : "Team.", center: true }),
        loadError && h("p", { style: { maxWidth: 680, margin: "0 auto 20px", color: "#d34a32", textAlign: "center" } }, isZh ? "團隊資料未能載入，以下顯示基本聯絡資料。" : "Team data could not be loaded. Showing basic contact records."),
        h(
          "div",
          { style: { maxWidth: 360, margin: "0 auto 18px" } },
          h("input", {
            type: "text",
            className: "team-search",
            placeholder: isZh ? "搜尋姓名…" : "Search by name…",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            "aria-label": isZh ? "搜尋團隊成員姓名" : "Search team members by name",
          })
        ),
        h("div", { className: "filter-row" }, filters.map(([key, label]) => h("button", { key, className: filter === key ? "active" : "", onClick: () => setFilter(key) }, label))),
        !visible.length && h("p", { className: "no-members", style: { textAlign: "center", color: "rgba(17,29,60,.5)" } }, isZh ? "尋找不到相關成員。" : "No team members match your search."),
        h(
          "div",
          { className: "grid grid-3 team-grid" },
          visible.map((m) => {
            const hasAch = Array.isArray(m.achievements) && m.achievements.length > 0;
            const hasBio = Boolean(m.bio) || hasAch;
            return h(
              "article",
              { id: `member-${slugify(m.name)}`, className: "card team-card", key: `${m.name}-${m.role}`, style: { padding: 0, overflow: "hidden" } },
              m.image && h("img", { className: "team-img", src: `../${m.image}`, alt: m.name, onError: (e) => (e.currentTarget.style.display = "none") }),
              h(
                "div",
                { className: "team-card-body", style: { padding: "22px 20px 26px" } },
                h("h3", null, displayName(m.name)),
                roleFor(m) && h("div", { style: { fontSize: 12, fontWeight: 700, color: ORANGE, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 } }, roleFor(m)),
                m.badge && h("div", { className: "team-badge" }, m.badge),
                m.school && h("p", { style: { fontWeight: 700, marginBottom: 10 } }, m.school),
                hasAch && h("ul", { className: "team-achievements" }, m.achievements.map((a, i) => h("li", { key: i }, a))),
                hasBio && h("button", { type: "button", className: "team-bio-btn", onClick: () => setActive(m), "aria-label": isZh ? `查看 ${displayName(m.name)} 完整簡介` : `View full bio for ${displayName(m.name)}` }, isZh ? "完整簡介 →" : "Full bio →")
              )
            );
          })
        )
      ),
      active &&
        h(
          "div",
          { className: "bio-modal-backdrop", onClick: () => setActive(null) },
          h(
            "div",
            { className: "bio-modal", role: "dialog", "aria-modal": "true", "aria-label": displayName(active.name), onClick: (e) => e.stopPropagation() },
            h("button", { type: "button", className: "bio-modal-close", onClick: () => setActive(null), "aria-label": isZh ? "關閉" : "Close" }, "×"),
            active.image && h("img", { className: "bio-modal-img", src: `../${active.image}`, alt: active.name, onError: (e) => (e.currentTarget.style.display = "none") }),
            h("h3", { className: "serif", style: { fontSize: 26, marginBottom: 4 } }, displayName(active.name)),
            roleFor(active) && h("div", { style: { fontSize: 12, fontWeight: 700, color: ORANGE, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 } }, roleFor(active)),
            active.badge && h("div", { className: "team-badge", style: { marginBottom: 10 } }, active.badge),
            active.school && h("p", { style: { fontWeight: 700, marginBottom: 14 } }, active.school),
            Array.isArray(active.achievements) && active.achievements.length > 0 && h("ul", { className: "team-achievements" }, active.achievements.map((a, i) => h("li", { key: i }, a))),
            active.bio && h("p", { style: { marginTop: 16, lineHeight: 1.7, color: "rgba(17,29,60,.7)" } }, active.bio)
          )
        )
    );
  }

  function PartnershipPage() {
    return h(
      React.Fragment,
      null,
      h(PageHeader, { eyebrow: isZh ? "香港學校校本課程" : "School program", title: isZh ? "初中梯隊訓練及" : "Junior squad training", emphasis: isZh ? "課程建立。" : "curriculum delivery.", subtitle: isZh ? "按學生程度、校曆、賽制及教師聯絡安排線上教練、練習賽及進度評估。" : "Online coaching, practice rounds, and progress assessment aligned to student readiness, timetable, debate format, and teacher liaison." }),
      h(
        Section,
        null,
        h(TitleBlock, { eyebrow: isZh ? "課程範圍" : "Program scope", title: isZh ? "現有校隊訓練及" : "Existing-team training", emphasis: isZh ? "新課程建立。" : "new program delivery.", center: true }),
        h("div", { className: "grid grid-2" }, h(InfoCard, { title: isZh ? "初中梯隊訓練" : "Junior-Team Training", text: isZh ? "每週小隊訓練、練習賽回饋、角色分工與賽前集中訓練。" : "Weekly squad coaching, round feedback, role development, and focused preparation before competitions." }), h(InfoCard, { title: isZh ? "新辯論課程" : "New Debate Program", text: isZh ? "由課程設計、招募初學者到進入比賽，並留下下一屆可沿用的課綱與評核。" : "Curriculum, beginner recruitment, coach delivery, and a route into competition, with a syllabus and assessment record for the next cohort.", accent: SKY }))
      ),
      h(ProofGallerySection, {
        set: "partnership",
        cream: true,
        eyebrow: isZh ? "交付及評估" : "Delivery and assessment",
        title: isZh ? "課程內容、練習及" : "Curriculum, practice, and",
        emphasis: isZh ? "進度記錄。" : "progress records.",
        lead: isZh ? "線上小班、固定練習、練習賽檢討及清晰進度，配合現有校隊或新課程。" : "Online cohorts, fixed drills, practice-round review, and progress records for an existing team or new program.",
      }),
      h(CTA)
    );
  }

  const FAQ_ITEMS = [
    {
      q: { en: "Is DebateCraft really free?", zh: "DebateCraft 是咪真是免費？" },
      a: {
        en: "Yes. DebateCraft group classes have no fee, audition, essay, or hidden cost.",
        zh: "是。DebateCraft 所有課程完全免費，無需試鏡、文章，亦無任何隱藏費用。"
      }
    },
    {
      q: { en: "What ages and experience levels can join?", zh: "邊個年齡與程度可以參加？" },
      a: {
        en: "Programs are open to students roughly Grades 3-12 (ages 8-18). Level 1 is designed for beginners with no prior experience, while WSDC, BP, advanced debate, and Bioethics tracks are for students 13+ with some debate background.",
        zh: "課程適合大約 3 至 12 年級（8 至 18 歲）學生。Level 1 專為完全沒有經驗的初學者而設，WSDC、BP、高階辯論與生物倫理課程則適合 13 歲以上、有一定辯論基礎的學生。"
      }
    },
    {
      q: { en: "How do classes work?", zh: "上堂形式是點的？" },
      a: {
        en: "Classes run live online in small groups of 5-10 students, so every student gets real speaking practice and direct feedback from coaches.",
        zh: "所有堂都是線上直播小班教學，每班 5 至 10 人，確保每個學生都有充分練習機會與教練直接的回饋。"
      }
    },
    {
      q: { en: "When does the program run and how do I apply?", zh: "課程幾時開始？如何申請？" },
      a: {
        en: "Summer 2026 runs for eight weeks. New cohorts start most weeks from June through August. The two-minute interest form collects age, experience, and goals for placement.",
        zh: "2026 夏季課程為期八星期，由 6 月到 8 月大部分星期都有新班。兩分鐘申請表會收集年齡、經驗與目標，用作分班。"
      }
    },
    {
      q: { en: "Who teaches the courses?", zh: "哪些導師負責相關課程？" },
      a: {
        en: "Competitive debaters and coaches teach the courses. The instructor team includes Phillips Exeter students, while senior debate educators review parts of the curriculum.",
        zh: "課程由經驗豐富的教練與競技辯手任教，包括來自 Phillips Exeter Academy 的學生，課程亦得到辯論界資深教練的支援。"
      }
    },
    {
      q: { en: "Can I get involved beyond taking a course?", zh: "除了上課，還可以如何參與？" },
      a: {
        en: "Yes. Apply to coach, commission a school program, or donate toward free classes.",
        zh: "可以。你可以申請做教練、委託校本課程，或者捐款支持免費小班。"
      }
    }
  ];

  function FAQSection() {
    return h(
      Section,
      { cream: true },
      h(TitleBlock, { eyebrow: isZh ? "常見問題" : "FAQ", title: isZh ? "常見" : "Frequently Asked", emphasis: isZh ? "問題。" : "Questions.", center: true }),
      h(
        "div",
        { className: "faq-list" },
        FAQ_ITEMS.map((item, i) =>
          h(
            "details",
            { className: "faq-item", key: i },
            h("summary", null, isZh ? item.q.zh : item.q.en),
            h("div", { className: "faq-answer" }, isZh ? item.a.zh : item.a.en)
          )
        )
      )
    );
  }

  function GetInvolvedPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "參與 DebateCraft" : "Join DebateCraft", title: isZh ? "選擇你要做的" : "Choose a", emphasis: isZh ? "一件事。" : "Role.", subtitle: isZh ? "報讀小班、申請成為教練、或與學校合作，亦可捐款支持免費課程。" : "Apply for a class, coach younger debaters, commission a school program, or fund free classes." }), h(Section, null, h("div", { className: "grid grid-4" }, [[isZh ? "成為學生" : "Apply as Student", isZh ? "報讀免費小班，按經驗分班。" : "Apply for a free group class and receive a placement.", STUDENT_FORM_URL], [isZh ? "成為教練" : "Become a Coach", isZh ? "帶領技巧訓練、練習賽與回饋。" : "Run skill drills, practice rounds, and feedback.", "https://docs.google.com/forms/d/e/1FAIpQLSfombgLTJ0oDbWfCaSumrnLAjkdvT_K9FW1KJakbr9ZAQxwnQ/viewform?usp=header"], [isZh ? "學校合作" : "Commission School Training", isZh ? "訓練現有隊伍，或者建立新學會。" : "Train an existing team or launch a new program.", "partnership.html"], [isZh ? "捐款支持" : "Donate", isZh ? "支付教材、平台與免費課程成本。" : "Cover materials, platforms, and free-class costs.", "https://buymeacoffee.com/debatecraft"]].map(([title, text, href]) => h(InfoCard, { key: title, title, text }, h("div", { style: { marginTop: 20 } }, h(Button, { href }, isZh ? "前往 →" : "Start →")))))), h(StatsBand, { stats: commonStats }), h(FAQSection));
  }

  function DonatePage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "捐款用途" : "Where Donations Go", title: isZh ? "支付免費課堂" : "Fund Free Classes", emphasis: isZh ? "實際成本。" : "and Materials.", subtitle: isZh ? "捐款支付網站、教材、通訊工具與免費學生名額。" : "Donations pay for web hosting, teaching materials, communication tools, and free student places." }), h(Section, null, h("div", { className: "grid grid-3" }, h(InfoCard, { title: isZh ? "教材" : "Teaching Materials", text: isZh ? "製作講義、練習、題庫與課程資源。" : "Pays for handouts, drills, motion banks, and course resources." }), h(InfoCard, { title: isZh ? "平台" : "Platforms", text: isZh ? "支付網站、表格、通訊與線上工具。" : "Pays for the website, forms, communications, and online tools.", accent: SKY }), h(InfoCard, { title: isZh ? "免費名額" : "Free Places", text: isZh ? "為無法支付課程費用的學生提供名額。" : "Covers places for students who cannot pay course fees.", accent: "#0d9488" })), h("div", { style: { textAlign: "center", marginTop: 42 } }, h(Button, { href: "https://buymeacoffee.com/debatecraft" }, isZh ? "捐款 →" : "Donate →"))));
  }

  function ContactPage() {
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "校本課程查詢" : "School program inquiry", title: isZh ? "提供課程資料" : "Send program details", emphasis: isZh ? "開始討論。" : "for review.", subtitle: isZh ? "請提供學生人數、年級、賽制、校曆、每週時段、評估需要及目標賽事。" : "Send cohort size, year groups, debate format, timetable, weekly availability, assessment needs, and target competition." }), h(Section, null, h("div", { className: "grid grid-2" }, h(InfoCard, { title: isZh ? "聯絡 DebateCraft" : "Contact DebateCraft", text: "info@debatecraft.org" }, h("div", { style: { marginTop: 18 } }, h(Button, { href: SCHOOL_CONTACT_URL, dark: true }, isZh ? "發送電郵" : "Email DebateCraft"))), h(InfoCard, { title: isZh ? "先查看課程內容" : "Review program content", text: isZh ? "查看課程範圍、評估證據、交付安排及教練經驗。" : "Review curriculum scope, assessment evidence, delivery arrangements, and coaching experience.", accent: SKY }, h("div", { style: { marginTop: 18 } }, h(Button, { href: isZh ? "cntraining-pathway.html" : "training-pathway.html" }, isZh ? "查看課程" : "View program"))))));
  }

  /* ---------- Legal pages (Privacy Policy / Student and Family Agreement) ---------- */

  function LegalPage({ eyebrow, title, emphasis, effective, note, intro, sections }) {
    return h(
      React.Fragment,
      null,
      h(PageHeader, { eyebrow, title, emphasis, subtitle: effective }),
      h(
        Section,
        { cream: true },
        h(
          "div",
          { className: "legal-wrap" },
          note && h("div", { className: "legal-note", dangerouslySetInnerHTML: { __html: note } }),
          intro && h("div", { className: "legal-intro", dangerouslySetInnerHTML: { __html: intro } }),
          h("nav", { className: "legal-toc", "aria-label": "Sections" }, sections.map((s) => h("a", { key: s.id, href: `#${s.id}` }, s.label))),
          sections.map((s) =>
            h(
              "section",
              { key: s.id, id: s.id, className: "legal-section" },
              h("h2", null, s.title),
              h("div", { dangerouslySetInnerHTML: { __html: s.body } })
            )
          )
        )
      )
    );
  }

  const PRIVACY_NOTE =
    "This policy is written to be complete and to comply with applicable United States privacy law. It is not a substitute for legal advice — DebateCraft Academy&rsquo;s specific facts (its state of organization and its full data-sharing arrangements) should be confirmed with qualified counsel before this policy is relied upon as final. Some items below are marked <strong>[to confirm]</strong> where a fact was not available at the time this policy was drafted; those items should be resolved before publication.";

  const PRIVACY_INTRO =
    'DebateCraft Academy (&ldquo;the Academy,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates DebateCraft and its other education programs &mdash; including BioCraft &mdash; and the websites through which they are presented, including this one. This policy explains what information we collect, why, how long we keep it, who we share it with, and the choices and rights available to you. It applies to this website and to the programs it describes. It should be read alongside the <a href="terms.html">Student and Family Agreement</a>, which governs enrollment and contains the operative recording and publication consent terms referenced in Section 4 below.';

  const PRIVACY_SECTIONS = [
    {
      id: "p1",
      label: "1. Scope",
      title: "1. Scope",
      body: `<p>This policy covers two separate contexts, because they involve different data and different rules:</p>
      <ul>
        <li><strong>This website.</strong> The DebateCraft site is informational. It does not require an account and does not run a payment or checkout flow. Its data-collecting elements are a link to an external application form (Section 2.1), the analytics described in Section 2.3, and the browser-local practice tools described in the same section.</li>
        <li><strong>Program participation.</strong> Applying to and taking part in a DebateCraft cohort involves the collection of information about a Student and their Family, described in Section 2, to run the program safely.</li>
      </ul>
      <p>&ldquo;Personal information&rdquo; in this policy means information that identifies, relates to, or could reasonably be linked with a particular individual or household, consistent with the definition used in the state privacy laws referenced in Section 10.</p>`,
    },
    {
      id: "p2",
      label: "2. Information we collect",
      title: "2. Information we collect",
      body: `<h3>2.1 Information you or your family provide</h3>
      <ul>
        <li>Student&rsquo;s full name, age or date of birth, and school year;</li>
        <li>a parent or guardian&rsquo;s name and relationship to the Student, where the Student is under 18;</li>
        <li>contact details for the Family: email address and phone number;</li>
        <li>information provided in the application form, which is hosted by Jotform (see Section 5.2) and governed additionally by Jotform&rsquo;s own privacy policy once you leave this site to complete it;</li>
        <li>information needed for safeguarding purposes, if the Academy specifically requests it (Section 2.1 of the Student and Family Agreement);</li>
        <li>any correspondence you send to info@debatecraft.org or to an assigned coach&rsquo;s @debatecraft.org address.</li>
      </ul>
      <h3>2.2 Information generated during the program</h3>
      <ul>
        <li>attendance records and attendance points (Schedule A of the Student and Family Agreement);</li>
        <li>coaching feedback and assessment records;</li>
        <li>session recordings, made as a condition of participation and used only for the operational purposes described in Section 4;</li>
        <li>a record of any conduct matter, appeal, or ineligibility-register entry concerning the Family, held as described in Sections 8 and 9 of the Student and Family Agreement.</li>
      </ul>
      <h3>2.3 Information collected automatically</h3>
      <p>This website uses Google Analytics to understand aggregate visitor traffic &mdash; pages viewed, general location, device and browser type, and how visitors move through the site. This data is not linked to a Family&rsquo;s program record and is not used to identify an individual visitor. Our hosting provider also necessarily processes standard web server log data (for example, IP address and request timestamps) to deliver the site and keep it secure.</p>
      <p>The practice tools in our resource hub (motion bank, prep sheets, and timers) save your entries in your browser&rsquo;s local storage so your work persists between visits. That data stays on your device &mdash; it is never transmitted to us or to any third party, and we cannot see it.</p>
      <h3>2.4 What we do not collect</h3>
      <p>We do not collect payment information directly (the program is free of charge; any voluntary donation is processed independently by our donation provider, outside our control), government identification numbers, precise geolocation, or biometric identifiers. We do not knowingly collect personal information from children under 13 through this website &mdash; see Section 7.</p>`,
    },
    {
      id: "p3",
      label: "3. How we use information",
      title: "3. How we use information",
      body: `<p>We use the information described in Section 2 to:</p>
      <ul>
        <li>process applications and allocate program places;</li>
        <li>administer sessions, track attendance, and deliver instruction and feedback;</li>
        <li>safeguard the Students and volunteers in our programs, including investigating conduct concerns under the Student and Family Agreement;</li>
        <li>issue and verify certificates of completion;</li>
        <li>respond to questions, requests, and complaints sent to info@debatecraft.org;</li>
        <li>maintain the operational and safeguarding records described in Section 6; and</li>
        <li>where separately consented to, publish identifiable material about a Student as described in Section 4.</li>
      </ul>
      <p>We do not use personal information for behavioral advertising, do not build advertising profiles from it, and do not sell it. &ldquo;Sell&rdquo; and &ldquo;share&rdquo; are used in this policy with the meanings given to them by the state privacy laws referenced in Section 10; under those definitions, we do not sell or share personal information.</p>`,
    },
    {
      id: "p4",
      label: "4. Recording, images and publication",
      title: "4. Recording, images and publication",
      body: `<p>This section summarizes, from a privacy standpoint, the recording and publication terms set out in full in Section 10 of the Student and Family Agreement. Where the two differ, the Student and Family Agreement governs.</p>
      <h3>4.1 Operational recording</h3>
      <p>Sessions are recorded as a condition of participation, not on a consent basis, because recording is necessary to teach, supervise volunteers, safeguard participants, and investigate complaints. These recordings are never published externally and are deleted within twelve months.</p>
      <h3>4.2 Publication</h3>
      <p>Use of an identifiable recording, photograph, or clip of a Student in marketing, recruitment, or public material is a separate purpose from operational recording. It operates on an opt-out basis at enrollment, and a Family may opt out &mdash; or withdraw a prior consent &mdash; at any time, for any reason, with no effect on the Student&rsquo;s place, by writing to info@debatecraft.org. We maintain a consent register for every published item and remove withdrawn material from channels we control within thirty days; we cannot recall printed material already distributed or content already reshared by third parties.</p>`,
    },
    {
      id: "p5",
      label: "5. How we share information",
      title: "5. How we share information",
      body: `<p><strong>We do not sell personal information.</strong> We share it only in the following circumstances:</p>
      <h3>5.1 Academy staff and volunteers</h3>
      <p>Coaches, coordinators, and officers of the Academy access a Student&rsquo;s information only as needed to teach, supervise, or administer the program, consistent with Sections 6 and 7 of the Student and Family Agreement.</p>
      <h3>5.2 Service providers</h3>
      <p>We use third-party services to operate the program and this website, including a website hosting provider, Google Analytics for aggregate site usage, Jotform for the application form, and a video conferencing platform used to deliver online sessions <strong>[to confirm: name the specific platform in use]</strong>. These providers process information on our behalf, under their own applicable terms and privacy policies, and are not authorized to use it for their own independent purposes.</p>
      <h3>5.3 Legal and safety disclosures</h3>
      <p>We disclose personal information where required by law, where requested by a competent authority, or where we reasonably believe disclosure is necessary to protect the safety of a Student, a volunteer, or another person, consistent with Section 7.3 of the Student and Family Agreement.</p>
      <h3>5.4 Business transfers</h3>
      <p>If the Academy incorporates, obtains charitable status, or transfers its operations to a successor entity, personal information may transfer as part of that change, subject to this policy or a policy providing materially equivalent protection.</p>`,
    },
    {
      id: "p6",
      label: "6. Data retention",
      title: "6. Data retention",
      body: `<div class="legal-table-wrap"><table class="legal-table">
        <thead><tr><th>Data</th><th>Retention</th></tr></thead>
        <tbody>
          <tr><td>Enrollment and attendance records</td><td>3 years after the Student&rsquo;s last cohort</td></tr>
          <tr><td>Certificate and credential records</td><td>Indefinitely, so that certificates remain verifiable</td></tr>
          <tr><td>Operational session recordings</td><td>12 months</td></tr>
          <tr><td>Coaching archive (a Student&rsquo;s own speeches)</td><td>12 months after the Student&rsquo;s last cohort, unless the Student requests otherwise</td></tr>
          <tr><td>Published material (Section 4.2)</td><td>3 years from creation, or until the Student turns 18, whichever is later</td></tr>
          <tr><td>Ineligibility register entries</td><td>Per tier: 12 months, 36 months, or permanent with review every 3 years &mdash; see Schedule C of the Student and Family Agreement</td></tr>
          <tr><td>Website server logs and analytics</td><td>Retained only as long as needed for security, troubleshooting, and aggregate reporting</td></tr>
        </tbody>
      </table></div>
      <p>Where you exercise a deletion right under Section 10 and we are not required or permitted to keep the data (for example, to comply with law, resolve a dispute, or maintain the integrity of a certificate already issued), we will delete it within thirty days.</p>`,
    },
    {
      id: "p7",
      label: "7. Children's privacy",
      title: "7. Children&rsquo;s privacy",
      body: `<p>DebateCraft is intended for students aged 13 and up. We do not knowingly collect personal information from a child under 13 through this website. If a parent believes a child under 13 has provided us with personal information, contact info@debatecraft.org and we will delete it.</p>
      <p>The Children&rsquo;s Online Privacy Protection Act (COPPA) applies to operators who knowingly collect personal information online from children under 13; because our programs are not directed at that age group and we do not knowingly enroll students under 13, we do not believe COPPA&rsquo;s affirmative consent requirements apply to our normal operation. If that changes &mdash; for example, if a younger sibling&rsquo;s information is submitted in error &mdash; we will treat it as described above.</p>
      <p>For students aged 13 to 17, a parent or guardian&rsquo;s consent is already built into the program: the Student and Family Agreement requires a parent or guardian&rsquo;s signature for any Student under 18, and Section 10 of that Agreement gives the Family specific, ongoing control over whether the Student&rsquo;s image is published.</p>`,
    },
    {
      id: "p8",
      label: "8. Cookies and tracking",
      title: "8. Cookies and tracking",
      body: `<p>This website uses Google Analytics, which sets first-party cookies to measure aggregate site usage. It does not run advertising or social-media tracking scripts, and it does not sell or share data collected through analytics. It does not respond to browser &ldquo;Do Not Track&rdquo; signals.</p>
      <p>If you would prefer not to be measured by Google Analytics, you can use a browser extension such as Google&rsquo;s Analytics Opt-out Add-on, or block cookies in your browser settings; either will not affect your ability to use the site.</p>
      <p>The external application form (Section 2.1) is hosted by Jotform and is subject to Jotform&rsquo;s own cookie and privacy practices once you navigate to it; we do not control that page.</p>`,
    },
    {
      id: "p9",
      label: "9. Data security",
      title: "9. Data security",
      body: `<p>We use reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, disclosure, alteration, or destruction, including restricting access to Student records to Academy staff and volunteers who need it to do their role. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
      <p>If we become aware of a breach involving personal information that triggers a notification obligation under applicable state breach-notification law, we will notify affected individuals and any required regulator within the timeframe that law requires.</p>`,
    },
    {
      id: "p10",
      label: "10. Your privacy rights",
      title: "10. Your privacy rights",
      body: `<p>Depending on where you live, you may have some or all of the following rights over your personal information. These rights are provided under state laws including the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), the Virginia Consumer Data Protection Act (VCDPA), the Colorado Privacy Act (CPA), the Connecticut Data Privacy Act (CTDPA), the Utah Consumer Privacy Act (UCPA), and similar laws in other states as they take effect:</p>
      <ul>
        <li><strong>Right to know / access</strong> &mdash; what personal information we hold about you and how we use it;</li>
        <li><strong>Right to correct</strong> &mdash; inaccurate personal information we hold;</li>
        <li><strong>Right to delete</strong> &mdash; personal information we hold, subject to the retention needs described in Section 6;</li>
        <li><strong>Right to opt out of sale or sharing, or of targeted advertising</strong> &mdash; not applicable in practice, because we do not sell personal information, share it for cross-context behavioral advertising, or run targeted advertising;</li>
        <li><strong>Right to non-discrimination</strong> &mdash; we will not deny you the program, charge a different amount (the program is free regardless), or provide a different level of service because you exercised a privacy right; and</li>
        <li><strong>Right to appeal</strong> &mdash; where a state law provides an internal appeal process for a denied request, we will provide it and explain how to use it in our response.</li>
      </ul>
      <p>To exercise any of these rights, email info@debatecraft.org with your request and enough information for us to identify the Student&rsquo;s record (full name and the cohort attended is usually sufficient). We may need to verify your identity, or your authority to act for a Student who is a minor, before completing certain requests. We will respond within thirty days, or within the shorter period a specific state law requires; if we need more time we will tell you why.</p>
      <p>You may also designate an authorized agent to make a request on your behalf, subject to verification, where the state law applicable to you provides for this.</p>`,
    },
    {
      id: "p11",
      label: "11. International operations",
      title: "11. International operations",
      body: `<p>DebateCraft Academy&rsquo;s volunteers, coaches, and program operations are not confined to a single country. As a result, personal information may be processed by staff or volunteers located outside the country you live in, including outside the United States. Where that is the case, we take steps to keep the protections in this policy in place regardless of where the information is processed. If a jurisdiction in which we operate imposes its own data protection requirements beyond what is described here &mdash; for example, in a region with its own privacy statute &mdash; those requirements apply in addition to, not instead of, this policy, and should be confirmed separately with qualified local counsel <strong>[to confirm]</strong>.</p>`,
    },
    {
      id: "p12",
      label: "12. Changes to this policy",
      title: "12. Changes to this policy",
      body: `<p>We may update this policy from time to time. Where a change is material, we will notify enrolled Families in writing at least thirty days before it takes effect, consistent with the amendment process in Section 14.3 of the Student and Family Agreement. The &ldquo;Effective from&rdquo; date at the top of this page reflects the version currently in force.</p>`,
    },
    {
      id: "p13",
      label: "13. Contact us",
      title: "13. Contact us",
      body: `<p>Questions about this policy, or requests to exercise a right described in Section 10, go to <strong>info@debatecraft.org</strong>. This is the same address used for all enrollment, attendance, safeguarding, and data matters under the Student and Family Agreement.</p>`,
    },
  ];

  function PrivacyPage() {
    return h(LegalPage, {
      eyebrow: "Privacy Policy",
      title: "Privacy",
      emphasis: "Policy.",
      effective: "Effective from July 1, 2026",
      note: PRIVACY_NOTE,
      intro: PRIVACY_INTRO,
      sections: PRIVACY_SECTIONS,
    });
  }

  const TERMS_NOTE =
    "This Agreement is issued by DebateCraft Academy and governs enrollment in every DebateCraft Academy program, including DebateCraft and BioCraft. It is reproduced here for the Family&rsquo;s review before applying. A place is not held, and no Student may attend a session, until a complete signed copy of this Agreement has been received &mdash; see <a href=\"#sack\">Acceptance</a> below. This page is informational and does not itself constitute legal advice; DebateCraft Academy encourages Families with questions about their rights or obligations under this Agreement to seek independent advice.";

  const TERMS_INTRO = `<p>This Agreement sets the conditions on which DebateCraft Academy (&ldquo;the Academy&rdquo;) offers a place in its programs to a student (&ldquo;the Student&rdquo;) and, where the Student is under eighteen, to their parent or guardian (&ldquo;the Parent&rdquo;). The Student and the Parent are together &ldquo;the Family.&rdquo;</p>
  <p>DebateCraft Academy is a student-run nonprofit initiative providing debate, public speaking, and science ethics education free of charge to middle and high school students, with a particular commitment to under-resourced and underrepresented students. Places are limited, always oversubscribed, and offered at no cost. A place is a benefit conferred, not a service purchased.</p>`;

  const TERMS_SECTIONS = [
    {
      id: "s1",
      label: "1. Nature of this Agreement",
      title: "1. Nature of this Agreement",
      body: `<p><strong>1.1</strong> This Agreement sets conditions of enrollment. It does not create an employment, agency, partnership or fee-paying relationship, and no tuition, fee or other payment is due from the Family at any time.</p>
      <p><strong>1.2</strong> A place is personal to the Student, is not transferable, and may be withdrawn in accordance with this Agreement. Because the Academy charges nothing, the Academy&rsquo;s remedy for any breach by the Family is withdrawal of the place and, where applicable, exclusion from future programs. The Academy does not seek and will not pursue monetary remedies against a Family except where it has suffered a quantifiable loss caused deliberately.</p>
      <p><strong>1.3</strong> The Student&rsquo;s acceptance and the Parent&rsquo;s consent are both required. A place cannot be held on the strength of a Parent&rsquo;s signature alone.</p>
      <p><strong>1.4</strong> The Academy may decline any application, and may decline any re-application, without providing reasons, except where this Agreement expressly requires reasons to be given.</p>
      <h3>1.5 Acceptance in full is a condition of participation</h3>
      <p><strong>1.5.1</strong> Participation in any DebateCraft program, activity, session, workshop, competition, trial, taster or event requires this Agreement to have been accepted <strong>in full and without qualification</strong>, signed by the Student and, where the Student is under eighteen, by the Parent, with every acknowledgement in the signature block initialled.</p>
      <p><strong>1.5.2</strong> The Academy does not accept partial, conditional or annotated acceptance. Any deletion, amendment, reservation, annotation, counter-term or added condition purportedly made by the Family is of no effect, and an enrollment submitted on that basis is not accepted and confers no place.</p>
      <p><strong>1.5.3</strong> No place is held, and no Student may attend any session, until a complete signed Agreement has been received. Attendance permitted in error before receipt does not waive this requirement and does not create a place.</p>
      <p><strong>1.5.4</strong> Where the Academy amends this Agreement under Section 14.3, continued participation requires acceptance of the amended Agreement in full.</p>`,
    },
    {
      id: "s2",
      label: "2. Eligibility and accurate information",
      title: "2. Eligibility and accurate information",
      body: `<p><strong>2.1</strong> The Family must provide accurate information at enrollment, including the Student&rsquo;s age and school year, a working contact address and number for a responsible adult, and any information the Academy specifically requests for safeguarding purposes.</p>
      <p><strong>2.2</strong> Providing materially false information at enrollment is grounds for immediate withdrawal of the place under Section 8, and where it concerns the Student&rsquo;s age or the identity of the responsible adult, is grounds for referral to Schedule C.</p>
      <p><strong>2.3</strong> The Family must notify the Academy of any change to contact details within seven days. Where the Academy cannot reach the responsible adult using the details on file for fourteen days, the place may be released.</p>`,
    },
    {
      id: "s3",
      label: "3. Attendance",
      title: "3. Attendance",
      body: `<p>Attendance is the condition on which a scarce free place is held. The Academy turns away applicants for every place it fills. An unattended seat is a place denied to a student who would have used it.</p>
      <h3>3.1 Standard</h3>
      <p>The Student is expected to attend every scheduled session, on time, for its full duration, and to be present and participating rather than merely connected.</p>
      <h3>3.2 Notification</h3>
      <p>Absences must be notified to info@debatecraft.org (Section 6.1) at least twenty-four hours before the session, except in the case of sudden illness or a genuine emergency, which must be notified as soon as reasonably possible and in any event within twenty-four hours after the session.</p>
      <h3>3.3 First-session forfeiture</h3>
      <p><strong>A Student who does not attend the first session of a cohort, and has not notified the Academy in advance, forfeits their place automatically twenty-four hours after that session ends.</strong> The place is released to the waitlist. This rule is automatic and is not subject to the graduated ladder in Section 8, because the seat cannot be reallocated once the cohort is under way.</p>
      <h3>3.4 Attendance points</h3>
      <p>Absences are recorded as points under Schedule A. Points accrue within a single cohort and are reset at the end of it, except as provided in Section 3.7.</p>
      <h3>3.5 Seat release</h3>
      <p><strong>On reaching six points within a cohort, the Student&rsquo;s place is released to the waitlist.</strong> The Academy will notify the Family in writing before this takes effect, and the Family has three days to make representations, which are considered by a Volunteer Manager. Release of a seat under this section is an administrative consequence, not a disciplinary sanction, and is recorded as such.</p>
      <h3>3.6 Withdrawal without notice</h3>
      <p>A Family that withdraws without notifying the Academy, or that becomes unreachable for fourteen days during a cohort, is recorded as a no-notice withdrawal. This is not itself a disciplinary matter but it carries the priority consequence in Section 3.7.</p>
      <h3>3.7 Effect on future places</h3>
      <p>Places in future cohorts are allocated on stated criteria, and attendance history is one of them. The Academy applies the following, and states them here so that they are known in advance rather than discovered:</p>
      <ul>
        <li>A completed cohort with fewer than three attendance points: standard priority, and eligibility for the returning-student pathway.</li>
        <li>A cohort completed with three or more points: reduced priority for one subsequent application cycle.</li>
        <li>A seat released under Section 3.5, a first-session forfeiture under Section 3.3, or a no-notice withdrawal under Section 3.6: the Student is not eligible to apply for the next cohort in the same program, and has reduced priority for the cycle after that.</li>
        <li>Two occurrences of any of the outcomes in the preceding bullet, in any combination, within twenty-four months: referral to Schedule C, Tier 1.</li>
      </ul>
      <p><strong>3.8</strong> Nothing in this section applies to absences caused by illness, bereavement, examinations, or circumstances outside the Family&rsquo;s control, where these have been notified. The Academy would rather be told late than not told.</p>
      <h3>3.9 Makeup sessions</h3>
      <p>Makeup sessions are offered at the Academy&rsquo;s sole discretion, subject to instructor availability, and are not an entitlement. No makeup session will be scheduled during the final week of a cohort. The Academy does not offer makeup sessions for absences that were not notified.</p>
      <h3>3.10 Rescheduling between sessions</h3>
      <p>Rescheduling students between sessions is offered at the Academy&rsquo;s sole discretion, subject to instructor availability, and is not an entitlement. The Academy does not offer rescheduling for absences that were not notified. The Academy cannot be held liable if the date or time of the rescheduled session differs from the previous session.</p>`,
    },
    {
      id: "s4",
      label: "4. Participation and classroom conduct",
      title: "4. Participation and classroom conduct",
      body: `<h3>4.1 Camera</h3>
      <p>The Student is expected to have their camera on during sessions. The Academy recognises that not every student has a private or presentable space, and a standing camera exemption is available on request to info@debatecraft.org, with no explanation required beyond identifying the need. A plain virtual background may be used at any time without prior approval. Students with a camera exemption are expected to participate by audio and in writing.</p>
      <h3>4.2 Conduct</h3>
      <p>The Student agrees to treat instructors, peers and staff with respect; to participate constructively; to follow instructions given by instructors during a session; to refrain from disruptive behaviour, harassment, discriminatory language and inappropriate content; and to engage authentically rather than nominally in debates and exercises.</p>
      <h3>4.3 Serious misconduct</h3>
      <p>The following are treated as serious misconduct and engage Section 8.3 immediately: bullying, harassment or discrimination; threatening behaviour or violence; sexual content or conduct of any kind directed at any participant; academic dishonesty or plagiarism in submitted work; unlawful activity conducted through Academy platforms; recording or photographing another participant without the Academy&rsquo;s written permission; and sharing any Academy session link, recording or platform access with a person not enrolled.</p>
      <h3>4.4 Feedback</h3>
      <p>Coaching feedback is educational and is given in good faith. The Student agrees to receive feedback without hostility toward the person giving it, and to raise disagreement with the substance of feedback through the channel in Section 6, rather than in the session. The Academy does not require the Student to agree with feedback, and a student who argues well against their coach is doing the thing this program teaches.</p>`,
    },
    {
      id: "s5",
      label: "5. Parent and guardian conduct",
      title: "5. Parent and guardian conduct",
      body: `<h3>5.1 Who you are speaking to</h3>
      <p><strong>DebateCraft&rsquo;s coaches, coordinators and staff are themselves secondary school students, and most of them are minors.</strong> They volunteer their time, are unpaid, and are not employees. Conduct that would be unacceptable if directed at a child is unacceptable when directed at them, and will be treated on that basis. This section exists because the Academy has a duty to protect its volunteers that is at least equal to its duty to serve its students.</p>
      <h3>5.2 Parent responsibilities</h3>
      <p>The Parent agrees to support consistent attendance and preparation; to notify absences to info@debatecraft.org; to keep contact details current; to raise concerns through the escalation path in Section 6.5; and to model, toward Academy staff, the standard of conduct the program teaches.</p>
      <h3>5.3 Prohibited conduct</h3>
      <p>The Parent must not:</p>
      <ul>
        <li>use abusive, threatening, degrading, sexualised or discriminatory language toward any Academy member;</li>
        <li>contact any coach, coordinator or staff member on a personal email address, personal telephone number, personal messaging account or personal social media, at any time and for any reason;</li>
        <li>contact any coach at all after the end of the Student&rsquo;s cohort;</li>
        <li>contact any Academy member outside the stated hours in Section 6.2 other than in a genuine emergency;</li>
        <li>make repeated contact designed to pressure a decision after a decision has been communicated;</li>
        <li>make allegations about a named Academy member in a public forum, group chat, or to other families, in place of using the escalation path;</li>
        <li>record or publish any communication with an Academy member without written consent;</li>
        <li>demand the removal, reassignment or discipline of a named volunteer; or</li>
        <li>attempt to obtain a place, an assessment outcome, or a certificate by inducement, misrepresentation or pressure.</li>
      </ul>
      <h3>5.4 Response to prohibited conduct</h3>
      <p>Parent conduct is addressed through the ladder in Schedule B. The Academy may apply any stage of that ladder without first applying earlier stages where the conduct warrants it.</p>
      <h3>5.5 Single point of contact</h3>
      <p>Where a Parent has engaged in conduct under Section 5.3, the Academy may restrict all communication with that Family to one named adult representative of the Academy, in writing only. The restriction is notified in writing, states its duration, and is reviewed at the end of the cohort. A Family subject to this restriction retains full access to the program; only the communication route changes.</p>
      <h3>5.6 Withdrawal of a place for Parent conduct</h3>
      <p><strong>The Academy may withdraw a Family&rsquo;s place because of the Parent&rsquo;s conduct, notwithstanding that the Student has done nothing wrong.</strong> The Academy does not do this lightly and it is the last stage of Schedule B, but the Family should understand from the outset that the Student&rsquo;s conduct is not the only conduct that matters. Where a place is withdrawn on this basis and another responsible adult is available to act as the Student&rsquo;s contact, the Academy will consider that alternative before withdrawing the Student.</p>`,
    },
    {
      id: "s6",
      label: "6. Communication",
      title: "6. Communication",
      body: `<h3>6.1 The only permitted channels</h3>
      <p><strong>6.1.1</strong> There are exactly two permitted channels of communication between the Family and the Academy:</p>
      <ul>
        <li><strong>(a) info@debatecraft.org</strong> &mdash; the Academy&rsquo;s official address, for all enrollment, administrative, attendance, safeguarding, complaint, escalation and data matters; and</li>
        <li><strong>(b) the Academy-issued email address of the Student&rsquo;s assigned coach</strong>, in the form *name*@debatecraft.org, for matters concerning that Student&rsquo;s learning in the cohort the coach is teaching, and for nothing else.</li>
      </ul>
      <p><strong>6.1.2</strong> No other channel is permitted. This includes personal email addresses, personal telephone numbers, WhatsApp, WeChat, Discord, Instagram, Facebook, LinkedIn, any other social or messaging platform, and any address or account not issued by the Academy. <strong>A coach&rsquo;s personal contact details are never a permitted channel, and a coach who is asked for them will decline.</strong></p>
      <p><strong>6.1.3</strong> Any communication sent by an impermissible route is not an official communication. It does not start any time period under this Agreement, will not be actioned, and will not be treated as notice of anything, including notice of an absence.</p>
      <p><strong>6.1.4</strong> All email between a Parent and a coach must be copied to info@debatecraft.org. <strong>A coach will not conduct unrecorded correspondence with a Parent, and a Parent must not ask a coach to.</strong> This exists because the Academy&rsquo;s coaches are minors and every exchange between an adult and a minor volunteer must be visible to the organization.</p>
      <p><strong>6.1.5</strong> Communication with a coach is limited to matters of that Student&rsquo;s learning. Complaints, escalations, allegations about any person, requests concerning places or eligibility, and any matter under Sections 5, 8, 9, 10 or 12 must go to info@debatecraft.org and must not be raised with a coach.</p>
      <h3>6.2 When the channels are open</h3>
      <p><strong>6.2.1</strong> The coach channel under 6.1(b) opens on the first day of the Student&rsquo;s cohort and <strong>closes at the end of the final session of that cohort. Contact is only permitted within extended working hours (8 a.m.&ndash;6 p.m.) in Hong Kong Time or Eastern Time, as expressed by the coach.</strong> After that point the Family must not contact that coach, or any coach, by any means. A coach who receives such contact will not reply and will forward it to info@debatecraft.org.</p>
      <p><strong>6.2.2</strong> After a cohort ends, info@debatecraft.org remains the Family&rsquo;s only route to the Academy, and the Academy will answer only the following: requests for or verification of a certificate; a data access, correction or deletion request under Section 12.3; withdrawal of a consent under Section 10.5; an appeal within the time limits in Sections 8.5 or 9.6; a safeguarding disclosure; and a future application. The Academy is not obliged to respond to correspondence outside this list and, after one notice that a matter is closed, will not.</p>
      <p><strong>6.2.3</strong> Nothing in this Section limits any right the Family has under applicable data protection law, and the Academy does not treat a lawful data request as a breach of this Agreement whenever it is made.</p>
      <h3>6.3 Response standards</h3>
      <p>While a cohort is running, the Academy acknowledges messages to info@debatecraft.org within one working day and responds substantively within three working days. Anything blocking a Student&rsquo;s attendance at a session already scheduled is answered within four hours during the operating day. Coaches respond to learning questions within three working days during the cohort and are not expected to respond outside it.</p>
      <p>Academy operating hours (8 a.m.&ndash;6 p.m. Hong Kong Time or Eastern Time) are when responses should be expected. Outside them the Academy does not respond and its members &mdash; who are school students &mdash; are not expected to.</p>
      <p>This standard binds both directions. A Family that has received an acknowledgement within one working day should not treat the matter as ignored, and repeated contact within the response window is addressed under Section 5.3.</p>
      <h3>6.4 Written record</h3>
      <p>Any concern that the Family wishes to escalate must be raised in writing. The Academy may decline to act on a serious allegation communicated only verbally, and will ask for it in writing instead. This protects both the Family and the person the allegation concerns.</p>
      <h3>6.5 Escalation path</h3>
      <p>Concerns are raised to info@debatecraft.org and are handled in this order internally, each stage being given a reasonable opportunity to resolve before the next is used: the chapter Volunteer Manager; the relevant Director; the Executive Director. A concern is never escalated to or through a coach. <strong>The Executive Director&rsquo;s decision is final in operational matters.</strong></p>
      <h3>6.6 Vexatious or repeated complaints</h3>
      <p>Where a Family has exhausted the escalation path on a matter, the Academy will not reopen it in the absence of new information, and will say so once. Continued correspondence on a closed matter is addressed under Schedule B.</p>`,
    },
    {
      id: "s7",
      label: "7. Safeguarding",
      title: "7. Safeguarding",
      body: `<p><strong>7.1</strong> The Academy operates online with minors on both sides of the classroom. Communication between a volunteer and a Student takes place only on Academy platforms and only in channels visible to at least one other Academy member. Private one-to-one contact between a volunteer and a Student outside Academy platforms is prohibited, and the Family is asked to report it to the Academy rather than permit it.</p>
      <p><strong>7.2</strong> The Family must not ask any volunteer for personal contact details, and must not offer gifts, payment or inducements to any volunteer. A coach&rsquo;s only contactable address is their @debatecraft.org address, and only during the Student&rsquo;s cohort under Section 6.2.1.</p>
      <p><strong>7.3</strong> The Academy will report any safeguarding concern to the appropriate authority where it is required or where it reasonably believes a child is at risk, without first notifying the Family where notification would increase that risk.</p>`,
    },
    {
      id: "s8",
      label: "8. Enforcement",
      title: "8. Enforcement",
      body: `<h3>8.1 Graduated response</h3>
      <p>The Academy&rsquo;s response to a breach by the Student escalates as follows: an informal conversation and a note on file; a written warning; removal from specific activities or sessions; suspension for a defined period; withdrawal of the place; and referral to Schedule C. The Academy may begin at any stage proportionate to the conduct.</p>
      <h3>8.2 Right to be heard</h3>
      <p>Before a written warning or anything more serious, the Student and the Parent are told in writing what is alleged and are given three working days to respond in writing. The response is considered by the decision-maker and referred to in the decision.</p>
      <h3>8.3 Immediate suspension pending review</h3>
      <p>Where conduct falls within Section 4.3, or where a Parent&rsquo;s conduct creates an immediate risk to a volunteer&rsquo;s wellbeing, the Academy may suspend participation immediately and without prior notice. <strong>Suspension is not a decision; it is a pause.</strong> A review is completed within five working days by a Director not involved in the incident, the Family is given the opportunity in Section 8.2 within that period, and the outcome is given in writing with reasons.</p>
      <h3>8.4 Written decisions</h3>
      <p>Any decision to suspend, to withdraw a place, or to refer to Schedule C is given to the Family in writing, states the conduct relied on, states the stage applied, and states the appeal route and its deadline.</p>
      <h3>8.5 Appeal</h3>
      <p>The Family may appeal any decision under this Section once, in writing, within seven days, to an Academy officer who was not involved in the decision. The appeal officer may confirm, reduce or overturn the decision but may not increase it. The appeal outcome is given in writing with reasons and is final.</p>
      <h3>8.6 Effect of withdrawal</h3>
      <p>On withdrawal of a place, the Student&rsquo;s access to Academy Materials, platforms and channels ends. Consents given under Section 10 continue in force subject to any withdrawal of consent under Section 10.5. Certificates already earned are not revoked, save where they were obtained by dishonesty.</p>`,
    },
    {
      id: "s9",
      label: "9. Ineligibility register",
      title: "9. Ineligibility register &mdash; the final option",
      body: `<h3>9.1 Purpose</h3>
      <p>The Academy maintains a confidential register of individuals and Families who are not eligible to enrol in future programs. <strong>This is the Academy&rsquo;s final sanction. It is used where the Academy has concluded that no future relationship is workable, and it is used rarely.</strong></p>
      <h3>9.2 Grounds</h3>
      <p>A referral to the register may be made only for:</p>
      <ul>
        <li>conduct within Section 4.3;</li>
        <li>conduct within Section 5.3 that has reached Stage 4 of Schedule B, or a single instance of threatening, violent or sexualised conduct;</li>
        <li>repeated attendance failure as defined in Section 3.7;</li>
        <li>dishonesty in obtaining a place, an assessment outcome or a certificate;</li>
        <li>unauthorised distribution of Academy Materials at scale or for gain; or</li>
        <li>conduct toward a volunteer that the Academy reasonably considers would constitute harassment.</li>
      </ul>
      <h3>9.3 Who decides</h3>
      <p>A referral is decided by two Academy officers, <strong>at least one of whom had no involvement in the underlying incident</strong>. A permanent entry under Tier 3 additionally requires notification to the Board and may be overturned by the Board.</p>
      <h3>9.4 Tiers</h3>
      <p>Entries are made at the tier set out in Schedule C. <strong>Tier 1 (twelve months) is the default.</strong> Tier 3 (permanent) is available only for the categories listed in Schedule C and is not the ordinary outcome of a difficult relationship.</p>
      <h3>9.5 Notice and reasons</h3>
      <p>An entry is notified to the Family in writing within five working days, stating the conduct relied on, the tier applied, the expiry date, the appeal route, and the Family&rsquo;s right to request a copy of the personal data held about them.</p>
      <h3>9.6 Appeal</h3>
      <p>One appeal, in writing, within fourteen days, to an officer not involved in the decision, who may confirm, reduce the tier, or remove the entry. Where the entry is Tier 3, the appeal is heard by the Board.</p>
      <h3>9.7 Scope</h3>
      <p>An entry applies to the individual whose conduct gave rise to it. Where that individual is a Parent, the entry extends to any Student for whom that Parent is the responsible adult, <strong>unless another responsible adult is available and accepts the obligations in this Agreement</strong>, in which case the Academy will consider a place for the Student on that basis. A sibling who has done nothing wrong is not excluded automatically.</p>
      <h3>9.8 Data protection and confidentiality</h3>
      <p>Register entries are held securely, accessible only to Academy officers who need them to process applications. <strong>The register is never disclosed to any third party, is never shared with another organization, and is never referred to in any public or semi-public forum.</strong> Entries are deleted within thirty days of expiry. Tier 3 entries are reviewed every three years and retained only where the original grounds still justify retention. A Family may request a copy of the data held about them at any time and may request correction of factual errors.</p>
      <h3>9.9 Expiry and reapplication</h3>
      <p>On expiry, an entry is deleted and the individual may apply on the same footing as any other applicant, with no obligation to disclose the previous entry and no adverse inference drawn from it.</p>`,
    },
    {
      id: "s10",
      label: "10. Recording, images and publication",
      title: "10. Recording, images and publication",
      body: `<h3>10.1 Operational recording is a condition of participation</h3>
      <p><strong>10.1.1</strong> DebateCraft sessions are recorded. Recording is a condition of participation, not a matter of consent, because it is necessary for the purpose for which the Academy collects information about the Student in the first place: teaching them, supervising the volunteers who teach them, safeguarding the children in the room, and being able to establish what happened if a complaint is made.</p>
      <p><strong>10.1.2</strong> Operational recordings are used only for: coaching and instructional review; supervision and quality assurance of volunteers; safeguarding, incident investigation and the procedures in Sections 8 and 9; and training Academy volunteers in anonymised form.</p>
      <p><strong>10.1.3</strong> <strong>Operational recordings are never published, never used in any external material, and never shown to anyone outside the Academy</strong>, save where disclosure is required by law or is necessary to protect a person&rsquo;s safety.</p>
      <p><strong>10.1.4</strong> A Student who does not wish to appear on camera may use the standing camera exemption in Section 4.1, which requires no explanation. That exemption is the Academy&rsquo;s answer to a Family uncomfortable with being recorded; withdrawal from operational recording as such is not available, because a session cannot be supervised retrospectively.</p>
      <h3>10.2 Coaching archive</h3>
      <p>The Academy maintains an archive of the Student&rsquo;s own speeches and the feedback given on them, for the Student&rsquo;s development. A Family may decline the archive, in which case the Student&rsquo;s speeches are not separately retained beyond the operational retention period.</p>
      <h3>10.3 External publication requires consent</h3>
      <p><strong>10.3.1</strong> Use of identifiable recordings, photographs or clips of the Student in marketing, recruitment, promotional or public material is a separate purpose, requires consent, and is dealt with in this Section.</p>
      <p><strong>10.3.2</strong> <strong>Consent to external publication is not a condition of participation.</strong> Declining it, or later withdrawing it, has no effect whatsoever on the Student&rsquo;s place, participation, assessment, certification, eligibility for future cohorts, or priority under Section 3.7.</p>
      <p><strong>10.3.3</strong> Consent operates on an opt-out basis. Consent is given by signing this Agreement without marking the opt-out box on the signature page. That box is printed on the signature page, in the same size as the surrounding text, and is not placed in any annex.</p>
      <p><strong>10.3.4</strong> <strong>The Family may opt out at any time &mdash; before, during or after a cohort, and after the Student has left the Academy &mdash; with no reason required and no consequence of any kind</strong>, by a single line to info@debatecraft.org. The Academy confirms within five working days.</p>
      <p><strong>10.3.5</strong> The Academy reminds every enrolled Family of the opt-out in writing at the start of each cohort. A consent a Family has forgotten it gave is not a consent the Academy intends to rely on.</p>
      <h3>10.4 The end-of-cohort request</h3>
      <p><strong>10.4.1</strong> At the close of each cohort, and again with the Student&rsquo;s certificate, the Academy invites the Family to give a positive, specific consent (referred to below as a &ldquo;Part 2 consent&rdquo;), identifying the particular material the Academy would like to use.</p>
      <p><strong>10.4.2</strong> Where the material is a single identified clip, photograph or quotation, the Academy will say so, will make the material available to the Family to view before it is used, and will provide the Family with a copy of the finished item.</p>
      <p><strong>10.4.3</strong> A consent given under Part 2 governs the identified material and prevails over any general position taken at enrollment. It remains withdrawable under Section 10.3.4.</p>
      <p><strong>10.4.4</strong> Nothing in this Section obliges the Family to respond. Silence is not a Part 2 consent.</p>
      <h3>10.5 Anonymity</h3>
      <p>Where external publication is not opted out of, the Family may separately elect that the Student&rsquo;s name not be used alongside their image. The Academy will honour this. A request that the image itself not appear is an opt-out under Section 10.3.4 and is treated as such.</p>
      <h3>10.6 Retention and the consent register</h3>
      <p><strong>10.6.1</strong> Operational recordings under Section 10.1 are deleted within twelve months.</p>
      <p><strong>10.6.2</strong> Coaching archives under Section 10.2 are deleted within twelve months of the Student&rsquo;s last cohort unless the Student asks for them.</p>
      <p><strong>10.6.3</strong> Material published under Section 10.3 is retained for three years from creation, or until the Student&rsquo;s eighteenth birthday, whichever is later, after which it is removed from all Academy channels unless consent has been renewed in writing by the Student as an adult.</p>
      <p><strong>10.6.4</strong> The Academy maintains a consent register recording, for every published item, the consent relied on, its date, its expiry and any withdrawal. <strong>No item is published unless it appears in the register.</strong> The register is reviewed at least quarterly and expired items are removed.</p>
      <h3>10.7 Withdrawal</h3>
      <p>Any consent may be withdrawn, and any opt-out exercised, at any time by written notice to info@debatecraft.org, including after the Student has left the Academy. Section 6.2.2 expressly preserves this route. On withdrawal, the Academy removes the material from every channel it controls within thirty days. The Academy cannot recall printed material already distributed, or content already reshared by third parties, and says so plainly rather than promising otherwise.</p>
      <h3>10.8 Limits on use</h3>
      <p>The Academy will not license, sell or transfer any recording, photograph or clip of a Student to any third party, and will not use student material in paid advertising without separate written consent.</p>
      <h3>10.9 Recording by the Family</h3>
      <p>The Family must not record, photograph or screenshot any session, or any communication with an Academy member, without the Academy&rsquo;s prior written permission. This applies equally to material in which the Family&rsquo;s own child appears, because other people&rsquo;s children appear alongside them.</p>`,
    },
    {
      id: "s11",
      label: "11. Intellectual property",
      title: "11. Intellectual property",
      body: `<p><strong>11.1</strong> All course materials, decks, notes, prep files, templates, curricula and recordings created or provided by the Academy remain the Academy&rsquo;s exclusive property.</p>
      <p><strong>11.2</strong> The Student receives a limited, non-exclusive, non-transferable, revocable licence to use Academy Materials for their own study, preparation and development while enrolled, and for their own personal use afterwards.</p>
      <p><strong>11.3</strong> The Family must not share, distribute, copy, reproduce, upload, sell, republish or create derivative works from Academy Materials; must not upload them to any file-sharing service, messaging group, forum or social platform; and must not use them to train any machine learning model.</p>
      <p><strong>11.4</strong> On notice from the Academy, the Family must remove any Academy Material they have made available and confirm removal in writing within five working days. Failure to do so is grounds for referral under Section 9.2.</p>
      <p><strong>11.5</strong> Work created by the Student in the course of the program &mdash; the Student&rsquo;s own speeches, cases and written arguments &mdash; belongs to the Student. The Academy&rsquo;s licence to use it is governed solely by Section 10.</p>`,
    },
    {
      id: "s12",
      label: "12. Data protection",
      title: "12. Data protection",
      body: `<p>This section summarizes how the Academy handles the Family&rsquo;s data under this Agreement. The full detail &mdash; what is collected, why, how long it is kept, and the Family&rsquo;s rights under United States law &mdash; is set out in the <a href="privacy.html">Privacy Policy</a>, which forms part of this Agreement.</p>
      <p><strong>12.1</strong> The Academy collects the Student&rsquo;s name, age, school year, contact details, attendance and assessment records, and, where consented, recordings. It processes these to administer the program, ensure safety, allocate places, and issue credentials.</p>
      <p><strong>12.2</strong> The Academy protects this data with reasonable security measures, does not sell it, and uses it only for the purposes stated in this Agreement or separately consented to.</p>
      <p><strong>12.3</strong> The Family may request access to the personal data held about the Student, may request correction of factual errors, and may request deletion of data the Academy is not required to retain. Requests are answered within thirty days.</p>
      <p><strong>12.4</strong> The Academy retains enrollment and attendance records for three years after the Student&rsquo;s last cohort, credential records indefinitely so that certificates remain verifiable, and register entries as provided in Section 9.8.</p>
      <p><strong>12.5</strong> The Academy may disclose personal data where required by law, where requested by a competent authority, or where necessary to protect any person&rsquo;s safety.</p>`,
    },
    {
      id: "s13",
      label: "13. Liability",
      title: "13. Liability",
      body: `<p><strong>13.1</strong> The Academy provides its programs free of charge, on a volunteer basis, and on an &ldquo;as is&rdquo; basis. It gives no warranty as to any particular educational outcome, competitive result, admission outcome, or standard of instruction. All information shared by the Academy is final and may be changed at its discretion.</p>
      <p><strong>13.2</strong> To the fullest extent permitted by law, the Academy, its directors, officers and volunteers are not liable for any indirect, consequential or incidental loss, or for any loss of opportunity, arising from participation in or exclusion from its programs.</p>
      <p><strong>13.3</strong> Nothing in this Agreement excludes or limits liability for death or personal injury caused by negligence, for fraud, or for any liability that cannot lawfully be excluded.</p>
      <p><strong>13.4</strong> The Family is responsible for the Student&rsquo;s internet access, device and study environment, and for supervising a minor Student&rsquo;s use of online platforms outside session times.</p>
      <p><strong>13.5</strong> The Family indemnifies the Academy against any claim arising from the Family&rsquo;s own breach of Sections 10.7, 11.3 or 5.3.</p>`,
    },
    {
      id: "s14",
      label: "14. Termination and amendment",
      title: "14. Termination and amendment",
      body: `<p><strong>14.1</strong> The Family may withdraw at any time by written notice to info@debatecraft.org. As no fee is charged, no refund arises. Section 3.7 applies to the effect on future places.</p>
      <p><strong>14.2</strong> The Academy may terminate this Agreement in accordance with Section 8.</p>
      <p><strong>14.3</strong> The Academy may amend this Agreement on thirty days&rsquo; written notice. A Family that does not accept an amendment may withdraw within that period without any consequence under Section 3.7. Continued participation after the notice period constitutes acceptance.</p>
      <p><strong>14.4</strong> Sections 9 through 13 survive termination.</p>`,
    },
    {
      id: "s15",
      label: "15. General",
      title: "15. General",
      body: `<p><strong>15.1 Language.</strong> <strong>This Agreement is made in English. The English text is the sole operative version and is the only version that is signed.</strong> The Academy may provide a Cantonese or other translation as a courtesy to aid understanding. Any such translation has no legal effect, is not part of this Agreement, and does not vary it. In the event of any difference between a translation and the English text, the English text governs absolutely. By signing, the Family confirms that it has read the English text, or has had it explained, and understands it.</p>
      <p><strong>15.2 Severability.</strong> If any provision is held unenforceable, it is severed and the remainder continues in force.</p>
      <p><strong>15.3 No waiver.</strong> The Academy&rsquo;s failure to enforce any provision on one occasion is not a waiver of that provision.</p>
      <p><strong>15.4 Entire agreement.</strong> This Agreement, with its Schedules, is the entire agreement between the parties and supersedes all prior representations and agreements.</p>
      <p><strong>15.5 Notices.</strong> Notices to the Academy are given to info@debatecraft.org and are effective only if sent there. Notices to the Family are given to the contact details on file and are deemed received one working day after sending.</p>
      <p><strong>15.6 Force majeure.</strong> The Academy is not in breach where performance is prevented by events outside its reasonable control, including platform failure, illness of volunteers, or public health measures. The Academy will reschedule where reasonably possible.</p>
      <p><strong>15.7 Assignment.</strong> The Family may not assign this Agreement. The Academy may assign it to a successor entity, including on incorporation or on obtaining charitable status.</p>`,
    },
    {
      id: "sa",
      label: "Schedule A — Attendance points",
      title: "Schedule A &mdash; Attendance points",
      body: `<div class="legal-table-wrap"><table class="legal-table">
        <thead><tr><th>Event</th><th>Points</th></tr></thead>
        <tbody>
          <tr><td>Absence notified 24+ hours in advance</td><td>0.5</td></tr>
          <tr><td>Absence notified late but within 24 hours after the session</td><td>1</td></tr>
          <tr><td>Absence not notified</td><td>2</td></tr>
          <tr><td>Arrival more than 15 minutes late, or departure more than 15 minutes early</td><td>0.5</td></tr>
          <tr><td>Present but non-responsive for the majority of a session, after one warning in that session</td><td>1</td></tr>
          <tr><td>Absence due to illness, bereavement, examinations, or circumstances outside the Family&rsquo;s control, notified</td><td>0</td></tr>
        </tbody>
      </table></div>
      <p>Six points within a cohort triggers Section 3.5. Points reset at the end of each cohort. Points do not accrue during a period of suspension.</p>`,
    },
    {
      id: "sb",
      label: "Schedule B — Parent conduct ladder",
      title: "Schedule B &mdash; Parent conduct ladder",
      body: `<div class="legal-table-wrap"><table class="legal-table">
        <thead><tr><th>Stage</th><th>Trigger</th><th>Response</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>A single instance of raised, dismissive or discourteous communication</td><td>The Academy states the standard in writing and asks that it be observed. No record beyond the message itself.</td></tr>
          <tr><td>2</td><td>Repetition after Stage 1, or a first instance of contacting a volunteer privately or outside hours</td><td>Written warning from a Director, recorded on file, with the specific conduct identified.</td></tr>
          <tr><td>3</td><td>Repetition after Stage 2, sustained pressure after a decision, or public allegations about a named volunteer</td><td>Single point of contact imposed under Section 5.5 for the remainder of the cohort. Written notice with reasons.</td></tr>
          <tr><td>4</td><td>Repetition after Stage 3, or a first instance of abusive, degrading or discriminatory language toward any volunteer</td><td>Suspension of the Family&rsquo;s place pending review under Section 8.3, and referral to Schedule C, Tier 1 or 2.</td></tr>
          <tr><td>5</td><td>Threatening, intimidating, violent or sexualised conduct toward any Academy member, at any time</td><td>Immediate withdrawal of the place, referral to Schedule C at Tier 2 or 3, and referral to the appropriate authority where warranted. No prior stage required.</td></tr>
        </tbody>
      </table></div>`,
    },
    {
      id: "sc",
      label: "Schedule C — Ineligibility tiers",
      title: "Schedule C &mdash; Ineligibility tiers",
      body: `<div class="legal-table-wrap"><table class="legal-table">
        <thead><tr><th>Tier</th><th>Duration</th><th>Applies to</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>12 months</td><td>Repeated attendance failure under Section 3.7; Schedule B Stage 4 on a first occasion; dishonesty in an application.</td></tr>
          <tr><td>2</td><td>36 months</td><td>Repetition after a Tier 1 entry has expired; unauthorised distribution of Academy Materials at scale or for gain; dishonesty in obtaining an assessment outcome or certificate; sustained conduct the Academy reasonably considers harassment of a volunteer.</td></tr>
          <tr><td>3</td><td>Permanent, reviewed every 3 years</td><td>Threatening, intimidating, violent or sexualised conduct toward any Academy member; conduct creating a safeguarding risk to a child; conduct that has been referred to a law enforcement or child protection authority.</td></tr>
        </tbody>
      </table></div>`,
    },
    {
      id: "sack",
      label: "Acceptance",
      title: "Acceptance",
      body: `<p>Enrollment requires the Student, and &mdash; where the Student is under eighteen &mdash; the Parent, to accept this Agreement in full, as described in Section 1.5. By accepting, the Family confirms it has read and understood, in particular:</p>
      <ul>
        <li><strong>Section 3.3</strong> &mdash; failing to attend the first session without notice forfeits the place automatically.</li>
        <li><strong>Section 3.7</strong> &mdash; attendance history affects eligibility for future programs.</li>
        <li><strong>Section 5</strong> &mdash; the Academy&rsquo;s staff are themselves students and mostly minors, and a place may be withdrawn because of a Parent&rsquo;s conduct.</li>
        <li><strong>Section 9</strong> &mdash; the Academy maintains an ineligibility register, entries are time-limited by default, and an entry may be appealed.</li>
        <li><strong>Section 6</strong> &mdash; the only permitted channels are info@debatecraft.org and the Student&rsquo;s coach&rsquo;s @debatecraft.org address during the cohort, all coach email is copied to info@debatecraft.org, and contact with a coach ends when the cohort ends.</li>
        <li><strong>Section 10.1</strong> &mdash; sessions are recorded for teaching, supervision and safeguarding as a condition of participation, and those recordings are never published.</li>
        <li><strong>Section 10.3</strong> &mdash; unless opted out, the Student&rsquo;s identifiable image may be used in DebateCraft&rsquo;s marketing and recruitment material, and the Family may opt out at any time.</li>
        <li><strong>Section 1.5</strong> &mdash; this Agreement must be accepted in full, no amendment or reservation the Family makes has any effect, and no place exists until a signed Agreement is received.</li>
        <li><strong>Section 15.1</strong> &mdash; the English text is the only operative version, and any translation provided is a courtesy with no legal effect.</li>
      </ul>
      <p>A Family may, at the point of signing, opt out of the coaching archive (Section 10.2), opt out of external publication (Section 10.3), and request that the Student&rsquo;s name not be used alongside their image (Section 10.5) &mdash; none of which affects the Student&rsquo;s place.</p>
      <p>The Family receives a signed copy of this Agreement as part of the enrollment process. Questions about the current enrollment process, or about this Agreement, go to info@debatecraft.org.</p>`,
    },
  ];

  function TermsPage() {
    return h(LegalPage, {
      eyebrow: "Terms of Service",
      title: "Student and Family",
      emphasis: "Agreement.",
      effective: "Effective from July 1, 2026 — supersedes all prior Student Agreements",
      note: TERMS_NOTE,
      intro: TERMS_INTRO,
      sections: TERMS_SECTIONS,
    });
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
        { prompt: "Turn this idea into PEEL: social media helps movements organize.", answer: "Point: Social media helps grassroots movements coordinate. Explain: it reduces coordination costs and reaches supporters quickly. Example: movements can publish evidence, organize protests, and fundraise online. Link: this shows how social media can create political voice despite its harms." },
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
        ["Clash", "A clash is the central question both teams are fighting over rather than a list of arguments.", "For UBI, a clash might be dignity and poverty relief versus fiscal cost."],
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

  const practiceMotionBank = [
    ["m1", "THW ban zoos.", "本院會禁止動物園。", "Easy", "General", "Society"],
    ["m2", "THBT all students should be required to learn a musical instrument.", "本院認為所有學生都應該學習一種樂器。", "Easy", "General", "Education"],
    ["m3", "THW ban homework for primary school students.", "本院會禁止小學生做功課。", "Easy", "General", "Education"],
    ["m4", "THBT professional athletes are overpaid.", "本院認為職業運動員薪酬過高。", "Easy", "General", "Economics"],
    ["m5", "THW make school uniforms compulsory in all schools.", "本院會要求所有學校強制穿校服。", "Easy", "General", "Education"],
    ["m6", "THW ban advertisements for junk food targeted at children.", "本院會禁止針對兒童的垃圾食品廣告。", "Easy", "General", "Health"],
    ["m7", "THBT voting in national elections should be compulsory.", "本院認為全國選舉投票應該是強制性。", "Easy", "WSDC", "Politics"],
    ["m8", "THBT social media has done more harm than good for society.", "本院認為社交媒體對社會弊多於利。", "Easy", "General", "Society"],
    ["m9", "THW implement a universal basic income.", "本院會實施全民基本收入。", "Medium", "WSDC", "Economics"],
    ["m10", "THW abolish private schools.", "本院會廢除私立學校。", "Medium", "WSDC", "Education"],
    ["m11", "THW ban for-profit prisons.", "本院會禁止牟利監獄。", "Medium", "General", "Justice"],
    ["m12", "THW allow and regulate the sale of human organs.", "本院會容許並規管人體器官買賣。", "Medium", "BP", "Health"],
    ["m13", "THR the rise of cancel culture.", "本院遺憾 cancel culture 的興起。", "Medium", "BP", "Society"],
    ["m14", "THBT developed countries should have open borders.", "本院認為已發展國家應該開放邊境。", "Medium", "WSDC", "Politics"],
    ["m15", "THW replace trial by jury with trial by professional judges.", "本院會以專業法官審訊取代陪審團審訊。", "Hard", "BP", "Justice"],
    ["m16", "THR the principle of absolute state sovereignty.", "本院遺憾絕對國家主權原則。", "Hard", "BP", "Politics"],
    ["m17", "THW allow parents to genetically enhance their unborn children.", "本院會容許父母對未出生子女進行基因增強。", "Hard", "Bioethics", "Science"],
    ["m18", "THBT nationalism is, on balance, destructive.", "本院認為民族主義整體而言具破壞性。", "Hard", "WSDC", "Politics"],
    ["m19", "THW ban lethal autonomous weapons.", "本院會禁止致命自主武器。", "Hard", "General", "Technology"],
    ["m20", "THBT conscientious objection should not justify doctors refusing legal procedures.", "本院認為良心拒絕不應成為醫生拒絕合法程序的理由。", "Hard", "Bioethics", "Health"],
    ["m21", "THW require social media platforms to verify all users' ages.", "本院會要求社交媒體平台核實所有用戶年齡。", "Medium", "General", "Technology"],
    ["m22", "THW prioritize climate adaptation over climate mitigation in developing countries.", "本院會要求發展中國家優先處理氣候適應，而非氣候減緩。", "Hard", "WSDC", "Environment"],
  ].map(([id, motion, zhMotion, difficulty, format, theme]) => ({ id, motion, zhMotion, difficulty, format, theme }));

  const headCoachKeys = ["Valmik", "Matthew Wong", "Arthur", "Gavin"];
  const cleanCoachName = (name = "") => name.replace(/\?$/, "").trim();
  const isHeadCoach = (name = "") => headCoachKeys.includes(cleanCoachName(name));
  const cohort = (nameEn, nameZh, datesEn, datesZh, time, teachers, backup, capacity) => {
    const teacherList = Array.isArray(teachers) ? teachers : [teachers].filter(Boolean);
    const visibleHeadCoaches = teacherList.filter(isHeadCoach);
    return {
      key: nameEn,
      cohortId: `cohort-${slugify(nameEn)}`,
      name: isZh ? nameZh || nameEn : nameEn,
      dates: isZh ? datesZh : datesEn,
      time,
      classSize: String(capacity).includes("/") ? String(capacity).split("/").pop() : capacity,
      hasHeadCoach: visibleHeadCoaches.length > 0,
    };
  };

  const courses = [
    {
      tone: "beginner",
      color: "orange",
      name: isZh ? "Level 1 · 辯論入門" : "Level 1 · Introduction to Debate",
      tagline: isZh ? "9歲以上 · 無需辯論經驗" : "Ages 9+ · No prior experience required",
      meta: isZh ? "5班 · 15節課 · 班級人數：8" : "5 cohorts · 15 sessions · Class Size: 8",
      blurb: isZh
        ? "為年輕初學者設計的嚴謹入門課程，帶學生由邏輯與蘇格拉底式推理開始，透過適齡而高互動的模擬辯論掌握 PEEL 立論方法。"
        : "A rigorous introduction to logic and Socratic reasoning for younger beginners. Students master the PEEL argumentation method through high-energy mock debates on age-appropriate motions.",
      cohorts: [
        cohort("Level 1 A", null, "13 Jul → 31 Jul", "7月13日 → 7月31日", "15:00 – 16:00", ["Hirannya", "Raul"], ["TBC"], "7/8"),
        cohort("Level 1 B", null, "20 Jul → 07 Aug", "7月20日 → 8月7日", "10:00 – 11:00", ["Piers", "Tanvi"], ["Cici"], "7/8"),
        cohort("Level 1 C", null, "20 Jul → 07 Aug", "7月20日 → 8月7日", "16:00 – 17:00", ["Cici", "Hirannya"], ["Vera"], "4/8"),
        cohort("Level 1 D", null, "27 Jul → 14 Aug", "7月27日 → 8月14日", "11:00 – 12:00", ["Matthew Wong", "Tanvi"], ["TBC"], "8/8"),
        cohort("Level 1 E", null, "27 Jul → 14 Aug", "7月27日 → 8月14日", "16:00 – 17:00", ["Cheryl", "Sanaya", "Eric"], ["Cici"], "5/8"),
      ],
    },
    {
      tone: "intermediate",
      color: "ink",
      name: isZh ? "Level 2 · 中級辯論" : "Level 2 · Intermediate Debate",
      tagline: isZh ? "延續課程 · 約一年經驗或完成 Level 1" : "Continuing students · ~1 year experience or Level 1 completion",
      meta: isZh ? "2班 · 班級人數：10" : "2 cohorts · Class Size: 10",
      blurb: isZh
        ? "適合完成 Level 1 或已有基礎的學生。課程節奏更快，深入訓練反駁、辯題分析與更嚴謹的邏輯。"
        : "For Level 1 graduates. Sessions move faster and spend more time on rebuttal and motion analysis.",
      cohorts: [
        cohort("Level 2 A", null, "22 Jun → 03 Jul", "6月22日 → 7月3日", "15:00 – 16:00", ["Piers", "Larissa"], ["Calvin"], "7/10"),
        cohort("Level 2 C", null, "27 Jul → 07 Aug", "7月27日 → 8月7日", "15:00 – 16:00", ["Raul", "Theo W"], ["Hirannya"], "5/10"),
      ],
    },
    {
      tone: "advanced",
      color: "blue",
      name: isZh ? "WSDC · World Schools 訓練" : "WSDC · World Schools Training",
      tagline: isZh ? "13歲以上 · WSDC / 高階辯論訓練" : "Ages 13+ · WSDC and advanced World Schools training",
      meta: isZh ? "3班 · 班級人數：10" : "3 cohorts · Class Size: 10",
      blurb: isZh
        ? "面向準備高階 World Schools 訓練的學生，集中訓練五分鐘演講、策略準備、style 與 content。"
        : "World Schools training in five-minute speeches, strategic preparation, style, and content.",
      cohorts: [
        cohort("Level 2B WSDC", null, "06 Jul → 17 Jul", "7月6日 → 7月17日", "16:00 – 18:00", ["Valmik", "Sanaya?", "Andre"], [], "6/10"),
        cohort("Level 3 WSDC A", null, "06 Jul → 17 Jul", "7月6日 → 7月17日", "10:00 – 12:00", ["Theo W", "Valmik"], ["Cici"], "6/10"),
        cohort("L3 WSDC B", null, "03 Aug → 14 Aug", "8月3日 → 8月14日", "17:00 – 19:00", ["Rachel", "Cici"], ["Valmik"], "6/10"),
      ],
    },
    {
      tone: "advanced",
      color: "blue",
      name: isZh ? "Level 3 · British Parliamentary (BP)" : "Level 3 · British Parliamentary (BP)",
      tagline: isZh ? "13歲以上 · 2年以上經驗 · 大學式辯論" : "Ages 13+ · 2+ years experience · University-style debate",
      meta: isZh ? "1班 · 10節兩小時課 · 班級人數：8" : "1 cohort · 10 × 2-hr sessions · Class Size: 8",
      blurb: isZh
        ? "訓練快速批判思考、五分鐘演講、extensions 與 Points of Information。"
        : "Trains rapid critical thinking and five-minute speech delivery, with mastery of extensions and Points of Information.",
      cohorts: [cohort("Level 3 BP", null, "20 Jul → 31 Jul", "7月20日 → 7月31日", "17:00 – 19:00", ["Matthew Wong", "Raul"], ["Cici"], "5/8")],
    },
    {
      tone: "specialty",
      color: "bio",
      name: isZh ? "生物倫理" : "Bioethics",
      tagline: isZh ? "13歲以上 · 跨學科 · Harkness 討論方法" : "Ages 13+ · Interdisciplinary · Harkness method",
      meta: isZh ? "2班 · 10節一小時課 · 班級人數：8" : "2 cohorts · 10 × 1-hr sessions · Class Size: 8",
      blurb: isZh
        ? "探索科學與倫理的交界，分析現代研究人員面對的道德困境。"
        : "Where science meets ethics. Students confront moral dilemmas in modern research and medicine.",
      cohorts: [
        cohort("Bioethics A", "生物倫理 A", "13 Jul → 24 Jul", "7月13日 → 7月24日", "20:00 – 21:00", ["Adrian", "Dowan", "Emmanuel"], [], "0/8"),
        cohort("Bioethics B", "生物倫理 B", "27 Jul → 07 Aug", "7月27日 → 8月7日", "10:00 – 11:00", ["Dowan", "Oliver"], ["Cici"], "8/8"),
        cohort("Bioethics C", "生物倫理 C", "03 Aug → 14 Aug", "8月3日 → 8月14日", "20:00 – 21:00", ["Oliver", "Dowan"], ["Adrian"], "5/8"),
      ],
    },
  ];

  function buildSearchIndex(members = []) {
    const norm = (...parts) =>
      parts
        .flat()
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    const records = [];

    Object.keys(pageTitles)
      .filter((id) => id.startsWith("cn") === isZh)
      .forEach((id) => {
        const title = pageTitles[id];
        const description = pageDescriptions[id] || "";
        records.push({
          type: "page",
          title,
          subtitle: description,
          href: pageFileMap[id] || `${id}.html`,
          keywords: norm(title, description),
        });
      });

    programs.forEach((p) => {
      records.push({
        type: "course",
        title: p.title,
        subtitle: p.tag,
        href: isZh ? "cncourses.html" : "offerings.html",
        keywords: norm(p.title, p.tag, p.text, p.details),
      });
    });

    guideResources.forEach((g) => {
      records.push({
        type: "guide",
        title: g.title,
        subtitle: g.text,
        href: g.href,
        external: true,
        keywords: norm(g.title, g.text, g.group),
      });
    });

    videoResources.forEach((v) => {
      records.push({
        type: "video",
        title: v.title,
        subtitle: v.text,
        href: v.embed.includes("/embed/") ? `https://www.youtube.com/watch?v=${v.embed.match(/\/embed\/([^?]+)/)[1]}` : v.embed,
        external: true,
        keywords: norm(v.title, v.text, v.group),
      });
    });

    frameworkLessons.forEach((f) => {
      records.push({
        type: "framework",
        title: f.title,
        subtitle: f.lead,
        href: `mannernew.html#${f.id}`,
        keywords: norm(f.title, f.lead, f.sections?.map((s) => s.join(" "))),
      });
    });

    FAQ_ITEMS.forEach((item) => {
      const q = isZh ? item.q.zh : item.q.en;
      const a = isZh ? item.a.zh : item.a.en;
      records.push({
        type: "faq",
        title: q,
        subtitle: a,
        href: isZh ? "cnget-involved.html" : "get-involved.html",
        keywords: norm(q, a),
      });
    });

    members.forEach((m) => {
      records.push({
        type: "person",
        title: displayName(m.name),
        subtitle: m.role,
        href: `${isZh ? "cnteam.html" : "team.html"}#member-${slugify(m.name)}`,
        keywords: norm(m.name, m.role, m.school, m.bio, m.achievements),
      });
    });

    return records;
  }

  const deliverySpectrums = {
    volume: { label: "Volume", levels: ["Very Soft", "Soft", "Conversational", "Loud", "Yelling"], why: "Appropriate volume ensures you are heard and respected. It conveys confidence and matches the room." },
    tone: { label: "Tone", levels: ["Monotone", "Flat", "Expressive", "Emphatic", "Dramatic"], why: "Tone conveys emotion and intent. A mismatched tone can confuse your audience, while a rich tone builds connection." },
    pace: { label: "Pace & Pauses", levels: ["Rushed", "Deliberate", "Moderate", "Strategic", "Masterful"], why: "Pacing controls the flow of information. Strategic pauses give important ideas more weight." },
    articulation: { label: "Articulation", levels: ["Mumbled", "Poor", "Adequate", "Clear", "Pristine"], why: "If your audience cannot understand your words, your message is lost. Crisp articulation builds credibility." },
    emphasis: { label: "Emphasis", levels: ["Monotonous", "Weak", "Moderate", "Strong", "Exaggerated"], why: "Emphasis guides interpretation. Stressing a different word can change the meaning of a sentence." },
    certainty: { label: "Certainty", levels: ["Very Uncertain", "Uncertain", "Neutral", "Certain", "Very Certain"], why: "A confident delivery makes arguments sound more credible, but overconfidence can feel unsupported." },
    gestures: { label: "Gestures", levels: ["Stiff", "Subtle", "Expressive", "Animated", "Distracting"], why: "Purposeful gestures illustrate ideas and clarify delivery. Random movement distracts." },
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
      { s: ["Expressive tone keeps listeners engaged."], w: [], ex: "Telling a suspenseful story with varied pitch." },
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
    ["love", "This means deep attachment rather than casual liking."],
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
      ["practice", isZh ? "練習工具" : "Practice Toolkit", "Tools"],
      ["learn", isZh ? "框架練習" : "Frameworks", "Drills"],
      ["manner", isZh ? "演說實驗室" : "Manner", "Lab"],
      ["mitigation", isZh ? "Even If" : "Even If", "Game"],
    ];
    const renderTool = () => {
      if (activeTool === "practice") return h(PracticeToolkit);
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
        subtitle: isZh ? "指南、影片、練習工具、框架練習、表達方式訓練與 Even If 反駁遊戲，集中在與一個 React 工具庫。" : "Guides, videos, the Practice Toolkit, framework drills, delivery practice, and the Even If mitigation game in one React resource hub.",
      }),
      h(
        Section,
        null,
        h(
          "div",
          { className: "resource-layout" },
          h(
            "aside",
            { className: "resource-sidebar", role: "tablist", "aria-label": isZh ? "資源分類" : "Resource sections" },
            tools.map(([id, label, meta]) =>
              h(
                "button",
                {
                  key: id,
                  id: `resource-tab-${id}`,
                  role: "tab",
                  className: `resource-tab${activeTool === id ? " active" : ""}`,
                  "aria-selected": activeTool === id,
                  "aria-controls": `resource-panel-${id}`,
                  onClick: () => setActiveTool(id),
                },
                label,
                h("span", null, meta)
              )
            )
          ),
          h("div", { className: "resource-panel", id: `resource-panel-${activeTool}`, role: "tabpanel", "aria-labelledby": `resource-tab-${activeTool}` }, renderTool())
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
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "指南與影片庫" : "Guides and Video Library"), h("p", null, isZh ? "搜尋 DebateCraft 教練整理的 PDF、文件、工作坊影片與經典賽事。" : "Search DebateCraft PDFs, documents, workshop videos, and classic rounds curated for practice.")), h("div", { className: "segmented" }, [["guides", "Guides"], ["videos", "Videos"]].map(([id, label]) => h("button", { key: id, className: mode === id ? "active" : "", onClick: () => setMode(id) }, label)))),
      h("input", { className: "search-input", value: query, onChange: (e) => setQuery(e.target.value), placeholder: isZh ? "搜尋指南或影片..." : "Search guides or videos..." }),
      mode === "guides"
        ? h("div", { className: "resource-card-grid", style: { marginTop: 22 } }, visibleGuides.map((item, i) => h("article", { key: item.title, className: "compact-card", style: { "--accent": [ORANGE, SKY, "#0d9488", "#764ba2"][i % 4] } }, h("div", { className: "compact-meta" }, item.group), h("h3", null, item.title), h("p", null, item.text), h("div", { style: { marginTop: 18 } }, h(Button, { href: item.href }, isZh ? "打開資源" : "Open Resource")))))
        : h("div", { className: "video-shell", style: { marginTop: 22 } }, h("div", null, h("div", { className: "video-frame" }, h("iframe", { src: currentVideo.embed, title: currentVideo.title, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true })), h("div", { className: "compact-card", style: { marginTop: 16, "--accent": SKY } }, h("div", { className: "compact-meta" }, currentVideo.group), h("h3", null, currentVideo.title), h("p", null, currentVideo.text), currentVideo.transcript && h("div", { style: { marginTop: 18 } }, h(Button, { href: currentVideo.transcript }, isZh ? "查看逐字稿" : "Read Transcript")))), h("div", { className: "grid", style: { gap: 10 } }, visibleVideos.map((item) => h("button", { key: item.id, className: `option-card${activeVideo === item.id ? " selected" : ""}`, onClick: () => setActiveVideo(item.id), style: { color: NAVY, background: activeVideo === item.id ? "rgba(247,162,52,.16)" : WHITE, borderColor: activeVideo === item.id ? ORANGE : "rgba(17,29,60,.1)" } }, h("strong", null, item.title), h("div", { style: { fontSize: 12, color: "rgba(17,29,60,.55)", marginTop: 4 } }, item.group)))))
    );
  }

  function FrameworkLibrary() {
    const [activeLesson, setActiveLesson] = useState(() => {
      const hash = window.location.hash.replace("#", "");
      return frameworkLessons.some((item) => item.id === hash) ? hash : frameworkLessons[0].id;
    });
    const [openAnswer, setOpenAnswer] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [generated, setGenerated] = useState("Click Generate Motion to get a practice topic.");
    useEffect(() => {
      const onHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        if (frameworkLessons.some((item) => item.id === hash)) setActiveLesson(hash);
      };
      window.addEventListener("hashchange", onHashChange);
      return () => window.removeEventListener("hashchange", onHashChange);
    }, []);
    const lesson = frameworkLessons.find((item) => item.id === activeLesson) || frameworkLessons[0];
    const generateMotion = () => {
      const pool = motionBank.filter((item) => difficulty === "All" || item.difficulty === difficulty);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setGenerated(pick ? pick.motion : "No motions match that filter.");
    };
    return h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "互動框架練習" : "Interactive Framework Drills"), h("p", null, isZh ? "由 motion type 到 POI、rebuttal、clash 與 weighing，將舊資源頁的練習整理成 React 互動頁。" : "Motion types, roles, CPR, PEEL, POIs, rebuttal, clashes, and weighing rebuilt as React practice tools."))),
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
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, isZh ? "Manner Matters 演說實驗室" : "Manner Matters Speaking Lab"), h("p", null, isZh ? "練習聲量、語氣、節奏、咬字、重音、自信、手勢與眼神接觸。" : "Practice volume, tone, pace, articulation, emphasis, certainty, gestures, and eye contact."))),
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

  const practiceDraftDefaults = {
    motion: "THW ban zoos.",
    side: "Proposition",
    format: "WSDC",
    prepMinutes: 15,
    context: "",
    model: "",
    argumentOne: "",
    argumentTwo: "",
    rebuttal: "",
    weighing: "",
  };

  function formatClock(seconds) {
    const safe = Math.max(0, Number(seconds) || 0);
    const mins = Math.floor(safe / 60).toString().padStart(2, "0");
    const secs = Math.floor(safe % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function PracticeToolkit() {
	    const text = isZh
	      ? {
	          title: "練習工具",
	          lead: "搜尋辯題、收藏練習題目、建立備賽筆記，並用演講計時器訓練比賽節奏。",
	          tabs: { bank: "辯題庫", prep: "備賽工作區", timer: "演講計時器" },
	          clearAll: "清除工具資料",
	          search: "搜尋辯題...",
	          all: "全部",
	          usePrep: "用於備賽",
	          favorite: "收藏",
	          saved: "已收藏",
	          noMotions: "沒有符合條件的辯題。",
	          prepTitle: "備賽工作區",
	          prepLead: "草擬模型、論點、反駁與 weighing。內容只會儲存在此瀏覽器。",
	          motion: "辯題",
	          side: "立場",
	          format: "格式",
	          prepMinutes: "備賽分鐘",
	          context: "背景",
	          model: "模型 / 機制",
	          argumentOne: "論點一",
	          argumentTwo: "論點二",
	          rebuttal: "反駁",
	          weighing: "比較權衡",
	          copyNotes: "複製筆記",
	          clearDraft: "清除草稿",
	          copied: "已複製到剪貼簿",
	          start: "開始",
	          pause: "暫停",
	          reset: "重設",
	          timerTitle: "演講計時器",
	          timerLead: "選擇演講格式，追蹤保護時間與 POI 時段。此工具不會播放聲音。",
	          protected: "保護時間",
	          poiOpen: "POI 時段開放",
	          speechTime: "演講時間",
	          complete: "完成",
	          customMinutes: "自訂分鐘",
	          prepTimer: "備賽計時器",
	        }
      : {
          title: "Practice Toolkit",
          lead: "Search motions, favorite practice topics, build prep notes, and train speech timing for common debate formats.",
          tabs: { bank: "Motion Bank", prep: "Prep Workspace", timer: "Speech Timer" },
          clearAll: "Clear toolkit data",
          search: "Search motions...",
          all: "All",
          usePrep: "Use in Prep",
          favorite: "Favorite",
          saved: "Saved",
          noMotions: "No motions match those filters.",
          prepTitle: "Prep Workspace",
          prepLead: "Draft your model, case, rebuttal, and weighing. Notes stay only in this browser.",
          motion: "Motion",
          side: "Side",
          format: "Format",
          prepMinutes: "Prep minutes",
          context: "Context",
          model: "Model",
          argumentOne: "Argument 1",
          argumentTwo: "Argument 2",
          rebuttal: "Rebuttal",
          weighing: "Weighing",
          copyNotes: "Copy Notes",
          clearDraft: "Clear Draft",
          copied: "Copied to clipboard",
          start: "Start",
          pause: "Pause",
          reset: "Reset",
          timerTitle: "Speech Timer",
          timerLead: "Choose a speech format and track protected time and POI windows. No audio will play.",
          protected: "Protected time",
          poiOpen: "POI window open",
          speechTime: "Speech time",
	          complete: "Complete",
	          customMinutes: "Custom minutes",
	          prepTimer: "Prep Timer",
	        };
    const timerPresets = [
      { key: "wsdc", label: "WSDC 5:00", seconds: 300, poi: true },
      { key: "bp", label: "BP 5:00", seconds: 300, poi: true },
      { key: "custom", label: isZh ? "自訂" : "Custom", seconds: 240, poi: false },
    ];
    const [activeTool, setActiveTool] = useState("bank");
    const [query, setQuery] = useState("");
    const [motionDifficulty, setMotionDifficulty] = useState("All");
    const [motionFormat, setMotionFormat] = useState("All");
    const [motionTheme, setMotionTheme] = useState("All");
    const [favorites, setFavorites] = useStoredState("dcPracticeFavorites:v1", []);
    const [draft, setDraft] = useStoredState("dcPracticeDrafts:v1", practiceDraftDefaults);
    const [timerPreset, setTimerPreset] = useStoredState("dcTimerPreset:v1", "wsdc");
    const [customMinutes, setCustomMinutes] = useState(4);
    const [prepSeconds, setPrepSeconds] = useState(() => Number(practiceDraftDefaults.prepMinutes) * 60);
    const [prepRunning, setPrepRunning] = useState(false);
    const [speechSeconds, setSpeechSeconds] = useState(300);
    const [speechRunning, setSpeechRunning] = useState(false);
    const [copied, setCopied] = useState("");
    const currentPreset = timerPresets.find((item) => item.key === timerPreset) || timerPresets[0];
    const speechTotal = timerPreset === "custom" ? Math.max(1, Number(customMinutes) || 4) * 60 : currentPreset.seconds;
    const prepTotal = Math.max(1, Number(draft.prepMinutes) || 15) * 60;
    const formatOptions = ["All", ...Array.from(new Set(practiceMotionBank.map((item) => item.format)))];
    const themeOptions = ["All", ...Array.from(new Set(practiceMotionBank.map((item) => item.theme)))];
    const q = query.trim().toLowerCase();
    const visibleMotions = practiceMotionBank.filter((item) => {
      const motionText = isZh ? item.zhMotion : item.motion;
      return (
        (!q || `${item.motion} ${item.zhMotion} ${item.difficulty} ${item.format} ${item.theme}`.toLowerCase().includes(q)) &&
        (motionDifficulty === "All" || item.difficulty === motionDifficulty) &&
        (motionFormat === "All" || item.format === motionFormat) &&
        (motionTheme === "All" || item.theme === motionTheme)
      );
    });

    useEffect(() => {
      if (!prepRunning) return undefined;
      const timer = window.setInterval(() => setPrepSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
      return () => window.clearInterval(timer);
    }, [prepRunning]);

    useEffect(() => {
      if (prepSeconds === 0) setPrepRunning(false);
    }, [prepSeconds]);

    useEffect(() => {
      if (!prepRunning) setPrepSeconds(prepTotal);
    }, [draft.prepMinutes]);

    useEffect(() => {
      if (!speechRunning) return undefined;
      const timer = window.setInterval(() => setSpeechSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
      return () => window.clearInterval(timer);
    }, [speechRunning]);

    useEffect(() => {
      if (speechSeconds === 0) setSpeechRunning(false);
    }, [speechSeconds]);

    useEffect(() => {
      if (!speechRunning) setSpeechSeconds(speechTotal);
    }, [timerPreset, customMinutes]);

    const updateDraft = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));
    const motionText = (item) => (isZh ? item.zhMotion : item.motion);
    const toggleFavorite = (id) => setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    const useMotion = (item) => {
      setDraft((prev) => ({ ...prev, motion: motionText(item), format: item.format === "Bioethics" ? "WSDC" : item.format }));
      setActiveTool("prep");
    };
    const clearToolkit = () => {
      ["dcPracticeDrafts:v1", "dcPracticeFavorites:v1", "dcTimerPreset:v1"].forEach(removeStored);
      setDraft(practiceDraftDefaults);
      setFavorites([]);
      setTimerPreset("wsdc");
      setCustomMinutes(4);
      setPrepRunning(false);
      setSpeechRunning(false);
      setPrepSeconds(Number(practiceDraftDefaults.prepMinutes) * 60);
      setSpeechSeconds(300);
    };
    const notesText = [
      `${text.motion}: ${draft.motion}`,
      `${text.side}: ${draft.side}`,
      `${text.format}: ${draft.format}`,
      "",
      `${text.context}: ${draft.context}`,
      `${text.model}: ${draft.model}`,
      `${text.argumentOne}: ${draft.argumentOne}`,
      `${text.argumentTwo}: ${draft.argumentTwo}`,
      `${text.rebuttal}: ${draft.rebuttal}`,
      `${text.weighing}: ${draft.weighing}`,
    ].join("\n");
    const copyNotes = async () => {
      try {
        await navigator.clipboard.writeText(notesText);
        setCopied(text.copied);
      } catch {
        setCopied(isZh ? "請手動複製 notes" : "Copy unavailable; select the notes manually.");
      }
    };
    const elapsedSpeech = speechTotal - speechSeconds;
    const poiOpen = currentPreset.poi && elapsedSpeech >= 60 && speechSeconds > 60;
    const timerStatus = speechSeconds === 0 ? text.complete : currentPreset.poi ? (poiOpen ? text.poiOpen : text.protected) : text.speechTime;

    const bankPanel = h(
      React.Fragment,
      null,
      h(
        "div",
        { className: "filter-bar" },
        h("input", { className: "search-input", value: query, onChange: (e) => setQuery(e.target.value), placeholder: text.search }),
        h("select", { className: "select-input", value: motionDifficulty, onChange: (e) => setMotionDifficulty(e.target.value) }, ["All", "Easy", "Medium", "Hard"].map((item) => h("option", { key: item, value: item }, item === "All" ? text.all : item))),
        h("select", { className: "select-input", value: motionFormat, onChange: (e) => setMotionFormat(e.target.value) }, formatOptions.map((item) => h("option", { key: item, value: item }, item === "All" ? text.all : item))),
        h("select", { className: "select-input", value: motionTheme, onChange: (e) => setMotionTheme(e.target.value) }, themeOptions.map((item) => h("option", { key: item, value: item }, item === "All" ? text.all : item)))
      ),
      h(
        "div",
        { className: "motion-list" },
        visibleMotions.length
          ? visibleMotions.map((item, index) =>
              h(
                "article",
                { key: item.id, className: "motion-card", style: { "--accent": [ORANGE, SKY, "#0d9488", "#764ba2"][index % 4] } },
                h("h3", null, motionText(item)),
                h("div", { className: "motion-meta" }, [item.difficulty, item.format, item.theme].map((meta) => h("span", { key: meta }, meta))),
                h("div", { className: "motion-actions" }, h("button", { className: "mini-btn", onClick: () => useMotion(item) }, text.usePrep), h("button", { className: `mini-btn${favorites.includes(item.id) ? " active" : ""}`, onClick: () => toggleFavorite(item.id) }, favorites.includes(item.id) ? text.saved : text.favorite))
              )
            )
          : h("div", { className: "answer-box" }, text.noMotions)
      )
    );

    const prepPanel = h(
      "div",
      null,
      h(
        "div",
        { className: "tool-head" },
        h("div", null, h("h2", null, text.prepTitle), h("p", null, text.prepLead)),
        h("div", { className: "finder-actions" }, h("button", { className: "mini-btn", onClick: copyNotes }, text.copyNotes), h("button", { className: "mini-btn", onClick: () => { removeStored("dcPracticeDrafts:v1"); setDraft(practiceDraftDefaults); } }, text.clearDraft))
      ),
      copied && h("div", { className: "answer-box", style: { marginBottom: 14 } }, copied),
      h(
        "div",
        { className: "grid grid-2" },
        h(
          "div",
          { className: "timer-face" },
	          h("div", { className: "timer-status" }, text.prepTimer),
          h("div", { className: "timer-time" }, formatClock(prepSeconds)),
          h("div", { className: "timer-track" }, h("div", { className: "timer-fill", style: { width: `${(prepSeconds / prepTotal) * 100}%` } })),
          h("div", { className: "finder-actions", style: { justifyContent: "center" } }, h("button", { className: "btn", onClick: () => setPrepRunning(!prepRunning) }, prepRunning ? text.pause : text.start), h("button", { className: "btn ghost", onClick: () => { setPrepRunning(false); setPrepSeconds(prepTotal); } }, text.reset))
        ),
        h(
          "div",
          { className: "prep-grid" },
          h("div", { className: "prep-field" }, h("label", null, text.side), h("select", { className: "select-input", value: draft.side, onChange: (e) => updateDraft("side", e.target.value) }, ["Proposition", "Opposition", "Government", "Opposition/Closing"].map((item) => h("option", { key: item, value: item }, item)))),
          h("div", { className: "prep-field" }, h("label", null, text.format), h("select", { className: "select-input", value: draft.format, onChange: (e) => updateDraft("format", e.target.value) }, ["WSDC", "BP", "General"].map((item) => h("option", { key: item, value: item }, item)))),
          h("div", { className: "prep-field" }, h("label", null, text.prepMinutes), h("input", { className: "search-input", type: "number", min: 1, max: 60, value: draft.prepMinutes, onChange: (e) => updateDraft("prepMinutes", e.target.value) }))
        )
      ),
      h("div", { className: "prep-field", style: { marginTop: 14 } }, h("label", null, text.motion), h("textarea", { className: "practice-area", value: draft.motion, onChange: (e) => updateDraft("motion", e.target.value) })),
      h("div", { className: "prep-grid", style: { marginTop: 14 } }, [["context", text.context], ["model", text.model], ["argumentOne", text.argumentOne], ["argumentTwo", text.argumentTwo], ["rebuttal", text.rebuttal], ["weighing", text.weighing]].map(([key, label]) => h("div", { className: "prep-field", key }, h("label", null, label), h("textarea", { className: "practice-area", value: draft[key], onChange: (e) => updateDraft(key, e.target.value) }))))
    );

    const timerPanel = h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, text.timerTitle), h("p", null, text.timerLead))),
      h("div", { className: "segmented", style: { marginBottom: 16 } }, timerPresets.map((preset) => h("button", { key: preset.key, className: timerPreset === preset.key ? "active" : "", onClick: () => { setTimerPreset(preset.key); setSpeechRunning(false); } }, preset.label))),
      timerPreset === "custom" && h("div", { className: "prep-field", style: { marginBottom: 16, maxWidth: 240 } }, h("label", null, text.customMinutes), h("input", { className: "search-input", type: "number", min: 1, max: 20, value: customMinutes, onChange: (e) => setCustomMinutes(e.target.value) })),
      h(
        "div",
        { className: "timer-face" },
        h("div", { className: "timer-status" }, timerStatus),
        h("div", { className: "timer-time" }, formatClock(speechSeconds)),
        h("div", { className: "timer-track" }, h("div", { className: "timer-fill", style: { width: `${(speechSeconds / speechTotal) * 100}%`, background: poiOpen ? SKY : ORANGE } })),
        h("div", { className: "finder-actions", style: { justifyContent: "center" } }, h("button", { className: "btn", onClick: () => setSpeechRunning(!speechRunning) }, speechRunning ? text.pause : text.start), h("button", { className: "btn ghost", onClick: () => { setSpeechRunning(false); setSpeechSeconds(speechTotal); } }, text.reset))
      )
    );

    return h(
      "div",
      null,
      h("div", { className: "tool-head" }, h("div", null, h("h2", null, text.title), h("p", null, text.lead)), h("button", { className: "mini-btn", onClick: clearToolkit }, text.clearAll)),
      h(
        "div",
        { className: "toolkit-layout" },
        h("div", { className: "toolkit-menu" }, Object.entries(text.tabs).map(([key, label]) => h("button", { key, className: activeTool === key ? "active" : "", onClick: () => setActiveTool(key) }, label))),
        h(
          "div",
          { className: "toolkit-panel" },
          activeTool === "bank" && bankPanel,
          activeTool === "prep" && prepPanel,
          activeTool === "timer" && timerPanel
        )
      )
    );
  }

  function ResourcesPage() {
    return h(
      React.Fragment,
      null,
      h(ResourceHubPage),
      h(ProofGallerySection, {
        set: "resources",
        cream: true,
        eyebrow: isZh ? "技能練習" : "Skill Practice",
        title: isZh ? "資源連接" : "Materials That",
        emphasis: isZh ? "實戰練習。" : "Become Practice.",
        lead: isZh ? "課堂截圖展示教材、計時練習和引導式辯論訓練如何連接到自學資源。" : "Classroom visuals show how lesson materials, timed drills, and guided debate practice connect to the resource hub.",
      })
    );
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
    return h(React.Fragment, null, h(PageHeader, { eyebrow: isZh ? "文章" : "Blog", title: isZh ? "DebateCraft 文章" : "DebateCraft Blog", emphasis: "", subtitle: isZh ? "辯論訓練、比賽與課程筆記。" : "Notes on debate training, tournaments, and teaching." }), h(Section, null, h("div", { className: "grid grid-2" }, h(InfoCard, { title: "Why I Debate", tag: "July 6, 2025 · Adrian Chan", text: "Debate sharpens arguments, but practice also teaches teammates to test controversial ideas without tearing each other down." }, h("div", { style: { marginTop: 20 } }, h(Button, { href: "https://debatecraft.substack.com/p/e79f3fbf-a404-402f-9702-6e962aa5660a?postPreview=paid&updated=2025-07-06T22%3A40%3A32.998Z&audience=everyone&free_preview=false&freemail=true" }, isZh ? "閱讀 →" : "Read More →"))), h(InfoCard, { title: isZh ? "訂閱更新" : "Subscribe", text: isZh ? "接收辯論技巧、課程時間與新教材。" : "Receive debate drills, class dates, and new teaching materials.", accent: SKY }, h("div", { style: { marginTop: 20 } }, h(Button, { href: "https://debatecraft.substack.com/subscribe" }, isZh ? "訂閱 →" : "Subscribe →"))))));
  }

  function CTA() {
    return null;
  }

  function Footer() {
    return h(
      "footer",
      { className: "footer" },
      h("div", { className: "footer-bottom" },
        h("span", null, "© 2026 DebateCraft"),
        h("a", { href: "mailto:info@debatecraft.org" }, "info@debatecraft.org"),
        h("a", { href: localHref("privacy.html") }, "Privacy Policy"),
        h("a", { href: localHref("terms.html") }, "Terms of Service"),
        h("a", { href: t.nav.langHref }, t.nav.lang)
      )
    );
  }
  function CalendarPage() {
    const css = `
      .calendar-poster { --cal-orange:#ae9562; --cal-sky:#0d5ea6; --cal-bio:#0d5ea6; --cal-navy:#071a2f; --cal-navy-deep:#102b49; --cal-cream:#f4f3ee; --cal-white:#fff; --cal-hair:rgba(7,26,47,.12); --cal-muted:rgba(7,26,47,.62); --cal-shadow:0 18px 50px rgba(7,26,47,.10); background:var(--cal-cream); color:var(--cal-navy); overflow-x:hidden; }
      .calendar-poster * { box-sizing:border-box; }
      .calendar-hero { position:relative; overflow:hidden; padding:92px 32px 84px; background:var(--cal-navy); color:var(--cal-white); text-align:center; }
      .calendar-hero::after { content:""; position:absolute; right:max(32px,calc((100vw - 1200px)/2)); top:54px; width:220px; height:220px; border:18px solid rgba(247,162,52,.52); border-right-color:transparent; border-radius:50%; opacity:.55; pointer-events:none; }
      .calendar-title { position:relative; z-index:1; max-width:1100px; margin:0 auto 8px; font-family:'Playfair Display',Georgia,serif; font-size:clamp(52px,9vw,104px); font-weight:800; line-height:.98; letter-spacing:-.02em; }
      .calendar-title.sub { font-size:clamp(42px,6.5vw,78px); }
      .calendar-title .year { color:var(--cal-orange); }
      .calendar-subtitle { position:relative; z-index:1; max-width:720px; margin:18px auto 0; color:rgba(255,255,255,.68); font-size:17px; line-height:1.7; }
      .calendar-facts { position:relative; z-index:1; width:min(100%,980px); margin:42px auto 0; display:grid; grid-template-columns:repeat(4,1fr); border:1px solid rgba(17,29,60,.16); border-radius:8px; background:var(--cal-orange); box-shadow:0 18px 42px rgba(0,0,0,.18); overflow:hidden; }
      .calendar-fact { padding:22px 18px; border-right:1px solid rgba(17,29,60,.15); text-align:center; }
      .calendar-fact:last-child { border-right:none; }
      .calendar-fact-label { color:rgba(17,29,60,.62); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; margin-bottom:4px; }
      .calendar-fact-value { font-family:'Playfair Display',Georgia,serif; color:var(--cal-navy); font-size:28px; font-weight:800; line-height:1.05; }
      .calendar-fact-value .dim { color:rgba(17,29,60,.45); }
      .calendar-section-head { width:min(100%,1200px); margin:0 auto; padding:78px 32px 24px; display:flex; align-items:end; gap:24px; justify-content:space-between; }
      .calendar-section-title { font-family:'Playfair Display',Georgia,serif; color:var(--cal-navy); font-size:clamp(34px,5vw,50px); font-weight:800; line-height:1.08; letter-spacing:-.01em; }
      .calendar-section-num { color:var(--cal-orange); font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
      .calendar-gantt-wrap { width:min(100%,1200px); margin:0 auto; padding:0 32px 42px; overflow-x:auto; }
      .calendar-gantt { display:grid; min-width:960px; grid-template-columns:190px repeat(8,minmax(86px,1fr)); background:var(--cal-white); border:1px solid var(--cal-hair); border-top:4px solid var(--cal-orange); border-radius:8px; box-shadow:var(--cal-shadow); overflow:hidden; }
      .calendar-gantt-head, .calendar-gantt-row { display:contents; }
      .calendar-gantt-head > div { padding:15px 10px; background:var(--cal-navy); color:rgba(255,255,255,.62); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
      .calendar-gantt-head > div + div { border-left:1px solid rgba(255,255,255,.08); text-align:center; }
      .calendar-row-name { padding:13px 14px; border-bottom:1px solid var(--cal-hair); color:var(--cal-navy); font-size:13px; font-weight:800; background:rgba(245,240,232,.62); display:flex; align-items:center; gap:8px; }
      .calendar-cell { height:43px; border-left:1px solid var(--cal-hair); border-bottom:1px solid var(--cal-hair); position:relative; }
      .calendar-gantt-row:last-child > .calendar-row-name, .calendar-gantt-row:last-child > .calendar-cell { border-bottom:none; }
      .calendar-bar { position:absolute; left:8px; top:50%; transform:translateY(-50%); height:12px; border-radius:999px; box-shadow:0 6px 14px rgba(17,29,60,.15); }
      .calendar-bar.orange, .calendar-dot.orange, .calendar-swatch.orange { background:var(--cal-orange); }
      .calendar-bar.blue, .calendar-dot.blue, .calendar-swatch.blue { background:var(--cal-sky); }
      .calendar-bar.bio, .calendar-dot.bio, .calendar-swatch.bio { background:var(--cal-bio); }
      .calendar-bar.ink, .calendar-dot.ink, .calendar-swatch.ink { background:var(--cal-navy); }
      .calendar-dot, .calendar-swatch { width:10px; height:10px; border-radius:50%; flex-shrink:0; display:inline-block; }
      .calendar-legend { display:flex; gap:24px; margin-top:14px; flex-wrap:wrap; color:rgba(17,29,60,.56); font-size:10px; font-weight:800; letter-spacing:.11em; text-transform:uppercase; }
      .calendar-legend > div { display:flex; align-items:center; gap:8px; }
      .calendar-courses { width:min(100%,1200px); margin:0 auto; padding:8px 32px 66px; }
      .calendar-tier { margin-top:28px; background:var(--cal-white); border:1px solid var(--cal-hair); border-radius:8px; box-shadow:var(--cal-shadow); overflow-x:auto; }
      .calendar-tier:first-child { margin-top:0; }
      .calendar-tier-head { padding:24px; border-bottom:1px solid var(--cal-hair); background:var(--cal-white); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:7px 24px; }
      .calendar-tier-head.beginner { border-top:4px solid var(--cal-orange); }
      .calendar-tier-head.intermediate { border-top:4px solid var(--cal-navy); }
      .calendar-tier-head.specialty { border-top:4px solid var(--cal-bio); }
      .calendar-tier-head.advanced { border-top:4px solid var(--cal-sky); }
      .calendar-tier-name { font-family:'Playfair Display',Georgia,serif; color:var(--cal-navy); font-size:30px; font-weight:800; grid-row:1; grid-column:1; }
      .calendar-tier-tagline { color:var(--cal-muted); font-size:14px; line-height:1.55; grid-row:2; grid-column:1; }
      .calendar-tier-meta { align-self:center; padding:8px 12px; border:1px solid var(--cal-hair); border-radius:999px; background:var(--cal-cream); color:rgba(17,29,60,.68); font-size:10px; font-weight:800; letter-spacing:.11em; text-transform:uppercase; white-space:nowrap; grid-row:1/span 2; grid-column:2; }
      .calendar-tier-blurb { padding:20px 24px 4px; color:rgba(17,29,60,.68); font-size:15px; line-height:1.72; }
      .calendar-cohorts { width:100%; min-width:860px; border-collapse:collapse; margin-top:12px; }
      .calendar-cohorts th { padding:14px 16px; background:rgba(245,240,232,.72); color:rgba(17,29,60,.56); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; text-align:left; border-bottom:1px solid var(--cal-hair); }
      .calendar-cohorts th.num, .calendar-cohorts td.num { text-align:left; }
      .calendar-cohorts td { padding:16px; color:var(--cal-navy); font-size:14px; border-bottom:1px solid var(--cal-hair); vertical-align:middle; }
      .calendar-cohorts tr.has-head-coach td { background:rgba(247,162,52,.08); }
      .calendar-cohorts tr { scroll-margin-top: 90px; }
      .calendar-cohorts tr:target td { background:rgba(61,195,232,.14); }
      .calendar-cohorts td.cohort { font-weight:800; white-space:nowrap; }
      .calendar-cohorts td.cohort .calendar-swatch { margin-right:8px; vertical-align:middle; transform:translateY(-1px); }
      .calendar-cohorts td.dates, .calendar-cohorts td.time, .calendar-cohorts td.head { color:rgba(17,29,60,.68); font-size:13px; font-weight:700; }
      .calendar-cohorts td.num { font-weight:800; font-variant-numeric:tabular-nums; }
      .calendar-cohorts tr:last-child td { border-bottom:none; }
      .calendar-head-list { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
      .calendar-head-coach { display:inline-flex; align-items:center; gap:7px; color:var(--cal-navy); font-weight:900; white-space:nowrap; text-decoration:none; border-radius:999px; outline-offset:3px; }
      .calendar-head-coach:hover .calendar-head-title, .calendar-head-coach:focus-visible .calendar-head-title { border-color:var(--cal-orange); background:rgba(247,162,52,.28); }
      .calendar-head-title { display:inline-flex; align-items:center; border:1px solid rgba(247,162,52,.45); border-radius:999px; background:rgba(247,162,52,.18); color:var(--cal-navy); padding:2px 7px; font-size:9px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .calendar-muted { color:rgba(17,29,60,.38); font-weight:800; }
      .calendar-head-note { margin-top:16px; border:1px solid rgba(247,162,52,.35); border-left:4px solid var(--cal-orange); border-radius:8px; background:rgba(247,162,52,.1); padding:14px 16px; color:rgba(17,29,60,.68); font-size:13px; line-height:1.65; }
      .calendar-head-note strong { color:var(--cal-navy); }
      .calendar-cta { width:100%; padding:70px max(32px,calc((100vw - 1200px)/2 + 32px)); background:var(--cal-navy); color:var(--cal-white); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:40px; align-items:center; }
      .calendar-cta-title { font-family:'Playfair Display',Georgia,serif; color:var(--cal-white); font-size:clamp(40px,6vw,62px); font-weight:800; line-height:1.05; letter-spacing:-.01em; }
      .calendar-cta-title .accent { color:var(--cal-orange); font-style:italic; }
      .calendar-cta-sub { color:rgba(255,255,255,.65); margin-top:12px; font-size:15px; line-height:1.7; max-width:540px; }
      .calendar-actions { display:flex; gap:12px; flex-wrap:wrap; margin-top:24px; }
      .calendar-apply, .calendar-secondary { display:inline-flex; align-items:center; justify-content:center; min-height:44px; padding:0 18px; border-radius:6px; font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; }
      .calendar-apply { background:var(--cal-orange); color:var(--cal-navy); }
      .calendar-secondary { border:1px solid rgba(255,255,255,.16); color:var(--cal-white); }
      .calendar-cta-box { min-width:300px; padding:24px; border:1px solid rgba(255,255,255,.12); border-top:4px solid var(--cal-orange); border-radius:8px; background:rgba(255,255,255,.06); }
      .calendar-cta-box .label { color:rgba(255,255,255,.48); font-size:10px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; margin-bottom:8px; }
      .calendar-cta-box .val { font-family:'Playfair Display',Georgia,serif; color:var(--cal-white); font-size:24px; font-weight:800; letter-spacing:-.01em; }
      .calendar-cta-box .val + .label { margin-top:14px; }
      @media (max-width:900px) {
        .calendar-hero { padding:72px 24px 62px; }
        .calendar-hero::after { width:150px; height:150px; border-width:14px; right:20px; top:36px; }
        .calendar-facts { grid-template-columns:repeat(2,1fr); }
        .calendar-fact:nth-child(2) { border-right:none; }
        .calendar-fact:nth-child(-n+2) { border-bottom:1px solid rgba(17,29,60,.15); }
        .calendar-section-head { padding:58px 24px 20px; flex-direction:column; align-items:flex-start; }
        .calendar-gantt-wrap, .calendar-courses { padding-left:24px; padding-right:24px; }
        .calendar-tier-head { grid-template-columns:1fr; }
        .calendar-tier-meta { justify-self:start; grid-row:auto; grid-column:1; white-space:normal; text-align:left; }
        .calendar-cta { grid-template-columns:1fr; padding:58px 24px; }
        .calendar-cta-box { min-width:0; }
      }
      @media (max-width:560px) {
        .calendar-hero { text-align:left; }
        .calendar-title, .calendar-subtitle { margin-left:0; margin-right:0; }
        .calendar-facts { grid-template-columns:1fr; }
        .calendar-fact, .calendar-fact:nth-child(2) { border-right:none; border-bottom:1px solid rgba(17,29,60,.15); text-align:left; }
        .calendar-fact:last-child { border-bottom:none; }
      }
    `;

    const facts = isZh
      ? [
          ["日期", h(React.Fragment, null, "6月22日 ", h("span", { className: "dim" }, "→"), " 8月14日")],
          ["形式", "網上 · Zoom"],
          ["費用", "免費 · 開放申請"],
          ["小班數目", "16"],
        ]
      : [
          ["Window", h(React.Fragment, null, "22 Jun ", h("span", { className: "dim" }, "→"), " 14 Aug")],
          ["Format", "Online · Zoom"],
          ["Cost", "Free · Open to All"],
          ["Cohorts", "16"],
        ];

    const weeks = isZh
      ? ["6月22日", "6月29日", "7月6日", "7月13日", "7月20日", "7月27日", "8月3日", "8月10日"]
      : ["Jun 22", "Jun 29", "Jul 6", "Jul 13", "Jul 20", "Jul 27", "Aug 3", "Aug 10"];
    const timelineRows = [
      ["Level 2 A", "ink", 0, 2],
      ["Level 2B WSDC", "blue", 2, 2],
      ["Level 3 WSDC A", "blue", 2, 2],
      ["Level 1 A", "orange", 3, 3],
      ["Level 1 B", "orange", 4, 3],
      ["Level 1 C", "orange", 4, 3],
      ["Level 3 BP", "blue", 4, 2],
      [isZh ? "生物倫理 A" : "Bioethics A", "bio", 3, 2],
      ["Level 1 D", "orange", 5, 3],
      ["Level 1 E", "orange", 5, 3],
      ["Level 2 C", "ink", 5, 2],
      [isZh ? "生物倫理 B" : "Bioethics B", "bio", 5, 2],
      [isZh ? "生物倫理 C" : "Bioethics C", "bio", 6, 2],
      ["L3 WSDC B", "blue", 6, 2],
    ];

    const [classCoaches, setClassCoaches] = useState({});
    useEffect(() => {
      fetch(`../data/${isZh ? "cnteam_members" : "team_members"}.json?v=calendar`)
        .then((r) => r.json())
        .then((members) => {
          const byClass = {};
          members.forEach((member) => {
            (member.classes || []).forEach((classId) => {
              if (!byClass[classId]) byClass[classId] = [];
              byClass[classId].push({ name: member.name, role: member.role });
            });
          });
          setClassCoaches(byClass);
        })
        .catch(() => setClassCoaches({}));
    }, []);

    const teamHrefForCoach = (profile) => `${isZh ? "cnteam.html" : "team.html"}#member-${slugify(profile.name)}`;

    const SectionHead = ({ title, meta }) =>
      h("div", { className: "calendar-section-head" }, h("div", { className: "calendar-section-title" }, title), h("div", { className: "calendar-section-num" }, meta));

    const TimelineRow = ([label, color, start, span]) =>
      h(
        "div",
        { className: "calendar-gantt-row", key: label },
        h("div", { className: "calendar-row-name" }, h("span", { className: `calendar-dot ${color}`, "aria-hidden": true }), label),
        weeks.map((week, index) =>
          h(
            "div",
            { className: "calendar-cell", key: `${label}-${week}` },
            index === start && h("div", { className: `calendar-bar ${color}`, style: { width: `calc(${span * 100}% - 16px)` }, "aria-hidden": true })
          )
        )
      );

    const HeadCoachList = ({ coaches }) => {
      const list = coaches && coaches.length ? coaches : [];
      if (!list.length) return h("span", { className: "calendar-muted" }, "—");
      return h(
        "div",
        { className: "calendar-head-list" },
        list.map((profile) =>
          h(
            "a",
            { className: "calendar-head-coach", href: teamHrefForCoach(profile), key: profile.name, "aria-label": isZh ? `前往團隊頁面查看 ${displayName(profile.name)}` : `View ${displayName(profile.name)} on the team page` },
            h("span", { className: "calendar-head-title" }, profile.role),
            " ",
            h("span", null, displayName(profile.name))
          )
        )
      );
    };

    const CourseTable = ({ course }) =>
      h(
        "table",
        { className: "calendar-cohorts" },
        h(
          "thead",
          null,
          h(
            "tr",
            null,
            (isZh ? ["班別", "日期", "時間 (GMT+8)", "主教練", "班級人數"] : ["Cohort", "Dates", "Time (GMT+8)", "Head Coach", "Class Size"]).map((label) => h("th", { key: label }, label))
          )
        ),
        h(
          "tbody",
          null,
          course.cohorts.map((item) =>
            h(
              "tr",
              { id: item.cohortId, key: item.cohortId, className: item.hasHeadCoach ? "has-head-coach" : "" },
              h("td", { className: "cohort" }, h("span", { className: `calendar-swatch ${course.color}`, "aria-hidden": true }), item.name),
              h("td", { className: "dates" }, item.dates),
              h("td", { className: "time" }, item.time),
              h("td", { className: "head" }, h(HeadCoachList, { coaches: classCoaches[item.key] })),
              h("td", { className: "num" }, item.classSize)
            )
          )
        )
      );

    const CourseCard = (course) =>
      h(
        "article",
        { className: "calendar-tier", key: course.name },
        h(
          "div",
          { className: `calendar-tier-head ${course.tone}` },
          h("div", { className: "calendar-tier-name" }, course.name),
          h("div", { className: "calendar-tier-tagline" }, course.tagline),
          h("div", { className: "calendar-tier-meta" }, course.meta)
        ),
        h("p", { className: "calendar-tier-blurb" }, course.blurb),
        h(CourseTable, { course })
      );

    return h(React.Fragment, null,
      h("style", { dangerouslySetInnerHTML: { __html: css } }),
      h(
        "main",
        { className: "calendar-poster" },
        h(
          "section",
          { className: "calendar-hero" },
          h("h1", { className: "calendar-title" }, isZh ? "夏季 " : "Summer ", h("span", { className: "year" }, "2026")),
          h("div", { className: "calendar-title sub", role: "heading", "aria-level": 2 }, isZh ? "課程日程" : "Program Calendar"),
          h("p", { className: "calendar-subtitle" }, isZh ? "十六個已排小班 · 辯論及生物倫理課程 · 八個星期 · 費用全免。" : "Sixteen scheduled cohorts · Debate and bioethics courses · Eight weeks · Entirely free."),
          h(
            "div",
            { className: "calendar-facts" },
            facts.map(([label, value]) => h("div", { className: "calendar-fact", key: label }, h("div", { className: "calendar-fact-label" }, label), h("div", { className: "calendar-fact-value" }, value)))
          )
        ),
        h(
          "section",
          null,
          h(
            "div",
            { className: "calendar-gantt-wrap" },
            h(
              "div",
              { className: "calendar-gantt", role: "img", "aria-label": isZh ? "2026 夏季小班時間表，由 6月22日 至 8月14日" : "Summer 2026 cohort timeline from June 22 to August 14" },
              h("div", { className: "calendar-gantt-head" }, h("div", null, isZh ? "班別" : "Cohort"), weeks.map((week) => h("div", { key: week }, week))),
              timelineRows.map(TimelineRow)
            ),
            h(
              "div",
              { className: "calendar-legend" },
              h("div", null, h("span", { className: "calendar-dot orange", "aria-hidden": true }), isZh ? "入門 · Level 1" : "Beginner · Level 1"),
              h("div", null, h("span", { className: "calendar-dot ink", "aria-hidden": true }), isZh ? "中級" : "Intermediate"),
              h("div", null, h("span", { className: "calendar-dot bio", "aria-hidden": true }), isZh ? "生物倫理" : "Bioethics"),
              h("div", null, h("span", { className: "calendar-dot blue", "aria-hidden": true }), isZh ? "高階 · Level 3" : "Advanced · Level 3")
            ),
          )
        ),
        h(
          "section",
          null,
          h("div", { className: "calendar-courses" }, courses.map(CourseCard))
        ),
        h(
          "section",
          { className: "calendar-cta" },
          h(
            "div",
            null,
            h("div", { className: "calendar-cta-title" }, isZh ? "為你的小朋友報名" : "Register your child", h("br"), isZh ? "參加 " : "for ", h("span", { className: "accent" }, isZh ? "2026 夏季課程。" : "Summer 2026.")),
            h("p", { className: "calendar-cta-sub" }, isZh ? "名額按申請次序安排，小班人數有限，熱門時段可能較快額滿。課程費用全免，亦不需要申請文章；報名表格約三分鐘即可完成。" : "Places are allocated on a first-come basis and small cohort sizes mean popular times fill quickly. There is no fee and no application essay: registration takes under three minutes."),
            h("div", { className: "calendar-actions" }, h("a", { className: "calendar-apply", href: STUDENT_FORM_URL, ...extProps(STUDENT_FORM_URL) }, isZh ? "免費申請 →" : "Apply Free →"), h("a", { className: "calendar-secondary", href: isZh ? "cncourses.html" : "offerings.html" }, isZh ? "瀏覽課程" : "Explore Courses"))
          ),
        )
      )
    );
  }

  function renderPage() {
    if (["about", "story", "cnabout", "cnstory"].includes(pageId)) return h(MissionPage);
    if (["offerings", "cnofferings", "cncourses"].includes(pageId)) return h(ProgramsPage);
    if (["training-pathway", "cntraining-pathway"].includes(pageId)) return h(TrainingPathwayPage);
    if (["biology", "cnbiology"].includes(pageId)) return h(ProgramsPage, { biology: true });
    if (["others", "cnothers"].includes(pageId)) return h(ProgramsPage, { other: true });
    if (["team", "cnteam"].includes(pageId)) return h(TeamPage);
    if (["partnership", "cnpartnership"].includes(pageId)) return h(PartnershipPage);
    if (["get-involved", "cnget-involved"].includes(pageId)) return h(GetInvolvedPage);
    if (["donate", "cndonate"].includes(pageId)) return h(DonatePage);
    if (["contact", "cncontact"].includes(pageId)) return h(ContactPage);
    if (["resources", "cnresources"].includes(pageId)) return h(ResourcesPage);
    if (["calendar", "cncalendar"].includes(pageId)) return h(ProgramsPage);
    if (pageId === "mannernew") return h(ResourceHubPage, { initialTool: "learn" });
    if (pageId === "guides") return h(GuidesPage);
    if (pageId === "blog") return h(BlogPage);
    if (pageId === "manner") return h(MannerPage);
    if (pageId === "even-if") return h(MitigationPage);
    if (pageId === "privacy") return h(PrivacyPage);
    if (pageId === "terms") return h(TermsPage);
    return h(ResourcesPage);
  }

  function App() {
    if (isHome) return h(Nav);
    return h("div", { className: "dc-shell" }, h(Nav), renderPage(), h(Footer));
  }

  if (!isHome) applyPageMeta();
  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
