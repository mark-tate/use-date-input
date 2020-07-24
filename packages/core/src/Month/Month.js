import React, { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";

import { formatNames } from "@use-date-input/common";
import createCalendarModel from "../createCalendarModel";
import { useDateAPI } from "../CalendarProvider";
import { StyledMonthTitle, StyledWeekRow } from "./style";
import { CustomisableWeek } from "../Week";
import { CustomisableWeekHeader } from "../WeekHeader";

const Month = forwardRef(function Month({ className, month }, ref) {
  const dateAPI = useDateAPI();
  const { toFormattedDate } = dateAPI;
  const children = useMemo(() => {
    const calendarModel = createCalendarModel(month, dateAPI);
    return calendarModel.map((week, weekNum) => (
      <CustomisableWeek
        key={`week-${weekNum}`}
        days={week}
        parentMonth={month}
      />
    ));
  }, [dateAPI, month]);

  return (
    <div className={className} ref={ref}>
      <StyledMonthTitle>
        {toFormattedDate(month, formatNames.MONTH_FULL)}
      </StyledMonthTitle>
      <CustomisableWeekHeader />
      <StyledWeekRow role="grid">{children}</StyledWeekRow>
    </div>
  );
});

Month.propTypes = {
  /** Class name of root element */
  className: PropTypes.string,
  /** Month object */
  month: PropTypes.object
};

export default memo(Month);
