import React from 'react'
import './userType.css'
import "../../public/buttons.css"
import { useNavigate } from 'react-router-dom'
import { setUsertype } from '../../../utils/usertype.utils'
import Roles from '../../../models/roles.models'

  export default function UserType() {
    // To navigate
    const navigate = useNavigate()

    const handleClick = (e) => {
      if(e === Roles.TECNICO){
        setUsertype(Roles.TECNICO)
      }else if(e === Roles.COORDINADOR){
        setUsertype(Roles.COORDINADOR)
      }
      navigate('/auth')
    }

    return (
      <div className='auth-options'>
        <button className="normal-button" onClick={() => handleClick(Roles.TECNICO)}>Técnico</button>
        <button className="normal-button" onClick={() => handleClick(Roles.COORDINADOR)}>Coordinador</button>
      </div>
    )
  }