import React from "react";
import { render } from "@testing-library/react";
import { setComponents } from "../../CalendarProvider";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";

import { CustomisableMonthGroup } from "../index";
import TestUtils from "../../test-utils";
import createDateAPI from "../../createDateAPI";

jest.mock("../../CalendarProvider");

describe("given MonthGroup", () => {
  const { createDate } = createDateAPI({ adapter: dateFnsAdapter });
  it("passes the ref to the DOM", () => {
    const ref = React.createRef();
    render(
      <TestUtils>
        <CustomisableMonthGroup
          ref={ref}
          visibleFromDate={createDate("2019-09-03")}
        />
      </TestUtils>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("can be overriden with a custom component", () => {
    const TestComponent = () => "TEST CUSTOM COMPONENT";
    setComponents({ MonthGroup: TestComponent });
    const { getByText } = render(
      <CustomisableMonthGroup visibleFromDate={createDate("2019-09-03")} />
    );
    expect(getByText("TEST CUSTOM COMPONENT")).toBeInTheDocument();
  });
});
