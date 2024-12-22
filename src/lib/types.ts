export interface GameImage {
  id: number
  url: string
  title: string
  matched: boolean
  pairId: number
}

export type GamePairs = GameImage[]
export type GameState = 'start' | 'playing' | 'complete'
