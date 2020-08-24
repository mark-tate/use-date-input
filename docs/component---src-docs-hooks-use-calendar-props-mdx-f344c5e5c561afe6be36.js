(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{IfrJ:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return i})),a.d(t,"default",(function(){return D}));var n=a("Fcif"),r=a("+I+c"),o=a("mXGw"),l=a("/FXl"),d=a("TjRS"),c=a("ZFoC"),s=a("GYKu"),b=a("Tmbg"),p=a("9b5V"),i=(a("aD51"),{});void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docs/hooks/useCalendarProps.mdx"}});u="DateLabel";var u,m={_frontmatter:i},f=d.a;function D(e){var t,a=e.components,u=Object(r.a)(e,["components"]);return Object(l.b)(f,Object(n.a)({},m,u,{components:a,mdxType:"MDXLayout"}),Object(l.b)("h1",{id:"usecalendarprops"},"useCalendarProps"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"useCalendarProps")," is a hook which will provide the props provided to ",Object(l.b)("inlineCode",{parentName:"p"},"CalendarProvider"),"."),Object(l.b)("p",null,"This hook can be used to add yuor own props to the context."),Object(l.b)("h2",{id:"example"},"Example"),Object(l.b)(c.c,{__position:0,__code:"() => {\n  const [selectedDate, setSelectedDate] = useState()\n  const DateLabel = ({ selectedDate }) => {\n    const { format, getDateFormat } = useDateAPI()\n    const props = useCalendarProps()\n    let dateLabel = 'Select A Date'\n    if (selectedDate) {\n      const formatter = getDateFormat(formatNames.ARIA_DAY_LABEL)\n      dateLabel = format(selectedDate, formatter)\n    }\n    return (\n      <>\n        <i>{props.myExtraLabel}</i>\n        <p>{dateLabel}</p>\n      </>\n    )\n  }\n  return (\n    <CalendarProvider\n      adapter={dateAdapter}\n      onCalendarChange={setSelectedDate}\n      myExtraLabel={'My Calendar:'}\n    >\n      <DateLabel selectedDate={selectedDate} />\n      <Calendar />\n    </CalendarProvider>\n  )\n}",__scope:(t={props:u,DefaultLayout:d.a,useState:o.useState,Playground:c.c,useDateAPI:s.v,useCalendarProps:s.t,Calendar:s.c,CalendarProvider:s.d,formatNames:b.a,dateAdapter:p.a},t.DefaultLayout=d.a,t._frontmatter=i,t),mdxType:"Playground"},(function(){var e=Object(o.useState)(),t=e[0],a=e[1];return Object(l.b)(s.d,{adapter:p.a,onCalendarChange:a,myExtraLabel:"My Calendar:",mdxType:"CalendarProvider"},Object(l.b)((function(e){var t=e.selectedDate,a=Object(s.v)(),n=a.format,r=a.getDateFormat,d=Object(s.t)(),c="Select A Date";t&&(c=n(t,r(b.a.ARIA_DAY_LABEL)));return Object(l.b)(o.Fragment,null,Object(l.b)("i",null,d.myExtraLabel),Object(l.b)("p",null,c))}),{selectedDate:t,mdxType:"DateLabel"}),Object(l.b)(s.c,{mdxType:"Calendar"}))})))}void 0!==D&&D&&D===Object(D)&&Object.isExtensible(D)&&!D.hasOwnProperty("__filemeta")&&Object.defineProperty(D,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docs/hooks/useCalendarProps.mdx"}}),D.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docs-hooks-use-calendar-props-mdx-f344c5e5c561afe6be36.js.map