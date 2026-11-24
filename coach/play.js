/* MAE 384 Mission Control: question of the day, daily mission, Exam 5 readiness, Training Bay warm-up.
   Loaded by coach.js. Uses the site's own colours and storage; no network calls. */
(function(){
if(window.__drvjPlay)return;window.__drvjPlay=1;
var EXAM=new Date(2026,11,3);
var S={get:function(k,d){try{var v=localStorage.getItem('mae384:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem('mae384:'+k,JSON.stringify(v))}catch(e){}}};
function day(d){d=d||new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function track(e,p){try{window.mcTrack&&window.mcTrack(e,p)}catch(_){}}
var NAMES=['Precision','Linear systems','Root finding','Curve fitting','Derivatives','Integration','ODEs','PDEs'];
/* first option is the right one; options are shuffled when shown */
var BANK=[
{m:1,q:'A computer stores the decimal 0.1 in binary. What happens?',o:['It is stored approximately: 0.1 has no finite binary expansion','It is stored exactly','It is stored as the fraction 1/10','It is rounded to 0'],w:'In base 2, 0.1 repeats forever, so it gets cut off. That tiny error is what added up in the Patriot clock.'},
{m:1,q:'The true value is 2.50 and your approximation is 2.45. What is the true relative error?',o:['2%','5%','0.05%','20%'],w:'|2.50 − 2.45| / 2.50 = 0.05 / 2.50 = 0.02, which is 2%.'},
{m:1,q:'Subtracting two nearly equal numbers on a computer mainly causes…',o:['a loss of significant digits','overflow','a faster calculation','an exact result'],w:'The leading digits cancel, so only the uncertain trailing digits are left.'},
{m:2,q:'In Gauss–Jordan with partial pivoting, what do you do before eliminating in a column?',o:['Swap up the row with the largest absolute value in that column','Swap up the row with the smallest value in that column','Divide every row by its first entry','Nothing: just eliminate'],w:'Partial pivoting puts the largest available entry (in absolute value) on the pivot, which keeps round-off under control.'},
{m:2,q:'Gauss–Jordan on [A | b] has finished. What does the left block look like?',o:['The identity matrix: the solution is the right-hand column','An upper-triangular matrix','A lower-triangular matrix','A matrix of zeros'],w:'Gauss–Jordan clears above and below every pivot and scales each pivot to 1, so you read x straight off the last column.'},
{m:2,q:'What is the infinity norm of the vector (3, −7, 2)?',o:['7','12','−7','√62'],w:'The infinity norm is the largest absolute entry: |−7| = 7.'},
{m:3,q:'What must be true before you can start bisection on [a, b]?',o:['f(a) and f(b) have opposite signs','f′(a) is not zero','f(a) = f(b)','a and b are both positive'],w:'A sign change (for a continuous f) guarantees a root inside the bracket.'},
{m:3,q:'What does each bisection step do to the bracket?',o:['Halves its width','Squares its width','Cuts it to a tenth','Leaves it unchanged'],w:'You keep the half that still has the sign change, so the width halves every step.'},
{m:3,q:'Newton’s method needs something that bisection does not. What?',o:['The derivative f′(x)','A bracket with a sign change','Two starting points','An even number of steps'],w:'Newton follows the tangent line, so it needs f′. The secant method replaces f′ with a slope through two points.'},
{m:4,q:'A least-squares line is the line that minimises…',o:['the sum of the squared residuals','the sum of the residuals','the largest residual','the number of points it misses'],w:'Squaring stops positive and negative misses from cancelling.'},
{m:4,q:'The polynomial that passes exactly through n + 1 points has degree at most…',o:['n','n + 1','n − 1','2n'],w:'Two points give a line (degree 1), three give a parabola (degree 2), and so on.'},
{m:4,q:'Your data are noisy and you want the trend. Which tool fits?',o:['Regression (least squares)','Interpolation through every point','A higher-degree interpolating polynomial','Bisection'],w:'Interpolation chases the noise through every point. Regression fits the trend.'},
{m:5,q:'The forward difference (f(x + h) − f(x)) / h has truncation error of order…',o:['O(h)','O(h²)','O(h³)','O(1)'],w:'It is first-order accurate: halve h and the error roughly halves.'},
{m:5,q:'The central difference (f(x + h) − f(x − h)) / (2h) has truncation error of order…',o:['O(h²)','O(h)','O(h⁴)','O(1/h)'],w:'The odd error terms cancel by symmetry, which buys an extra order.'},
{m:5,q:'A formula is second-order accurate. You halve h. The truncation error drops by about a factor of…',o:['4','2','8','16'],w:'Error ∝ h², so (1/2)² = 1/4.'},
{m:6,q:'The composite trapezoid rule has a global error of order…',o:['O(h²)','O(h)','O(h⁴)','O(h³)'],w:'Halve h and the trapezoid error drops by about 4.'},
{m:6,q:'Simpson’s 1/3 rule needs the number of intervals to be…',o:['even','odd','a multiple of 3','prime'],w:'It fits a parabola over each pair of intervals, so they must come in pairs.'},
{m:6,q:'One trapezoid on [0, 2] for f(x) = x². What do you get?',o:['4','8/3','2','8'],w:'(2 − 0)/2 × (f(0) + f(2)) = 1 × (0 + 4) = 4. The exact area is 8/3, so the trapezoid overshoots.'},
{m:7,q:'Explicit Euler steps forward using the slope at…',o:['the old point (xᵢ, yᵢ)','the new point (xᵢ₊₁, yᵢ₊₁)','the midpoint','the average of both ends'],w:'yᵢ₊₁ = yᵢ + h f(xᵢ, yᵢ): everything on the right is already known.'},
{m:7,q:'Implicit (backward) Euler evaluates the slope at…',o:['the new point (xᵢ₊₁, yᵢ₊₁)','the old point (xᵢ, yᵢ)','the midpoint','x = 0'],w:'Implicit means new: the unknown yᵢ₊₁ appears on both sides, so you solve for it.'},
{m:7,q:'You halve h in classical RK4. The global error drops by about a factor of…',o:['16','4','2','8'],w:'RK4 is fourth-order: (1/2)⁴ = 1/16.'},
{m:8,q:'The explicit scheme for the heat equation is stable when r = K Δt / Δx² is…',o:['at most 1/2','at least 1/2','exactly 1','any positive value'],w:'Go above 1/2 and the solution oscillates and blows up.'},
{m:8,q:'At the corner x = 0, t = 0 of a heat problem, which condition do you use?',o:['The boundary condition','The initial condition','The average of the two','Neither'],w:'The initial condition applies inside the domain (0 < x < L). Boundary conditions apply at the ends, including at t = 0.'},
{m:8,q:'In the upwind scheme with positive wave speed c, the spatial difference uses…',o:['the point the flow is coming from (i − 1)','the point downstream (i + 1)','both neighbours equally','only the point i'],w:'Information travels with the flow, so you look upstream.'}
];
function shuffle(a,seed){a=a.slice();var r=function(){seed=(seed*9301+49297)%233280;return seed/233280};for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}

var css='.dq{background:var(--panel);color:var(--ink);border-radius:18px;padding:14px 16px;border-bottom:4px solid rgba(0,0,0,.18);display:flex;flex-direction:column;gap:10px;min-width:0}'
+'.dq .k{font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--heat)}'
+'.dq h2{font-family:var(--display);font-weight:600;font-size:1.12rem;line-height:1.3;margin:0;text-wrap:balance}'
+'.dq .opts{display:grid;gap:8px}'
+'.dq .opts button{text-align:left;background:var(--panel2);border-radius:12px;padding:10px 12px;min-height:44px;line-height:1.3;font-weight:700}'
+'.dq .opts button.ok{background:var(--go);color:#fff}.dq .opts button.no{background:var(--stop);color:#fff;opacity:.75}'
+'.dq .opts button:disabled{cursor:default}'
+'.dq .why{font-size:.95rem;line-height:1.4;border-left:4px solid var(--go);padding:4px 0 4px 10px}'
+'.dq .more{align-self:flex-start;font-weight:800;color:var(--heat);text-decoration:none;background:none;border:0;padding:4px 0;min-height:0;cursor:pointer;font:inherit;font-weight:800}'
+'#drvjHome{display:flex;flex-direction:column;gap:12px}'
+'#drvjHome .two{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:12px}'
+'.dq ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}'
+'.dq li{display:flex;gap:10px;align-items:center;font-weight:700}'
+'.dq li i{flex:none;width:26px;height:26px;border-radius:50%;background:var(--panel2);display:grid;place-items:center;font-style:normal;font-size:.85rem;font-weight:800}'
+'.dq li.done i{background:var(--go);color:#fff}.dq li.done span{opacity:.7}'
+'.dq .chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto}'
+'.dq .chips span{background:var(--panel2);border-radius:999px;padding:5px 11px;font-weight:800;font-size:.85rem}'
+'.dq .bars{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px}'
+'.dq .bar{all:unset;cursor:pointer;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 8px;align-items:center;font-weight:700;font-size:.92rem;border-radius:8px;padding:2px}'
+'.dq .bar:focus-visible{outline:3px solid var(--heat)}'
+'.dq .bar b{font-variant-numeric:tabular-nums}'
+'.dq .bar u{grid-column:1/-1;display:block;height:9px;border-radius:9px;background:var(--panel2);overflow:hidden;text-decoration:none}'
+'.dq .bar u i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,var(--heat),var(--sun))}'
+'.dq small{color:var(--muted);font-size:.85rem;line-height:1.35}'
+'@keyframes dqflash{0%{background:var(--sun)}100%{background:transparent}}.dqflash{animation:dqflash .9s ease-out;border-radius:8px}'
+'@media(max-width:640px){#drvjHome .two{grid-template-columns:1fr}.dq .bars{grid-template-columns:1fr}}';
var stl=document.createElement('style');stl.textContent=css;document.head.appendChild(stl);

/* one tap-to-answer card */
function quick(host,item,where,label,after){
 var opts=shuffle(item.o.map(function(t,i){return{t:t,ok:i===0}}),Math.floor(Math.random()*9999)+1),first=true;
 host.innerHTML='<div class="k">'+esc(label)+' · Module '+item.m+' · '+NAMES[item.m-1]+'</div><h2>'+esc(item.q)+'</h2><div class="opts"></div>';
 var box=host.querySelector('.opts');
 opts.forEach(function(o){var b=document.createElement('button');b.type='button';b.textContent=o.t;
  b.onclick=function(){
   if(o.ok){b.classList.add('ok');[].forEach.call(box.children,function(x){x.disabled=true});
    var w=document.createElement('div');w.className='why';w.textContent=item.w;host.appendChild(w);
    if(first){var ok=S.get('quick:ok',{});ok['m'+item.m]=(ok['m'+item.m]||0)+1;S.set('quick:ok',ok)}
    track('quick_answer',{where:where,module:'m'+item.m,correct:first});after&&after(first)}
   else{b.classList.add('no');b.disabled=true;if(first){first=false;track('quick_miss',{where:where,module:'m'+item.m})}}};
  box.appendChild(b)})}

/* ---------- home page ---------- */
function readiness(){var done=S.get('done:tb',[]),stats=S.get('tb:stats',{}),ok=S.get('quick:ok',{}),out=[];
 for(var i=0;i<8;i++){var id='m'+(i+1),stars=['d','l','b'].filter(function(k){return done.indexOf(id+k)>=0}).length,a=0,c=0;
  for(var k in stats){var e=stats[k];if(e&&e.m===i){a+=e.a||0;c+=e.c||0}}
  var pct=Math.round(50*stars/3+30*Math.min(1,a/10)*(a?c/a:0)+20*Math.min(1,(ok[id]||0)/3));out.push(pct)}
 return out}
function home(){var app=document.querySelector('.app'),banner=app&&app.querySelector('.banner');if(!banner||document.getElementById('drvjHome'))return;
 var sec=document.createElement('section');sec.id='drvjHome';
 sec.innerHTML='<div class="two"><div class="dq" id="dqQ"></div><div class="dq" id="dqM"></div></div><div class="dq" id="dqR"></div>';
 banner.insertAdjacentElement('afterend',sec);
 var today=day(),n=Math.floor((new Date(new Date().toDateString())-new Date(2026,0,1))/864e5),item=BANK[((n*7)%BANK.length+BANK.length)%BANK.length],q=sec.querySelector('#dqQ');
 function doneView(){var w=document.createElement('a');w.className='more';w.href='tb.html';w.textContent='Keep going in Training Bay ▸';q.appendChild(w)}
 var prev=S.get('qotd',{});
 quick(q,item,'home','Question of the day',function(first){S.set('qotd',{d:today,ok:first});doneView();mission()});
 if(prev.d===today){var right=[].filter.call(q.querySelectorAll('.opts button'),function(b){return b.textContent===item.o[0]})[0];
  [].forEach.call(q.querySelectorAll('.opts button'),function(b){b.disabled=true});right&&right.classList.add('ok');
  var w=document.createElement('div');w.className='why';w.textContent=item.w;q.appendChild(w);
  var s2=document.createElement('small');s2.textContent='Done for today. A new question appears tomorrow.';q.appendChild(s2);doneView()}
 function mission(){var m=(window.DrVJ&&DrVJ.mission())||{q:0,n:0,done:false,streak:0},d=Math.ceil((EXAM-new Date())/864e5),el=sec.querySelector('#dqM');
  el.innerHTML='<div class="k">Today’s mission</div><h2>'+(m.done?'Mission complete. See you tomorrow.':'Two small things, about five minutes.')+'</h2>'
  +'<ul><li class="'+(m.q?'done':'')+'"><i>'+(m.q?'✓':'1')+'</i><span>Answer the question of the day</span></li>'
  +'<li class="'+(m.n>=3?'done':'')+'"><i>'+(m.n>=3?'✓':'2')+'</i><span>Get 3 right in Training Bay or Method Rush <b>('+Math.min(3,m.n)+'/3)</b></span></li></ul>'
  +'<a class="more" href="rush.html">Daily challenge in Method Rush ▸</a>'
  +'<div class="chips"><span>🔥 '+m.streak+'-day streak</span>'+(d>0?'<span>'+d+(d===1?' day':' days')+' to Exam 5</span>':'')+'</div>'}
 mission();window.addEventListener('drvj:mission',mission);
 var r=sec.querySelector('#dqR'),R=readiness(),avg=Math.round(R.reduce(function(a,b){return a+b},0)/8);
 r.innerHTML='<div class="k">Exam 5 readiness · '+avg+'% overall</div><div class="bars">'+R.map(function(p,i){return '<button type="button" class="bar" data-i="'+i+'"><span>M'+(i+1)+' · '+NAMES[i]+'</span><b>'+p+'%</b><u><i style="width:'+p+'%"></i></u></button>'}).join('')+'</div><small>Each bar fills as you practise that module: warm-ups, drills, guided solves and bug hunts. Tap a bar to practise it.</small>';
 [].forEach.call(r.querySelectorAll('.bar'),function(b){b.onclick=function(){S.set('tb:mod',+b.dataset.i);track('readiness_click',{module:'m'+(+b.dataset.i+1)});location.href='tb.html'}})}

/* ---------- Training Bay ---------- */
function bay(){var p=document.getElementById('p_drill'),mods=document.getElementById('mods');if(!p||!mods||document.getElementById('dqW'))return;
 var card=document.createElement('div');card.className='dq';card.id='dqW';p.insertBefore(card,p.firstChild);var lastQ=null;
 function next(){var mi=S.get('tb:mod',6)+1,pool=BANK.filter(function(b){return b.m===mi&&b!==lastQ});if(!pool.length)pool=BANK.filter(function(b){return b.m===mi});if(!pool.length){card.hidden=true;return}
  card.hidden=false;lastQ=pool[Math.floor(Math.random()*pool.length)];
  quick(card,lastQ,'tb','Warm-up · tap to answer',function(){var b=document.createElement('button');b.type='button';b.className='more';b.textContent='Another warm-up ▸';b.onclick=next;card.appendChild(b)})}
 next();
 /* log every wrong try (the page only records an item once it is finally answered) */
 try{if(typeof window.bad==='function'&&!window.bad.__dv){var ob=window.bad;window.bad=function(){ob.apply(this,arguments);var tab='';try{var tb=document.querySelector('[id^="p_"]:not([hidden])');tab=tb?tb.id.slice(2):''}catch(e){}track('tb_miss',{module:'m'+(S.get('tb:mod',6)+1),tab:tab})};window.bad.__dv=1}}catch(e){}
 mods.addEventListener('click',function(e){if(!e.target.closest('button'))return;setTimeout(function(){next();var t=document.getElementById('modTitle');if(t){t.classList.remove('dqflash');void t.offsetWidth;t.classList.add('dqflash');var r=t.getBoundingClientRect();if(r.top<0||r.top>innerHeight*.7)t.scrollIntoView({behavior:'smooth',block:'start'})}},30)});
 /* a wrong typed answer: tapping the box selects it so retyping is one step, and the red clears as you type */
 document.addEventListener('focusin',function(e){var t=e.target;if(t&&t.tagName==='INPUT'&&t.classList.contains('bad')){try{t.select()}catch(_){}}});
 document.addEventListener('input',function(e){var t=e.target;if(t&&t.tagName==='INPUT'&&t.classList.contains('bad'))t.classList.remove('bad')})}

function go(){try{home()}catch(e){}try{bay()}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
