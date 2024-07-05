import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { FreeMode, Pagination } from 'swiper/modules'
import { CustomSwiperContainer } from './index.styled'
import { Children, ReactNode } from 'react'

interface CustomSwiperType {
  children: ReactNode[]
}

export function CustomSwiper({ children }: CustomSwiperType) {
  return (
    <CustomSwiperContainer>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
      >
        {Children.map(children, (child) => (
          <SwiperSlide className="Row">{child}</SwiperSlide>
        ))}
      </Swiper>
    </CustomSwiperContainer>
  )
}
