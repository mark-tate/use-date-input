import React from "react";
import { render } from "@testing-library/react";

import { setComponents } from "../../CalendarProvider";
import { CustomisableAnimatedGroup } from "../index";

jest.mock("../../CalendarProvider");

describe("given AnimatedGroup", () => {
  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ AnimatedGroup: TestComponent });
    const { getByText } = render(<CustomisableAnimatedGroup />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
