const userModel = require('../models/userModel');
const blacklistTokenModel = require('../models/blTokenModel')

const jwt = require('jsonwebtoken');

const authUser = async(req, res, next) =>
    {
        const token = req.cookies.cookieToken || req.headers.authorization?.split(' ')[1];
        if(!token)
            {
                return res.status(401).json({ Message : "Unauthorized 1"});
            }
        const isBlacklisted = await blacklistTokenModel.findOne({ token : token }) ;
        if(isBlacklisted)
            {
                return res.status(401).json({ Message : "Unauthorized 2"});
            }

        try
            {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const user = await userModel.findById(decoded.id)
                req.user = user;
                return next();                
            }
        catch(err)
            {
                return res.status(401).json({ Message : "Unauthorized 3"});                
            }
    }

module.exports = authUser