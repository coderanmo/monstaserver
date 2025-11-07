let express=require('express')
const { addCountry, viewCountry, deleteCountry, updateCountry, delMulCountry, singleCountry } = require('../../controllers/admin/countryControllers')

let countryRoutes=express.Router()

countryRoutes.post('/create',addCountry)
countryRoutes.get('/view',viewCountry)
countryRoutes.delete('/delete',deleteCountry)
countryRoutes.put('/update/:id',updateCountry)
countryRoutes.post('/delmulcountry',delMulCountry)
countryRoutes.get('/single-country/:id',singleCountry)

module.exports={countryRoutes}
