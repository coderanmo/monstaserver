
const { countryModel } = require("../../models/countryModels")

let addCountry = async (req, res) => {

    let { categoryName, categoryOrder } = req.body
    let insertObj = { categoryName, categoryOrder }

    let obj
    await countryModel.insertOne(insertObj)
        .then((resApi) => {
            let obj = {
                status: 1,
                msg: 'add caregory',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'Insert Unique Order Number'
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

let viewCountry =async  (req, res) => {

    await countryModel.find()
        .then((resApi) => {
            res.send({
                status: 1,
                msg:'view category',
                data:resApi
            })
        })
        .catch((error) => {
            res.send({
                status: 0,
                error
            })
        })
}

let deleteCountry = (req, res) => {
    let { id } = req.params()
    countryModel.deleteOne()
        .then((resAppi) => {
            res.send({
                status: 1,
                msg: 'delete material',
                resAppi
            })
        })
        .catch((error) => {
            status: 0,
                error
        })
}

let updateCountry = async (req, res) => {
    let { id } = req.params

    await countryModel.updateOne({ _id: id }, { $set: id })
        .then((resApi) => {
            let obj = {
                status: 1,
                msg: 'update caregory',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'update Unique Order Number'
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

let delMulCountry = async (req, res) => {
    let { ids } = req.body
    let obj
    await countryModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query'
            }
            res.send(obj)
        }
        )
}


let singleCountry=async (req,res)=>{
    let {id}=req.params
    console.log(id)
    let obj 
    await countryModel.findOne({_id:id})
    .then((resApi)=>{
        obj={
            status:1,
            data:resApi
        }
        res.send(obj)
    })
     
}

module.exports = { addCountry, viewCountry, deleteCountry, updateCountry,delMulCountry,singleCountry}
