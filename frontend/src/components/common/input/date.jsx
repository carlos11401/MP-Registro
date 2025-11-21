import React from 'react';
import { HiCalendarDays } from "react-icons/hi2";
import { IconContext } from 'react-icons'
import './date.css'; // Asegúrate de crear y configurar este archivo

export default function DateInput({tittle, date, setDate, color=''}) {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const day = String(today.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
  
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="date-input-container">
      <label className={`date-label ${color}`}>{tittle}</label>
      <div className={`date-wrapper ${color}`}>
        <input 
          type="date" 
          min={getCurrentDate()}
          className={`date-input ${color}` }
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required/>
        <span className="date-icon">
          <IconContext.Provider 
            value={{ 
              size: '18px', 
              color: "#666666"
            }}>
            <HiCalendarDays />
          </IconContext.Provider>
        </span>
      </div>
    </div>
  );
}
