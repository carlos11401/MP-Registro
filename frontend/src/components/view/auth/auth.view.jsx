import React, { useState } from 'react'
import './auth.css'
import ToggleTab from '../../common/toggleTab';
import LoginForm from '../../widgets/forms/loginForm';

export default function Authentication() {
  // To change between signin and signup
  // If activaTab = true, show the fist tab, else show the other
  const [activeTab, setActiveTab] = useState(true);

  return (
    <div className='sgn-container'>
      <ToggleTab activeTab={activeTab} setActiveTab={setActiveTab} tittle1='Sign In' tittle2='Sign Up' />
      <div className='sgn-body'>
            <LoginForm />
      </div>
    </div>
  )
}