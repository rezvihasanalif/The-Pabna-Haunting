/* The Pabna Haunting - backend. Zero dependencies: only Node built-ins (Node 18+).
   Serves /public and a JSON API. Secrets (passcode, answers, clues) live ONLY here. */
const http=require("http"),fs=require("fs"),path=require("path"),crypto=require("crypto");
const PORT=process.env.PORT||3000,PUB=path.join(__dirname,"public"),DB=path.join(__dirname,"data","leaderboard.json");
const GAME_MS=180000,PENALTY_MS=15000,BONUS_MS=30000;
const PASS=["ichamati","ইছামতী"],CIPHER={2:"hardinge",4:"tarash"},FINAL=["hardinge","tarash","1915"];
const CAMS=[{d:"1",en:"Scratched on the wall: ONE",bn:"দেয়ালে আঁচড়: এক"},{d:"9",en:"Chalk on the floor: NINE",bn:"মেঝেতে চক: নয়"},
 {d:"1",en:"Tag on a toe: ONE",bn:"পায়ের আঙুলে ট্যাগ: এক"},{d:"5",en:"Rust letters: FIVE",bn:"মরচে ধরা অক্ষর: পাঁচ"},
 {d:"",en:"Nothing here. Something watches.",bn:"কিছু নেই। কেউ দেখছে।"},{d:"",en:"The chair is still warm.",bn:"চেয়ারটা এখনও গরম।"}];
const sessions=new Map(),fails=new Map();           // token -> game state; ip -> login failures
const MIME={".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".svg":"image/svg+xml",".ico":"image/x-icon"};
const readDB=()=>{try{return JSON.parse(fs.readFileSync(DB,"utf8"))}catch(e){return[]}};
const send=(res,code,obj)=>{res.writeHead(code,{"Content-Type":"application/json"});res.end(JSON.stringify(obj))};
const body=req=>new Promise(r=>{let d="";req.on("data",c=>{d+=c;if(d.length>5e3)req.destroy()});req.on("end",()=>{try{r(JSON.parse(d||"{}"))}catch(e){r({})}})});
const norm=v=>String(v||"").trim().toLowerCase();
const remaining=s=>s.startedAt?Math.max(0,s.startedAt+GAME_MS+s.bonus-s.penalty-Date.now()):GAME_MS;

async function api(req,res,u){
 const ip=req.socket.remoteAddress,tok=req.headers["x-token"],S=sessions.get(tok),b=req.method==="POST"?await body(req):{};
 if(u.pathname==="/api/login"&&req.method==="POST"){
  if((fails.get(ip)||0)>=20)return send(res,429,{ok:false,error:"Too many attempts. Wait and retry."});
  if(PASS.includes(norm(b.passcode))){const t=crypto.randomBytes(16).toString("hex");
   sessions.set(t,{startedAt:0,bonus:0,penalty:0,wires:false,won:null,posted:false});return send(res,200,{ok:true,token:t})}
  fails.set(ip,(fails.get(ip)||0)+1);setTimeout(()=>fails.delete(ip),6e4);return send(res,401,{ok:false})}
 if(u.pathname==="/api/leaderboard"&&req.method==="GET")return send(res,200,{ok:true,rows:readDB().sort((a,c)=>a.seconds-c.seconds).slice(0,10)});
 if(!S)return send(res,401,{ok:false,error:"auth"});                       // everything below needs a valid token
 if(u.pathname==="/api/cam"){const c=CAMS[+u.searchParams.get("i")];return c?send(res,200,{ok:true,clue:c}):send(res,404,{ok:false})}
 if(u.pathname==="/api/cipher"&&req.method==="POST")return send(res,200,{ok:CIPHER[b.id]!==undefined&&norm(b.answer)===CIPHER[b.id]});
 if(u.pathname==="/api/wires"&&req.method==="POST"){if(!S.wires){S.wires=true;S.bonus=BONUS_MS}return send(res,200,{ok:true,bonus:BONUS_MS/1000})}
 if(u.pathname==="/api/start"){if(!S.startedAt)S.startedAt=Date.now();return send(res,200,{ok:true,remaining:remaining(S),won:!!S.won})}
 if(u.pathname==="/api/escape"&&req.method==="POST"){
  if(!S.startedAt)S.startedAt=Date.now();if(S.won)return send(res,200,{ok:true,won:true});
  if(remaining(S)<=0)return send(res,200,{ok:false,expired:true,remaining:0});
  if([b.w1,b.w2,b.w3].map(norm).join("|")===FINAL.join("|")){S.won=Math.max(1,Math.round((GAME_MS+S.bonus-S.penalty-remaining(S))/1000));return send(res,200,{ok:true,won:true,seconds:S.won})}
  S.penalty+=PENALTY_MS;return send(res,200,{ok:false,remaining:remaining(S)})}
 if(u.pathname==="/api/score"&&req.method==="POST"){
  if(!S.won||S.posted)return send(res,403,{ok:false});S.posted=true;
  const name=String(b.name||"Anonymous").replace(/[<>&"']/g,"").slice(0,20)||"Anonymous",rows=readDB();
  rows.push({name,seconds:S.won,date:new Date().toISOString()});fs.writeFileSync(DB,JSON.stringify(rows.slice(-200),null,1));return send(res,200,{ok:true})}
 send(res,404,{ok:false})}

http.createServer(async(req,res)=>{
 const u=new URL(req.url,"http://x");
 if(u.pathname.startsWith("/api/"))return api(req,res,u).catch(()=>send(res,500,{ok:false}));
 let f=path.normalize(path.join(PUB,u.pathname==="/"?"index.html":decodeURIComponent(u.pathname)));
 if(!f.startsWith(PUB))return send(res,403,{ok:false});                    // block path traversal
 fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end("Not found")}
  res.writeHead(200,{"Content-Type":(MIME[path.extname(f)]||"text/plain")+"; charset=utf-8"});res.end(d)})
}).listen(PORT,()=>console.log("The Pabna Haunting running at http://localhost:"+PORT));
