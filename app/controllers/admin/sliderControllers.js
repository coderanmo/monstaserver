const { sliderModel } = require("../../models/sliderModels")

let addSlider = async (req, res) => {

    let insertObj = { ...req.body }
    let obj

    if (req.file) {
        if (req.file.filename) {
            insertObj['sliderImage'] = req.file.filename
        }
    }
    console.log(insertObj)
    await sliderModel.insertOne(insertObj)
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

                if (error.errors.sliderImage) {
                    errorMsg = error.errors.sliderImage.message
                }
                if (error.errors.sliderOrder) {
                    errorMsg = error.errors.sliderOrder.message
                }
            }
            obj={
                status: 0,
                errorMsg
            }
            res.send(obj)
        })
}

let viewSlider = async (req, res) => {

    let obj
    await sliderModel.find()
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHSLIDER,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
}


let deleteSlider = async (req, res) => {

    let { id } = req.params
    let obj
    await sliderModel.deleteOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query'
            }
            res.send(obj)
        })
}


let updateSlider = async (req, res) => {
    let { id } = req.params
    let updateObj

    if (req.file) {
        if (req.file.filename) {
            updateObj['sliderImage'] = req.file.filename
        }
    }
    await sliderModel.updateOne({ _id: id }, { $set: updateObj })
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

                if (error.errors.sliderImage) {
                    errorMsg = error.errors.sliderImage.message
                }

                if (error.errors.sliderOrder) {
                    errorMsg = error.errors.sliderOrder.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })

}

let muldelslider = async (req, res) => {
    let { ids } = req.body
    let obj

    await sliderModel.deleteMany({ _id: ids })
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
    
    await sliderModel.updateMany({ _id: ids },[
        {
            $set: {
                sliderStatus: {
                    $not: "$sliderStatus"
                }
            }
        }
    ])
    .then((resApi)=>{
        obj={
            status:1,
            msg:'update status'
        }
        res.send(obj)
    })
    .catch((error)=>{
        obj={
            status:1,
            msg:'no status update'
        }
        res.send(obj)
    })
}

module.exports = { addSlider, viewSlider, deleteSlider, updateSlider, muldelslider , statusUpdate }
