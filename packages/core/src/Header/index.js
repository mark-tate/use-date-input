import React, { forwardRef } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledHeader from "./Header";
import { withStyledHeader } from "./style";

const DefaultHeader = withStyledHeader(UnstyledHeader);

export const CustomisableHeader = forwardRef(function CustomisableHeader(
  props,
  ref
) {
  const { Header: Component = DefaultHeader } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export default DefaultHeader;
