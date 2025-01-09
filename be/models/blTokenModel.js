const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema(
    {
        token : 
            {
                type : String,
                required : true,
                unique : true,
            },
        createdAt : 
            {
                type : Date,
                default : Date.now,
                expires : 86400, //this can be included in constant - this should be checked in token expiry i.e same amount
            },
        
    });

module.exports = mongoose.model('blacklisttoken', blacklistTokenSchema)