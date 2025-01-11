import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'




const CaptainProtectWrapper = ({ children }) => 
  {
    const [isLoading, setIsLoading] = useState(true)
    const { setCaptain } = useContext(CaptainDataContext)
    const token = localStorage.getItem('token')    
    const navigate = useNavigate()

    useEffect(() =>
      {
        if(!token)
            {
              navigate('/captain/login')
            }
      }, [token])

      axios
          .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,
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
                  setCaptain(res.data.captain)
                  setIsLoading(false)
                }
            })
          .catch((err) =>
            {
              console.log(err);
              localStorage.removeItem('token')
              navigate('/captain/login')            
            })
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

export default CaptainProtectWrapper