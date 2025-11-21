import React from 'react'
import './input.css'

export default function NumberInput({tittle, text, setText, color='', pattern="[0-9]{8}",readonly=false}) {

  return (
    <div className="input-container">
      <label className={`input-label ${color === "white" ? "white" : ""}`}>{tittle}</label>
      <input 
        type='text'
        id="full-name"  
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={readonly}
        pattern={pattern}
        required/>
    </div>
  )
}