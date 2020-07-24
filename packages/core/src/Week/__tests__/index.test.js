import React from "react";
import { render } from "@testing-library/react";
import { setComponents } from "../../CalendarProvider";

import { CustomisableWeek } from "../index";
import TestUtils from "../../test-utils";

jest.mock("../../CalendarProvider");

describe("given Week", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(
      <TestUtils>
        <CustomisableWeek days={[]} ref={ref} />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ Week: TestComponent });
    const { getByText } = render(<CustomisableWeek />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
