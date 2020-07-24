import React from "react";
import { CSSTransition } from "react-transition-group";
import { render } from "@testing-library/react";

import AnimatedGroup from "../AnimatedGroup";

jest.mock("react-transition-group", () => {
  const FakeTransitionGroup = jest.fn(({ children }) => children);
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn(props => (
    <FakeTransition>{props.children}</FakeTransition>
  ));
  return {
    CSSTransition: FakeCSSTransition,
    Transition: FakeTransition,
    TransitionGroup: FakeTransitionGroup
  };
});

describe("given AnimatedGroup", () => {
  it("renders an animated group", () => {
    const children = expect.any(Object);
    const onEnterMock = jest.fn();
    const onExitedMock = jest.fn();
    const { getByText } = render(
      <AnimatedGroup
        onEnter={onEnterMock}
        onExited={onExitedMock}
        transitionKey={"testKey"}
      >
        <span>2020</span>
      </AnimatedGroup>
    );
    const defaultProps = {
      children,
      timeout: 1200,
      classNames: "page",
      onEnter: onEnterMock,
      onExited: onExitedMock
    };
    const context = expect.any(Object);
    expect(CSSTransition).toHaveBeenCalledWith(
      expect.objectContaining(defaultProps),
      context
    );
    expect(getByText("2020")).toBeInTheDocument();
  });
});
