import React, { useState } from 'react';
import { BiSolidHide } from "react-icons/bi";
import { IconContext } from 'react-icons'
import './password.css'; // Asegúrate de crear y configurar este archivo

export default function PasswordInput({tittle, pass, setPass}) {
  const [showPassword, setShowPassword] = useState(false);
  const [colorIcon, setColorIcon] =useState("#666666");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if(showPassword){
      setColorIcon('#666666');
    }else{
      setColorIcon('#C4C4C4');
    }
  };

  return (
    <div className="password-input-container">
      <label className="password-label">{tittle}</label>
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          className="password-input"
          placeholder=""
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <span
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        >
          <IconContext.Provider value={{ size: '18px', color: colorIcon, className: "password-toggle-icon"}}>
              <BiSolidHide />
          </IconContext.Provider>
        </span>
      </div>
    </div>
  );
}
