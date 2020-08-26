import React, { useCallback, useState } from "react";
import { action } from "@storybook/addon-actions";
import { Calendar, createDateAPI } from "../packages/core";
import { adapter as dateAdapter } from "../packages/date-fns-adapter";

export default {
  title: "0 - Single Date"
};

const { createDate } = createDateAPI({ adapter: dateAdapter });

const useChangeAction = () =>
  useCallback(selectedDate => {
    action("changed selected date")(selectedDate);
  }, []);

const useStateChangeAction = () =>
  useCallback((state, changes) => {
    action("state changed")(changes, state);
  }, []);

export const Month = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
Month.story = {
  name: "1 month"
};

export const TwoMonths = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      numOfVisibleMonths={2}
      numOfColumns={2}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
TwoMonths.story = {
  name: "2 months"
};

export const SixMonths = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      numOfVisibleMonths={6}
      numOfColumns={3}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
SixMonths.story = {
  name: "6 months"
};

export const TwelveMonths = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      numOfVisibleMonths={12}
      numOfColumns={4}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
TwelveMonths.story = {
  name: "12 months"
};

export const InitialDateSelected = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      initialSelectedDate={createDate("2020-02-20")}
      initialVisibleFromMonth={createDate("2020-02-01")}
      numOfVisibleMonths={12}
      numOfColumns={3}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
InitialDateSelected.story = {
  name: "Initial date selected"
};

export const Controlled = () => {
  const [, setDate] = useState(createDate("2020-01-01"));
  const handleChange = selectedDate => {
    setDate(selectedDate);
    action("changed selected date")(selectedDate);
  };
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      numOfVisibleMonths={12}
      numOfColumns={3}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
Controlled.story = {
  name: "Controlled"
};
