import React, { useEffect, useState } from 'react'
import './App.css'
import Panel from './Components/Panel'
import Square from './Components/Square/Square'

export enum CellType {
  Empty,
  Wall,
  Start,
  Meta,
}

interface PointParam {
  R: number
  C: number
}

function App() {
  const [column, setColumn] = useState<number>(3)

  const [row, setRow] = useState<number>(4)
  const [gridArray, setGridArray] = useState<CellType[][]>([])

  useEffect(() => {
    const newGridArray = new Array(row).fill(
      new Array(column).fill(CellType.Empty)
    )
    setGridArray(newGridArray)
  }, [row, column])

  function drawWall(columnIndex: number, rowIndex: number) {
    let newGridArray: Array<CellType[]> = gridArray.map(
      (arr, newColumnIndex) => [...arr]
    )

    newGridArray[rowIndex][columnIndex] =
      newGridArray[rowIndex][columnIndex] === CellType.Empty
        ? CellType.Wall
        : CellType.Empty

    setGridArray(newGridArray)
  }

  function chooseGoalPoints() {
    let possiblePointsArray: PointParam[] = []

    gridArray.forEach((arr, newRowIndex) =>
      arr.forEach((value, newColumnIndex) => {
        if (
          newRowIndex === 0 ||
          newColumnIndex === 0 ||
          newRowIndex === row - 1 ||
          newColumnIndex === column - 1
        ) {
          possiblePointsArray.push({
            R: newRowIndex,
            C: newColumnIndex,
          })
        }
      })
    )

    // let startIndex = 9
    let startIndex = Math.floor(Math.random() * possiblePointsArray.length)

    const startPoint = possiblePointsArray[startIndex]

    const slicedArray = possiblePointsArray.filter((element) => {
      let isFlagged = true

      if (element === startPoint) isFlagged = false
      if (element.R === startPoint.R) {
        if (element.C === startPoint.C - 1 || element.C === startPoint.C + 1)
          isFlagged = false
      }
      if (element.C === startPoint.C) {
        if (element.R === startPoint.R - 1 || element.R === startPoint.R + 1)
          isFlagged = false
      }

      return isFlagged
    })

    let endIndex = Math.floor(Math.random() * slicedArray.length)

    const endPoint = slicedArray[endIndex]

    showOnGrid(startPoint, endPoint)
  }

  function showOnGrid(startPoint: PointParam, endPoint: PointParam) {
    if (!row || !column) return
    let newGridArray: Array<CellType[]> = gridArray.map((arr, newColumnIndex) =>
      [...arr].fill(CellType.Empty)
    )
    newGridArray[startPoint.R][startPoint.C] = CellType.Start
    newGridArray[endPoint.R][endPoint.C] = CellType.Meta
    setGridArray(newGridArray)

    console.log('startPoint:', startPoint, 'endPoint:', endPoint)
    console.log('~~~~~~~~~~~~~~~~~~~~')
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <button className='button' onClick={chooseGoalPoints}></button>
        <Panel
          height={row}
          setHeight={setRow}
          width={column}
          setWidth={setColumn}
        />
        {gridArray.map((column, rowIndex) => (
          <div key={'row' + rowIndex} className='row'>
            {column.map((isClicked, columnIndex) => (
              <Square
                key={'column' + columnIndex}
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                isClicked={isClicked}
                drawWall={drawWall}
              ></Square>
            ))}
          </div>
        ))}
      </header>
    </div>
  )
}

export default App
