import React from "react";
import styled from "styled-components";
import { createDateAPI, Calendar, Day } from "../packages/core";
import { adapter as dateAdapter } from "../packages/date-fns-adapter";
import isWeekend from "date-fns/isWeekend";
import getDay from "date-fns/getDay";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

const { createDate } = createDateAPI({ adapter: dateAdapter });

const useChangeAction = () => selectedDate => {
  action("change selected date")(selectedDate);
};

export default {
  title: "8 - Custom Dates"
};

const UnavailableDay = styled(Day)(props => ({
  background: 'url("./cross.svg")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom 6px right 5px",
  backgroundSize: "50% 50%, auto"
}));

const isMonday = date => getDay(date) === 1;

function BlockoutMondaysRenderer(props) {
  if (getDay(props.day) === 1) {
    return (
      <span style={{ cursor: "not-allowed" }}>
        <UnavailableDay {...props} disabled />
      </span>
    );
  }
  return <Day {...props} />;
}

export const BlockOutMondays = () => {
  const handleChange = useChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      components={{
        Day: BlockoutMondaysRenderer
      }}
      isDayDisabled={isMonday}
      onChange={handleChange}
      numOfVisibleMonths={12}
      numOfColumns={4}
      weekOffset={1}
    />
  );
};
BlockOutMondays.story = {
  name: "Blockout Mondays"
};

function JustWeekdaysRenderer(props) {
  const disableWeekendProps = isWeekend(props.day) && {
    disabled: true,
    day: undefined
  };
  return <Day {...props} {...disableWeekendProps} />;
}

export const NoWeekends = () => {
  const handleChange = useChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      allowRange
      components={{
        Day: JustWeekdaysRenderer
      }}
      isDayDisabled={isWeekend}
      onChange={handleChange}
      numOfVisibleMonths={12}
      numOfColumns={4}
      weekOffset={1}
    />
  );
};
NoWeekends.story = {
  name: "No Weekends"
};

const doesNotOverlapWeekendValidator = (startDate, endDate) => {
  if (!startDate || !endDate || startDate === endDate) {
    return true;
  }
  const overlapsWeekend = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).some(interval => {
    return isWeekend(interval);
  });
  return !overlapsWeekend;
};

export const ValidateRanges = () => {
  const handleChange = useChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      allowRange
      components={{
        Day: JustWeekdaysRenderer
      }}
      isRangeValid={doesNotOverlapWeekendValidator}
      onChange={handleChange}
      numOfVisibleMonths={12}
      numOfColumns={4}
      weekOffset={1}
    />
  );
};
ValidateRanges.story = {
  name: "Validate Date Range"
};

function KitcheSinkRenderer(props) {
  if (isWeekend(props.day)) {
    return <Day {...props} disabled day={undefined} />;
  } else if (getDay(props.day) === 1) {
    return (
        <span style={{ cursor: "not-allowed" }}>
        <UnavailableDay {...props} disabled />
      </span>
    );
  }
  return <Day {...props} />;
}

const kitchenSinkDayValidator = day => isWeekend(day) || isMonday(day);

const kitchenSinkRangeValidator = (startDate, endDate) => {
  if (!startDate || !endDate || startDate === endDate) {
    return true;
  }
  console.log(startDate, endDate);
  const overlapsDisabledDate = eachDayOfInterval({ start: startDate, end: endDate}).some(interval => kitchenSinkDayValidator(interval));
  return !overlapsDisabledDate;
};

export const KitchenSink = () => {
  const handleChange = useChangeAction();
  return (
    <Calendar
      adapter={dateAdapter}
      allowRange
      components={{
        Day: KitcheSinkRenderer
      }}
      isDayDisabled={kitchenSinkDayValidator}
      isRangeValid={kitchenSinkRangeValidator}
      onChange={handleChange}
      numOfVisibleMonths={12}
      numOfColumns={4}
      weekOffset={1}
    />
  );
};
KitchenSink.story = {
  name: "Kitchen Sink"
};
