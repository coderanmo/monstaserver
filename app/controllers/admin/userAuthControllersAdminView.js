const { userAuthModel } = require("../../models/userAuthModels")

let viewUser = async (req, res) => {
    let obj
    await userAuthModel.find()
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data view',
                data: resApi
            }
            res.send(obj)
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data view'
            }
            res.send(obj)
        })
}

let userUpdateStatus = async (req, res) => {
    let obj
    let { ids } = req.body
    console.log(ids)
    await userAuthModel.updateMany({ _id: ids }, [
        {
            $set: {
                userStatus: {
                    $not: '$userStatus'
                }
            }
        }
    ])
    .then((resApi)=>{
        obj={
            status:1,
            msg:'update status'
        }
    })
    .catch((error)=>{
        obj={
            status:0,
            mg:'please select one box'
        }
    })
    res.send(obj)
}


module.exports = { viewUser,userUpdateStatus }