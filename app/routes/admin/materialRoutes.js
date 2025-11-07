let express=require('express')
const { addMaterial, viewMaterial, deleteMaterial, updateMaterial, multiDelMaterial, singleMaterial, statusUpdate } = require('../../controllers/admin/meterialControllers')

let materialRoutes=express.Router()

materialRoutes.post('/create',addMaterial)
materialRoutes.get('/view',viewMaterial)
materialRoutes.delete('/delete',deleteMaterial)
materialRoutes.put('/update/:id',updateMaterial)
materialRoutes.post('/multidelete',multiDelMaterial)
materialRoutes.get('/edit-material/:id',singleMaterial)
materialRoutes.post('/status-update',statusUpdate)

module.exports={materialRoutes}
