import React from "react";
import { render } from "@testing-library/react";
import { setComponents } from "../../CalendarProvider";

import { CustomisableRoot } from "../index";
import TestUtils from "../../test-utils";
import { setVisibleFromDate } from "../../CalendarProvider";
import createDateAPI from "../../createDateAPI";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";

jest.mock("../../CalendarProvider");

describe("given Root", () => {
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    const dateAPI = createDateAPI({ adapter: dateFnsAdapter });
    setVisibleFromDate(dateAPI.createDate("2019-08-01"));
    render(
      <TestUtils>
        <CustomisableRoot ref={ref} />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ Root: TestComponent });
    const { getByText } = render(<CustomisableRoot />);
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
