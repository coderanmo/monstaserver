let express=require('express')
let multer=require('multer')
const { getAdminProfileData, getAdminProfileSingle } = require('../../controllers/admin/adminProfileControllers')

let adminProfileRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/companyprofile')
    },
    filename:function(req,file,cb){
       cb(null,Date.now()+file.originalname)
    } 
})

let upload=multer({storage:storage})

adminProfileRoutes.get('/view',getAdminProfileData)
adminProfileRoutes.get('/single-data/:id',getAdminProfileSingle)



module.exports={adminProfileRoutes}