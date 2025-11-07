let express=require('express')

const { userAuthRoutes } = require('./userAuthRoutes')
const { contactRoutes } = require('./contactRoutes')
const {homeRoutes } = require('./homeRoutes')
const { cartRoutes } = require('./cartRoutes')
const { billingRoutes } = require('./billingRoutes')
const { orderRoute } = require('./orderRoutes')

let webRouter=express.Router()


webRouter.use('/user',userAuthRoutes)
webRouter.use('/home',homeRoutes)
webRouter.use('/contact',contactRoutes)
webRouter.use('/cart',cartRoutes)
webRouter.use('/billing',billingRoutes)
webRouter.use('/order',orderRoute)
module.exports={webRouter}
