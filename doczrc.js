export default {
  base: 'use-date-input',
  title: 'use-date-input - Build Your Own Date Picker',
  editBranch: "https://github.com/mark-tate/use-date-input",
  dest: './docs',
  propsParser: false,
  public: '/public',
  src: './src',
  menu: [
    "Home",  
    "Getting Started",
    "State",
    "Theming",
    "Composition",
    "Date Frameworks",
    "Localization",
    {
      name: "Components",
      menu: [
        { name: "AnimatedGroup", route: "/animatedGroup" },
        { name: "AnimatedMonthGroup", route: "/animatedMonthGroup" },
        { name: "Calendar", route: "/calendar" },
        { name: "CalendarProvider", route: "/calendarProvider" },
        { name: "ClickOutside", route: "/clickOutside" },
        { name: "Day", route: "/day" },
        { name: "DayOfWeek", route: "/dayOfWeek" },
        { name: "Header", route: "/header" },
        { name: "Month", route: "/month" },
        { name: "MonthGroup", route: "/monthGroup" },
        { name: "Popper", route: "/popper" },
        { name: "Root", route: "/root" },
        { name: "Week", route: "/week" },
        { name: "WeekHeader", route: "/weekHeader" },
      ]
    },
    {
      name: "Hooks",
      menu: [
        { name: "useDateInput", route: "/useDateInput", menu: "Hooks" },
        { name: "useDateRangeInput", route: "/useDateRangeInput", menu: "Hooks" },
        { name: "useCalendarProps", route: "/useCalendarProps", menu: "Hooks" },
        { name: "useCalendarState", route: "/useCalendarState", menu: "Hooks" },
        { name: "useDateAPI", route: "/useDateAPI", menu: "Hooks" },
        { name: "useCalendarDispatch", route: "/useCalendarDispatch", menu: "Hooks" }
      ]
    },
  ]
};
