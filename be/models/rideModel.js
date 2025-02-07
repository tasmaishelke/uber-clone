const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema(
    {
        userDetail : 
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user',
                required : true
            },
        captainDetail :
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'captain',
            },
        origin : 
            {
                type : String,
                required : true
            },
        destination : 
            {
                type : String,
                required : true
            },
        fare : 
            {
                type : Number,
                required : true
            },
        status : 
            {
                type: String,
                enum: [ 'pending', 'accepted', 'ongoing', 'completed', 'cancelled' ],
                default: 'pending',
            },
        duration : 
            {
                type : Number //in secs
            },
        distance : 
            {
                type : Number //in meters
            },
        paymentId : 
            {
                type : String
            },
        orderId : 
            {
                type : String
            },
        signature : 
            {
                type : String
            },
        otp : 
            {
                type : String,
                select : false,
                required : true
            },
    })

module.exports = mongoose.model('ride', rideSchema)

