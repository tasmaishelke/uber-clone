import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketDataContext = createContext();

const socket = io('https://rx7z3ptt-3000.inc1.devtunnels.ms');

const SocketContext = ({children}) => 
    {
        useEffect(() => 
            {
                // Basic connection logic
                socket.on('connect', () => 
                    {
                        console.log('Connected to server');
                    });

                socket.on('disconnect', () => 
                    {
                        console.log('Disconnected from server');
                    });
            }, []);



        return (
            <SocketDataContext.Provider value={{socket}}>
                {children}
            </SocketDataContext.Provider>
        );
    };

export default SocketContext