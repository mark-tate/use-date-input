(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{fkwV:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return O}));var a=n("Fcif"),r=n("+I+c"),o=(n("mXGw"),n("/FXl")),b=n("TjRS"),c=n("ZFoC"),l=n("GYKu"),p=n("9b5V"),i=(n("aD51"),{});void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docs/components/monthGroup.mdx"}});m="MonthGroupExample";var m,u={_frontmatter:i},d=b.a;function O(e){var t,n=e.components,m=Object(r.a)(e,["components"]);return Object(o.b)(d,Object(a.a)({},u,m,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"monthgroup"},"MonthGroup"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"MonthGroup")," components renders all the visible calendar ",Object(o.b)("inlineCode",{parentName:"p"},"Month")," components."),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)(c.c,{__position:0,__code:"() => {\n  function MonthGroupExample() {\n    const { createDate } = useDateAPI()\n    const visibleFromDate = createDate()\n    return <MonthGroup visibleFromDate={visibleFromDate} />\n  }\n  return (\n    <CalendarProvider\n      adapter={dateAdapter}\n      numOfVisibleMonths={2}\n      numOfColumns={2}\n    >\n      <MonthGroupExample />\n    </CalendarProvider>\n  )\n}",__scope:(t={props:m,DefaultLayout:b.a,Playground:c.c,MonthGroup:l.i,CalendarProvider:l.d,useDateAPI:l.t,dateAdapter:p.a},t.DefaultLayout=b.a,t._frontmatter=i,t),mdxType:"Playground"},(function(){return Object(o.b)(l.d,{adapter:p.a,numOfVisibleMonths:2,numOfColumns:2,mdxType:"CalendarProvider"},Object(o.b)((function(){var e=(0,Object(l.t)().createDate)();return Object(o.b)(l.i,{visibleFromDate:e,mdxType:"MonthGroup"})}),{mdxType:"MonthGroupExample"}))})),Object(o.b)("h2",{id:"props"},"Props"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Prop Name"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Is Required"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default Value"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"className"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"string")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"optional"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Class name of root element")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"visibleFromDate"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"object")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"optional"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Visible from date")))),Object(o.b)("h2",{id:"importing"},"Importing"),Object(o.b)("p",null,"It can be imported as either the base component"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),'import { MonthGroup } from "@use-date-input/core";\n')),Object(o.b)("p",null,"or as an overridable component that can be replaced through the ",Object(o.b)("inlineCode",{parentName:"p"},"components")," prop in ",Object(o.b)("inlineCode",{parentName:"p"},"CalendarProvider"),".",Object(o.b)("br",{parentName:"p"}),"\n","Refer to ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://mark-tate.github.io/use-date-input/theming#how-to-replace-ui-components"}),"How to replace UI components"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),'import { CustomisableMonthGroup } from "@use-date-input/core";\n')),Object(o.b)("p",null,"If providing your own component, it can be useful to import the base component and use it within your composition.  "))}void 0!==O&&O&&O===Object(O)&&Object.isExtensible(O)&&!O.hasOwnProperty("__filemeta")&&Object.defineProperty(O,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docs/components/monthGroup.mdx"}}),O.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docs-components-month-group-mdx-24e54c28d5875e104913.js.map