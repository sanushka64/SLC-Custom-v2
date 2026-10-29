/* Sri Lanka Customs Executive Experience
   Offline-ready, accessible showcase for local screenshot files.
   No external analytics, database connections or embedded Power BI.
*/
(() => {
  'use strict';
  const catalog = Array.isArray(window.DASHBOARD_CATALOG) ? window.DASHBOARD_CATALOG : [];
  const byId = new Map(catalog.map(d => [d.id,d]));
  const categories = [
    {id:'all',title:'All dashboards',short:'All',icon:'grid',color:'#276ff1',tint:'#e9f1ff'},
    {id:'finance',title:'Revenue & Finance',short:'Revenue & Finance',icon:'chart-line',color:'#1d8acb',tint:'#e8f5ff',ids:['accounting-revenue','relief-revenue','remittance']},
    {id:'trade',title:'Trade & Logistics',short:'Trade & Logistics',icon:'ship',color:'#1ea781',tint:'#e7faf2',ids:['import-analysis','export','import-container-movements','lcl','vehicle']},
    {id:'risk',title:'Risk & Investigation',short:'Risk & Investigation',icon:'shield',color:'#d67543',tint:'#fff0e5',ids:['risk-management','investigation-individuals']},
    {id:'storage',title:'Valuation & Storage',short:'Valuation & Storage',icon:'warehouse',color:'#8860d6',tint:'#f1edff',ids:['valuation-analysis','valuation-database','warehousing','advanced-warehouse']},
    {id:'explore',title:'Operations & Discovery',short:'Operations & Discovery',icon:'search',color:'#229ca9',tint:'#e6f9fb',ids:['cusdec-analysis','advanced-search']},
  ];
  const iconPaths = {
    'layout-dashboard':'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'grid':'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    'bookmark':'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V21l-7-4-7 4z"/>',
    'shield-check':'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    'shield':'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/>',
    'chart-line':'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 3 5-7"/>',
    'ship':'<path d="M3 17h18l-4 4H7z"/><path d="M5 17V9h14v8M9 9V4h6v5M2 21c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/>',
    'warehouse':'<path d="m3 10 9-7 9 7v11H3z"/><path d="M7 21v-9h10v9M7 16h10"/>',
    'search':'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
    'moon':'<path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z"/>',
    'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    'arrow-right':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    'arrow-left':'<path d="M19 12H5m6 6-6-6 6-6"/>',
    'external':'<path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    'chevron-left':'<path d="m15 18-6-6 6-6"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>',
    'image':'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    'images':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16H3a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v1"/><path d="m8 17 3-3 3 3 3-4 4 5"/>',
    'layers':'<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    'maximize':'<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/>',
    'expand':'<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><path d="m8 8-5-5m13 5 5-5M8 16l-5 5m13-5 5 5"/>',
    'x':'<path d="M18 6 6 18M6 6l12 12"/>',
    'plus':'<path d="M12 5v14M5 12h14"/>',
    'minus':'<path d="M5 12h14"/>',
    'copy':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    'star':'<path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8 5.7 21l1.2-6.8-5-4.9 7-1z"/>',
    'list':'<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
    'monitor':'<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8m-4-4v4"/>',
    'filter':'<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    'check':'<path d="m4 12 5 5L20 6"/>',
    'info':'<circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 7h.01"/>',
    'sparkles':'<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/>',
    'arrow-up-right':'<path d="M7 17 17 7M8 7h9v9"/>',
    'play':'<path d="m8 5 12 7-12 7z"/>',
    'pause':'<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>'
  };
  const ico = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]||iconPaths.image}</svg>`;
  const el = id => document.getElementById(id);
  const esc = value => String(value??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storage = {
    read(key, fallback){try{const found=JSON.parse(localStorage.getItem(key));return found===null?fallback:found}catch{return fallback}},
    set(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
  };
  const state={view:'overview',category:'all',sort:'az',layout:'grid',dashboard:null,page:0,gallery:false,railOpen:window.matchMedia('(min-width:1081px)').matches,lightbox:false,zoom:1,tx:0,ty:0,cmd:false,cmdIndex:0,query:''};
  const pagesOf = d => d.sections.flatMap(s=>s.pages.map(p=>({...p,sectionId:s.id,sectionTitle:s.title})));
  const categoryFor = d => categories.find(c=>c.ids&&c.ids.includes(d.id))||categories[0];
  const sourcePage = (d, index=0) => pagesOf(d)[index];
  const imageOf = (d, index=0, full=false) => {const p=sourcePage(d,index);return p?(full?p.image:p.preview||p.image):''};
  const theme=storage.read('customs-showcase-theme-v2','light');
  if(theme==='dark')document.body.dataset.theme='dark';
  let toastTimeout;
  let lastFocus;
  let pan=null;
  let slideTimer=null;

  function hydrateIcons(root=document){root.querySelectorAll('[data-icon]').forEach(n=>{n.innerHTML=ico(n.dataset.icon);n.removeAttribute('data-icon')})}
  function urlFor(view='overview',d=null,p=null){
    const url=new URL('index.html',document.baseURI);url.search='';url.hash='';
    if(d){url.searchParams.set('dashboard',d);if(p)url.searchParams.set('page',p)}
    else if(view!=='overview')url.searchParams.set('view',view);
    return url.href;
  }
  function readRoute(){
    const params=new URLSearchParams(location.search);
    const id=params.get('dashboard')||params.get('dash')||params.get('id');
    if(id&&byId.has(id)){
      state.view='viewer';state.dashboard=id;state.railOpen=window.matchMedia('(min-width:1081px)').matches;
      const pages=pagesOf(byId.get(id));const wanted=params.get('page');
      const target=pages.findIndex(p=>p.id===wanted);
      state.page=target>=0?target:0;
    }else{
      const view=params.get('view');state.view=['overview','library'].includes(view)?view:'overview';state.dashboard=null;
    }
  }
  function setRoute(view,d=null,p=null,replace=false){
    state.view=view;state.dashboard=d;
    if(d){const pages=pagesOf(byId.get(d));const idx=pages.findIndex(x=>x.id===p);state.page=idx>=0?idx:0}
    const target=urlFor(view,d,p);
    try{history[replace?'replaceState':'pushState']({},'',target)}catch{}
    render();
    window.scrollTo({top:0,behavior:'instant'});
  }
  function openDashboard(id,index=0){
    const d=byId.get(id);if(!d)return;
    const pages=pagesOf(d);index=Math.min(Math.max(0,index),pages.length-1);
    state.gallery=false;state.railOpen=window.matchMedia('(min-width:1081px)').matches;
    closeMobileMenu();
    setRoute('viewer',id,pages[index].id);
  }
  function changePage(index){
    if(state.view!=='viewer'||!state.dashboard)return;
    const d=byId.get(state.dashboard), pages=pagesOf(d);
    if(index<0||index>=pages.length){notify('You have reached the end of this dashboard');return}
    const wasModal=state.lightbox;
    if(state.page===index)return;
    state.page=index;
    const page=pages[index];
    try{history.pushState({},'',urlFor('viewer',d.id,page.id))}catch{}
    if(wasModal){updateLightbox();render();return}
    render();
  }
  function notify(message){
    const t=el('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimeout);
    toastTimeout=setTimeout(()=>t.classList.remove('show'),3100);
  }
  function updateChrome(){
    const nav=state.view==='viewer'?'library':state.view;
    document.querySelectorAll('#mainNav [data-nav]').forEach(b=>{b.classList.toggle('is-active',b.dataset.nav===nav);if(b.dataset.nav===nav)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
    document.querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('is-active',state.view==='library'&&b.dataset.cat===state.category));
    const d=state.dashboard?byId.get(state.dashboard):null;
    el('topCrumb').innerHTML=`<span class="crumb-sub">${d?'DASHBOARD LIBRARY':'PORTFOLIO'}</span><span class="crumb-slash">/</span><b>${esc(d?d.title:({overview:'Overview',library:'Dashboard library'}[state.view]||'Overview'))}</b>`;
    const themeButton=el('themeButton');themeButton.innerHTML=ico(document.body.dataset.theme==='dark'?'sun':'moon');
    themeButton.setAttribute('aria-label',document.body.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme');
    document.title=(d?d.title+' | ':'')+'Dashboard Portfolio | Sri Lanka Customs';
  }
  function card(d){
    const cat=categoryFor(d),count=pagesOf(d).length;
    return `<article class="dash-card" data-card-id="${esc(d.id)}"><a href="${esc(urlFor('viewer',d.id,sourcePage(d).id))}" class="dash-card-link" data-dash="${esc(d.id)}" aria-label="Open ${esc(d.title)} dashboard">
       <div class="dash-cover"><img loading="eager" decoding="async" src="${esc(d.cover||imageOf(d))}" alt="Preview of ${esc(d.title)} dashboard"><span class="category-floating">${esc(cat.title)}</span><span class="cover-launch">${ico('arrow-up-right')}</span></div>
       <div class="dash-card-details"><div class="dash-details-text"><h3 class="dash-title">${esc(d.title)}</h3><p class="dash-description">${esc(d.description)}</p><div class="dash-card-bottom">${ico('images')} ${count} ${count===1?'page':'pages'}${d.sections.length>1?`<span class="bottom-dot"></span>${d.sections.length} report versions`:''}</div></div></div></a>
    </article>`;
  }
  function filteredList(){
    let list=catalog.filter(d=>state.category==='all'||(categoryFor(d).id===state.category));
    if(state.sort==='pages')list.sort((a,b)=>pagesOf(b).length-pagesOf(a).length||a.title.localeCompare(b.title));
    if(state.sort==='za')list.sort((a,b)=>b.title.localeCompare(a.title));
    return list;
  }
  function chips(){return categories.map(c=>`<button type="button" class="filter-chip ${state.category===c.id?'is-active':''}" data-cat="${c.id}" aria-pressed="${state.category===c.id}">${esc(c.short)}</button>`).join('')}
  function libraryListing(withTitle=true){
    const list=filteredList();
    return `<section class="library-section" id="dashboardLibrary">${withTitle?`<div class="grid-heading"><div><div class="section-kicker">ALL DASHBOARDS</div><h2>Explore every dashboard</h2><p>Select a dashboard to view its report pages.</p></div><span style="font-size:11px;color:var(--muted);font-weight:800">${list.length} of ${catalog.length} dashboards</span></div>`:''}
       <div class="library-toolbar"><div class="filter-chips" role="group" aria-label="Filter by category">${chips()}</div><div class="library-tools"><label for="dashboardSort" style="font-size:10px;font-weight:700;color:var(--muted)">SORT</label><select id="dashboardSort" class="library-select" aria-label="Sort dashboards"><option value="az" ${state.sort==='az'?'selected':''}>Name A–Z</option><option value="za" ${state.sort==='za'?'selected':''}>Name Z–A</option><option value="pages" ${state.sort==='pages'?'selected':''}>Most pages</option></select><div class="view-switch" role="group" aria-label="Layout"><button type="button" title="Grid view" aria-label="Grid view" data-layout="grid" class="${state.layout==='grid'?'is-active':''}" aria-pressed="${state.layout==='grid'}">${ico('grid')}</button><button type="button" title="List view" aria-label="List view" data-layout="list" class="${state.layout==='list'?'is-active':''}" aria-pressed="${state.layout==='list'}">${ico('list')}</button></div></div></div>
       ${list.length?`<div class="dashboard-grid ${state.layout==='list'?'list-mode':''}">${list.map(card).join('')}</div>`:emptyListing()}
       <div class="summary-ticker">${ico('info')}<span><strong>Preview mode:</strong> These pages display supplied dashboard screenshots. Filters and slicers shown in screenshots are not interactive.</span></div></section>`;
  }
  function emptyListing(){
    return `<div class="empty-panel"><div class="empty-symbol">${ico('filter')}</div><h3>No dashboards in this selection</h3><p>Try another collection to discover dashboards.</p><button class="btn btn-accent" type="button" data-nav="library">${ico('arrow-right')} Browse all dashboards</button></div>`;
  }
  function overview(){
    const featured=byId.get('accounting-revenue')||catalog[0];
    return `<div class="page-intro"><div class="section-kicker">SRI LANKA CUSTOMS</div><h1>Dashboard portfolio</h1><p>Browse the dashboards developed for Sri Lanka Customs, organized by subject and report page.</p></div>
     <section class="hero" aria-label="Welcome to the dashboard showcase"><div class="hero-text"><span class="hero-eyebrow">FEATURED DASHBOARDS</span><h1>Explore our <em>dashboard work.</em></h1><p>View completed dashboards covering revenue, trade, risk, investigations, valuation and warehouse operations.</p><div class="hero-actions"><button type="button" class="btn btn-primary" data-action="explore">Explore dashboards ${ico('arrow-right')}</button><button class="btn btn-outline" type="button" data-dash="${esc(featured.id)}">View featured report ${ico('external')}</button></div></div><div class="hero-visual"><div class="hero-screen"><div class="screen-chrome"><i></i><i></i><i></i><span>ANALYTICS PREVIEW</span></div><img src="${esc(featured.cover)}" alt="Featured ${esc(featured.title)} screenshot"></div><div class="hero-sticker"><span>${ico('shield-check')}</span><div>Sri Lanka Customs<small>Dashboard portfolio</small></div></div></div></section>
     <section aria-labelledby="collectionHeading"><div class="collection-header"><div><div class="section-kicker">DASHBOARD CATEGORIES</div><h2 id="collectionHeading">Explore by domain</h2><p>Choose a subject area to browse its dashboards.</p></div></div><div class="collection-grid">${categories.filter(c=>c.id!=='all').map(c=>`<button type="button" class="collection-tile" data-cat="${esc(c.id)}" style="--tile-bg:${c.tint};--tile-fg:${c.color}"><span class="collection-icon">${ico(c.icon)}</span><strong>${esc(c.title)}</strong><small>${c.ids.length} dashboards</small></button>`).join('')}</div></section>
     ${libraryListing(true)}`;
  }
  function libraryPage(){
    const config=['DASHBOARD DIRECTORY','The dashboard library','Every analytics report, neatly organized for exploration.'];
    return `<div class="page-intro"><div class="section-kicker">${config[0]}</div><h1>${config[1]}</h1><p>${config[2]}</p></div>${libraryListing(false)}`;
  }
  function viewer(){
    const d=byId.get(state.dashboard);if(!d)return overview();
    const pages=pagesOf(d),page=pages[state.page]||pages[0],cat=categoryFor(d);
    const railGroups=d.sections.map(sec=>{
      const secpages=pages.map((p,i)=>({...p,index:i})).filter(p=>p.sectionId===sec.id);
      return `<div class="rail-section"><div class="rail-section-title">${esc(sec.title)} <span style="float:right">${secpages.length}</span></div>${secpages.map(p=>`<button type="button" data-page-index="${p.index}" class="rail-page ${state.page===p.index?'is-active':''}" ${state.page===p.index?'aria-current="page"':''}><span class="rail-thumb"><img loading="lazy" decoding="async" src="${esc(p.preview||p.image)}" alt=""></span><span><span class="rail-page-title">${esc(p.title)}</span><span class="rail-page-index">Page ${String(p.index+1).padStart(2,'0')}</span></span></button>`).join('')}</div>`;
    }).join('');
    return `<section class="viewer-header"><button class="viewer-back" type="button" data-nav="library">${ico('arrow-left')} Back to dashboard library</button><div class="viewer-heading"><div><div class="section-kicker">${esc(cat.title.toUpperCase())} / DASHBOARD</div><h1>${esc(d.title)}</h1><div class="viewer-meta"><span>${esc(d.description)}</span><i></i><span class="pill">${ico('layers')} ${d.sections.length} ${d.sections.length===1?'report':'reports'}</span><span class="pill">${ico('images')} ${pages.length} ${pages.length===1?'page':'pages'}</span></div></div><div class="heading-actions"><label class="dash-switch-wrap" aria-label="Switch dashboard"><select id="viewerDashSwitch" class="switch-select" aria-label="Switch to another dashboard">${catalog.map(x=>`<option value="${esc(x.id)}" ${x.id===d.id?'selected':''}>${esc(x.title)}</option>`).join('')}</select></label><button type="button" class="btn btn-paper" data-action="copy-link" title="Copy link to this page">${ico('copy')} <span>Copy link</span></button><button type="button" class="btn btn-accent" data-action="open-lightbox">${ico('expand')} Present</button></div></div></section>
    <div class="viewer-workspace ${state.railOpen?'':'rail-hidden'}"><div class="workspace-primary">
      ${state.gallery?`<div class="gallery-stage"><div class="gallery-toolbar"><div><h2>All report pages</h2><p>Choose any screenshot to start viewing it.</p></div><button type="button" class="btn btn-paper" data-action="toggle-gallery">${ico('monitor')} Viewer</button></div><div class="page-gallery-grid">${pages.map((p,i)=>`<button class="page-gallery-item ${state.page===i?'is-active':''}" type="button" data-page-index="${i}" data-from-gallery="true"><img loading="lazy" src="${esc(p.preview||p.image)}" alt="Preview of ${esc(p.title)}"><span>${esc(p.title)}<small>${esc(p.sectionTitle)} · Page ${i+1}</small></span></button>`).join('')}</div></div>`:
       `<div class="viewer-stage"><div class="stage-topbar"><div class="stage-topbar-left"><span class="stage-index">${String(state.page+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}</span><span class="stage-name">${esc(page.title)}</span></div><div class="stage-tools"><span class="stage-toolbar-note">PREVIEW</span><button type="button" data-action="toggle-gallery" title="View all pages" aria-label="View all pages">${ico('grid')}</button><button type="button" data-action="toggle-rail" title="${state.railOpen?'Hide':'Show'} page navigator" aria-label="${state.railOpen?'Hide':'Show'} page navigator">${ico('list')}</button><button type="button" data-action="open-lightbox" title="Expand image" aria-label="Expand screenshot">${ico('expand')}</button></div></div><button type="button" class="stage-thumbnail-action" data-action="open-lightbox" aria-label="Enlarge screenshot of ${esc(page.title)}"><div class="screenshot-stage"><img src="${esc(page.image)}" alt="${esc(d.title)} — ${esc(page.title)} screenshot" fetchpriority="high" onerror="this.alt='Screenshot could not load';"><span class="stage-watermark">DASHBOARD SCREENSHOT</span><span class="stage-hover-hint">${ico('expand')} Click to enlarge</span></div></button><div class="stage-bottom"><div class="stage-controls"><button type="button" class="stage-control" data-action="previous" ${state.page===0?'disabled':''}>${ico('chevron-left')}<span class="control-text">Previous</span></button><button type="button" class="stage-control" data-action="next" ${state.page===pages.length-1?'disabled':''}><span class="control-text">Next page</span>${ico('chevron-right')}</button></div><div class="stage-pagination"><span>Page</span><strong>${state.page+1}</strong><span>OF ${pages.length}</span></div><div class="stage-controls"><button type="button" class="stage-control" data-action="toggle-gallery">${ico('grid')}<span class="control-text"> Gallery</span></button><button type="button" class="stage-control" data-action="open-lightbox">${ico('expand')}<span class="control-text"> Enlarge</span></button></div></div></div>
       <div class="stage-caption"><div><h3>${esc(page.title)}</h3><p>${esc(page.sectionTitle)} · Select another page from the report list to continue browsing.</p></div><span class="preview-badge"><i></i> SCREENSHOT</span></div><div class="keyboard-help">KEYBOARD: <kbd>←</kbd><kbd>→</kbd> change page <kbd>Z</kbd> enlarge <kbd>G</kbd> gallery</div>`}
    </div><aside class="page-rail ${state.railOpen?'is-open':''}" id="pageRail" aria-label="Report page navigation"><div class="rail-head"><div class="rail-head-text"><h2>Report pages</h2><span>${pages.length} screens across ${d.sections.length} ${d.sections.length===1?'report':'reports'}</span></div><button class="mobile-rail-close" type="button" data-action="toggle-rail" aria-label="Close page navigation">${ico('x')}</button></div><div class="rail-scroll">${railGroups}</div></aside></div>`;
  }
  function render(){
    const content=state.view==='viewer'?viewer():state.view==='overview'?overview():libraryPage();
    el('appMain').innerHTML=content;
    updateChrome();
    const active=el('pageRail')?.querySelector('.rail-page.is-active');
    if(active&&state.railOpen)active.scrollIntoView({block:'nearest',behavior:'instant'});
  }
  function closeMobileMenu(){el('sidebar').classList.remove('mobile-open');el('mobileShade').hidden=true}
  function toggleMobileMenu(){const open=el('sidebar').classList.toggle('mobile-open');el('mobileShade').hidden=!open}
  function setCategory(cat){
    if(!categories.some(c=>c.id===cat))return;
    state.category=cat;state.sort='az';state.view='library';closeMobileMenu();setRoute('library');
  }
  async function copyLink(){
    const d=byId.get(state.dashboard),page=d?pagesOf(d)[state.page]:null,url=urlFor(d?'viewer':state.view,d?.id,page?.id);
    let copied=false;
    try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);copied=true}}catch{}
    if(!copied){try{const temp=document.createElement('textarea');temp.value=url;temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();copied=document.execCommand('copy');temp.remove()}catch{}}
    notify(copied?'Page link copied to clipboard':'Copy the address from your browser to share this page');
  }
  function openLightbox(){
    if(state.view!=='viewer')return;
    stopSlideshow();
    lastFocus=document.activeElement;
    state.lightbox=true;state.zoom=1;state.tx=0;state.ty=0;
    el('lightbox').hidden=false;document.body.style.overflow='hidden';
    updateLightbox();el('lightbox').querySelector('.lightbox-dismiss').focus();
  }
  function closeLightbox(){
    if(!state.lightbox)return;
    stopSlideshow();
    state.lightbox=false;el('lightbox').hidden=true;document.body.style.overflow='';
    if(document.fullscreenElement===el('lightbox'))document.exitFullscreen().catch(()=>{});
    if(lastFocus&&document.contains(lastFocus))lastFocus.focus();
  }
  function updateZoom(){
    el('zoomReadout').textContent=Math.round(state.zoom*100)+'%';
    el('lightboxImage').style.transform=`translate(${state.tx}px, ${state.ty}px) scale(${state.zoom})`;
    el('lightboxViewport').style.cursor=state.zoom>1?'grab':'zoom-in';
  }
  function zoomTo(next){
    const z=Math.min(5,Math.max(1,Number(next)||1));state.zoom=z;
    if(z===1){state.tx=0;state.ty=0}
    updateZoom();
  }
  function updateLightbox(){
    const d=byId.get(state.dashboard);if(!d)return;
    const pages=pagesOf(d),page=pages[state.page];
    el('lightboxTitle').textContent=d.title+' — '+page.title;
    el('lightboxCounter').textContent=`Page ${state.page+1} of ${pages.length}`;
    el('lightboxImage').src=page.image;
    el('lightboxImage').alt=d.title+' '+page.title+' screenshot';
    zoomTo(1);
    el('lightbox').querySelector('[data-action="previous"]').disabled=state.page===0;
    el('lightbox').querySelector('[data-action="next"]').disabled=state.page===pages.length-1;
  }
  function updateSlideshowButton(){const button=el('slideshowButton');button.innerHTML=ico(slideTimer?'pause':'play');button.title=slideTimer?'Pause slideshow':'Start slideshow';button.setAttribute('aria-label',button.title);button.setAttribute('aria-pressed',String(Boolean(slideTimer)))}
  function stopSlideshow(){if(slideTimer){clearInterval(slideTimer);slideTimer=null}updateSlideshowButton()}
  function toggleSlideshow(){
    if(slideTimer){stopSlideshow();return}
    if(!state.lightbox)return;
    const d=byId.get(state.dashboard);if(!d||pagesOf(d).length<2){notify('This dashboard has only one report page');return}
    slideTimer=setInterval(()=>{if(!state.lightbox){stopSlideshow();return}const pages=pagesOf(byId.get(state.dashboard));changePage((state.page+1)%pages.length)},7000);
    updateSlideshowButton();notify('Slideshow started · advances every 7 seconds');
  }
  function toggleFullscreen(){
    const lb=el('lightbox');
    if(document.fullscreenElement===lb){document.exitFullscreen?.().catch(()=>{})}
    else if(lb.requestFullscreen)lb.requestFullscreen().catch(()=>notify('Fullscreen is not available in this browser'));
    else notify('Fullscreen is not available in this browser');
  }
  function openSearch(){
    lastFocus=document.activeElement;state.cmd=true;state.query='';state.cmdIndex=0;
    el('commandDialog').hidden=false;el('commandInput').value='';
    renderSearch();el('commandInput').focus();
  }
  function closeSearch(){
    state.cmd=false;el('commandDialog').hidden=true;
    if(lastFocus&&document.contains(lastFocus))lastFocus.focus();
  }
  function queryResults(){
    const q=state.query.trim().toLowerCase(), matched=[];
    for(const d of catalog){
      const cat=categoryFor(d);
      if(!q||[d.title,d.description,cat.title].some(s=>s.toLowerCase().includes(q)))matched.push({type:'dashboard',d,title:d.title,desc:`${cat.title} · ${pagesOf(d).length} pages`});
    }
    if(q){for(const d of catalog){pagesOf(d).forEach((p,index)=>{if([p.title,p.sectionTitle,d.title+' '+p.title].some(s=>s.toLowerCase().includes(q))) matched.push({type:'page',d,index,title:p.title,desc:`${d.title} · ${p.sectionTitle}`})})}}
    if(q){matched.sort((a,b)=>{const score=r=>{const title=r.title.toLowerCase();if(title===q)return 0;if(title.startsWith(q))return 1;if(title.includes(q))return 2;if(r.d.description.toLowerCase().includes(q))return 3;return 4};return score(a)-score(b)||a.title.localeCompare(b.title)})}
    return matched.slice(0,q?35:8);
  }
  function renderSearch(){
    const items=queryResults();state.cmdIndex=Math.min(state.cmdIndex,Math.max(0,items.length-1));
    const dash=items.filter(r=>r.type==='dashboard'),pages=items.filter(r=>r.type==='page');let i=0;
    const itemMarkup=r=>{const idx=i++;return `<button type="button" class="command-result ${idx===state.cmdIndex?'is-highlighted':''}" data-cmd-index="${idx}"><span class="cmd-result-icon">${ico(r.type==='dashboard'?'layout-dashboard':'image')}</span><span class="cmd-result-text"><strong>${esc(r.title)}</strong><small>${esc(r.desc)}</small></span>${ico('arrow-up-right')}</button>`};
    el('commandResults').innerHTML=items.length?`${dash.length?`<div class="command-section-title">DASHBOARDS</div>${dash.map(itemMarkup).join('')}`:''}${pages.length?`<div class="command-section-title">REPORT PAGES</div>${pages.map(itemMarkup).join('')}`:''}`:'<div class="command-no-results">No dashboards or pages match your search.</div>';
  }
  function selectSearch(index){
    const result=queryResults()[index];if(!result)return;
    closeSearch();openDashboard(result.d.id,result.type==='page'?result.index:0);
  }
  function handleAction(action,button){
    switch(action){
      case 'menu':toggleMobileMenu();break;
      case 'theme':{const t=document.body.dataset.theme==='dark'?'light':'dark';document.body.dataset.theme=t;storage.set('customs-showcase-theme-v2',t);updateChrome();break}
      case 'search':openSearch();break;
      case 'close-search':closeSearch();break;
      case 'explore':el('dashboardLibrary')?.scrollIntoView({behavior:'smooth',block:'start'});break;
      case 'previous':stopSlideshow();changePage(state.page-1);break;
      case 'next':stopSlideshow();changePage(state.page+1);break;
      case 'toggle-gallery':state.gallery=!state.gallery;state.railOpen=false;render();break;
      case 'toggle-rail':state.railOpen=!state.railOpen;render();break;
      case 'open-lightbox':openLightbox();break;
      case 'close-lightbox':closeLightbox();break;
      case 'lightbox-zoom-in':zoomTo(state.zoom+.25);break;
      case 'lightbox-zoom-out':zoomTo(state.zoom-.25);break;
      case 'lightbox-reset':zoomTo(1);break;
      case 'lightbox-fullscreen':toggleFullscreen();break;
      case 'slideshow':toggleSlideshow();break;
      case 'copy-link':copyLink();break;
    }
  }
  function initialize(){
    if(!catalog.length){el('appMain').innerHTML='<p>Dashboard data is not available. Make sure catalog.js is in the same folder.</p>';return}
    el('sideCollections').innerHTML=categories.filter(c=>c.id!=='all').map(c=>`<button type="button" class="category-link" data-cat="${c.id}"><span class="category-icon">${ico(c.icon)}</span>${esc(c.title)}<span class="category-count">${c.ids.length}</span></button>`).join('');
    hydrateIcons();
    document.querySelector('.main-nav .nav-count').textContent=catalog.length;
    readRoute();render();
    document.addEventListener('click', e=>{
      if(e.target===el('mobileShade')){closeMobileMenu();return}
      if(e.target===el('commandDialog')){closeSearch();return}
      const act=e.target.closest('[data-action]');if(act){e.preventDefault();handleAction(act.dataset.action,act);return}
      const nav=e.target.closest('[data-nav]');if(nav){e.preventDefault();closeMobileMenu();state.category='all';state.sort='az';setRoute(nav.dataset.nav);return}
      const cat=e.target.closest('[data-cat]');if(cat){e.preventDefault();setCategory(cat.dataset.cat);return}
      const layout=e.target.closest('[data-layout]');if(layout){state.layout=layout.dataset.layout;render();return}
      const cmd=e.target.closest('[data-cmd-index]');if(cmd){selectSearch(Number(cmd.dataset.cmdIndex));return}
      const page=e.target.closest('[data-page-index]');if(page){const fromGallery=page.dataset.fromGallery==='true',oldPage=state.page,newPage=Number(page.dataset.pageIndex);state.gallery=fromGallery?false:state.gallery;changePage(newPage);if(oldPage===newPage)render();return}
      const dashboard=e.target.closest('[data-dash]');if(dashboard){e.preventDefault();openDashboard(dashboard.dataset.dash);return}
    });
    document.addEventListener('change',e=>{
      if(e.target.id==='dashboardSort'){state.sort=e.target.value;render()}
      if(e.target.id==='viewerDashSwitch'){openDashboard(e.target.value)}
    });
    el('commandInput').addEventListener('input',e=>{state.query=e.target.value;state.cmdIndex=0;renderSearch()});
    el('lightboxViewport').addEventListener('wheel',e=>{if(!state.lightbox)return;e.preventDefault();zoomTo(state.zoom+(e.deltaY<0?.2:-.2))},{passive:false});
    el('lightboxViewport').addEventListener('dblclick',()=>zoomTo(state.zoom===1?2:1));
    el('lightboxViewport').addEventListener('pointerdown',e=>{if(state.zoom<=1)return;pan={x:e.clientX,y:e.clientY,tx:state.tx,ty:state.ty,id:e.pointerId};e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.classList.add('is-panning')});
    el('lightboxViewport').addEventListener('pointermove',e=>{if(!pan||pan.id!==e.pointerId)return;state.tx=pan.tx+e.clientX-pan.x;state.ty=pan.ty+e.clientY-pan.y;updateZoom()});
    for(const name of ['pointerup','pointercancel','lostpointercapture'])el('lightboxViewport').addEventListener(name,()=>{pan=null;el('lightboxViewport').classList.remove('is-panning')});
    document.addEventListener('keydown',e=>{
      if(e.key==='Tab'&&(state.lightbox||state.cmd)){
        const box=state.lightbox?el('lightbox'):el('commandDialog');
        const candidates=[...box.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), [href]')].filter(n=>n.getClientRects().length);
        const first=candidates[0],last=candidates[candidates.length-1];
        if(first&&last){if(e.shiftKey&&(document.activeElement===first||!box.contains(document.activeElement))){e.preventDefault();last.focus()}else if(!e.shiftKey&&(document.activeElement===last||!box.contains(document.activeElement))){e.preventDefault();first.focus()}}
      }
      const target=e.target,editing=target?.matches?.('input,textarea,select,[contenteditable="true"]');
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();state.cmd?closeSearch():openSearch();return}
      if(e.key==='Escape'){
        if(state.cmd){e.preventDefault();closeSearch()}else if(state.lightbox){e.preventDefault();closeLightbox()}else if(el('sidebar').classList.contains('mobile-open')){closeMobileMenu()}else if(state.railOpen){state.railOpen=false;render()}
        return;
      }
      if(state.cmd){
        if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const len=queryResults().length;if(len){state.cmdIndex=(state.cmdIndex+(e.key==='ArrowDown'?1:-1)+len)%len;renderSearch();el('commandResults').querySelector('.is-highlighted')?.scrollIntoView({block:'nearest'})}}
        else if(e.key==='Enter'){e.preventDefault();selectSearch(state.cmdIndex)}
        return;
      }
      if(editing||e.altKey||e.ctrlKey||e.metaKey)return;
      if(e.key==='/'&&!state.lightbox){e.preventDefault();openSearch();return}
      if(state.view==='viewer'){
        if(state.lightbox&&e.code==='Space'){e.preventDefault();toggleSlideshow();return}
        if(e.key==='ArrowRight'){e.preventDefault();changePage(state.page+1)}
        if(e.key==='ArrowLeft'){e.preventDefault();changePage(state.page-1)}
        if(e.key.toLowerCase()==='z'){e.preventDefault();state.lightbox?zoomTo(state.zoom===1?2:1):openLightbox()}
        if(e.key.toLowerCase()==='g'&&!state.lightbox){state.gallery=!state.gallery;render()}
      }
    });
    window.addEventListener('popstate',()=>{closeLightbox();state.gallery=false;state.railOpen=window.matchMedia('(min-width:1081px)').matches;readRoute();render()});
  }
  initialize();
})();
