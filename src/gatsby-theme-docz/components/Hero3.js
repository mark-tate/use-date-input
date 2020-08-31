import React from "react";
import { useRef, useState } from 'react'
import { useDateInput } from '@use-date-input/core';
import { Popper } from '@use-date-input/popper';
import { adapter as dateAdapter } from '@use-date-input/date-fns-adapter';
import { parse } from 'date-fns';
import { Input} from "./Input";

export function Hero3() {
  const [date, setDate] = useState("");
  const actions = useRef();
  const handleInputChange = event => {
    const { value } = event.target;
    console.log("input changed to", value);
    setDate(event.target.value);
  };
  const handleCalendarChange = value => {
    console.log("calendar changed selected date", value);
    const { dateAPI } = actions.current;
    setDate(dateAPI.format(value, "dd/MM/yyyy"));
  };
  const {
    Calendar,
    CalendarProvider,
    getCalendarProviderProps,
    getInputProps,
    getPopperProps
  } = useDateInput({
    actions,
    parse: value => parse(value, "dd/MM/yyyy", new Date())
  });
  return (
    <>
      <Input
        {...getInputProps({ onChange: handleInputChange })}
        value={date}
      />
      <CalendarProvider
        {...getCalendarProviderProps({
          adapter: dateAdapter,
          onCalendarChange: handleCalendarChange
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
