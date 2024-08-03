/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Storecontext } from "../../Context/Storecontext";
const Navbar = ({setshowLogin}) => {
  const Navigate=useNavigate();
  const {gettotalcartamount,token,settoken}=useContext(Storecontext)
  const [menu, setmenu] = useState("home");
  const logout=()=>{
localStorage.removeItem('token');
settoken("");
Navigate('/');
  }
  return (
    <div>
      <div className="navbar">
        <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setmenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setmenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => setmenu("mobile_app")}
            className={menu === "mobile_app" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setmenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={gettotalcartamount() === 0?"":"dot"}></div>
          </div>
          {token?<div className="navbar-profile"><img src={assets.profile_icon} alt="profileicon" />
          <ul className="nav-profile-dropdown">
            <li><Link to='/myorders'><img src={assets.bag_icon} alt="" /><p>Orders</p></Link></li><hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li></ul></div>:<button onClick={()=>setshowLogin(true)}>Sign in</button>}
            
            
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
