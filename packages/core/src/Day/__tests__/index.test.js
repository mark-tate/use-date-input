import React from "react";
import { render } from "@testing-library/react";
import createDateAPI from "../../createDateAPI";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";

import { setComponents } from "../../CalendarProvider";

import { CustomisableDay } from "../index";
import Day from "../Day";

jest.mock("../../CalendarProvider");

describe("given Day", () => {
  it("passes the ref to the DOM", () => {
    const dateAPI = createDateAPI({ adapter: dateFnsAdapter });
    const { createDate, toFormattedDate } = dateAPI;
    const ref = React.createRef();
    const day = createDate("2019-01-10");
    render(<Day day={day} ref={ref} toFormattedDate={toFormattedDate} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ Day: TestComponent });
    const { getByText } = render(<CustomisableDay />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
