import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Calendar, createDateAPI } from "../packages/core";
import dateAdapter from "../packages/date-fns-adapter";

export default {
  title: "1 - Date Range"
};

const { addWeeks, createDate } = createDateAPI({ adapter: dateAdapter });

const useChangeAction = () => selectedDate => {
  action("select date range")(selectedDate[0], selectedDate[1]);
};

const useStateChangeAction = () => (state, changes) => {
  action("state changed")(changes, state);
};

export const Month = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      allowRange
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};
Month.story = {
  name: "1 month"
};

export const InitialSelected = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      onChange={handleChange}
      allowRange
      initialSelectedDate={[createDate("2020-02-20"), createDate("2020-02-27")]}
      initialVisibleFromMonth={createDate("2020-02-01")}
      numOfVisibleMonths={12}
      numOfColumns={4}
      onStateChange={handleStateChange}
    />
  );
};
InitialSelected.story = {
  name: "Initial date selected"
};

export const Controlled = () => {
  const [date, setDate] = useState([createDate(), addWeeks(createDate(), 1)]);
  const handleChange = selectedDate => {
    setDate(selectedDate);
    action("select date range")(selectedDate[0], selectedDate[1]);
  };
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      allowRange
      numOfVisibleMonths={12}
      numOfColumns={4}
      onChange={handleChange}
      onStateChange={handleStateChange}
      selectedDate={date}
    />
  );
};
Controlled.story = {
  name: "Controlled state"
};
