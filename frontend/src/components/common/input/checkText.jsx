import React from 'react';
import './checkText.css'
export function InputCheckText({tittle, isChecked=false, setIsChecked, text, setText, placeholder='Escribe algo...'}) {

return (
  <div className="inpchk-container">
    <label className="inpchk-label">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e)=>setIsChecked(e.target.checked)}
      />
      {tittle}
    </label>
    <div>
      <textarea
        className="inpchk-textarea"
        placeholder={placeholder}
        disabled={!isChecked}
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
    </div>
  </div>
);}
