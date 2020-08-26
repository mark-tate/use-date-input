import React from 'react';
import { adapter as dateAdapter } from "../packages/date-fns-adapter";
import { Calendar } from "../packages/core";
import sampleTheme from './sampleTheme';
import { action } from '@storybook/addon-actions';

export default {
    title: '4 - Themable Components'
};

const useChangeAction = () => selectedDate => {
    action('changed selected date')(selectedDate);
};

const useStateChangeAction = () => changes => {
    action('state changed')(changes);
};

export const ThemedCalendar = () => {
    const handleChange = useChangeAction();
    const handleStateChange = useStateChangeAction();
    return (
        <Calendar
            adapter={dateAdapter}
            theme={sampleTheme}
            numOfColumns={2}
            numOfVisibleMonths={2}
            onChange={handleChange}
            onStateChange={handleStateChange}
        />
    );
};
ThemedCalendar.story = {
    name: 'Themed calendar'
};
