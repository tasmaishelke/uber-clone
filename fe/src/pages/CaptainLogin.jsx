import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'



const CaptainLogin = () => 
  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()    
    const { captain, setCaptain } = useContext(CaptainDataContext)

    const submitHandler = async(e) =>
      {

        e.preventDefault();
        const captainData = 
          {
            email,
            password
          }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)
        if(res.status==200)
          {
            const { captain, token } = res.data;
            setCaptain(captain)
            localStorage.setItem('token', token)
            navigate('/captain/home')

          }
        setEmail('');
        setPassword('');
      }
      

    return (
      <div className='h-screen flex justify-between flex-col w-full'>
        <img className='w-16 ml-5 mt-5' src="https://th.bing.com/th/id/OIP.ohxjboZFgWfmL4ONxlNp3QHaIo?rs=1&pid=ImgDetMain" alt="Uber Logo" />
          <div className='p-7'>

            <form onSubmit={(e) =>
              {
                submitHandler(e)
              }}>
              <h3 className='text-base font-medium mb-2'>What's your Email</h3>
              <input 
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
                required 
                type='email' 
                placeholder='example@email.com'
                value={email}
                onChange={(e) =>
                  {
                    setEmail(e.target.value)
                  }} /> 

              <h3 className='text-base font-medium mb-2'>Enter Password</h3>
              <input 
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
                required 
                type='password' 
                placeholder='password'
                value={password}
                onChange={(e) =>
                  {
                    setPassword(e.target.value)
                  }} />

              <button 
                className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg '>
                  Login Captain
              </button>

              <p className='text-center'>
                Join as Captain? <Link to='/captain/register' className='text-blue-500'>Register as Driver</Link>
              </p>
            </form>        
          </div>

          <div className='p-7'>
            <Link to='/user/login'
              className='bg-[#af5e2f] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 text-lg '>
                Sign in as User
            </Link>
          </div>
      </div>
    )
  }

export default CaptainLogin