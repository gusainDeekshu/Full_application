/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../Context/Storecontext";
import axios from 'axios';

const LoginPopup = ({ setshowLogin }) => {
  const {url,settoken}= useContext(Storecontext);
  const [currentstate, setcurresntstate] = useState("Login");
  const [data, setdata] = useState({ name: "", email: "", password: "" });
  const onchangehandller = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };
  const onlogin = async (event) => {
    event.preventDefault();
    let newurl=url;
if(currentstate=="Login"){
  newurl+="/api/user/login"
}
else{
  newurl+="/api/user/register"
}
const response=await axios.post(newurl,data);
if(response.data.success){
  settoken(response.data.token);
  localStorage.setItem("token",response.data.token);
  setshowLogin(false);
}else{
  alert(response.data.message);
}
  };

  //   useEffect(()=>{
  // console.log(data)
  //   },[data])
  return (
    
    <div className="login-popup">
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentstate}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentstate === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onchangehandller}
              value={data.name}
              type="text"
              placeholder="Your name"
              name="name"
              required
            />
          )}
          <input
            name="email"
            onChange={onchangehandller}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onchangehandller}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentstate == "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentstate === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setcurresntstate("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setcurresntstate("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
