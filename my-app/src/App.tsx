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

interface StartingPoint {
  rowIndex: number
  columnIndex: number
}

function App() {
  const [row, setRow] = useState<number>(3) //height
  const [column, setColumn] = useState<number>(3) //width

  const [gridArray, setGridArray] = useState<CellType[][]>([])

  useEffect(() => {
    // if (row < 3 || column < 3) return //throw error
    const newGridArray = new Array(Number(row)).fill(
      new Array(Number(column)).fill(CellType.Empty)
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

  function generateRandomIndex(max: number, exclude: number | undefined) {
    let index: number = Math.floor(Math.random() * max)

    if (exclude) {
      if (index >= exclude - 1 && index <= exclude + 1) {
        index = generateRandomIndex(max, exclude)
        return index
      }
    }
    return index
  }

  function generatePoint(
    wall: number,
    excludePoint: StartingPoint | undefined
  ) {
    //jak jest mniej niz 3 to nie ten sam wall
    let rowIndex = 0
    let columnIndex = 0

    console.log('🚀 ~ file: App.tsx:63 ~ App ~ excludePoint:', excludePoint)

    if (wall === 0 || wall === 2) {
      //0 - left    2 - right
      rowIndex = generateRandomIndex(
        row,
        excludePoint ? excludePoint.rowIndex : undefined
      )
      columnIndex = wall === 0 ? 0 : column - 1
    }
    if (wall === 1 || wall === 3) {
      //1 - top     3 - bottom
      columnIndex = generateRandomIndex(
        column,
        excludePoint ? excludePoint.columnIndex : undefined
      )
      rowIndex = wall === 1 ? 0 : row - 1
    }

    return { rowIndex, columnIndex }
  }

  function isCorner(rowIndex: number, columnIndex: number) {
    let isCorner = false
    if (rowIndex === columnIndex) isCorner = true
    if (columnIndex === column - 1 && rowIndex === 0) isCorner = true
    if (rowIndex === row - 1 && columnIndex === 0) isCorner = true
    console.log('🚀 ~ file: App.tsx:95 ~ isCorner ~ isCorner:', isCorner)

    return isCorner
  }

  function chooseGoalPoints2() {
    if (!row || !column) return

    const startWall = Math.floor(Math.random() * 4)
    const endWall = Math.floor(Math.random() * 4)
    console.log('startWall:', startWall, 'endWall:', endWall)

    const startPoint = generatePoint(startWall, undefined)
    const { rowIndex: startRowIndex, columnIndex: startColumnIndex } =
      startPoint

    let endPoint: StartingPoint = generatePoint(endWall, undefined)
    //when walls are the same and not in a corner
    //exclude r/cSP <+1;-1>
    if (endWall === startWall) {
      endPoint = generatePoint(endWall, startPoint)
    } else {
      // when walls are NOT the same and in a corner
      if (isCorner(startRowIndex, startColumnIndex))
        if ((endWall + startWall) % 2 === 1) {
          // exclude <- NOT WORKING PROP

          //SP R0C0     EW1 EX C0,1 r -> 0
          if (startRowIndex === startColumnIndex) {
            endPoint = generatePoint(endWall, { rowIndex: 1, columnIndex: 0 })
          }

          //SP R0Cmax   EW2 EX R0,1 C-> max
          if (startRowIndex === 0 && startColumnIndex === column) {
            endPoint = generatePoint(endWall, {
              rowIndex: 1,
              columnIndex: column,
            })
          }

          //SP RmaxCmax EW3 EX Rmax,max-1 C-> max
          if (startRowIndex === row && startColumnIndex === column) {
            endPoint = generatePoint(endWall, {
              rowIndex: row - 1,
              columnIndex: column,
            })
          }

          //SP RmaxC0   EW0 EX Rmax,max-1 C -> max
          if (startRowIndex === row && startColumnIndex === column) {
            endPoint = generatePoint(endWall, {
              rowIndex: row,
              columnIndex: column - 1,
            })
          }
        }
    }

    const { rowIndex: endRowIndex, columnIndex: endColumnIndex } = endPoint
    console.log('startPoint:', startPoint, 'endPoint:', endPoint)

    let newGridArray: Array<CellType[]> = gridArray.map((arr, newColumnIndex) =>
      [...arr].fill(CellType.Empty)
    )
    newGridArray[startRowIndex][startColumnIndex] = CellType.Start
    newGridArray[endRowIndex][endColumnIndex] = CellType.Meta
    setGridArray(newGridArray)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <button className='button' onClick={chooseGoalPoints2}></button>
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
