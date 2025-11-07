const { colorModel } = require("../../models/colorModels")

let addColor = async (req, res) => {
    let { colorName, colorCode, colorOrder } = req.body
    let insertObj = { colorName, colorCode, colorOrder }
    console.log(insertObj)
    let obj
    await colorModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'create color',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code = 11000) {

                errorMsg = 'duplicate color Name or color Order inserted'
            }
            if (error.errors) {
                if (error.errors.colorName.message) {
                    errorMsg = error.errors.colorName.message
                }
            }

            let obj = {
                status: 0,
                errorMsg,
                error
            }
            res.send(obj)
        })
}

let viewColor = async (req, res) => {
    let obj

    let searchColor ={}
    if (req.query.searchTitle) {
        searchColor['colorName'] = {
            $regex: req.query.searchTitle,
            $options: 'i'
        }
    }


        await colorModel.find(searchColor)
            .then((resApi) => {
                obj = {
                    status: 1,
                    data: resApi
                }
            })
            .catch((error) => {
                obj = {
                    status: 0,
                    msg: 'no data'
                }
            })
        res.send(obj)
    }

    let deleteColor = (req, res) => {
        let { id } = req.params
        console.log(id)
        colorModel.deleteOne({ _id: id })
            .then((resApi) => {
                res.send({
                    status: 1,
                    msg: 'delete color',
                    resApi
                })
            })
            .catch((error) => {
                res.send({
                    status: 0,
                    msg: 'no color inserted',
                    error
                })
            })
    }
    let multiDelete = async (req, res) => {
        let { ids } = req.body
        console.log(ids)
        let obj
        await colorModel.deleteMany({ _id: ids })
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
                    msg: 'no delete query'
                }
                res.send(resApi)
            })
    }

    let updateColor = async (req, res) => {
        let { id } = req.params
        console.log(id)
        let { colorName, colorCode, colorOrder } = req.body
        let updateObj = { colorName, colorCode, colorOrder }
        let obj
        await colorModel.updateOne({ _id: id }, { $set: updateObj })
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'update color',
                    resApi
                }
                res.send(obj)
            })
            .catch((error) => {
                let errorMsg
                if (error.code = 11000) {

                    errorMsg = 'duplicate color Name or color Order inserted'
                }
                if (error.errors) {
                    if (error.errors.colorName.message) {
                        errorMsg = error.errors.colorName.message
                    }
                }

                let obj = {
                    status: 0,
                    errorMsg,
                    error
                }
                res.send(obj)
            })
    }

    let singleColor = async (req, res) => {
        let { id } = req.params

        let obj
        await colorModel.findOne({ _id: id })
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: "color data view",
                    data: resApi
                }
                res.send(obj)
            })
    }

    let colorStatusUpdate = async (req, res) => {
        let { ids } = req.body
        let obj
        await colorModel.updateMany({ _id: ids }, [
            {
                $set: {
                    colorStatus: {
                        $not: "$colorStatus"
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
                    status: 0,
                    msg: 'no status update',

                }
                res.send(obj)
            })
    }

    module.exports = { addColor, viewColor, deleteColor, updateColor, multiDelete, singleColor, colorStatusUpdate }