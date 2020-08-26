import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { adapter as dateAdapter } from "../packages/date-fns-adapter";
import { Calendar, Root } from "../packages/core";
import AdditionalControlHeader from './AdditionalControlHeader';
import ShortcutList from './ShortcutList';
import DateRangeDialog from './DateRangeDialog';
import Button from '@material-ui/core/Button';

const useChangeAction = () => selectedDate => {
    action('change selected date')(selectedDate);
};

export default {
    title: '3 - Dialogs'
};

const CalendarWithShortcuts = props => (
    <>
        <ShortcutList />
        <Root {...props} />
    </>
);

export const InDialog = () => {
    const handleChange = useChangeAction();
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState([undefined, undefined]);
    const handleClickOpen = () => {
        setOpen(true);
        setSelectedDate([undefined, undefined]);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOK = () => {
        setOpen(false);
        if (selectedDate) {
            handleChange(selectedDate);
        }
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open Date Range Dialog
            </Button>
            <DateRangeDialog
                onCancel={handleCancel}
                onOK={handleOK}
                open={open}
                selectedDate={selectedDate}
            >
                <Calendar
                    adapter={dateAdapter}
                    allowRange
                    components={{
                        Header: AdditionalControlHeader,
                        Root: CalendarWithShortcuts
                    }}
                    onCalendarChange={selectedDate => setSelectedDate(selectedDate)}
                    numOfVisibleMonths={3}
                    numOfColumns={3}
                />
            </DateRangeDialog>
        </>
    );
};
InDialog.story = {
    name: 'Inside a dialog'
};
