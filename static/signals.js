window.signals = {};

(function (g, f) {
  var hasExports = typeof exports === 'object';
  if (typeof define === "function" && define.amd) {
    define([], f);
  } else if (typeof module === "object" && module.exports) {
    module.exports = f();
  } else {
    var m = hasExports ? f() : f();
    var root = hasExports ? exports : g;
    for(var i in m) root[i] = m[i];
  }}(window.signals, () => {
var exports = {};
var module = { exports };
"use strict";var b=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var et=Object.getOwnPropertyNames;var ut=Object.prototype.hasOwnProperty;var lt=(t,i)=>{for(var r in i)b(t,r,{get:i[r],enumerable:!0})},$t=(t,i,r,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let n of et(i))!ut.call(t,n)&&n!==r&&b(t,n,{get:()=>i[n],enumerable:!(s=nt(i,n))||s.enumerable});return t};var ft=t=>$t(b({},"__esModule",{value:!0}),t);var at={};lt(at,{SCOPE:()=>e,computed:()=>tt,createComputation:()=>x,createScope:()=>D,effect:()=>it,getContext:()=>G,getScope:()=>z,isFunction:()=>o,isNotEqual:()=>I,isReadSignal:()=>q,isWriteSignal:()=>st,onDispose:()=>C,onError:()=>U,peek:()=>L,readonly:()=>rt,root:()=>K,scoped:()=>B,setContext:()=>Q,signal:()=>d,tick:()=>Y,untrack:()=>M});module.exports=ft(at);var e=Symbol(0);var v=!1,A=!1,u=null,a=null,$=null,l=0,h=[],k={},ct=()=>{},p=0,H=1,S=2,m=3;function ot(){v=!0,queueMicrotask(J)}function J(){if(!h.length){v=!1;return}A=!0;for(let t=0;t<h.length;t++)h[t].$st!==p&&ht(h[t]);h=[],v=!1,A=!1}function ht(t){let i=[t];for(;t=t[e];)t.$e&&t.$st!==p&&i.push(t);for(let r=i.length-1;r>=0;r--)R(i[r])}function K(t){let i=D();return y(i,t.length?t.bind(null,g.bind(i)):t,null)}function L(t){return y(u,t,null)}function M(t){return y(null,t,null)}function Y(){A||J()}function z(){return u}function B(t,i){try{return y(i,t,null)}catch(r){T(i,r);return}}function G(t,i=u){return i?.$cx[t]}function Q(t,i,r=u){r&&(r.$cx={...r.$cx,[t]:i})}function U(t){u&&(u.$eh=u.$eh?[t,...u.$eh]:[t])}function C(t){if(!t||!u)return t||ct;let i=u;return i.$d?Array.isArray(i.$d)?i.$d.push(t):i.$d=[i.$d,t]:i.$d=t,function(){i.$st!==m&&(t.call(null),o(i.$d)?i.$d=null:Array.isArray(i.$d)&&i.$d.splice(i.$d.indexOf(t),1))}}function g(t=!0){if(this.$st===m)return;let i=t?this.$ps||this[e]:this,r=this.$ns,s=null;for(;r&&r[e]===this;)g.call(r,!0),F(r),s=r.$ns,r.$ns=null,r=s;t&&F(this),r&&(r.$ps=t?this.$ps:this),i&&(i.$ns=r)}function F(t){t.$st=m,t.$d&&X(t),t.$s&&E(t,0),t.$ps&&(t.$ps.$ns=null),t[e]=null,t.$s=null,t.$o=null,t.$ps=null,t.$cx=k,t.$eh=null}function X(t){try{if(Array.isArray(t.$d))for(let i=t.$d.length-1;i>=0;i--){let r=t.$d[i];r.call(r)}else t.$d.call(t.$d);t.$d=null}catch(i){T(t,i)}}function y(t,i,r){let s=u,n=a;u=t,a=r;try{return i.call(t)}finally{u=s,a=n}}function T(t,i){if(!t||!t.$eh)throw i;let r=0,s=t.$eh.length,n=W(i);for(r=0;r<s;r++)try{t.$eh[r](n);break}catch(f){n=W(f)}if(r===s)throw n}function W(t){return t instanceof Error?t:Error(JSON.stringify(t))}function O(){return this.$st===m?this.$v:(a&&!this.$e&&(!$&&a.$s&&a.$s[l]==this?l++:$?$.push(this):$=[this]),this.$c&&R(this),this.$v)}function P(t){let i=o(t)?t(this.$v):t;if(this.$ch(this.$v,i)&&(this.$v=i,this.$o))for(let r=0;r<this.$o.length;r++)V(this.$o[r],S);return this.$v}var w=function(){this[e]=null,this.$ns=null,this.$ps=null,u&&u.append(this)},c=w.prototype;c.$cx=k;c.$eh=null;c.$c=null;c.$d=null;c.append=function(t){if(t[e]=this,t.$ps=this,this.$ns)if(t.$ns){let i=t.$ns;for(;i.$ns;)i=i.$ns;i.$ns=this.$ns,this.$ns.$ps=i}else t.$ns=this.$ns,this.$ns.$ps=t;this.$ns=t,t.$cx=t.$cx===k?this.$cx:{...this.$cx,...t.$cx},this.$eh&&(t.$eh=t.$eh?[...t.$eh,...this.$eh]:this.$eh)};c.dispose=function(){g.call(this)};function D(){return new w}var Z=function(i,r,s){w.call(this),this.$st=r?S:p,this.$i=!1,this.$e=!1,this.$s=null,this.$o=null,this.$v=i,r&&(this.$c=r),s&&s.dirty&&(this.$ch=s.dirty)},N=Z.prototype;Object.setPrototypeOf(N,c);N.$ch=I;N.call=O;function x(t,i,r){return new Z(t,i,r)}function I(t,i){return t!==i}function o(t){return typeof t=="function"}function R(t){if(t.$st===H)for(let i=0;i<t.$s.length&&(R(t.$s[i]),t.$st!==S);i++);t.$st===S?_(t):t.$st=p}function j(t){t.$ns&&t.$ns[e]===t&&g.call(t,!1),t.$d&&X(t),t.$eh=t[e]?t[e].$eh:null}function _(t){let i=$,r=l;$=null,l=0;try{j(t);let s=y(t,t.$c,t);if($){if(t.$s&&E(t,l),t.$s&&l>0){t.$s.length=l+$.length;for(let f=0;f<$.length;f++)t.$s[l+f]=$[f]}else t.$s=$;let n;for(let f=l;f<t.$s.length;f++)n=t.$s[f],n.$o?n.$o.push(t):n.$o=[t]}else t.$s&&l<t.$s.length&&(E(t,l),t.$s.length=l);!t.$e&&t.$i?P.call(t,s):(t.$v=s,t.$i=!0)}catch(s){T(t,s),t.$st===S&&(j(t),t.$s&&E(t,0));return}$=i,l=r,t.$st=p}function V(t,i){if(!(t.$st>=i)&&(t.$e&&t.$st===p&&(h.push(t),v||ot()),t.$st=i,t.$o))for(let r=0;r<t.$o.length;r++)V(t.$o[r],H)}function E(t,i){let r,s;for(let n=i;n<t.$s.length;n++)r=t.$s[n],r.$o&&(s=r.$o.indexOf(t),r.$o[s]=r.$o[r.$o.length-1],r.$o.pop())}function d(t,i){let r=x(t,null,i),s=O.bind(r);return s[e]=!0,s.set=P.bind(r),s}function q(t){return o(t)&&e in t}function tt(t,i){let r=x(i?.initial,t,i),s=O.bind(r);return s[e]=!0,s}function it(t,i){let r=x(null,function(){let n=t();return o(n)&&C(n),null},void 0);return r.$e=!0,_(r),g.bind(r,!0)}function rt(t){let i=()=>t();return i[e]=!0,i}function st(t){return q(t)&&"set"in t}
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
