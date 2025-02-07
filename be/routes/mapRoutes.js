const express = require('express')
const router = express.Router();

const { getCoordinate, getDistanceTime, getSuggestion } = require('../services/mapService')

// middlewares
const { authUser } = require('../middlewares/authMiddleware')
const { query, validationResult } = require('express-validator')

router.get('/get-coordinate',
    [
        query('address').isString().isLength({ min: 3 })
    ],
    authUser,
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }

            const { address } = req.query;
            try
                {
                    const coordinate = await getCoordinate(address);
                    res.status(200).json(coordinate)
                }
            catch(error)
                {
                    res.status(404).json({ Message : "Coordinate not found"})
                }
        })


router.get('/get-distance-time',
    [
        query('origin').isString().isLength({ min: 3 }),
        query('destination').isString().isLength({ min: 3 })
    ],
    authUser,
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            const { origin, destination } = req.query;
            try
                {
                    const distanceTime = await getDistanceTime(origin, destination);
                    res.status(200).json(distanceTime)
                }
            catch(error)
                {
                    res.status(404).json({ Message : "Distance and time not found"})
                }
        }
)

router.get('/get-suggestion',
    [
        query('input').isString().isLength({ min: 2 }),
    ],
    authUser,
    async(req, res, next) =>
        {
            const errors = validationResult(req)
            if(!errors.isEmpty())
                {
                    return res.status(400).json({ errors : errors.array()});
                }
            const { input } = req.query;
            try
                {
                    const suggestion = await getSuggestion(input);
                    res.status(200).json(suggestion)
                }
            catch(error)
                {
                    res.status(404).json({ Message : "Suggestions not found"})
                }
        }
)

module.exports = router
