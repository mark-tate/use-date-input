import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createDateAPI } from '@use-date-input/core';
import { adapter as dateAdapter } from "../packages/date-fns-adapter";
import { formatNames } from '@use-date-input/common';

const { toFormattedDate } = createDateAPI({ adapter: dateAdapter });

export default function DateRangeDialog(props) {
    const { children, open, onOK, onCancel, selectedDate } = props;
    const [startDate, endDate] = selectedDate;
    const startDescription = startDate
        ? toFormattedDate(startDate, formatNames.ARIA_DAY_LABEL)
        : '';
    const endDescription = endDate ? toFormattedDate(endDate, formatNames.ARIA_DAY_LABEL) : '';
    const description =
        startDescription || endDescription ? `${startDescription} - ${endDescription}` : '';
    return (
        <Dialog maxWidth="md" open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Date Range Dialog Example</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select a date range or use shortcuts from the List
                </DialogContentText>
                {children}
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onOK} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
DateRangeDialog.propTypes = {
    children: PropTypes.node,
    onCancel: PropTypes.func,
    onOK: PropTypes.func,
    open: PropTypes.bool,
    selectedDate: PropTypes.array
};
