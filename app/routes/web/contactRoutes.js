let express=require('express')
const { addContact, viewContact } = require('../../controllers/web/contactControllers')

let contactRoutes=express.Router()

contactRoutes.post('/create',addContact)
contactRoutes.get('/view',viewContact)

module.exports={contactRoutes}