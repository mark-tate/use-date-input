import React, { useEffect, useRef } from "react";
import { CustomisableAnimatedGroup } from "../AnimatedGroup";
import PropTypes from "prop-types";
import { useCalendarProps, useDateAPI } from "../CalendarProvider";

function AnimatedMonthGroup({
  firstColumnRef,
  groupRef,
  visibleFromDate,
  ...rest
}) {
  const { numOfColumns } = useCalendarProps();
  const dateAPI = useDateAPI();

  const lastMovement = useRef(0);
  const lastDirection = useRef();
  const firstColumnWidth = useRef(0);
  const groupWidth = useRef(0);

  const lastAnimatedDate = useRef(visibleFromDate);

  useEffect(() => {
    if (firstColumnRef.current) {
      firstColumnWidth.current = firstColumnRef.current.clientWidth;
    }
    if (groupRef.current) {
      groupWidth.current = groupRef.current.clientWidth;
    }
  });

  let movement = lastMovement.current;
  const dateDiff = dateAPI.diffInMonths(
    lastAnimatedDate.current,
    visibleFromDate
  );
  const absDateDiff = Math.abs(dateDiff);
  if (absDateDiff >= numOfColumns) {
    movement = groupWidth.current;
  } else if (absDateDiff >= 1) {
    movement = absDateDiff * firstColumnWidth.current;
  }

  let animationDirection = lastDirection.current;
  if (dateDiff > 0) {
    animationDirection = "back";
  } else if (dateDiff < 0) {
    animationDirection = "forward";
  }

  const key = `${dateAPI.toFormattedDate(visibleFromDate)}`;
  lastAnimatedDate.current = visibleFromDate;
  lastDirection.current = animationDirection;
  lastMovement.current = movement;
  return (
    <CustomisableAnimatedGroup
      direction={animationDirection}
      durationMsecs={numOfColumns * 400}
      transitionKey={key}
      movement={movement}
      {...rest}
    />
  );
}
AnimatedMonthGroup.propTypes = {
  /** Children */
  children: PropTypes.element,
  /** Ref to the first column */
  firstColumnRef: PropTypes.object.isRequired,
  /** Ref to the MonthGroup */
  groupRef: PropTypes.object.isRequired,
  /** Visible from date, used to control animation between columns and MonthGroup */
  visibleFromDate: PropTypes.object.isRequired
};

export default AnimatedMonthGroup;
