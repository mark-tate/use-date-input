import React from "react";
import { useCallback, useRef, useState } from "react";
import { useDateRangeInput } from "@use-date-input/core";
import { Popper } from "@use-date-input/popper";
import { adapter as dateAdapter } from "@use-date-input/date-fns-adapter";
import { parse } from "date-fns";
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

export function Hero4() {
  const theme = useTheme();
  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const actions = useRef();
  const handleStateChange = useCallback((changes, state) => {
    console.log("state changed", changes, state);
  }, []);
  const handleStartDateInputChange = useCallback(event => {
    const { value } = event.target;
    console.log("start date input changed to", value);
    setStartDate(value);
  }, []);
  const handleEndDateInputChange = useCallback(event => {
    const { value } = event.target;
    action("end date input changed to")(value);
    setEndDate(value);
  }, []);
  const handleCalendarChange = useCallback(value => {
    console.log("calendar changed selected date", value);
    const { dateAPI } = actions.current;
    const [rangeStart, rangeEnd] = value;
    setStartDate(rangeStart ? dateAPI.format(rangeStart, "dd/MM/yyyy") : "");
    setEndDate(rangeEnd ? dateAPI.format(rangeEnd, "dd/MM/yyyy") : "");
  }, []);
  const {
    Calendar,
    CalendarProvider,
    getCalendarProviderProps,
    getStartDateProps,
    getEndDateProps,
    getPopperProps
  } = useDateRangeInput({
    actions,
    parse: value => parse(value, "dd/MM/yyyy", new Date())
  });
  return (
    <>
      <input
        {...getStartDateProps({ onChange: handleStartDateInputChange })}
        value={startDate}
      />
      <input
        {...getEndDateProps({ onChange: handleEndDateInputChange })}
        value={endDate}
      />
      <CalendarProvider
        {...getCalendarProviderProps({
          adapter: dateAdapter,
          numOfColumns: isSmallBreakpoint ? 2 : 3,
          numOfVisibleMonths: isSmallBreakpoint ? 2 : 6,
          onCalendarChange: handleCalendarChange,
          onStateChange: handleStateChange
        })}
      >
        <Popper {...getPopperProps({ placement: "bottom-start" })}>
          <div style={{ background: "white", padding: "10px" }}>
            <Calendar />
          </div>
        </Popper>
      </CalendarProvider>
    </>
  );
}
