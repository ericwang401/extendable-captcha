import React, { useState, useEffect } from 'react'

export interface filledPositionsInterface {
  [index: number]: string | 'red' | 'yellow'
}

export type colors = string | 'yellow' | 'red'

const ConnectFour = () => {
  const [filledPositions, setFilledPositions] =
    useState<filledPositionsInterface>({})
  const [turn, setTurn] = useState<colors>('yellow')
  const [winner, setWinner] = useState<colors>('')

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
        .getElementById(`slot-${playableSlot}`)
        ?.classList.add(turn === 'yellow' ? 'fill-yellow-100' : 'fill-red-100')
    } else {
      document
        .getElementById(`slot-${playableSlot}`)
        ?.classList.remove(
          turn === 'yellow' ? 'fill-yellow-100' : 'fill-red-100'
        )
    }
  }

  useEffect(() => {
    let filledInData = { ...filledPositions }

    const checkLine = (a: number, b: number, c: number, d: number): boolean => {
      // Check first cell non-zero and all cells match
      return a !== 0 && a === b && a === c && a === d
    }

    const checkWinner = (bd: number[][]) => {
      // Check down
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++)
          if (checkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
            return bd[r][c]

      // Check right
      for (let r = 0; r < 6; r++)
        for (let c = 0; c < 4; c++)
          if (checkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
            return bd[r][c]

      // Check down-right
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 4; c++)
          if (
            checkLine(
              bd[r][c],
              bd[r + 1][c + 1],
              bd[r + 2][c + 2],
              bd[r + 3][c + 3]
            )
          )
            return bd[r][c]

      // Check down-left
      for (let r = 3; r < 6; r++)
        for (let c = 0; c < 4; c++)
          if (
            checkLine(
              bd[r][c],
              bd[r - 1][c + 1],
              bd[r - 2][c + 2],
              bd[r - 3][c + 3]
            )
          )
            return bd[r][c]

      return 0
    }

    // if there aren't moves  from 1-42, fill them in

    for (let i = 1; i < 43; i++) {
      if (filledInData[i] === undefined) {
        filledInData[i] = ''
      }
    }

    // convert it into an Array

    let convertedData: number[][] = []

    for (let i = 1; i < 42; i = i + 7) {
      let groupedMoves: number[] = []

      for (let v = 0; v <= 7; v++) {
        let selectedMove = filledInData[i + v]

        if (v === 7) {
          convertedData.push(groupedMoves)
        } else {
          if (selectedMove.length === 0) {
            groupedMoves.push(0)
          } else if (selectedMove === 'yellow') {
            groupedMoves.push(1)
          } else if (selectedMove === 'red') {
            groupedMoves.push(2)
          }
        }
      }
    }

    let winner = checkWinner(convertedData)

    switch (winner) {
        case 1:
            setWinner('yellow')
            break;
        case 2:
            setWinner('red')
            break;
    }

  }, [filledPositions])

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
                className={`fill-white ${
                  filledPositions[i + 1] === 'yellow'
                    ? '!fill-yellow-400'
                    : filledPositions[i + 1] === 'red' && '!fill-red-400'
                }`}
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='50' cy='50' r='50' />
              </svg>
            </div>
          )
        })}
      </div>

      <div className="row-span-1 w-full h-full">{ winner }</div>
    </div>
  )
}

export default ConnectFour
