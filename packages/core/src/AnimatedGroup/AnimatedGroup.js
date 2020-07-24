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
  children: PropTypes.node,
  className: PropTypes.string,
  durationMsecs: PropTypes.number,
  direction: PropTypes.string,
  movement: PropTypes.number,
  numOfColumns: PropTypes.number,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  transitionKey: PropTypes.string
};

export default AnimatedGroup;
