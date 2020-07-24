import React, { forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";

import { useCalendarDispatch, useCalendarState } from "../CalendarProvider";
import { CustomisableHeader } from "../Header";
import { CustomisableMonthGroup } from "../MonthGroup";

const Root = forwardRef(function Root({ className }, ref) {
  const {
    setEnableKeyboardNavigation,
    setMouseCursor,
    setKeyPress
  } = useCalendarDispatch();
  const { enableKeyboardNavigation, visibleFromDate } = useCalendarState();
  const handleKeyDown = useCallback(
    event => {
      const { key, ctrlKey, shiftKey } = event;
      if (event.key !== "Tab") {
        event.nativeEvent.preventDefault();
      }
      setKeyPress({
        key,
        ctrlKey,
        shiftKey
      });
    },
    [setKeyPress]
  );

  const handleBlur = useCallback(
    event => {
      if (
        enableKeyboardNavigation &&
        !event.currentTarget.contains(event.relatedTarget)
      ) {
        setEnableKeyboardNavigation(false);
      }
    },
    [enableKeyboardNavigation, setEnableKeyboardNavigation]
  );

  const handleFocus = useCallback(() => {
    if (!enableKeyboardNavigation) {
      setEnableKeyboardNavigation(true);
    }
  }, [enableKeyboardNavigation, setEnableKeyboardNavigation]);

  const handleMouseLeave = useCallback(() => {
    setMouseCursor(undefined);
  }, [setMouseCursor]);

  return (
    <div className={className} ref={ref}>
      <CustomisableHeader />
      <div
        data-testid={"calendar-root"}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        <CustomisableMonthGroup visibleFromDate={visibleFromDate} />
      </div>
    </div>
  );
});
Root.propTypes = {
  className: PropTypes.string
};

export default memo(Root);
