let express=require('express')

const { saveOrder, viewOrder, verifyOrder } = require('../../controllers/web/orderControllers')
const { checkToken } = require('../../middleware/checkToken')

let orderRoute=express.Router()

orderRoute.post('/save-order',checkToken,saveOrder)
orderRoute.post('/view-order',checkToken,viewOrder)
orderRoute.post('/verify-order',checkToken,verifyOrder)

module.exports={orderRoute}

