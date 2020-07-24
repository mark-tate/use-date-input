import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Popper from "../index";
import { useCalendarDispatch } from "../../CalendarProvider";

jest.mock("../../CalendarProvider");

describe("given Popper", () => {
  it("closes on key Escape", () => {
    let setOpen;
    const TestComponent = () => {
      ({ setOpen } = useCalendarDispatch());
      return <input data-testid="test-child" />;
    };
    const { getByTestId } = render(
      <Popper open={true} anchorEl={document.body}>
        <TestComponent />
      </Popper>
    );
    const child = getByTestId("test-child");
    child.focus();
    fireEvent.keyDown(child, { key: "Escape", keyCode: 27 });
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
