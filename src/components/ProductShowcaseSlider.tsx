'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useSwiperGlModule from '@/hooks/useSwiperGlModule'
import slides from '@/data/gallerySlides'

type Props = {
  title?: string
  heightClass?: string
  widthClass?: string
  speed?: number
  id: number
  autoplayDelay?: number
}

export default function ProductMiniSlider({
  heightClass,
  widthClass,
  speed = 600,
  autoplayDelay = 4000,
  id,
}: Props) {
  const { mods: glMods, ready } = useSwiperGlModule('@/lib/uii/shaders/swiper-gl.esm.js')
  const mods = useMemo(
    () => (ready ? [A11y, Navigation, Pagination, Autoplay, ...glMods] : [A11y, Navigation, Pagination, Autoplay]),
    [ready, glMods]
  )



  const slide = slides.find(s => s.id === id)
  if (!slide) return null

  return (
    <section
      id='product-showcase-slider'
      className="p-2 shadow rounded sm:dark:shadow-subtle-d sm:shadow-subtle-l scroll-mt-50">
      <div
        className="relative overflow-hidden dark:shadow-dark-100 hover:shadow-lg">
        <Swiper
          modules={mods}
          effect={ready ? 'gl' : undefined}
          speed={speed}
          loop={slide.image.length > 1}
          pagination={{ clickable: true }}
          autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
          className={`w-full h-full`}
        >
          {slide.image.map((img, i) => (
            <SwiperSlide key={i}>
              <figure className={`relative mx-auto overflow-hidden hover:scale-105 transition-transform cursor-pointer hover-shadow-lg mb-2
    ${heightClass ?? 'h-[300px] sm:h-[340px]'}
    ${widthClass ?? 'w-full xl:w-full'}
  `}>
                <h3 className="absolute inset-x-0 top-0 z-10 py-2 px-4 bg-gradient-to-b from-black/70 to-transparent text-white text-base md:text-lg font-semibold">{slide.title}</h3>
                <Image
                  src={`/${img}`}
                  alt={slide.quote || `Bild ${i + 1}`}
                  fill
                  sizes='(max-width: 768px) 100vw, 600px'
                  className="object-cover"
                  priority={i === 0}
                />
                {!!slide.quote && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/60 to-transparent">

                    <p className="text-white/95 text-sm md:text-base">{slide.quote}</p>
                  </figcaption>
                )}
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

  )
}
