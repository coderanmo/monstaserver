let express=require('express')
let multer=require('multer')
const { addCategory, viewCategory, deleteCategory, updateCategory, singleCategory, multiDeleteCategory, statusUpdate } = require('../../controllers/admin/productCategory')

let categoryRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'upload/category')
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+file.originalname)
    }
})
let upload=multer({storage:storage})

categoryRoutes.post('/create',upload.single('categoryImage'),addCategory)

categoryRoutes.get('/view',viewCategory)
categoryRoutes.delete('/delete',deleteCategory)
categoryRoutes.put('/update',updateCategory)
categoryRoutes.get('/single-items/:id',singleCategory)
categoryRoutes.post('/multidelete',multiDeleteCategory)
categoryRoutes.post('/status-update',statusUpdate)

module.exports={categoryRoutes}
