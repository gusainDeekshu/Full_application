/* eslint-disable no-unused-vars */
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'


const Navbar = () => {
  return (
    <div className='navbar'>
      <p className='texth1'>Admin Panel</p>
      <img className='logo' src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_icon} alt="" />
      
    </div>
  )
}

export default Navbar
