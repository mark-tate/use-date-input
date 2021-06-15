(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{kH65:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return y})),a.d(t,"default",(function(){return C}));var n=a("Fcif"),l=a("+I+c"),r=a("mXGw"),b=a("/FXl"),o=a("TjRS"),c=a("UutA"),d=a("ZFoC"),i=a("GYKu"),s=a("lOOT"),u=a("EoFh"),p=a.n(u),O=a("Dy3B"),m=a("9jhi"),j=a("esdE"),g=a("5Wd7"),y=(a("aD51"),{});void 0!==y&&y&&y===Object(y)&&Object.isExtensible(y)&&!y.hasOwnProperty("__filemeta")&&Object.defineProperty(y,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/docs/components/calendar.mdx"}});h="UnavailableDay";var h,f={_frontmatter:y},N=o.a;function C(e){var t,a,u,h,C,D,_=e.components,k=Object(l.a)(e,["components"]);return Object(b.b)(N,Object(n.a)({},f,k,{components:_,mdxType:"MDXLayout"}),Object(b.b)("h1",{id:"calendar"},"Calendar"),Object(b.b)("p",null,"The ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")," is the basic building block for all calendar controls.\nIt supports  "),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"single or date ranges, via the  configured reducers"),Object(b.b)("li",{parentName:"ul"},"any date framework, via the date adapter"),Object(b.b)("li",{parentName:"ul"},"theming"),Object(b.b)("li",{parentName:"ul"},"localisation, via the format method of the date adapter"),Object(b.b)("li",{parentName:"ul"},"a11y support")),Object(b.b)("p",null,"In the default implementation ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")," is used by the ",Object(b.b)("inlineCode",{parentName:"p"},"useDateInput")," and ",Object(b.b)("inlineCode",{parentName:"p"},"useDateRangeInput")," hooks but you can also use inline.",Object(b.b)("br",{parentName:"p"}),"\n","Alternatively you could use to compose your own date picker components or dialogs."),Object(b.b)("p",null,"If you wrap your ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")," in a ",Object(b.b)("inlineCode",{parentName:"p"},"CalendarProvider")," it will use the state created by it, otherwise, it will internally rende\nthe ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")," contents within a ",Object(b.b)("inlineCode",{parentName:"p"},"CalendarProvider"),". This optimization saves you having to wrap ",Object(b.b)("inlineCode",{parentName:"p"},"Calendars")," inside ",Object(b.b)("inlineCode",{parentName:"p"},"CalendarProvider"),",\nif you don't need to.  "),Object(b.b)("p",null,"The render tree of ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{}),"Calendar\n|__ Root  \n    |__ Header  \n    |__ MonthGroup  \n        |__ AnimatedMonthGroup  \n            |__ AnimatedGroup  \n                |__ Month  \n                    |__ MonthHeader  \n                        |__ WeekHeader  \n                        |__ Week  \n                            |__ DayOfWeek  \n                            |__ Day  \n")),Object(b.b)("h2",{id:"single-date"},"Single Date"),Object(b.b)("p",null,"By default the ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")," will select single dates."),Object(b.b)(d.c,{__position:0,__code:"<Calendar adapter={dateAdapter} numOfVisibleMonths={1} />",__scope:(t={props:k,DefaultLayout:o.a,styled:c.c,useState:r.useState,Playground:d.c,Calendar:i.c,Day:i.e,useTheme:s.a,useMediaQuery:p.a,isWeekend:O.a,createDate:m.a,dateAdapter:m.b,getDay:j.a,eachDayOfInterval:g.a},t.DefaultLayout=o.a,t._frontmatter=y,t),mdxType:"Playground"},Object(b.b)(i.c,{adapter:m.b,numOfVisibleMonths:1,mdxType:"Calendar"})),Object(b.b)("h2",{id:"date-range"},"Date Range"),Object(b.b)("p",null,"Using the ",Object(b.b)("inlineCode",{parentName:"p"},"allowRange")," prop the ",Object(b.b)("inlineCode",{parentName:"p"},"Calendar")," will select date ranges."),Object(b.b)(d.c,{__position:1,__code:"<Calendar\n  adapter={dateAdapter}\n  allowRange\n  numOfColumns={1}\n  numOfVisibleMonths={1}\n/>",__scope:(a={props:k,DefaultLayout:o.a,styled:c.c,useState:r.useState,Playground:d.c,Calendar:i.c,Day:i.e,useTheme:s.a,useMediaQuery:p.a,isWeekend:O.a,createDate:m.a,dateAdapter:m.b,getDay:j.a,eachDayOfInterval:g.a},a.DefaultLayout=o.a,a._frontmatter=y,a),mdxType:"Playground"},Object(b.b)(i.c,{adapter:m.b,allowRange:!0,numOfColumns:1,numOfVisibleMonths:1,mdxType:"Calendar"})),Object(b.b)("h2",{id:"setting-initial-state"},"Setting Initial State"),Object(b.b)("p",null,"The basic component operates as un-controlled, although the reducer pattern enables you to control the final state.",Object(b.b)("br",{parentName:"p"}),"\n","This example shows the basic use-case of the initial state."),Object(b.b)(d.c,{__position:2,__code:"() => {\n  const handleChange = selectedDate => {\n    console.log('changed selected date', selectedDate)\n  }\n  const theme = useTheme()\n  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))\n  const numOfColumns = isSmallBreakpoint ? 2 : 4\n  const numOfVisibleMonths = isSmallBreakpoint ? 2 : 12\n  return (\n    <Calendar\n      adapter={dateAdapter}\n      initialSelectedDate={createDate('2020-02-20')}\n      initialVisibleFromMonth={createDate('2020-02-01')}\n      numOfColumns={numOfColumns}\n      numOfVisibleMonths={numOfVisibleMonths}\n      onChange={handleChange}\n    />\n  )\n}",__scope:(u={props:k,DefaultLayout:o.a,styled:c.c,useState:r.useState,Playground:d.c,Calendar:i.c,Day:i.e,useTheme:s.a,useMediaQuery:p.a,isWeekend:O.a,createDate:m.a,dateAdapter:m.b,getDay:j.a,eachDayOfInterval:g.a},u.DefaultLayout=o.a,u._frontmatter=y,u),mdxType:"Playground"},(function(){var e=Object(s.a)(),t=p()(e.breakpoints.down("sm")),a=t?2:4,n=t?2:12;return Object(b.b)(i.c,{adapter:m.b,initialSelectedDate:Object(m.a)("2020-02-20"),initialVisibleFromMonth:Object(m.a)("2020-02-01"),numOfColumns:a,numOfVisibleMonths:n,onChange:function(e){console.log("changed selected date",e)},mdxType:"Calendar"})})),Object(b.b)("h2",{id:"custom-day-renderers"},"Custom Day Renderers"),Object(b.b)("p",null,"Add your own renderers for ",Object(b.b)("inlineCode",{parentName:"p"},"Day"),", to render specific date states with your own styles, using the ",Object(b.b)("inlineCode",{parentName:"p"},"ccomponents")," prop.  "),Object(b.b)(d.c,{__position:3,__code:"() => {\n  const theme = useTheme()\n  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))\n  const numOfColumns = isSmallBreakpoint ? 2 : 4\n  const numOfVisibleMonths = isSmallBreakpoint ? 2 : 12\n  /** Add your own renderer(s) for Days to show your required state */\n  function JustWeekdaysRenderer(props) {\n    const disableWeekendProps = isWeekend(props.day) && {\n      disabled: true,\n      day: undefined,\n    }\n    return <Day {...props} {...disableWeekendProps} />\n  }\n  const handleChange = selectedDate => {\n    console.log('changed selected date', selectedDate)\n  }\n  return (\n    <Calendar\n      adapter={dateAdapter}\n      allowRange\n      components={{\n        Day: JustWeekdaysRenderer,\n      }}\n      onChange={handleChange}\n      numOfColumns={numOfColumns}\n      numOfVisibleMonths={numOfVisibleMonths}\n      weekOffset={1}\n    />\n  )\n}",__scope:(h={props:k,DefaultLayout:o.a,styled:c.c,useState:r.useState,Playground:d.c,Calendar:i.c,Day:i.e,useTheme:s.a,useMediaQuery:p.a,isWeekend:O.a,createDate:m.a,dateAdapter:m.b,getDay:j.a,eachDayOfInterval:g.a},h.DefaultLayout=o.a,h._frontmatter=y,h),mdxType:"Playground"},(function(){var e=Object(s.a)(),t=p()(e.breakpoints.down("sm")),a=t?2:4,l=t?2:12;return Object(b.b)(i.c,{adapter:m.b,allowRange:!0,components:{Day:function(e){var t=Object(O.a)(e.day)&&{disabled:!0,day:void 0};return Object(b.b)(i.e,Object(n.a)({},e,t,{mdxType:"Day"}))}},onChange:function(e){console.log("changed selected date",e)},numOfColumns:a,numOfVisibleMonths:l,weekOffset:1,mdxType:"Calendar"})})),Object(b.b)("h2",{id:"block-dates"},"Block dates"),Object(b.b)("p",null,"Block out dates using a custom renderer and the ",Object(b.b)("inlineCode",{parentName:"p"},"isDayDisabled")," prop.  "),Object(b.b)(d.c,{__position:4,__code:"() => {\n  const theme = useTheme()\n  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))\n  const numOfColumns = isSmallBreakpoint ? 2 : 4\n  const numOfVisibleMonths = isSmallBreakpoint ? 2 : 12\n  const UnavailableDay = styled(Day)(props => ({\n    background: 'url(\"/use-date-input/public/cross.svg\")',\n    backgroundRepeat: 'no-repeat',\n    backgroundPosition: 'bottom 6px right 5px',\n    backgroundSize: '50% 50%, auto',\n  }))\n  const isMonday = date => getDay(date) === 1\n  function BlockoutMondaysRenderer(props) {\n    if (getDay(props.day) === 1) {\n      return (\n        <span style={{ cursor: 'not-allowed' }}>\n          <UnavailableDay {...props} disabled />\n        </span>\n      )\n    }\n    return <Day {...props} />\n  }\n  return (\n    <Calendar\n      adapter={dateAdapter}\n      components={{\n        Day: BlockoutMondaysRenderer,\n      }}\n      isDayDisabled={isMonday}\n      numOfColumns={numOfColumns}\n      numOfVisibleMonths={numOfVisibleMonths}\n      weekOffset={1}\n    />\n  )\n}",__scope:(C={props:k,DefaultLayout:o.a,styled:c.c,useState:r.useState,Playground:d.c,Calendar:i.c,Day:i.e,useTheme:s.a,useMediaQuery:p.a,isWeekend:O.a,createDate:m.a,dateAdapter:m.b,getDay:j.a,eachDayOfInterval:g.a},C.DefaultLayout=o.a,C._frontmatter=y,C),mdxType:"Playground"},(function(){var e=Object(s.a)(),t=p()(e.breakpoints.down("sm")),a=t?2:4,l=t?2:12,r=Object(c.c)(i.e)((function(e){return{background:'url("/use-date-input/public/cross.svg")',backgroundRepeat:"no-repeat",backgroundPosition:"bottom 6px right 5px",backgroundSize:"50% 50%, auto"}}));return Object(b.b)(i.c,{adapter:m.b,components:{Day:function(e){return 1===Object(j.a)(e.day)?Object(b.b)("span",{style:{cursor:"not-allowed"}},Object(b.b)(r,Object(n.a)({},e,{disabled:!0,mdxType:"UnavailableDay"}))):Object(b.b)(i.e,Object(n.a)({},e,{mdxType:"Day"}))}},isDayDisabled:function(e){return 1===Object(j.a)(e)},numOfColumns:a,numOfVisibleMonths:l,weekOffset:1,mdxType:"Calendar"})})),Object(b.b)("h2",{id:"validate-date-ranges"},"Validate Date Ranges"),Object(b.b)("p",null,"Validate date ranges with your own rules using the ",Object(b.b)("inlineCode",{parentName:"p"},"isRangeValid")," prop.  "),Object(b.b)(d.c,{__position:5,__code:"() => {\n  const theme = useTheme()\n  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))\n  const numOfColumns = isSmallBreakpoint ? 2 : 4\n  const numOfVisibleMonths = isSmallBreakpoint ? 2 : 12\n  /** Add your own validators to validate ranges */\n  const doesNotOverlapWeekendValidator = (startDate, endDate) => {\n    if (!startDate || !endDate || startDate === endDate) {\n      return true\n    }\n    const overlapsWeekend = eachDayOfInterval({\n      start: startDate,\n      end: endDate,\n    }).some(interval => {\n      return isWeekend(interval)\n    })\n    return !overlapsWeekend\n  }\n  const handleChange = selectedDate => {\n    console.log('changed selected date', selectedDate)\n  }\n  return (\n    <Calendar\n      adapter={dateAdapter}\n      allowRange\n      isRangeValid={doesNotOverlapWeekendValidator}\n      onChange={handleChange}\n      numOfColumns={numOfColumns}\n      numOfVisibleMonths={numOfVisibleMonths}\n      weekOffset={1}\n    />\n  )\n}",__scope:(D={props:k,DefaultLayout:o.a,styled:c.c,useState:r.useState,Playground:d.c,Calendar:i.c,Day:i.e,useTheme:s.a,useMediaQuery:p.a,isWeekend:O.a,createDate:m.a,dateAdapter:m.b,getDay:j.a,eachDayOfInterval:g.a},D.DefaultLayout=o.a,D._frontmatter=y,D),mdxType:"Playground"},(function(){var e=Object(s.a)(),t=p()(e.breakpoints.down("sm")),a=t?2:4,n=t?2:12;return Object(b.b)(i.c,{adapter:m.b,allowRange:!0,isRangeValid:function(e,t){return!e||!t||e===t||!Object(g.a)({start:e,end:t}).some((function(e){return Object(O.a)(e)}))},onChange:function(e){console.log("changed selected date",e)},numOfColumns:a,numOfVisibleMonths:n,weekOffset:1,mdxType:"Calendar"})})),Object(b.b)("h2",{id:"props"},"Props"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Prop Name"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Type"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Is Required"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Default Value"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"adapter"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"func")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Date API adapter")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"allowRange"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"bool")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"false")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"When ",Object(b.b)("inlineCode",{parentName:"td"},"true")," will select a date range")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"ignoreClickOutsideRefs"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"array")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"[]")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Array of refs to ignore clicks, when determining whether the user clicked outside the Calendar")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"initialSelectedDate"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"object or array")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The initial selectedDate (for un-controlled use-case)")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"initialVisibleFromMonth"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"object")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"The initial visible from calendar month (unless date is set)")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"isDayDisabled"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"func")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Callback to set days as disabled   @param day - Date to check        @returns true when disabled")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"isRangeValid"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"func")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Callback to determine whether the current selection is valid   @param day - startDate    @param day - endDate        @returns true when valid")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"numOfColumns"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"1")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Number of columns")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"numOfVisibleMonths"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"1")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Number of visible months")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"onChange"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"func")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Selected date change handler")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"onStateChange"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"func")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"State change handler")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"reducers"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"array of funcs")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Reducer(s), to override default state")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"theme"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"object")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Theme")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"weekOffset"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"optional"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("inlineCode",{parentName:"td"},"0")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"Start of week offset from date API's default")))))}void 0!==C&&C&&C===Object(C)&&Object.isExtensible(C)&&!C.hasOwnProperty("__filemeta")&&Object.defineProperty(C,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/docs/components/calendar.mdx"}}),C.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docs-components-calendar-mdx-c959f4ce420e90dadbf5.js.map