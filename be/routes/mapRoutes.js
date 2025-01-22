const express = require('express')
const router = express.Router();

const { getAddressCoordinate } = require('../services/mapService')

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
                    const coordinates = await getAddressCoordinate(address);
                    res.status(200).json(coordinates)
                }
            catch(error)
                {
                    res.status(404).json({ Message : "Coordinate not found"})
                }
        })

module.exports = router
