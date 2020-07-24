import React, { forwardRef, memo } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledMonthGroup from "./MonthGroup";
import { withStyledMonthGroup } from "./style";

const DefaultMonthGroup = withStyledMonthGroup(UnstyledMonthGroup);

const MonthGroup = forwardRef(function CustomisableMonthGroup(props, ref) {
  const { MonthGroup: Component = DefaultMonthGroup } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export const CustomisableMonthGroup = memo(MonthGroup);

export default DefaultMonthGroup;
