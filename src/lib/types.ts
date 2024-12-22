export interface GameImage {
  id: number
  url: string
  title: string
  matched: boolean
  pairId: number
}

export type GamePairs = GameImage[]
export type GameState = 'start' | 'playing' | 'complete'
export type GameMode = 'easy' | 'medium' | 'hard'

interface BestScore {
  score: number
  bestTime: number
}

export interface BestScores {
  easy: BestScore
  medium: BestScore
  hard: BestScore
  [key: string]: BestScore
}
