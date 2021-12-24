import React, { useState } from 'react'

export interface filledPositionsInterface {
  [index: number]: 'red' | 'yellow'
}

export type colors = 'yellow' | 'red'

const ConnectFour = () => {
  const [filledPositions, setFilledPositions] =
    useState<filledPositionsInterface>({})
  const [turn, setTurn] = useState<colors>('yellow')

  const findPlayableSlot = (column: number) => {
    for (let i = column + 35; i >= column; i = i - 7) {
      if (filledPositions[i] === undefined) {
        return i
      }
    }
  }

  const highlightPlayableSlotInColumn = (show: boolean, slot: number) => {
    let playableSlot = findPlayableSlot(slot % 7 === 0 ? 7 : slot % 7)


    if (show) {
      document
        .getElementById(
          `slot-${playableSlot}`
        )
        ?.classList.add((turn === 'yellow' ? 'fill-yellow-100' : 'fill-red-100'))
    } else {
      document
        .getElementById(
          `slot-${playableSlot}`
        )
        ?.classList.remove((turn === 'yellow' ? 'fill-yellow-100' : 'fill-red-100'))
    }
  }

  const move = (slot: number) => {
    let playableSlot = findPlayableSlot(slot % 7 === 0 ? 7 : slot % 7)

    if (typeof playableSlot === 'number') {
      let newFilledPositions = { ...filledPositions }
      newFilledPositions[playableSlot] = turn
      setFilledPositions(newFilledPositions)

      setTurn(turn === 'yellow' ? 'red' : 'yellow')
    }
  }

  return (
    <div className='grid grid-rows-5 relative aspect-square w-full'>
      <div className='flex flex-wrap justify-center row-span-4 w-full h-full p-2 bg-blue-300 rounded-md'>
        {Array.from(Array(42), (_, i) => {
          return (
            <div key={i} className='aspect-square p-0.5 h-[calc(100%/6)]'>
              <svg
                id={`slot-${i + 1}`}
                onMouseEnter={() => highlightPlayableSlotInColumn(true, i + 1)}
                onMouseLeave={() => highlightPlayableSlotInColumn(false, i + 1)}
                onClick={() => move(i + 1)}
                viewBox='0 0 100 100'
                className={`fill-white ${filledPositions[i + 1] === 'yellow' ? '!fill-yellow-400' : (filledPositions[i + 1] === 'red' && '!fill-red-400')}`}
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
