import { useState, useEffect } from 'react'
import { shuffle } from 'underscore'
import { GameImage, GamePairs, BestScores } from '../lib/types'
import animals from '../lib/animals.json'
import { GAME_MODES } from '../lib/constants'
import { useLocalStorage } from 'usehooks-ts'

export const useGameLogic = () => {
  const [gameState, setGameState] = useState('start')
  const [mode, setMode] = useState('easy')
  const [score, setScore] = useState(0)
  const [selectedImage, setSelectedImage] = useState<GameImage | null>(null)
  const [matches, setMatches] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [gameImages, setGameImages] = useState<GamePairs>([])
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [timerActive, setTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const [bestScores, setBestScores] = useLocalStorage<BestScores>(
    'bestScores',

    {
      easy: { score: 0, bestTime: 0 },
      medium: { score: 0, bestTime: 0 },
      hard: { score: 0, bestTime: 0 },
    }
  )

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setGameState('complete')
            setTimerActive(false)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, timeLeft])

  const getGameSettings = (mode: string) => {
    switch (mode) {
      case 'easy':
        return GAME_MODES.easy
      case 'medium':
        return GAME_MODES.medium
      case 'hard':
        return GAME_MODES.hard
      default:
        return GAME_MODES.easy
    }
  }

  const initializeGame = async () => {
    try {
      setError(null)
      setIsLoading(true)

      const { pairs, timer } = getGameSettings(mode)
      const shuffleAnimals = shuffle(animals).slice(0, pairs)

      const animalPair = shuffleAnimals.map((animal, i) => ({
        id: i + 1,
        url: animal.url,
        title: `Animal`,
        matched: false,
      }))
      const gamePairs = shuffle(
        [...animalPair, ...animalPair].map((item) => ({
          ...item,
          pairId: Math.random(),
        }))
      )
      // .sort(() => Math.random() - 0.5)

      setGameImages(gamePairs)
      setScore(0)
      setMatches([])
      setSelectedImage(null)
      setTimeLeft(timer)
      setIsLoading(false)
      setGameState('playing')
      setTimerActive(true)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to start game: ${err.message}. Please try again.`)
      } else {
        setError('Failed to start game. Please try again.')
      }
      setIsLoading(false)
    }
  }

  const handleStartGame = () => {
    initializeGame()
  }

  const handleResetGame = () => {
    setGameState('start')
    setScore(0)
    setSelectedImage(null)
    setMatches([])
    setGameImages([])
    setTimeLeft(0)
    setTimerActive(false)
    setError(null)
  }

  const handleImageClick = (image: GameImage) => {
    if (!timerActive || image.matched) return

    if (selectedImage && selectedImage.pairId !== image.pairId) {
      if (selectedImage.id === image.id) {
        setScore((prev) => prev + 10)
        setMatches((prev) => [...prev, image.id])
        setGameImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, matched: true } : img
          )
        )
      } else {
        setScore((prev) => Math.max(0, prev - 5))
      }
      setSelectedImage(null)
    } else {
      setSelectedImage(image)
    }
  }

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value)
  }

  useEffect(() => {
    if (matches.length > 0 && matches.length === gameImages.length / 2) {
      setGameState('complete')
      setTimerActive(false)
      const finalTime = getGameSettings(mode).timer - timeLeft
      if (!bestTime || finalTime < bestTime) {
        setBestTime(finalTime)
      }
      // Calculate final score based on remaining time
      const finalScore =
        score + Math.max(0, (timeLeft / getGameSettings(mode).timer) * 50)

      // Set final score
      setScore(finalScore)

      setBestScores((prevScores) => {
        // Make a shallow copy of the current bestScores object to avoid direct mutation
        const updatedScores: BestScores = { ...prevScores }

        // Check if the final score is higher than the current score for the selected mode
        if (finalScore > updatedScores[mode].score) {
          // Update the score and bestTime for the selected mode
          updatedScores[mode] = {
            score: finalScore,
            bestTime: finalTime,
          }
        }

        // Return the updated bestScores object
        return updatedScores
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, gameImages.length, timeLeft, bestTime, mode])

  return {
    gameState,
    score,
    selectedImage,
    matches,
    isLoading,
    gameImages,
    bestTime,
    timerActive,
    timeLeft,
    error,
    mode,
    bestScores,
    setBestScores,
    getGameSettings,
    handleStartGame,
    handleResetGame,
    handleImageClick,
    handleModeChange,
  }
}
