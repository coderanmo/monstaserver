const { materialModel } = require("../../models/meterialModels")

let addMaterial = async (req, res) => {
    let { materialName, materialStatus, materialOrder } = req.body
    let insertObj = { materialName, materialStatus, materialOrder }
    let obj
    await materialModel.insertOne(insertObj)
        .then((resApi) => {
            let obj = {
                status: 1,
                msg: 'material inserted',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'insert unique material name or material order '
            }
            if (error.errors) {
                if (error.errors.colorName.message) {
                    errorMsg = error.errors.colorName.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })

}

let viewMaterial = async (req, res) => {
    let searchMaterial = {}
    if (req.query.searchTitle) {
        searchMaterial['materialName']={
            $regex:req.query.searchTitle,
            $options:'i'
        }
        

    }
    await materialModel.find(searchMaterial)
        .then((resApi) => {
            res.send({
                status: 1,
                msg: 'view material',
                data: resApi
            })
        })
        .catch((error) => {
            res.send({
                status: 0,
                error
            })
        })
}

let deleteMaterial = async (req, res) => {
    let { id } = req.params()

    await materialModel.deleteOne({ _id: id })
        .then((resApi) => {
            res.send({
                status: 1,
                msg: 'delete material',
                resApi
            })
        })
        .catch((error) => {
            res.send({
                status: 0,
                error
            })
        })
}

let updateMaterial = async (req, res) => {
    let { id } = req.params
    console.log(id)
    let { materialName, materialStatus, materialOrder } = req.body
    let updateObj = { materialName, materialStatus, materialOrder }

    await materialModel.updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            let obj = {
                status: 1,
                msg: 'material update',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'update unique material name or material order '
            }
            if (error.errors) {
                if (error.errors.colorName.message) {
                    errorMsg = error.errors.colorName.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })

}
let singleMaterial = async (req, res) => {
    let { id } = req.params
    console.log(id)
    let obj
    await materialModel.findOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
}
let multiDelMaterial = async (req, res) => {
    let { ids } = req.body
    console.log(ids)
    let obj
    await materialModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no query delete',
            }
            res.send(obj)
        })
}

let statusUpdate = async (req, res) => {
    let { ids } = req.body
    let updateRes = await materialModel.updateMany({ _id: ids }, [
        {
            $set: {
                materialStatus: {
                    $not: "$materialStatus"
                }
            }
        }
    ])
    let obj = {
        status: 1,
        msg: 'status update',
        updateRes
    }
    res.send(obj)
}

module.exports = { addMaterial, viewMaterial, deleteMaterial, updateMaterial, multiDelMaterial, singleMaterial, statusUpdate }