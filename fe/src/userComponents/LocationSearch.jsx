import React from 'react'

const LocationSearch = (props) => 
  {    
    const handleSuggestionClick = (element) => 
      {
        if (props.activeField === 'origin') 
          {
            props.setOrigin(element)
          } 
        else if (props.activeField === 'destination') 
          {
            props.setDestination(element)
          }
      }

    return (
      <div>        
        {
          props.suggestion.map((element, index) =>
            {
              return(
                <div 
                  onClick={() =>
                    {
                      handleSuggestionClick(element.description)
                    }} 
                  key={index}
                  className='flex gap-4 items-center p-2 my-2 justify-start border-2 active:border-black rounded-xl'>
                  <h2 className='bg-[#eee] h-6 w-6 flex items-center justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
                  <h4 className='font-medium text-sm'>{element.description}</h4>
                </div>)
            })
        }
      </div>
    )
  }

export default LocationSearch