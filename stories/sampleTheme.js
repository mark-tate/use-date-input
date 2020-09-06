const sampleTheme = {
    Root: {
        borderRadius: '20px',
        background: 'steelblue',
        color: 'white',
        padding: '20px'
    },
    Header: {
        alignItems: 'center',
        height: '40px',
        padding: '0 10px 0 10px'
    },
    WeekHeader: {
        paddingLeft: '5px',
        marginBottom: '20px',
        borderBottom: 'solid 3px white'
    },
    MonthTitle: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    YearTitle: {
        fontSize: '20px',
        fontWeight: 'bold'
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
        }
    },
    Month: {
        minHeight: '380px'
    },
    Day: {
        color: 'white',
        margin: '5px',
        padding: '8px',
        border: 'solid',
        borderRadius: '40px',
        width: '40px',
        height: '40px'
    },
    DayOfWeek: {
        width: '40px',
        margin: '5px',
        fontSize: '16pt'
    }
};

export default sampleTheme;
