import React, { forwardRef, memo } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledWeekHeader from "./WeekHeader";
import { withStyledWeekHeader } from "./style";

const DefaultWeekHeader = withStyledWeekHeader(UnstyledWeekHeader);

const WeekHeader = forwardRef(function CustomisableWeekHeader(props, ref) {
  const { WeekHeader: Component = DefaultWeekHeader } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export const CustomisableWeekHeader = memo(WeekHeader);

export default DefaultWeekHeader;
