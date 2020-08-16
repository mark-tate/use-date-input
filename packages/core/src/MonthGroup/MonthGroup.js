import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import PropTypes from "prop-types";
import { useCalendarProps, useDateAPI } from "../CalendarProvider";

import { StyledCell, StyledRow } from "./style";
import { CustomisableMonth } from "../Month";
import AnimatedMonthGroup from "../AnimatedMonthGroup/AnimatedMonthGroup";
import useForkRef from "../useForkRef";

const chunk = (values, chunkSize = 1) => {
  const valueCopy = [...values];
  const result = [];
  while (valueCopy.length) result.push(valueCopy.splice(0, chunkSize));
  return result;
};

function DefaultMonthGroup({
  firstColumnRef,
  numOfColumns,
  numOfVisibleMonths,
  visibleFromDate,
  dateAPI: { addMonths }
}) {
  let monthOffset = 0;
  const rows = chunk([...Array(numOfVisibleMonths)], numOfColumns);
  const children = rows.reduce((rowAcc, cells, rowIndex) => {
    const row = cells.reduce((cellAcc, col, colIndex) => {
      const visibleFromMonth = addMonths(visibleFromDate, monthOffset);
      monthOffset = monthOffset + 1;
      let cellProps = {
        key: `r${rowIndex}-c${colIndex}`
      };
      if (rowIndex === 0 && colIndex === 0) {
        cellProps = {
          ...cellProps,
          ref: firstColumnRef
        };
      }
      cellAcc.push(
        <StyledCell {...cellProps}>
          <CustomisableMonth month={visibleFromMonth} />
        </StyledCell>
      );
      return cellAcc;
    }, []);
    rowAcc.push(
      <StyledRow data-testid="month-group-row" key={`r${rowIndex}`}>
        {row}
      </StyledRow>
    );
    return rowAcc;
  }, []);
  return children;
}
DefaultMonthGroup.propTypes = {
  firstColumnRef: PropTypes.object,
  numOfColumns: PropTypes.number,
  numOfVisibleMonths: PropTypes.number,
  visibleFromDate: PropTypes.object,
  dateAPI: PropTypes.object
};

const MonthGroup = forwardRef(function MonthGroup(
  { className, visibleFromDate },
  ref
) {
  const { numOfColumns, numOfVisibleMonths } = useCalendarProps();
  const dateAPI = useDateAPI();
  const { isSameDay } = useDateAPI();
  const firstColumnRef = useRef(null);
  const groupRef = useRef(null);
  const visibleFromDatesBuffer = useRef([]);
  const lastVisibleFromDate = useRef();
  const currentlyAnimating = useRef();
  const hasVisibleFromDateChanged = !dateAPI.isSameDay(
    lastVisibleFromDate.current,
    visibleFromDate
  );
  lastVisibleFromDate.current = visibleFromDate;
  const [animating, setAnimating] = useState();

  const handleRef = useForkRef(ref, groupRef);
  if (
    hasVisibleFromDateChanged &&
    (!visibleFromDatesBuffer.current.length ||
      (visibleFromDatesBuffer.current.length &&
        !isSameDay(
          visibleFromDate,
          visibleFromDatesBuffer.current[
            visibleFromDatesBuffer.current.length - 1
          ]
        )))
  ) {
    visibleFromDatesBuffer.current = [
      ...visibleFromDatesBuffer.current,
      visibleFromDate
    ];
  }
  let nextVisibleFromDate;
  if (!animating && visibleFromDatesBuffer.current.length) {
    nextVisibleFromDate = visibleFromDatesBuffer.current.slice(0, 1)[0];
    visibleFromDatesBuffer.current = visibleFromDatesBuffer.current.slice(1);
  } else {
    nextVisibleFromDate = currentlyAnimating.current;
  }
  const handleEnter = useCallback(() => setAnimating(true), []);
  const handleExited = useCallback(() => setAnimating(false), []);
  const children = useMemo(
    () => (
      <DefaultMonthGroup
        firstColumnRef={firstColumnRef}
        numOfColumns={numOfColumns}
        numOfVisibleMonths={numOfVisibleMonths}
        visibleFromDate={nextVisibleFromDate}
        dateAPI={dateAPI}
      />
    ),
    [
      dateAPI,
      firstColumnRef,
      nextVisibleFromDate,
      numOfColumns,
      numOfVisibleMonths
    ]
  );
  currentlyAnimating.current = nextVisibleFromDate;
  return (
    <div className={className} ref={handleRef}>
      <AnimatedMonthGroup
        firstColumnRef={firstColumnRef}
        groupRef={groupRef}
        onEnter={handleEnter}
        onExited={handleExited}
        visibleFromDate={nextVisibleFromDate}
      >
        {children}
      </AnimatedMonthGroup>
    </div>
  );
});
MonthGroup.propTypes = {
  /** Class name of root element */
  className: PropTypes.string,
  /** Visible from date */
  visibleFromDate: PropTypes.object
};

export default MonthGroup;
