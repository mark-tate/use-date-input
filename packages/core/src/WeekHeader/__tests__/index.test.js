import React from "react";
import { render } from "@testing-library/react";
import { setComponents } from "../../CalendarProvider";

import { CustomisableWeekHeader } from "../index";
import TestUtils from "../../test-utils";

jest.mock("../../CalendarProvider");

describe("given WeekHeader", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(
      <TestUtils>
        <CustomisableWeekHeader ref={ref} />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ WeekHeader: TestComponent });
    const { getByText } = render(<CustomisableWeekHeader />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
