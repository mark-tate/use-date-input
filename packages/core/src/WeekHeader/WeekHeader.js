import React, { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { CustomisableDayOfWeek } from "../DayOfWeek";
import { useDateAPI } from "../CalendarProvider";
import { formatNames } from "@use-date-input/common";

const WeekHeader = forwardRef(function WeekHeader({ className }, ref) {
  const { addDays, createDate, startOfWeek, toFormattedDate } = useDateAPI();
  const children = useMemo(() => {
    const firstDayOfWeek = startOfWeek(createDate());
    const weekdays = [...new Array(7)].map((value, index) =>
      addDays(firstDayOfWeek, index)
    );
    return weekdays.map(dow => {
      const dowShortLabel = toFormattedDate(
        dow,
        formatNames.DAY_OF_WEEK_ABBREVIATED
      );
      const dowLongLabel = toFormattedDate(dow, formatNames.DAY_OF_WEEK_FULL);
      return (
        <CustomisableDayOfWeek key={`dow-${dow}`} description={dowLongLabel}>
          {dowShortLabel}
        </CustomisableDayOfWeek>
      );
    });
  }, [addDays, createDate, toFormattedDate, startOfWeek]);
  return (
    <div className={className} data-testid="dow-header" ref={ref}>
      {children}
    </div>
  );
});

WeekHeader.propTypes = {
  /* Classname */
  className: PropTypes.string
};

export default memo(WeekHeader);
