let express = require('express')
let multer = require('multer')
const { addProduct, subCategoryApi, parentCategoryApi, subsubCategoryApi, colorApi, materialApi, viewProduct, statusUpdate, mulDelProduct, productTypeStatusUpdate, updateProduct } = require('../../controllers/admin/productControllers')

let productRoutes = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
let upload = multer({ storage: storage })

productRoutes.post('/create', upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 },
    { name: 'galleryImage', maxCount: 20 }
]), addProduct)

productRoutes.get('/view', viewProduct)

productRoutes.put('/update/:id',upload.fields([
        { name: 'productImage', maxCount: 1 },
        { name: 'backImage', maxCount: 1 },
        { name: 'galleryImage', maxCount: 20 }
    ]), updateProduct)

productRoutes.post('/status-update', statusUpdate)
productRoutes.post('/muldel', mulDelProduct)
productRoutes.get('/parent-category', parentCategoryApi)
productRoutes.get('/sub-category/:parentid', subCategoryApi)
productRoutes.get('/sub-sub-category/:subid', subsubCategoryApi)
productRoutes.get('/colors', colorApi)
productRoutes.get('/materials', materialApi)
productRoutes.post('/status-productype', productTypeStatusUpdate)

module.exports = { productRoutes }

