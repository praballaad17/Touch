(this["webpackJsonpclient-new"]=this["webpackJsonpclient-new"]||[]).push([[6],{116:function(e,s,a){"use strict";a.d(s,"a",(function(){return l})),a.d(s,"b",(function(){return n}));var l="/images/avatars/default.png",n="/loading.svg"},117:function(e,s,a){"use strict";a.d(s,"a",(function(){return m})),a.d(s,"c",(function(){return x})),a.d(s,"b",(function(){return u}));var l,n=a(1),t=a.n(n),c=a(9),i=a(5),r=a(13),o=a.n(r),j=a(31),d=(a(48),j.a+"/auth"),b="token";l=localStorage.getItem(b),o.a.defaults.headers.common.token=l;var m=function(){var e=Object(i.a)(t.a.mark((function e(s,a,l){var n,i;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=s&&a?{data:{usernameOrEmail:s,password:a}}:{headers:{authorization:l}},e.next=4,o()("".concat(d,"/login"),Object(c.a)({method:"POST"},n));case 4:return i=e.sent,localStorage.setItem(b,i.data.token),e.abrupt("return",i.data);case 9:throw e.prev=9,e.t0=e.catch(0),new Error(e.t0.response.data.error);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(s,a,l){return e.apply(this,arguments)}}(),x=function(){var e=Object(i.a)(t.a.mark((function e(s,a,l,n){var c;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.post("".concat(d,"/register"),{email:l,fullName:a,username:s,password:n});case 3:return c=e.sent,console.log(c.data.token),localStorage.setItem(b,c.data.token),e.abrupt("return",c.data);case 9:throw e.prev=9,e.t0=e.catch(0),new Error(e.t0.response.data.error);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(s,a,l,n){return e.apply(this,arguments)}}();function u(){return h.apply(this,arguments)}function h(){return(h=Object(i.a)(t.a.mark((function e(){return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.removeItem(b);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},119:function(e,s,a){"use strict";a.d(s,"a",(function(){return x}));var l=a(6),n=a(0),t=a(42),c=a(54),i=a(115),r=a(114),o=a(120),j=a(116),d=a(58),b=a(57),m=a(7);function x(e){var s,a,x=e.loggedInUser,u=e.user,h=e.onClose,O=Object(n.useState)(!1),g=Object(l.a)(O,2),N=g[0],k=g[1],p=Object(d.b)().unreadCount,v=Object(b.b)().unseen;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("div",{className:"leftbar__toglebar",children:Object(m.jsx)(o.a,{show:N,loggedInUser:x,onClose:function(){return k(!1)}})}),Object(m.jsx)("div",{className:"leftbar",children:Object(m.jsxs)("ul",{className:"link-list",children:[Object(m.jsx)("li",{className:"link-list-item",onClick:h,children:Object(m.jsxs)(c.b,{className:"link u-flex-center",to:"/user/".concat(null===u||void 0===u?void 0:u.username),"aria-label":"Profile",children:[Object(m.jsx)("img",{className:"link-list--proImg",src:(null===x||void 0===x||null===(s=x.displayImg)||void 0===s?void 0:s.profileImg.length)?null===x||void 0===x||null===(a=x.displayImg)||void 0===a?void 0:a.profileImg:j.a,alt:null===u||void 0===u?void 0:u.username}),Object(m.jsx)("span",{className:"link--text",children:null===u||void 0===u?void 0:u.username})]})}),Object(m.jsx)("li",{className:"link-list-item",children:Object(m.jsxs)(c.b,{className:"link",to:t.j,"aria-label":"Dashboard",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.i})}),Object(m.jsx)("span",{className:"link--text",children:"Home"})]})}),u&&Object(m.jsxs)(m.Fragment,{children:[" ",Object(m.jsx)("li",{className:"link-list-item",children:Object(m.jsxs)(c.b,{className:"link",to:t.f,"aria-label":"Dashboard",children:[Object(m.jsxs)("span",{className:"link--icon",children:[Object(m.jsx)(r.a,{icon:i.c}),Object(m.jsx)("div",{className:"link--icon-top",children:p||""})]}),Object(m.jsx)("span",{className:"link--text",children:"Notifications"})]})}),Object(m.jsx)("li",{className:"link-list-item",children:Object(m.jsxs)(c.b,{className:"link",to:t.d,"aria-label":"Messages",children:[Object(m.jsxs)("span",{className:"link--icon",children:[Object(m.jsx)(r.a,{icon:i.n}),Object(m.jsx)("div",{className:"link--icon-top",children:v||""})]}),Object(m.jsx)("span",{className:"link--text",children:"Messages"})]})}),Object(m.jsx)("li",{className:"link-list-item",children:Object(m.jsxs)(c.b,{className:"link",to:t.j,"aria-label":"Dashboard",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.d})}),Object(m.jsx)("span",{className:"link--text",children:"Bookmarks"})]})}),Object(m.jsx)("li",{className:"link-list-item",children:Object(m.jsxs)(c.b,{className:"link",to:t.j,"aria-label":"Dashboard",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.m})}),Object(m.jsx)("span",{className:"link--text",children:"List"})]})}),Object(m.jsx)("li",{className:"link-list-item",children:Object(m.jsxs)(c.b,{className:"link",to:"/user/".concat(null===u||void 0===u?void 0:u.username),"aria-label":"Dashboard",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.v})}),Object(m.jsx)("span",{className:"link--text",children:"My Profile"})]})})]}),Object(m.jsx)("li",{className:"link-list-item",onClick:function(){return k(!0)},children:Object(m.jsxs)(c.b,{className:"link",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.b})}),Object(m.jsx)("span",{className:"link--text",children:"More"})]})}),u?Object(m.jsx)("li",{className:"link-list-item link-list-item--newpost",children:Object(m.jsxs)(c.b,{className:"link",to:t.e,"aria-label":"Newpost",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.p})}),Object(m.jsx)("span",{className:"link--text",children:"New Post"})]})}):Object(m.jsx)("li",{className:"link-list-item link-list-item--newpost",children:Object(m.jsxs)(c.b,{className:"link",to:t.c,"aria-label":"Newpost",children:[Object(m.jsx)("span",{className:"link--icon",children:Object(m.jsx)(r.a,{icon:i.s})}),Object(m.jsx)("span",{className:"link--text",children:"Log In"})]})})]})})]})}},120:function(e,s,a){"use strict";a.d(s,"a",(function(){return b}));a(0);var l=a(42),n=a(54),t=a(115),c=a(114),i=a(117),r=a(56),o=a.n(r),j=a(116),d=a(7);function b(e){var s,a,r=e.show,b=e.onClose,m=e.loggedInUser;return r?o.a.createPortal(Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"togglebar-overlay",onClick:b}),Object(d.jsxs)("div",{className:"toggle-sidebar",children:[Object(d.jsx)("div",{className:"toggle-sidebar__close",onClick:b,children:Object(d.jsx)(c.a,{icon:t.t})}),Object(d.jsxs)("ul",{children:[m?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link u-display-phone",to:"/user/".concat(null===m||void 0===m?void 0:m.username),"aria-label":"Profile",children:[Object(d.jsx)("img",{className:"link-list--proImg",src:null===m||void 0===m?void 0:m.displayImg.profileImg,onError:function(e){e.target.src=j.a},alt:null===m||void 0===m?void 0:m.username}),Object(d.jsx)("div",{className:"toggle-sidebar__name",children:null===m||void 0===m?void 0:m.fullName}),Object(d.jsxs)("div",{className:"toggle-sidebar__username",children:["@",null===m||void 0===m?void 0:m.username]}),Object(d.jsxs)("div",{className:"toggle-sidebar__counts",children:[Object(d.jsxs)("div",{children:[null===m||void 0===m||null===(s=m.followers)||void 0===s?void 0:s.length," followers"]}),Object(d.jsxs)("div",{children:[null===m||void 0===m||null===(a=m.following)||void 0===a?void 0:a.length," following"]})]})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link",to:"/user/".concat(null===m||void 0===m?void 0:m.username),"aria-label":"Dashboard",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.v})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"Profile"})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link",to:l.a,"aria-label":"Dashboard",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.d})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"Bookmarks"})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link",to:l.a,"aria-label":"Dashboard",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.m})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"List"})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link",to:l.a,"aria-label":"Dashboard",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.e})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"Settings"})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link",to:l.a,"aria-label":"Dashboard",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.j})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"Your Cards"})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",children:Object(d.jsxs)(n.b,{className:"toggle-sidebar__link",to:l.a,"aria-label":"Dashboard",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.u})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"Add Bank"})]})}),Object(d.jsx)("li",{className:"toggle-sidebar__item",onClick:function(){Object(i.b)(),window.location=l.c},onKeyDown:function(e){"Enter"===e.key&&(Object(i.b)(),window.location=l.c)},children:Object(d.jsxs)("div",{className:"toggle-sidebar__link",children:[Object(d.jsx)("span",{className:"toggle-sidebar__link--icon",children:Object(d.jsx)(c.a,{icon:t.s})}),Object(d.jsx)("span",{className:"toggle-sidebar__link--text",children:"Log Out"})]})})]}):Object(d.jsx)("li",{className:"link-list-item link-list-item--newpost",children:Object(d.jsxs)(n.b,{className:"link",to:l.c,"aria-label":"Newpost",children:[Object(d.jsx)("span",{className:"link--icon",children:Object(d.jsx)(c.a,{icon:t.s})}),Object(d.jsx)("span",{className:"link--text",children:"Log In"})]})}),"                    "]})]})]}),document.getElementById("togglebar")):null}},127:function(e,s,a){"use strict";a.r(s),a.d(s,"default",(function(){return t}));var l=a(0),n=(a(119),a(7));function t(){return Object(l.useEffect)((function(){document.title="Not Found | Touch"}),[]),Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("div",{className:"mx-auto max-w-screen-lg",children:Object(n.jsx)("p",{className:"text-center text-2xl",children:"Not Found!"})})})}}}]);
//# sourceMappingURL=6.0c790bb7.chunk.js.map