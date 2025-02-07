const express = require('express')
const router = express.Router();

const rideSchema = require('../models/rideModel');
const { getCoordinate } = require('../services/mapService')
const { getFare, getOtp, getCaptainsInRadius } = require('../services/rideService')
const { sendMessageToSocketId } = require('../socket')

//middleware
const { authUser, authCaptain } = require('../middlewares/authMiddleware')
const { body, query, validationResult } = require('express-validator')

router.post('/create-ride',
    authUser,
    [
        body('origin').isString().isLength({ min: 3 }).withMessage('Invalid origin address'),
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
                    userDetail : _id,
                    origin,
                    destination,
                    otp : getOtp(6),
                    fare : fare[vehicleType]
                }
            try 
                {
                    const ride = await rideSchema.create(rideObject)
                    res.status(201).json(ride)
                    const rideDetailWithUserDetail = await rideSchema.findOne({_id : ride._id}).populate('userDetail')
                    const originCoordinate = await getCoordinate(origin)
                    const captainsInRadius = await getCaptainsInRadius(originCoordinate.ltd, originCoordinate.lng, 4)
                    captainsInRadius.map(captain =>
                        {
                            sendMessageToSocketId(captain.socketId,
                                {
                                    event : 'new-ride',
                                    data : rideDetailWithUserDetail
                                })                            
                        })
                }
            catch(error) 
                {
                    return res.status(500).json({ Message : error.message})
                }
        })

router.get('/get-fare',
    authUser,
    [
        query('origin').isString().isLength({ min: 3 }).withMessage('Invalid origin address'),
        query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            
            const { origin, destination} = req.query
            try 
                {
                    const fare = await getFare(origin, destination)
                    return res.status(201).json(fare)
                }
            catch(error) 
                {
                    return res.status(500).json({ Message : error.message})
                }

        })

router.post('/accept-ride',
    authCaptain,
    [
        body('rideId').isMongoId().withMessage('Invalid ride id')
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            const { rideId } = req.body
            const { _id } = req.captain
            
            try 
                {
                    await rideSchema.findOneAndUpdate(
                        {
                            _id : rideId
                        },
                        {
                            status : 'accepted',
                            captainDetail : _id
                        })
                    const rideDetailWithAllDetail = await rideSchema.findOne({ _id : rideId }).populate('userDetail').populate('captainDetail').select('+otp');
                    if(!rideDetailWithAllDetail) 
                        {
                            throw new Error('Ride not found');
                        }
                    sendMessageToSocketId(rideDetailWithAllDetail.userDetail.socketId,
                        {
                            event : 'ride-confirmed',
                            data : rideDetailWithAllDetail
                        })
                    return res.status(200).json(rideDetailWithAllDetail)
                }
            catch(error) 
                {
                    return res.status(500).json({ Message : error.message})
                }
        })

router.post('/start-ride',
    authCaptain,
    [
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        body('otp').isString().isLength({min : 6, max : 6}).withMessage('Invalid OTP'),
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            const { rideId, otp } = req.body
            try 
                {
                    const ride = await rideSchema.findOne({ _id : rideId })
                    if(ride.status !== 'accepted')
                        {
                            throw new Error('Ride not accepted');
                        }
                    await rideSchema.findOneAndUpdate(
                        {
                            _id: rideId
                        },
                        {
                            status : 'ongoing'
                        })
                    const rideDetailWithAllDetail = await rideSchema.findOne({ _id : rideId }).populate('userDetail').populate('captainDetail').select('+otp');
                    if(rideDetailWithAllDetail.otp !== otp)
                        {
                            await rideSchema.findOneAndUpdate(
                                {
                                    _id: rideId
                                },
                                {
                                    status : 'accepted'
                                })
                            throw new Error('Invalid OTP');
                        }
                    sendMessageToSocketId(rideDetailWithAllDetail.userDetail.socketId,
                        {
                            event : 'ride-started',
                            data : rideDetailWithAllDetail
                        })
            
                    return res.status(200).json(rideDetailWithAllDetail);
                    
                }
            catch(error) 
                {
                    return res.status(500).json({ Message : error.message})
                }
        })

router.post('/end-ride',
    authCaptain,
    [
        body('rideId').isMongoId().withMessage('Invalid ride id'),
    ],
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            const { rideId } = req.body
            const { _id } = req.captain
            try 
                {
                    const ride = await rideSchema.findOne({ _id : rideId, captainDetail : _id })
                    if(ride.status !== 'ongoing')
                        {
                            throw new Error('Ride not ongoing');
                        }
                    await rideSchema.findOneAndUpdate(
                        {
                            _id: rideId
                        },
                        {
                            status : 'completed'
                        })
                    const rideDetailWithAllDetail = await rideSchema.findOne({ _id : rideId }).populate('userDetail').populate('captainDetail');
                    
                    sendMessageToSocketId(rideDetailWithAllDetail.userDetail.socketId,
                        {
                            event : 'ride-ended',
                            data : rideDetailWithAllDetail
                        })
            
                    return res.status(200).json(rideDetailWithAllDetail);
                    
                }
            catch(error) 
                {
                    return res.status(500).json({ Message : error.message})
                }
        })







module.exports = router
