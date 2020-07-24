import React from "react";
import { render } from "@testing-library/react";
import { setComponents } from "../../CalendarProvider";
import TestUtils from "../../test-utils";

import { CustomisableDayOfWeek } from "../index";

jest.mock("../../CalendarProvider");

describe("given DayOfWeek", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(
      <TestUtils>
        <CustomisableDayOfWeek ref={ref} />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ DayOfWeek: TestComponent });
    const { getByText } = render(<CustomisableDayOfWeek />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
