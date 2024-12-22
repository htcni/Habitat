import { RefreshCw, Timer } from 'lucide-react'
import { Button } from './ui/button'
import { formatTime } from '../lib/utils'

interface GameControlsProps {
  score: number
  timeLeft: number
  mode: string
  onReset: () => void
}

export const GameControls: React.FC<GameControlsProps> = ({
  score,
  timeLeft,
  mode,
  onReset,
}) => (
  <div className='flex justify-between items-center mb-6'>
    <div className='space-y-2'>
      <h2 className='text-2xl font-bold text-purple-600'>Score: {score}</h2>
      <h2 className='text-2xl font-bold text-purple-600 capitalize'>
        Game mode: {mode}
      </h2>
      <div className='flex items-center text-blue-600'>
        <Timer className='mr-2' />
        <span className='font-mono text-xl'>Time: {formatTime(timeLeft)}</span>
      </div>
    </div>
    <Button onClick={onReset} variant='outline'>
      <RefreshCw className='mr-2' /> Reset Game
    </Button>
  </div>
)
