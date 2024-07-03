import { ReactNode } from 'react'
import { InfinityCarouselContainer } from './index.styled'

interface InfinityCarouselType {
  getIcon: () => ReactNode
  title: string
  subtitle: string
}

interface InfinityCarouselProps {
  items: InfinityCarouselType[]
}

export const InfinityCarousel: React.FC<InfinityCarouselProps> = ({
  items,
}) => {
  return (
    <InfinityCarouselContainer
      className="Carousel"
      style={{
        marginTop: '30px',
        marginBottom: '30px',
      }}
    >
      <div className="blur" style={{ left: '-10px' }}></div>
      <div className="blur" style={{ right: '-10px' }}></div>

      <ul>
        {items.map(({ getIcon, title, subtitle }, idx) => {
          return (
            <li key={idx}>
              <figure>{getIcon()}</figure>
              <div>
                <h5>{title}</h5>
                <p>{subtitle}</p>
              </div>
            </li>
          )
        })}
        {items.map(({ getIcon, title, subtitle }, idx) => {
          return (
            <li key={idx}>
              <figure>{getIcon()}</figure>
              <div>
                <h5>{title}</h5>
                <p>{subtitle}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </InfinityCarouselContainer>
  )
}
