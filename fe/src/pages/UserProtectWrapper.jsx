import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'


const UserProtectWrapper = ({ children }) => 
  {
    const [isLoading, setIsLoading] = useState(true)
    const { setUserContext } = useContext(UserDataContext)
    const token = localStorage.getItem('token')    
    const navigate = useNavigate()

    useEffect(() =>
      {
        if(!token)
            {
              navigate('/user/login')
            }
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/user/profile`,
            {
              headers : 
                    {
                        Authorization : `Bearer ${token}`
                    }
            })
          .then((res) =>
            {
              if(res.status==200)
                {
                  setUserContext(res.data) 
                  setIsLoading(false)
                }
            })
          .catch((err) =>
            {
              console.log(err);
              localStorage.removeItem('token')
              navigate('/user/login')            
            })
      }, [token])

      
        
      if(isLoading)
        {
          return(
            <div>Loading...</div>
          )
        }
    return (
        <>
            {children}
        </>
    )
  }

export default UserProtectWrapper