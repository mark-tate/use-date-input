import React, { forwardRef, memo } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledDay from "./Day";
import { withStyledDay } from "./style";

const DefaultDay = withStyledDay(UnstyledDay);

const Day = forwardRef(function CustomisableDay(props, ref) {
  const { Day: Component = DefaultDay } = useCalendarComponent();
  return <Component ref={ref} {...props} />;
});
export const CustomisableDay = memo(Day);

export default DefaultDay;
