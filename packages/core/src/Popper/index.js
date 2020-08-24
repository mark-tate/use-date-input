import React, { forwardRef, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import ClickOutside from "../ClickOutside";
import { useCalendarDispatch } from "../CalendarProvider";
import useForkRef from "../useForkRef";

import { usePopper } from "react-popper";

const Popper = forwardRef(
  (
    {
      anchorEl,
      children,
      clickOutsideWhiteList,
      onClickOutside,
      open,
      ...popperProps
    },
    ref
  ) => {
    const [popperElement, setPopperElement] = React.useState(null);
    const handleRef = useForkRef(ref, setPopperElement);
    const { styles, attributes } = usePopper(
      anchorEl,
      popperElement,
      popperProps
    );
    const { setOpen } = useCalendarDispatch();
    const handleKeyDown = useCallback(
      event => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      },
      [setOpen]
    );
    if (!open) {
      return null;
    }
    return (
      <>
        {createPortal(
          <div ref={handleRef} style={styles.popper} {...attributes.popper}>
            <ClickOutside
              onClickOutside={onClickOutside}
              onKeyDown={handleKeyDown}
              whitelistRefs={clickOutsideWhiteList}
            >
              {children}
            </ClickOutside>
          </div>,
          document.querySelector("body")
        )}
      </>
    );
  }
);
Popper.displayName = "Popper";
Popper.propTypes = {
  /** Anchor element */
  anchorEl: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Popper content */
  children: PropTypes.node,
  /** Click outside white list, will not close the Popper, if clicked **/
  clickOutsideWhiteList: PropTypes.array,
  /** Callback on click outside **/
  onClickOutside: PropTypes.func,
  /** Open/close popper */
  open: PropTypes.bool
};
export default Popper;
