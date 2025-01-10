import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const CaptainLogin = () => 
  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const submitHandler = (e) =>
      {

        e.preventDefault();
        setCaptainData(
          {
            email,
            password
          })
        console.log(captainData);    
        setEmail('');
        setPassword('');
      }
      

    return (
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-14 mb-1' src="https://th.bing.com/th/id/OIP.ohxjboZFgWfmL4ONxlNp3QHaIo?rs=1&pid=ImgDetMain" alt="Uber Logo" />

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

        <div>
          <Link to='/user/login'
            className='bg-[#af5e2f] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 text-lg '>
              Sign in as User
          </Link>
        </div>
      </div>
    )
  }

export default CaptainLogin