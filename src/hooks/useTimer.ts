import { useState, useEffect } from 'react'

interface UseTimerProps {
  initialTime: number
  isActive: boolean
  onComplete: () => void
}

export const useTimer = ({
  initialTime,
  isActive,
  onComplete,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1
          if (newTime <= 0) {
            onComplete()
            return 0
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, onComplete, timeLeft])

  const resetTimer = () => setTimeLeft(initialTime)

  return { timeLeft, resetTimer }
}
