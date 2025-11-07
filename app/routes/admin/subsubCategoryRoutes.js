let express = require('express')
let multer = require('multer')
const { parentCatgory, subCategory, addSubSubCategory, viewsubSubCategoryData, deleteSubSubCategoryData, updateSubSubCategoryRoutes, muldelSubSubCategoryData, singleDatasubsubCat , } = require('../../controllers/admin/subsubCatControllers')
let subsubCatRoutes = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/subsubcategory')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

let upload = multer({ storage: storage })

subsubCatRoutes.post('/create', upload.single('subsubCategoryImage'),addSubSubCategory)
subsubCatRoutes.get('/view',viewsubSubCategoryData)
subsubCatRoutes.delete('/delete/:id',deleteSubSubCategoryData)
subsubCatRoutes.put('/update/:id',updateSubSubCategoryRoutes)
subsubCatRoutes.post('/muldetete',muldelSubSubCategoryData)
subsubCatRoutes.get('/single-data/:id',singleDatasubsubCat)

subsubCatRoutes.get('/parent-category', parentCatgory)
subsubCatRoutes.get('/sub-category/:parentid', subCategory)

module.exports = { subsubCatRoutes }