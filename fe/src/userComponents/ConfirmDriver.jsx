import React from 'react'
import carImg from '../assets/carImg.png'


const ConfirmDriver = (props) => 
  {
    return (
      <div>
        <h5
          onClick={() =>
            {
                props.setConfirmDriverPanel(false)
            }}
            className='ri-arrow-down-wide-line -mt-6 text-center text-2xl'>
        </h5>
        <div className='flex items-center justify-between'>
          <img className='h-12' src={carImg} alt="Car Image" />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{props.fullRideDetail?.captainDetail.fullName.firstName + " "+props.fullRideDetail?.captainDetail.fullName.firstName}</h2>
            <h4 className='text-lg font-medium'>{props.fullRideDetail?.captainDetail.vehicle.plate}</h4>
            <p className='text-gray-600 text-sm capitalize'>{props.fullRideDetail?.captainDetail.vehicle.color}</p>
            <p className='text-base font-medium'>OTP : {props.fullRideDetail?.otp}</p>
          </div>
        </div>
        <div className='flex gap-2 flex-col justify-between items-center'>
          <div className='w-full mt-5'>

            <div className='flex items-center gap-5 p-2 border-b-2'>
              <i className='ri-map-pin-user-fill text-2xl'></i>
              <div>
                <h3 className='text-sm font-medium'>{props.fullRideDetail?.origin}</h3>
                {/* <p className='text-gray-600 text-sm -mt-1'>Dombivli, mumbai</p> */}
              </div>
            </div>

            <div className='flex items-center gap-5 p-2 border-b-2'>
              <i className='ri-map-pin-2-fill text-2xl'></i>
              <div>
                <h3 className='text-sm font-medium'>{props.fullRideDetail?.destination}</h3>
                {/* <p className='text-gray-600 text-sm -mt-1'>Dombivli, mumbai</p> */}
              </div>
            </div>

            <div className='flex items-center gap-5 p-2'>
              <i className='ri-currency-line text-2xl'></i>
                <div>
                  <h3 className='text-sm font-medium'>Rs {props.fullRideDetail?.fare}</h3>
                  <p className='text-gray-600 text-sm -mt-1'>Cash</p>
                </div>
            </div>            
          </div>
        </div>
      </div>
    )
  }

export default ConfirmDriver