(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{21440:function(){},80162:function(e,l,a){Promise.resolve().then(a.bind(a,51957))},51957:function(e,l,a){"use strict";a.d(l,{default:function(){return K}});var t=a(20795),r=a(62334),s=a(38123),i=a(68951);let n={attention:{max:18,label:"Attention"},memory:{max:26,label:"Memory"},fluency:{max:14,label:"Fluency"},language:{max:26,label:"Language"},visuospatial:{max:16,label:"Visuospatial"}},o=e=>"The score for ".concat(e.label," should be less than ").concat(e.max),c=(0,i.Ry)({attention:(0,i.Rx)().label(n.attention.label).integer().min(0).max(n.attention.max,o).typeError("Please enter a number").required(),memory:(0,i.Rx)().label(n.memory.label).integer().min(0).max(n.memory.max,o).typeError("Please enter a number").required(),fluency:(0,i.Rx)().label(n.fluency.label).integer().min(0).max(n.fluency.max,o).typeError("Please enter a number").required(),language:(0,i.Rx)().label(n.language.label).integer().min(0).max(n.language.max,o).typeError("Please enter a number").required(),visuospatial:(0,i.Rx)().label(n.visuospatial.label).integer().min(0).max(n.visuospatial.max,o).typeError("Please enter a number").required()}),d=["attention","memory","fluency","language","visuospatial"];var m=a(97819),u=a(83290);function x(e){let[l,a]=(0,m.useState)(!1),[t,r]=(0,m.useState)(0);return(0,m.useEffect)(()=>{c.validate(e).then(e=>{let l=Object.values(e).reduce((e,l)=>e+l,0);a(!0),r(l)}).catch(e=>{a(!1)})},[e]),{valid:l,total:t}}function h(e){let{width:l,height:a}=e;return(0,t.jsxs)("div",{role:"status",className:"w-".concat(l,"px h-").concat(a,"px p-4 animate-pulse md:p-6"),children:[(0,t.jsx)("div",{className:"h-2.5 bg-gray-200 rounded-full  w-1/2 mb-2.5"}),(0,t.jsx)("div",{className:"w-3/4 h-2 mb-10 bg-gray-200 rounded-full "}),(0,t.jsxs)("div",{className:"h-full flex items-baseline mt-4",children:[(0,t.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-3/4 "}),(0,t.jsx)("div",{className:"w-full h-1/2 ms-6 bg-gray-200 rounded-t-lg "}),(0,t.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-3/4 ms-6 "}),(0,t.jsx)("div",{className:"w-full h-4/5 ms-6 bg-gray-200 rounded-t-lg "}),(0,t.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-5/6 ms-6 "}),(0,t.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-3/4 ms-6 "}),(0,t.jsx)("div",{className:"w-full bg-gray-200 rounded-t-lg h-5/6 ms-6 "})]}),(0,t.jsx)("span",{className:"sr-only",children:"Loading..."})]})}let f=[{label:"High risk",min:0,max:60,width:60},{label:"Moderate risk",min:60,max:80,width:20},{label:"Low risk",min:80,max:100,width:20}];function p(e){let l=(0,m.useRef)(null),{scores:a}=e,{valid:r,total:s}=x(a);return(0,m.useEffect)(()=>{var e;let a=u.g({title:r?"Total score: ".concat(s):"Total score",width:500,height:150,x:{grid:!0,label:"ACE-III total score"},color:{type:"ordinal",scheme:"YlOrRd",domain:["Low risk","Moderate risk","High risk"],legend:!0},marks:[u.Me({ticks:[]}),u.JA(f,{x1:"min",x2:"max",y1:0,y2:10,fill:"label",opacity:.7}),r?u.zD([{score:s}],{x:"score",stroke:"black",marker:"circle",strokeWidth:2}):null]});return null==l||null===(e=l.current)||void 0===e||e.replaceChildren(a),()=>a.remove()},[r,s]),(0,t.jsx)("div",{ref:l,children:(0,t.jsx)(h,{width:500,height:150})})}var g=a(98451);function b(e){let{label:l,name:a,...s}=e,{register:i,getFieldState:n}=(0,r.Gc)(),o=n(a),c=o.isDirty?o.invalid?"failure":"success":void 0;return(0,t.jsxs)("div",{children:[(0,t.jsx)(g.__,{htmlFor:a,children:l}),(0,t.jsx)(g.oi,{type:"number",color:c,...i(a),...s}),o.error&&(0,t.jsx)("span",{className:"text-sm text-red-400",children:o.error.message})]})}function v(e){let{form:l}=e,{handleSubmit:a}=l;return(0,t.jsxs)(g.Zb,{className:"max-w-xl",id:"score-entry",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-indigo-700",children:"Enter ACE-III scale scores"}),(0,t.jsx)(r.RV,{...l,children:(0,t.jsxs)("form",{className:"flex flex-col max-w-lg gap-4 my-2",onSubmit:a(e=>console.log(e)),children:[(0,t.jsx)(b,{label:"Attention",name:"attention"}),(0,t.jsx)(b,{label:"Memory",name:"memory"}),(0,t.jsx)(b,{label:"Fluency",name:"fluency"}),(0,t.jsx)(b,{label:"Language",name:"language"}),(0,t.jsx)(b,{label:"Visuospatial",name:"visuospatial"})]})})]})}function y(e){let[l,a]=(0,m.useState)(!1),[t,r]=(0,m.useState)(void 0);return(0,m.useEffect)(()=>{c.validate(e).then(e=>{a(!0),r(e)}).catch(e=>{a(!1)})},[e]),{valid:l,scores:t}}let j=function(e){let l=0,a=[];return[...Array(100).keys()].map(()=>{a.push({start:l,end:l+1}),l+=1}),a}(0);function w(e){let l=(0,m.useRef)(null),{model:a}=e,{scores:r}=y(e.scores),s=r?(1-a.predict(r))*100:void 0;return(0,m.useEffect)(()=>{var e;let t=r?a.confidence_interval(r):void 0,i=void 0!==t?{upper:1-t[0],lower:1-t[1]}:void 0,n=u.g({title:s?"Predicted risk of dementia: ".concat(Math.round(s),"%"):"Predicted risk of dementia",width:500,height:150,x:{grid:!0,label:"Risk (%)",reverse:!0},color:{type:"sequential",scheme:"magma",domain:[0,100],reverse:!0},marks:[u.Me({ticks:[]}),u.JA(j,{x1:"start",x2:"end",y1:0,y2:10,fill:"start",opacity:.7}),i?u.VD([i],{x1:"lower",x2:"upper",y:5,stroke:"#404040",strokeWidth:1}):null,s?u.zD([{score:s}],{x:"score",stroke:"black",marker:"circle",strokeWidth:2}):null]});return null==l||null===(e=l.current)||void 0===e||e.replaceChildren(n),()=>n.remove()},[s,a,r]),(0,t.jsx)("div",{ref:l,children:(0,t.jsx)(h,{width:500,height:150})})}var k=JSON.parse('{"FO":{"intercept":-10.32498577197637,"coefs":{"attention":0.32488943647638785,"memory":0.38489972502392367,"fluency":0.6649399088480656,"language":0.8122292594499009,"visuospatial":0.27262320144200186}},"gy":[[1.1198148056383341,-0.04667157889023354,-0.029050628130672468,-0.03154225255108559,-0.1190583591997873,-0.029332239835712218],[-0.04667157889023354,0.01990916962066307,-0.0018505615413595914,-0.0003122597422042938,0.0013568544291487523,-0.004227463027503619],[-0.029050628130672468,-0.0018505615413595914,0.0051743515623118045,0.00037707762389274115,-0.0002226042259692137,-0.00009327160777052855],[-0.03154225255108559,-0.0003122597422042938,0.00037707762389274115,0.010118577556215019,-0.0008425351174451155,-0.0019587136699196254],[-0.1190583591997873,0.0013568544291487523,-0.0002226042259692137,-0.0008425351174451155,0.025285453489057252,-0.00045303533243386105],[-0.029332239835712218,-0.004227463027503619,-0.00009327160777052855,-0.0019587136699196254,-0.00045303533243386105,0.02528815793412658]],"qh":{"attention":13.74361088,"memory":16.7830033,"fluency":6.91990091,"language":20.02885408,"visuospatial":13.13685078}}'),N=a(1560),_=a(73317),E=a(41180),I=a(41940),R=a(85772),V=a(13338),q=a(26868),O=a.n(q);let S=(0,N.U)({matrixDependencies:_.Q,multiplyDependencies:E._,sqrtDependencies:I.E,transposeDependencies:R.p});class A{has_vcov(){return void 0!==this.vcov}has_means(){return void 0!==this.predictor_means}get_centered_data(e){if(!this.has_means())throw Error("You must provide predictor_means in the options to center data");return Object.fromEntries(this.predictors.map(l=>{let a=e[l]-this.predictor_means[l];return[l,a]}))}linear_prediction(e){let l=this.center_predictors?this.get_centered_data(e):e;return this.coefs.intercept+this.predictors.reduce((e,a)=>e+this.coefs.coefs[a]*l[a],0)}predict(e){return M(this.linear_prediction(e))}confidence_interval(e){var l;let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.95;if(!this.has_vcov())throw Error("You must provide vcov (the variance-covariance matrix) to calculate confidence intervals");let t=this.center_predictors?this.get_centered_data(e):e,r=(l=1-(1-a)/2,Math.sqrt(2)*O()(2*l-1)),s=(0,V.pIu)([1,...Object.values(t)]),i=S.multiply(S.multiply(s,this.vcov),S.transpose(s)),n=S.sqrt(i),o=this.linear_prediction(e);return[M(o-n*r),M(o+n*r)]}constructor(e,l){this.predictors=Object.keys(e.coefs),this.coefs=e,this.vcov=(null==l?void 0:l.vcov)?S.matrix(l.vcov):void 0,this.center_predictors=(null==l?void 0:l.center_predictors)||!1,this.predictor_means=(null==l?void 0:l.predictor_means)||void 0}}function M(e){return 1/(1+Math.exp(-1*e))}let C=new A(k.FO,{vcov:k.gy,predictor_means:k.qh,center_predictors:!0});function D(e){let l=(0,m.useRef)(null),a=e.scores,r=d.map(e=>({scale:n[e].label,score:a[e]?a[e]:0,max:n[e].max}));return(0,m.useEffect)(()=>{var e;let a=u.g({width:500,height:500,title:"Subdomain scores",y:{label:"Score",domain:[0,27]},x:{domain:d.map(e=>n[e].label),padding:.2},color:{type:"categorical",scheme:"Tableau10"},marks:[u.lU({label:null}),u.we(r,{y:"max",x:"scale",fill:"scale",opacity:.3,inset:-5,insetBottom:0}),u.we(r,{y:"score",fill:"scale",x:"scale",opacity:.8,stroke:"black"})]});return null==l||null===(e=l.current)||void 0===e||e.replaceChildren(a),()=>a.remove()},[r]),(0,t.jsx)("div",{ref:l,children:(0,t.jsx)(h,{width:500,height:500})})}var P=JSON.parse('{"B":{"attention":17,"fluency":9,"language":24,"memory":22,"visuospatial":16,"total":81}}');let T=[...d,"total"],Z={...n,total:{max:100,label:"Total"}},z=T.map(e=>[...Array(50).keys()].map(()=>{let l=(0,V.Iyf)(40,100),a=Math.random()+l/100<1;return{scale:Z[e].label,score:l,dementia:a,dementia_fill:a?"white":"black"}})).flat();function F(e){let l=(0,m.useRef)(null),{model:a}=e,{scores:r}=y(e.scores),{total:s}=x(e.scores),i=r?{...r,total:s}:void 0,o=r?1-a.predict(r):void 0,c=T.map(e=>({scale:Z[e].label,height:100})),f=T.map(e=>{let l=P.B[e]/Z[e].max*100;return{scale:Z[e].label,threshold:l}}),p=T.map(e=>{let l=i?i[e]/Z[e].max*100:void 0;return{scale:Z[e].label,value:l}});return(0,m.useEffect)(()=>{var e;let a=u.g({width:500,height:500,y:{label:"Score (% of maximum)",domain:[0,100]},facet:{data:c,x:"scale",label:null},fx:{domain:[...d.map(e=>n[e].label),"Total"]},color:{type:"categorical",scheme:"Tableau10",domain:[...d.map(e=>n[e].label),"Total"]},marks:[u.Me({ticks:[],labelAnchor:"center",labelArrow:"none"}),u.we(c,{y:"height",fill:"scale",fx:"scale",opacity:.5,stroke:"black",strokeOpacity:1}),u.AK(z,u.X$("middle",{fx:"scale",y:"score",fill:"dementia_fill"})),u.rP(f,{fx:"scale",y:"threshold",stroke:"red",strokeDasharray:"3,3,3",strokeWidth:2}),r?u.rP(p,{fx:"scale",y:"value",strokeWidth:2,marker:"circle",stroke:"#5850ec"}):null]});return null==l||null===(e=l.current)||void 0===e||e.replaceChildren(a),()=>a.remove()},[o,c,p,f,r]),(0,t.jsx)("div",{ref:l,children:(0,t.jsx)(h,{width:500,height:500})})}function L(e){return(0,t.jsxs)("div",{...e,children:[(0,t.jsx)("h2",{className:"text-indigo-600 font-bold text-lg",children:"Subdomain scores"}),(0,t.jsx)("p",{className:"text-gray-800",children:"This plot compares the current scores for each subdomain to those from a sample of patients with dementia and healthy controls"}),(0,t.jsx)("h3",{className:"text-lg text-indigo-800 font-bold mt-2",children:"Legend"}),(0,t.jsxs)(g.aV,{unstyled:!0,className:"my-1 space-y-3",children:[(0,t.jsxs)(g.aV.Item,{children:[(0,t.jsxs)("span",{className:"inline-flex items-center text-indigo-600 text-base p-1 border-2 me-2",children:["●",(0,t.jsx)("hr",{className:"w-4 h-1 bg-indigo-600"}),"●"]}),"Current score"]}),(0,t.jsxs)(g.aV.Item,{children:[(0,t.jsx)("span",{className:"text-red-600 font-bold p-1 border-2 me-2",children:"- - -"}),"80% of dementia patients in the sample scored at or below this level"]}),(0,t.jsxs)(g.aV.Item,{children:[(0,t.jsx)("span",{className:"text-xl text-gray-600 p-1 border-2 me-2",children:"○"})," ","Sample patient with dementia"]}),(0,t.jsxs)(g.aV.Item,{children:[(0,t.jsx)("span",{className:"text-xl text-black p-1 border-2 me-2",children:"●"})," ","Control patient (no dementia)"]})]})]})}function W(e){let{scores:l,model:a,...r}=e;return(0,t.jsx)(g.Zb,{...r,children:(0,t.jsxs)("div",{className:"flex flex-col lg:flex-row",children:[(0,t.jsx)("div",{className:"lg:basis-1/2",children:(0,t.jsx)(F,{scores:l,model:a})}),(0,t.jsx)(L,{id:"swarm-legend",className:"lg:basis-1/2 text-base max-w-prose"})]})})}var J=a(10368),B=a(20837);function Y(e){let{model:l}=e,{scores:a}=y(e.scores),r=a?d.map(e=>({label:n[e].label,risk_increased:a[e]<l.predictor_means[e]})):void 0,s=void 0!==r;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-indigo-600 ".concat(s?"":"invisible"),children:"Factors contributing to predicted risk"}),(0,t.jsxs)(g.aV,{unstyled:!0,children:[r&&r.map(e=>{let l=e.risk_increased?"text-red-500":"text-green-500",a=e.risk_increased?"below":"above",r=e.risk_increased?J.Z:B.Z;return(0,t.jsxs)(g.aV.Item,{className:l,children:[(0,t.jsx)(r,{className:"inline size-5"})," ",e.label," score is"," ",a," the sample mean"]},e.label)}),void 0===r&&d.map(e=>(0,t.jsx)(g.aV.Item,{className:"invisible",children:e},e))]}),(0,t.jsxs)("p",{className:s?"":"invisible",children:[(0,t.jsx)("span",{className:"font-bold text-indigo-600",children:"Key:"})," ",(0,t.jsx)(J.Z,{className:"text-red-500 inline size-5"}),": increased risk of dementia, ",(0,t.jsx)(B.Z,{className:"text-green-500 inline size-5"}),": decreased risk"]})]})}let H={root:{base:"flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",children:"flex h-full flex-col justify-center gap-4 p-2 md:p-6",horizontal:{off:"flex-col",on:"flex-col md:max-w-xl md:flex-row"},href:"hover:bg-gray-100 dark:hover:bg-gray-700"},img:{base:"",horizontal:{off:"rounded-t-lg",on:"h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"}}};function K(){let e=(0,r.cI)({mode:"all",defaultValues:c.getDefault(),resolver:(0,s.X)(c)}),{control:l,formState:a}=e,{errors:i}=a,n=(0,r.qo)({control:l});return(0,t.jsxs)("div",{id:"ace-form",className:"flex flex-col lg:flex-row lg:flex-wrap gap-2 md:gap-4 ",children:[(0,t.jsx)(v,{form:e}),(0,t.jsx)(g.Zb,{id:"risk-plots",className:"max-w-xl",children:(0,t.jsxs)("div",{className:"flex flex-col justify-start space-y-4",children:[(0,t.jsx)(p,{scores:n}),(0,t.jsx)(w,{scores:n,model:C}),(0,t.jsx)(Y,{scores:n,model:C})]})}),(0,t.jsx)(g.Zb,{id:"data-display-simple",className:"flex-col max-w-xl space-y-4 min-w-96",theme:H,children:(0,t.jsx)(D,{scores:n})}),(0,t.jsx)(W,{id:"swarm-plots",className:"max-w-full",scores:n,model:C})]})}}},function(e){e.O(0,[431,188,156,459,949,236,451,742,274,346,744],function(){return e(e.s=80162)}),_N_E=e.O()}]);