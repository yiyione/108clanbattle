(function(t){function a(a){for(var n,o,r=a[0],c=a[1],l=a[2],d=0,h=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&h.push(s[o][0]),s[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(a);while(h.length)h.shift()();return i.push.apply(i,l||[]),e()}function e(){for(var t,a=0;a<i.length;a++){for(var e=i[a],n=!0,r=1;r<e.length;r++){var c=e[r];0!==s[c]&&(n=!1)}n&&(i.splice(a--,1),t=o(o.s=e[0]))}return t}var n={},s={app:0},i=[];function o(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=n,o.d=function(t,a,e){o.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,a){if(1&a&&(t=o(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var n in t)o.d(e,n,function(a){return t[a]}.bind(null,n));return e},o.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(a,"a",a),a},o.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=a,r=r.slice();for(var l=0;l<r.length;l++)a(r[l]);var u=c;i.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"0cc6":function(t,a,e){"use strict";var n=e("fac6"),s=e.n(n);s.a},"56d7":function(t,a,e){"use strict";e.r(a);e("e260"),e("e6cf"),e("cca6"),e("a79d");var n=e("2b0e"),s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[n("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:e("5d42"),transition:"scale-transition",width:"40%"}})],1),n("v-spacer"),n("v-btn",{attrs:{href:"https://game.bilibili.com/pcr/",target:"_blank",text:""}},[n("span",{staticClass:"mr-2"},[t._v("登录")]),n("v-icon",[t._v("mdi-open-in-new")])],1)],1),n("v-content",[n("Welcome")],1)],1)},i=[],o=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-container",{staticStyle:{"max-width":"1010px"},attrs:{fluid:""}},[n("v-row",{staticClass:"text-center"},[n("v-col",{attrs:{cols:"12"}},[n("v-img",{staticClass:"my-3",attrs:{src:e("c441"),contain:"",height:"100%"}})],1),n("v-col",{staticClass:"mb-4"},[n("h1",{staticClass:"display-1 font-weight-bold mb-3"},[t._v(" 欢迎来到108集团公会 ")]),n("p",{staticClass:"subheading font-weight-regular"},[n("a",{attrs:{href:"https://wiki.biligame.com/pcr/%E4%BA%94%E6%9C%88%E5%85%AC%E4%BC%9A%E6%88%98%E6%94%BB%E7%95%A5%E5%8F%8A%E4%BD%9C%E4%B8%9A%E5%88%86%E4%BA%AB",target:"_blank"}},[t._v("五月公会战攻略及作业分享")])])]),n("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[n("v-row",{attrs:{justify:"center"}},t._l(t.battleData,(function(a,e){return n("a",{key:e,staticClass:"subheading mx-3",attrs:{target:"_blank"},on:{click:function(e){return t.switchView(a.view)}}},[t._v(" "+t._s(a.text)+" ")])})),0),n(t.currentView,{tag:"div"})],1),n("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[n("h2",{staticClass:"headline font-weight-bold mb-3"},[t._v(" 相关网址 ")]),n("v-row",{attrs:{justify:"center"}},t._l(t.importantLinks,(function(a,e){return n("a",{key:e,staticClass:"subheading mx-3",attrs:{href:a.href,target:"_blank"}},[t._v(" "+t._s(a.text)+" ")])})),0)],1)],1)],1)},r=[],c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"ClanList"},[e("div",{staticClass:"asideBox"},[e("aside",[e("ul",{staticClass:"asideMenu"},t._l(t.clanList,(function(a,n){return e("li",{key:a.gid},[e("div",{staticClass:"oneMenu",on:{click:function(e){return t.showMembers(a,n)}}},[e("span",[t._v(t._s(a.name))])]),e("ul",{directives:[{name:"show",rawName:"v-show",value:a.isShow,expression:"clan.isShow"}]},t._l(a.memberList,(function(a,s){return e("li",{key:a.uid},[e("div",{staticClass:"oneMenuChild",on:{click:function(e){return t.showDaos(a,n,s)}}},[e("span",[t._v(t._s(a.name))])]),e("ul",{directives:[{name:"show",rawName:"v-show",value:a.isShow,expression:"member.isShow"}]},t._l(a.daoList,(function(a){return e("li",{key:a.eid},[e("div",{staticClass:"oneMenuChildChild"},[e("span",[t._v("时间:"+t._s(a.time)+","+t._s(a.round)+"周目,BOSS "+t._s(a.boss)+",伤害:"+t._s(a.dmg))])])])})),0)])})),0)])})),0)])])])},l=[],u=(e("99af"),e("4160"),e("ac1f"),e("1276"),e("159b"),e("bc3a")),d={name:"Clans",data:function(){return{clanList:[{memberList:[{daoList:[{isShow:Boolean}],isShow:Boolean}],isShow:Boolean}]}},mounted:function(){var t=this;u.get("/api/clans").then((function(a){a.data.forEach((function(t){return t.isShow=!1})),t.clanList=a.data})).catch((function(t){console.log(t)}))},methods:{showMembers:function(t){t.isShow?t.isShow=!t.isShow:u.get("/api/members?gid=".concat(t.gid,"&cid=").concat(t.cid)).then((function(a){a.data.forEach((function(a){a.gid=t.gid,a.cid=t.cid,a.isShow=!1})),t.memberList=a.data,t.isShow=!t.isShow})).catch((function(t){console.log(t)}))},showDaos:function(t,a){var e=this;t.isShow?(t.isShow=!t.isShow,this.$set(this.clanList,a,this.clanList[a])):u.get("/api/daos?gid=".concat(t.gid,"&cid=").concat(t.cid,"&uid=").concat(t.uid,"&alt=").concat(t.alt)).then((function(n){n.data.forEach((function(t){t.isShow=!1,t.time=t.time.split(".")[0]})),t.daoList=n.data,t.isShow=!t.isShow,e.$set(e.clanList,a,e.clanList[a])})).catch((function(t){console.log(t)}))}}},h=d,v=(e("0cc6"),e("2877")),f=Object(v["a"])(h,c,l,!1,null,"476cd021",null),m=f.exports,p=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-card",{staticClass:"mx-auto",attrs:{"max-width":"1000",tile:""}},[e("v-list",{attrs:{shaped:""}},[e("v-subheader",[t._v("出刀记录")]),e("v-list-item-group",{attrs:{color:"primary",align:"left"},model:{value:t.item,callback:function(a){t.item=a},expression:"item"}},t._l(t.daoList,(function(a,n){return e("v-list-item",{key:n},[e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(a.text)}})],1)],1)})),1)],1)],1)],1)},b=[],g=(e("b0c0"),e("bc3a")),w={name:"Daos",data:function(){return{daoList:[]}},mounted:function(){var t=this;g.get("/api/daos?gid=1020774592&cid=1").then((function(a){g.get("/api/members?gid=1020774592&cid=1").then((function(e){var n={};e.data.forEach((function(t){n[t.uid]=t.name})),a.data.forEach((function(t){t.time=t.time.split(".")[0],t.text="".concat(n[t.uid],"，").concat(t.round,"周目，BOSS ").concat(t.boss,"，伤害:").concat(t.dmg,"，E").concat(t.eid,"，时间:").concat(t.time)})),t.daoList=a.data})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))},methods:{}},_=w,x=e("6544"),C=e.n(x),y=e("b0af"),S=e("a523"),L=e("8860"),V=e("da13"),D=e("5d23"),B=e("1baa"),E=e("e0c7"),j=Object(v["a"])(_,p,b,!1,null,"55ad2552",null),O=j.exports;C()(j,{VCard:y["a"],VContainer:S["a"],VList:L["a"],VListItem:V["a"],VListItemContent:D["a"],VListItemGroup:B["a"],VListItemTitle:D["b"],VSubheader:E["a"]});var k=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-divider",{attrs:{inset:""}}),e("h1",[t._v("BOSS状态")]),e("v-row",[e("v-col",{attrs:{col:"6"}},[e("a",{staticClass:"exbig"},[t._v(t._s(t.bossData.round))]),e("a",{staticClass:"big"},[t._v("周目")])]),e("v-col",{attrs:{col:"6"}},[e("a",{staticClass:"exbig"},[t._v(t._s(t.bossData.boss))]),e("a",{staticClass:"big"},[t._v("号boss")])])],1),e("v-row",[e("v-col",{attrs:{col:"12"}},[e("span",{class:{exbig:!t.bossData.challenger},style:{color:t.getProgressLinearColor()}},[t._v(t._s(t.bossData.remind_hp.toLocaleString()))]),t._v("/"+t._s(t.bossData.total_hp.toLocaleString()))])],1),t.bossData.challenger?[e("v-row",[e("v-col",{attrs:{col:"12"}},[e("a",{staticStyle:{"font-size":"32px",color:"#003300"}},[t._v(t._s(t.bossData.challenger.name))]),t.bossData.challenger?e("a",[t._v(" 正在挑战boss ")]):t._e()])],1)]:t._e(),e("v-row",{staticStyle:{"margin-bottom":"25px"}},[e("v-col",{attrs:{col:"12"}},[e("v-progress-linear",{attrs:{value:t.bossData.remind_hp/t.bossData.total_hp*100,color:t.getProgressLinearColor(),height:"10"}})],1)],1),e("v-row",{attrs:{justify:"center"}},[e("v-col",[e("v-btn",{attrs:{"x-large":"",color:"success","min-width":"100%"}},[t._v("报刀")])],1),e("v-col",[e("v-btn",{attrs:{"x-large":"",color:"warning","min-width":"100%"}},[t._v("补时刀")])],1),e("v-col",[e("v-btn",{attrs:{"x-large":"",color:"warning","min-width":"100%"}},[t._v("尾刀")])],1)],1),e("v-row",{attrs:{justify:"center"}},[e("v-col",[e("v-btn",{attrs:{"x-large":"",color:"error","min-width":"100%"}},[t._v("掉刀")])],1),e("v-col",[e("v-btn",{attrs:{"x-large":"",color:"error","min-width":"100%"}},[t._v("挂树")])],1)],1),e("v-row",{attrs:{justify:"center"}},[e("v-col",[e("v-btn",{attrs:{"x-large":"",color:"primary","min-width":"100%"}},[t._v(" 申请出刀 ")])],1),e("v-col",[e("v-btn",{attrs:{"x-large":"","min-width":"100%"}},[t._v(" 取消申请 ")])],1)],1),e("v-row",{attrs:{justify:"center"}},[e("v-col",[e("v-btn",{attrs:{"x-large":"","min-width":"100%"}},[t._v("预约BOSS")])],1),e("v-col",[e("v-btn",{attrs:{"x-large":"","min-width":"100%"}},[t._v(" 取消预约 ")])],1)],1)],2)},A=[],P=(e("a9e3"),e("bc3a")),M={name:"Boss",data:function(){return{bossData:{round:Number,boss:Number,remind_hp:Number,total_hp:Number,challenger:Object}}},mounted:function(){var t=this;P.get("/api/boss?gid=1020774592").then((function(a){t.bossData=a.data})).catch((function(t){console.log(t)}))},methods:{getProgressLinearColor:function(){var t=this.bossData.remind_hp/this.bossData.total_hp*100;return t>70?"#67C23A":t>50?"#9ACD32":t>30?"#FFA500":"#FF0000"}}},$=M,I=(e("95cc"),e("8336")),N=e("62ad"),F=e("ce7e"),T=e("8e36"),Q=e("0fd9"),W=Object(v["a"])($,k,A,!1,null,"8cacdce4",null),G=W.exports;C()(W,{VBtn:I["a"],VCol:N["a"],VContainer:S["a"],VDivider:F["a"],VProgressLinear:T["a"],VRow:Q["a"]});var J=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"Daos"},[e("h2",[t._v(t._s(t.message))])])},R=[],z={name:"Daos",data:function(){return{message:"敬请期待☆~"}},mounted:function(){},methods:{}},q=z,H=Object(v["a"])(q,J,R,!1,null,"ecec10c4",null),K=H.exports,U={name:"Welcome",components:{Clans:m,Daos:O,Boss:G,Qidai:K},data:function(){return{importantLinks:[{text:"B服官网",href:"https://game.bilibili.com/pcr/"},{text:"竞技场查询",href:"https://pcrdfans.com/battle"},{text:"NGA论坛",href:"https://bbs.nga.cn/thread.php?fid=-10308342&rand=222"},{text:"官方微博",href:"https://www.weibo.com/u/6603867494"},{text:"本站源代码",href:"https://github.com/yiyione/108clanbattle"}],battleData:[{text:"BOSS",view:"Boss"},{text:"人员列表",view:"Clans"},{text:"出刀记录",view:"Daos"},{text:"伤害统计",view:"Qidai"},{text:"积分统计",view:"Qidai"}],currentView:"Boss"}},methods:{switchView:function(t){this.currentView=t}}},X=U,Y=e("adda"),Z=Object(v["a"])(X,o,r,!1,null,null,null),tt=Z.exports;C()(Z,{VCol:N["a"],VContainer:S["a"],VImg:Y["a"],VRow:Q["a"]});var at={name:"App",components:{Welcome:tt},data:function(){return{}},created:function(){document.title="公主连结·108集团"}},et=at,nt=e("7496"),st=e("40dc"),it=e("a75b"),ot=e("132d"),rt=e("2fa4"),ct=Object(v["a"])(et,s,i,!1,null,null,null),lt=ct.exports;C()(ct,{VApp:nt["a"],VAppBar:st["a"],VBtn:I["a"],VContent:it["a"],VIcon:ot["a"],VImg:Y["a"],VSpacer:rt["a"]});var ut=e("f309");n["a"].use(ut["a"]);var dt=new ut["a"]({});n["a"].config.productionTip=!1,new n["a"]({vuetify:dt,render:function(t){return t(lt)}}).$mount("#app")},"5d42":function(t,a,e){t.exports=e.p+"img/pcr.ed2ce3b0.png"},"95cc":function(t,a,e){"use strict";var n=e("a7e5"),s=e.n(n);s.a},a7e5:function(t,a,e){},c441:function(t,a,e){t.exports=e.p+"img/princess-connect-redive-anime.d88ec3ba.jpg"},fac6:function(t,a,e){}});
//# sourceMappingURL=app.6970eb60.js.map