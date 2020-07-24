import React from "react";
import { render } from "@testing-library/react";

import createDateAPI from "../../createDateAPI";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import { setComponents } from "../../CalendarProvider";
import { CustomisableMonth } from "../index";
import TestUtils from "../../test-utils";
import Month from "../Month";

jest.mock("../../CalendarProvider");

describe("given Month", () => {
  it("passes the ref to the DOM", () => {
    const dateAPI = createDateAPI({ adapter: dateFnsAdapter });
    const { createDate } = dateAPI;
    const ref = React.createRef();
    const month = createDate("2019-01-01");
    render(
      <TestUtils>
        <Month month={month} ref={ref} />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ Month: TestComponent });
    const { getByText } = render(<CustomisableMonth />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
