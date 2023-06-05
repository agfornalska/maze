import React, { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState<string | number>('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const changedValue = Number(event.target.value)

    if (!isNaN(changedValue)) {
      event.target.value === '' ? setValue('') : setValue(changedValue)
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <input value={value} onChange={handleChange} />
      </header>
    </div>
  )
}

export default App
