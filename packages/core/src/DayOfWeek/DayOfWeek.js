import React, { forwardRef } from "react";
import PropTypes from "prop-types";

export const DayOfWeek = forwardRef(function DayOfWeek(
  { children, className, description },
  ref
) {
  return (
    <div aria-label={description} className={className} ref={ref}>
      {children}
    </div>
  );
});
DayOfWeek.propTypes = {
  /** Day of week node */
  children: PropTypes.node,
  /** Class name of root element */
  className: PropTypes.string,
  /** Day of week expanded label */
  description: PropTypes.string
};

export default DayOfWeek;
