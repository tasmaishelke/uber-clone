import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SocketDataContext } from '../context/SocketContext'

import LiveTracking from '../components/LiveTracking'

import userLogo from '../assets/user.png'
import carImg from '../assets/carImg.png'


const UserRiding = () => 
  {
    const { socket } = useContext(SocketDataContext)
    
    const navigate = useNavigate()

    const location = useLocation()
    const fullRidingDetail = location.state?.fullRidingDetail

    socket.on('ride-ended',(data) => 
      {
        navigate('/user/home')
      })

    return (
      <div className='h-screen'>
        <img className='absolute z-10 w-16 ml-5 mt-5' src={userLogo} alt="Uber Logo" />
        <Link to='/user/home' className='bg-white z-10 fixed flex items-center justify-center right-1 top-1 h-12 w-12 rounded-full'>
          <i className='ri-home-5-line text-lg'></i>
        </Link>
        <div className='h-3/5'>
          <LiveTracking />
        </div>
        <div className='h-2/5 p-6'>
          <div className='flex items-center justify-between'>
            <img className='h-12' src={carImg} alt="Car Image" />
            <div className='text-right'>
              <h2 className='text-lg font-medium capitalize'>{fullRidingDetail?.captainDetail.fullName.firstName + " " + fullRidingDetail?.captainDetail.fullName.lastName}</h2>
              <h4 className='text-xl font-semibold -mt-1 -mb-1'>{fullRidingDetail?.captainDetail.vehicle.plate}</h4>
              {/* <p className='text-gray-600 text-sm'>Maruti suzuki alto</p> */}
            </div>
          </div>
          <div className='flex gap-2 flex-col justify-between items-center'>
            <div className='w-full mt-5'>
        
              <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className='ri-map-pin-2-fill text-2xl'></i>
                <div>
                  <h3 className='text-sm font-medium'>{fullRidingDetail?.destination}</h3>
                  {/* <p className='text-gray-600 text-sm -mt-1'>Dombivli, mumbai</p> */}
                </div>
              </div>
        
              <div className='flex items-center gap-5 p-2'>
                <i className='ri-currency-line text-2xl'></i>
                  <div>
                    <h3 className='text-sm font-medium'>Rs {fullRidingDetail?.fare}</h3>
                    <p className='text-gray-600 text-sm -mt-1'>Cash</p>
                  </div>
              </div>            
            </div>
          </div>
          <button 
            className='bg-green-600 text-white w-full mt-5 font-semibold p-2 rounded-lg'>
            Make a Payment
          </button>
        </div>
      </div>
    )
  }

export default UserRiding