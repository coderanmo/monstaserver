const { orderModel } = require("../../models/orderModels")
let razorpay = require('razorpay')
let crypto=require('crypto')
const { cartModel } = require("../../models/cartModels")
var instance = new razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
})

let saveOrder = async (req, res) => {
    let orderObj = { ...req.body }
    let obj
    let { id, ...orData } = orderObj
    if (orData.paymentMethod == 1) {
        orData['orderStatus'] = 'process'
        orData['userId'] = id
        await orderModel.insertOne(orData)
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'save order'
                }
            })
            .catch((error) => {
                obj = {
                    status: 0,
                    msg: 'all filed required'
                }
            })
        res.sed(obj)
    }
    else {

        // step 1 db order create
        orData['orderStatus'] = 'process'
        orData['userId'] = id
        orData['paymentStatus'] = 1
        let order = await orderModel(orData)
        let dbRes = await order.save()
        let orderID = dbRes._id
        // razorpay order create 
        let orderObj = {
            "amount": orData.orderAmount * 100,
            "currency": "INR",
            "receipt": orderID
        }
        let orderRes = await instance.orders.create(orderObj)
        // update orderId
        let updateRes = await orderModel.updateOne({ _id: orderID },
            {
                $set: {
                    rozorpayOrderId: orderRes.id // razorpay order id
                }
            })

        res.send(orderRes)
    }
}

let viewOrder = async (req, res) => {
    let { id } = req.body
    console.log(req.body)
    let obj
    await orderModel.find({ userId: id })
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

let verifyOrder = async (req, res) => {
   let {razorpay_payment_id , razorpay_order_id , razorpay_signature,id}=req.body
   
    // razorpay_payment_id , razorpay_order_id=new singnature
    // new signature==razorpay_signture==payment verify
    // true => order_status,payment_status,rozarpay_payment_id
    let obj
    
    let hmac=crypto.createHmac('sha256','68E17CNWY8SemCvZ6ylOkuOY')
    hmac.update(razorpay_order_id +  "|" + razorpay_payment_id )
    let generated_signature=hmac.digest('hex')

    if(generated_signature==razorpay_signature)
    {
        orderModel.updateOne({rozorpayOrderId:razorpay_payment_id},{$set:{
            paymentStatus:2,
            rozorpayPayment:razorpay_payment_id ,
            orderStatus:'process'
             
        }})

        // delete cart
        await cartModel.deleteMany({user:id})
        .then((resApi)=>{
            obj={
                status:1,
                msg:'confirm order'
            }
        })

    }

   res.send(obj)
}

module.exports = { saveOrder, viewOrder, verifyOrder }