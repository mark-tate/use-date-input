import React, { forwardRef, useCallback } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import ClickOutside from "./ClickOutside";
import { useForkRef } from "@use-date-input/common";

import { usePopper } from "react-popper";

const Popper = forwardRef(
  (
    {
      anchorEl,
      children,
      ignoreClickOutsideRefs,
      onClickOutside,
      onEscapeKey,
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
    const handleKeyDown = useCallback(
      event => {
        if (event.key === "Escape") {
          onEscapeKey();
        }
      },
      [onEscapeKey]
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
              onKeyDown={onEscapeKey ? handleKeyDown : undefined}
              ignoreClickOutsideRefs={ignoreClickOutsideRefs}
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
  /** Array of refs, will not close the Popper, if clicked **/
  ignoreClickOutsideRefs: PropTypes.array,
  /** Callback on click outside **/
  onClickOutside: PropTypes.func,
  /** Callback on escape key press **/
  onEscapeKey: PropTypes.func,
  /** Open/close popper */
  open: PropTypes.bool
};
export default Popper;
