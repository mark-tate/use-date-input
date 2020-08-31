import React from "react";
import { Calendar } from "@use-date-input/core";
import { adapter as dateAdapter } from "@use-date-input/date-fns-adapter";
import sampleTheme from "../../../stories/sampleTheme";

export function Hero5() {
  return <Calendar adapter={dateAdapter} theme={sampleTheme} />;
}
