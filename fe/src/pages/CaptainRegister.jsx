import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

import captainLogo from '../assets/captain.jpg'

const CaptainRegister = () => 
  {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')

    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext)

    const submitHandler = async(e) =>
      {
        e.preventDefault();
        const captainData = 
          {
            fullName : 
              {
                firstName,
                lastName,
              },
            email,
            password,
            vehicle :
              {
                color : vehicleColor,
                plate : vehiclePlate,
                capacity : vehicleCapacity,
                type : vehicleType
              }
          }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)
        if(res.status==201)
          {
            const { captain, token } = res.data
            setCaptain(captain)
            localStorage.setItem('token', token)
            navigate('/captain/home')
          }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
      }
      

    return (
      <div className='h-screen flex justify-between flex-col w-full'>
        <img className='w-16 ml-6 mt-6' src={captainLogo} alt="Uber Logo" />
          <div className='p-6'>

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
              
              <h3 className='text-base font-medium mb-2'>Vehicle Info</h3>
                <div className='flex gap-4 mb-7'>
                  <input 
                    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                    required 
                    type='text' 
                    placeholder='Color'
                    value={vehicleColor}
                    onChange={(e) =>
                      {
                        setVehicleColor(e.target.value)
                      }} />

                  <input 
                    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                    required 
                    type='text' 
                    placeholder='Plate'
                    value={vehiclePlate}
                    onChange={(e) =>
                      {
                        setVehiclePlate(e.target.value)
                      }} />
                </div>
                <div className='flex gap-4 mb-7'>
                  <input 
                    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                    required 
                    type='number' 
                    placeholder='Capacity'
                    value={vehicleCapacity}
                    onChange={(e) =>
                      {
                        setVehicleCapacity(e.target.value)
                      }} />
                  <select 
                    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                    required 
                    value={vehicleType}
                    onChange={(e) =>
                      {
                        setVehicleType(e.target.value)
                      }}>
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>

              <button 
                className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg '>
                  Create Captain
              </button>

              <p className='text-center'>
                Already have an account? <Link to='/captain/login' className='text-blue-500'>Login here</Link>
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

export default CaptainRegister