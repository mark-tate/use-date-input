import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useCalendarDispatch, useCalendarState } from '@use-date-input/core';
import { createDateAPI } from '@use-date-input/core';
import dateAdapter from "@use-date-input/date-fns-adapter";

const dateAPI = createDateAPI({ adapter: dateAdapter });

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block',
        paddingTop: '90px',
        verticalAlign: 'top',
        width: 150
    }
}));

export default function ShortcutList() {
    const { startDate } = useCalendarState();
    const { setEndDate, setVisibleFromDate } = useCalendarDispatch();
    const classes = useStyles();

    if (!startDate) {
        return null;
    }

    const createNightsSelectHandler = numOfNights => () => {
        setEndDate(dateAPI.addDays(startDate, numOfNights));
        setVisibleFromDate(dateAPI.startOfMonth(startDate));
    };
    const handleTenNights = createNightsSelectHandler(10);
    const handleSevenNights = createNightsSelectHandler(7);
    const handleThreeNights = createNightsSelectHandler(3);

    return (
        <div className={classes.root}>
            <List component="nav" dense aria-label="date range shortcuts">
                <ListItem button onClick={handleTenNights}>
                    <ListItemText primary="Stay for 10 nights" />
                </ListItem>
                <ListItem button onClick={handleSevenNights}>
                    <ListItemText primary="Stay for 7 nights" />
                </ListItem>
                <ListItem button onClick={handleThreeNights}>
                    <ListItemText primary="Stay for 3 nights" />
                </ListItem>
            </List>
        </div>
    );
}
