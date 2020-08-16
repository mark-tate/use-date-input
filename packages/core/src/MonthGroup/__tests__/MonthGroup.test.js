import React from "react";
import { render } from "test-utils";
import {
  resetMocks,
  setAdapter,
  setNumOfColumns,
  setNumOfVisibleMonths,
  setVisibleFromDate,
  setWeekOffset
} from "../../CalendarProvider";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";
import dayjsAdapter from "@use-date-input/dayjs-adapter";
import luxonAdapter from "@use-date-input/luxon-adapter";
import momentAdapter from "@use-date-input/moment-adapter";
import createDateAPI from "../../createDateAPI";
import { act } from "@testing-library/react";

import MonthGroup from "../MonthGroup";

jest.mock("../../CalendarProvider");
jest.useFakeTimers();

describe.only("given MonthGroup", () => {
  describe.each`
    api           | adapter           | weekOffset
    ${"date-fns"} | ${dateFnsAdapter} | ${0}
    ${"dayjs"}    | ${dayjsAdapter}   | ${0}
    ${"luxon"}    | ${luxonAdapter}   | ${-1}
    ${"moment"}   | ${momentAdapter}  | ${0}
  `("for $api", ({ adapter, weekOffset }) => {
    const { createDate } = createDateAPI({ adapter, weekOffset });
    beforeEach(() => {
      setAdapter(adapter);
      setWeekOffset(weekOffset);
      setNumOfColumns(3);
      setNumOfVisibleMonths(6);
    });
    afterEach(() => {
      resetMocks();
    });

    it("passes the ref to the DOM", () => {
      const ref = React.createRef();
      render(
        <MonthGroup ref={ref} visibleFromDate={createDate("2019-08-02")} />
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders a month group", () => {
      const { getByText, getAllByTestId } = render(
        <MonthGroup visibleFromDate={createDate("2019-08-02")} />
      );
      const rows = getAllByTestId("month-group-row");
      expect(getByText("August")).toBeInTheDocument();
      expect(rows.length).toEqual(2);
      expect(rows[0].children.length).toEqual(3);
      expect(rows[1].children.length).toEqual(3);
      setVisibleFromDate(createDate("2019-09-03"));
      act(() => {
        jest.runAllTimers();
      });
      expect(getByText("September")).toBeInTheDocument();
    });
  });
});
