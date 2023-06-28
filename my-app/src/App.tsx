import React, { useEffect, useState } from 'react'
import './App.css'
import Panel from './Components/Panel'
import Square from './Components/Square/Square'

function App() {
  const [column, setColumn] = useState<string | number>(3)

  const [row, setRow] = useState<string | number>(4)
  const [gridArray, setGridArray] = useState<boolean[][]>([])

  useEffect(() => {
    const newGridArray = new Array(Number(column)).fill(
      new Array(Number(row)).fill(false)
    )
    setGridArray(newGridArray)
  }, [row, column])

  function drawWall(columnIndex: number, rowIndex: number) {
    let newGridArray: Array<boolean[]> = gridArray.map(
      (arr, newColumnIndex) => [...arr]
    )

    newGridArray[rowIndex][columnIndex] = !newGridArray[rowIndex][columnIndex]

    setGridArray(newGridArray)
    console.log('🚀 ~ file: App.tsx:11 ~ App ~ gridArray:', gridArray)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Panel
          height={column}
          setHeight={setColumn}
          width={row}
          setWidth={setRow}
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
