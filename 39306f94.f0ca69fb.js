(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{70:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return i})),t.d(r,"metadata",(function(){return s})),t.d(r,"rightToc",(function(){return c})),t.d(r,"default",(function(){return d}));var n=t(2),o=t(6),a=(t(0),t(99)),i={id:"derived",title:"derived",sidebar_label:"derived"},s={unversionedId:"guides/derived",id:"guides/derived",isDocsHomePage:!1,title:"derived",description:"Derived values are observable and provide a mapping of one observable to another observable, with a transform applied to the child observable's value. They are useful to transform/select from existing observables.",source:"@site/docs/guides/derived.md",slug:"/guides/derived",permalink:"/elementos-docs/docs/guides/derived",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/guides/derived.md",version:"current",sidebar_label:"derived",sidebar:"main",previous:{title:"molecule",permalink:"/elementos-docs/docs/guides/molecule"},next:{title:"observe",permalink:"/elementos-docs/docs/guides/observe"}},c=[{value:"Mapping",id:"mapping",children:[]},{value:"Narrowing",id:"narrowing",children:[]}],l={rightToc:c};function d(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,t,{components:r,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Derived values are observable and provide a mapping of one observable to another observable, with a transform applied to the child observable's value. They are useful to transform/select from existing observables."),Object(a.b)("h3",{id:"mapping"},"Mapping"),Object(a.b)("p",null,"Derived takes two required params, an observable and a transform."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { atom, derived } from 'elementos'\n\nconst counts$ = atom(10)\nconst doubled$ = derived(count$, (x) => x * 2)\n\ncounts$.actions.set(11)\n\nconsole.log(doubled$.get())\n\n// Output:\n// 22\n")),Object(a.b)("h3",{id:"narrowing"},"Narrowing"),Object(a.b)("p",null,"At times we may wish to select only a subset of the child observable's value."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { atom, derived } from 'elementos'\n\nconst array$ = atom([10, 11])\nconst first$ = derived(array$, (array) => array[0])\n\nconsole.log(first$.get())\n\n// Output:\n// 10\n")))}d.isMDXComponent=!0},99:function(e,r,t){"use strict";t.d(r,"a",(function(){return u})),t.d(r,"b",(function(){return m}));var n=t(0),o=t.n(n);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=o.a.createContext({}),d=function(e){var r=o.a.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},u=function(e){var r=d(e.components);return o.a.createElement(l.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},b=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=d(t),b=n,m=u["".concat(i,".").concat(b)]||u[b]||p[b]||a;return t?o.a.createElement(m,s(s({ref:r},l),{},{components:t})):o.a.createElement(m,s({ref:r},l))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=b;var s={};for(var c in r)hasOwnProperty.call(r,c)&&(s[c]=r[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);