import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { Medal, Play, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { formatTime } from '../lib/utils'
import { useEffect } from 'react'
import { BestScores } from '../lib/types'

interface StartScreenProps {
  isLoading: boolean
  bestScores: BestScores
  setBestScores: (bestScores: BestScores) => void
  onStart: () => void
  mode: string
  onModeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const StartScreen: React.FC<StartScreenProps> = ({
  bestScores,
  setBestScores,
  isLoading,
  onStart,
  mode,
  onModeChange,
}) => {
  useEffect(() => {
    // If bestScores is undefined or empty, set the default values
    if (!bestScores || Object.keys(bestScores).length === 0) {
      setBestScores({
        easy: { score: 0, bestTime: 0 },
        medium: { score: 0, bestTime: 0 },
        hard: { score: 0, bestTime: 0 },
      })
    }
  }, [bestScores, setBestScores])

  return (
    <Card className='p-8 text-center'>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h1 className='text-4xl font-bold mb-6 text-purple-600'>
          Kitty Matching Game! 🙀
        </h1>
        {bestScores && (
          <div className='mb-4 flex flex-col items-center justify-center text-yellow-600'>
            {Object.keys(bestScores).map((modeKey) => {
              const { score, bestTime } = bestScores[modeKey]

              return (
                <div
                  key={modeKey}
                  className='mb-2 flex items-center justify-center'>
                  <Medal className='mr-2' />
                  <span>
                    {modeKey.charAt(0).toUpperCase() + modeKey.slice(1)}:
                  </span>
                  <span className='ml-2'>Score: {score}</span>
                  {bestTime > 0 && (
                    <>
                      <span className='ml-4'>
                        Best Time: {formatTime(bestTime)}
                      </span>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
        <div className='mb-4'>
          <label htmlFor='gameMode' className='mr-2'>
            Choose Game Mode:
          </label>
          <select
            id='gameMode'
            value={mode}
            onChange={onModeChange}
            className='border rounded p-2'>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
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
}
