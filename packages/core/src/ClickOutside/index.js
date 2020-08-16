import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useForkRef from "../useForkRef";

export const ClickOutside = forwardRef(function ClickOutside(
  { children, onClickOutside, whitelistRefs, ...rest },
  ref
) {
  const containerRef = useRef(null);
  const handleRef = useForkRef(ref, containerRef);
  const ownerDocument =
    (containerRef &&
      containerRef.current &&
      containerRef.current.ownerDocument) ||
    document;

  const listener = useCallback(
    event => {
      const hasClickedWhiteList = [containerRef, ...whitelistRefs].some(ref => {
        return ref.current && ref.current.contains(event.target);
      });
      if (!hasClickedWhiteList) {
        onClickOutside(event);
      }
    },
    [containerRef, onClickOutside, whitelistRefs]
  );

  useEffect(() => {
    ownerDocument.addEventListener("mousedown", listener);
    ownerDocument.addEventListener("touchstart", listener);
    return () => {
      ownerDocument.removeEventListener("mousedown", listener);
      ownerDocument.removeEventListener("touchstart", listener);
    };
  }, [listener, ownerDocument]);

  return (
    <div ref={handleRef} {...rest}>
      {children}
    </div>
  );
});

ClickOutside.propTypes = {
  /** children to monitor for click outside events */
  children: PropTypes.node,
  /** Callback called when the mouse is clicked outside */
  onClickOutside: PropTypes.func,
  /** List of additional elements to ignore mouse clicks */
  whitelistRefs: PropTypes.array
};

export default ClickOutside;
