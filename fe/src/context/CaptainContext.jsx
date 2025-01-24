import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => 
  {
    const [captainContext, setCaptainContext] = useState(null);
    return (
        <CaptainDataContext.Provider value={{captainContext, setCaptainContext}}>
          {children}
        </CaptainDataContext.Provider>
    );
  };

export default CaptainContext;