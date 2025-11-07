let express=require('express')
const { addColor, viewColor, deleteColor, updateColor, multiDelete, singleColor, colorStatusUpdate } = require('../../controllers/admin/colorControllers')

let colorRoutes=express.Router()

colorRoutes.post('/create',addColor)
colorRoutes.get('/view',viewColor)
colorRoutes.delete('/delete/:id',deleteColor)
colorRoutes.put('/update/:id',updateColor)
colorRoutes.post('/multidelete',multiDelete)
colorRoutes.get('/edit-color/:id',singleColor)
colorRoutes.post('/status-update',colorStatusUpdate)
module.exports={colorRoutes}