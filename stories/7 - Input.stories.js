import React, { useCallback, useRef, useState } from 'react';
import { useDateInput, useDateRangeInput } from "../packages/core";
import { Popper } from "../packages/popper";
import dateFnsAdapter from "../packages/date-fns-adapter";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { parse, isValid } from 'date-fns';
import { action } from '@storybook/addon-actions';

export default {
    title: '7 - Input'
};

const defaultParseDate = value => parse(value, 'dd/MM/yyyy', new Date());

export const WithSingleDateInput = () => {
    const [date, setDate] = useState('');
    const actions = useRef();

    const handleStateChange = useCallback((changes, state) => {
        action('state changed')(changes, state);
    }, []);

    const handleInputChange = useCallback(event => {
        const { value } = event.target;
        action('input changed to')(value);
        setDate(event.target.value);
    }, []);

    const handleCalendarChange = useCallback(value => {
        action('calendar changed selected date')(value);
        const { dateAPI } = actions.current;
        setDate(dateAPI.format(value, 'dd/MM/yyyy'));
    }, []);

    const {
        Calendar,
        CalendarProvider,
        getCalendarProviderProps,
        getInputProps,
        getPopperProps
    } = useDateInput({
        actions,
        parse: defaultParseDate
    });

    return (
        <>
            <input {...getInputProps({ onChange: handleInputChange })} value={date} />
            <CalendarProvider
                {...getCalendarProviderProps({
                    adapter: dateFnsAdapter,
                    onCalendarChange: handleCalendarChange,
                    onStateChange: handleStateChange
                })}
            >
                <Popper {...getPopperProps()}>
                    <Calendar />
                </Popper>
            </CalendarProvider>
        </>
    );
};

WithSingleDateInput.story = {
    name: 'With a single date input'
};

export const WithDateRangeInput = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const actions = useRef();

    const handleStateChange = useCallback((changes, state) => {
        action('state changed')(changes, state);
    }, []);

    const handleStartDateInputChange = useCallback(event => {
        const { value } = event.target;
        action('start date input changed to')(value);
        setStartDate(value);
    }, []);
    const handleEndDateInputChange = useCallback(event => {
        const { value } = event.target;
        action('end date input changed to')(value);
        setEndDate(value);
    }, []);

    const handleCalendarChange = useCallback(value => {
        action('calendar changed selected date')(value);
        const { dateAPI } = actions.current;
        const [rangeStart, rangeEnd] = value;
        setStartDate(rangeStart ? dateAPI.format(rangeStart, 'dd/MM/yyyy') : '');
        setEndDate(rangeEnd ? dateAPI.format(rangeEnd, 'dd/MM/yyyy') : '');
    }, []);

    const {
        Calendar,
        CalendarProvider,
        getCalendarProviderProps,
        getStartDateProps,
        getEndDateProps,
        getPopperProps
    } = useDateRangeInput({
        actions,
        parse: value => parse(value, 'dd/MM/yyyy', new Date())
    });

    return (
        <>
            <input
                {...getStartDateProps({ onChange: handleStartDateInputChange })}
                value={startDate}
            />
            <input {...getEndDateProps({ onChange: handleEndDateInputChange })} value={endDate} />
            <CalendarProvider
                {...getCalendarProviderProps({
                    adapter: dateFnsAdapter,
                    numOfColumns: 3,
                    numOfVisibleMonths: 6,
                    onCalendarChange: handleCalendarChange,
                    onStateChange: handleStateChange
                })}
            >
                <Popper {...getPopperProps()}>
                    <Calendar />
                </Popper>
            </CalendarProvider>
        </>
    );
};
WithDateRangeInput.story = {
    name: 'With a date range input'
};

const useStyles = makeStyles(theme => ({
    textField: {
        '&:focus': {
            outline: 0
        },
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    }
}));

export const WithTextField = () => {
    const classes = useStyles();
    const anchorRef = useRef(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDateError, setStartDateError] = useState();
    const [endDateError, setEndDateError] = useState();

    const actions = useRef();

    const handleStateChange = useCallback((changes, state) => {
        action('state changed')(changes, state);
    }, []);

    const handleStartDateInputChange = useCallback(event => {
        const { value } = event.target;
        setStartDate(value);
        const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
        if (!value || isValid(parsedDate)) {
            action('start date input changed to valid date')(value);
            setStartDateError(undefined);
        } else {
            action('start date input changed to invalid date')(value);
            setStartDateError('start date is invalid');
        }
    }, []);
    const handleEndDateInputChange = useCallback(event => {
        const { value } = event.target;
        setEndDate(value);
        const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
        if (!value || isValid(parsedDate)) {
            action('end date input changed to valid date')(value);
            setEndDateError(undefined);
        } else {
            action('end date input changed to invalid date')(value);
            setEndDateError('end date is invalid');
        }
    }, []);

    const handleCalendarChange = useCallback(value => {
        action('calendar changed selected date')(value);
        const { dateAPI } = actions.current;
        const [rangeStart, rangeEnd] = value;
        setStartDate(rangeStart ? dateAPI.format(rangeStart, 'dd/MM/yyyy') : '');
        setEndDate(rangeEnd ? dateAPI.format(rangeEnd, 'dd/MM/yyyy') : '');
        setEndDateError(undefined);
    }, []);

    const {
        Calendar,
        CalendarProvider,
        getCalendarProviderProps,
        getStartDateProps,
        getEndDateProps,
        getPopperProps
    } = useDateRangeInput({
        actions,
        parse: value => parse(value, 'dd/MM/yyyy', new Date()),
        theme: {
            Root: {
                boxShadow: '0 3px 6px rgba(0,0,0,0.23)',
                marginLeft: '10px',
                paddingTop: '20px'
            }
        }
    });
    const { ref: startInputRef, tabIndex: startTabIndex, ...startInputRest } = getStartDateProps({
        onChange: handleStartDateInputChange
    });
    const { ref: endInputRef, tabIndex: endTabIndex, ...endInputRest } = getEndDateProps({
        onChange: handleEndDateInputChange
    });

    return (
        <form noValidate autoComplete="off">
            <TextField
                className={classes.textField}
                {...startInputRest}
                error={startDateError}
                helperText={startDateError}
                value={startDate}
                label={'Start Date'}
                inputRef={startInputRef}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { tabIndex: startTabIndex } }}
                ref={anchorRef}
            />
            <TextField
                className={classes.textField}
                {...endInputRest}
                error={endDateError}
                helperText={endDateError}
                value={endDate}
                label={'End Date'}
                InputLabelProps={{ shrink: true }}
                inputRef={endInputRef}
                InputProps={{ inputProps: { tabIndex: endTabIndex } }}
            />
            <CalendarProvider
                {...getCalendarProviderProps({
                    adapter: dateFnsAdapter,
                    numOfColumns: 3,
                    numOfVisibleMonths: 6,
                    onCalendarChange: handleCalendarChange,
                    onEndDateInputChange: handleEndDateInputChange,
                    onStartDateInputChange: handleStartDateInputChange,
                    onStateChange: handleStateChange
                })}
            >
                <Popper {...getPopperProps({ anchorEl: anchorRef.current })}>
                    <Calendar />
                </Popper>
            </CalendarProvider>
        </form>
    );
};
WithTextField.story = {
    name: 'With a MUI text-field'
};
