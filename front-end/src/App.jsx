// eslint-disable-next-line no-unused-vars
import React, { useState,useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { Storecontext } from "./Context/Storecontext";
import Verify from './pages/verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  const {setshowLogin,showLogin}= useContext(Storecontext);

  return (
    <>
    {showLogin?<LoginPopup setshowLogin={setshowLogin}/>:<></>}
      <div className="app">
        <Navbar showLogin={showLogin} setshowLogin={setshowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<Placeorder/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
