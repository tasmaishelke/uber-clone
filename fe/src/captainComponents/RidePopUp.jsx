import React from 'react'
import profilePhoto from '../assets/profilePhoto.jpg'

const RidePopUp = (props) => 
  {
    return (
      <div>
        <h5
          onClick={() =>
            {
              props.setRidePopUpPanel(false)
            }}
          className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
        </h5>
        <h3 className='text-2xl font-semibold mb-2'>New Ride available</h3>
        <div className='bg-yellow-300 flex items-center justify-between p-4 rounded-2xl'>
            <div className='flex items-center justify-start gap-4'>
                <img className='h-10 w-10 rounded-full' src={profilePhoto} alt="Profile Photo" />
                <h4 className='text-lg font-medium capitalize'>{props.newRide?.userDetail.fullName.firstName + " " + props.newRide?.userDetail.fullName.firstName}</h4>
            </div>
            {/* <h5 className='text-lg font-semibold'>2.2 km</h5> */}
        </div>
        <div className='flex gap-2 flex-col justify-between items-center'>
          <div className='w-full mt-4'>
            <div className='flex items-center gap-5 p-2 border-b-2'>
              <i className='ri-map-pin-user-fill text-2xl'></i>
                <div>
                  <h3 className='text-sm font-medium'>{props.newRide?.origin}</h3>
                  {/* <p className='text-gray-600 text-sm -mt-1'></p> */}
                </div>
            </div>

            <div className='flex items-center gap-5 p-2 border-b-2'>
              <i className='ri-map-pin-2-fill text-2xl'></i>
                <div>
                  <h3 className='text-sm font-medium'>{props.newRide?.destination}</h3>
                  {/* <p className='text-gray-600 text-sm -mt-1'>Dombivli, mumbai</p> */}
                </div>
            </div>

            <div className='flex items-center gap-5 p-2'>
              <i className='ri-currency-line text-2xl'></i>
                <div>
                  <h3 className='text-sm font-medium'>Rs {props.newRide?.fare}</h3>
                  <p className='text-gray-600 text-sm -mt-1'>Cash</p>
                </div>
            </div>            
          </div>
          <div className='flex items-center justify-between w-full mt-2'>            
            <button 
              onClick={() =>
                {
                  props.setRidePopUpPanel(false)                
                }}
              className='bg-gray-300 text-black font-semibold p-2 px-8 rounded-lg'>
              Ignore Ride
            </button>

            <button 
              onClick={() =>
                {
                  props.acceptRide()
                }}
              className='bg-green-600 text-white font-semibold p-2 px-8 rounded-lg'>
              Accept Ride
            </button>
          </div>          
        </div>
      </div>
    )
  }

export default RidePopUp