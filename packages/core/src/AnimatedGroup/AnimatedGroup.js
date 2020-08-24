import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { StyledPage } from "./style";

const AnimatedGroup = forwardRef(function AnimatedGroup(
  {
    children,
    className,
    direction,
    durationMsecs,
    movement,
    onEnter,
    onExited,
    transitionKey
  },
  ref
) {
  const childFactory = child =>
    React.cloneElement(child, { direction, movement });
  return (
    <TransitionGroup
      component={"div"}
      childFactory={childFactory}
      className={className}
      ref={ref}
    >
      <CSSTransition
        classNames="page"
        key={transitionKey}
        onEnter={onEnter}
        onExited={onExited}
        timeout={durationMsecs}
      >
        <StyledPage
          direction={direction}
          durationMsecs={durationMsecs}
          movement={movement}
        >
          {children}
        </StyledPage>
      </CSSTransition>
    </TransitionGroup>
  );
});

AnimatedGroup.defaultProps = {
  durationMsecs: 1200
};

AnimatedGroup.propTypes = {
  /** Children */
  children: PropTypes.node,
  /** Class name of root element */
  className: PropTypes.string,
  /** Duration of animation in msecs */
  durationMsecs: PropTypes.number,
  /** Direction of animation */
  direction: PropTypes.oneOf(["forward", "back"]),
  /** Pixel movement required */
  movement: PropTypes.number,
  /** Callback called onEnter */
  onEnter: PropTypes.func,
  /** Callback called onExited */
  onExited: PropTypes.func,
  /** Key for animation */
  transitionKey: PropTypes.string.isRequired
};

export default AnimatedGroup;
