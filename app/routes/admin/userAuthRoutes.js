let express=require('express')
const { viewUser, userUpdateStatus } = require('../../controllers/admin/userAuthControllersAdminView')

let userAuthRoutes=express.Router()

userAuthRoutes.get('/view-user',viewUser)
userAuthRoutes.post('/user-statusupadte',userUpdateStatus)

module.exports={userAuthRoutes}