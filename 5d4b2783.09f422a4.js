(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{73:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var o=n(2),a=n(6),r=(n(0),n(99)),s={id:"atom",title:"atom",sidebar_label:"atom"},c={unversionedId:"guides/atom",id:"guides/atom",isDocsHomePage:!1,title:"atom",description:"Atoms are observable state containers at the core of elementos. Atom is a vague/overloaded term in programming, but don't let them scare you, they're basically just little data stores that will notify you when their state has changed.",source:"@site/docs/guides/atom.md",slug:"/guides/atom",permalink:"/elementos-docs/docs/guides/atom",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/guides/atom.md",version:"current",sidebar_label:"atom",sidebar:"main",previous:{title:"Quickstart",permalink:"/elementos-docs/docs/"},next:{title:"molecule",permalink:"/elementos-docs/docs/guides/molecule"}},i=[{value:"Basic",id:"basic",children:[]},{value:"Custom Actions",id:"custom-actions",children:[]},{value:"Observation",id:"observation",children:[]},{value:"onObserverChange",id:"onobserverchange",children:[]}],l={rightToc:i};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Atoms are observable state containers at the core of elementos. Atom is a vague/overloaded term in programming, but don't let them scare you, they're basically just little data stores that will notify you when their state has changed."),Object(r.b)("p",null,"All state in elementos originates in atoms and then propagates outward via derived values, notifying observers along the way."),Object(r.b)("h3",{id:"basic"},"Basic"),Object(r.b)("p",null,"In their simplest form, we may instantiate an atom with only a default value. This will give us one default action, ",Object(r.b)("inlineCode",{parentName:"p"},"set")," that we may use to update the atom's state. "),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"import { atom } from 'elementos'\n\nconst count$ = atom(10)\n\ncount$.actions.set(11)\ncount$.actions.set(prevCount => prevCount + 1)\nconsole.log(count$.get())\n\n// Output:\n// 12\n")),Object(r.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(r.b)("div",Object(o.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(o.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(o.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(r.b)("path",Object(o.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"State updates should be immutable")),Object(r.b)("div",Object(o.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("p",{parentName:"div"},"When setting an atom's state, we should do so immutably because internally elementos uses referential equality to memoize values. If we mutate state, elementos will not understand that the state has changed and observer effects will fail to run."))),Object(r.b)("h3",{id:"custom-actions"},"Custom Actions"),Object(r.b)("p",null,"Alternatively, we may define custom actions for our atom that restrict the way in which we modify its underlying state."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"import { atom } from 'elementos'\n\nconst count$ = atom(10, {\n  actions: (set) => ({\n    increment: () => set(prevCount => prevCount + 1)\n  })\n})\n\ncount$.actions.increment()\nconsole.log(count$.get())\n\n// Output:\n// 11\n")),Object(r.b)("h3",{id:"observation"},"Observation"),Object(r.b)("p",null,"Atoms would be pretty useless without a way to observe them and run effects againt their state changes. ",Object(r.b)("inlineCode",{parentName:"p"},"observe")," let's us run effects when the atom's previous state and new state are not referentially equal (compared via ",Object(r.b)("inlineCode",{parentName:"p"},"Object.is"),")."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"import { atom, observe } from 'elementos'\n\nconst count$ = atom(10, {\n  actions: (set) => ({\n    increment: () => set(prevCount => prevCount + 1)\n  })\n})\n\nobserve(count$, (count) => {\n  console.log(count)\n})\n\ncount$.actions.increment()\ncount$.actions.increment()\n\n// Output:\n// 10\n// 11\n// 12\n")),Object(r.b)("h3",{id:"onobserverchange"},"onObserverChange"),Object(r.b)("p",null,"Atoms allow us to hook into information about their observers as well. Whenever an observer subscribes/unsubscribes from an atom, we will become notified via onObserverChange callbacks."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js"}),"import { atom, observe } from 'elementos'\n\nconst count$ = atom(10)\n\ncount$.onObserverChange(({ count }) => {\n  console.log(count)\n})\n\nconst dispose1 = observe(count$, (count) => {})\nconst dispose2 = observe(count$, (count) => {})\n\ndispose1()\ndispose2()\n\n// Output:\n// 1\n// 2\n// 1\n// 0\n")))}u.isMDXComponent=!0},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return d}));var o=n(0),a=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},m=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=u(n),p=o,d=m["".concat(s,".").concat(p)]||m[p]||b[p]||r;return n?a.a.createElement(d,c(c({ref:t},l),{},{components:n})):a.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,s=new Array(r);s[0]=p;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,s[1]=c;for(var l=2;l<r;l++)s[l]=n[l];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);