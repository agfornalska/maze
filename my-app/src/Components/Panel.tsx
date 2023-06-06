interface PanelProps {
  height: string | number
  setHeight: (height: string | number) => void
  width: string | number
  setWidth: (width: string | number) => void
}

export default function Panel({
  height,
  setHeight,
  width,
  setWidth,
}: PanelProps) {
  function handleHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    const changedValue = Number(event.target.value)

    if (!isNaN(changedValue)) {
      event.target.value === '' ? setHeight('') : setHeight(changedValue)
    }
  }
  function handleWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const changedValue = Number(event.target.value)

    if (!isNaN(changedValue)) {
      event.target.value === '' ? setWidth('') : setWidth(changedValue)
    }
  }

  return (
    <div className='panel'>
      Height: <input value={height} onChange={handleHeightChange} />
      Width: <input value={width} onChange={handleWidthChange} />
    </div>
  )
}
