import React from 'react';
import { action } from '@storybook/addon-actions';
import { Calendar } from "../packages/core";
import { adapter as dateFnsAdapter } from "../packages/date-fns-adapter";
import { adapter as dayjsAdapter } from "../packages/dayjs-adapter";
import { adapter as luxonAdapter } from "../packages/luxon-adapter";
import { adapter as momentAdapter } from "../packages/moment-adapter";

export default {
    title: '5 - Date Adapters'
};

const useChangeAction = () => selectedDate => {
    action('changed selected date')(selectedDate);
};

const useStateChangeAction = () => changes => {
    action('state changed')(changes);
};

export const DateFNS = () => {
    const handleChange = useChangeAction();
    const handleStateChange = useStateChangeAction();
    return (
        <Calendar
            adapter={dateFnsAdapter}
            numOfColumns={3}
            numOfVisibleMonths={12}
            onChange={handleChange}
            onStateChange={handleStateChange}
        />
    );
};

DateFNS.story = {
    name: 'Date FNS (default)'
};

export const DayJS = () => {
    const handleChange = useChangeAction();
    const handleStateChange = useStateChangeAction();
    return (
        <Calendar
            adapter={dayjsAdapter}
            numOfColumns={3}
            numOfVisibleMonths={12}
            onChange={handleChange}
            onStateChange={handleStateChange}
        />
    );
};

DayJS.story = {
    name: 'DayJS'
};

export const Luxon = () => {
    const handleChange = useChangeAction();
    const handleStateChange = useStateChangeAction();
    return (
        <Calendar
            adapter={luxonAdapter}
            numOfColumns={3}
            numOfVisibleMonths={12}
            onChange={handleChange}
            onStateChange={handleStateChange}
            weekOffset={-1}
        />
    );
};

Luxon.story = {
    name: 'Luxon'
};

export const Moment = () => {
    const handleChange = useChangeAction();
    const handleStateChange = useStateChangeAction();
    return (
        <Calendar
            adapter={momentAdapter}
            numOfColumns={3}
            numOfVisibleMonths={12}
            onChange={handleChange}
            onStateChange={handleStateChange}
            weekOffset={-1}
        />
    );
};

Moment.story = {
    name: 'Moment'
};
