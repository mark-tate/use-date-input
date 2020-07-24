import React from "react";
import { render } from "@testing-library/react";

import { setComponents } from "../../CalendarProvider";
import { CustomisableAnimatedMonthGroup } from "../index";

jest.mock("../../CalendarProvider");

describe("given AnimatedMonthGroup", () => {
  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ AnimatedGroup: TestComponent });
    const { getByText } = render(<CustomisableAnimatedMonthGroup />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
