const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const { body, validationResult } = require('express-validator')



router.post('/register', 
    [
        body('email').isEmail().withMessage("Invalid email"),
        body('fullName.firstName').isLength({ min : 2 }).withMessage("First Name must contain at least 2 letters"),
        body('password').isLength({ min : 2 }).withMessage("Password must contain at least 2 letters"),
    ],
    async(req, res, next) =>
        {
            const { fullName, email, password} = req.body;
            if(!fullName.firstName || !email || !password)
                {
                    throw new Error("All fields are required");
                }
            console.log(req.body);
            
            const duplicateEmail = await userModel.findOne({ email });
            if(duplicateEmail)
                {
                    return res.status(409).json({ Message : "This email is not available" });
                }

            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const userObject = 
            {    
                fullName : 
                    {
                        firstName : fullName.firstName,
                        lastName : fullName.lastName,
                    },                
                email,
                password : hashedPassword
            }
            console.log(userObject);
            const user = await userModel.create(userObject)
            const token = jwt.sign(
                {
                    _id : user._id
                },
                process.env.JWT_SECRET
            )  
            if(user)
                {
                    res.status(201).json({ Message : `New user with email ${email} created`, user, token})
                }
            else
                {
                    res.status(400).json({ Message : "Invalid user data"})
                }
              
                    
        }
    )

module.exports = router