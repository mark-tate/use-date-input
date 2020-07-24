import React, { forwardRef, memo } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledMonth from "./Month";
import { withStyledMonth } from "./style";

const DefaultMonth = withStyledMonth(UnstyledMonth);

const Month = forwardRef(function CustomisableMonth(props, ref) {
  const { Month: Component = DefaultMonth } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export const CustomisableMonth = memo(Month);

export default DefaultMonth;
