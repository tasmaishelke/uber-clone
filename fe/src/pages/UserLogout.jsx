import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogout = () => 
  {    
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, 
        {
            headers : 
                {
                    Authorization : `Bearer ${token}`
                }
        })
        .then((res) =>
            {
                if(res.status==200)
                localStorage.removeItem('token')                
            })
        useEffect(()=>
            {
                navigate('/user/login')
            })

    // const logout = async() =>
    //     {
    //         const navigate = useNavigate()
    //         const token = localStorage.getItem('token')
    //         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, 
    //             {
    //                 headers : 
    //                     {
    //                         authorization : `Bearer ${token}`
    //                     }
    //             })
    //         if(res.status==200)
    //             {
    //                 localStorage.removeItem('token')
    //                 navigate('/user/login')
    //             }
    //     }
    // logout()
    
    return (
        <div></div>
    )
  }

export default UserLogout