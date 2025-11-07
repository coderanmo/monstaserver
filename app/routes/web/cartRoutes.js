let express=require('express')
const { addToCart, cartView, removeCart, updateQty } = require('../../controllers/web/cartController')
const { checkToken } = require('../../middleware/checkToken')

let cartRoutes=express.Router()

cartRoutes.post('/add-tocart',checkToken,addToCart)
cartRoutes.post('/view-cart',checkToken,cartView)
cartRoutes.post('/remove-Cart',checkToken,removeCart)
cartRoutes.post('/update-qty',checkToken,updateQty)

module.exports={cartRoutes}
