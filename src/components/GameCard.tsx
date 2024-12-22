import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { StarIcon } from 'lucide-react'
import { GameImage } from '../lib/types'

interface GameCardProps {
  image: GameImage
  isSelected: boolean
  onImageClick: (image: GameImage) => void
}

export const GameCard: React.FC<GameCardProps> = ({
  image,
  isSelected,
  onImageClick,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Card
      className={`cursor-pointer overflow-hidden ${
        isSelected ? 'ring-4 ring-blue-500' : ''
      } ${image.matched ? 'opacity-50' : ''}`}
      onClick={() => onImageClick(image)}>
      <div className='aspect-square relative'>
        <img
          src={image.url}
          alt={image.title}
          className='object-cover w-full h-full'
        />
        {image.matched && (
          <div className='absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center'>
            <StarIcon className='w-12 h-12 text-green-500' />
          </div>
        )}
      </div>
    </Card>
  </motion.div>
)
