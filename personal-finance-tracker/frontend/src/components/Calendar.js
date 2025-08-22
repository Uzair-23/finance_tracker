import React from 'react';
import { Calendar as AntCalendar } from 'antd';
import 'antd/dist/antd.css';
import './Calendar.css';

const Calendar = () => {
    const onSelect = (date) => {
        console.log(date.format('YYYY-MM-DD'));
    };

    return (
        <div className="calendar-container">
            <AntCalendar onSelect={onSelect} />
        </div>
    );
};

export default Calendar;