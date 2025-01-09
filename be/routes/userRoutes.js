const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = require('../models/userModel');
const blacklistTokenSchema = require('../models/blTokenModel')

//middleware
const { authUser } = require('../middlewares/authMiddleware')
const { body, validationResult } = require('express-validator')



router.post('/register', 
    [
        body('email').isEmail().withMessage("Invalid email"),
        body('fullName.firstName').isLength({ min : 2 }).withMessage("First Name must contain at least 2 letters"),
        body('password').isLength({ min : 2 }).withMessage("Password must contain at least 2 letters"),
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }

            const { fullName, email, password } = req.body;
            if(!fullName.firstName || !email || !password)
                {
                    throw new Error("All fields are required");
                }
            
            const duplicateEmail = await userSchema.findOne({ email });
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
            const user = await userSchema.create(userObject)
            const token = jwt.sign(
                {
                    id : user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : process.env.JWT_LIFETIME
                })  
            if(user)
                {
                    res.status(201).json({ Message : `New user with email ${email} created`, user, token})
                }
            else
                {
                    res.status(400).json({ Message : "Invalid user data"})
                }                    
        })


router.post('/login', 
    [
        body('email').isEmail().withMessage("Invalid email"),
        body('password').isLength({ min : 2 }).withMessage("Password must contain at least 2 letters"),
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
                
            const { email, password } = req.body;
            if(!email || !password)
                {
                    return res.status(400).json({ Message : "Please Provide details"})
                }

            const user = await userSchema.findOne({ email }).select('+password');
            if(!user)
                {
                    return res.status(401).json({ Message : "Invalid credentials"})
                }
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if(!isPasswordCorrect)
                {
                    return res.status(401).json({ message: "Invalid credentials" })
                }
            const token = jwt.sign(
                {
                    id : user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : process.env.JWT_LIFETIME
                }) 
            res.cookie('cookieToken', token)
            res.status(200).json({ token, user})
        })

router.get('/profile', authUser,
    async(req, res, next) =>
        {
            res.status(200).json(req.user);
        })

router.get('/logout', authUser,
    async(req, res, next) =>
        {
            const token = req.cookies.cookieToken || req.headers.authorization?.split(' ')[1];
            await blacklistTokenSchema.create({ token });
            res.clearCookie('cookieToken');
            res.status(200).json({ Message : "Logged out"});
        })



module.exports = router