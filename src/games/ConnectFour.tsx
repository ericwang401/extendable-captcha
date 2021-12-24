import React, { useState } from 'react'

interface filledPositionsInterface {
    [index: number]: 'red' | 'yellow';
}

const ConnectFour = () => {
  const filledPositions: filledPositionsInterface = {}
  const findPlayableSlot = (column: number) => {
    for (let i = column + 35; i >= column; i = i - 7) {
        if (filledPositions[i] === undefined) {
            return i
        }

    }
  }

  const highlightPlayableSlotInColumn = (show: boolean, slot: number) => {
    if (show) {
        document.getElementById(`slot-${findPlayableSlot((slot % 7 === 0) ? 7 : slot % 7)}`)?.classList.add('fill-red-100')
    } else {
        document.getElementById(`slot-${findPlayableSlot((slot % 7 === 0) ? 7 : slot % 7)}`)?.classList.remove('fill-red-100')
    }
  }

  return (
    <div className='grid grid-rows-5 relative aspect-square w-full'>
      <div className='flex flex-wrap justify-center row-span-4 w-full h-full p-2 bg-blue-300 rounded-md'>
        {Array.from(Array(42), (e, i) => {
          return (
            <div key={i} className='aspect-square p-0.5 h-[calc(100%/6)]'>
              <svg
                id={`slot-${i + 1}`}
                onMouseEnter={() => highlightPlayableSlotInColumn(true, i + 1)}
                onMouseLeave={() => highlightPlayableSlotInColumn(false, i + 1)}
                viewBox='0 0 100 100'
                className='fill-white'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='50' cy='50' r='50' />
              </svg>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConnectFour
