import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendario-style.css"; // Importando o arquivo CSS do calendário

const CalendarioComponent = () => {
  const [date, setDate] = useState(new Date());
  console.log("date", date);

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="dark-mode">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarioComponent;
