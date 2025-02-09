import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import profilePhoto from '../assets/profilePhoto.jpg'

const ConfirmRidePopUp = (props) => 
  {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    
    const submitHandler = async(e) =>
        {
            e.preventDefault()
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
                {
                    rideId : props.fullRideDetail._id,
                    otp : otp
                },
                {
                    headers : 
                        {
                            Authorization : `Bearer ${localStorage.getItem('token')}`
                        }
                })
            if(res.status === 200)
            {
                props.setFullRideDetail(res.data)
                navigate('/captain/riding', {state : {fullRidingDetail : res.data}})
            }
        }

    return (
        <div>
            <h5
                onClick={() =>
                {
                    props.setConfirmRidePopUpPanel(false)
                }}
                className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
            </h5>
            <h3 className='text-2xl font-semibold mb-2'>Confirm Ride</h3>
            <div className='bg-yellow-300 flex items-center justify-between p-4 rounded-2xl'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='h-10 w-10 rounded-full' src={profilePhoto} alt="Profile Photo" />
                    <h4 className='text-lg font-medium capitalize'>{props.fullRideDetail?.userDetail.fullName.firstName + " "+props.fullRideDetail?.userDetail.fullName.firstName}</h4>
                </div>
                {/* <h5 className='text-lg font-semibold'>2.2 km</h5> */}
            </div>
            <div className='flex gap-2 flex-col justify-between items-center'>
                <div className='w-full mt-4'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className='ri-map-pin-user-fill text-2xl'></i>
                        <div>
                            <h3 className='text-sm font-medium'>{props.fullRideDetail?.origin}</h3>
                            {/* <p className='text-gray-600 text-sm'>Dombivli, mumbai</p> */}
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
                
                <div className='w-full m-2'>
                    <form onSubmit={submitHandler}>
                        <input
                            className='bg-[#eee] w-full px-8 py-4 text-lg font-mono placeholder:text-base rounded-lg'
                            required
                            type="text"
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) =>
                                {
                                    setOtp(e.target.value)
                                }} />

                        <button 
                            className='bg-green-600 text-white w-full mt-2 font-semibold p-2 rounded-lg'>
                            Confirm Ride
                        </button>
                    </form>                    
                    <button 
                        onClick={() =>
                            {
                                props.setConfirmRidePopUpPanel(false)
                                props.setRidePopUpPanel(false)
                            }}
                        className='bg-red-500 text-white w-full mt-2 font-semibold p-2 rounded-lg'>
                        Cancel Ride
                    </button>
                </div>
            </div>
        </div>
    )
  }

export default ConfirmRidePopUp