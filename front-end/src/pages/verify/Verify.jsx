import {  useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { useContext, useEffect } from "react";
import { Storecontext } from "../../Context/Storecontext";
import axios from "axios";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  //  console.log(success,orderId);
  const { url } = useContext(Storecontext);
  const Navigate=useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      Navigate("/myorders");
    }else{
      Navigate("/");

    }
  };
  useEffect(()=>{
    verifyPayment();
  });

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}
