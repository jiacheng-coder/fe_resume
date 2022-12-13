import{w as $,r as p,c as g,d as F,v as x,F as te,o as A,B as ue,C as L,p as U,i as j,T as Ne,D as Re,u as I,E as Be,h as Z,f as d,g as Y,j as fe,e as pe,l as we,a as X,t as ve}from"./index.da29365b.js";import{o as T,u as q,P as E,t as N,p as Me,R as me,l as ge,a as Ie,r as qe,b as He}from"./XMarkIcon.4a0b484b.js";const K=typeof window>"u"||typeof document>"u";function R(e){if(K)return null;if(e instanceof Node)return e.ownerDocument;if(e!=null&&e.hasOwnProperty("value")){let l=T(e);if(l)return l.ownerDocument}return document}let ne=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var G=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(G||{}),xe=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(xe||{}),Ge=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(Ge||{});function Ue(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(ne))}var Fe=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(Fe||{});function ze(e,l=0){var a;return e===((a=R(e))==null?void 0:a.body)?!1:q(l,{[0](){return e.matches(ne)},[1](){let t=e;for(;t!==null;){if(t.matches(ne))return!0;t=t.parentElement}return!1}})}function H(e){e==null||e.focus({preventScroll:!0})}let We=["textarea","input"].join(",");function Ve(e){var l,a;return(a=(l=e==null?void 0:e.matches)==null?void 0:l.call(e,We))!=null?a:!1}function Ye(e,l=a=>a){return e.slice().sort((a,t)=>{let o=l(a),n=l(t);if(o===null||n===null)return 0;let r=o.compareDocumentPosition(n);return r&Node.DOCUMENT_POSITION_FOLLOWING?-1:r&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function le(e,l,a=!0,t=null){var o;let n=(o=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?o:document,r=Array.isArray(e)?a?Ye(e):e:Ue(e);t=t!=null?t:n.activeElement;let i=(()=>{if(l&5)return 1;if(l&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),c=(()=>{if(l&1)return 0;if(l&2)return Math.max(0,r.indexOf(t))-1;if(l&4)return Math.max(0,r.indexOf(t))+1;if(l&8)return r.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=l&32?{preventScroll:!0}:{},u=0,f=r.length,v;do{if(u>=f||u+f<=0)return 0;let S=c+u;if(l&16)S=(S+f)%f;else{if(S<0)return 3;if(S>=f)return 1}v=r[S],v==null||v.focus(s),u+=i}while(v!==n.activeElement);return l&6&&Ve(v)&&v.select(),v.hasAttribute("tabindex")||v.setAttribute("tabindex","0"),2}function ee(e,l,a){K||$(t=>{document.addEventListener(e,l,a),t(()=>document.removeEventListener(e,l,a))})}function Qe(e,l,a=g(()=>!0)){function t(n,r){if(!a.value||n.defaultPrevented)return;let i=r(n);if(i===null||!i.getRootNode().contains(i))return;let c=function s(u){return typeof u=="function"?s(u()):Array.isArray(u)||u instanceof Set?u:[u]}(e);for(let s of c){if(s===null)continue;let u=s instanceof HTMLElement?s:T(s);if(u!=null&&u.contains(i))return}return!ze(i,Fe.Loose)&&i.tabIndex!==-1&&n.preventDefault(),l(n,i)}let o=p(null);ee("mousedown",n=>{var r,i;a.value&&(o.value=((i=(r=n.composedPath)==null?void 0:r.call(n))==null?void 0:i[0])||n.target)},!0),ee("click",n=>{!o.value||(t(n,()=>o.value),o.value=null)},!0),ee("blur",n=>t(n,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}var J=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(J||{});let ae=F({name:"Hidden",props:{as:{type:[Object,String],default:"div"},features:{type:Number,default:1}},setup(e,{slots:l,attrs:a}){return()=>{let{features:t,...o}=e,n={"aria-hidden":(t&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(t&4)===4&&(t&2)!==2&&{display:"none"}}};return E({ourProps:n,theirProps:o,slot:{},attrs:a,slots:l,name:"Hidden"})}}});function Je(e,l,a){K||$(t=>{window.addEventListener(e,l,a),t(()=>window.removeEventListener(e,l,a))})}var oe=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(oe||{});function Ke(){let e=p(0);return Je("keydown",l=>{l.key==="Tab"&&(e.value=l.shiftKey?1:0)}),e}function Pe(e,l,a,t){K||$(o=>{e=e!=null?e:window,e.addEventListener(l,a,t),o(()=>e.removeEventListener(l,a,t))})}function Ze(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(l=>setTimeout(()=>{throw l}))}var Ee=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(Ee||{});let M=Object.assign(F({name:"FocusTrap",props:{as:{type:[Object,String],default:"div"},initialFocus:{type:Object,default:null},features:{type:Number,default:30},containers:{type:Object,default:p(new Set)}},inheritAttrs:!1,setup(e,{attrs:l,slots:a,expose:t}){let o=p(null);t({el:o,$el:o});let n=g(()=>R(o));Xe({ownerDocument:n},g(()=>Boolean(e.features&16)));let r=et({ownerDocument:n,container:o,initialFocus:g(()=>e.initialFocus)},g(()=>Boolean(e.features&2)));tt({ownerDocument:n,container:o,containers:e.containers,previousActiveElement:r},g(()=>Boolean(e.features&8)));let i=Ke();function c(){let s=T(o);!s||q(i.value,{[oe.Forwards]:()=>le(s,G.First),[oe.Backwards]:()=>le(s,G.Last)})}return()=>{let s={},u={ref:o},{features:f,initialFocus:v,containers:S,...y}=e;return x(te,[Boolean(f&4)&&x(ae,{as:"button",type:"button",onFocus:c,features:J.Focusable}),E({ourProps:u,theirProps:{...l,...y},slot:s,attrs:l,slots:a,name:"FocusTrap"}),Boolean(f&4)&&x(ae,{as:"button",type:"button",onFocus:c,features:J.Focusable})])}}}),{features:Ee});function Xe({ownerDocument:e},l){let a=p(null);function t(){var n;a.value||(a.value=(n=e.value)==null?void 0:n.activeElement)}function o(){!a.value||(H(a.value),a.value=null)}A(()=>{ue(l,(n,r)=>{n!==r&&(n?t():o())},{immediate:!0})}),L(o)}function et({ownerDocument:e,container:l,initialFocus:a},t){let o=p(null),n=p(!1);return A(()=>n.value=!0),L(()=>n.value=!1),A(()=>{ue([l,a,t],(r,i)=>{if(r.every((s,u)=>(i==null?void 0:i[u])===s)||!t.value)return;let c=T(l);!c||Ze(()=>{var s,u;if(!n.value)return;let f=T(a),v=(s=e.value)==null?void 0:s.activeElement;if(f){if(f===v){o.value=v;return}}else if(c.contains(v)){o.value=v;return}f?H(f):le(c,G.First|G.NoScroll)===xe.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.value=(u=e.value)==null?void 0:u.activeElement})},{immediate:!0,flush:"post"})}),o}function tt({ownerDocument:e,container:l,containers:a,previousActiveElement:t},o){var n;Pe((n=e.value)==null?void 0:n.defaultView,"focus",r=>{if(!o.value)return;let i=new Set(a==null?void 0:a.value);i.add(l);let c=t.value;if(!c)return;let s=r.target;s&&s instanceof HTMLElement?nt(i,s)?(t.value=s,H(s)):(r.preventDefault(),r.stopPropagation(),H(c)):H(t.value)},!0)}function nt(e,l){var a;for(let t of e)if((a=t.value)!=null&&a.contains(l))return!0;return!1}let he="body > *",C=new Set,O=new Map;function be(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function ye(e){let l=O.get(e);!l||(l["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",l["aria-hidden"]),e.inert=l.inert)}function lt(e,l=p(!0)){$(a=>{if(!l.value||!e.value)return;let t=e.value,o=R(t);if(o){C.add(t);for(let n of O.keys())n.contains(t)&&(ye(n),O.delete(n));o.querySelectorAll(he).forEach(n=>{if(n instanceof HTMLElement){for(let r of C)if(n.contains(r))return;C.size===1&&(O.set(n,{"aria-hidden":n.getAttribute("aria-hidden"),inert:n.inert}),be(n))}}),a(()=>{if(C.delete(t),C.size>0)o.querySelectorAll(he).forEach(n=>{if(n instanceof HTMLElement&&!O.has(n)){for(let r of C)if(n.contains(r))return;O.set(n,{"aria-hidden":n.getAttribute("aria-hidden"),inert:n.inert}),be(n)}});else for(let n of O.keys())ye(n),O.delete(n)})}})}let Se=Symbol("ForcePortalRootContext");function at(){return j(Se,!1)}let re=F({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(e,{slots:l,attrs:a}){return U(Se,e.force),()=>{let{force:t,...o}=e;return E({theirProps:o,ourProps:{},slot:{},slots:l,attrs:a,name:"ForcePortalRoot"})}}});function ot(e){let l=R(e);if(!l){if(e===null)return null;throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)}let a=l.getElementById("headlessui-portal-root");if(a)return a;let t=l.createElement("div");return t.setAttribute("id","headlessui-portal-root"),l.body.appendChild(t)}let De=F({name:"Portal",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:l,attrs:a}){let t=p(null),o=g(()=>R(t)),n=at(),r=j(_e,null),i=p(n===!0||r==null?ot(t.value):r.resolveTarget());return $(()=>{n||r!=null&&(i.value=r.resolveTarget())}),L(()=>{var c,s;let u=(c=o.value)==null?void 0:c.getElementById("headlessui-portal-root");!u||i.value===u&&i.value.children.length<=0&&((s=i.value.parentElement)==null||s.removeChild(i.value))}),()=>{if(i.value===null)return null;let c={ref:t,"data-headlessui-portal":""};return x(Ne,{to:i.value},E({ourProps:c,theirProps:e,slot:{},attrs:a,slots:l,name:"Portal"}))}}}),_e=Symbol("PortalGroupContext"),rt=F({name:"PortalGroup",props:{as:{type:[Object,String],default:"template"},target:{type:Object,default:null}},setup(e,{attrs:l,slots:a}){let t=Re({resolveTarget(){return e.target}});return U(_e,t),()=>{let{target:o,...n}=e;return E({theirProps:n,ourProps:{},slot:{},attrs:l,slots:a,name:"PortalGroup"})}}}),Oe=Symbol("StackContext");var ie=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(ie||{});function it(){return j(Oe,()=>{})}function st({type:e,enabled:l,element:a,onUpdate:t}){let o=it();function n(...r){t==null||t(...r),o(...r)}A(()=>{ue(l,(r,i)=>{r?n(0,e,a):i===!0&&n(1,e,a)},{immediate:!0,flush:"sync"})}),L(()=>{l.value&&n(1,e,a)}),U(Oe,n)}let Ae=Symbol("DescriptionContext");function ut(){let e=j(Ae,null);if(e===null)throw new Error("Missing parent");return e}function dt({slot:e=p({}),name:l="Description",props:a={}}={}){let t=p([]);function o(n){return t.value.push(n),()=>{let r=t.value.indexOf(n);r!==-1&&t.value.splice(r,1)}}return U(Ae,{register:o,slot:e,name:l,props:a}),g(()=>t.value.length>0?t.value.join(" "):void 0)}let Bt=F({name:"Description",props:{as:{type:[Object,String],default:"p"}},setup(e,{attrs:l,slots:a}){let t=ut(),o=`headlessui-description-${N()}`;return A(()=>L(t.register(o))),()=>{let{name:n="Description",slot:r=p({}),props:i={}}=t,c=e,s={...Object.entries(i).reduce((u,[f,v])=>Object.assign(u,{[f]:I(v)}),{}),id:o};return E({ourProps:s,theirProps:c,slot:r.value,attrs:l,slots:a,name:n})}}});function ct(){let e=[],l=[],a={enqueue(t){l.push(t)},addEventListener(t,o,n,r){return t.addEventListener(o,n,r),a.add(()=>t.removeEventListener(o,n,r))},requestAnimationFrame(...t){let o=requestAnimationFrame(...t);a.add(()=>cancelAnimationFrame(o))},nextFrame(...t){a.requestAnimationFrame(()=>{a.requestAnimationFrame(...t)})},setTimeout(...t){let o=setTimeout(...t);a.add(()=>clearTimeout(o))},add(t){e.push(t)},dispose(){for(let t of e.splice(0))t()},async workQueue(){for(let t of l.splice(0))await t()}};return a}function ft(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}var pt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(pt||{});let se=Symbol("DialogContext");function z(e){let l=j(se,null);if(l===null){let a=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(a,z),a}return l}let Q="DC8F892D-2EBD-447C-A4C8-A03058436FF4",vt=F({name:"Dialog",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},open:{type:[Boolean,String],default:Q},initialFocus:{type:Object,default:null}},emits:{close:e=>!0},setup(e,{emit:l,attrs:a,slots:t,expose:o}){var n;let r=p(!1);A(()=>{r.value=!0});let i=p(0),c=Me(),s=g(()=>e.open===Q&&c!==null?q(c.value,{[ge.Open]:!0,[ge.Closed]:!1}):e.open),u=p(new Set),f=p(null),v=p(null),S=g(()=>R(f));if(o({el:f,$el:f}),!(e.open!==Q||c!==null))throw new Error("You forgot to provide an `open` prop to the `Dialog`.");if(typeof s.value!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${s.value===Q?void 0:e.open}`);let y=g(()=>r.value&&s.value?0:1),de=g(()=>y.value===0),W=g(()=>i.value>1),ke=j(se,null)!==null,$e=g(()=>W.value?"parent":"leaf");lt(f,g(()=>W.value?de.value:!1)),st({type:"Dialog",enabled:g(()=>y.value===0),element:f,onUpdate:(m,b,h)=>{if(b==="Dialog")return q(m,{[ie.Add](){u.value.add(h),i.value+=1},[ie.Remove](){u.value.delete(h),i.value-=1}})}});let Te=dt({name:"DialogDescription",slot:g(()=>({open:s.value}))}),Ce=`headlessui-dialog-${N()}`,V=p(null),k={titleId:V,panelRef:p(null),dialogState:y,setTitleId(m){V.value!==m&&(V.value=m)},close(){l("close",!1)}};return U(se,k),Qe(()=>{var m,b,h;return[...Array.from((b=(m=S.value)==null?void 0:m.querySelectorAll("body > *, [data-headlessui-portal]"))!=null?b:[]).filter(P=>!(!(P instanceof HTMLElement)||P.contains(T(v))||k.panelRef.value&&P.contains(k.panelRef.value))),(h=k.panelRef.value)!=null?h:f.value]},(m,b)=>{k.close(),Be(()=>b==null?void 0:b.focus())},g(()=>y.value===0&&!W.value)),Pe((n=S.value)==null?void 0:n.defaultView,"keydown",m=>{m.defaultPrevented||m.key===Ie.Escape&&y.value===0&&(W.value||(m.preventDefault(),m.stopPropagation(),k.close()))}),$(m=>{var b;if(y.value!==0||ke)return;let h=S.value;if(!h)return;let P=ct();function w(_,B,Le){let je=_.style.getPropertyValue(B);return Object.assign(_.style,{[B]:Le}),P.add(()=>{Object.assign(_.style,{[B]:je})})}let D=h==null?void 0:h.documentElement,ce=((b=h.defaultView)!=null?b:window).innerWidth-D.clientWidth;if(w(D,"overflow","hidden"),ce>0){let _=D.clientWidth-D.offsetWidth,B=ce-_;w(D,"paddingRight",`${B}px`)}if(ft()){let _=window.pageYOffset;w(D,"position","fixed"),w(D,"marginTop",`-${_}px`),w(D,"width","100%"),P.add(()=>window.scrollTo(0,_))}m(P.dispose)}),$(m=>{if(y.value!==0)return;let b=T(f);if(!b)return;let h=new IntersectionObserver(P=>{for(let w of P)w.boundingClientRect.x===0&&w.boundingClientRect.y===0&&w.boundingClientRect.width===0&&w.boundingClientRect.height===0&&k.close()});h.observe(b),m(()=>h.disconnect())}),()=>{let m={...a,ref:f,id:Ce,role:"dialog","aria-modal":y.value===0?!0:void 0,"aria-labelledby":V.value,"aria-describedby":Te.value},{open:b,initialFocus:h,...P}=e,w={open:y.value===0};return x(re,{force:!0},()=>[x(De,()=>x(rt,{target:f.value},()=>x(re,{force:!1},()=>x(M,{initialFocus:h,containers:u,features:de.value?q($e.value,{parent:M.features.RestoreFocus,leaf:M.features.All&~M.features.FocusLock}):M.features.None},()=>E({ourProps:m,theirProps:P,slot:w,attrs:a,slots:t,visible:y.value===0,features:me.RenderStrategy|me.Static,name:"Dialog"}))))),x(ae,{features:J.Hidden,ref:v})])}}});F({name:"DialogOverlay",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:l,slots:a}){let t=z("DialogOverlay"),o=`headlessui-dialog-overlay-${N()}`;function n(r){r.target===r.currentTarget&&(r.preventDefault(),r.stopPropagation(),t.close())}return()=>E({ourProps:{id:o,"aria-hidden":!0,onClick:n},theirProps:e,slot:{open:t.dialogState.value===0},attrs:l,slots:a,name:"DialogOverlay"})}});F({name:"DialogBackdrop",props:{as:{type:[Object,String],default:"div"}},inheritAttrs:!1,setup(e,{attrs:l,slots:a,expose:t}){let o=z("DialogBackdrop"),n=`headlessui-dialog-backdrop-${N()}`,r=p(null);return t({el:r,$el:r}),A(()=>{if(o.panelRef.value===null)throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.")}),()=>{let i=e,c={id:n,ref:r,"aria-hidden":!0};return x(re,{force:!0},()=>x(De,()=>E({ourProps:c,theirProps:{...l,...i},slot:{open:o.dialogState.value===0},attrs:l,slots:a,name:"DialogBackdrop"})))}}});let mt=F({name:"DialogPanel",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:l,slots:a,expose:t}){let o=z("DialogPanel"),n=`headlessui-dialog-panel-${N()}`;t({el:o.panelRef,$el:o.panelRef});function r(i){i.stopPropagation()}return()=>{let i={id:n,ref:o.panelRef,onClick:r};return E({ourProps:i,theirProps:e,slot:{open:o.dialogState.value===0},attrs:l,slots:a,name:"DialogPanel"})}}});F({name:"DialogTitle",props:{as:{type:[Object,String],default:"h2"}},setup(e,{attrs:l,slots:a}){let t=z("DialogTitle"),o=`headlessui-dialog-title-${N()}`;return A(()=>{t.setTitleId(o),L(()=>t.setTitleId(null))}),()=>E({ourProps:{id:o},theirProps:e,slot:{open:t.dialogState.value===0},attrs:l,slots:a,name:"DialogTitle"})}});const gt={class:"isolate bg-white"},ht=we('<div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"><svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"></path><defs><linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse"><stop stop-color="#9089FC"></stop><stop offset="1" stop-color="#FF80B5"></stop></linearGradient></defs></svg></div>',1),bt={class:"px-6 pt-6 lg:px-8"},yt={class:"flex h-9 items-center justify-between","aria-label":"Global"},wt=d("div",{class:"flex lg:min-w-0 lg:flex-1","aria-label":"Global"},[d("a",{href:"#",class:"-m-1.5 p-1.5"},[d("span",{class:"sr-only"},"Your Company"),d("img",{class:"h-8",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",alt:""})])],-1),xt={class:"flex lg:hidden"},Ft=d("span",{class:"sr-only"},"Open main menu",-1),Pt={class:"hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12"},Et=["href"],St=d("div",{class:"hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end"},null,-1),Dt={class:"flex h-9 items-center justify-between"},_t=d("div",{class:"flex"},[d("a",{href:"#",class:"-m-1.5 p-1.5"},[d("span",{class:"sr-only"},"Your Company"),d("img",{class:"h-8",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",alt:""})])],-1),Ot={class:"flex"},At=d("span",{class:"sr-only"},"Close menu",-1),kt={class:"mt-6 flow-root"},$t={class:"-my-6 divide-y divide-gray-500/10"},Tt={class:"space-y-2 py-6"},Ct=["href"],Lt=d("div",{class:"py-6"},[d("a",{href:"#",class:"-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"},"Log in")],-1),jt=we('<main><div class="relative px-6 lg:px-8"><div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40"><div><div class="hidden sm:mb-8 sm:flex sm:justify-center"><div class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20"><span class="text-gray-600"> Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">\u2192</span></a></span></div></div><div><h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Data to enrich your online business</h1><p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p><div class="mt-8 flex gap-x-4 sm:justify-center"><a href="#" class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"> Get started <span class="text-indigo-200" aria-hidden="true">\u2192</span></a><a href="#" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"> Live demo <span class="text-gray-400" aria-hidden="true">\u2192</span></a></div></div><div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"><svg class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"></path><defs><linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse"><stop stop-color="#9089FC"></stop><stop offset="1" stop-color="#FF80B5"></stop></linearGradient></defs></svg></div></div></div></div></main>',1),Mt=F({__name:"Blog",setup(e){const l=[{name:"Product",href:"#"},{name:"Features",href:"#"},{name:"Marketplace",href:"#"},{name:"Company",href:"#"}],a=p(!1);return(t,o)=>(X(),Z("div",gt,[ht,d("div",bt,[d("div",null,[d("nav",yt,[wt,d("div",xt,[d("button",{type:"button",class:"-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",onClick:o[0]||(o[0]=n=>a.value=!0)},[Ft,Y(I(qe),{class:"h-6 w-6","aria-hidden":"true"})])]),d("div",Pt,[(X(),Z(te,null,fe(l,n=>d("a",{key:n.name,href:n.href,class:"font-semibold text-gray-900 hover:text-gray-900"},ve(n.name),9,Et)),64))]),St]),Y(I(vt),{as:"div",onClose:o[2]||(o[2]=n=>a.value=!1),open:a.value},{default:pe(()=>[Y(I(mt),{focus:"true",class:"fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"},{default:pe(()=>[d("div",Dt,[_t,d("div",Ot,[d("button",{type:"button",class:"-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",onClick:o[1]||(o[1]=n=>a.value=!1)},[At,Y(I(He),{class:"h-6 w-6","aria-hidden":"true"})])])]),d("div",kt,[d("div",$t,[d("div",Tt,[(X(),Z(te,null,fe(l,n=>d("a",{key:n.name,href:n.href,class:"-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"},ve(n.name),9,Ct)),64))]),Lt])])]),_:1})]),_:1},8,["open"])])]),jt]))}});export{Mt as default};