let express=require('express')
let multer=require('multer')
const { addTestimonail, viewTestimonail, deleteTestimonail, updateTestimonail, muldelTestimonail, singleDataTestimonial, statusUpdate } = require('../../controllers/admin/testimonialControllers')

let testmonialRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'upload/testimonials')
    },
    filename:function(req,file,cb)
    {
       cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({storage:storage})

testmonialRoutes.post('/create',upload.single('testImage'),addTestimonail)
testmonialRoutes.get('/view',viewTestimonail)
testmonialRoutes.delete('/delete/:id',deleteTestimonail)
testmonialRoutes.put('/update/:id',upload.single('testImage'),updateTestimonail)
testmonialRoutes.post('muldel',muldelTestimonail)
testmonialRoutes.get('/single-data/:id',singleDataTestimonial)
testmonialRoutes.post('/status-update',statusUpdate)

module.exports={testmonialRoutes}
