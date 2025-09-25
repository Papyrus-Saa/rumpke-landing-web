import { Swiper, SwiperSlide } from 'swiper/react';
import type { AutoplayOptions } from 'swiper/types';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './styles.css';
import imgs from '@/data/images';
import Image from 'next/image';
import React, { useState } from 'react';

export default function HeroBackgroundSlider() {
  const colors = React.useMemo(() => [
    '#f82d00', '#00ca25', '#0330fa', '#fcb723', '#A55EEA', '#20B2AA',
    '#FF6F61', '#FFB400', '#00C9A7', '#FF3CAC', '#F97F51', '#4B4B4B',
    '#00B894', '#6C5CE7', '#EA2027',
  ], []);

  const getRandomWordAndColor = (text: string): { idx: number; color: string } => {
    const words = text.split(/(\s+)/);
    const wordIndices = words
      .map((w: string, i: number) => (/\w/.test(w) ? i : null))
      .filter((i: number | null) => i !== null) as number[];
    const idx = wordIndices.length > 0 ? wordIndices[Math.floor(Math.random() * wordIndices.length)] : 0;
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { idx, color };
  };

  const [{ idx: randomWordIndex, color: randomColor }, setRandom] = useState(() => getRandomWordAndColor(imgs[0].welcome));
  const [currentSlide, setCurrentSlide] = useState(0);

  function handleSlideChange(swiper: { realIndex: number }) {
    const slideIdx = (swiper as { realIndex: number }).realIndex;
    setCurrentSlide(slideIdx);
    const welcome = imgs[slideIdx].welcome;
    setRandom(getRandomWordAndColor(welcome));
  }

  function renderWelcomeText(text: string): React.ReactNode[] {
    const words = text.split(/(\s+)/);
    return words.map((word: string, i: number) => {
      if (i === randomWordIndex && /\w/.test(word)) {
        return (
          <span
            key={i}
            style={{ color: randomColor, fontWeight: 'bold', display: 'inline-block' }}
            className="animate-colored-word"
          >
            {word}
          </span>
        );
      }
      return <span key={i} className="text-white dark:text-mint-200">{word}</span>;
    });
  }

  return (
    <div className="transition-colors duration-1000  dark:bg-cyan-800/30 relative p-1 ">
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: true,
        } as AutoplayOptions}
        allowTouchMove={false}
        pagination={false}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper h-full 2xl:rounded-xl"
        onSlideChange={handleSlideChange}
      >
        {imgs.map((item, idx) => (
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
                <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl lg:font-bold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-fade-in-up text-left leading-tight break-words">
                  {idx === currentSlide ? renderWelcomeText(item.welcome) : item.welcome}
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
