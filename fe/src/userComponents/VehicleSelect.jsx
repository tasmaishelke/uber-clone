import React from 'react'
import carImg from '../assets/carImg.png'
import bikeImg from '../assets/bikeImg.png'
import autoImg from '../assets/autoImg.png'

const VehiclePanel = (props) => 
  {
    return (
      <div>
        <h5
          onClick={() =>
            {
              props.setVehicleSelectPanel(false)
            }}
          className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

        <div 
          onClick={() =>
            {
              props.setConfirmVehiclePanel(true)                
            }}
          className='w-full p-2 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl'>
          <img className='h-12' src={carImg} alt="Car Image" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>UberGo <i className='ri-user-3-fill'>4</i></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>Rs 190</h2>
        </div>

        <div
          onClick={() =>
            {
              props.setConfirmVehiclePanel(true)                
            }} 
          className='w-full p-2 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl'>
          <img className='h-12' src={bikeImg} alt="Bike Image" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>UberMoto <i className='ri-user-3-fill'>1</i></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>Rs 70</h2>
        </div>

        <div
          onClick={() =>
            {
              props.setConfirmVehiclePanel(true)                
            }} 
          className='w-full p-2 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl'>
          <img className='h-12' src={autoImg} alt="Auto Image" />
          <div className='w-1/2'>
            <h4 className='font-medium text-base'>UberAuto <i className='ri-user-3-fill'>3</i></h4>
            <h5 className='font-medium text-sm'>1 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Rickshaw rides</p>
          </div>
          <h2 className='text-lg font-semibold'>Rs 100</h2>
        </div>
      </div>
    )
  }

export default VehiclePanel