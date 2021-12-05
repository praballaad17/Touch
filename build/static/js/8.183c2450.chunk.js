(this["webpackJsonpclient-new"]=this["webpackJsonpclient-new"]||[]).push([[8],{118:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(122),o=n.n(c),a=n(7);function s(){return Object(a.jsx)(o.a,{type:"TailSpin",color:"#00000059",height:70,width:70,className:"flex justify-center mt-12"})}},121:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var c=n(9),o=n(124),a=n(0),s=["count","wrapper","className","containerClassName","containerTestId","circle","style"],r=a.createContext({});function l(e){var t,n,l=e.count,i=void 0===l?1:l,u=e.wrapper,d=e.className,b=e.containerClassName,j=e.containerTestId,m=e.circle,f=void 0!==m&&m,h=e.style,p=Object(o.a)(e,s),O=a.useContext(r),x=Object(c.a)(Object(c.a)(Object(c.a)({},O),p),{},{circle:f}),v=Object(c.a)(Object(c.a)({},h),function(e){var t=e.baseColor,n=e.highlightColor,c=e.width,o=e.height,a=e.borderRadius,s=e.circle,r=e.direction,l=e.duration,i=e.enableAnimation,u=void 0===i||i,d={};return"rtl"===r&&(d["--animation-direction"]="reverse"),"number"===typeof l&&(d["--animation-duration"]="".concat(l,"s")),u||(d["--pseudo-element-display"]="none"),"string"!==typeof c&&"number"!==typeof c||(d.width=c),"string"!==typeof o&&"number"!==typeof o||(d.height=o),"string"!==typeof a&&"number"!==typeof a||(d.borderRadius=a),s&&(d.borderRadius="50%"),"undefined"!==typeof t&&(d["--base-color"]=t),"undefined"!==typeof n&&(d["--highlight-color"]=n),d}(x)),g="react-loading-skeleton";d&&(g+=" ".concat(d));for(var _=null!==(t=x.inline)&&void 0!==t&&t,N=[],y=0;y<i;y++){var w=a.createElement("span",{className:g,style:v,key:y},"\u200c");_?N.push(w):N.push(a.createElement(a.Fragment,{key:y},w,a.createElement("br",null)))}return a.createElement("span",{className:b,"data-testid":j,"aria-live":"polite","aria-busy":null===(n=x.enableAnimation)||void 0===n||n},u?N.map((function(e,t){return a.createElement(u,{key:t},e)})):N)}},123:function(e,t,n){"use strict";n.d(t,"a",(function(){return N}));var c=n(1),o=n.n(c),a=n(5),s=n(6),r=n(0),l=n(115),i=n(114),u=n(54),d=n(8),b=n(56),j=n.n(b),m=n(14),f=n(61),h=n(60),p=n(59),O=n(55),x=n(7);function v(e){var t=e.open,n=e.content,c=e.onClose,s=Object(O.b)().user,r=Object(p.b)(),l=r.timeline,i=r.setTimeline,b=Object(m.h)().pathname;if(!t)return null;var v=function(){var e=Object(a.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(e.prev=0,t=0;t<n.fileNumber;t++)Object(h.a)("/file/".concat(null===n||void 0===n?void 0:n.author,"/").concat(n._id,"/").concat(null===n||void 0===n?void 0:n.fileNames[t]));return e.next=4,Object(f.a)(n._id);case 4:"/home"==b&&(i(l.filter((function(e){return e._id!=n._id}))),c()),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Error while deleting the Post, generally check your internet"),console.log(e.t0,n),"/"==b&&i((function(e){return[].concat(Object(d.a)(e),[n])}));case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return j.a.createPortal(Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:"modal-layout",onClick:c}),Object(x.jsx)("div",{className:"modal-box",children:Object(x.jsxs)("ul",{className:"modal-box__list",children:[Object(x.jsx)("li",{className:"modal-box__item",children:Object(x.jsx)(u.b,{className:"u-text-decor-none",target:"_blanck",to:"/user/".concat(null===n||void 0===n?void 0:n.author),children:"Share"})}),n.author==s.username&&Object(x.jsx)("li",{className:"modal-box__item u-text-red-bold",onClick:v,children:"Delete Post"}),n.author!=s.username&&Object(x.jsx)("li",{className:"modal-box__item u-text-red-bold",onClick:function(){localStorage.setItem("dontLikePost",JSON.stringify({postId:n._id,author:n.author})),c()},children:"I don't link this Post"}),Object(x.jsx)("li",{className:"modal-box__item",onClick:c,children:"Cancel"})]})})]}),document.getElementById("modal"))}function g(e){var t=e.user,n=e.content,c=(e.setProfile,e.photosCollection,Object(r.useState)(!1)),o=Object(s.a)(c,2),a=o[0],d=o[1];return Object(x.jsxs)("div",{className:"post__header",children:[Object(x.jsxs)(u.b,{to:"/user/".concat(null===t||void 0===t?void 0:t.username),className:"post__header-info",children:[Object(x.jsx)("div",{className:"u-bold post__header-name",children:null===t||void 0===t?void 0:t.fullName}),Object(x.jsxs)("p",{className:"post__header-username",children:["@",null===t||void 0===t?void 0:t.username]})]}),Object(x.jsx)("div",{className:"u-icon",onClick:function(){return d(!0)},children:Object(x.jsx)(i.a,{icon:l.g})}),a&&Object(x.jsx)(v,{content:n,open:a,onClose:function(){return d(!1)}})]})}function _(e){var t=e.fileNumber,n=(e.caption,e.postId),c=e.files,o=e.author,a=Object(r.useState)(0),l=Object(s.a)(a,2),i=(l[0],l[1],Object(r.useState)(!1)),d=Object(s.a)(i,2);d[0],d[1];return Object(x.jsx)("div",{className:"image-slider",children:Object(x.jsxs)("div",{className:"image-slider__box",children:[Object(x.jsx)("div",{className:"".concat(2==t||3==t||4==t?"image-slider__box-left-".concat(t):"image-slider__box-left"),children:c.map((function(e,c){return Object(x.jsx)(x.Fragment,{children:c<2?Object(x.jsx)(u.b,{to:"/".concat(o,"/").concat(n,"/").concat(c+1),className:"".concat(2==t||4==t||3==t?"image-slider__box-img-".concat(t):"image-slider__box-img"),children:Object(x.jsx)("img",{className:"image-slider__box-img-nor",src:e,alt:"files"})}):Object(x.jsx)(x.Fragment,{})})}))}),t>2?Object(x.jsx)("div",{className:"".concat(4==t?"image-slider__box-right-2":"image-slider__box-right-3"),children:c.map((function(e,c){return Object(x.jsx)(x.Fragment,{children:c>1?Object(x.jsx)(u.b,{to:"/".concat(o,"/").concat(n,"/").concat(c+1),children:Object(x.jsx)("img",{className:"".concat(4==t?"image-slider__box-img-".concat(t):"image-slider__box-img-r3"),src:e,alt:"files"})}):Object(x.jsx)(x.Fragment,{})})}))}):Object(x.jsx)(x.Fragment,{})]})})}function N(e){var t=e.content,n=e.postref,c=e.setProfile,l=e.photosCollection,i=(Object(r.useRef)(null),Object(r.useState)()),d=Object(s.a)(i,2),b=d[0],j=d[1],m=Object(r.useState)(),f=Object(s.a)(m,2),h=f[0],p=f[1],v=Object(O.b)(),N=v.getProfileImg,y=v.getUser,w=t.caption,k=t.author,C=t.fileNumber,I=t._id,P=t.files;return Object(r.useEffect)((function(){function e(){return(e=Object(a.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(k);case 2:t=e.sent,p(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[k]),Object(r.useEffect)((function(){function e(){return(e=Object(a.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N(k);case 2:t=e.sent,j(null===t||void 0===t?void 0:t.displayImg.profileImg);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t]),Object(x.jsxs)("div",{ref:n,className:"post",children:[Object(x.jsx)(u.b,{to:"/user/".concat(null===h||void 0===h?void 0:h.username),className:"post__side",children:Object(x.jsx)("img",{className:"post__pimg",src:b,alt:"profile"})}),Object(x.jsxs)("div",{className:"post__main",children:[Object(x.jsx)(g,{content:t,user:h,setProfile:c,photosCollection:l}),Object(x.jsx)("div",{className:"post__text",children:w}),Object(x.jsx)(_,{files:P,author:k,fileNumber:C,postId:I})]})]})}},153:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return k}));var c=n(1),o=n.n(c),a=n(5),s=n(6),r=n(14),l=n(0),i=n(121),u=n(116),d=n(9),b=n(56),j=n.n(b),m=n(55),f=n(60),h=n(51),p=n(7);function O(e){var t=e.open,n=e.onClose,c=e.displayImgs,s=Object(m.b)(),r=s.user,l=s.setActiveUser;if(!t)return null;var i=function(){var e=Object(a.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===c||void 0===c?void 0:c.profileImg.length){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,l(Object(d.a)(Object(d.a)({},r),{},{displayImg:{profileImg:""}})),n(),Object(f.a)("/file/".concat(null===r||void 0===r?void 0:r.username,"/displayImg/profileImg")),e.next=8,Object(h.c)(r.username);case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}(),u=function(){var e=Object(a.a)(o.a.mark((function e(t){var c,a,s,i,u,b;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.target.files.length){e.next=2;break}return e.abrupt("return");case 2:if(c=t.target.files[0],console.log(c.size/1024),!(c.size/1024>800)){e.next=27;break}return console.log("more"),e.next=8,Object(f.c)(c);case 8:return a=e.sent,l(Object(d.a)(Object(d.a)({},r),{},{displayImg:{profileImg:URL.createObjectURL(a)}})),n(),e.next=13,Object(f.d)(a,"/file/".concat(null===r||void 0===r?void 0:r.username,"/displayImg/profileImg"));case 13:return s=e.sent,console.log(s),e.prev=15,e.next=18,Object(h.d)(r.username,s);case 18:i=e.sent,console.log(i),e.next=25;break;case 22:e.prev=22,e.t0=e.catch(15),console.log(e.t0);case 25:e.next=44;break;case 27:return console.log(c.size/1024),l(Object(d.a)(Object(d.a)({},r),{},{displayImg:{profileImg:URL.createObjectURL(c)}})),n(),e.next=32,Object(f.d)(c,"/file/".concat(null===r||void 0===r?void 0:r.username,"/displayImg/profileImg"));case 32:return u=e.sent,console.log(u),e.prev=34,e.next=37,Object(h.d)(r.username,u);case 37:b=e.sent,console.log(b),e.next=44;break;case 41:e.prev=41,e.t1=e.catch(34),console.log(e.t1);case 44:case"end":return e.stop()}}),e,null,[[15,22],[34,41]])})));return function(t){return e.apply(this,arguments)}}();return j.a.createPortal(Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"modal-layout",onClick:n}),Object(p.jsxs)("div",{className:"modal-box",children:[Object(p.jsx)("div",{className:"modal-box__heading heading-black",children:"Change Profile Photo"}),Object(p.jsxs)("ul",{className:"modal-box__list",children:[Object(p.jsx)("label",{className:"newpost__media",children:Object(p.jsxs)("li",{className:"modal-box__item",children:["Upload Image",Object(p.jsx)("input",{type:"file",style:{opacity:0,position:"absolute",left:"-99999px"},onChange:u})]})}),Object(p.jsx)("li",{className:"modal-box__item u-text-red-bold",onClick:i,children:"Remove Image"}),Object(p.jsx)("li",{className:"modal-box__item",onClick:n,children:"Cancel"})]})]})]}),document.getElementById("modal"))}function x(e){var t=e.open,n=e.user,c=e.onClose,o=Object(l.useState)(),a=Object(s.a)(o,2);a[0],a[1];if(!t)return null;console.log(n);return j.a.createPortal(Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"modal-layout",onClick:c}),Object(p.jsxs)("div",{className:"modal-box",children:[Object(p.jsx)("div",{className:"modal-box__heading heading-black",children:"Followers"}),Object(p.jsxs)("ul",{className:"modal-box__list",children:[n.followers.map((function(e){})),Object(p.jsx)("li",{className:"modal-box__item",onClick:c,children:"Cencel"})]})]})]}),document.getElementById("modal"))}function v(e){var t=e.photosCount,n=e.followerCount,c=e.setfollowerCount,r=e.user,d=Object(m.b)(),b=d.user,j=d.toggleFollow,f=Object(l.useState)(null),h=Object(s.a)(f,2),v=h[0],g=h[1],_=Object(l.useState)(!1),N=Object(s.a)(_,2),y=N[0],w=N[1],k=Object(l.useState)(!1),C=Object(s.a)(k,2),I=C[0],P=C[1],E=Object(l.useState)(!1),F=Object(s.a)(E,2),S=(F[0],F[1]),R=r._id,U=r.fullName,T=r.followers,L=r.following,z=r.username,A=r.displayImg,B=(null===b||void 0===b?void 0:b.username)&&(null===b||void 0===b?void 0:b.username)!==z,J=function(){var e=Object(a.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g((function(e){return!e})),c(v?n-1:n+1),j(v,R,b._id);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(l.useEffect)((function(){(null===b||void 0===b?void 0:b.username)&&R&&function(){var e=T.filter((function(e){return e._id==b._id}));g(!!e.length)}()}),[null===b||void 0===b?void 0:b.username,R]);return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"profile__header",children:[Object(p.jsx)("div",{className:"profile__header-imgbox",children:z?Object(p.jsx)("img",{onClick:function(){(null===b||void 0===b?void 0:b.username)===(null===r||void 0===r?void 0:r.username)&&w(!0)},className:"profile__header-img",alt:"".concat(U," profile picture"),src:A&&(null===A||void 0===A?void 0:A.profileImg.length)?A.profileImg:u.a}):Object(p.jsx)(i.a,{circle:!0,height:150,width:150,count:1})}),Object(p.jsx)(O,{displayImgs:A,open:y,onClose:function(){return w(!1)}}),Object(p.jsxs)("div",{className:"profile__header-info",children:[Object(p.jsxs)("div",{className:"profile__header-info-head",children:[Object(p.jsxs)("p",{className:"u-bold",children:["@",z]}),B&&null===v?Object(p.jsx)(i.a,{count:1,width:60,height:32}):B&&Object(p.jsx)("button",{className:"btn-follow ".concat(v?"btn-follow-f":"btn-follow-u"),type:"button",onClick:J,onKeyDown:function(e){"Enter"===e.key&&J()},children:v?"Unfollow":"Follow"})]}),Object(p.jsx)("div",{className:"profile__header-info-follow",children:T&&L?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("p",{className:"profile__header-info-follow-count",children:[Object(p.jsx)("span",{className:"u-bold",children:t})," photos"]}),Object(p.jsxs)("p",{className:"profile__header-info-follow-count",onClick:function(){return P(!0)},children:[Object(p.jsx)("span",{className:"u-bold",children:n})," ",1===n?"follower":"followers"]}),Object(p.jsx)(x,{open:I,loggedInUser:b,onClose:function(){return P(!1)}}),Object(p.jsxs)("p",{className:"profile__header-info-follow-count",onClick:function(){return S(!0)},children:[Object(p.jsx)("span",{className:"u-bold",children:null===L||void 0===L?void 0:L.length})," following"]})]}):Object(p.jsx)(i.a,{count:1,width:500,height:24})}),Object(p.jsx)("div",{className:"container mt-4",children:Object(p.jsx)("p",{className:"font-medium",children:U||Object(p.jsx)(i.a,{count:1,height:24})})})]})]})})}var g=n(123),_=n(42),N=n(118),y=n(62);function w(e){var t=e.user,n=Object(l.useState)(),c=Object(s.a)(n,2),o=c[0],a=c[1],r=Object(y.b)(),i=r.profilePost,u=r.loading,d=r.setPageNumber,b=r.hasMore,j=Object(m.b)().user,f=Object(l.useRef)(),h=Object(l.useCallback)((function(e){u||(f.current&&f.current.disconnect(),f.current=new IntersectionObserver((function(e){e[0].isIntersecting&&b&&d((function(e){return e+1}))})),e&&f.current.observe(e))}),[u,b]);return Object(l.useEffect)((function(){a(null===t||void 0===t?void 0:t.followers.length)}),[t]),Object(p.jsxs)(p.Fragment,{children:[t&&Object(p.jsx)(v,{photosCount:i?i.length:0,user:t,setfollowerCount:a,followerCount:o}),!i.length&&u?Object(p.jsx)(N.a,{}):Object(p.jsxs)(p.Fragment,{children:[i.length?i.map((function(e,n){return i.length===n+1?Object(p.jsx)(g.a,{postref:h,content:e,userProfileImg:null===t||void 0===t?void 0:t.displayImg.profileImg},null===e||void 0===e?void 0:e._id):Object(p.jsx)(g.a,{content:e,userProfileImg:null===t||void 0===t?void 0:t.displayImg.profileImg},null===e||void 0===e?void 0:e._id)})):(null===j||void 0===j?void 0:j.username)==(null===t||void 0===t?void 0:t.username)?Object(p.jsxs)("div",{className:"nopost",children:[Object(p.jsx)("div",{className:"nopost-no heading-main",children:"No Post"}),Object(p.jsxs)("div",{className:"nopost-to",children:[Object(p.jsx)("a",{href:_.e,children:"Click Here"})," To Post"]})]}):Object(p.jsx)("div",{className:"nopost",children:Object(p.jsx)("div",{className:"nopost-no heading-main",children:"No Post"})}),Object(p.jsx)("div",{children:u&&Object(p.jsx)(N.a,{})})]})]})}function k(){var e=Object(r.i)().username,t=Object(l.useState)(),n=Object(s.a)(t,2),c=n[0],i=n[1];Object(l.useEffect)((function(){document.title="".concat(e," | Touch")}),[e]);var u=Object(m.b)(),d=u.getUser,b=u.user,j=u.loading,f=Object(y.b)(),h=f.getProfilePost,O=f.loading,x=f.pageNumber,v=f.setPageNumber;return Object(l.useEffect)((function(){function t(){return(t=Object(a.a)(o.a.mark((function t(){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((null===b||void 0===b?void 0:b.username)===e){t.next=11;break}return t.prev=1,t.next=4,d(e);case 4:n=t.sent,i(n),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e]),Object(l.useEffect)(Object(a.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("getting posts"),t.next=4,h(e,x);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])}))),[e,x]),Object(p.jsx)(p.Fragment,{children:j&&O?Object(p.jsx)(N.a,{}):Object(p.jsx)("div",{className:"profile",children:(null===b||void 0===b?void 0:b.username)==e?Object(p.jsx)(w,{user:b,setPageNumber:v}):Object(p.jsx)(w,{user:c,setPageNumber:v})})})}}}]);
//# sourceMappingURL=8.183c2450.chunk.js.map