/* Shared module: i18n (EN/BN), localStorage state, Web Audio soundscape, nav, auth guard. */
const D={en:{
 nh:"Gateway",nc:"CCTV Grid",na:"Archive",ne:"Escape",snd:"Sound: ",on:"on",off:"off",lg:"বাংলা",rst:"Reset case",
 h_title:"The Pabna Haunting",h_warn:"WARNING: A distress signal is broadcasting from the abandoned Pabna Mental Asylum near the Ichamati River. Anyone who listens does not leave.",
 h_lore:"Local fishermen say the Ichamati whispers at night. They tell of the Nilkuthi ghost, a doctor who never signed out, still walking the wards with a lantern. The river remembers every name it has taken. Answer it by name.",
 h_login:"Clearance terminal",h_hint:"Hint: the river that whispers. Enter its name in English or Bengali.",h_pass:"Passcode",h_go:"Authenticate",
 h_empty:"Enter a passcode.",h_bad:"Access denied. Attempts: ",h_okk:"Clearance granted. Opening surveillance...",
 c_title:"CCTV Surveillance Grid",c_intro:"Click a feed to trigger it. Use the filters to expose what the camera hides. Four feeds hold a digit.",
 f_inv:"Invert",f_blur:"Blur",f_nv:"Night vision",f_hot:"Thermal",f_clr:"Clear",c_dig:"Digits found: ",
 a_title:"Patient Archive & Cipher Vault",a_intro:"Search the patient logs. Two logs carry ciphers. Solve them, then repair the telegraph line.",a_search:"Search name, ward or keyword",
 a_ans:"Your answer",a_chk:"Decode",a_right:"Decoded.",a_wrong:"Wrong. The ink burns.",a_none:"No log matches.",
 w_title:"Telegraph line, Pabna station",w_intro:"Click a terminal on the left, then its matching colour on the right. Success buys +30 seconds.",w_done:"Line restored. +30 seconds added.",
 e_title:"Emergency Lockdown",e_intro:"Enter the bridge, the mosque, and the year code before the timer ends. A wrong entry costs 15 seconds.",
 e_w1:"Bridge name (cipher 1)",e_w2:"Mosque keyword (cipher 2)",e_w3:"4-digit code (cameras)",e_go:"Send broadcast",e_fill:"Fill all three fields.",e_dig:"The code is exactly 4 digits.",e_bad:"Rejected. -15 seconds.",
 e_win:"RESCUE BROADCAST SENT",e_winp:"Boats are crossing the Ichamati. The signal dies. You survived Pabna.",e_lose:"YOU WERE NEVER LEAVING",e_again:"Try again"},
bn:{nh:"প্রবেশদ্বার",nc:"সিসিটিভি",na:"আর্কাইভ",ne:"পলায়ন",snd:"শব্দ: ",on:"চালু",off:"বন্ধ",lg:"English",rst:"নতুন করে শুরু",
 h_title:"পাবনার ভূতুড়ে রাত",h_warn:"সতর্কতা: ইছামতী নদীর তীরে পরিত্যক্ত পাবনা মানসিক হাসপাতাল থেকে একটি বিপদ সংকেত আসছে। যে শোনে, সে ফেরে না।",
 h_lore:"স্থানীয় জেলেরা বলে, রাতে ইছামতী ফিসফিস করে। তারা বলে এক ডাক্তারের কথা, যে কখনও হাসপাতাল ছেড়ে যায়নি, হাতে লণ্ঠন নিয়ে আজও ওয়ার্ডে হাঁটে। নদী প্রতিটি নাম মনে রাখে। তার নাম ধরে ডাকো।",
 h_login:"ছাড়পত্র টার্মিনাল",h_hint:"ইঙ্গিত: যে নদী ফিসফিস করে। তার নাম ইংরেজি বা বাংলায় লেখো।",h_pass:"পাসকোড",h_go:"যাচাই করো",
 h_empty:"পাসকোড লেখো।",h_bad:"প্রবেশ নিষিদ্ধ। চেষ্টা: ",h_okk:"অনুমতি মিলেছে। নজরদারি খুলছে...",
 c_title:"সিসিটিভি নজরদারি গ্রিড",c_intro:"ফিডে ক্লিক করো। ফিল্টার দিয়ে লুকানো জিনিস খোঁজো। চারটি ফিডে একটি করে অঙ্ক আছে।",
 f_inv:"উল্টানো",f_blur:"ঝাপসা",f_nv:"নাইট ভিশন",f_hot:"তাপীয়",f_clr:"মুছো",c_dig:"পাওয়া অঙ্ক: ",
 a_title:"রোগীর আর্কাইভ ও সাইফার ভল্ট",a_intro:"রোগীর লগ খোঁজো। দুটি লগে সাইফার আছে। সমাধান করো, তারপর টেলিগ্রাফ লাইন মেরামত করো।",a_search:"নাম, ওয়ার্ড বা শব্দ খোঁজো",
 a_ans:"তোমার উত্তর",a_chk:"ডিকোড",a_right:"ডিকোড হয়েছে।",a_wrong:"ভুল। কালি পুড়ছে।",a_none:"কোনো লগ মেলেনি।",
 w_title:"টেলিগ্রাফ লাইন, পাবনা স্টেশন",w_intro:"বাঁয়ের একটি প্রান্তে ক্লিক করে ডানের একই রঙে ক্লিক করো। সফল হলে +৩০ সেকেন্ড।",w_done:"লাইন চালু। +৩০ সেকেন্ড যোগ হলো।",
 e_title:"জরুরি লকডাউন",e_intro:"টাইমার শেষ হওয়ার আগে সেতু, মসজিদ ও সালের কোড দাও। ভুল দিলে ১৫ সেকেন্ড কাটবে।",
 e_w1:"সেতুর নাম (সাইফার ১)",e_w2:"মসজিদের শব্দ (সাইফার ২)",e_w3:"৪ অঙ্কের কোড (ক্যামেরা)",e_go:"সংকেত পাঠাও",e_fill:"তিনটি ঘরই পূরণ করো।",e_dig:"কোড ঠিক ৪ অঙ্কের হতে হবে।",e_bad:"বাতিল। -১৫ সেকেন্ড।",
 e_win:"উদ্ধার সংকেত পাঠানো হয়েছে",e_winp:"ইছামতী পেরিয়ে নৌকা আসছে। সংকেত থেমে গেছে। তুমি পাবনা থেকে বেঁচে ফিরলে।",e_lose:"তুমি আর ফিরবে না",e_again:"আবার চেষ্টা করো"}};
const S={get(){try{return JSON.parse(localStorage.getItem("pabna"))||{}}catch(e){return{}}},
 set(o){try{localStorage.setItem("pabna",JSON.stringify({...S.get(),...o}))}catch(e){}},clear(){try{localStorage.removeItem("pabna")}catch(e){}}};
const T=k=>(D[S.get().lang||"en"][k]??k);
function applyLang(){document.documentElement.lang=S.get().lang||"en";
 document.querySelectorAll("[data-i]").forEach(e=>e.textContent=T(e.dataset.i));
 document.querySelectorAll("[data-p]").forEach(e=>e.placeholder=T(e.dataset.p));
 const s=document.getElementById("snd");if(s)s.textContent=T("snd")+T(A.on?"on":"off");
 document.dispatchEvent(new Event("langchange"))}
/* Web Audio: ambient hum + whispers + effects. Starts only after user clicks Sound (browser autoplay rules). */
const A={ctx:null,on:false,master:null,
 init(){if(this.ctx)return;const c=this.ctx=new(window.AudioContext||window.webkitAudioContext)();
  this.master=c.createGain();this.master.gain.value=0;this.master.connect(c.destination);
  [48,48.7,96.3].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),l=c.createBiquadFilter();o.type="sawtooth";o.frequency.value=f;
   g.gain.value=.05/(i+1);l.type="lowpass";l.frequency.value=220;o.connect(l);l.connect(g);g.connect(this.master);o.start()});
  setInterval(()=>this.on&&Math.random()<.35&&this.sfx("whisper"),7000)},
 toggle(){this.init();this.on=!this.on;this.ctx.resume();this.master.gain.value=this.on?.5:0;S.set({sound:this.on});applyLang()},
 noise(d,f,q,v,sw){const c=this.ctx,b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),x=b.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1;
  const s=c.createBufferSource(),p=c.createBiquadFilter(),g=c.createGain();s.buffer=b;p.type="bandpass";p.frequency.value=f;p.Q.value=q;
  g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(v,c.currentTime+(sw?d/2:.01));g.gain.linearRampToValueAtTime(0,c.currentTime+d);
  s.connect(p);p.connect(g);g.connect(this.master);s.start()},
 tone(f,d,t,v){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type=t;o.frequency.value=f;g.gain.value=v;g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);o.connect(g);g.connect(this.master);o.start();o.stop(c.currentTime+d)},
 sfx(n){if(!this.on)return;({whisper:()=>this.noise(2.5,1800+Math.random()*1500,8,.5,true),glitch:()=>this.noise(.3,900,1,.6),
  ok:()=>{this.tone(660,.3,"sine",.2);setTimeout(()=>this.tone(880,.4,"sine",.2),150)},bad:()=>this.tone(90,.6,"sawtooth",.3),
  click:()=>this.tone(300,.08,"square",.1),scare:()=>{this.noise(1.5,600,.5,1);this.tone(60,1.5,"sawtooth",.5)}}[n]||(()=>{}))()}};
function initPage(){const b=document.body,p=b.dataset.page,s=S.get();
 if(b.hasAttribute("data-guard")&&!(s.auth&&s.token)){location.replace("index.html");return}
 const L=[["index.html","nh"],["surveillance.html","nc"],["archive.html","na"],["escape.html","ne"]];
 document.getElementById("nav").innerHTML=L.map(([h,k])=>`<a href="${h}" data-i="${k}" class="${h.startsWith(p)?"on":""}"></a>`).join("")+
  `<span class="sp"></span><button id="snd"></button><button id="lg"></button><button id="rst" data-i="rst"></button>`;
 document.getElementById("snd").onclick=()=>A.toggle();
 document.getElementById("lg").onclick=()=>{S.set({lang:(S.get().lang||"en")==="en"?"bn":"en"});applyLang();document.getElementById("lg").textContent=T("lg")};
 document.getElementById("rst").onclick=()=>{S.clear();location.href="index.html"};
 applyLang();document.getElementById("lg").textContent=T("lg");
 document.addEventListener("click",e=>{if(e.target.closest("button"))A.sfx("click")},true)}
document.addEventListener("DOMContentLoaded",initPage);

async function api(p,b){try{const r=await fetch("/api/"+p,{method:b?"POST":"GET",headers:{"Content-Type":"application/json","X-Token":S.get().token||""},body:b?JSON.stringify(b):undefined});return await r.json()}catch(e){return{ok:false,error:"net"}}}
