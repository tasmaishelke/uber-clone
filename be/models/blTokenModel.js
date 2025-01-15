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
                expires : process.env.BL_TOKEN_LIFETIME, //this can be included in constant - this should be checked in token expiry i.e same amount
            },
        
    });

module.exports = mongoose.model('blacklisttoken', blacklistTokenSchema)