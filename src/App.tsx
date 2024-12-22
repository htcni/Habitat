import { GameBoard } from './components/GameBoard'
import { GameControls } from './components/GameControls'
import { StartScreen } from './components/StartScreen'
import { EndScreen } from './components/EndScreen'

import { useGameLogic } from './hooks/useGameLogic'
import { GAME_TIMER } from './lib/constants'

const App = () => {
  const {
    gameState,
    score,
    selectedImage,
    isLoading,
    gameImages,
    bestTime,
    timeLeft,
    error,
    handleStartGame,
    handleResetGame,
    handleImageClick,
  } = useGameLogic()

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        {gameState === 'start' && (
          <StartScreen
            bestTime={bestTime}
            isLoading={isLoading}
            onStart={handleStartGame}
          />
        )}

        {gameState === 'playing' && gameImages.length > 0 && (
          <div className='space-y-6'>
            <GameControls
              score={score}
              timeLeft={timeLeft}
              onReset={handleResetGame}
            />
            <GameBoard
              gameImages={gameImages}
              selectedImage={selectedImage}
              onImageClick={handleImageClick}
            />
          </div>
        )}

        {gameState === 'complete' && (
          <EndScreen
            score={score}
            timeUsed={GAME_TIMER - timeLeft}
            timeLeft={timeLeft}
            onReset={handleResetGame}
          />
        )}
      </div>
    </div>
  )
}

export default App
