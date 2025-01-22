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

module.exports = { getAddressCoordinate }