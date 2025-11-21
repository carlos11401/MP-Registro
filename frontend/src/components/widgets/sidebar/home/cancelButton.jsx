import React from 'react'
import './button.css'
import { Link, useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'

export default function SignOutButton(props) {
  // get actual location and see if  it matches the button's path
  const location = useLocation();
  const btnSelected = location.pathname === props.to ? 'sdb-button-body selected' : 'sdb-button-body';

  return (
    <Link to={props.to} className='sdb-button-link' >
      <div className={btnSelected} onClick={async() => { await props.signOut()}}>
          <IconContext.Provider value={{ size: '25px', style: {marginLeft: '15px'} }}>
            {props.icon}
          </IconContext.Provider>
        <p className='sdb-button-title'>
          {props.title}
        </p>
      </div>
    </Link>
  )
}
