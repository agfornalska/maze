// import { useEffect, useState } from 'react'
import './Square.css'
interface SquareProps {
  columnIndex: number
  rowIndex: number
  isClicked: boolean
  drawWall: (columnIndex: number, rowIndex: number) => void
}

export default function Square({
  columnIndex,
  rowIndex,
  isClicked,
  drawWall,
}: SquareProps) {
  return (
    <div
      className={!isClicked ? 'square' : 'clicked'}
      onClick={() => drawWall(columnIndex, rowIndex)}
    >
      R{rowIndex}C{columnIndex}
    </div>
  )
}
