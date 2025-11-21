import React from 'react'
import './input.css'

export default function Input({tittle, text, setText, color='', readonly=false, type='text'}) {

  return (
    <div className="input-container">
      <label className={`input-label ${color === "white" ? "white" : ""}`}>{tittle}</label>
      <input 
        type={type}
        id="full-name"  
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={readonly}
        required/>
    </div>
  )
}