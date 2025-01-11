import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainLogout = () => 
  {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    axios
        .get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,
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
            navigate('/captain/login')
        })

    return (
        <div></div>
    )
  }

export default CaptainLogout