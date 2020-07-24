import React, { forwardRef, memo } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledWeek from "./Week";
import { withStyledWeek } from "./style";

const DefaultWeek = withStyledWeek(UnstyledWeek);

export const Week = forwardRef(function CustomisableRoot(props, ref) {
  const { Week: Component = DefaultWeek } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export const CustomisableWeek = memo(Week);

export default DefaultWeek;
