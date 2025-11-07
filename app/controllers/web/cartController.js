const { cartModel } = require("../../models/cartModels")

let addToCart = async (req, res) => {
    let { id, prudctId, Image, productName, qty, price } = req.body
    let obj
    console.log(req.body)
    let insertObj = {
        user: id,
        productNameId: prudctId,
        productName: productName,
        productQty: qty,
        productPrice: price,
        productImage: Image
    }
    await cartModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'add cart'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no add'
            }
        })
    res.send(obj)
}

let cartView = async (req, res) => {
    let { id } = req.body

    await cartModel.find({ user: id })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHPRODUCT,
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



let removeCart = async (req, res) => {
    let { cid } = req.body;
    let obj;

    await cartModel.deleteOne({ _id: cid })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'remove product'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'please select one product'
            }
        })
    res.send(obj)
};

let updateQty = async (req, res) => {
    let { id, cid, qty } = req.body
    let obj
    let checkQty = await cartModel.findOne({ _id: cid, user: id })
    let getQty = checkQty.productQty
    console.log(getQty)
    if (getQty >= 1) {
        await cartModel.updateOne({ _id: cid, user: id }, { productQty: qty })
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'update qty'
                }
            })
            .catch((error) => {
                obj = {
                    status: 0,
                    msg: 'no update'
                }
            })
    }


    res.send(obj)
}
module.exports = { addToCart, cartView, removeCart, updateQty }