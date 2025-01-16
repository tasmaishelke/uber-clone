import React from 'react'
import carImg from '../assets/carImg.png'

const LookingDriver = (props) => 
  {
    return (
      <div>
        <h5
          onClick={() =>
            {
              props.setLookingDriverPanel(false)
            }}
            className='ri-arrow-down-wide-line absolute right-6 text-2xl'>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>        
        <div className='flex gap-2 flex-col justify-between items-center'>
          <img className='h-24' src={carImg} alt="Car Image" />
          <div className='w-full mt-5'>

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
        </div>
        <button onClick={()=>{props.setLookingDriverPanel(false); props.setConfirmDriverPanel(true)}}> confirm driver</button>
      </div>
    )
  }

export default LookingDriver