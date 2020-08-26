import React, { useMemo } from "react";
import Dropdown from "./DemoDropdown";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import {
  useCalendarDispatch,
  useCalendarState,
  useDateAPI
} from "@use-date-input/core";
import { formatNames } from "@use-date-input/common";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "10px"
  }
});

const createMonthSource = ({ addMonths, createDate, toFormattedDate }) => {
  const monthStart = createDate();
  return [...Array(12)].map((unused, index) => {
    const month = addMonths(monthStart, index);
    const monthValue = toFormattedDate(month, formatNames.MONTH);
    const monthLabel = toFormattedDate(month, formatNames.MONTH_FULL);
    return {
      key: `monthValue-${index}`,
      value: monthValue,
      label: monthLabel
    };
  });
};

const createYearSource = (
  fromDate,
  { addYears, startOfMonth, subtractYears, toFormattedDate }
) => {
  const yearStart = subtractYears(startOfMonth(fromDate), 5);
  return [...Array(10)].map((unused, index) => {
    const year = toFormattedDate(
      addYears(yearStart, index),
      formatNames.HEADER
    );
    return {
      key: `year-${year}`,
      value: year,
      label: year
    };
  });
};
export default function DemoHeader() {
  const classes = useStyles();
  const { visibleFromDate } = useCalendarState();
  const dateAPI = useDateAPI();
  const {
    navigateNext,
    navigatePrevious,
    setVisibleFromDate
  } = useCalendarDispatch();
  const monthSource = useMemo(() => createMonthSource(dateAPI), [dateAPI]);
  const yearSource = useMemo(() => createYearSource(visibleFromDate, dateAPI), [
    dateAPI,
    visibleFromDate
  ]);
  const handlePrevious = () => {
    navigatePrevious();
  };
  const handleNext = () => {
    navigateNext();
  };
  const handleYearChange = year => {
    const newVisibleFromDate = dateAPI.set(visibleFromDate, { year });
    setVisibleFromDate(newVisibleFromDate);
  };
  const handleMonthChange = month => {
    const newVisibleFromDate = dateAPI.set(visibleFromDate, {
      month: month - 1
    });
    setVisibleFromDate(newVisibleFromDate);
  };

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="previous month"
        onClick={handlePrevious}
        size="small"
      >
        <ChevronLeft fontSize="inherit" />
      </IconButton>
      <Dropdown
        label={"Month"}
        labelId={"select-month-year"}
        onChange={handleMonthChange}
        selectedValue={dateAPI.toFormattedDate(
          visibleFromDate,
          formatNames.MONTH
        )}
        source={monthSource}
      />
      <Dropdown
        label={"Year"}
        labelId={"select-label-year"}
        onChange={handleYearChange}
        selectedValue={dateAPI.toFormattedDate(
          visibleFromDate,
          formatNames.YEAR
        )}
        source={yearSource}
      />
      <IconButton aria-label="next month" onClick={handleNext} size="small">
        <ChevronRight fontSize="inherit" />
      </IconButton>
    </div>
  );
}
