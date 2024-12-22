// useGameLogic.js
import { useState, useEffect } from 'react'
import { shuffle } from 'underscore'
import { GameImage, GamePairs } from '../lib/types'
import animals from '../lib/animals.json'
import { GAME_TIMER } from '../lib/constants'

export const useGameLogic = () => {
  const [gameState, setGameState] = useState('start')
  const [score, setScore] = useState(0)
  const [selectedImage, setSelectedImage] = useState<GameImage | null>(null)
  const [matches, setMatches] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [gameImages, setGameImages] = useState<GamePairs>([])
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [timerActive, setTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [error, setError] = useState<string | null>(null)

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

  const initializeGame = async () => {
    try {
      setError(null)
      setIsLoading(true)

      const shuffleAnimals = shuffle(animals).slice(0, 4)

      const animalPair = shuffleAnimals.map((animal, i) => ({
        id: i + 1,
        url: animal.url,
        title: `Animal`,
        matched: false,
      }))
      const gamePairs = [...animalPair, ...animalPair]
        .map((item) => ({ ...item, pairId: Math.random() }))
        .sort(() => Math.random() - 0.5)

      setGameImages(gamePairs)
      setScore(0)
      setMatches([])
      setSelectedImage(null)
      setTimeLeft(GAME_TIMER)
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

  useEffect(() => {
    if (matches.length > 0 && matches.length === gameImages.length / 2) {
      setGameState('complete')
      setTimerActive(false)
      const finalTime = GAME_TIMER - timeLeft
      if (!bestTime || finalTime < bestTime) {
        setBestTime(finalTime)
      }
    }
  }, [matches, gameImages.length, timeLeft, bestTime])

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
    handleStartGame,
    handleResetGame,
    handleImageClick,
  }
}
