let express=require('express')
const { viewSlider, viewComapnyProfle, viewHomeCategory, homeProduct, homeFaq, bestSelling, homeCountry, categoriesMaterial, categoriesColor, categoriesApi, categoriesProduct, categoriesSingleProduct} = require('../../controllers/web/homeControllers')

let homeRoutes=express.Router()

homeRoutes.get('/sliderview',viewSlider)
homeRoutes.get('/companypview',viewComapnyProfle)
homeRoutes.get('/category',viewHomeCategory)
homeRoutes.get('/producthome/:catid',homeProduct)
homeRoutes.get('/faqhome',homeFaq)
homeRoutes.get('/bestsellingproduct',bestSelling)
homeRoutes.get('/country',homeCountry)
homeRoutes.get('/metrial',categoriesMaterial)
homeRoutes.get('/color',categoriesColor)
homeRoutes.get('/categories',categoriesApi)
homeRoutes.get('/categories-product',categoriesProduct)
homeRoutes.get('/single-product/:id',categoriesSingleProduct)
module.exports={homeRoutes}