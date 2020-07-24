import React, { forwardRef, memo } from "react";

import { useCalendarComponent } from "../CalendarProvider";
import UnstyledRoot from "./Root";
import { withStyledRoot } from "./style";

const DefaultRoot = withStyledRoot(UnstyledRoot);

const Root = forwardRef(function CustomisableRoot(props, ref) {
  const { Root: Component = DefaultRoot } = useCalendarComponent();
  return <Component {...props} ref={ref} />;
});

export const CustomisableRoot = memo(Root);

export default DefaultRoot;
