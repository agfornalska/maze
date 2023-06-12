import { useState } from 'react'
import './Square.css'
interface SquareProps {
  type: string
  changeSquare: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function Square({ type, changeSquare }: SquareProps) {
  const [squares, setSquares] = useState<Object>({})

  return <div className='square' onClick={(event) => changeSquare(event)}></div>
}
