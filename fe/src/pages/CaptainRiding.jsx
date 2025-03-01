import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import LiveTracking from '../components/LiveTracking'

import FinishRide from '../captainComponents/FinishRide'

import captainLogo from '../assets/captain.jpg'



const CaptainRiding = () => 
  {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const location = useLocation()
    const fullRidingDetail = location.state?.fullRidingDetail

    const finishRidePanelRef = useRef(null)
    useGSAP(() =>
      {
        if(finishRidePanel)
          {
            gsap.to(finishRidePanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(finishRidePanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [finishRidePanel])

    return (
      <div>
        <div className='h-screen relative'>
          <div>
            <img className='absolute z-10 w-16 ml-5 mt-5' src={captainLogo} alt="Uber Logo" />
            <Link to='/captain/home' className='bg-white z-10 fixed flex items-center justify-center right-1 top-1 h-12 w-12 rounded-full'>
              <i className='ri-logout-box-r-line text-lg'></i>
            </Link>
          </div>

          <div className='h-4/5'>
            <LiveTracking />
          </div>

          <div
            onClick={() =>
            {
              setFinishRidePanel(true)
            }}
            className='bg-yellow-300 relative flex items-center justify-between h-1/5 p-6'>
          
            <h5
              className='ri-arrow-down-wide-line absolute right-6 top-2 text-2xl'>
            </h5>
            <h4 className='text-xl font-semibold'>4 km away</h4>
            <button 
              className='bg-green-600 text-white font-semibold p-2 px-8 rounded-lg'>
              Complete Details
            </button>
          </div>        
        </div>
        <div ref={finishRidePanelRef} className='bg-white h-screen w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <FinishRide
            fullRidingDetail={fullRidingDetail}
            setFinishRidePanel={setFinishRidePanel} />
        </div>
      </div>
    )
  }

export default CaptainRiding