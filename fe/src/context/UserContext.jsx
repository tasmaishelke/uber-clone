import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => 
  {
    const [userContext, setUserContext] = useState({
        email : '',
        fullName : 
          {
            firstName : '',
            lastName : ''      
          }
      })
    return (
      <div>
        <UserDataContext.Provider value={{ userContext, setUserContext }}>
          {children}
        </UserDataContext.Provider>
      </div>
    )
  }

export default UserContext