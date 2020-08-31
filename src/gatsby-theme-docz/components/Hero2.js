import React from "react";
import { Calendar, Root } from "@use-date-input/core";
import { adapter as dateAdapter } from "@use-date-input/date-fns-adapter";
import { DemoHeader } from "./DemoHeader";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const CustomRoot = props => <Root {...props} />;

export function Hero2() {
  const theme = useTheme();
  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(isSmallBreakpoint);
  return (
    <Calendar
      adapter={dateAdapter}
      allowRange
      components={{
        Header: DemoHeader,
        Root: CustomRoot
      }}
      numOfVisibleMonths={isSmallBreakpoint ? 2 : 6}
      numOfColumns={isSmallBreakpoint ? 2 : 3}
    />
  );
}
