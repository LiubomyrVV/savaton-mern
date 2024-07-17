import { StarRatingContainer } from './index.styled'

interface Props {
  rating: number
  className?: string
}

export const StarRating: React.FC<Props> = ({
  rating,
  className = 'stars-container',
}) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => {
      return (
        <div key={index} className="item">
          {index < rating ? (
            <i className="bi bi-star-fill"></i>
          ) : (
            <i className="bi bi-star empty"></i>
          )}
        </div>
      )
    })

  return (
    <StarRatingContainer className={className}>{stars}</StarRatingContainer>
  )
}
