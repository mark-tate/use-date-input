import React, { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";

import Popper from "../Popper";

describe("given Popper", () => {
  it("closes on key Escape", () => {
    const onEscapeKey = jest.fn();
    const { getByTestId } = render(
      <Popper open={true} anchorEl={document.body} onEscapeKey={onEscapeKey}>
        <input data-testid="test-child" />
      </Popper>
    );
    const child = getByTestId("test-child");
    fireEvent.focus(child);
    fireEvent.keyDown(child, { key: "Escape", keyCode: 27 });
    expect(onEscapeKey).toHaveBeenCalled();
  });
  it("only closes when clicked outside", () => {
    const onClickOutside = jest.fn();
    const ignoreClickOutsideRef = createRef();
    const { getByTestId } = render(
      <div>
        <input data-testid="outside-child" />
        <input
          data-testid="ignored-outside-child"
          ref={ignoreClickOutsideRef}
        />
        <Popper
          anchorEl={document.body}
          ignoreClickOutsideRefs={[ignoreClickOutsideRef]}
          onClickOutside={onClickOutside}
          open={true}
        >
          <input data-testid="inside-child" />
        </Popper>
      </div>
    );
    fireEvent.mouseDown(getByTestId("inside-child"));
    expect(onClickOutside).not.toHaveBeenCalled();
    fireEvent.mouseDown(getByTestId("ignored-outside-child"));
    expect(onClickOutside).not.toHaveBeenCalled();
    fireEvent.mouseDown(getByTestId("outside-child"));
    expect(onClickOutside).toHaveBeenCalled();
  });
});
