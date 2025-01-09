const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName : 
            {
                firstName : 
                    {
                        type : String,
                        required : [true, "Please provide a name"],
                        minLength : [2, "First Name must contain at least 2 letters"],
                    },
                lastName : 
                    {
                        type : String,
                        // required : [true, "Please provide a name"],
                        minLength : [2, "Last Name must contain at least 2 letters"],
                    },
            },
        email : 
            {
                type : String,
                required : [true, "Please provide a email"],
                unique : true,
                match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
                minLength : [2, "Email must contain at least 2 letters"],
            },
        password : 
            {
                type : String,
                required : [true, 'Please Provide a password'],
                minLength : [2, "Password must contain at least 2 letters"],
                select : false,
            },
        socketId : 
            {
                type : String,
            },
            
    });




module.exports =  mongoose.model('user', userSchema);