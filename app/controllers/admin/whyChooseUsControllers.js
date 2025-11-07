const { whyChooseModel } = require("../../models/whyChooseUsModels")

let addWhyChoose = async (req, res) => {
    let insertObj = { ...req.body }
    let obj
    if (req.file) {
        if (req.file.filename) {
            insertObj['whyImage'] = req.file.filename
        }
    }
    await whyChooseModel.insertOne(insertObj)
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
            if (error.code == 110000) {
                errorMsg: 'duplicate order number inserted'
            }
            if (error.errors) {
                if (error.errors.whyTitle) {
                    errorMsg = error.errors.whyTitle.message
                }
                if (error.errors.whyImage) {
                    errorMsg = error.errors.whyImage.message
                }

                if (error.errors.whyOrder) {
                    errorMsg = error.errors.whyOrder.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })
}

let viewWhyChoose = async (req, res) => {
    let obj
    await whyChooseModel.find()
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                staticPath: process.env.STATICPATHWHYCHOOSEUS,
                data: resApi
            }
            res.send(obj)
        })
}

let deleteWhyChoose = async (req, res) => {
    let { id } = req.params
    let obj

    await whyChooseModel.delete({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query',

            }
            res.send(obj)
        })

}

let updatewhyChoose = async (req, res) => {
    let { id } = req.params
    let updateObj
    if (req.file) {
        if (req.file.filename) {
            updateObj['whyImage'] = req.file.filename
        }
    }
    await whyChooseModel.updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data update',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 110000) {
                errorMsg: 'duplicate order number inserted'
            }
            if (error.errors) {
                if (error.errors.whyTitle) {
                    errorMsg = error.errors.whyTitle.message
                }
                if (error.errors.whyImage) {
                    errorMsg = error.errors.whyImage.message
                }

                if (error.errors.whyOrder) {
                    errorMsg = error.errors.whyOrder.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })
}

let muldelWhyChoose = async (req, res) => {

    let { ids } = req.body


    let obj
    await whyChooseModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query',
            }
            res.send(obj)
        })
}

let statusUpdate = async (req, res) => {

    let { ids } = req.body
    let obj
    await whyChooseModel.updateMany({ _id: ids }, [
        {
            $set: {
                whyStatus: {
                    $not: "$whyStatus"
                }
            }
        }
    ])
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update query'
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no update query'
            }
            res.send(obj)
        })
}

module.exports = { addWhyChoose, viewWhyChoose, deleteWhyChoose, updatewhyChoose, muldelWhyChoose, statusUpdate }