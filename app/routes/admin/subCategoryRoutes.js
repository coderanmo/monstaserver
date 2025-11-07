let express=require('express')
let multer=require('multer')
const { addSubCategory, viewSubCategory, mulDelSubCategory, updateSubCategory, deleteSubCategory, parentCategory, statusUpdate, singleData } = require('../../controllers/admin/subCategoryControllers')
let subCategoryRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
       cb(null,'upload/subcategory')
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({storage:storage})

subCategoryRoutes.post('/create',upload.single('subCategoryImage'),addSubCategory)
subCategoryRoutes.get('/view',viewSubCategory)
subCategoryRoutes.delete('/delete/:id',deleteSubCategory)
subCategoryRoutes.put('/update/:id',upload.single('subCategoryImage'),updateSubCategory)
subCategoryRoutes.post('/muldelSubCat',mulDelSubCategory)
subCategoryRoutes.get('/parent-category',parentCategory)
subCategoryRoutes.post('/status-update',statusUpdate)
subCategoryRoutes.get('/single-data/:id',singleData)

module.exports={subCategoryRoutes}


