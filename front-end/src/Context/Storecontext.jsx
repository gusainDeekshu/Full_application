/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext,useEffect,useState } from "react";
export const Storecontext = createContext(null);

const StoreContextprovider = (props) => {
  const [cartItems,setcartItems]= useState({});
  const [token,settoken]= useState("");
  const [showLogin,setshowLogin]=useState(true);
  const url="http://localhost:4000"
  const [food_list,setFoodlist]= useState([]);

  const addtocart=async(itemId)=>{
    if(!cartItems[itemId]){
        
        setcartItems((prev)=>({...prev,[itemId]:1}))
    }else{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  }

  const removeFromcart=async(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    
  }

const gettotalcartamount=()=>{
let totalamount=0;
for(const item in cartItems){
  if(cartItems[item]>0){
  let iteminfo=food_list.find((product)=>product._id === item);
  totalamount =totalamount + iteminfo.price*cartItems[item];
}
}
return totalamount;
}

const fetchFoodlist=async ()=>{
  const response=await axios.get(url+"/api/food/list")
  setFoodlist(response.data.data);
}

const loadCartData=async (token)=>{
  const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
  setcartItems(response.data.cartData);
}


useEffect(()=>{
  
  async function loadData(){
    await fetchFoodlist();
    if(localStorage.getItem('token')){

      settoken(localStorage.getItem('token'));
      await loadCartData(localStorage.getItem('token'));
      setshowLogin(false);

    }
  }
  loadData();
},[])
  const contextvalue = {
    food_list,cartItems,setcartItems,addtocart,removeFromcart,gettotalcartamount,url,token,settoken,setshowLogin,showLogin
  };
  return (
    <Storecontext.Provider value={contextvalue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StoreContextprovider;
