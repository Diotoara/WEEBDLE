import React from 'react'

const Grid = ({guess}:{guess:string}) => {
  return (
    <div className='flex gap-2' >
        {Array.from({length:5}).map((_,index) => (
            <div key={index} className='bg-white h-15 w-15 rounded-md flex justify-center items-center text-4xl font-bold '>
              {guess[index] || ""}
            </div>
        ))}
    </div>
  )
}

export default Grid