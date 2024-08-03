/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa odio
            ad blanditiis nemo cupiditate nulla officiis, autem unde mollitia
            minima dolorum laborum repellendus non temporibus laboriosam, nisi
            ut! Vitae, aspernatur!
          </p>
          <div className="footer-social-icons">
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.facebook_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-654820-4567</li>
            <li>gusaindeekshant@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Moksha.com - All Right Reserved
      </p>
    </div>
  );
}
