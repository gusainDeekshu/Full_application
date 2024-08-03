const {Router}=require('express')
const {addTocart,removeFromcart,getcart} = require('../controllers/cartcontroller');
const {authMiddleware}=require('../middlewares/auth')
const router=Router();

router.post("/add",authMiddleware,addTocart)
router.post("/remove",authMiddleware,removeFromcart)
router.post("/get",authMiddleware,getcart)

module.exports=router;