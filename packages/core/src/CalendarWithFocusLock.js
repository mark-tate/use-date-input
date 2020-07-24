import React, { forwardRef } from "react";
import { useCalendarDispatch, useCalendarState } from "./CalendarProvider";
import { dateInputActions } from "./reducers/dateInputReducer";
import FocusLock from "react-focus-lock";
import Calendar from "./Calendar";

const CalendarWithFocusLock = forwardRef(function CalendarWithFocusLock(
  props,
  ref
) {
  const { dispatch } = useCalendarDispatch();
  const { focusLock } = useCalendarState();

  const handleBlur = event => {
    if (focusLock && !event.currentTarget.contains(event.relatedTarget)) {
      dispatch({ type: dateInputActions.focusLock, enable: false });
    }
  };

  const handleFocus = () => {
    if (!focusLock) {
      dispatch({ type: dateInputActions.focusLock, enable: true });
    }
  };

  return (
    <div onBlur={handleBlur} onFocus={handleFocus} ref={ref}>
      <FocusLock disabled={!focusLock} returnFocus={false}>
        <Calendar {...props} />
      </FocusLock>
    </div>
  );
});

export default CalendarWithFocusLock;
