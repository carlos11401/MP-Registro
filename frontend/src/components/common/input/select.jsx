import React from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from 'react-icons'
import './select.css'; // Asegúrate de crear y configurar este archivo

export default function SelectInput({ tittle, options, value, setValue, color='', required=true }) {
  
  return (
    <div className="select-input-container">
      <label className={`select-label ${color === "white" ? "white" : ""}`}>
        {tittle}
      </label>
      <div className="select-wrapper">
        <select 
          className="select-input " 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          multiple={false}
          required={required}>
          {/* Opción de placeholder */}
          <option value="" disabled>
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="select-arrow">
          <IconContext.Provider value={{size: '15px'}}>
            <MdKeyboardArrowDown />
          </IconContext.Provider>
        </span>
      </div>
    </div>
  );
}
