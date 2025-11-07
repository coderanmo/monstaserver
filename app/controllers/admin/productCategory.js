const { categoryModel } = require("../../models/categoryModels")

let addCategory = async (req, res) => {
    let objInsert = { ...req.body }
    let obj
    if (req.file) {
        if (req.file.filename) {
            objInsert['categoryImage'] = req.file.filename
        }
    }
    await categoryModel.insertOne(objInsert)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'category data',
                data: resApi
            }
            res.send(obj)
        })
        .then((error) => {
            obj = {
                status: 0,
                msg: 'no data view',
                error
            }
            res.send(obj)
        })
}

let viewCategory = async (req, res) => {

    let obj
    await categoryModel.find()
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHCATEGORY,
                msg: 'view data',
                data: resApi
            }
            res.send(obj)
        })
}

let deleteCategory = async (req, res) => {
    let { id } = req.params

    let obj
    await categoryModel.delete({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query'
            }
            res.send(obj)
        })
}

let updateCategory = (req, res) => {
    res.send('category')
}

let singleCategory = async (req, res) => {
    let { id } = req.params
    let obj
    await categoryModel.findOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
}

let multiDeleteCategory = async (req, res) => {
    let { ids } = req.body
    let obj
    await categoryModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete quiery'
            }
            res.send(obj)
        })
}

let statusUpdate = async (req, res) => {
    let { ids } = req.body
    await categoryModel.updateMany({ _id: ids }, [
        {
            $set: {
                categoryStatus: {
                    $not: "$categoryStatus"
                }
            }
        }
    ])
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'status update',

            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 1,
                msg: 'no status update',

            }
            res.send(obj)
        })

}

module.exports = { addCategory, viewCategory, deleteCategory, updateCategory, singleCategory, statusUpdate, multiDeleteCategory }