const express = require('express')
const router = express.Router();

const rideSchema = require('../models/rideModel');
const { getFare, getOtp } = require('../services/rideService')

//middleware
const { authUser } = require('../middlewares/authMiddleware')
const { body, validationResult } = require('express-validator')

router.post('/create',
    authUser,
    [
        body('origin').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
        body('vehicleType').isString().isIn([ 'auto', 'car', 'motorcycle' ]).withMessage('Invalid vehicle type'),
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            
            const { origin, destination, vehicleType } = req.body
            const { _id } = req.user

            if(!_id || !origin || !destination || !vehicleType)
                {
                    throw new Error("All fields are required");
                }
            const fare = await getFare(origin, destination)
            const rideObject = 
                {
                    userId : _id,
                    origin,
                    destination,
                    otp : getOtp(6),
                    fare : fare[vehicleType]
                }
            try 
                {
                    const ride = await rideSchema.create(rideObject)
                    return res.status(201).json(ride)                    
                }
            catch(error) 
                {
                    return res.status(500).json({ Message : error.message})
                }
        })

module.exports = router
