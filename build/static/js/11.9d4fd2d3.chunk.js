(this["webpackJsonpclient-new"]=this["webpackJsonpclient-new"]||[]).push([[11],{117:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return m})),a.d(t,"b",(function(){return f}));var n,r=a(1),c=a.n(r),o=a(9),s=a(5),u=a(13),l=a.n(u),i=a(31),p=(a(48),i.a+"/auth"),b="token";n=localStorage.getItem(b),l.a.defaults.headers.common.token=n;var d=function(){var e=Object(s.a)(c.a.mark((function e(t,a,n){var r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t&&a?{data:{usernameOrEmail:t,password:a}}:{headers:{authorization:n}},e.next=4,l()("".concat(p,"/login"),Object(o.a)({method:"POST"},r));case 4:return s=e.sent,localStorage.setItem(b,s.data.token),e.abrupt("return",s.data);case 9:throw e.prev=9,e.t0=e.catch(0),new Error(e.t0.response.data.error);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,a,n){return e.apply(this,arguments)}}(),m=function(){var e=Object(s.a)(c.a.mark((function e(t,a,n,r){var o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.a.post("".concat(p,"/register"),{email:n,fullName:a,username:t,password:r});case 3:return o=e.sent,console.log(o.data.token),localStorage.setItem(b,o.data.token),e.abrupt("return",o.data);case 9:throw e.prev=9,e.t0=e.catch(0),new Error(e.t0.response.data.error);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,a,n,r){return e.apply(this,arguments)}}();function f(){return j.apply(this,arguments)}function j(){return(j=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.removeItem(b);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},158:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return d}));var n=a(1),r=a.n(n),c=a(5),o=a(6),s=a(0),u=a(14),l=a(54),i=a(42),p=a(117),b=a(7);function d(e){var t=e.user,a=Object(s.useState)(""),n=Object(o.a)(a,2),d=n[0],m=n[1],f=Object(s.useState)(""),j=Object(o.a)(f,2),h=j[0],v=j[1],O=Object(s.useState)(""),g=Object(o.a)(O,2),x=g[0],w=g[1],_=Object(s.useState)(""),y=Object(o.a)(_,2),N=y[0],S=y[1],k=Object(s.useState)(""),E=Object(o.a)(k,2),C=E[0],I=E[1],T=""===N||""===x,P=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,Object(p.c)(d,h,x,N);case 4:window.location="/",e.next=14;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0.response),v(""),w(""),S(""),I(e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){document.title="Sign Up - Touch"}),[]),t?Object(b.jsx)(u.a,{to:i.a}):Object(b.jsx)("div",{className:"login",children:Object(b.jsxs)("div",{className:"login__box",children:[Object(b.jsxs)("div",{className:"login__box--sub",children:[Object(b.jsx)("h1",{className:"login__box--head",children:"Touch"}),C&&Object(b.jsx)("p",{className:"login__box--error",children:C}),Object(b.jsxs)("form",{className:"login__form",onSubmit:P,method:"POST",children:[Object(b.jsx)("input",{"aria-label":"Enter your username",type:"text",placeholder:"Username",className:"login__form--input",onChange:function(e){var t=e.target;return m(t.value)},value:d}),Object(b.jsx)("input",{"aria-label":"Enter your full name",type:"text",placeholder:"Full name",className:"login__form--input",onChange:function(e){var t=e.target;return v(t.value)},value:h}),Object(b.jsx)("input",{"aria-label":"Enter your email address",type:"text",placeholder:"Email address",className:"login__form--input",onChange:function(e){var t=e.target;return w(t.value)},value:x}),Object(b.jsx)("input",{"aria-label":"Enter your password",type:"password",placeholder:"Password",className:"login__form--input",onChange:function(e){var t=e.target;return S(t.value)},value:N}),Object(b.jsx)("button",{disabled:T,type:"submit",className:"btn btn-login\n            ".concat(T&&"u-opacity-50"),children:"Sign Up"})]})]}),Object(b.jsx)("div",{className:"login__box--foot",children:Object(b.jsxs)("p",{className:"login__box--foot--content",children:["Have an account?"," ",Object(b.jsx)(l.b,{to:i.c,className:"u-text-blue",children:"Login"})]})})]})})}}}]);
//# sourceMappingURL=11.9d4fd2d3.chunk.js.map