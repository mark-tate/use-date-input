import { FormControl, Input, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export default function Dropdown({ label, labelId, onChange, selectedValue, source }) {
    const classes = useStyles();
    const handleChange = event => onChange(event.target.value);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                value={selectedValue}
                onChange={handleChange}
                input={<Input />}
            >
                {source.reduce(
                    (accumulator, item) => [
                        ...accumulator,
                        <MenuItem key={item.key} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ],
                    []
                )}
            </Select>
        </FormControl>
    );
}

Dropdown.propTypes = {
    labelId: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    selectedValue: PropTypes.string,
    source: PropTypes.array
};
