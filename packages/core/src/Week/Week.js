import React, { forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";

import { CustomisableDay } from "../Day";
import { cursorType } from "../reducers/calendarReducer";
import {
  useCalendarDispatch,
  useCalendarProps,
  useCalendarState,
  useDateAPI
} from "../CalendarProvider";

const Week = forwardRef(function Week({ className, days, parentMonth }, ref) {
  const {
    activeCursor,
    animating,
    keyboardCursor,
    mouseCursor,
    focusedDate,
    focusableDate,
    enableKeyboardNavigation,
    isMouseCursorValid,
    isKeyboardCursorValid,
    startDate,
    endDate
  } = useCalendarState();
  const { allowRange, isDayDisabled } = useCalendarProps();
  const {
    createDate,
    isAfter,
    isBetween,
    isSameDay,
    isSameMonth,
    toFormattedDate
  } = useDateAPI();
  const { selectDate, setMouseCursor } = useCalendarDispatch();
  const today = createDate();
  const handleMouseOutDate = useCallback(() => {
    setMouseCursor(undefined);
  }, [setMouseCursor]);
  return (
    <div className={className} ref={ref} role="row">
      {days.map(day => {
        const isOutsideOfMonth = isSameMonth(parentMonth, day) === false;
        const isDisabled = isDayDisabled
          ? isOutsideOfMonth || isDayDisabled(day)
          : isOutsideOfMonth;
        const isEndDate = endDate && isSameDay(day, endDate);
        const isFocused =
          !isDisabled && !animating && isSameDay(focusedDate, day);
        const isFocusable = !isDisabled && isSameDay(focusableDate, day);
        const isKeyboardCursor =
          enableKeyboardNavigation && isSameDay(keyboardCursor, day);
        let cursor = mouseCursor;
        if (activeCursor === cursorType.keyboard) {
          cursor = keyboardCursor;
        }
        const isMidRange =
          allowRange &&
          ((startDate && endDate && isBetween(day, startDate, endDate)) ||
            (startDate &&
              !endDate &&
              isAfter(day, startDate) &&
              isBetween(day, startDate, cursor)));
        const isMouseCursor = isSameDay(mouseCursor, day);
        const isStartDate = startDate && isSameDay(day, startDate);
        const isToday = isSameDay(day, today);
        let tabIndex;
        if (isFocused || isFocusable) {
          tabIndex = 0;
        } else if (!isDisabled) {
          tabIndex = -1;
        }
        return (
          <CustomisableDay
            activeCursor={activeCursor}
            allowRange={allowRange}
            day={day}
            disabled={isDisabled}
            key={`day-${toFormattedDate(day)}`}
            isEndDate={isEndDate}
            isFocused={isFocused}
            isKeyboardCursor={isKeyboardCursor}
            isKeyboardCursorValid={isKeyboardCursorValid}
            isStartDate={isStartDate}
            isMidRange={isMidRange}
            isOutsideOfMonth={isOutsideOfMonth}
            isMouseCursor={isMouseCursor}
            isMouseCursorValid={isMouseCursorValid}
            isToday={isToday}
            onMouseOutDate={handleMouseOutDate}
            onMouseOverDate={setMouseCursor}
            onSelectDate={selectDate}
            tabIndex={tabIndex}
            toFormattedDate={toFormattedDate}
          />
        );
      })}
    </div>
  );
});

Week.propTypes = {
  /** Class name of root element */
  className: PropTypes.string,
  /** Array of dates to render **/
  days: PropTypes.array,
  /** parentMonth **/
  parentMonth: PropTypes.object
};

export default memo(Week);
