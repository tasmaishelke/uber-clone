import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserRegister = () => 
  {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    const submitHandler = async(e) =>
      {
        e.preventDefault();
        const userData =
          {
            fullName : 
              {
                firstName,
                lastName,
              },
            email,
            password
          }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData)
        if(res.status==201)
          {
            const { user, token } = res.data
            setUser(user)
            localStorage.setItem('token', token)
            navigate('/user/home')
          }
        setEmail('');
        setFirstName('');
        setLastName('');
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
            <h3 className='text-base font-medium mb-2'>What's your Fullname</h3>
              <div className='flex gap-4 mb-6'>
                <input 
                  className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                  required 
                  type='text' 
                  placeholder='First name'
                  value={firstName}
                  onChange={(e) =>
                    {
                      setFirstName(e.target.value)
                    }} />
                <input 
                  className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                  required 
                  type='text' 
                  placeholder='Last name'
                  value={lastName}
                  onChange={(e) =>
                    {
                      setLastName(e.target.value)
                    }} />
              </div>
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
                Create User
            </button>

            <p className='text-center'>
              Already have an account? <Link to='/user/login' className='text-blue-500'>Login here</Link>
            </p>
          </form>        
        </div>

        <div>
          <p className='text-[9px] leading-tight text-center'>
            Terms and condtions
          </p>
        </div>
      </div>
    )
  }

export default UserRegister