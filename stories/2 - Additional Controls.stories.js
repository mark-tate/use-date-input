import React from 'react';
import { action } from '@storybook/addon-actions';
import { Calendar, createDateAPI, Root } from "../packages/core";
import { adapter as dateAdapter } from "../packages/date-fns-adapter";
import AdditionalControlHeader from './AdditionalControlHeader';
import ShortcutList from './ShortcutList';

const { createDate } = createDateAPI({ adapter: dateAdapter });

const useChangeAction = () => selectedDate => {
    action('change selected date')(selectedDate);
};

const HeaderComponent = () => <AdditionalControlHeader />;
const CalendarWithShortcuts = props => (
    <div>
        <ShortcutList />
        <Root {...props} />
    </div>
);

export default {
    title: '2 - Additional Controls'
};

export const CustomHeader = () => {
    const handleChange = useChangeAction();
    return (
        <Calendar
            adapter={dateAdapter}
            components={{
                Header: HeaderComponent
            }}
            initialVisibleFromMonth={createDate()}
            numOfVisibleMonths={3}
            numOfColumns={3}
            onChange={handleChange}
        />
    );
};
CustomHeader.story = {
    name: 'Custom header'
};

export const CustomSideBar = () => {
    const handleChange = useChangeAction();
    return (
        <Calendar
            adapter={dateAdapter}
            allowRange
            components={{
                Header: AdditionalControlHeader,
                Root: CalendarWithShortcuts
            }}
            onChange={handleChange}
            numOfVisibleMonths={12}
            numOfColumns={4}
        />
    );
};
CustomSideBar.story = {
    name: 'Additional sidebar of shortcuts'
};
