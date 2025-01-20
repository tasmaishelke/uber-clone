import React from 'react'
import { Link } from 'react-router-dom'

import profilePhoto from '../assets/profilePhoto.jpg'

const FinishRide = (props) => {
  return (
    <div>
      <h5
        onClick={() =>
        {
            props.setFinishRidePanel(false)
        }}
        className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
      </h5>
      <h3 className='text-2xl font-semibold mb-2'>Finish Ride</h3>
      <div className='flex items-center justify-between p-4 border-2 border-yellow-500 rounded-2xl'>
        <div className='flex items-center justify-start gap-4'>
          <img className='h-10 w-10 rounded-full' src={profilePhoto} alt="Profile Photo" />
          <h4 className='text-lg font-medium'>Tasmai shelke</h4>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>
      <div className='flex gap-2 flex-col justify-between items-center'>
        <div className='w-full mt-4'>
          <div className='flex items-center gap-5 p-2 border-b-2'>
            <i className='ri-map-pin-user-fill text-2xl'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11a</h3>
              <p className='text-gray-600 text-sm -mt-1'>Dombivli, mumbai</p>
            </div>
          </div>
    
          <div className='flex items-center gap-5 p-2 border-b-2'>
            <i className='ri-map-pin-2-fill text-2xl'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11a</h3>
              <p className='text-gray-600 text-sm -mt-1'>Dombivli, mumbai</p>
            </div>
          </div>
    
          <div className='flex items-center gap-5 p-2'>
            <i className='ri-currency-line text-2xl'></i>
            <div>
              <h3 className='text-lg font-medium'>Rs 190</h3>
              <p className='text-gray-600 text-sm -mt-1'>Cash</p>
            </div>
          </div>
        </div>
            
        <div className='w-full m-10'>
          <Link 
              to='/captain/home'
              className='bg-green-600 flex justify-center text-white text-center w-full mt-6 font-semibold p-2 rounded-lg'>
            Finish Ride
          </Link> 
          <p className='mt-10 text-xs text-center '>Click on finish ride botton if you have completed the payment</p>         
        </div>
      </div>
    </div>
  )
}

export default FinishRide