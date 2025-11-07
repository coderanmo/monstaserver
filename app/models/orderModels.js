let mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
    orderItems: [],
    shippingAddress: {
        type: Object
    },
    paymentMethod: {
        type: String,
        enum: ['1', '2'],
        default: '1'
    },
    paymentStatus: {
        type: String,
        enum: ['1', '2', '3'],
        default: 1
    },
    rozorpayOrderId: {
        type: String
    },
    rozorpayPayment: {
        type: String
    },
    orderAmount: {
        type: Number
    },
    orderQty: {
        type: Number,
    },
    shippingCharges: {
        type: Number
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'process', 'completed'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userauth'
    },
    createdAt:
     { type: Date, default: Date.now }


})

let orderModel = mongoose.model('order', orderSchema)

module.exports = { orderModel }