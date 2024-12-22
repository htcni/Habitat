import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { StarIcon } from 'lucide-react'
import { Button } from './ui/button'
import { formatTime } from '../lib/utils'
interface EndScreenProps {
  score: number
  timeUsed: number
  timeLeft: number
  onReset: () => void
}

export const EndScreen: React.FC<EndScreenProps> = ({
  score,
  timeUsed,
  timeLeft,
  onReset,
}) => (
  <Card className='p-8 text-center'>
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <h2 className='text-4xl font-bold mb-4 text-purple-600'>
        {timeLeft > 0 ? 'Congratulations! 🎉' : "Time's Up! ⏰"}
      </h2>
      <div className='space-y-4 mb-6'>
        <p className='text-2xl'>Final Score: {score}</p>
        <p className='text-xl'>Time Used: {formatTime(timeUsed)}</p>
      </div>
      <div className='flex justify-center space-x-2 mb-6'>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}>
            <StarIcon className='w-8 h-8 text-yellow-400' />
          </motion.div>
        ))}
      </div>
      <Button
        onClick={onReset}
        className='bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl'>
        Play Again
      </Button>
    </motion.div>
  </Card>
)
