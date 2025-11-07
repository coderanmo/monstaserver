let express=require('express')
const { adminLogin, checkCookiesId, adminOTPForgetPassword, adminForgetPassword, adminChangePassword } = require('../../controllers/admin/adminAuthControllers')
let multer=require('multer')
let adminAuthRoutes=express.Router()

let upload=multer()

adminAuthRoutes.post('/login',upload.none(),adminLogin)
adminAuthRoutes.get('/checkid/:id',checkCookiesId)
adminAuthRoutes.post('/send-otp',adminOTPForgetPassword)
adminAuthRoutes.post('/createpass',adminForgetPassword)
adminAuthRoutes.post('/changepassword',adminChangePassword)

module.exports={adminAuthRoutes}