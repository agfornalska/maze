interface PanelProps {
  height: number
  setHeight: (height: number) => void
  width: number
  setWidth: (width: number) => void
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
      event.target.value === '' ? setHeight(0) : setHeight(changedValue)
    }
  }
  function handleWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const changedValue = Number(event.target.value)

    if (!isNaN(changedValue)) {
      event.target.value === '' ? setWidth(0) : setWidth(changedValue)
    }
  }

  return (
    <div className='panel'>
      Height:{' '}
      <input value={height === 0 ? '' : height} onChange={handleHeightChange} />
      Width:{' '}
      <input value={width === 0 ? '' : width} onChange={handleWidthChange} />
    </div>
  )
}
