// import { useEffect, useState } from 'react'
import { CellType } from '../../App'
import './Square.css'
interface SquareProps {
  columnIndex: number
  rowIndex: number
  isClicked: CellType
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
      className={
        isClicked === CellType.Empty
          ? 'square'
          : isClicked === CellType.Wall
          ? 'clicked'
          : isClicked === CellType.Start
          ? 'start'
          : 'meta'
      }
      onClick={() => drawWall(columnIndex, rowIndex)}
    >
      R{rowIndex}C{columnIndex}
    </div>
  )
}
