import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useForkRef } from "@use-date-input/common";

export const ClickOutside = forwardRef(function ClickOutside(
  { children, onClickOutside, ignoreClickOutsideRefs = [], ...rest },
  ref
) {
  const containerRef = useRef(null);
  const handleRef = useForkRef(ref, containerRef);

  const listener = useCallback(
    event => {
      const hasClickedIgnoreList = [
        containerRef,
        ...ignoreClickOutsideRefs
      ].some(ref => {
        return ref.current && ref.current.contains(event.target);
      });
      if (!hasClickedIgnoreList && onClickOutside) {
        onClickOutside(event);
      }
    },
    [containerRef, onClickOutside, ignoreClickOutsideRefs]
  );

  useEffect(() => {
    const ownerDocument =
      (containerRef &&
        containerRef.current &&
        containerRef.current.ownerDocument) ||
      document;
    ownerDocument.addEventListener("mousedown", listener);
    ownerDocument.addEventListener("touchstart", listener);
    return () => {
      ownerDocument.removeEventListener("mousedown", listener);
      ownerDocument.removeEventListener("touchstart", listener);
    };
  }, [containerRef, listener]);

  return (
    <div ref={handleRef} {...rest}>
      {children}
    </div>
  );
});

ClickOutside.propTypes = {
  /** Children to monitor for click outside events */
  children: PropTypes.node,
  /** Callback called when the mouse is clicked outside */
  onClickOutside: PropTypes.func,
  /** Additional array of refs, will ignore click outside from **/
  ignoreClickOutsideRefs: PropTypes.array
};

export default ClickOutside;
