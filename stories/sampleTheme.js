const sampleTheme = {
    Root: {
        borderRadius: '20px',
        background: 'steelblue',
        color: 'white',
        padding: '20px',
        '@media(max-width: 480px)': {
            borderRadius: '10px',
            padding: '5px'
        }
    },
    Header: {
        alignItems: 'center',
        height: '40px',
        padding: '0 10px 0 10px',
        '@media(max-width: 480px)': {
            height: '25px',
            padding: '5px 5px 0px 5px',
        }        
    },
    WeekHeader: {
        paddingLeft: '5px',
        marginBottom: '20px',
        borderBottom: 'solid 3px white',
        '@media(max-width: 480px)': {
            paddingLeft: '0px',
            marginBottom: '5px',
        }
    },
    MonthTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        '@media(max-width: 480px)': {
            fontSize: '16px',
        }
    },
    YearTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        '@media(max-width: 480px)': {
            fontSize: '16px',
        }
    },
    PreviousButton: {
        width: '20px',
        height: '20px',
        background: 'none',
        border: 'solid white',
        borderWidth: '0 3px 3px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(135deg)',
        '-webkit-transform': 'rotate(135deg)',
        '::before': {
            content: "''"
        },
        '@media(max-width: 480px)': {
            width: '12px',
            height: '12px',
        }
    },
    NextButton: {
        width: '20px',
        height: '20px',
        background: 'none',
        border: 'solid white',
        borderWidth: '0 3px 3px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(-45deg)',
        '-webkit-transform': 'rotate(-45deg)',
        '::before': {
            content: "''"
        },
        '@media(max-width: 480px)': {
            width: '12px',
            height: '12px',
        }
    },
    Month: {
        minHeight: '380px',
        '@media(max-width: 480px)': {
            minHeight: '240px'
        }
    },
    MonthGroup: {
        '@media(max-width: 480px)': {
            padding: '0px 5px 0px 5px'
        }
    },
    Day: {
        color: 'white',
        margin: '5px',
        padding: '8px',
        border: 'solid',
        borderRadius: '40px',
        width: '40px',
        height: '40px',
        '@media(max-width: 480px)': {
            margin: '4px',
            padding: '3px',
            borderRadius: '30px',
            width: '30px',
            height: '30px',
        }
    },
    DayOfWeek: {
        width: '30px',
        margin: '5px',
        fontSize: '16px',
        '@media(max-width: 480px)': {
            margin: '4px',
            padding: '4px',
            borderRadius: '30px',
            width: '30px',
            height: '30px',
        }
    }
};

export default sampleTheme;
