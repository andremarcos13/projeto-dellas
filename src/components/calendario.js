import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendario-style.css";

const CalendarioComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    onDateChange(date);
  };

  return (
    <div className="dark-mode">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarioComponent;
