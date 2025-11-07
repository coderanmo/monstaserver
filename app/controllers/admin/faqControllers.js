const { faqModel } = require("../../models/faqModels")

let addFaq = (req, res) => {
    let { faqQuestion, faqAnswer, faqStatus, faqOrder } = req.body
    let insertObj = { faqQuestion, faqAnswer, faqStatus, faqOrder }
    let obj
    faqModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'add faq',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'Duplicate value inserted'
            }
            if (error.errors) {
                if (error.errors.faqQuestion.message) {
                    errorMsg = error.errors.faqQuestion.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })

}
let viewFaq = (req, res) => {
    faqModel.find()
        .then((resApi) => {
            res.send({
                status: 1,
                msg: 'view faq',
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

let deleteFaq = (req, res) => {
    let { id } = req.params()
    faqModel.deleteOne({ _id: id })
        .then((resApi) => {
            res.send({
                status: 1,
                msg: 'delete faq',
                resApi
            })
        })
        .catch((error) => {
            status: 0,
                error
        })

}

let updateFaq = async (req, res) => {
    let { id } = req.params
    let { faqQuestion, faqAnswer, faqStatus, faqOrder } = req.body
    let updateObj = { faqQuestion, faqAnswer, faqStatus, faqOrder }
    let obj
    await faqModel.updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'update faq',
                resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 11000) {
                errorMsg = 'Duplicate value inserted'
            }
            if (error.errors) {
                if (error.errors.faqQuestion.message) {
                    errorMsg = error.errors.faqQuestion.message
                }
            }
            obj = {
                status: 0,
                errorMsg
            }
            res.send(obj)
        })
}
let multiDelFaq=async (req,res)=>{
    let {ids}=req.body
    console.log(ids)
    let obj
    await  faqModel.deleteMany({_id:ids})
    .then((resApi)=>{
       obj={
        status:1,
        msg:"delete query",
        resApi
       }
       res.send(obj)
    })

}
let singleFaq=async (req,res)=>{
    let {id}=req.params
    let obj
    await faqModel.findOne({_id:id})
    .then((resApi)=>{
        obj={
            status:1,
            data:resApi
        }
        res.send(obj)
    })
}

let statusUpdate=async (req,res)=>{
    let { ids } = req.body
        let obj
        await faqModel.updateMany({ _id: ids }, [
            {
                $set: {
                    faqStatus: {
                        $not: "$faqStatus"
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

module.exports = { addFaq, viewFaq, deleteFaq, updateFaq, multiDelFaq,singleFaq,statusUpdate}