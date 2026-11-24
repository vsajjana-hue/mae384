/* Dr. VJ coach for MAE 384 Mission Control. Loads after the page; reacts to the same events the site already tracks. */
(function(){
if(window.__drvj)return;window.__drvj=1;
var BASE=(document.currentScript&&document.currentScript.src||'coach/coach.js').replace(/coach\.js.*$/,'');
var EXAM=new Date(2026,11,3);
var T={1:"Boom. First try. Newton would be jealous.",2:"That converged faster than bisection ever will.",3:"Exact fraction, no calculator. Chef's kiss.",4:"Correct! Your error just hit machine precision.",5:"Yes! That's how it's done.",6:"So close. Check your signs. They bite.",7:"Old point or new point? Implicit means new.",8:"Even Gauss–Jordan needs a pivot. Swap and try again.",9:"Hmm. Look at the equation sheet one more time.",10:"Not yet. Slow down and write every step.",11:"Good try. The first step was right. Keep going.",12:"Three days in a row. Your streak is more stable than explicit Euler.",13:"Streak alive! Unlike my coffee, it never runs out.",14:"That's second-order commitment.",15:"Module mastered! We have liftoff.",17:"Badge earned. Frame it. Or at least screenshot it.",18:"You're back! Five minutes today?",19:"There you are. Today's mission is short, I promise.",20:"Welcome back. I saved your streak a seat.",21:"Mission complete. See you tomorrow.",22:"That's today done. Future you says thanks."};
var POSES=['idle','cheer','think','point','wave','rocket','thumbs','oops'],TALK=['idle'];
var st={hidden:false,days:[],seen:'',mdays:[],m:{d:'',q:0,n:0,done:false}};
try{var raw=localStorage.getItem('mae384:coach');if(raw){var o=JSON.parse(raw);for(var k in o)st[k]=o[k]}}catch(e){}
function save(){try{localStorage.setItem('mae384:coach',JSON.stringify(st))}catch(e){}}
var track0=window.mcTrack||function(){};
function day(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function streak(){/* days in a row with the daily mission done; today counts once it is done */
 var n=0,d=new Date();if(st.mdays.indexOf(day(d))<0)d.setDate(d.getDate()-1);while(st.mdays.indexOf(day(d))>=0){n++;d.setDate(d.getDate()-1)}return n}
function mis(){var t=day(new Date());if(st.m.d!==t)st.m={d:t,q:0,n:0,done:false};return st.m}
function bump(kind){var m=mis();if(m.done)return;if(kind==='q')m.q=1;else m.n++;
 if(m.q&&m.n>=3){m.done=true;if(st.mdays.indexOf(m.d)<0){st.mdays.push(m.d);st.mdays=st.mdays.slice(-90)}track0('mission_daily_done',{streak:streak()});
  setTimeout(function(){show(['rocket'],streak()===3?12:21,0,'fanfare')},3600)}
 save();try{window.dispatchEvent(new Event('drvj:mission'))}catch(e){}}
window.DrVJ={mission:function(){var m=mis();return{q:m.q,n:m.n,done:m.done,streak:streak()}}};

var css='#drvj{position:fixed;right:max(10px,env(safe-area-inset-right,0px));bottom:max(10px,env(safe-area-inset-bottom,0px));z-index:60;pointer-events:none;font:600 14px/1.35 system-ui,-apple-system,Segoe UI,sans-serif;display:flex;align-items:flex-end;gap:6px}'
+'#drvj *{box-sizing:border-box}'
+'#drvj .dvf{position:relative;width:112px;aspect-ratio:500/820;transition:width .28s cubic-bezier(.3,1.4,.5,1);transform-origin:50% 100%;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))}'
+'#drvj.on .dvf{width:200px}'
+'#drvj .dvf img{position:absolute;inset:0;width:100%;height:100%;opacity:0;max-width:none}'
+'#drvj .dvr{position:absolute;inset:0;transform-origin:50% 97%;animation:drvjB 3.2s ease-in-out infinite}'
+'#drvj.pop .dvr{animation:drvjP .55s cubic-bezier(.3,1.5,.5,1)}'
+'@keyframes drvjB{0%,100%{transform:scale(1,1) rotate(-1deg)}25%{transform:scale(1.015,.985) rotate(0)}50%{transform:scale(1,1) rotate(1deg)}62%{transform:translateY(-3.5%) scale(.985,1.02) rotate(1deg)}74%{transform:scale(1.03,.97) rotate(.5deg)}86%{transform:scale(1,1) rotate(0)}}'
+'@keyframes drvjP{0%{transform:scale(.86,1.14)}35%{transform:translateY(-7%) scale(1.04,.98)}65%{transform:scale(1.09,.91)}100%{transform:none}}'
+'#drvj .dvb{pointer-events:auto;max-width:min(250px,calc(100vw - 150px));background:#fffaf0;color:#14213d;border:2px solid #ffb86b;border-radius:18px 18px 6px 18px;padding:10px 13px;font-family:var(--display,var(--body,inherit));font-weight:600;margin-bottom:60px;box-shadow:0 6px 16px rgba(0,0,0,.25);opacity:0;transform:translateY(8px) scale(.96);transition:opacity .18s,transform .18s;visibility:hidden}'
+'#drvj.on .dvb{opacity:1;transform:none;visibility:visible}'
+'#drvj .dvb b{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#e2570f}#drvj .dvp{position:absolute;font-style:normal;font-size:18px;pointer-events:none;opacity:0;animation:drvjF 1.5s ease-out forwards}@keyframes drvjF{0%{opacity:0;transform:translateY(10px) scale(.4) rotate(-20deg)}25%{opacity:1;transform:translateY(-6px) scale(1.15) rotate(8deg)}100%{opacity:0;transform:translateY(-46px) scale(.9) rotate(-6deg)}}'
+'#drvj .dvc{position:absolute;left:-18px;bottom:0;display:flex;flex-direction:column;gap:4px;pointer-events:auto;background:none;border:0;padding:0;box-shadow:none;opacity:.8}#drvj .dvc:hover{opacity:1}'
+'#drvj button{all:unset;cursor:pointer;width:22px;height:22px;border-radius:50%;background:#14213d;color:#fff;border:2px solid #fff;display:grid;place-items:center;font:700 12px/1 system-ui,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.3)}'
+'#drvj button:focus-visible{outline:3px solid #ffd166}'
+''
+'#drvj.hid .dvf,#drvj.hid .dvb{display:none}'
+'#drvj .dvk{display:none;pointer-events:auto;width:auto;height:auto;border-radius:16px;padding:6px 11px;font-size:12px}'
+'#drvj.hid .dvk{display:block}'
+'@media(max-width:640px){#drvj .dvf{width:74px}#drvj.on .dvf{width:128px}#drvj .dvb{margin-bottom:40px;font-size:13px}}'
+'@media(prefers-reduced-motion:reduce){#drvj .dvr,#drvj .dvp{animation:none!important}#drvj .dvf{transition:none}}'
+'@media print{#drvj{display:none}}';
var el=document.createElement('div');el.id='drvj';
var imgs='';POSES.forEach(function(p){imgs+='<img data-p="'+p+'" alt="" src="'+BASE+'art/'+p+'.webp">'});
el.innerHTML='<style>'+css+'</style><div class="dvb" role="status" aria-live="polite"><b>Dr. VJ</b><span></span></div>'
+'<div class="dvf"><div class="dvr">'+imgs+'</div><div class="dvc"><button type="button" class="dvx" aria-label="Hide Dr. VJ" title="Hide">×</button></div></div>'
+'<button type="button" class="dvk" aria-label="Show Dr. VJ">Dr. VJ</button>';
function mount(){document.body.appendChild(el);init()}
if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);

var rig,say,cur='idle',tm=[],extra={},busyUntil=0,talkUntil=0;
function img(p){return rig.querySelector('[data-p="'+p+'"]')}
function lazy(){/* mouth and blink frames, after the page has settled */
 TALK.forEach(function(p){[1,2].forEach(function(i){var m=new Image();m.alt='';m.src=BASE+'art/'+p+'_m'+i+'.webp';m.dataset.k=p+i;rig.appendChild(m);extra[p+i]=m})});
 var b=new Image();b.alt='';b.src=BASE+'art/idle_b.webp';rig.appendChild(b);extra.blink=b}
function pose(p){cur=p;el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop')}
function later(ms,f){tm.push(setTimeout(f,ms))}
function frame(){var lv=0,now=performance.now();
 if(now<talkUntil)lv=[1,2,1,0,2,1,2,0][Math.floor(now/95)%8];
 var bl=cur==='idle'&&!lv&&(now%4300)<130;
 POSES.forEach(function(p){img(p).style.opacity=(p===cur&&!(lv&&extra[p+lv])&&!(bl&&extra.blink))?1:0});
 for(var k in extra){extra[k].style.opacity=(k==='blink'?bl:(lv&&k===cur+lv))?1:0}
 requestAnimationFrame(frame)}
function talk(id,text){var t=text||T[id];say.textContent=t;el.classList.add('on');
 var hold=2600+t.length*45;talkUntil=performance.now()+Math.min(2200,500+t.length*28);busyUntil=Date.now()+hold;return hold}
/* expression sounds: short synth chirps through the site's own sound switch (no words, no files) */
function beep(f,d,v,type,at){try{if(typeof Kit!=='undefined'&&Kit.tone)Kit.tone(f,d,v,type||'sine',at||0);else if(typeof tone==='function'&&typeof SND!=='undefined')tone(f,d,type||'sine',v,at||0)}catch(e){}}
var SFX={hi:[[523,.09,0],[784,.14,.1]],yay:[[784,.07,.25],[1047,.07,.33],[1319,.16,.41]],uhoh:[[370,.13,.3],[262,.22,.46]],fanfare:[[523,.09,0],[659,.09,.1],[784,.09,.2],[1047,.12,.3],[1319,.28,.44]],ok:[[988,.06,0],[1319,.1,.07]],aw:[[330,.1,0],[294,.14,.1]]};
function sfx(n){(SFX[n]||[]).forEach(function(x){beep(x[0],x[1],.16,'sine',x[2])})}
function babble(at,n){/* a few soft pitched blips while his mouth moves */
 for(var i=0;i<n;i++)beep(430+Math.random()*330,.05,.07,'triangle',at+i*.085+Math.random()*.02)}
function puff(chars){/* little floating sparkles and hearts */
 var f=el.querySelector('.dvf');for(var i=0;i<chars.length;i++){(function(c,i){var e=document.createElement('i');e.className='dvp';e.textContent=c;e.style.left=(Math.random()<.5?-8+Math.random()*20:80+Math.random()*20)+'%';e.style.top=(2+Math.random()*34)+'%';e.style.animationDelay=(i*110)+'ms';f.appendChild(e);setTimeout(function(){e.remove()},1700+i*110)})(chars[i],i)}}
function show(seq,id,text,snd){/* seq: [pose, ms, pose] */
 if(st.hidden)return;tm.forEach(clearTimeout);tm=[];
 pose(seq[0]);var hold=talk(id,text);talkUntil=0;if(snd)sfx(snd);
 var settle=(seq[2]?seq[1]:0)+1300;later(settle,function(){cur='idle';talkUntil=performance.now()+1500;babble(0,9)});if(seq[0]==='cheer'||seq[0]==='rocket')puff(['\u2728','\u2B50','\u2728','\uD83D\uDC9B']);else if(seq[0]==='wave')puff(['\uD83D\uDC4B','\u2728']);else if(seq[0]==='thumbs')puff(['\u2B50','\u2728']);
 if(seq[2])later(seq[1],function(){pose(seq[2])});
 later(hold,function(){el.classList.remove('on');pose('idle')})}
function quick(p){if(st.hidden||Date.now()<busyUntil)return;tm.forEach(clearTimeout);tm=[];pose(p);if(p==='thumbs')puff(['\u2B50']);later(900,function(){pose('idle')})}
var last={};function pick(k,ids){var i;do{i=ids[Math.floor(Math.random()*ids.length)]}while(ids.length>1&&i===last[k]);last[k]=i;return i}
var CHEER=[1,2,3,4,5],NUDGE=[6,9,10,11],run=0;

function react(e,p){p=p||{};
 if(e==='quick_answer'){if(p.where==='home')bump('q');else if(p.correct)bump('n');if(p.correct)show(['cheer',900,'thumbs'],pick('c',[2,4,5]),0,'yay');else show(['thumbs'],0,'There it is. Read the why underneath.','ok');return}
 if(e==='quick_miss'){show(['oops',1100,'point'],0,'Not that one. Try another.','uhoh');return}
 if((e==='tb_attempt'||e==='rush_answer')&&p.correct)bump('n');
 if(e==='tb_attempt'){if(p.correct){run++;show(['cheer',900,'thumbs'],pick('c',run===1?CHEER:[2,3,4,5]),0,'yay')}else{run=0;var ids=NUDGE.slice();if(/implicit|backward|crank/i.test((p.label||'')+(p.item||'')))ids.push(7);if(/gauss|pivot|jordan/i.test((p.label||'')+(p.item||'')+(p.miss_tag||'')))ids.push(8);show(['oops',1100,'point'],pick('n',ids),0,'uhoh')}}
 else if(e==='tb_drill_passed'||e==='tb_guide_landed')later(2600,function(){show(['rocket'],17,0,'fanfare')});
 else if(e==='mission_complete'){if(p.missions_total&&p.missions_done>=p.missions_total)show(['cheer',900,'rocket'],15,0,'fanfare');else show(['cheer',900,'thumbs'],5,0,'yay')}
 else if(e==='rush_answer')quick(p.correct?'thumbs':'oops');
 else if(e==='rush_daily_score')show(['thumbs'],pick('d',[21,22]),0,'fanfare');
 else if(e==='rush_finish')show(['cheer',900,'thumbs'],14,0,'yay')}
window.mcTrack=function(e,p){try{track0(e,p)}catch(_){}try{react(e,p)}catch(_){}};

function greet(){var today=day(new Date()),first=st.seen!==today;
 if(st.days.indexOf(today)<0){st.days.push(today);st.days=st.days.slice(-60)}
 st.seen=today;save();if(!first)return;
 var n=streak(),d=Math.ceil((EXAM-new Date())/864e5);
 if(n>=2)show(['rocket'],13,0,'yay');else show(['wave'],pick('w',[18,19,20]),0,'hi');
 if(d>0&&d<=21)later(5200,function(){show(['point'],0,d+(d===1?' day':' days')+' to Exam 5. Let’s make today count.')})}
function init(){rig=el.querySelector('.dvr');say=el.querySelector('.dvb span');
 if(st.hidden)el.classList.add('hid');
 el.querySelector('.dvx').onclick=function(){st.hidden=true;save();el.classList.add('hid');track0('coach_hidden',{})};
 el.querySelector('.dvk').onclick=function(){st.hidden=false;save();el.classList.remove('hid');show(['wave'],20,0,'hi')};
 requestAnimationFrame(frame);setTimeout(lazy,1200);setTimeout(greet,900);
 var ps=document.createElement('script');ps.src=BASE+'play.js';document.head.appendChild(ps)}
})();
