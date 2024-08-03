import { useContext } from "react";
import "./Cart.css";
import { Storecontext } from "../../Context/Storecontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
// import { assets } from "../../assets/assets";

export default function Cart() {
  const { cartItems, food_list, removeFromcart,gettotalcartamount,url } = useContext(Storecontext);
  const navigate=useNavigate()
  if(gettotalcartamount() === 0){return(<div className="cart"><div className="cartimg"><img  src={assets.empty_cart} alt="" /><br /><br />
         <button onClick={()=>navigate('/')}>Shop</button>
         </div></div>)}else{ return (
    <div className="cart">
     <div className="cart-items">
       <div className="cart-items-title">
         <p>Items</p>
         <p>Title</p>
         <p>Price</p>
         <p>Quantity</p>
         <p>Total</p>
         <p>Remove</p>
       </div>
       <br />
       <hr />
       {food_list.map((item, index) => {
         if (cartItems[item._id] > 0) {
           return (
             <div key={index}>
               <div className="cart-items-title cart-items-item">
                 <img src={url+"/images/"+item.image} alt="" />
                 <p>{item.name}</p>
                 <p>₹{item.price}</p>
                 <p>{cartItems[item._id]}</p>
                 <p>{item.price * cartItems[item._id]}</p>
                 <p className="cross" onClick={() => removeFromcart(item._id)}>
                   x
                 </p>
               </div>
               <hr />
             </div>
           );
         }
       })}
     </div>
     <div className="cart-bottom">
       <div className="cart-total">
         <h2>Cart Total</h2>
         <div>
           <div className="cart-total-details">
             <p>Subtotal</p>
             <p>₹{gettotalcartamount()}</p>
           </div>
           <hr />
           <div className="cart-total-details">
             <p>Delivery Fee</p>
             <p></p>₹{20}
           </div>
           <div className="cart-total-details">
             <b>Total</b>
             <b>₹{gettotalcartamount()+20}</b>
           </div>
         </div>

         <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
       </div>
       <div className="cart-promocode">
         <div>
           <p>If you have a promo code, Enter it here</p>
           <div className="cart-promocode-input">
             <input type="text" placeholder="Promo code" />
             <button>Submit</button>
           </div>
         </div>
       </div>
     </div>
     </div>

   

 );}
 
}
