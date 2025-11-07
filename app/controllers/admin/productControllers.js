const { categoryModel } = require("../../models/categoryModels")
const { colorModel } = require("../../models/colorModels")
const { materialModel } = require("../../models/meterialModels")
const { productModel } = require("../../models/productModels")
const { subCategoryModel } = require("../../models/subCategoryModels")
const { subsubCategoryModel } = require("../../models/subsubCategoryModels")

let addProduct = async (req, res) => {
    let insertObj = { ...req.body }
    let obj
    if (req.files) {
        if (req.files.productImage) {
            insertObj['productImage'] = req.files.productImage[0].filename
        }
        if (req.files.backImage) {
            insertObj['backImage'] = req.files.backImage[0].filename
        }
        if (req.files.galleryImage) {
            insertObj['galleryImage'] = req.files.galleryImage.map((items) => items.filename)
        }
    }
    await productModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data insert',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'Please fill different Order number'
            }
            if (error.errors) {
                if (error.errors.productImage) {
                    errorMsg = error.errors.productImage.message
                }
                if (error.errors.backImage) {
                    errorMsg = error.errors.backImage.message
                }
                if (error.errors.galleryImage) {
                    errorMsg = error.errors.galleryImage.message
                }
                if (error.errors.productName) {
                    errorMsg = error.errors.productName.message
                }
                if (error.errors.productOrder) {
                    errorMsg = error.errors.productOrder.message
                }
            }
            let obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })

}

let viewProduct = async (req, res) => {

    let obj
    await productModel.find().populate('parentCategory').populate('subCategory').populate('subsubCategory')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                staticPath: process.env.STATICPATHPRODUCT,
                data: resApi
            }
            res.send(obj)
        })
}

let deleteProduct = async (req, res) => {

}

let updateProduct = async (req, res) => {
    let { id } = req.params
    let updateObj = { ...req.body }
    let obj
    if (req.files) {
        if (req.files.productImage) {
            insertObj['productImage'] = req.files.productImage[0].filename
        }
        if (req.files.backImage) {
            insertObj['backImage'] = req.files.backImage[0].filename
        }
        if (req.files.galleryImage) {
            insertObj['galleryImage'] = req.files.galleryImage.map((items) => items.filename)
        }
    }

    await productModel.updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data insert',
                resApi
            }
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'Please fill different Order number'
            }
            if (error.errors) {
                if (error.errors.productImage) {
                    errorMsg = error.errors.productImage.message
                }
                if (error.errors.backImage) {
                    errorMsg = error.errors.backImage.message
                }
                if (error.errors.galleryImage) {
                    errorMsg = error.errors.galleryImage.message
                }
                if (error.errors.productName) {
                    errorMsg = error.errors.productName.message
                }
                if (error.errors.productOrder) {
                    errorMsg = error.errors.productOrder.message
                }
            }
             obj = {
                status: 0,
                errorMsg
            }
        })

        res.send(obj)

}

let mulDelProduct = async (req, res) => {
    let { ids } = req.body
    let obj
    await productModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query'
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no delete query'
            }
            res.send(obj)
        })
}

let statusUpdate = async (req, res) => {
    let { ids, productType } = req.body;
    let obj
    await productModel.updateMany(
        { _id: ids },
        { $set: { productType: productType } }
    )
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update query',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no query update'
            }
            res.send(obj)
        })
}

let parentCategoryApi = async (req, res) => {
    let obj
    categoryModel.find({ categoryStatus: true }).select('categoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi,
            }
            res.send(obj)
        })
}

let subCategoryApi = async (req, res) => {
    let { parentid } = req.params
    let obj

    subCategoryModel.find({ subCategoryStatus: true, parentCategory: parentid }).select('subCategoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })

}

let subsubCategoryApi = async (req, res) => {
    let { subid } = req.params
    let obj
    subsubCategoryModel.find({ subsubCategoryStatus: true, subCategory: subid }).select('subsubCategoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })

}
let colorApi = async (req, res) => {
    let obj

    await colorModel.find({ colorStatus: true }).select('colorName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'color view',
                data: resApi
            }
            res.send(obj)
        })
}

let materialApi = async (req, res) => {

    let obj
    await materialModel.find({ materialStatus: true }).select(' materialName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })

}


let productTypeStatusUpdate = async (req, res) => {
    let { ids } = req.body
    console.log(ids)
    let obj
    let nextStatus
    let data = await productModel.find({ _id: ids })
    for (let item of data) {
        if (item.productType === "Featured") nextStatus = "New Arrivals";
        else if (item.productType === "New Arrivals") nextStatus = "OnSale";
        else nextStatus = "Featured";

        await productModel.updateOne({ _id: item._id }, { $set: { productType: nextStatus } })
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'update status'
                }
                res.send(obj)
            })
            .catch((error) => {
                obj = {
                    status: 0,
                    msg: 'no update'
                }
                res.send(obj)
            })
    }

}



module.exports = { addProduct, viewProduct, deleteProduct, updateProduct, mulDelProduct, statusUpdate, parentCategoryApi, subCategoryApi, subsubCategoryApi, colorApi, materialApi, productTypeStatusUpdate }