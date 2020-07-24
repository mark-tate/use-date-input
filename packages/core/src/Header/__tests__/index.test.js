import React from "react";
import { render } from "@testing-library/react";
import { setComponents } from "../../CalendarProvider";

import { CustomisableHeader } from "../index";
import TestUtils from "../../test-utils";

jest.mock("../../CalendarProvider");

describe("given Header", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(
      <TestUtils>
        <CustomisableHeader ref={ref} />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ Header: TestComponent });
    const { getByText } = render(<CustomisableHeader />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
