/* eslint-disable no-unused-vars */
import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'

export default function Appdownload() {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br /> Moksaha App</p>
      <div className="app-download-platform">
<img src={assets.play_store} alt="" />
<img src={assets.app_store} alt="" />

      </div>
      
    </div>
  )
}
