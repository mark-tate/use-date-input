import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { formatNames } from "@use-date-input/common";
import {
  StyledNextButton,
  StyledPreviousButton,
  StyledYearTitle
} from "./style";
import {
  useCalendarDispatch,
  useCalendarState,
  useDateAPI
} from "../CalendarProvider";

const Header = forwardRef(function Header({ className }, ref) {
  const { visibleFromDate } = useCalendarState();
  const { navigateNext, navigatePrevious } = useCalendarDispatch();
  const { toFormattedDate } = useDateAPI();
  return (
    <div className={className} ref={ref}>
      <StyledPreviousButton
        aria-disabled="false"
        aria-label="move to previous month"
        onClick={navigatePrevious}
        tabIndex={0}
      />
      <StyledYearTitle
        aria-atomic="true"
        aria-live="assertive"
        aria-label="title"
      >
        {visibleFromDate &&
          toFormattedDate(visibleFromDate, formatNames.HEADER)}
      </StyledYearTitle>
      <StyledNextButton
        aria-disabled="false"
        aria-label="move to next month"
        onClick={navigateNext}
        tabIndex={0}
      />
    </div>
  );
});

Header.propTypes = {
  /** Class name of root element */
  className: PropTypes.string
};

export default Header;
