const usermodel = require("../model/usermodel");

// add items to user cart

const addTocart = async (req, res) => {
  try {
    let userdata = await usermodel.findById(req.body.userId.id );
    let cartData = await userdata.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    }
    else {
      cartData[req.body.itemId] += 1;
    }
    await usermodel.findByIdAndUpdate(req.body.userId.id,{cartData})
    res.json({success:true,message:"Added to cart"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error while adding tocart"});

  }
};

// fetch user cart data
const getcart = async (req, res) => {
  try {
    let userdata = await usermodel.findById(req.body.userId.id );
    let cartData = await userdata.cartData;
    
    res.json({success:true,cartData});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error while getting cart data"});
  }
};

// remove from usercart
const removeFromcart = async (req, res) => {
  try {
    let userdata = await usermodel.findById(req.body.userId.id );
    let cartData = await userdata.cartData;
    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;
    }
    
    await usermodel.findByIdAndUpdate(req.body.userId.id,{cartData})
    res.json({success:true,message:"removed from cart successfully"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error while removing cart data"});
  }
};

module.exports = { getcart, addTocart, removeFromcart };
