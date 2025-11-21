import React, { useState } from 'react'
import './loginForm.css'
import Input from '../../common/input/input';
import PasswordInput from '../../common/input/password';
import { useNavigate } from 'react-router-dom'
import { post_body } from '../../../services/auth.service';
import { useAlert } from '../../../context/usaAlert';
import { setToken } from '../../../utils/usertype.utils';

export default function LoginForm() {
  // To get data
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { showAlert } = useAlert() // To manege alert
  const navigate = useNavigate() // To navigate

  const handleSubmit = async (e) => {
    e.preventDefault() // To validate inputs
    try {
      // saving data to send it to the api
      const data = {
        email: mail,
        password: pass
      };

      const res = await post_body("/login", data)
      // Save token on localstorage to protect routes
      setToken(res.token)
      navigate('/home')  
    } catch (error) {
      showAlert("error", "Revisa tus datos")
      console.error("Error during login:", error);
    }
  }

  return (
    <form className='lgnf-container'>
      <div className='lgnf-body'>
        <div className='lgnf-side'>
          <Input tittle='Correo' type="text" text={mail} setText={setMail}/>
          <PasswordInput tittle='Contraseña' pass={pass} setPass={setPass} />
        </div>
      </div>
      <div className='lgnf-button-container'>
        <button className="normal-button" onClick={handleSubmit}>Continuar</button>
      </div>
    </form> 
  )
}