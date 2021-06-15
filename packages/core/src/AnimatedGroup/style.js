import styled, { keyframes } from "styled-components";

const slideInLeft = movement => keyframes`
    from {
        tranform-origin: 100%;
        transform: translate3d(-${movement}px, 0, 0);
    }
    to {
        transform: translate3d(0, 0 ,0);
    }
`;

const slideOutLeft = movement => keyframes`
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-${movement}px, 0 ,0);
    }
`;

const slideInRight = movement => keyframes`
    from {
        transform: translate3d(${movement}px, 0, 0);
    }
    to {
        transform: translate3d(0, 0, 0);
    }
`;

const slideOutRight = movement => keyframes`
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(${movement}px, 0 ,0);
    }
`;

export const StyledPage = styled.div`
  animation-duration: ${({ durationMsecs }) => `${durationMsecs}ms`};
  animation-timing-function: ease-in-out;
  &.page-enter {
    pointer-events: none;
  }
  &.page-enter-active {
    animation-name: ${({ direction, movement }) =>
      direction === "forward" ? slideInRight(movement) : slideInLeft(movement)};
  }
  &.page-exit-active {
    animation-name: ${({ direction, movement }) =>
      direction === "forward"
        ? slideOutLeft(movement)
        : slideOutRight(movement)};
  }
  &.page-exit {
    pointer-events: none;
    position: absolute;
  }
`;

export const withStyledGroup = GroupComponent => styled(GroupComponent)`
  overflow: hidden;
  display: flex;
  position: relative;
  flex-direction: ${({ direction }) =>
    direction === "forward" ? "row-reverse" : "row"};
`;
