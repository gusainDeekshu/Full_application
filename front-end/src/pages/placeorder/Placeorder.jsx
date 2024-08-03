import { useContext, useEffect, useState } from "react";
import "./Placeorder.css";
import { Storecontext } from "../../Context/Storecontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Placeorder() {
  const { gettotalcartamount, token, food_list, cartItems,url } =
    useContext(Storecontext);
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    var orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);

      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:gettotalcartamount()+20,
    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success)
    {
      const {session_url}=response.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  };
 const Navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      Navigate('/cart');
    }else if(gettotalcartamount()==0){
      Navigate('/cart');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])
  return (
    <form onSubmit={placeOrder} className="placeorder">
      <div className="placeorder-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required
            type="text"
            name="firstName"
            onChange={onChangehandler}
            value={data.firstName}
            placeholder="First name"
          />
          <input required
            type="text"
            name="lastName"
            onChange={onChangehandler}
            value={data.lastName}
            placeholder="Last name"
          />
        </div>
        <input required
          type="email"
          name="email"
          onChange={onChangehandler}
          value={data.email}
          placeholder="email address"
        />
        <input required
          type="text"
          name="street"
          onChange={onChangehandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input required
            type="text"
            name="city"
            onChange={onChangehandler}
            value={data.city}
            placeholder="city"
          />
          <input required
            type="text"
            name="state"
            onChange={onChangehandler}
            value={data.state}
            placeholder="state"
          />
        </div>
        <div className="multi-fields">
          <input required
            type="text"
            name="zipcode"
            onChange={onChangehandler}
            value={data.zipcode}
            placeholder="Zip Code"
          />
          <input required
            type="text"
            name="country"
            onChange={onChangehandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input required
          type="text"
          name="phone"
          onChange={onChangehandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>
      <div className="placeorder-right">
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
              <b>₹{gettotalcartamount() + 20}</b>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}
