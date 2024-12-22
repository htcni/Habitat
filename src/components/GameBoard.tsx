import { GameImage } from '../lib/types'
import { GameCard } from './GameCard'

interface GameBoardProps {
  gameImages: GameImage[]
  selectedImage: GameImage | null
  onImageClick: (image: GameImage) => void
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameImages,
  selectedImage,
  onImageClick,
}) => (
  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
    {gameImages.map((image) => (
      <GameCard
        key={`${image.id}-${image.pairId}`}
        image={image}
        isSelected={selectedImage?.pairId === image.pairId}
        onImageClick={onImageClick}
      />
    ))}
  </div>
)
