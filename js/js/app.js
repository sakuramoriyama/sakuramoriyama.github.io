(()=>{
const D=window.DATA,P=D.profile,M=document.querySelector('#main');
const e=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R=id=>D.research.find(r=>r.id===id);
const RULES=D.rules||[];const txt=x=>[x.title,x.text,x.event,x.org,x.program,x.journal,x.kind,(x.authors||[]).join(' ')].filter(Boolean).join(' ');
const ap=(type,l)=>(l||[]).map(x=>{let o=x,th=null;RULES.forEach(r=>{if(r.type!==type)return;if(r.match&&!r.match.test(txt(x)))return;if(r.first&&!x.first)return;if(r.journal&&!r.journal.test(x.journal||''))return;if(r.kind&&!r.kind.test(x.kind||''))return;if(r.themes)th=(th||[]).concat(r.themes);if(r.set)o=Object.assign({},o,r.set);});return th?Object.assign({},o,{relatedResearch:[...new Set(th)]}):o;});
const RM0=D.rm||{};const RM=Object.assign({},RM0,{awards:ap('awards',RM0.awards),funding:ap('funding',RM0.funding),presentations:ap('presentations',RM0.presentations)});const mg=(a,b)=>{const k=new Set((a||[]).map(x=>String(x.title||x.text).toLowerCase()));return (a||[]).concat((b||[]).filter(x=>!k.has(String(x.title||x.text).toLowerCase())))};
const AW=()=>D.awards||[],FU=()=>mg(D.funding,RM.funding),AC=()=>D.activities||[],CA=()=>P.career||[],ED=()=>P.education||[];
const chips=a=>(a||[]).filter(R).map(i=>`<a class="chip" href="#/research/${i}">${e(R(i).title)}</a>`).join('');
const img=i=>i&&i.src?`<img src="${e(i.src)}" alt="${e(i.alt||'')}" loading="lazy">`:'';
const ja=t=>t?`<details><summary>Japanese summary / 日本語</summary><p lang="ja">${e(t)}</p></details>`:'';
const row=c=>`<li class="item"><span class="date">${e(c.period)}</span>${e(c.text)}${c.sub?`<div class="sub">${e(c.sub)}</div>`:''}</li>`;
const rel=(k,id)=>({publications:pubs,funding:FU,awards:AW,activities:AC}[k]()||[]).filter(x=>(x.relatedResearch||[]).includes(id));
const pubs=()=>{const m=D.publications||[],d=new Set(m.map(p=>(p.doi||'').toLowerCase()).filter(Boolean));
 return m.concat(ap('publications',D.researchmap).filter(p=>!p.doi||!d.has(p.doi.toLowerCase())));};
const au=a=>(a||[]).map(n=>n.includes(P.me)?`<b>${e(n)}</b>`:e(n)).join(', ');
const pub=p=>`<li class="item">${au(p.authors)}. ${e(p.title)}. <i>${e(p.journal)}</i>${p.volume?' '+e(p.volume):''}${p.pages?', '+e(p.pages):''} (${e(p.year)}).
 ${p.doi?`<a href="https://doi.org/${e(p.doi)}">DOI</a> `:''}${p.pmid?`<a href="https://pubmed.ncbi.nlm.nih.gov/${e(p.pmid)}/">PMID</a> `:''}
 ${p.label?`<span class="tag">${e(p.label)}</span>`:''}${p.first?'<span class="tag">First author</span>':''}<div>${chips(p.relatedResearch)}</div></li>`;
const pubList=l=>{const y={};l.forEach(p=>(y[p.year]=y[p.year]||[]).push(p));
 return Object.keys(y).sort((a,b)=>b-a).map(k=>`<h3>${k}</h3><ul class="list">${y[k].map(pub).join('')}</ul>`).join('')||'<p class="sub">No entries yet.</p>';};
const presList=l=>{const y={};(l||[]).forEach(p=>(y[p.year]=y[p.year]||[]).push(p));return Object.keys(y).sort((a,b)=>b-a).map(k=>`<h3>${e(k||'—')}</h3><ul class="list">${y[k].map(p=>`<li class="item">${au(p.authors)}. ${e(p.title)}. ${e(p.event)} ${p.invited?'<span class="tag">Invited</span>':''}</li>`).join('')}</ul>`).join('');};
const award=a=>`<li class="item"><span class="date">${e(a.year)}</span><b>${e(a.title)}</b> <span class="tag">${e(a.category||'')}</span><div class="sub">${e(a.org)}</div><div>${e(a.desc)}</div>${chips(a.relatedResearch)}</li>`;
const fund=f=>`<li class="item"><span class="date">${e(f.period||f.year)}</span><b>${e(f.title)}</b><div class="sub">${e(f.program)}${f.role?' · '+e(f.role):''}</div><div>${e(f.desc)}</div>${chips(f.relatedResearch)}</li>`;
const act=a=>`<li class="item"><span class="date">${e(a.date)}</span><b>${e(a.title)}</b><div class="sub">${e(a.org)}${a.role?' · '+e(a.role):''}</div><div>${e(a.desc)}</div>${chips(a.relatedResearch)}${img(a.photo)}</li>`;
const L={publication:'publications',award:'awards',funding:'funding',activity:'activities',research:'research'};
const newsItem=n=>`<li class="item"><span class="date">${e(n.date)}</span><div>${e(n.text)} ${(n.links||[]).map(l=>`<a href="#/${L[l.type]}${l.type==='research'?'/'+l.id:''}">→ ${e(l.type)}</a>`).join(' ')}${img(n.photo)}</div></li>`;
const sec=(t,h)=>h?`<h2>${t}</h2>${h}`:'';
const ul=(a,f)=>a&&a.length?`<ul class="list">${a.map(f).join('')}</ul>`:'';
const rcard=r=>`<a class="card" href="#/research/${r.id}"><span class="tag ${r.status==='current'?'cur':''}">${r.status==='previous'?'Previous research':r.status==='current'?'Current':e(r.status)}</span><h3>${e(r.no)} ${e(r.title)}</h3><p class="sub">${e(r.summary)}</p></a>`;
const vision=()=>{const v=D.vision;return `<div class="vision"><b>Current research</b><ul>${v.current.map(x=>`<li>${e(x)}</li>`).join('')}</ul><b>Long-term vision (future direction)</b><ul>${v.future.map(x=>`<li>${e(x)}</li>`).join('')}</ul><small class="sub">${e(v.note)}</small></div>`;};
const nav=[['','Home'],['about','About'],['research','Research'],['https://researchmap.jp/'+P.researchmapId,'Publications'],['awards','Awards'],['funding','Funding'],['activities','Activities'],['news','News'],['cv','CV']];
document.querySelector('#nav').innerHTML=nav.map(([h,t])=>/^http/.test(h)?`<a href="${h}" target="_blank" rel="noopener">${t} ↗</a>`:`<a href="#/${h}" data-h="${h}">${t}</a>`).join('');
document.querySelector('#yr').textContent=new Date().getFullYear();
const GUIDE=[['#/research','Research','研究テーマと長期ビジョン'],['#/about','About','経歴・学歴・認定資格'],['#/awards','Awards','受賞'],['#/funding','Funding','研究費・助成'],['#/activities','Activities','企画・登壇・アウトリーチ'],['#/cv','CV','履歴書（PDFあり）'],['https://researchmap.jp/'+P.researchmapId,'Publications ↗','論文・発表（Researchmap）']];
const contact=()=>{const c=P.contact;if(!c)return '';const m=c.emailUser+'@'+c.emailDomain;return sec('Contact',`<p>${e(c.lab)}<br>${e(c.address)}<br><a href="mailto:${e(m)}">${e(m)}</a></p><p class="sub">${e(c.labEn)}<br>${e(c.addressEn)}</p>`);};
const pages={
 '':()=>({t:'',h:`<div class="hero">${img(P.photo)}<div><h1>${e(P.name)}, ${e(P.degree)}</h1><p class="lead">${e(P.position)}<br>${e(P.affiliation)}</p></div></div>
  <p class="lead tagline">${e(P.vision)} <a href="#/research">Vision →</a></p>
  ${sec('Explore this site',`<div class="cards guide">${GUIDE.map(g=>`<a class="card" href="${e(g[0])}"${/^http/.test(g[0])?' target="_blank" rel="noopener"':''}><h3>${g[1]}</h3><p class="sub">${g[2]}</p></a>`).join('')}</div>`)}
  ${sec('Research',`<div class="cards">${D.research.map(rcard).join('')}</div>`)}
  ${sec('Recent News',`<ul class="list news">${(D.news||[]).slice(0,3).map(newsItem).join('')}</ul><a href="#/news">All →</a>`)}
  ${contact()}`}),
 about:()=>({t:'About',h:`<h1>About</h1><p><b>${e(P.name)}</b> (${e(P.nameJa)}), ${e(P.degree)}<br>${e(P.position)}, ${e(P.affiliation)}</p>
  ${sec('Research interests',P.interests.map(i=>`<span class="tag">${e(i)}</span>`).join(''))}
  ${sec('Background',P.story?`<p>${e(P.story)}</p>${ja(P.storyJa)}`:'')}
  ${sec('Timeline',(P.timeline||[]).length?`<ol class="tl">${P.timeline.map(t=>`<li><b>${e(t.title)}</b> <span class="date">${e(t.year)}</span><div class="sub">${e(t.text)}</div></li>`).join('')}</ol>`:'')}
  ${sec('Career',ul(CA(),row))}
  ${sec('Education',ul(ED(),row))}${sec('Programs &amp; Certifications',ul(P.programs,row))}
  ${sec('External profiles',ul(P.links,l=>`<li class="item"><a href="${e(l.url)}" rel="me noopener">${e(l.label)}</a></li>`))}`}),
 research:id=>{
  if(!id)return{t:'Research',h:`<h1>Research</h1><p class="lead">${e(P.intro)}</p>${ja(P.introJa)}
  ${sec('Long-term Research Vision',`<p class="lead">${e(P.vision)}</p>${P.visionText?`<p class="small">${e(P.visionText)}</p>`:''}${ja(P.visionJa)}${vision()}`)}
  ${sec('Research themes',`<div class="cards">${D.research.map(rcard).join('')}</div>`)}`};
  const r=R(id);if(!r)return{t:'Not found',h:'<p>Not found.</p>'};
  const S=[['Overview',r.overview],['Background',r.background],['Research Question',r.question],['Approach',r.approach],['Key Findings',r.findings],['Current Direction',r.direction]];
  return{t:r.title,h:`<p><a href="#/research">← Research</a></p><span class="tag ${r.status==='current'?'cur':''}">${r.status==='previous'?'Previous research':e(r.status)}</span><h1>${e(r.no)} ${e(r.title)}</h1>
  <p>${(r.keywords||[]).map(k=>`<span class="tag">${e(k)}</span>`).join('')}</p>${ja(r.ja)}
  ${S.map(([t,v])=>sec(t,v?`<p>${e(v)}</p>`:'')).join('')}
  ${sec('Related Publications',ul(rel('publications',id),pub))}
  ${sec('Related Funding',ul(rel('funding',id),fund))}
  ${sec('Related Presentations',presList((RM.presentations||[]).filter(p=>(p.relatedResearch||[]).includes(id))))}
  ${sec('Related Awards',ul(rel('awards',id),award))}
  ${sec('Related Activities',ul(rel('activities',id),act))}`};},
 publications:()=>({t:'Publications',h:`<h1>Publications</h1><p class="sub">Full list: <a href="https://researchmap.jp/${e(P.researchmapId)}">Researchmap</a></p>${pubList(pubs())}`}),
 presentations:()=>({t:'Presentations',h:`<h1>Conference Presentations</h1><p class="sub">Imported from <a href="https://researchmap.jp/${e(P.researchmapId)}">Researchmap</a></p>${presList(RM.presentations)||'<p class="sub">No entries yet.</p>'}`}),
 awards:()=>({t:'Awards',h:`<h1>Awards</h1>${ul(AW().slice().sort((a,b)=>b.year-a.year),award)}`}),
 funding:()=>({t:'Funding',h:`<h1>Funding</h1>${ul(FU().slice().sort((a,b)=>b.year-a.year),fund)}`}),
 activities:()=>({t:'Activities',h:`<h1>Academic &amp; Science Activities</h1>${D.activityCategories.concat(AC().some(a=>a.category==='Other')?['Other']:[]).map(c=>sec(c,ul(AC().filter(a=>a.category===c),act))).join('')}`}),
 news:()=>({t:'News',h:`<h1>News</h1><ul class="list news">${(D.news||[]).map(newsItem).join('')}</ul>`}),
 cv:()=>({t:'CV',h:`<h1>CV</h1><p><a href="${e(P.cvPdf)}">Download full CV (PDF)</a></p>${sec('Career',ul(CA(),row))}${sec('Education',ul(ED(),row))}${sec('Programs &amp; Certifications',ul(P.programs,row))}${sec('Awards',ul(AW(),award))}${sec('Funding',ul(FU(),fund))}`})
};
function route(){const[,p='',id]=location.hash.replace(/^#/,'').split('/');const f=pages[p]||pages[''];const o=f(id);
 M.innerHTML=o.h;document.title=(o.t?o.t+' | ':'')+'Sakura Moriyama, Ph.D. | Kyoto University';
 document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.h===p));
 document.querySelector('#nav').classList.remove('open');scrollTo(0,0);}
addEventListener('hashchange',route);route();
const b=document.querySelector('#menu');b.onclick=()=>b.setAttribute('aria-expanded',document.querySelector('#nav').classList.toggle('open'));
})();
