/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../Context/Storecontext';

export default function Fooditem({id,name,price,description,image}) {
    const {cartItems,setcartItems,addtocart,removeFromcart,url}= useContext(Storecontext)
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img className="food-item-image" src={url+"/images/"+image} alt="" />
            {
                !cartItems[id] ?<img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white} alt=''/>:
                <div className="food-item-counter">
                    <img onClick={()=>removeFromcart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <div className="food-item-desc">{description}</div>
            <div className="food-item-price">₹{price}</div>
        </div>
      
    </div>
  )
}
