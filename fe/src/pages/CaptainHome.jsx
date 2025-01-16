import React, {useRef, useState} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../captainComponents/CaptainDetails'
import RidePopUp from '../captainComponents/RidePopUp'

import captainLogo from '../assets/captain.jpg'

const CaptainHome = () => 
  {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(true)

    const ridePopUpPanelRef = useRef(null)

    useGSAP(() =>
      {
        if(ridePopUpPanel)
          {
            gsap.to(ridePopUpPanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(ridePopUpPanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [ridePopUpPanel])

    return (
      <div className='h-screen'>
        <div>
          <img className='absolute w-16 ml-5 mt-5' src={captainLogo} alt="Uber Logo" />
          <Link to='/captain/login' className='bg-white fixed flex items-center justify-center right-2 top-2 h-10 w-10 rounded-full'>
            <i className='ri-logout-box-r-line text-lg'></i>
          </Link>
        </div>

        <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="" />
        </div>

        <div className='h-2/5 p-6'>
          <CaptainDetails />          
        </div>

        <div ref={ridePopUpPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <RidePopUp setRidePopUpPanel={setRidePopUpPanel} />
        </div>
      </div>
    )
  }

export default CaptainHome



