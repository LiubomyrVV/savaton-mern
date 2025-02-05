import { ReactNode } from 'react'
import { InfinityCarouselContainer } from './index.styled'
import { useTranslation } from 'react-i18next'


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
  const { t } = useTranslation('carousel')
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

      <ul className='infinity-carousel__list'>
        {items.map(({ getIcon, title }, idx) => {
          return (
            <li key={idx}>
              <figure>{getIcon()}</figure>
              <div>
                <h5>{t(`${title}.title`)}</h5>
                <p>{t(`${title}.subtitle`)}</p>
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
