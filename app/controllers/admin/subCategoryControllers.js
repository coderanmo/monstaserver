const { categoryModel } = require("../../models/categoryModels")
const { subCategoryModel } = require("../../models/subCategoryModels")

let addSubCategory = async (req, res) => {
    let insertObj = { ...req.body }
    let obj
    if (req.file) {
        if (req.file.filename) {
            insertObj['subCategoryImage'] = req.file.filename
        }
    }
    subCategoryModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'insert data',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'order no is already exist'
            }
            if (error.errors) {
                if (error.errors.subCategoryName) {
                    errorMsg = error.errors.subCategoryName.message
                }
                if (error.errors.subCategoryImage) {
                    errorMsg = error.errors.subCategoryImage.message
                }
                if (error.errors.subCategoryOrder) {
                    errorMsg = error.errors.subCategoryOrder.message
                }
            }

            obj = {
                status: 0,
                msg: 'no insert data',
                errorMsg
            }
            res.send(obj)
        })
}

let viewSubCategory = async (req, res) => {
    let obj
    await subCategoryModel.find().populate('parentCategory')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                staticPath: process.env.STATICPATHSUBCATEGORY,
                data: resApi
            }
            res.send(obj)
        })
}

let deleteSubCategory = async (req, res) => {
    let { id } = req.params
    let obj
    await subCategoryModel.deleteOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query'
            }
            res.send(obj)
        })
}

let updateSubCategory = async (req, res) => {
    let { id } = req.params
    let updateObj = {...req.body }
    if (req.file) {
        if (req.file.filename) {
            updateObj['subCategoryImage'] = req.file.filename
        }
    }
    await subCategoryModel.updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update data',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'order no is already exist'
            }
            if (error.errors) {
                if (error.errors.subCategoryName) {
                    errorMsg = error.errors.subCategoryName.message
                }
                if (error.errors.subCategoryImage) {
                    errorMsg = error.errors.subCategoryImage.message
                }
                if (error.errors.subCategoryOrder) {
                    errorMsg = error.errors.subCategoryOrder.message
                }
            }
            obj = {
                status: 0,
                msg: 'no update data',
                errorMsg
            }
            res.send(obj)
        })

}

let mulDelSubCategory = async (req, res) => {
    let { ids } = req.body
    await subCategoryModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query'
            }
            res.send(obj)
        })
}

let parentCategory = (req, res) => {
    let obj
    categoryModel.find({ categoryStatus: true })
        .select('categoryName')
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
}

let statusUpdate = async (req, res) => {
    let { ids } = req.body
    let obj
    await subCategoryModel.updateMany({ _id: ids }, [
        {
            $set: {
                subCategoryStatus: {
                    $not: "$subCategoryStatus"
                }
            }
        }
    ])
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'query update'
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data update'
            }
            res.send(obj)
        })
}

let singleData = async (req, res) => {
    let { id } = req.params
    let obj
    await subCategoryModel.findOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi,
                staticPath: process.env.STATICPATHSUBCATEGORY,
            }
            res.send(obj)
        })

}
module.exports = { addSubCategory, viewSubCategory, deleteSubCategory, updateSubCategory, mulDelSubCategory, parentCategory, statusUpdate, singleData }