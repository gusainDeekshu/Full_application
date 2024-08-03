const {Router}=require('express')
const {addTocart,removeFromcart,getcart} = require('../controllers/cartcontroller');
const {authMiddleware}=require('../middlewares/auth');
const { placeOrder, verifyOrder, userOrder, listOrders, updateStatus } = require('../controllers/ordercontroller');
const router=Router();

router.post("/place",authMiddleware,placeOrder)
router.post("/verify",verifyOrder)
router.post("/userorders",authMiddleware,userOrder)
router.get("/list",listOrders)
router.post("/status",updateStatus)

module.exports=router;