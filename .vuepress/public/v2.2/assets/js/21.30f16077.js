(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{217:function(t,e,a){},288:function(t,e,a){"use strict";var n=a(217);a.n(n).a},381:function(t,e,a){"use strict";a.r(e);var n={name:"AboutPage",components:{Footer:a(74).default},data:function(){return{dateOptions:{weekday:"long",year:"numeric",month:"long",day:"numeric"}}},computed:{previewimage:function(){return this.$page.frontmatter.previewimage}}},o=(a(288),a(1)),s=Object(o.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"post-header",style:{background:"url("+t.$page.frontmatter.previewimage+") no-repeat center"}},[a("div",{staticClass:"post-cover"},[a("h1",{staticClass:"post-title"},[t._v("\n        "+t._s(t.$page.frontmatter.title)+"\n      ")])])]),t._v(" "),a("div",{staticClass:"blog-body-content"},[a("div",{staticClass:"page-author"},[a("strong",[t._v(t._s(t.$page.frontmatter.author))]),t._v(" posted on "),a("span",{staticStyle:{"white-space":"nowrap"}},[t._v(t._s(new Date(t.$page.frontmatter.date).toLocaleDateString("en-gb",t.dateOptions)))])]),t._v(" "),a("div",{staticClass:"content"},[a("Content")],1)]),t._v(" "),a("Footer")],1)},[],!1,null,null,null);s.options.__file="BlogPost.vue";e.default=s.exports}}]);