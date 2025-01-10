import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'



const UserLogin = () => 
  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    const submitHandler = async(e) =>
      {
        e.preventDefault();
        const userData = 
          {
            email,
            password
          }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)
        
        if(res.status==200)
          {
            const { user, token } = res.data
            setUser(user)
            localStorage.setItem('token', token)
            navigate('/home')
          }
        setEmail('');
        setPassword('');
      }
      

    return (
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

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
                Login User
            </button>

            <p className='text-center'>
              Join as User? <Link to='/user/register' className='text-blue-500'>Create New Account</Link>
            </p>
          </form>        
        </div>

        <div>
          <Link to='/captain/login'
            className='bg-[#356940] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 text-lg '>
              Sign in as Captain
          </Link>
        </div>
      </div>
    )
  }

export default UserLogin