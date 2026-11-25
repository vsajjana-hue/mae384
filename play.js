/* MAE 384 Mission Control: question of the day, daily mission, Exam 5 readiness, Training Bay warm-up.
   Loaded by coach.js. Uses the site's own colours and storage; no network calls. */
(function(){
if(window.__drvjPlay)return;window.__drvjPlay=1;
var EXAM=new Date(2026,11,3);
var S={get:function(k,d){try{var v=localStorage.getItem('mae384:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem('mae384:'+k,JSON.stringify(v))}catch(e){}}};
function day(d){d=d||new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function track(e,p){try{window.mcTrack&&window.mcTrack(e,p)}catch(_){}}
var NAMES=['Precision','Linear systems','Root finding','Curve fitting','Derivatives','Integration','ODEs','PDEs','Fourier'];
var SITE='https://vsajjana-hue.github.io/mae384/';
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
{m:9,q:'You sample a signal at 500 Hz for 20 s. What is the highest frequency you can detect?',o:['250 Hz','500 Hz','1000 Hz','20 Hz'],w:'Nyquist: you must sample at least twice the frequency you want to see, so the limit is half the sampling frequency.'},
{m:9,q:'You sample a signal at 500 Hz for 20 s. What is the lowest nonzero frequency you can detect?',o:['1/20 Hz','1/500 Hz','20 Hz','250 Hz'],w:'To see a frequency f you must record for at least one period, 1/f. A 20 s record gives F = 1/T = 1/20 Hz.'},
{m:9,q:'A gearbox signal has useful content from 0.5 Hz to 250 Hz. What is the minimum measurement you need?',o:['500 Hz for 2 s','250 Hz for 0.5 s','500 Hz for 0.5 s','250 Hz for 2 s'],w:'Sample at twice the highest frequency (2 × 250 = 500 Hz) and record for one period of the lowest (1/0.5 = 2 s).'},
{m:9,q:'You sample at 400 Hz for 10 s. The dominant signal is 40 Hz. What is its wave number k?',o:['400','40','4','10'],w:'F = 1/T = 1/10 Hz, so k = f/F = 40 × 10 = 400. The sampling rate does not enter.'},
{m:9,q:'A probe records every 0.01 s from 0 s to 5 s. The power at k = 1 belongs to which frequency?',o:['0.2 Hz','1 Hz','5 Hz','100 Hz'],w:'k = 1 is the fundamental frequency F = 1/T = 1/5 Hz. The time step only sets how high you can go.'},
{m:9,q:'You repeat a measurement of the same process but record twice as long. Which quantity stays the same?',o:['The frequency of the dominant signal','Its wave number k','The fundamental frequency F','The fundamental period T'],w:'T doubles, so F halves and k = f/F doubles. The physical frequency of the signal does not change.'},
{m:9,q:'Same record length, but you sample twice as fast. What happens to the wave number k of the dominant signal?',o:['It stays the same','It doubles','It halves','It becomes N/2'],w:'k = f·T. Neither f nor T changed. Sampling faster only adds higher wave numbers you can resolve.'},
{m:9,q:'You have N = 100 unique, equally spaced points. What is the maximum wave number?',o:['50','100','101','25'],w:'k_max = N/2. The last point repeats the first one, so it is not unique.'},
{m:9,q:'Y = 7 + 10 sin(7ωt) + 3 cos(7ωt) + …, sampled with N = 100 unique points. What is the power at k = 7?',o:['109/200','109/2','13/200','109/100'],w:'P_k = (a_k² + b_k²)/(2N) = (3² + 10²)/(2·100) = 109/200.'},
{m:9,q:'For Y = 7 + 2 sin(ωt) + cos(3ωt), what does the DFT give for a_0?',o:['7','0','14','9'],w:'a_0 is the mean of the data. Every sine and cosine averages to zero over a full period, so only the 7 is left.'},
{m:9,q:'To find a 600 Hz pressure fluctuation, how many measurements per second? (Only these choices are available.)',o:['2400','600','300','None of these'],w:'You need at least 2 × 600 = 1200 per second. Of the choices, only 2400 meets that minimum.'},
{m:9,q:'A 2 s recording has a 60 Hz hum. Which coefficients do you scale toward zero to remove it?',o:['a_120 and b_120','a_60 and b_60','a_30 and b_30','a_0'],w:'First find the wave number: k = f/F = 60 × 2 = 120. Then multiply a_k and b_k by α < 1 and rebuild the signal.'},
{m:9,q:'Your data set has a jump (it is not periodic over the record). How does its power spectrum look?',o:['Power decays slowly and spreads over many frequencies','A single sharp peak','Power drops to zero after k = 1','Exactly the same as without the jump'],w:'A jump needs many sines to build, so power leaks across the whole spectrum instead of falling off quickly.'},
{m:9,q:'A signal is the sum of a 5 Hz sine and a 12 Hz sine. Its power spectrum shows…',o:['two peaks, at 5 Hz and 12 Hz','one peak, at 17 Hz','one peak, at 8.5 Hz','one peak, at 7 Hz'],w:'The transform separates a signal into the frequencies it contains. It does not add or average them.'},
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
+'.rem{display:flex;flex-direction:column;gap:6px}.rem .remp{display:flex;flex-direction:column;gap:8px}.rem .remp[hidden]{display:none}.rem .chips button,.rem .cal{background:var(--panel2);color:var(--ink);border-radius:999px;padding:6px 12px;font-weight:800;font-size:.85rem;min-height:0;text-decoration:none;cursor:pointer;border:0}.rem .chips button[aria-pressed="true"]{background:var(--heat);color:#fff}.rem .cal{outline:2px solid var(--heat)}@media(min-width:641px){.rem .inst{display:none}}'
+'#dqFold{margin-top:4px}#dqFold>summary{cursor:pointer;font-family:var(--display);font-weight:600;font-size:1.05rem;padding:12px 16px;background:var(--panel);border-radius:14px;list-style-position:inside}#dqFold[open]>summary{margin-bottom:12px}'
+'#dqK{position:absolute;z-index:55;display:flex;gap:6px;background:var(--panel,#fff);padding:6px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,.28)}#dqK[hidden]{display:none}#dqK button{min-width:40px;min-height:40px;border-radius:9px;background:var(--panel2,#e8ecf8);color:var(--ink,#14213d);font:800 18px/1 system-ui,sans-serif;border:0;padding:0 8px}#dqK button[data-m]{font-size:13px;background:var(--heat,#e2570f);color:#fff}'
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
 for(var i=0;i<9;i++){var id='m'+(i+1),stars=['d','l','b'].filter(function(k){return done.indexOf(id+k)>=0}).length,a=0,c=0;
  for(var k in stats){var e=stats[k];if(e&&e.m===i){a+=e.a||0;c+=e.c||0}}
  var pct=i===8?Math.round(60*Math.min(1,S.get('done:m9',[]).length/5)+40*Math.min(1,(ok[id]||0)/5)):Math.round(50*stars/3+30*Math.min(1,a/10)*(a?c/a:0)+20*Math.min(1,(ok[id]||0)/3));out.push(pct)}
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
  +'<div class="chips"><span>🔥 '+m.streak+'-day streak</span>'+(d>0?'<span>'+d+(d===1?' day':' days')+' to Exam 5</span>':'')+'</div>';remindUI(el)}
 mission();window.addEventListener('drvj:mission',mission);
 var r=sec.querySelector('#dqR'),R=readiness(),avg=Math.round(R.reduce(function(a,b){return a+b},0)/R.length);
 r.innerHTML='<div class="k">Exam 5 readiness · '+avg+'% overall</div><div class="bars">'+R.map(function(p,i){return '<button type="button" class="bar" data-i="'+i+'"><span>M'+(i+1)+' · '+NAMES[i]+'</span><b>'+p+'%</b><u><i style="width:'+p+'%"></i></u></button>'}).join('')+'</div><small>Each bar fills as you practise that module: warm-ups, drills, guided solves and bug hunts. Tap a bar to practise it.</small><div id="dqN" hidden></div>';
 var nine=r.querySelector('#dqN'),last9=null;
 function m9(){var pool=BANK.filter(function(b){return b.m===9&&b!==last9});last9=pool[Math.floor(Math.random()*pool.length)];nine.hidden=false;nine.className='dq';nine.style.cssText='background:var(--panel2);border-bottom:0;margin-top:6px';
  quick(nine,last9,'home9','Module 9 warm-up',function(){var b=document.createElement('button');b.type='button';b.className='more';b.textContent='Another Module 9 question ▸';b.onclick=m9;nine.appendChild(b);var R2=readiness(),bar=r.querySelector('.bar[data-i="8"]');if(bar){bar.querySelector('b').textContent=R2[8]+'%';bar.querySelector('u i').style.width=R2[8]+'%'}})}
 [].forEach.call(r.querySelectorAll('.bar'),function(b){b.onclick=function(){var i=+b.dataset.i;track('readiness_click',{module:'m'+(i+1)});if(i===8){m9();nine.scrollIntoView({behavior:'smooth',block:'nearest'});return}S.set('tb:mod',i);location.href='tb.html'}});
 fold()}

/* ---------- reminders and install ---------- */
function pad(n){return(n<10?'0':'')+n}
function stamp(d,h){return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'T'+pad(h)+'0000'}
function remindUI(host){var box=document.createElement('div');box.className='rem';
 box.innerHTML='<button type="button" class="more" aria-expanded="false">⏰ Remind me daily ▸</button><div class="remp" hidden><small>Adds a 10-minute daily event to your own calendar, ending the night before Exam 5. Pick a time:</small><div class="chips" role="group" aria-label="Reminder time"><button type="button" data-h="9" aria-pressed="false">9 am</button><button type="button" data-h="16" aria-pressed="false">4 pm</button><button type="button" data-h="20" aria-pressed="true">8 pm</button></div><div class="chips"><a class="cal" data-k="ics">Apple or Outlook calendar</a><a class="cal" data-k="google" target="_blank" rel="noopener">Google Calendar</a></div><small class="inst">On a phone you can also add this site to your home screen: in Safari tap Share, then “Add to Home Screen”; in Chrome open the ⋮ menu and choose “Add to Home screen”.</small></div>';
 host.appendChild(box);var tg=box.querySelector('.more'),pn=box.querySelector('.remp'),h=20;
 function links(){var now=new Date(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate());if(now.getHours()>=h)d.setDate(d.getDate()+1);
  var s0=stamp(d,h),s1=s0.slice(0,11)+'1000',title='MAE 384 Mission Control: today\u2019s mission (5 min)';
  var ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MAE 384//Mission Control//EN','BEGIN:VEVENT','UID:mc-daily-'+s0+'@mae384','DTSTAMP:'+stamp(now,now.getHours())+'Z','DTSTART:'+s0,'DTEND:'+s1,'RRULE:FREQ=DAILY;UNTIL=20261202T235900','SUMMARY:'+title,'DESCRIPTION:Question of the day and three practice problems: '+SITE,'URL:'+SITE,'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+title,'TRIGGER:PT0M','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
  var a=box.querySelector('[data-k="ics"]');a.href='data:text/calendar;charset=utf-8,'+encodeURIComponent(ics);a.setAttribute('download','mission-control-reminder.ics');
  box.querySelector('[data-k="google"]').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(title)+'&dates='+s0+'/'+s1+'&ctz=America/Phoenix&recur='+encodeURIComponent('RRULE:FREQ=DAILY;UNTIL=20261203T065900Z')+'&details='+encodeURIComponent('Question of the day and three practice problems: '+SITE)}
 tg.onclick=function(){pn.hidden=!pn.hidden;tg.setAttribute('aria-expanded',!pn.hidden);links()};
 [].forEach.call(box.querySelectorAll('[data-h]'),function(b){b.onclick=function(){h=+b.dataset.h;[].forEach.call(box.querySelectorAll('[data-h]'),function(x){x.setAttribute('aria-pressed',x===b)});links()}});
 [].forEach.call(box.querySelectorAll('.cal'),function(a){a.addEventListener('click',function(){track('reminder_set',{kind:a.dataset.k,hour:h})})});links()}

/* ---------- shorter home page: practice first, stories folded ---------- */
function fold(){var cards=document.getElementById('cards');if(!cards||document.getElementById('dqFold'))return;
 var all=[].slice.call(cards.querySelectorAll('a.card')),keep=[],rest=[];
 all.forEach(function(c){var h=c.getAttribute('href')||'',go=(c.querySelector('.go')||{}).textContent||'';
  if(h==='tb.html'||h==='rush.html'||h==='m8.html'||h==='m9.html'||/^Continue/.test(go))keep.push(c);else rest.push(c)});
 if(rest.length<3)return;
 keep.sort(function(a,b){var o=function(c){var h=c.getAttribute('href');return h==='tb.html'?0:h==='rush.html'?1:2};return o(a)-o(b)});
 keep.forEach(function(c){cards.appendChild(c)});
 var d=document.createElement('details');d.id='dqFold';var open=false;try{open=localStorage.getItem('mae384:foldopen')==='1'}catch(e){}d.open=open;
 d.innerHTML='<summary>All module stories ('+rest.length+' more)</summary><div class="cards"></div>';
 var inner=d.querySelector('.cards');rest.forEach(function(c){inner.appendChild(c)});cards.insertAdjacentElement('afterend',d);
 d.addEventListener('toggle',function(){try{localStorage.setItem('mae384:foldopen',d.open?'1':'0')}catch(e){}if(d.open)track('stories_opened',{})})}

/* ---------- phone keys for typed answers ---------- */
function keys(){if(!(window.matchMedia&&matchMedia('(pointer:coarse)').matches))return;
 var bar=document.createElement('div');bar.id='dqK';bar.hidden=true;var cur=null,mode=S.get('keys:mode','num');
 bar.innerHTML=['−','/','.','^','(',')'].map(function(c){return '<button type="button" data-c="'+(c==='−'?'-':c)+'">'+c+'</button>'}).join('')+'<button type="button" data-m="1"></button>';
 document.body.appendChild(bar);var mb=bar.querySelector('[data-m]');
 function apply(){if(cur)cur.setAttribute('inputmode',mode==='num'?'decimal':'text');mb.textContent=mode==='num'?'abc':'123'}
 function place(){if(!cur)return;var r=cur.getBoundingClientRect();bar.style.top=(window.scrollY+r.bottom+6)+'px';bar.style.left=Math.max(8,Math.min(window.scrollX+r.left,window.scrollX+innerWidth-bar.offsetWidth-8))+'px'}
 document.addEventListener('focusin',function(e){var t=e.target;if(t&&t.tagName==='INPUT'&&(!t.type||t.type==='text')&&!t.closest('#drvj')&&t.closest('#p_drill,#p_guide,#p_bug')){cur=t;apply();bar.hidden=false;place()}});
 document.addEventListener('focusout',function(){setTimeout(function(){if(document.activeElement!==cur){bar.hidden=true}},150)});
 bar.addEventListener('pointerdown',function(e){e.preventDefault()});
 bar.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!cur)return;
  if(b.dataset.m){mode=mode==='num'?'text':'num';S.set('keys:mode',mode);apply();cur.blur();setTimeout(function(){cur.focus()},60);return}
  var s0=cur.selectionStart==null?cur.value.length:cur.selectionStart,e0=cur.selectionEnd==null?s0:cur.selectionEnd;
  cur.value=cur.value.slice(0,s0)+b.dataset.c+cur.value.slice(e0);try{cur.setSelectionRange(s0+1,s0+1)}catch(_){}cur.dispatchEvent(new Event('input',{bubbles:true}));cur.focus()});
 window.addEventListener('scroll',place,{passive:true});window.addEventListener('resize',place)}
function unused(){[].forEach.call([],function(b){b.onclick=function(){S.set('tb:mod',+b.dataset.i);track('readiness_click',{module:'m'+(+b.dataset.i+1)});location.href='tb.html'}})}

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

function go(){try{home()}catch(e){}try{bay()}catch(e){}try{if(document.getElementById('p_drill'))keys()}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
