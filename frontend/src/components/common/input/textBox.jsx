import React from 'react'
import './textBox.css'

export default function TextBox({tittle, text, setText}) {

  return (
    <div className="textbox-container">
      <label className='textbox-label white'>{tittle}</label>
      <textarea 
        id="descripcion"  
        className="text-textbox"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe aqui tu motivo..."
        style={{resize: 'none'}}
        />
    </div>
  )
}