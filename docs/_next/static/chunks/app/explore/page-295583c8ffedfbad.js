(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[607],{19648:function(e,l,a){Promise.resolve().then(a.bind(a,55888))},24597:function(e,l,a){"use strict";a.d(l,{Z:function(){return t}});var n=a(2369);function t(e){let{className:l}=e;return(0,n.jsxs)("div",{role:"status",className:"".concat(l||""," p-4 animate-pulse md:p-6"),children:[(0,n.jsx)("div",{className:"h-2.5 bg-gray-200 rounded-full  w-1/2 mb-2.5"}),(0,n.jsx)("div",{className:"w-3/4 h-2 mb-10 bg-gray-200 rounded-full "}),(0,n.jsxs)("div",{className:"h-full flex items-baseline mt-4",children:[(0,n.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-3/4 "}),(0,n.jsx)("div",{className:"w-full h-1/2 ms-6 bg-gray-200 rounded-t-lg "}),(0,n.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-3/4 ms-6 "}),(0,n.jsx)("div",{className:"w-full h-4/5 ms-6 bg-gray-200 rounded-t-lg "}),(0,n.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-5/6 ms-6 "}),(0,n.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-3/4 ms-6 "}),(0,n.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-5/6 ms-6 "})]}),(0,n.jsx)("span",{className:"sr-only",children:"Loading..."})]})}a(76965)},91230:function(e,l,a){"use strict";a.d(l,{Z:function(){return t}});var n=a(2369);function t(e){let{children:l,...a}=e;return(0,n.jsx)("h2",{className:"font-semibold text-indigo-600",...a,children:l})}},98326:function(e,l,a){"use strict";a.d(l,{Rl:function(){return u},fT:function(){return s},mL:function(){return o},rt:function(){return i},zb:function(){return t}});var n=a(36337);let t={attention:{max:18,label:"Attention"},memory:{max:26,label:"Memory"},fluency:{max:14,label:"Fluency"},language:{max:26,label:"Language"},visuospatial:{max:16,label:"Visuospatial"}},r=e=>"The score for ".concat(e.label," should be between 0 and ").concat(e.max),i=(0,n.Ry)({attention:(0,n.Rx)().label(t.attention.label).integer().min(0).max(t.attention.max,r).typeError("Please enter a number").nullable(),memory:(0,n.Rx)().label(t.memory.label).integer().min(0).max(t.memory.max,r).typeError("Please enter a number").nullable(),fluency:(0,n.Rx)().label(t.fluency.label).integer().min(0).max(t.fluency.max,r).typeError("Please enter a number").nullable(),language:(0,n.Rx)().label(t.language.label).integer().min(0).max(t.language.max,r).typeError("Please enter a number").nullable(),visuospatial:(0,n.Rx)().label(t.visuospatial.label).integer().min(0).max(t.visuospatial.max,r).typeError("Please enter a number").nullable()}),s=(0,n.Ry)({attention:(0,n.Rx)().label(t.attention.label).integer().min(0).max(t.attention.max,r).typeError("Please enter a number").required(),memory:(0,n.Rx)().label(t.memory.label).integer().min(0).max(t.memory.max,r).typeError("Please enter a number").required(),fluency:(0,n.Rx)().label(t.fluency.label).integer().min(0).max(t.fluency.max,r).typeError("Please enter a number").required(),language:(0,n.Rx)().label(t.language.label).integer().min(0).max(t.language.max,r).typeError("Please enter a number").required(),visuospatial:(0,n.Rx)().label(t.visuospatial.label).integer().min(0).max(t.visuospatial.max,r).typeError("Please enter a number").required()}),o=["attention","memory","fluency","language","visuospatial"],u={attention:null,memory:null,fluency:null,language:null,visuospatial:null}},630:function(e,l,a){"use strict";a.d(l,{H:function(){return r}});var n=a(98326),t=a(76965);function r(e){let[l,a]=(0,t.useState)(!1),[r,i]=(0,t.useState)(0);return(0,t.useEffect)(()=>{n.fT.validate(e).then(e=>{let l=Object.values(e).reduce((e,l)=>e+l,0);a(!0),i(l)}).catch(e=>{a(!1)})},[e]),{valid:l,total:r}}},95463:function(e,l,a){"use strict";a.d(l,{Fu:function(){return r},sW:function(){return n},t7:function(){return t}});let n={orange500:"#f97316",red600:"#dc2626",red500:"#ef4444",indigo500:"#6366f1",indigo600:"#4f46e5",indigo800:"#3730a3",emerald500:"#10b981",emerald600:"#059669"},t={blue:"#5778a4",orange:"#e49444",red:"#d1615d",teal:"#85b6b2",green:"#6a9f58",yellow:"#e7ca60",purple:"#a87c9f",pink:"#f1a2a9",brown:"#967662",grey:"#b8b0ac"},r={range:[t.red,t.orange,t.teal,t.green,t.blue],domain:["Attention","Memory","Fluency","Language","Visuospatial"]}},55888:function(e,l,a){"use strict";a.r(l),a.d(l,{default:function(){return A}});var n=a(2369),t=a(70590),r=a(90232),i=a(76965),s=a(91230),o=a(24597),u=a(36337);let d={visit_number:["All","1","2-3","4+"],sex:["All","Male","Female"],learning_difficulties:["All","Yes","No"],age_group:["All","<55","55-74","75+"],education:["All","9 or less","10-12","13+"],goldman_score:["All","1-2","3+","Unknown"],dementia_type:["All","Major","Minor"],diagnosis:["All","AD and amnestic MCI","bvFTD and FTD undefined","CBS and CBS + PPA","VD, DLB and Dementia NOS","FTD-MND and MND","PPA","PCA","PSP"]},c={visit_number:"Visit number",sex:"Sex",learning_difficulties:"Learning difficulties",age_group:"Age group",education:"Years of education",goldman_score:"Goldman score",dementia_type:"Neurocognitive disorder",diagnosis:"Diagnosis"},m=(0,u.Ry)({visit_number:(0,u.Z_)().oneOf(d.visit_number).default("All"),sex:(0,u.Z_)().oneOf(d.sex).default("All"),learning_difficulties:(0,u.Z_)().oneOf(d.learning_difficulties).default("All"),age_group:(0,u.Z_)().oneOf(d.age_group).default("All"),education:(0,u.Z_)().oneOf(d.education).default("All"),goldman_score:(0,u.Z_)().oneOf(d.goldman_score).default("All"),dementia_type:(0,u.Z_)().oneOf([...d.dementia_type,"Control"]).default("All"),diagnosis:(0,u.Z_)().oneOf([...d.diagnosis,"Control"]).default("All")}),f=["visit_number","sex","learning_difficulties","age_group","education","goldman_score","dementia_type","diagnosis"];var g=a(44258),x=a(630),b=a(95463),p=a(35601),h=a.n(p);function y(e){let{form_return:l}=e,{watch:t}=(0,g.Gc)(),u=t(),d=(0,i.useRef)(null),[c,m]=(0,i.useState)([]),{valid:p,total:y}=(0,x.H)(u),{watch:v}=l,j=v(),_=c.map(e=>{let l=f.map(l=>"All"===j[l]||e[l]===j[l]).every(e=>e);return{...e,excluded:!l}});return(0,i.useEffect)(()=>{(async()=>{let e=h().factory(0,1,{seed:12345});m((await a.e(316).then(a.t.bind(a,65316,19))).data.map(l=>({...l,jitter:e()})))})()},[]),(0,i.useEffect)(()=>{var e;let l=r.g({width:800,height:800,marginLeft:50,marginTop:50,style:{fontSize:"10pt"},y:{domain:[0,105],label:"ACE-III total score"},x:{domain:[-.1,1.1]},fx:{padding:0,label:null,axis:"top"},color:{type:"categorical",scheme:"pastel1"},marks:[r.lU({ticks:[],label:null}),r.Me({ticks:[0,10,20,30,40,50,60,70,80,90,100],tickSize:0,labelAnchor:"center",labelArrow:"none",fontSize:"12pt",labelOffset:50}),r.AK(_,{fx:"dementia",x:"jitter",y:"total",fill:"dementia",r:3.5,opacity:e=>e.excluded?0:.9}),p?r.rP([y],{stroke:b.sW.indigo600,marker:"circle-stroke",strokeWidth:3,fill:b.sW.indigo600}):null]});return null==d||null===(e=d.current)||void 0===e||e.replaceChildren(l),()=>l.remove()},[c,_,y,p]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.Z,{children:"Explore ACE-III scores"}),0===c.length&&(0,n.jsx)(n.Fragment,{children:"Loading..."}),(0,n.jsx)("div",{ref:d,children:(0,n.jsx)(o.Z,{className:"w-800px h-800px"})})]})}function v(e){let{label:l,name:a,options:r,form_return:i,...s}=e,{register:o,getFieldState:u}=i,d=u(a);return d.isDirty&&d.invalid,(0,n.jsx)("div",{className:"bg-gray-100 p-1 rounded-md",children:(0,n.jsxs)("fieldset",{className:"p-2 flex flex-col gap-1",...s,children:[(0,n.jsx)("legend",{className:"font-semibold text-sm",children:l}),r.map((e,l)=>{let r="".concat(a,"-option-").concat(l);return(0,n.jsxs)("div",{className:"flex items-center gap-2 h-6",children:[(0,n.jsx)(t.Y8,{className:"size-4",value:e,id:r,...o(a)}),(0,n.jsx)(t.__,{htmlFor:r,children:e})]},l)})]})})}function j(e){let{label:l,name:a,options:r,form_return:i,...s}=e,{register:o}=i,u="".concat(a,"_input");return(0,n.jsxs)("div",{className:"max-w-md bg-gray-100 p-2 rounded-md",children:[(0,n.jsx)("div",{className:"mb-2 block",children:(0,n.jsx)(t.__,{htmlFor:u,className:"font-semibold text-sm",children:l})}),(0,n.jsx)(t.Ph,{defaultValue:"All",...o(a),...s,children:r.map(e=>(0,n.jsx)("option",{value:e,children:e},e))})]})}function _(e){let{form_return:l}=e,{reset:a}=l,r=()=>{a(m.getDefault())};return(0,n.jsxs)("form",{className:"flex flex-col gap-2",children:[(0,n.jsxs)("div",{className:"flex flex-wrap gap-2",children:[f.filter(e=>"diagnosis"!==e).map(e=>{let a=d[e];return(0,n.jsx)(v,{label:c[e],name:e,options:a,form_return:l},e)}),(0,n.jsx)(j,{label:c.diagnosis,name:"diagnosis",options:d.diagnosis,form_return:l})]}),(0,n.jsx)(t.zx,{className:"my-2 w-48",gradientDuoTone:"purpleToBlue",size:"md",onClick:()=>r(),children:"Reset filters"})]})}var N=a(35988),w=a(80666);function A(){let e=(0,g.cI)({mode:"all",defaultValues:m.getDefault(),resolver:(0,N.X)(m)});return(0,n.jsx)("main",{className:"container mx-auto min-h-screen md:p-2",children:(0,n.jsxs)("div",{className:"flex flex-col md:flex-row md:flex-wrap justify-start items-center gap-2 md:gap-4",children:[(0,n.jsxs)(t.Zb,{className:"md:max-w-md",children:[(0,n.jsx)("h2",{className:"text-lg text-indigo-600 font-bold",children:"Explore our sample"}),(0,n.jsxs)("p",{children:["Use the filters here to explore the sample based on various characteristics. If you"," ",(0,n.jsx)(w.default,{className:"text-indigo-600 inline",href:"/",children:"enter scores for a patient"})," ","their score will be plotted so you can compare them to the sample."]}),(0,n.jsx)("h2",{className:"text-lg text-indigo-600 font-bold",children:"Filters"}),(0,n.jsx)(_,{form_return:e})]}),(0,n.jsx)(t.Zb,{className:"min-w-96",children:(0,n.jsx)(y,{form_return:e})})]})})}},35988:function(e,l,a){"use strict";a.d(l,{X:function(){return o}});var n=a(44258);let t=(e,l,a)=>{if(e&&"reportValidity"in e){let t=(0,n.U2)(a,l);e.setCustomValidity(t&&t.message||""),e.reportValidity()}},r=(e,l)=>{for(let a in l.fields){let n=l.fields[a];n&&n.ref&&"reportValidity"in n.ref?t(n.ref,a,e):n.refs&&n.refs.forEach(l=>t(l,a,e))}},i=(e,l)=>{l.shouldUseNativeValidation&&r(e,l);let a={};for(let t in e){let r=(0,n.U2)(l.fields,t),i=Object.assign(e[t]||{},{ref:r&&r.ref});if(s(l.names||Object.keys(e),t)){let e=Object.assign({},(0,n.U2)(a,t));(0,n.t8)(e,"root",i),(0,n.t8)(a,t,e)}else(0,n.t8)(a,t,i)}return a},s=(e,l)=>e.some(e=>e.startsWith(l+"."));function o(e,l,a){return void 0===l&&(l={}),void 0===a&&(a={}),function(t,s,o){try{return Promise.resolve(function(n,i){try{var u=(l.context,Promise.resolve(e["sync"===a.mode?"validateSync":"validate"](t,Object.assign({abortEarly:!1},l,{context:s}))).then(function(e){return o.shouldUseNativeValidation&&r({},o),{values:a.raw?t:e,errors:{}}}))}catch(e){return i(e)}return u&&u.then?u.then(void 0,i):u}(0,function(e){var l;if(!e.inner)throw e;return{values:{},errors:i((l=!o.shouldUseNativeValidation&&"all"===o.criteriaMode,(e.inner||[]).reduce(function(e,a){if(e[a.path]||(e[a.path]={message:a.message,type:a.type}),l){var t=e[a.path].types,r=t&&t[a.type];e[a.path]=(0,n.KN)(a.path,l,e,a.type,r?[].concat(r,a.message):a.message)}return e},{})),o)}}))}catch(e){return Promise.reject(e)}}}}},function(e){e.O(0,[431,188,156,459,949,295,512,167,527,276,744],function(){return e(e.s=19648)}),_N_E=e.O()}]);