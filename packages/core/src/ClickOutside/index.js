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
  children: PropTypes.node,
  onClickOutside: PropTypes.func,
  whitelistRefs: PropTypes.array
};

export default ClickOutside;
