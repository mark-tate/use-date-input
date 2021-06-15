import { formatNames } from "@use-date-input/common";

import { adapter } from "../index";

const { createDate, format, getDateFormat } = adapter();

const toFormattedDate = (date, formatName) => {
  const formatter = getDateFormat(formatName);
  return typeof formatter === "function"
    ? formatter(date)
    : format(date, formatter);
};

describe("given luxon formats", () => {
  it("can format ARIA Day Labels", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.ARIA_DAY_LABEL)).toEqual(
      "Saturday, February 1, 2020"
    );
  });

  it("can format ARIA Start Date Labels", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.ARIA_START_LABEL)).toEqual(
      "Selected Saturday, February 1, 2020 as start date"
    );
  });

  it("can format ARIA End Date Labels", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.ARIA_END_LABEL)).toEqual(
      "Selected Saturday, February 1, 2020 as end date"
    );
  });

  it("can format Header Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.HEADER)).toEqual("2020");
  });

  it("can format a Day Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.DAY)).toEqual("1");
  });

  it("can format a Day Of Week Abbreviated Label", () => {
    const testDate = createDate("2020-02-01");
    expect(
      toFormattedDate(testDate, formatNames.DAY_OF_WEEK_ABBREVIATED)
    ).toEqual("S");
  });

  it("can format a Day Of Week Full Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.DAY_OF_WEEK_FULL)).toEqual(
      "Saturday"
    );
  });

  it("can format a Month Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.MONTH)).toEqual("2");
  });

  it("can format a Month Abbreviated Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.MONTH_ABBREVIATED)).toEqual(
      "Feb"
    );
  });

  it("can format a Month Full Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.MONTH_FULL)).toEqual(
      "February"
    );
  });

  it("can format a Month Label", () => {
    const testDate = createDate("2020-02-01");
    expect(toFormattedDate(testDate, formatNames.YEAR)).toEqual("2020");
  });
});
