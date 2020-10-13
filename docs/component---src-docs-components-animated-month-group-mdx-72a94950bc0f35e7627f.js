(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{hgaL:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return h})),n.d(t,"default",(function(){return g}));var a=n("Fcif"),o=n("+I+c"),r=n("mXGw"),i=n("/FXl"),l=n("TjRS"),b=n("ZFoC"),c=n("EoFh"),u=n.n(c),p=n("lOOT"),m=n("GYKu"),d=n("9b5V"),s=n("nVj4"),j=n("0rkN"),O=n("OWCF"),h=(n("aD51"),{});void 0!==h&&h&&h===Object(h)&&Object.isExtensible(h)&&!h.hasOwnProperty("__filemeta")&&Object.defineProperty(h,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docs/components/animatedMonthGroup.mdx"}});f="AddYourComponentHere";var f,C={_frontmatter:h},N=l.a;function g(e){var t,n=e.components,c=Object(o.a)(e,["components"]);return Object(i.b)(N,Object(a.a)({},C,c,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"animatedmonthgroup"},"AnimatedMonthGroup"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"AnimatedMonthGroup")," component animates it's children based on the change of the ",Object(i.b)("inlineCode",{parentName:"p"},"visibleFromDate")," and refs, applied to the first (",Object(i.b)("inlineCode",{parentName:"p"},"firstColumnRef"),"). and last column (",Object(i.b)("inlineCode",{parentName:"p"},"groupRef"),")."),Object(i.b)("p",null,"In the default implementation, ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://mark-tate.github.io/use-date-input/animatedMonthGroup"}),"AnimatedMonthGroup")," is the parent of ",Object(i.b)("inlineCode",{parentName:"p"},"AnimatedMonth")," and is used to manage\nscroll movement between columns based on the changes to ",Object(i.b)("inlineCode",{parentName:"p"},"visibleFromDate"),"."),Object(i.b)("h2",{id:"example"},"Example"),Object(i.b)(b.c,{__position:0,__code:"() => {\n  const theme = useTheme()\n  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))\n  const AddYourComponentHere = isSmallBreakpoint\n    ? DemoContentSmall\n    : DemoContent\n  const { createDate, addMonths, subtractMonths } = dateAdapter()\n  const [visibleFromDate, setVisibleFromDate] = useState(createDate())\n  const column1Ref = useRef()\n  const groupRef = useRef()\n  function handleNextMonthClick() {\n    const nextMonth = addMonths(visibleFromDate, 1)\n    setVisibleFromDate(nextMonth)\n  }\n  function handlePreviousMonthClick() {\n    const previousMonth = subtractMonths(visibleFromDate, 1)\n    setVisibleFromDate(previousMonth)\n  }\n  function handleNextQuarterClick() {\n    const nextMonth = addMonths(visibleFromDate, 3)\n    setVisibleFromDate(nextMonth)\n  }\n  function handlePreviousQuarterClick() {\n    const nextMonth = subtractMonths(visibleFromDate, 3)\n    setVisibleFromDate(nextMonth)\n  }\n  const width = isSmallBreakpoint ? '300px' : '600px'\n  return (\n    <CalendarProvider adapter={dateAdapter} numOfColumns={3}>\n      <ButtonBar>\n        <Button onClick={handlePreviousMonthClick}>\n          {isSmallBreakpoint ? '-1' : 'Previous Month'}\n        </Button>\n        <Button onClick={handleNextMonthClick}>\n          {isSmallBreakpoint ? '+1' : 'Next Month'}\n        </Button>\n        <Button onClick={handlePreviousQuarterClick}>\n          {isSmallBreakpoint ? '-3' : 'Prevous Quarter'}\n        </Button>\n        <Button onClick={handleNextQuarterClick}>\n          {isSmallBreakpoint ? '+3' : 'Next Quarter'}\n        </Button>\n      </ButtonBar>\n      <div style={{ width }}>\n        <AnimatedMonthGroup\n          firstColumnRef={column1Ref}\n          groupRef={groupRef}\n          visibleFromDate={visibleFromDate}\n        >\n          <div ref={groupRef}>\n            <AddYourComponentHere\n              style={{ display: 'inline-flex' }}\n              ref={column1Ref}\n            >\n              Column 1\n            </AddYourComponentHere>\n            <AddYourComponentHere style={{ display: 'inline-flex' }}>\n              Column 2\n            </AddYourComponentHere>\n            <AddYourComponentHere style={{ display: 'inline-flex' }}>\n              Column 3\n            </AddYourComponentHere>\n          </div>\n        </AnimatedMonthGroup>\n      </div>\n    </CalendarProvider>\n  )\n}",__scope:(t={props:c,DefaultLayout:l.a,useState:r.useState,useRef:r.useRef,Playground:b.c,useMediaQuery:u.a,useTheme:p.a,AnimatedMonthGroup:m.b,CalendarProvider:m.d,dateAdapter:d.a,DemoContent:s.a,DemoContentSmall:s.b,Button:j.a,ButtonBar:O.a},t.DefaultLayout=l.a,t._frontmatter=h,t),mdxType:"Playground"},(function(){var e=Object(p.a)(),t=u()(e.breakpoints.down("sm")),n=t?s.b:s.a,a=Object(d.a)(),o=a.createDate,l=a.addMonths,b=a.subtractMonths,c=Object(r.useState)(o()),h=c[0],f=c[1],C=Object(r.useRef)(),N=Object(r.useRef)();var g=t?"300px":"600px";return Object(i.b)(m.d,{adapter:d.a,numOfColumns:3,mdxType:"CalendarProvider"},Object(i.b)(O.a,{mdxType:"ButtonBar"},Object(i.b)(j.a,{onClick:function(){var e=b(h,1);f(e)},mdxType:"Button"},t?"-1":"Previous Month"),Object(i.b)(j.a,{onClick:function(){var e=l(h,1);f(e)},mdxType:"Button"},t?"+1":"Next Month"),Object(i.b)(j.a,{onClick:function(){var e=b(h,3);f(e)},mdxType:"Button"},t?"-3":"Prevous Quarter"),Object(i.b)(j.a,{onClick:function(){var e=l(h,3);f(e)},mdxType:"Button"},t?"+3":"Next Quarter")),Object(i.b)("div",{style:{width:g}},Object(i.b)(m.b,{firstColumnRef:C,groupRef:N,visibleFromDate:h,mdxType:"AnimatedMonthGroup"},Object(i.b)("div",{ref:N},Object(i.b)(n,{style:{display:"inline-flex"},ref:C,mdxType:"AddYourComponentHere"},"Column 1"),Object(i.b)(n,{style:{display:"inline-flex"},mdxType:"AddYourComponentHere"},"Column 2"),Object(i.b)(n,{style:{display:"inline-flex"},mdxType:"AddYourComponentHere"},"Column 3")))))})),Object(i.b)("h2",{id:"props"},"Props"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Prop Name"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Is Required"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default Value"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"children"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"element")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"optional"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Children")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"firstColumnRef"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"object")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"required"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Ref to the first column")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"groupRef"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"object")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"required"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Ref to the MonthGroup")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"visibleFromDate"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"object")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"required"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Visible from date, used to control animation between columns and MonthGroup")))),Object(i.b)("h2",{id:"importing"},"Importing"),Object(i.b)("p",null,"It can be imported as either the base component"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),'import { AnimatedMonthGroup } from "@use-date-input/core";\n')),Object(i.b)("p",null,"or as an overridable component that can be replaced through the ",Object(i.b)("inlineCode",{parentName:"p"},"components")," prop in ",Object(i.b)("inlineCode",{parentName:"p"},"CalendarProvider"),".",Object(i.b)("br",{parentName:"p"}),"\n","Refer to ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://mark-tate.github.io/use-date-input/theming#how-to-replace-ui-components"}),"How to replace UI components"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),'import { CustomisableAnimatedMonthGroup } from "@use-date-input/core";\n')),Object(i.b)("p",null,"If providing your own component, it can be useful to import the base component and use it within your composition.  "))}void 0!==g&&g&&g===Object(g)&&Object.isExtensible(g)&&!g.hasOwnProperty("__filemeta")&&Object.defineProperty(g,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docs/components/animatedMonthGroup.mdx"}}),g.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docs-components-animated-month-group-mdx-72a94950bc0f35e7627f.js.map