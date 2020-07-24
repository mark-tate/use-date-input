import React from "react";
import { render } from "test-utils";
import { setWeekOffset, resetMocks, setAdapter } from "../../CalendarProvider";
import { formatNames } from "@use-date-input/common";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";

import WeekHeader from "../WeekHeader";

jest.mock("../../CalendarProvider");

describe("given WeekHeader", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("for $api", ({ adapter, weekOffset }) => {
    let dateAPI;
    beforeEach(() => {
      dateAPI = createDateAPI({ adapter, weekOffset });
      setAdapter(adapter);
      setWeekOffset(weekOffset);
    });
    afterEach(() => {
      resetMocks();
    });

    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      render(<WeekHeader ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders the default header with no offset", () => {
      const sampleDay = dateAPI.createDate("2019-01-01");
      const firstDayOfWeek = dateAPI.toFormattedDate(
        dateAPI.startOfWeek(sampleDay),
        formatNames.DAY_OF_WEEK_ABBREVIATED
      );
      const { getAllByText } = render(<WeekHeader />);

      const days = getAllByText(/M|T|W|F|S/);
      expect(days.length).toEqual(7);
      expect(days[0].textContent).toEqual(firstDayOfWeek);
    });
  });
});
