import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketDataContext } from '../context/SocketContext'

import LiveTracking from '../components/LiveTracking'

import CaptainDetails from '../captainComponents/CaptainDetails'
import RidePopUp from '../captainComponents/RidePopUp'
import ConfirmRidePopUp from '../captainComponents/ConfirmRidePopUp'

import captainLogo from '../assets/captain.jpg'

const CaptainHome = () => 
  {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
    const [newRide, setNewRide] = useState(null)
    const [fullRideDetail, setFullRideDetail] = useState(null)

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)

    const { captainContext } = useContext(CaptainDataContext)
    const { socket } = useContext(SocketDataContext)

    useEffect(() =>
      {
        socket.emit('join',
          {
            userType : 'captain',
            userId : captainContext._id
          })

        const updateLocation = () =>
          {
            if(navigator.geolocation)
              {
                navigator.geolocation.getCurrentPosition(position =>
                  {
                    socket.emit('update-location-captain',
                      {
                        userId : captainContext._id,
                        location : 
                          {
                            ltd : position.coords.latitude,
                            lng : position.coords.longitude
                          }
                      })
                  console.log({location : 
                    {
                      ltd : position.coords.latitude,
                      lng : position.coords.longitude
                    }});
                    
                  })
              }
          }
        updateLocation()
        // setInterval(updateLocation, 5000);
      },[])

    socket.on('new-ride', (data) =>
      {
        setNewRide(data)
        setRidePopUpPanel(true)
      })

    const acceptRide = async() =>
      {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/accept-ride`,
          {
            rideId: newRide._id,
          },
          {
            headers: 
            {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        setFullRideDetail(res.data)
        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)
      }
          
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

    useGSAP(() =>
      {
        if(confirmRidePopUpPanel)
          {
            gsap.to(confirmRidePopUpPanelRef.current,
              {
                transform : 'translateY(0)'
              })
          }
        else
          {
            gsap.to(confirmRidePopUpPanelRef.current,
              {
                transform : 'translateY(100%)'
              })
          }        
      }, [confirmRidePopUpPanel])

    return (
      <div className='h-screen'>
        <div>
          <img className='absolute z-10 w-16 ml-5 mt-5' src={captainLogo} alt="Uber Logo" />
          <Link to='/captain/logout' className='bg-white z-10 fixed flex items-center justify-center right-1 top-1 h-12 w-12 rounded-full'>
            <i className='ri-logout-box-r-line text-lg'></i>
          </Link>
        </div>

        <div className='h-3/5'>
          <LiveTracking />
        </div>

        <div className='h-2/5 p-6'>
          <CaptainDetails />          
        </div>

        <div ref={ridePopUpPanelRef} className='bg-white w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <RidePopUp
            newRide={newRide}
            acceptRide={acceptRide}
            setRidePopUpPanel={setRidePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
        </div>

        <div ref={confirmRidePopUpPanelRef} className='bg-white h-screen w-full p-6 fixed z-10 bottom-0 translate-y-full'>
          <ConfirmRidePopUp
            fullRideDetail={fullRideDetail}
            setFullRideDetail={setFullRideDetail}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            setRidePopUpPanel={setRidePopUpPanel} />
        </div>
      </div>
    )
  }

export default CaptainHome



