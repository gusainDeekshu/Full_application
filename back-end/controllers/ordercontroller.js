const ordermodel = require("../model/orderModel");
const usermodel = require("../model/usermodel");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing userorder from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new ordermodel({
      userId: req.body.userId.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    

    const line_item = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price*100,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 20*100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    await usermodel.findByIdAndUpdate(req.body.userId.id, { cartData: {} });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while making paymennt" });
  }
};

const verifyOrder=async (req,res)=>{
const {orderId,success}=req.body;
try {
  if(success=='true'){
    await ordermodel.findByIdAndUpdate(orderId,{payment:true});
    res.json({ success: true, message: "payment verified" });
  }else{
    await ordermodel.findByIdAndDelete(orderId);
    res.json({ success: false, message: "payment Canceled" });
  }
} catch (error) {
  console.log(error);
  
  res.json({ success: false, message: "error while making payment" });
  
}
}
//user order for front end
const userOrder=async (req,res)=>{
  try {
   const orders= await ordermodel.find({userId:req.body.userId.id});
    
      res.json({ success: true, data: orders });
   
  } catch (error) {
    console.log(error);
    
    res.json({ success: false, message: "error while getting user orders" });
    
  }
  }


// listing orders for admin pannel
const listOrders=async (req,res)=>{
  try {
   const orders= await ordermodel.find({});
    
      res.json({ success: true, data: orders });
   
  } catch (error) {
    console.log(error);
    
    res.json({ success: false, message: "error while getting all orders" });
    
  }
  }

  //api for updating order status
  const updateStatus=async (req,res)=>{
    try {
      await ordermodel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      
      res.json({ success: true, message: 'status updated' });
     
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "error while updating status" });
      
    }
    }
module.exports = { placeOrder ,verifyOrder,userOrder,listOrders,updateStatus};
