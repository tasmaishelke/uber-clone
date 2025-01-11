const express = require('express');
const router = express.Router();


const captainSchema = require('../models/captainModel');
const blacklistTokenSchema = require('../models/blTokenModel');

//middleware
const { authCaptain } = require('../middlewares/authMiddleware');
const { body, validationResult } = require('express-validator');



router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
        body('password').isLength({ min: 2 }).withMessage('Password must be at least 2 characters long'),
        body('vehicle.color').isLength({ min: 2 }).withMessage('Color must be at least 2 characters long'),
        body('vehicle.plate').isLength({ min: 2 }).withMessage('Plate must be at least 2 characters long'),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
        body('vehicle.type').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }

            const { fullName, email, password, vehicle} = req.body;
            if(!fullName.firstName || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.type)
                {
                    throw new Error("All fields are required");
                }
            
            const duplicateEmail = await captainSchema.findOne({ email });
            if(duplicateEmail)
                {
                    return res.status(409).json({ Message : "This email is not available" });
                }

            const hashedPassword = await captainSchema.hashPassword(password);

            const captainObject = 
            {    
                fullName : 
                    {
                        firstName : fullName.firstName,
                        lastName : fullName.lastName,
                    },                
                email,
                password : hashedPassword,
                vehicle : 
                    {
                        color : vehicle.color,
                        plate : vehicle.plate,
                        capacity : vehicle.capacity,
                        type: vehicle.type,
                    }
            }
            const captain = await captainSchema.create(captainObject)
            const token = await captain.generateAuthToken();
            if(captain)
                {
                    res.status(201).json({ Message : `New user with email ${email} created`, captain, token})
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

            const captain = await captainSchema.findOne({ email }).select('+password');
            if(!captain)
                {
                    return res.status(401).json({ Message : "Invalid credentials"})
                }
            const isPasswordCorrect = await captain.comparePassword(password);
            if(!isPasswordCorrect)
                {
                    return res.status(401).json({ message: "Invalid credentials" })
                }
            const token = await captain.generateAuthToken();
            res.cookie('cookieToken', token)
            res.status(200).json({ token, captain})
        })

router.get('/profile', authCaptain,
    async(req, res, next) =>
        {
            res.status(200).json(req.captain);
        })

router.get('/logout', authCaptain,
    async(req, res, next) =>
        {
            const token = req.cookies.cookieToken || req.headers.authorization?.split(' ')[1];
            await blacklistTokenSchema.create({ token });
            res.clearCookie('cookieToken');
            res.status(200).json({ Message : "Logged out"});
        })












module.exports = router;