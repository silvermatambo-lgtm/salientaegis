
/* Salient Aegis Group · UltraMax 7 Pro-inspired progressive enhancements.
   Static, privacy-respecting, accessible; WhatsApp sends only after visitor confirmation. */
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return Array.from(document.querySelectorAll(s))};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
$$('.year').forEach(function(el){el.textContent=String(new Date().getFullYear())});
var nav=$('#siteNav'),navBtn=$('#menuToggle');
if(nav && navBtn){
 navBtn.addEventListener('click',function(){var state=nav.classList.toggle('open');navBtn.setAttribute('aria-expanded',String(state))});
 nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');navBtn.setAttribute('aria-expanded','false')})});
}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav){nav.classList.remove('open');navBtn&&navBtn.setAttribute('aria-expanded','false')}});
var title=$('h1.typewriter');
if(title && !reduce){
 var original=title.getAttribute('data-text')||title.textContent;
 title.style.minHeight=Math.ceil(title.getBoundingClientRect().height)+'px';
 title.setAttribute('aria-label',original);title.textContent='';title.classList.add('typing');
 var i=0;
 function type(){if(i<original.length){title.textContent+=original.charAt(i++);window.setTimeout(type,74)}else title.classList.remove('typing')}
 type();
}
function onVisible(el,call){if(!el)return;if(reduce||!('IntersectionObserver' in window)){call(el);return}
 var obs=new IntersectionObserver(function(items){items.forEach(function(item){if(item.isIntersecting){call(el);obs.disconnect()}})},{threshold:.13});
 obs.observe(el);
}
$$('.reveal').forEach(function(el){onVisible(el,function(x){x.classList.add('visible')})});
var slides=$$('.hero-bg'),slide=0,slideInterval=null;
function showSlide(n){if(!slides.length)return;slide=(n+slides.length)%slides.length;slides.forEach(function(el,i){el.classList.toggle('active',i===slide)});var counter=$('#slideNum');if(counter)counter.textContent=String(slide+1).padStart(2,'0')}
function cycle(){window.clearInterval(slideInterval);if(!reduce && slides.length>1 && !document.hidden)slideInterval=window.setInterval(function(){showSlide(slide+1)},6800)}
$('#slidePrev')?.addEventListener('click',function(){showSlide(slide-1);cycle()});
$('#slideNext')?.addEventListener('click',function(){showSlide(slide+1);cycle()});
$('.hero')?.addEventListener('mouseenter',function(){window.clearInterval(slideInterval)});
$('.hero')?.addEventListener('mouseleave',cycle);
document.addEventListener('visibilitychange',cycle);cycle();
var scrollBusy=false;
window.addEventListener('scroll',function(){if(scrollBusy)return;scrollBusy=true;window.requestAnimationFrame(function(){var range=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);var p=$('#scrollProgress');if(p)p.style.transform='scaleX('+Math.min(1,window.scrollY/range)+')';scrollBusy=false})},{passive:true});
$$('.flip-card').forEach(function(card){card.addEventListener('click',function(){var yes=!card.classList.contains('flipped');$$('.flip-card').forEach(function(other){other.classList.remove('flipped');other.setAttribute('aria-pressed','false')});if(yes){card.classList.add('flipped');card.setAttribute('aria-pressed','true')}})});
var ring=$('#metricRing');
if(ring)onVisible(ring,function(){var t=ring.querySelector('#metricCount'),start=performance.now();function animate(now){var p=reduce?1:Math.min(1,(now-start)/1200);var eased=1-Math.pow(1-p,3);if(t)t.textContent=Math.round(eased*6);ring.style.setProperty('--ring',Math.round(eased*100)+'%');if(p<1)requestAnimationFrame(animate)}requestAnimationFrame(animate)});
var barList=$$('.metric-bar i');
if(barList.length)onVisible(barList[0],function(){barList.forEach(function(bar,index){setTimeout(function(){bar.style.width=bar.dataset.progress+'%'},index*160)})});
var serviceData=[
 ['Armed Escorting & Asset Protection','Commercial deliveries, stock movements and high-value cargo, with route-based protection planning.'],
 ['Infrastructure Protection & Armed Response','Protective planning for telecoms towers, critical infrastructure sites and incident coordination.'],
 ['Executive & Personal Protection','Discreet individual and family protection assessment, movement planning and personal-risk review.'],
 ['Static & Mobile Guarding','Facility access control, patrols, site security and incident reporting for commercial and residential settings.'],
 ['Farm & Rural Protection','Rural property security assessments, patrol planning, access management and coordinated response.'],
 ['Vehicle Tracking & Recovery Support','Tracking alert coordination, asset location support and assistance with lawful vehicle recovery.']
];
function el(tag,cls,value){var x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=value;return x}
$$('[data-svc]').forEach(function(button){button.addEventListener('click',function(){
 var i=Number(button.dataset.svc),s=serviceData[i];if(!s)return;
 $$('[data-svc]').forEach(function(b){b.classList.toggle('active',b===button);b.setAttribute('aria-selected',String(b===button))});
 var target=$('#explorerBody');if(!target)return;target.replaceChildren();
 target.append(el('span','eyebrow','SELECTED CAPABILITY'),el('h3','',s[0]),el('p','',s[1]));
 var act=el('button','btn gold','Enquire about this service ↗');act.type='button';act.addEventListener('click',function(){openQuote(s[0])});target.append(act)
})});
$$('[data-filter]').forEach(function(button){button.addEventListener('click',function(){
 var filter=button.dataset.filter;
 $$('[data-filter]').forEach(function(b){b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
 $$('.portfolio-card').forEach(function(card){card.hidden=(filter!=='All'&&card.dataset.category!==filter)})
})});
var lightbox=$('#lightbox');
$$('.portfolio-card').forEach(function(card){card.addEventListener('click',function(){
 if(!lightbox)return;$('#lightboxImage').src=card.dataset.image;$('#lightboxImage').alt=card.dataset.title;$('#lightboxTitle').textContent=card.dataset.title;lightbox.showModal()
})});
$('#lightboxClose')?.addEventListener('click',function(){lightbox.close()});
lightbox?.addEventListener('click',function(e){if(e.target===lightbox)lightbox.close()});
var slider=$('#compareSlider');
slider?.addEventListener('input',function(){var cmp=$('#compare');cmp.style.setProperty('--split',slider.value+'%');slider.setAttribute('aria-valuetext',slider.value+' percent')});
var wa='27648670968',quoteDialog=$('#quoteDialog');
var quoteStep=0,quote={service:'',location:'',scope:'',timeframe:'',name:'',phone:''};
function labelWithInput(name,text,type,opts){var label=el('label','',text),field=el(type==='select'?'select':type==='textarea'?'textarea':'input');
 field.name=name;field.required=true;field.maxLength=(name==='scope'?1000:150);
 if(type==='tel')field.type='tel';
 if(type==='select'){field.append(el('option','','Choose a service…'));field.firstChild.value='';opts.forEach(function(o){var op=el('option','',o);op.value=o;field.append(op)})}
 field.value=quote[name]||'';label.append(field);return label
}
function renderQuote(){if(!quoteDialog)return;
 var area=$('#wizardFields');area.replaceChildren();$('#wizardError').textContent='';
 $('#wizardMeter').style.width=((quoteStep+1)*25)+'%';
 $('#wizardLabel').textContent=['STEP 01 / CHOOSE A SERVICE','STEP 02 / YOUR REQUIREMENTS','STEP 03 / CONTACT DETAILS','STEP 04 / REVIEW MESSAGE'][quoteStep];
 if(quoteStep===0)area.append(labelWithInput('service','Service required','select',serviceData.map(function(x){return x[0]})));
 if(quoteStep===1){area.append(labelWithInput('location','Area / town','text'),labelWithInput('scope','Describe the protection requirement','textarea'),labelWithInput('timeframe','Preferred timeframe or date','text'))}
 if(quoteStep===2)area.append(labelWithInput('name','Your full name','text'),labelWithInput('phone','Phone number','tel'));
 if(quoteStep===3){area.append(el('p','','Please review the details below. WhatsApp will open with a draft message; you decide whether to press Send.'));
 Object.keys(quote).forEach(function(k){area.append(el('p','',k.charAt(0).toUpperCase()+k.slice(1)+': '+quote[k]))})}
 $('#quoteBack').hidden=quoteStep===0;$('#quoteNext').textContent=quoteStep===3?'Open WhatsApp ↗':'Continue →';
}
function openQuote(selected){if(!quoteDialog)return;if(selected)quote.service=selected;quoteStep=selected?1:0;renderQuote();quoteDialog.showModal()}
$$('[data-quote-open]').forEach(function(b){b.addEventListener('click',function(){openQuote()})});
function setupServiceQuotes(){$$('[data-service-quote]').forEach(function(b){if(b.dataset.wired)return;b.dataset.wired='yes';b.addEventListener('click',function(){openQuote(b.dataset.serviceQuote)})})}
setupServiceQuotes();
$('#quoteClose')?.addEventListener('click',function(){quoteDialog.close()});
$('#quoteBack')?.addEventListener('click',function(){if(quoteStep>0){quoteStep--;renderQuote()}});
function quoteMessage(){return ['Hello Salient Aegis Group,','','I would like a security consultation.','Service: '+quote.service,'Location: '+quote.location,'Requirements: '+quote.scope,'Timeframe: '+quote.timeframe,'Name: '+quote.name,'Phone: '+quote.phone,'','Please contact me to discuss the next steps.'].join('\n')}
$('#quoteForm')?.addEventListener('submit',function(e){e.preventDefault();
 if(quoteStep===3){window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(quoteMessage()),'_blank','noopener,noreferrer');$('#wizardError').textContent='WhatsApp opened with a draft. Please press Send there to submit your enquiry.';return}
 var keys=[['service'],['location','scope','timeframe'],['name','phone']][quoteStep];
 for(var i=0;i<keys.length;i++){var k=keys[i],f=$('#quoteForm').elements.namedItem(k),v=f.value.trim();
  if(v.length<2||(k==='scope'&&v.length<8)||(k==='phone'&&!/^[+0-9 ()-]{7,24}$/.test(v))){$('#wizardError').textContent='Please complete this step with valid information.';f.focus();return}
  quote[k]=v;
 }
 quoteStep++;renderQuote();
});
var panel=$('#chatPanel'),log=$('#chatLog'),form=$('#chatForm'),chatInput=$('#chatInput'),prompt=$('#chatPrompt'),choices=$('#chatOptions');
var chatStage=0,chat={name:'',phone:'',service:'',details:''};
var questions=['Welcome to SAG. What is your full name?','What contact number should SAG use?','Which service do you need?','Please describe the area, security concern and timeframe.'];
function bubble(text,mine){var item=el('div','chat-bubble'+(mine?' mine':''),text);log.append(item);log.scrollTop=log.scrollHeight}
function updateChatForm(){if(!panel)return;
 choices.replaceChildren();chatInput.value='';chatInput.hidden=chatStage===4;
 var send=form.querySelector('[type=submit]');
 if(chatStage<4){prompt.textContent=questions[chatStage];send.textContent='Continue →';
 chatInput.type=chatStage===1?'tel':'text';chatInput.placeholder=chatStage===0?'Full name':chatStage===1?'Contact number':chatStage===2?'Choose or type a service':'Location, concern and timeframe';
 if(chatStage===2){serviceData.forEach(function(s){var b=el('button','',s[0]);b.type='button';b.addEventListener('click',function(){chatInput.value=s[0];chatInput.focus()});choices.append(b)})}
 }else{prompt.textContent='Your enquiry is prepared.';send.textContent='Open WhatsApp ↗';bubble('Thank you. Select Open WhatsApp to review and send your message.')}
}
function resetChat(){chatStage=0;chat={name:'',phone:'',service:'',details:''};log.replaceChildren();bubble(questions[0]);updateChatForm()}
if(panel)resetChat();
$$('[data-chat-open]').forEach(function(b){b.addEventListener('click',function(){if(panel){panel.hidden=false;chatInput.focus()}})});
$$('[data-chat-close]').forEach(function(b){b.addEventListener('click',function(){panel.hidden=true})});
$('#chatReset')?.addEventListener('click',resetChat);
form?.addEventListener('submit',function(e){e.preventDefault();
 if(chatStage===4){var text=['Hello SAG,','Name: '+chat.name,'Phone: '+chat.phone,'Service: '+chat.service,'Details: '+chat.details,'Please contact me.'].join('\n');window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');return}
 var v=chatInput.value.trim();if(v.length<2||(chatStage===1&&v.replace(/\D/g,'').length<7)||(chatStage===3&&v.length<8)){chatInput.setCustomValidity('Please enter a complete answer.');chatInput.reportValidity();chatInput.setCustomValidity('');return}
 chat[['name','phone','service','details'][chatStage]]=v;bubble(v,true);chatStage++;
 if(chatStage<4)bubble(questions[chatStage]);updateChatForm()
});
var promptInstall=null;
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();promptInstall=e});
$$('[data-install-open]').forEach(function(b){b.addEventListener('click',function(){$('#installDialog')?.showModal()})});
$('#installClose')?.addEventListener('click',function(){$('#installDialog').close()});
$('#installNow')?.addEventListener('click',async function(){if(promptInstall){promptInstall.prompt();await promptInstall.userChoice;promptInstall=null}else alert('Use your browser menu to install. On iPhone use Safari → Share → Add to Home Screen.')});
if('serviceWorker' in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel&&!panel.hidden)panel.hidden=true});
})();
