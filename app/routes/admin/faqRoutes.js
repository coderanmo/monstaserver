let express=require('express')
const { addFaq, viewFaq, deleteFaq, updateFaq, multiDelFaq, singleFaq, statusUpdate } = require('../../controllers/admin/faqControllers')

let faqRoutes=express.Router()

faqRoutes.post('/create',addFaq)
faqRoutes.get('/view',viewFaq)
faqRoutes.delete('/delete',deleteFaq)
faqRoutes.put('/update/:id',updateFaq)
faqRoutes.post('/muldelfaq',multiDelFaq)
faqRoutes.get('/single-faq/:id',singleFaq)
faqRoutes.post('/status-update',statusUpdate)

module.exports={faqRoutes}
