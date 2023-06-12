import React, { useState } from 'react'
import './App.css'
import Panel from './Components/Panel'
import Square from './Components/Square/Square'

function App() {
  const [height, setHeight] = useState<string | number>(3)
  console.log('🚀 ~ file: App.tsx:8 ~ App ~ height:', height)
  const [width, setWidth] = useState<string | number>(4)

  function changeSquare(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const newSquare = { isClicked: true }

    console.log('🚀 ~ file: App.tsx:15 ~ changeSquare ~ newSquare:', newSquare)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Panel
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
        />

        {[...new Array(height)].map((_, columnIndex) => (
          <div key={columnIndex} className='height'>
            {[...new Array(width)].map((_, rowIndex) => (
              <Square
                key={rowIndex}
                type='row'
                changeSquare={changeSquare}
              ></Square>
            ))}
          </div>
        ))}
      </header>
    </div>
  )
}

export default App
