let express=require('express')
let multer=require('multer')
const { sendOtp, createUser, loginUser, viewUser, changePassword, userChangeProfile, viewProfile, singlepRofile } = require('../../controllers/web/userAuthControllers')
const { checkToken } = require('../../middleware/checkToken')

userAuthRoutes=express.Router()
let upload=multer()

userAuthRoutes.post('/send-otp',sendOtp)
userAuthRoutes.post('/create',createUser)
userAuthRoutes.post('/login',upload.none(),loginUser)
userAuthRoutes.get('/view',viewUser)
userAuthRoutes.post('/change-password',checkToken,changePassword)
userAuthRoutes.post('/change-profile',checkToken,userChangeProfile)
userAuthRoutes.post('/view-Profile',checkToken,viewProfile)
userAuthRoutes.get('/single-profiledata/:id',singlepRofile)
module.exports={userAuthRoutes}