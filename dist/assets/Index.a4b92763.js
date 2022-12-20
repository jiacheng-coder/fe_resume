import{r as b,o as G,w as q,d as f,p as L,c as S,i as U,a,b as l,e as u,f as k,g as C,h as _,u as g,j as B,n as P,t as c,F as v,k as D,l as z,m as K,q as J,_ as Y}from"./index.727126a3.js";import{o as h,t as V,c as W,P as j,p as Q,R as O,u as M,l as $,a as y,r as X,b as Z}from"./XMarkIcon.9eba19f1.js";function R(e,n){if(e)return e;let o=n!=null?n:"button";if(typeof o=="string"&&o.toLowerCase()==="button")return"button"}function uu(e,n){let o=b(R(e.value.type,e.value.as));return G(()=>{o.value=R(e.value.type,e.value.as)}),q(()=>{var r;o.value||!h(n)||h(n)instanceof HTMLButtonElement&&!((r=h(n))!=null&&r.hasAttribute("type"))&&(o.value="button")}),o}var eu=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(eu||{});let H=Symbol("DisclosureContext");function I(e){let n=U(H,null);if(n===null){let o=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,I),o}return n}let N=Symbol("DisclosurePanelContext");function tu(){return U(N,null)}let su=f({name:"Disclosure",props:{as:{type:[Object,String],default:"template"},defaultOpen:{type:[Boolean],default:!1}},setup(e,{slots:n,attrs:o}){let r=`headlessui-disclosure-button-${V()}`,t=`headlessui-disclosure-panel-${V()}`,s=b(e.defaultOpen?0:1),E=b(null),d=b(null),p={buttonId:r,panelId:t,disclosureState:s,panel:E,button:d,toggleDisclosure(){s.value=M(s.value,{[0]:1,[1]:0})},closeDisclosure(){s.value!==1&&(s.value=1)},close(m){p.closeDisclosure();let x=(()=>m?m instanceof HTMLElement?m:m.value instanceof HTMLElement?h(m):h(p.button):h(p.button))();x==null||x.focus()}};return L(H,p),W(S(()=>M(s.value,{[0]:$.Open,[1]:$.Closed}))),()=>{let{defaultOpen:m,...x}=e,w={open:s.value===0,close:p.close};return j({theirProps:x,ourProps:{},slot:w,slots:n,attrs:o,name:"Disclosure"})}}}),T=f({name:"DisclosureButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1}},setup(e,{attrs:n,slots:o,expose:r}){let t=I("DisclosureButton"),s=tu(),E=s===null?!1:s===t.panelId,d=b(null);r({el:d,$el:d}),E||q(()=>{t.button.value=d.value});let p=uu(S(()=>({as:e.as,type:n.type})),d);function m(){var i;e.disabled||(E?(t.toggleDisclosure(),(i=h(t.button))==null||i.focus()):t.toggleDisclosure())}function x(i){var A;if(!e.disabled)if(E)switch(i.key){case y.Space:case y.Enter:i.preventDefault(),i.stopPropagation(),t.toggleDisclosure(),(A=h(t.button))==null||A.focus();break}else switch(i.key){case y.Space:case y.Enter:i.preventDefault(),i.stopPropagation(),t.toggleDisclosure();break}}function w(i){switch(i.key){case y.Space:i.preventDefault();break}}return()=>{let i={open:t.disclosureState.value===0},A=E?{ref:d,type:p.value,onClick:m,onKeydown:x}:{id:t.buttonId,ref:d,type:p.value,"aria-expanded":e.disabled?void 0:t.disclosureState.value===0,"aria-controls":h(t.panel)?t.panelId:void 0,disabled:e.disabled?!0:void 0,onClick:m,onKeydown:x,onKeyup:w};return j({ourProps:A,theirProps:e,slot:i,attrs:n,slots:o,name:"DisclosureButton"})}}}),nu=f({name:"DisclosurePanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(e,{attrs:n,slots:o,expose:r}){let t=I("DisclosurePanel");r({el:t.panel,$el:t.panel}),L(N,t.panelId);let s=Q(),E=S(()=>s!==null?s.value===$.Open:t.disclosureState.value===0);return()=>{let d={open:t.disclosureState.value===0,close:t.close},p={id:t.panelId,ref:t.panel};return j({ourProps:p,theirProps:e,slot:d,attrs:n,slots:o,features:O.RenderStrategy|O.Static,visible:E.value,name:"DisclosurePanel"})}}});function ou(e,n){return a(),l("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[u("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"})])}const au={class:"mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"},lu={class:"relative flex h-16 items-center justify-between"},ru={class:"absolute inset-y-0 left-0 flex items-center sm:hidden"},iu=u("span",{class:"sr-only"},"Open main menu",-1),cu={class:"flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"},du=u("div",{class:"flex flex-shrink-0 items-center"},[u("img",{class:"block h-8 w-auto lg:hidden",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500",alt:"Your Company"}),u("img",{class:"hidden h-8 w-auto lg:block",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500",alt:"Your Company"})],-1),pu={class:"hidden sm:ml-6 sm:block"},Eu={class:"flex space-x-4"},mu=["href","aria-current"],hu={class:"absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"},_u={type:"button",class:"rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"},fu=u("span",{class:"sr-only"},"View notifications",-1),xu={class:"space-y-1 px-2 pt-2 pb-3"},gu=f({__name:"NavBar",setup(e){const n=[{name:"\u6211\u7684\u7B80\u5386",href:"#",current:!0},{name:"\u6398\u91D1\u94FE\u63A5",href:"https://juejin.cn/user/2538135637997560/posts",current:!1},{name:"Gitee",href:"https://gitee.com/zhujiacheng612",current:!1},{name:"Email Me",href:"mailto:2253541907@qq.com",current:!1}];return(o,r)=>(a(),k(g(su),{as:"nav",class:"bg-gray-800"},{default:C(({open:t})=>[u("div",au,[u("div",lu,[u("div",ru,[_(g(T),{class:"inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"},{default:C(()=>[iu,t?(a(),k(g(Z),{key:1,class:"block h-6 w-6","aria-hidden":"true"})):(a(),k(g(X),{key:0,class:"block h-6 w-6","aria-hidden":"true"}))]),_:2},1024)]),u("div",cu,[du,u("div",pu,[u("div",Eu,[(a(),l(v,null,B(n,s=>u("a",{target:"_blank",key:s.name,href:s.href,class:P([s.current?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white","px-3 py-2 rounded-md text-sm font-medium"]),"aria-current":s.current?"page":void 0},c(s.name),11,mu)),64))])])]),u("div",hu,[u("button",_u,[fu,_(g(ou),{class:"h-6 w-6","aria-hidden":"true"})])])])]),_(g(nu),{class:"sm:hidden"},{default:C(()=>[u("div",xu,[(a(),l(v,null,B(n,s=>_(g(T),{key:s.name,as:"a",href:s.href,class:P([s.current?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white","block px-3 py-2 rounded-md text-base font-medium"]),"aria-current":s.current?"page":void 0},{default:C(()=>[D(c(s.name),1)]),_:2},1032,["href","class","aria-current"])),64))])]),_:1})]),_:1}))}}),vu="/frontend-resume/assets/me.54195c60.jpg",Fu={class:"bg-white shadow-lg p-4 h-full"},Bu={class:"md:block"},yu=u("div",{class:"flex justify-center"},[u("img",{class:"h-40 rounded-full mx-4",src:vu})],-1),Du={class:"text-center mt-10 justify-center items-center"},bu={class:"text-xl text-gray-800 font-bold"},Au=u("div",{class:"md:text-lg text-gray-600 mt-4"},"\u524D\u7AEF\u5DE5\u7A0B\u5E08",-1),Cu=z('<div class="my-10 md:block ml-8 mr-4"><div class="my-5 text-lg text-gray-600 flex"><div class="mr-2"><span class="iconfont icon-wechat"></span></div> zaqwertyuioplm7412 </div><div class="my-5 text-lg text-gray-600 flex"><div class="mr-2"><span class="iconfont icon-telephone"></span></div> 15023092023 </div><div class="my-5 text-lg text-gray-600 flex"><div class="mr-2"><span class="iconfont icon-email"></span></div> 2253541907@qq.com </div><div class="my-5 text-lg text-gray-600 flex"><div class="mr-2"><span class="iconfont icon-location"></span></div> \u4E2D\u56FD \u91CD\u5E86 </div></div>',1),wu=f({__name:"LeftSideBar",props:{name:{type:String}},setup(e){const n=e;return(o,r)=>(a(),l("div",Fu,[u("div",Bu,[yu,u("div",Du,[u("h1",bu,c(n.name),1),Au])]),Cu]))}}),ku={class:"mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200 hover:text-white hover:bg-gray-800 duration-300 hover:cursor-pointer"},$u=f({__name:"Skill",props:{name:{type:String}},setup(e){const n=e;return(o,r)=>(a(),l("div",null,[u("span",ku,c(n.name),1)]))}}),F=e=>(K("data-v-2457e12a"),e=e(),J(),e),Su={class:"bg-white p-4 shadow-lg h-full"},ju={class:"mx-4 mb-6"},Iu=F(()=>u("h1",{class:"mb-4 text-3xl text-gray-700 font-bold"},"\u4E2A\u4EBA\u4F18\u52BF",-1)),Pu={class:"text-lg"},Vu=F(()=>u("span",{class:"iconfont icon-pointer mr-2"},null,-1)),Ou=F(()=>u("div",{class:"mx-4 mb-6"},[u("h1",{class:"mb-4 text-3xl text-gray-700 font-bold"},"\u6559\u80B2\u7ECF\u5386"),u("div",{class:"flex justify-between"},[u("text",null,"\u91CD\u5E86\u5927\u5B66"),u("text",null,"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66"),u("text",null,"2020-2024")])],-1)),Mu={class:"mx-4 mb-6"},Ru=F(()=>u("h1",{class:"mb-4 text-3xl text-gray-700 font-bold"},"\u9879\u76EE\u7ECF\u5386",-1)),Tu={class:"mb-4"},qu={class:"text-2xl font-medium text-gray-800"},Lu={class:"mt-1"},Uu={class:"flex text-md font-medium text-gray-800 justify-between"},Hu={class:"font-bold"},Nu=F(()=>u("p",{class:"mr-4"},"\u9879\u76EE\u5185\u5BB9:",-1)),Gu=F(()=>u("text",{class:"mr-4"},"\u6280\u672F\u6808:",-1)),zu={class:"mx-4"},Ku=F(()=>u("h1",{class:"mb-8 text-3xl text-gray-700 font-bold"},"\u6280\u672F\u6808",-1)),Ju={class:"flex flex-wrap"},Yu={class:"mb-6"},Wu=f({__name:"RightSideBar",props:{skills:{type:Array},features:{type:Array},experience:{type:Array}},setup(e){const n=e;return(o,r)=>(a(),l("div",Su,[u("div",ju,[Iu,(a(!0),l(v,null,B(n.features,t=>(a(),l("p",Pu,[Vu,D(" "+c(t),1)]))),256))]),Ou,u("div",Mu,[Ru,u("ul",null,[(a(!0),l(v,null,B(n.experience,t=>(a(),l("li",Tu,[u("text",qu,c(t.company),1),(a(!0),l(v,null,B(t.projects,s=>(a(),l("div",Lu,[u("div",Uu,[u("text",Hu,c(s.name),1),u("text",null,c(s.job),1),u("text",null,c(s.time),1)]),u("div",null,[Nu,u("text",null,c(s.situation),1),D(", "),u("text",null,c(s.target),1),D(", "),u("text",null,c(s.action),1),D(", "),u("text",null,c(s.result),1)]),u("div",null,[Gu,u("text",null,c(s.skills),1)])]))),256))]))),256))])]),u("div",zu,[Ku,u("ul",Ju,[(a(!0),l(v,null,B(n.skills,t=>(a(),l("li",Yu,[_($u,{name:t},null,8,["name"])]))),256))])])]))}});const Qu=Y(Wu,[["__scopeId","data-v-2457e12a"]]),Xu={class:"max-w-screen-lg mx-auto my-10 md:flex"},Zu={class:"md:w-1/3 p-4 relative"},ue={class:"md:w-2/3 p-4 w-full"},se=f({__name:"Index",setup(e){const n="\u8BF8\u5609\u8BDA",o=["Vue2","Vue3","Vue Router","Pinia","React","Mobx","\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F","uniapp","ElementPlus","GraceUI"],r=["\u719F\u6089HTML,CSS,JS; \u4E86\u89E3TypeScript;","\u719F\u6089Vue2, Vue3.2\u4EE5\u53CAVueRouter, Pinia, Element-Plus\u7B49\u751F\u6001;","\u719F\u6089\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u5F00\u53D1\u4E0E\u4E0A\u7EBF\u6D41\u7A0B, \u6709\u7EBF\u4E0A\u9879\u76EE\u7684\u5F00\u53D1\u4E0E\u7EF4\u62A4\u7ECF\u9A8C;","\u719F\u6089ColorUI, GraceUI\u7B49\u7EC4\u4EF6\u5E93, \u80FD\u591F\u9488\u5BF9\u5177\u4F53\u4E1A\u52A1, \u5BF9\u7EC4\u4EF6\u8FDB\u884C\u4E8C\u6B21\u5F00\u53D1;"],t=[{company:"\u91CD\u5E86\u7535\u8986\u8005\u79D1\u6280\u6709\u9650\u516C\u53F8",projects:[{name:"Wecqu",job:"\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",time:"2022\u5E749\u6708 - \u81F3\u4ECA",highlight:"",situation:"\u7531\u4E8E\u7528\u6237\u53CD\u9988\u73B0\u6709\u7684\u8BFE\u8868\u680F\u76EE\u4E0D\u80FD\u6EE1\u8DB3\u7814\u7A76\u751F\u8BFE\u8868\u7684\u591A\u53D8\u6027",target:"\u6211\u4EEC\u8BA8\u8BBA\u540E\u51B3\u5B9A\u5728\u539F\u6709\u529F\u80FD\u4E0A\u5B9E\u73B0\u81EA\u5B9A\u4E49\u8BFE\u8868\u7684\u4E8C\u6B21\u5F00\u53D1",action:"\u5728\u67E5\u9605\u76F8\u5173\u89E3\u51B3\u529E\u6CD5\u540E, \u6211\u51B3\u5B9A\u91C7\u7528\u5C06\u8868\u5355\u6570\u636E\u5B58\u5165\u5C0F\u7A0B\u5E8F\u7F13\u5B58, \u4E4B\u540E\u540C\u540E\u7AEF\u8FD4\u56DE\u7684\u8BFE\u7A0B\u6570\u636E\u4E00\u8D77\u6E32\u67D3\u5230\u9875\u9762\u4E2D\u7684\u89E3\u51B3\u529E\u6CD5",result:"\u6700\u7EC8\u5B9E\u73B0\u4E86\u8BFE\u8868\u4E8C\u6B21\u5F00\u53D1\u7684\u9700\u6C42",skills:"\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F, colorUI, graceUI3"},{name:"\u6821\u56ED\u751F\u6001\u5708",job:"\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",time:"2022\u5E7411\u6708 - \u81F3\u4ECA",highlight:"",situation:"\u7531\u4E8E\u73B0\u6709\u7684\u70B9\u51FB\u590D\u5236\u529F\u80FD\u4E0D\u7B26\u5408\u4F7F\u7528\u7528\u6237\u7684\u4F7F\u7528\u4E60\u60EF",target:"\u7ECF\u53CD\u9988\u51B3\u5B9A\u5C06\u5176\u66F4\u6362\u4E3A\u957F\u6309\u590D\u5236\u7684\u64CD\u4F5C\u65B9\u6CD5",action:"\u5728\u67E5\u9605\u76F8\u5173\u89E3\u51B3\u529E\u6CD5\u540E, \u6211\u51B3\u5B9A\u91C7\u7528@longpress\u65B9\u6CD5\u5F97\u5230\u590D\u5236\u540E\u7684\u5185\u5BB9",result:"\u5B9E\u73B0\u4E86\u7528\u6237\u7684\u9700\u6C42, \u53D7\u5230\u4E86\u591A\u4F4D\u7528\u6237\u7684\u597D\u8BC4",skills:"uniapp, vue2, graceUI5"}]},{company:"\u554A\u5BF9\u5BF9\u5BF9\u5BF9\u961F",projects:[{name:"\u4EFF\u6398\u91D1\u9996\u9875",job:"\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",time:"2022\u5E747\u6708 - 2022\u5E749\u6708",highlight:"\u9875\u9762\u65E0\u9650\u6EDA\u52A8, \u57FA\u4E8EMarkdown\u6570\u636E\u81EA\u52A8\u751F\u6210\u76EE\u5F55",situation:"\u5728\u5B57\u8282\u8DF3\u52A8\u7B2C\u56DB\u5C4A\u524D\u7AEF\u9752\u8BAD\u8425\u4E2D, \u6211\u4EEC\u9009\u62E9\u4E86\u4EFF\u6398\u91D1\u9996\u9875\u9879\u76EE\u4F5C\u4E3A\u7ED3\u4E1A\u9879\u76EE",target:"\u5B9E\u73B0\u6398\u91D1\u9996\u9875\u4E0E\u6587\u7AE0\u8BE6\u60C5\u9875",action:"\u67E5\u9605\u8D44\u6599, \u6574\u5408\u5E76\u5B9E\u73B0\u76F8\u5E94\u529F\u80FD",result:'\u83B7\u5F97"\u7801\u5982\u78D0\u77F3"\u5956\u9879, \u961F\u4F0D\u603B\u8BC4\u7B2C\u4E94',skills:"Vue, Apifox"}]}];return(s,E)=>(a(),l(v,null,[_(gu),u("div",Xu,[u("div",Zu,[_(wu,{name:n})]),u("div",ue,[_(Qu,{skills:o,features:r,experience:t})])])],64))}});export{se as default};
