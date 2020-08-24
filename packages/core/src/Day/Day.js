import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { formatNames } from "@use-date-input/common";

import useForkRef from "../useForkRef";

const Day = forwardRef(function Day(
  {
    className,
    day,
    disabled,
    isEndDate,
    isFocused,
    isMouseCursorValid,
    isStartDate,
    onMouseOutDate,
    onMouseOverDate,
    onSelectDate,
    tabIndex,
    toFormattedDate
  },
  ref
) {
  const lastIsFocused = useRef(false);
  const dayRef = useRef(null);
  const handleRef = useForkRef(ref, dayRef);
  const handleMouseOver = useCallback(() => {
    if (onMouseOverDate) {
      onMouseOverDate(day);
    }
  }, [day, onMouseOverDate]);
  const handleMouseOut = useCallback(() => {
    if (onMouseOutDate) {
      onMouseOutDate(day);
    }
  }, [day, onMouseOutDate]);
  const handleClick = useCallback(() => {
    if (isMouseCursorValid && onSelectDate) {
      onSelectDate(day);
    }
  }, [day, isMouseCursorValid, onSelectDate]);

  useEffect(() => {
    if (isFocused && lastIsFocused.current !== isFocused) {
      dayRef.current.focus();
    }
    lastIsFocused.current = isFocused;
  }, [dayRef, isFocused]);

  if (!day) {
    return null;
  }
  let ariaLabel;
  if (isStartDate || isEndDate) {
    ariaLabel = toFormattedDate(
      day,
      isStartDate ? formatNames.ARIA_START_LABEL : formatNames.ARIA_END_LABEL
    );
  } else if (day) {
    ariaLabel = toFormattedDate(day, formatNames.ARIA_DAY_LABEL);
  }
  return (
    <span
      aria-label={ariaLabel}
      className={className}
      onClick={!disabled ? handleClick : undefined}
      onMouseOut={!disabled ? handleMouseOut : undefined}
      onMouseOver={!disabled ? handleMouseOver : undefined}
      ref={handleRef}
      role="gridcell"
      tabIndex={tabIndex}
    >
      {toFormattedDate(day, formatNames.DAY)}
    </span>
  );
});

Day.propTypes = {
  /** Active cursor type, based on last user selection, defines any visible range */
  activeCursor: PropTypes.oneOf(["keyboard", "mouse"]),
  /** Class name of root element */
  className: PropTypes.string,
  /** Day object */
  day: PropTypes.object,
  /** Flag indicating whether the day is disabled */
  disabled: PropTypes.bool,
  /** Flag indicating whether the date is the end date */
  isEndDate: PropTypes.bool,
  /** Flag indicating whether the day is the keyboard cursor */
  isKeyboardCursor: PropTypes.bool,
  /** Flag indicating whether the day is focused */
  isFocused: PropTypes.bool,
  /** Flag indicating whether the date is between start and end of range */
  isMidRange: PropTypes.bool,
  /** Flag indicating whether the day is the mouse cursor */
  isMouseCursor: PropTypes.bool,
  /** Flag indicating whether the mouse cursor defines a valid range */
  isMouseCursorValid: PropTypes.bool,
  /** Is outside of the current month that is being rendered */
  isOutsideOfMonth: PropTypes.bool,
  /** Flag indicating whether the date is the start date */
  isStartDate: PropTypes.bool,
  /** Flag indicating whether the date is today */
  isToday: PropTypes.bool,
  /** Callback called when mouse leaves a Day */
  onMouseOutDate: PropTypes.func,
  /** Callback called when mouse is over a Day */
  onMouseOverDate: PropTypes.func,
  /** Callback called on date select */
  onSelectDate: PropTypes.func,
  /** The tab index */
  tabIndex: PropTypes.number,
  /** Callback to format a date, usd by aria labels */
  toFormattedDate: PropTypes.func.isRequired
};

export default Day;
