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
    console.log(
      '🚀 ~ file: App.tsx:45 ~ generateRandomIndex ~ exclude:',
      exclude
    )
    let index: number = Math.floor(Math.random() * max)
    console.log('🚀 ~ file: App.tsx:50 ~ generateRandomIndex ~ index:', index)

    if (exclude) {
      if (index >= exclude - 1 && index <= exclude + 1) {
        index = Math.floor(Math.random() * max)
        console.log(
          '🚀 ~ file: App.tsx:55 ~ generateRandomIndex ~ index:',
          index,
          ' exclude'
        )
      }
    }
    return index
  }

  function generatePoint(wall: number, startPoint: StartingPoint | undefined) {
    console.log(
      '🚀 ~ file: App.tsx:55 ~ generatePoint ~ startPoint:',
      startPoint
    )
    //jak jest mniej niz 3 to nie ten sam wall
    let rowIndex = 0
    let columnIndex = 0

    if (wall === 0 || wall === 2) {
      rowIndex = generateRandomIndex(
        row,
        startPoint ? startPoint.rowIndex : undefined
      )
      columnIndex = wall === 0 ? 0 : column - 1
    }
    if (wall === 1 || wall === 3) {
      columnIndex = generateRandomIndex(
        column,
        startPoint ? startPoint.columnIndex : undefined
      )
      rowIndex = wall === 1 ? 0 : row - 1
    }
    console.log(
      '🚀 ~ file: App.tsx:55 ~ generatePoint ~ wynik:',
      rowIndex,
      columnIndex
    )
    return { rowIndex, columnIndex }
  }

  function isCorner(startRowIndex: number, startColumnIndex: number) {
    let isCorner = false
    if (startRowIndex === startColumnIndex) isCorner = true
    if (startColumnIndex === column - 1 && startRowIndex === 0) isCorner = true
    if (startRowIndex === row - 1 && startColumnIndex === 0) isCorner = true

    return isCorner
  }

  function chooseGoalPoints() {
    if (!row || !column) return

    const startWall = Math.floor(Math.random() * 4)
    const endWall = Math.floor(Math.random() * 4)
    const startPoint = generatePoint(startWall, undefined)

    const { rowIndex: startRowIndex, columnIndex: startColumnIndex } =
      startPoint

    const endPoint =
      endWall === startWall ||
      startRowIndex === startColumnIndex ||
      startRowIndex === 0
        ? generatePoint(endWall, startPoint)
        : generatePoint(endWall, undefined)
    const { rowIndex: endRowIndex, columnIndex: endColumnIndex } = endPoint

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
