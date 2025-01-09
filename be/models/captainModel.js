const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema(
    {
        fullName : 
            {
                firstName : 
                    {
                        type : String,
                        required : [true, "Please provide a First name"],
                        minLength : [2, "First Name must contain at least 2 letters"],
                    },
                lastName : 
                    {
                        type : String,
                        // required : [true, "Please provide a Last name"],
                        minLength : [2, "Last Name must contain at least 2 letters"],
                    },
            },
        email : 
            {
                type : String,
                required : [true, "Please provide a email"],
                unique : true,
                lowercase : true,
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
        status : 
            {
                type : String,
                enum : ['active', 'inactive'],
                default : 'inactive',
            },
        vehicle :
            {
                color : 
                    {
                        type : String,
                        required : [true, "Please provide a color"],
                        minLength : [2, "color must contain at least 2 letters"],
                    },
                plate : 
                    {
                        type : String,
                        required : [true, "Please provide a plate"],
                        minLength : [2, "plate must contain at least 2 letters"],
                    },
                capacity : 
                    {
                        type : Number,
                        required : [true, "Please provide a capacity"],
                        minLength : [1, "capacity must be at least 1"],
                    },
                vehicleType :
                    {
                        type : String,
                        required : [true, "Please provide a vehicle type"],
                        enum : ['car', 'motorcycle', 'auto'],
                    },
            },
        location :
            {
                lat : 
                    {
                        type : Number,
                    },
                lng : 
                    {
                        type : Number,
                    },
            },
    })

captainSchema.methods.generateAuthToken = function () 
    {
        const token = jwt.sign(
            { 
                id: this._id 
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_LIFETIME
            });
        return token;
    }


captainSchema.methods.comparePassword = function (password) 
    {
        return bcrypt.compareSync(password, this.password);
    }


captainSchema.statics.hashPassword = function (password) 
    {
        return bcrypt.hashSync(password, 10);
    }

module.exports = mongoose.model('captain', captainSchema)