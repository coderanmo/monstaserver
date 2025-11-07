let express=require('express')
let multer=require('multer')
const { viewCompanyProfile, updateProfile, singleData } = require('../../controllers/admin/companyProfileControllers')

let cprofileRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
      cb(null,'upload/companyprofile')
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+file.originalname)
    }  
})

let upload=multer({storage:storage})

cprofileRoutes.put('/update/:id',upload.single('companyImage'),updateProfile)
cprofileRoutes.get('/view',viewCompanyProfile)
cprofileRoutes.get('/single-data/:id',singleData)
module.exports={cprofileRoutes}
