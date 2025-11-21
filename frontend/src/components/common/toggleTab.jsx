import React from 'react'
import './toggleTab.css'
// Moddificar el toggle para manejarlo dinamicamente
export default function ToggleTab({activeTab, setActiveTab, tittle1, tittle2}) {

  return (
    <div className='toggle-container'>
      <div
        className={`toggle-tab ${activeTab ? "active" : ""}`}
        onClick={() => setActiveTab(true)}
      >
        {tittle1}
      </div>
      <div
        className={`toggle-tab ${!activeTab ? "active" : ""}`}
        onClick={() => setActiveTab(false)}
      >
        {tittle2}
      </div>
    </div>
  )
}