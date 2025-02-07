import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = 
    {
        width: '100%',
        height: '100%',
    };

const center = 
    {
        lat: 19.076090,
        lng: 72.877426
    };

const LiveTracking = () => 
    {
        const [ currentPosition, setCurrentPosition ] = useState(center);
        useEffect(() => 
            {
                navigator.geolocation.getCurrentPosition((position) => 
                    {
                        const { latitude, longitude } = position.coords;
                        setCurrentPosition(
                            {
                                lat: latitude,
                                lng: longitude
                            });
                    });
    
                const watchId = navigator.geolocation.watchPosition((position) => 
                    {
                        const { latitude, longitude } = position.coords;
                        setCurrentPosition(
                            {
                                lat: latitude,
                                lng: longitude
                            });
                    });
    
                return () => navigator.geolocation.clearWatch(watchId);
            }, []);

        useEffect(() => 
            {
                const updatePosition = () => 
                    {
                        navigator.geolocation.getCurrentPosition((position) => 
                            {
                                const { latitude, longitude } = position.coords;                
                                console.log('Position updated:', latitude, longitude);
                                setCurrentPosition(
                                    {
                                        lat: latitude,
                                        lng: longitude
                                    });
                            });
                    };
    
                updatePosition(); // Initial position update    
                setInterval(updatePosition, 2000); // Update every 10 seconds    
            }, []);
    
        return (
            <LoadScript googleMapsApiKey={import.meta.env.MAPS_API_KEY}>
                <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentPosition}
                        zoom={15}>
                    <Marker position={currentPosition} /> 
                </GoogleMap>
            </LoadScript>
        )
    }

export default LiveTracking