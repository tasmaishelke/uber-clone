import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => 
  {
    const [userContext, setUserContext] = useState(null)
    return (
        <UserDataContext.Provider value={{userContext, setUserContext}}>
          {children}
        </UserDataContext.Provider>
    )
  }

export default UserContext