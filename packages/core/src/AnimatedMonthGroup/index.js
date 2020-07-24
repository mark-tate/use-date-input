import React, { forwardRef } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import DefaultAnimatedMonthGroup from "./AnimatedMonthGroup";

export const CustomisableAnimatedMonthGroup = forwardRef(
  function CustomisableAnimatedMonthGroup(props, ref) {
    const {
      AnimatedGroup: Component = DefaultAnimatedMonthGroup
    } = useCalendarComponent();
    return <Component {...props} ref={ref} />;
  }
);

export default DefaultAnimatedMonthGroup;
