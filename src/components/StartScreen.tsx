import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { Medal, Play, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { formatTime } from '../lib/utils'

interface StartScreenProps {
  bestTime: number | null
  isLoading: boolean
  onStart: () => void
}

export const StartScreen: React.FC<StartScreenProps> = ({
  bestTime,
  isLoading,
  onStart,
}) => (
  <Card className='p-8 text-center'>
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <h1 className='text-4xl font-bold mb-6 text-purple-600'>
        Kitty Matching Game! 🙀
      </h1>
      {bestTime && (
        <div className='mb-4 flex items-center justify-center text-yellow-600'>
          <Medal className='mr-2' />
          <span>Best Time: {formatTime(bestTime)}</span>
        </div>
      )}
      <Button
        onClick={onStart}
        disabled={isLoading}
        className='bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl'>
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
            <RefreshCw className='mr-2' />
          </motion.div>
        ) : (
          <>
            <Play className='mr-2' /> Start Game
          </>
        )}
      </Button>
    </motion.div>
  </Card>
)
