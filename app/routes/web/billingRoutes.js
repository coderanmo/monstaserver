let express=require('express')

const { updateBilling } = require('../../controllers/web/billingControllers')

let billingRoutes=express.Router()

billingRoutes.post('/upadte-billing',updateBilling)


module.exports={billingRoutes}