'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { AutoplayOptions } from 'swiper/types';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import imgs from '@/data/images';
import Image from 'next/image';



export default function HeroBackgroundSlider() {
  return (
    <div className="transition-colors duration-1000 bg-light-100 dark:bg-cyan-800/30 relative p-1 ">
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        } as AutoplayOptions}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full 2xl:rounded-xl"
      >
        {imgs.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[50vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
              <Image
                src={`/${item.image}`}
                alt={item.quote || "Slider image"}
                fill
                className="object-cover 2xl:rounded-xl"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority={item.id === 1}
              />

              <div className="2xl:px-30 absolute left-0 top-1/4 xl:top-1/2  -translate-y-1/2 pl-6 sm:pl-12 max-w-[90vw] sm:max-w-[60vw] flex items-center pointer-events-none select-none">
                <h2 className="text-white dark:text-mint-200 text-2xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl  lg:font-bold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-fade-in-up text-left leading-tight break-words">
                  {item.welcome}
                </h2>
              </div>

              <div className="absolute right-0 2xl:px-30 bottom-0 pb-8 pr-6 sm:pb-16 sm:pr-12 max-w-[90vw] sm:max-w-[60vw] flex justify-end pointer-events-none select-none">
                <p className="text-white dark:text-mint-100 text-xl sm:text-2xl md:text-3xl font-bold italic tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] animate-fade-in-up text-right leading-tight break-words">
                  {item.quote}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
