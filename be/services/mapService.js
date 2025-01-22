const axios  = require('axios')

const getAddressCoordinate = async(address) =>
    {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        try
            {
                const res = await axios.get(url);
                if(res.data.status === 'OK')
                    {
                        const location = res.data.results[ 0 ].geometry.location;
                        return{
                                ltd: location.lat,
                                lng: location.lng
                            };                            
                    }
                else
                    {
                        throw new Error('Unable to fetch coordinates');
                    }
            }
        catch(error)
            {
                console.log(error);
                throw error;                
            }
    }

const getDistanceTime = async(origin, destination) =>
    {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

        try
            {
                const res = await axios.get(url);
                if(res.data.status === 'OK')
                    {
                        if(res.data.rows[0].elements[0].status === 'ZERO_RESULTS')
                            {
                                throw new Error('No routes found')
                            }
                        return res.data.rows[0].elements[0]
                    }
                else
                    {
                        throw new Error('Unable to fetch distance and time');
                    }
            }
        catch(error)
            {
                console.log(error);
                throw error;                
            }
    }

const getSuggestion = async(input) =>
    {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

        try
            {
                const res = await axios.get(url);
                if(res.data.status === 'OK')
                    {
                        return res.data.predictions
                    }
                else
                    {
                        throw new Error('Unable to fetch suggestions');
                    }
            }
        catch(error)
            {
                console.log(error);
                throw error;                
            }
    }

module.exports = { getAddressCoordinate, getDistanceTime, getSuggestion }