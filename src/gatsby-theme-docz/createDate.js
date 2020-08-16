import { createDateAPI } from '@use-date-input/core';
import dateFnsAdapter from "@use-date-input/date-fns-adapter";

const dateAPI = createDateAPI({ adapter: dateFnsAdapter });

export const createDate = dateAPI.createDate;
export const dateAdapter = dateFnsAdapter;
