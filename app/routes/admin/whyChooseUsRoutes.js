let express=require('express')
let multer=require('multer')
const { addWhyChoose, viewWhyChoose, deleteWhyChoose, updatewhyChoose, muldelWhyChoose, statusUpdate } = require('../../controllers/admin/whyChooseUsControllers')

let whyChooseUsRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
       cb(null,'upload/whychooseus')
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({storage:storage})

whyChooseUsRoutes.post('/create',upload.single('whyImage'),addWhyChoose)
whyChooseUsRoutes.get('/view',viewWhyChoose)
whyChooseUsRoutes.delete('/delete/:id',deleteWhyChoose)
whyChooseUsRoutes.put('/update/:id',updatewhyChoose)
whyChooseUsRoutes.post('/muldel',muldelWhyChoose)
whyChooseUsRoutes.post('/status-update',statusUpdate)

module.exports={whyChooseUsRoutes}