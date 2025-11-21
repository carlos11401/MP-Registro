import React from 'react';
import './sidebar.css'
import Button from './button'
import { IconContext } from 'react-icons'
import { FaUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { SiCoinmarketcap } from "react-icons/si";
import SignOutButton from './cancelButton';
import { getUsertype, setToken } from '../../../../utils/usertype.utils';
import Roles from '../../../../models/roles.models';
import { FaCreditCard } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";

export default function HomeSidebar() {
  const signOut = async () => {
    // Save token empty to manage protected routes
    setToken('');
  }
  const getProfileUrl = () => {
    if (Roles.CUSTOMER === getUsertype()) {
      return '/home/cprofile';
    } else if (Roles.PROVIDER === getUsertype()) {
      return '/home/pprofile';
    }
  };
  const getCatalogUrl = () => {
    if (Roles.CUSTOMER === getUsertype()) {
      return '/home/main/products';
    } else if (Roles.PROVIDER === getUsertype()) {
      return '/home/catalog';
    }
  };

  return (
    <div className='sdb-container'>
      <div className='sdb-header'>
        <IconContext.Provider value={{ size: '25px', color: 'white'}}>
        <SiCoinmarketcap />
        </IconContext.Provider>
        <label className='sdb-label'>Econo Market</label>
      </div>
      <div className='sdb-options'>
          <>
          { // Customer and provider options
            Roles.CUSTOMER === getUsertype() ?
            <>
              <Button title="Perfil" to={getProfileUrl()} icon={<FaUserCircle/>} />
              <Button title="Catalogo" to={getCatalogUrl()} icon={<HiClipboardDocumentList />} />
              <Button title="Tarjetas" to="/home/main/payMethod" icon={<FaCreditCard />} />
              <Button title="Devoluciones" to="/home/creturn" icon={<FaExchangeAlt />} />
            </>
            :
            Roles.PROVIDER === getUsertype() ?
            <>
              <Button title="Perfil" to={getProfileUrl()} icon={<FaUserCircle/>} />
              <Button title="Catalogo" to={getCatalogUrl()} icon={<HiClipboardDocumentList />} />
            </>
            :
            Roles.ADMIN === getUsertype() ?
            <>
              <Button title="Monedas" to="/home/exchange" icon={<BsCoin />} />
              <Button title="Usuarios" to="/home/users" icon={<FaPeopleGroup />} />
              <Button title="Cupones" to="/home/coupon" icon={<MdDiscount />} />
              <Button title="Devoluciones" to="/home/return" icon={<FaExchangeAlt />} />
            </>
            :
            null
          }
          </>
      </div>
      <div className='sdb-footer'>
        <SignOutButton title="SALIR" to="/" icon={<PiSignOutBold/>} signOut={signOut}/>
      </div>
    </div>
  )
}
