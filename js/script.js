document.documentElement.classList.add("js");
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const svg=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
$("#year").textContent=new Date().getFullYear();

/* nav: mobile menu + active link */
const links=$("#links"),mb=$("#menu-btn");
mb.onclick=()=>mb.setAttribute("aria-expanded",links.classList.toggle("open"));
$$("a",links).forEach(a=>a.onclick=()=>{links.classList.remove("open");mb.setAttribute("aria-expanded","false")});
const secs=$$("main section[id]"),navA=$$("a",links);
function spy(){const y=scrollY+innerHeight*.35;let c=secs[0].id;secs.forEach(s=>{if(s.offsetTop<=y)c=s.id});navA.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+c))}
addEventListener("scroll",spy,{passive:true});spy();

/* reveal on scroll */
const rv=$$(".reveal");
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});rv.forEach(el=>io.observe(el))}else rv.forEach(el=>el.classList.add("show"));

/* glass spotlight */
document.addEventListener("pointermove",e=>{const g=e.target.closest&&e.target.closest(".glass");if(!g)return;const r=g.getBoundingClientRect();g.style.setProperty("--mx",e.clientX-r.left+"px");g.style.setProperty("--my",e.clientY-r.top+"px")},{passive:true});

/* typing role */
if(!reduce){
 const roles=["Computer Science Graduate","Web Developer","Python and Flask Developer"],el=$("#typed");
 let r=0,i=roles[0].length,del=true;
 const tick=()=>{const w=roles[r];
  if(!del){el.textContent=w.slice(0,++i);if(i===w.length){del=true;return setTimeout(tick,1800)}return setTimeout(tick,70)}
  el.textContent=w.slice(0,--i);if(i===0){del=false;r=(r+1)%roles.length}setTimeout(tick,35)};
 setTimeout(tick,1800);
}

/* skills + pop-up */
const skills=[
 {n:"Front end",ic:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',items:["HTML5","CSS3 (Flexbox, Grid)","JavaScript","Responsive design"]},
 {n:"Back end and databases",ic:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',items:["Python","Flask","SQLite","MySQL"]},
 {n:"Tools",ic:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',items:[,"GitHub","GitHub Pages","VS Code"]},
 {n:"Computer science",ic:'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',items:["Java (learning)","Data structures and algorithms (learning)","DBMS","Software engineering"]}
];
const arrow=svg('<path d="M7 17L17 7"/><path d="M7 7h10v10"/>');
$("#skill-list").innerHTML=skills.map((s,i)=>`<button class="cat glass" data-i="${i}"><span class="ico">${svg(s.ic)}</span><span><span class="cat-name">${s.n}</span><small>${s.items.length} skills</small></span><span class="go">${arrow}</span></button>`).join("");
const modal=$("#modal");let opener=null;
const closeM=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");opener&&opener.focus()};
$("#skill-list").addEventListener("click",e=>{const b=e.target.closest(".cat");if(!b)return;const s=skills[b.dataset.i];opener=b;
 $("#m-ico").innerHTML=svg(s.ic);$("#m-title").textContent=s.n;$("#m-count").textContent=s.items.length+" skills";
 $("#m-chips").innerHTML=s.items.map(t=>`<li>${t}</li>`).join("");
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");$("#mx").focus()});
$("#mx").onclick=closeM;modal.onclick=e=>{if(e.target===modal)closeM()};
addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeM()});

/* project showcase */
const projects=[
 {tag:"Full-stack web development",title:"Car Rental System",img:"images/carrental.png",
  desc:"A web-based application that simplifies renting and managing cars. Users can explore vehicles, view rental prices and book cars, while admins manage vehicles, customers and bookings.",
  feat:["User registration and login","Browse cars with details and rental prices","Car booking with records stored in the database","Admin dashboard to manage vehicles and customers"],tech:["HTML","CSS","JavaScript","Python","Flask","SQLite"],
  obj:["Develop a user-friendly car rental website","Display available vehicles and their details","Simplify the car booking process","Manage customer and rental records","Provide an admin interface for managing the system"],
  lim:["No online payment","Users cannot cancel a booking","Car availability is not updated in real time","Users cannot view their past bookings","No email notifications","Car search and filtering are basic"],
  fut:["Online payment integration","Booking cancellation","Real-time car availability","Booking history","Email notifications","Advanced car search and filtering"]},
 {tag:"E-commerce web application",title:"Velora: Handbag Shopping Website",img:"images/handbag.png",
  desc:"A modern handbag shopping website that gives users a simple and attractive online shopping experience: explore collections, view product details and manage the shopping cart.",
  feat:["Handbag listings with images, prices and details","Category-based product filtering","Add to cart and remove from cart","Automatic price calculation, with the cart saved in LocalStorage"],tech:["HTML","CSS","JavaScript","Python","Flask","SQLite"],
  obj:["Create a modern and responsive shopping website","Display handbag collections and product details","Provide category-based product filtering","Implement interactive shopping cart functionality"],
  lim:["No user login or registration","No online payment","No wishlist","No order tracking","No admin dashboard to manage products","Cart data is stored only in the browser (LocalStorage)"],
  fut:["User login and registration","Online payment integration","Wishlist functionality","Order tracking","Admin dashboard"]}
];
const tabs=$$(".tab"),panel=$("#panel"),img=$("#p-img"),ph=$("#p-ph");let cur=-1;
function show(i,focus){
 if(i===cur)return;cur=i;const p=projects[i];
 tabs.forEach((t,k)=>{t.setAttribute("aria-selected",k===i);t.tabIndex=k===i?0:-1});
 $("#p-tag").textContent=p.tag;$("#p-title").textContent=p.title;$("#p-desc").textContent=p.desc;
 $("#p-feat").innerHTML=p.feat.map(f=>`<li>${f}</li>`).join("");
 $("#p-tech").innerHTML=p.tech.map(t=>`<li>${t}</li>`).join("");
 $("#p-ph-t").textContent=p.title;img.alt=p.title+" screenshot";
 img.hidden=true;ph.style.display="flex";
 img.onload=()=>{img.hidden=false;ph.style.display="none"};
 img.src=p.img;if(img.complete&&img.naturalWidth)img.onload();
 panel.setAttribute("aria-labelledby",tabs[i].id);
 panel.classList.remove("in");void panel.offsetWidth;panel.classList.add("in");
 if(focus)tabs[i].focus();
}
tabs.forEach((t,i)=>{t.onclick=()=>show(i);t.onkeydown=e=>{if(e.key==="ArrowRight")show((i+1)%tabs.length,true);if(e.key==="ArrowLeft")show((i-1+tabs.length)%tabs.length,true)}});
show(0);
if(matchMedia("(hover:hover)").matches&&!reduce){
 const pv=$(".preview"),fr=$("#frame");
 pv.onpointermove=e=>{const r=pv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fr.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg)`};
 pv.onpointerleave=()=>fr.style.transform="";
}

/* project details pop-up */
const pm=$("#pmodal");let pOpener=null;
const closeP=()=>{pm.classList.remove("open");pm.setAttribute("aria-hidden","true");pOpener&&pOpener.focus()};
$("#p-more").onclick=e=>{const p=projects[cur];pOpener=e.currentTarget;
 $("#pm-tag").textContent=p.tag;$("#pm-title").textContent=p.title;
 $("#pm-obj-sec").hidden=!p.obj;$("#pm-obj").innerHTML=(p.obj||[]).map(t=>`<li>${t}</li>`).join("");
 $("#pm-lim").innerHTML=p.lim.map(t=>`<li>${t}</li>`).join("");
 $("#pm-fut").innerHTML=p.fut.map(t=>`<li>${t}</li>`).join("");
 pm.classList.add("open");pm.setAttribute("aria-hidden","false");$("#px").focus()};
$("#px").onclick=closeP;pm.onclick=e=>{if(e.target===pm)closeP()};
addEventListener("keydown",e=>{if(e.key==="Escape"&&pm.classList.contains("open"))closeP()});