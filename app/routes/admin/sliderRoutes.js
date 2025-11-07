let express=require('express')
let multer=require('multer')
const { addSlider, viewSlider, deleteSlider, updateSlider, muldelslider, statusUpdate } = require('../../controllers/admin/sliderControllers')

let sliderRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'upload/slider')
    },
    filename:function(req,file,cb)
    {
      cb(null,Date.now()+ file.originalname)
    }
})

let upload=multer({storage:storage})

sliderRoutes.post('/create',upload.single('sliderImage'),addSlider)
sliderRoutes.get('/view',viewSlider)
sliderRoutes.delete('/delete/:id',deleteSlider)
sliderRoutes.put('/update/:id',updateSlider)
sliderRoutes.post('/muldel',muldelslider)
sliderRoutes.post('/status-update',statusUpdate)

module.exports={sliderRoutes}