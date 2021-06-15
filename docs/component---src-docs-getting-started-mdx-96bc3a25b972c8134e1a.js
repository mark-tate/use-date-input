(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Dbpf:function(e,a,t){"use strict";t.r(a),t.d(a,"_frontmatter",(function(){return b})),t.d(a,"default",(function(){return j}));var n=t("Fcif"),r=t("+I+c"),d=t("mXGw"),o=t("/FXl"),c=t("TjRS"),p=t("ZFoC"),u=t("GYKu"),s=t("9jhi"),l=t("xrGn"),b=(t("aD51"),{});void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docs/getting-started.mdx"}});i="CalendarProvider";var i,m={_frontmatter:b},f=c.a;function j(e){var a,t,i=e.components,j=Object(r.a)(e,["components"]);return Object(o.b)(f,Object(n.a)({},m,j,{components:i,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"getting-started"},"Getting Started"),Object(o.b)("p",null,"A Date Picker can consist of an ",Object(o.b)("inlineCode",{parentName:"p"},"input")," and a ",Object(o.b)("inlineCode",{parentName:"p"},"Calendar")," or just a ",Object(o.b)("inlineCode",{parentName:"p"},"Calendar"),".",Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("inlineCode",{parentName:"p"},"use-date-input")," uses an adapter API so that it can be used with any date framework.",Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("inlineCode",{parentName:"p"},"use-date-input")," provides pre-made adapters for the most popular frameworks or you can write your own."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{href:"https://date-fns.org/",target:"__blank__"},"date-fns")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{href:"https://day.js.org/",target:"__blank__"},"dayjs")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{href:"https://moment.github.io/luxon/",target:"__blank__"},"luxon")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",{href:"https://momentjs.com/",target:"__blank__"},"moment"))),Object(o.b)("h3",{id:"for-date-fns-users"},"For date-fns users"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"yarn add date-fns \nyarn add @use-date-input/core\nyarn add @use-date-input/date-fns-adapter \nyarn add styled-components \n")),Object(o.b)("h3",{id:"for-dayjs-users"},"For dayjs users"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"yarn add dayjs \nyarn add @use-date-input/core\nyarn add @use-date-input/dayjs-adapter \nyarn add styled-components \n")),Object(o.b)("h3",{id:"for-luxon-users"},"For luxon users"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"yarn add luxon \nyarn add @use-date-input/core\nyarn add @use-date-input/luxon-adapter \nyarn add styled-components \n")),Object(o.b)("h3",{id:"for-moment-users"},"For moment users"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"yarn add moment \nyarn add @use-date-input/core\nyarn add @use-date-input/moment-adapter \nyarn add styled-components \n")),Object(o.b)("h2",{id:"calendar-example"},"Calendar Example"),Object(o.b)("p",null,"A basic example of the ",Object(o.b)("inlineCode",{parentName:"p"},"Calendar")," component."),Object(o.b)(p.c,{__position:0,__code:"() => {\n  // import { Calendar } from '@use-date-input/core';\n  // import { adapter as dateAdapter } from '@use-date-input/date-fns-adapter';\n  function handleCalendarChange(newSelectedDate) {\n    console.log('calendar changed selected date', newSelectedDate)\n  }\n  return (\n    <Calendar adapter={dateAdapter} onCalendarChange={handleCalendarChange} />\n  )\n}",__scope:(a={props:j,DefaultLayout:c.a,useRef:d.useRef,useState:d.useState,Playground:p.c,Calendar:u.c,useDateInput:u.u,dateAdapter:s.b,parse:l.a},a.DefaultLayout=c.a,a._frontmatter=b,a),mdxType:"Playground"},(function(){return Object(o.b)(u.c,{adapter:s.b,onCalendarChange:function(e){console.log("calendar changed selected date",e)},mdxType:"Calendar"})})),Object(o.b)("h2",{id:"input--calendar-example"},"Input & Calendar Example"),Object(o.b)("p",null,"A basic example of the ",Object(o.b)("inlineCode",{parentName:"p"},"useDateInput")," hook, linking an HTML ",Object(o.b)("inlineCode",{parentName:"p"},"input")," and the ",Object(o.b)("inlineCode",{parentName:"p"},"Calendar")," component."),Object(o.b)(p.c,{__position:1,__code:"() => {\n  // import { useRef, useState } from 'react';\n  // import { useDateInput } from \"@use-date-input/core\";\n  // import { adapter as dateAdapter } from \"@use-date-input/date-fns-adapter\";\n  // import { parse } from 'date-fns';\n  const defaultParseDate = value => parse(value, 'dd/MM/yyyy', new Date())\n  const [date, setDate] = useState('')\n  const actions = useRef()\n  function handleInputChange(event) {\n    const { value } = event.target\n    console.log('input changed to', value)\n    setDate(event.target.value)\n  }\n  function handleCalendarChange(newSelectedDate) {\n    console.log('calendar changed selected date', newSelectedDate)\n    const { dateAPI } = actions.current\n    setDate(dateAPI.format(newSelectedDate, 'dd/MM/yyyy'))\n  }\n  const {\n    Calendar,\n    CalendarProvider,\n    getCalendarProviderProps,\n    getInputProps,\n  } = useDateInput({\n    actions,\n    parse: defaultParseDate,\n  })\n  return (\n    <>\n      <input\n        {...getInputProps({ onChange: handleInputChange })}\n        value={date}\n      />\n      <CalendarProvider\n        {...getCalendarProviderProps({\n          adapter: dateAdapter,\n          onCalendarChange: handleCalendarChange,\n        })}\n      >\n        <Calendar />\n      </CalendarProvider>\n    </>\n  )\n}",__scope:(t={props:j,DefaultLayout:c.a,useRef:d.useRef,useState:d.useState,Playground:p.c,Calendar:u.c,useDateInput:u.u,dateAdapter:s.b,parse:l.a},t.DefaultLayout=c.a,t._frontmatter=b,t),mdxType:"Playground"},(function(){var e=Object(d.useState)(""),a=e[0],t=e[1],r=Object(d.useRef)();var c=Object(u.u)({actions:r,parse:function(e){return Object(l.a)(e,"dd/MM/yyyy",new Date)}}),p=c.Calendar,b=c.CalendarProvider,i=c.getCalendarProviderProps,m=c.getInputProps;return Object(o.b)(d.Fragment,null,Object(o.b)("input",Object(n.a)({},m({onChange:function(e){var a=e.target.value;console.log("input changed to",a),t(e.target.value)}}),{value:a})),Object(o.b)(b,Object(n.a)({},i({adapter:s.b,onCalendarChange:function(e){console.log("calendar changed selected date",e);var a=r.current.dateAPI;t(a.format(e,"dd/MM/yyyy"))}}),{mdxType:"CalendarProvider"}),Object(o.b)(p,{mdxType:"Calendar"})))})))}void 0!==j&&j&&j===Object(j)&&Object.isExtensible(j)&&!j.hasOwnProperty("__filemeta")&&Object.defineProperty(j,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docs/getting-started.mdx"}}),j.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docs-getting-started-mdx-96bc3a25b972c8134e1a.js.map