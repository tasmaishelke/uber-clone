import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => 
  {
    const [captainContext, setCaptainContext] = useState(null);
    const value = {
      captainContext,
      setCaptainContext,

  };
    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
  };

export default CaptainContext;