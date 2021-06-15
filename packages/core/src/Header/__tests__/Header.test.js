import React from "react";
import { fireEvent, render } from "test-utils";
import {
  navigateNextMock,
  navigatePreviousMock,
  resetMocks,
  setVisibleFromDate,
  setWeekOffset
} from "../../CalendarProvider";
import { adapter as dateFnsAdapter } from "@use-date-input/date-fns-adapter";
import { adapter as dayjsAdapter } from "@use-date-input/dayjs-adapter";
import { adapter as  luxonAdapter } from "@use-date-input/luxon-adapter";
import { adapter as momentAdapter } from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";
import { setAdapter } from "../../CalendarProvider";

import Header from "../Header";

jest.mock("../../CalendarProvider");

describe("given Header", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("for $api", ({ adapter, weekOffset }) => {
    beforeEach(() => {
      const { createDate } = createDateAPI({ adapter, weekOffset });
      const month = createDate("2019-01-01");
      setVisibleFromDate(month);
      setAdapter(adapter);
      setWeekOffset(weekOffset);
    });
    afterEach(() => {
      resetMocks();
    });

    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      render(<Header ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("can navigate to previous month", () => {
      const { getByLabelText } = render(<Header />);
      fireEvent.click(getByLabelText(/move to previous month/));
      expect(navigatePreviousMock).toHaveBeenCalled();
    });

    it("can navigate to next month", () => {
      const { getByLabelText } = render(<Header />);
      fireEvent.click(getByLabelText(/move to next month/));
      expect(navigateNextMock).toHaveBeenCalled();
    });

    it("renders the current year in the header", () => {
      const { getByText } = render(<Header />);
      expect(getByText("2019")).toBeInTheDocument();
    });
  });
});
