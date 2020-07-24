import React, { forwardRef } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledDayOfWeek from "./DayOfWeek";
import { withStyledDayOfWeek } from "./style";

const DefaultDayOfweek = withStyledDayOfWeek(UnstyledDayOfWeek);

export const CustomisableDayOfWeek = forwardRef(function CustomisableDayOfWeek(
  props,
  ref
) {
  const { DayOfWeek: Component = DefaultDayOfweek } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export default DefaultDayOfweek;
