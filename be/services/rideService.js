const crypto = require('crypto')
const { getDistanceTime } = require('./mapService')

const getFare = async(origin, destination) =>
    {
        const distanceTime = await getDistanceTime(origin, destination);

        const baseFare = 
            {
                auto : 30,
                car : 50,
                motorcycle : 20
            }
        const perKmRate = 
            {
                auto : 10,
                car : 15,
                motorcycle : 8
            }
        const perMinuteRate = 
            {
                auto : 2,
                car : 3,
                motorcycle : 1.5
            }
        const fare = 
            {
                auto : Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
                car : Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
                motorcycle : Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle)),
            }
        return fare
    }

const getOtp = (num) =>
    {
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString()
        return otp
    }

module.exports = { getFare, getOtp }
