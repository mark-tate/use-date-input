import React, { forwardRef } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledAnimatedGroup from "./AnimatedGroup";
import { withStyledGroup } from "./style";

const DefaultAnimatedGroup = withStyledGroup(UnstyledAnimatedGroup);

export const CustomisableAnimatedGroup = forwardRef(
  function CustomisableAnimatedGroup(props, ref) {
    const {
      AnimatedGroup: Component = DefaultAnimatedGroup
    } = useCalendarComponent();
    return <Component {...props} ref={ref} />;
  }
);

export default DefaultAnimatedGroup;
