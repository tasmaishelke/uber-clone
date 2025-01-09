const express = require('express');
const router = express.Router();


const captainSchema = require('../models/captainModel');

//middleware
const { body, validationResult } = require('express-validator')



router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
        body('password').isLength({ min: 2 }).withMessage('Password must be at least 2 characters long'),
        body('vehicle.color').isLength({ min: 2 }).withMessage('Color must be at least 2 characters long'),
        body('vehicle.plate').isLength({ min: 2 }).withMessage('Plate must be at least 2 characters long'),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
        body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }

            const { fullName, email, password, vehicle} = req.body;
            if(!fullName.firstName || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType)
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
                        vehicleType: vehicle.vehicleType,
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


















module.exports = router;