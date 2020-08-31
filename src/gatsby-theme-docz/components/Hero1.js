import React from "react";
import { Calendar } from "@use-date-input/core";
import { adapter as dateAdapter } from "@use-date-input/date-fns-adapter";

export function Hero1() {
  return <Calendar adapter={dateAdapter} numOfVisibleMonths={1} />;
}
