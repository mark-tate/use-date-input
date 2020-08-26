import React from "react";
import { action } from "@storybook/addon-actions";
import { Calendar } from "../packages/core";
import { adapter as dateFnsAdapter } from "../packages/date-fns-adapter";
import { adapter as dayjsAdapter } from "../packages/dayjs-adapter";
import { adapter as luxonAdapter } from "../packages/luxon-adapter";
import { adapter as momentAdapter } from "../packages/moment-adapter";
import "moment/locale/es";
import "moment/locale/en-gb";
import "dayjs/locale/zh-cn";
import { ru } from "date-fns/locale";

const russianDateFnsAdapter = adapterArgs => {
  const dateFnsAPI = dateFnsAdapter(adapterArgs);
  return {
    ...dateFnsAPI,
    format: (date, formatStr) =>
      dateFnsAPI.format(date, formatStr, { locale: ru })
  };
};

const chineseDayJSAdapter = adapterArgs => {
  const dayjsAPI = dayjsAdapter(adapterArgs);
  return {
    ...dayjsAPI,
    createDate: dateArgs => dayjsAPI.createDate(dateArgs).locale("zh-cn")
  };
};

const spanishMomentAdapter = adapterArgs => {
  const momentAPI = momentAdapter(adapterArgs);
  return {
    ...momentAPI,
    createDate: dateArgs => momentAPI.createDate(dateArgs).locale("es")
  };
};

const frenchLuxonAdapter = adapterArgs => {
  const luxonAPI = luxonAdapter(adapterArgs);
  return {
    ...luxonAPI,
    createDate: date => luxonAPI.createDate(date).setLocale("fr")
  };
};

export default {
  title: "6 - Locales"
};

const useChangeAction = () => selectedDate => {
  action("change selected date")(selectedDate);
};

const useStateChangeAction = () => changes => {
  action("state change")(changes);
};

export const DateFNS = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={russianDateFnsAdapter}
      numOfColumns={3}
      numOfVisibleMonths={12}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};

DateFNS.story = {
  name: "Date FNS + Russian"
};

export const DayJS = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={chineseDayJSAdapter}
      numOfColumns={3}
      numOfVisibleMonths={12}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};

DayJS.story = {
  name: "DayJS + Chinese"
};

export const Luxon = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={frenchLuxonAdapter}
      numOfColumns={3}
      numOfVisibleMonths={12}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};

Luxon.story = {
  name: "Luxon + French"
};

export const Moment = () => {
  const handleChange = useChangeAction();
  const handleStateChange = useStateChangeAction();
  return (
    <Calendar
      adapter={spanishMomentAdapter}
      numOfColumns={3}
      numOfVisibleMonths={12}
      onChange={handleChange}
      onStateChange={handleStateChange}
    />
  );
};

Moment.story = {
  name: "Moment + Spanish"
};
