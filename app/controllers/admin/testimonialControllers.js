const { testimonialModel } = require("../../models/testimonialsModels")

let addTestimonail = async (req, res) => {

    let insertObj = { ...req.body }
    let obj

    if (req.file) {
        if (req.file.filename) {
            insertObj['testImage'] = req.file.filename
        }
    }
    await testimonialModel.insertOne(insertObj)
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
                errorMsg: 'duplicate order number inserted'
            }
            if (error.errors) {
                if (error.errors.name) {
                    errorMsg = error.errors.name.message
                }
                if (error.errors.testImage) {
                    errorMsg = error.errors.testImage.message
                }
                
                if (error.errors.designation) {
                    errorMsg = error.errors.designation.message
                }
                if (error.errors.rating) {
                    errorMsg = error.errors.rating.message
                }
            }
            obj={
                status:0,
                errorMsg
            }
            res.send(obj)
        })

}

let viewTestimonail = async (req, res) => {
  
    let obj

    await testimonialModel.find()
    .then((resApi)=>{
        obj={
            status:1,
            msg:'data view',
            data:resApi
        }
        res.send(obj)
    })
}

let deleteTestimonail = async (req, res) => {
   let {id}=req.params
    let obj
   await testimonialModel.deleteOne({_id:id})
   .then((resApi)=>{
    obj={
        status:1,
        msg:'delete query',
    }
    res.send(obj)
   })
}

let updateTestimonail = async (req, res) => {
   let {id}=req.params
   let updateObj={...req.body}
    if (req.file) {
        if (req.file.filename) {
            updateObj['testImage'] = req.file.filename
        }
    }
    await testimonialModel.updateOne({_id:id},{$set:updateObj})
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data update',
                resApi
            }
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 110000) {
                errorMsg: 'duplicate order number inserted'
            }
            if (error.errors) {
                if (error.errors.name) {
                    errorMsg = error.errors.name.message
                }
                if (error.errors.testImage) {
                    errorMsg = error.errors.testImage.message
                }
                
                if (error.errors.designation) {
                    errorMsg = error.errors.designation.message
                }
                if (error.errors.rating) {
                    errorMsg = error.errors.rating.message
                }
            }
            obj={
                status:0,
                errorMsg
            }
            res.send(obj)
        })

}

let muldelTestimonail = async (req, res) => {
   let {id}=req.body
   let obj

   await testimonialModel.deleteMany({_id:id})
   .then((resApi)=>{
    obj={
        status:1,
        msg:'delete query',
        resApi
    }
    res.send(obj)
   })

}

let statusUpdate=async (req,res)=>{
    let {ids}=req.body
    let obj

    await testimonialModel.updateMany({_id:ids})
    .then((resApi)=>{
        obj={
           status:1,
           msg:'update query',
           resApi
        }
        res.send(obj)
    })
    .catch((error)=>{
        obj={
            status:0,
            msg:'no update query',
            error
        }
        res.send(obj)
    })
}

let singleDataTestimonial=async (req,res)=>{
    let {id}=req.params
    let obj
    await testimonialModel.findOne({_id:id})
    .then((resApi)=>{
         obj={
            status:1,
            msg:'data view',
            data:resApi
         }
         res.send(obj)
    })
    .catch((error)=>{
        obj={
            status:0,
            msg:'no data view',
            data:resApi
         }
         res.send(obj)
    })
}

module.exports = { addTestimonail, viewTestimonail, deleteTestimonail, updateTestimonail, muldelTestimonail , statusUpdate, singleDataTestimonial}