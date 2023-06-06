import React, { useState } from 'react'
import './App.css'
import Panel from './Components/Panel'
import Grid from './Components/Grid'

function App() {
  const [height, setHeight] = useState<string | number>('')
  const [width, setWidth] = useState<string | number>('')

  return (
    <div className='App'>
      <header className='App-header'>
        <Panel
          height={height}
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
        />
        {height !== '' ? <Grid height={height} width={width}></Grid> : <></>}
      </header>
    </div>
  )
}

export default App
