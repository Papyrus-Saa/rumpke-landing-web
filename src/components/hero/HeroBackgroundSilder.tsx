import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './styles.css';
import imgs from '@/data/images';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { SubmitTipButton } from '../SubmitTipButton';

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

  const [randomWordIndex, setRandomWordIndex] = useState<number | null>(null);
  const [randomColor, setRandomColor] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});


  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
      align: 'center',
      skipSnaps: false,
      dragFree: false,
      containScroll: 'trimSnaps'
    },
    [Autoplay({ delay: 9000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const slideIndex = emblaApi.selectedScrollSnap();
    setCurrentSlide(slideIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    const { idx, color } = getRandomWordAndColor(imgs[currentSlide].welcome);
    setRandomWordIndex(idx);
    setRandomColor(color);
  }, [currentSlide, colors]);

  function renderWelcomeText(text: string): React.ReactNode[] {
    const words = text.split(/(\s+)/);
    return words.map((word: string, i: number) => {
      if (randomWordIndex !== null && randomColor !== null && i === randomWordIndex && /\w/.test(word)) {
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
    <div className="transition-colors duration-100  relative 2xl:p-1">
      <div className="embla h-[50vh] lg:h-[70vh] 2xl:rounded-xl overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {imgs.map((item, idx) => {
            return (
              <div key={item.id} className="embla__slide flex-[0_0_100%] min-w-0">
                <div className="relative w-full h-[50vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
                  <Image
                    src={`/${item.image}`}
                    alt={item.quote || "Slider image"}
                    fill
                    className="object-cover 2xl:rounded-xl"
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    priority={item.id === 1}
                    placeholder="blur"
                    blurDataURL={`/_next/image?url=/${item.image}&w=16&q=1`}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [item.id]: true }))}
                  />
                  {!loadedImages[item.id] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 to-gray-400/80 animate-pulse z-10" />
                  )}

                  <div className="2xl:px-30 absolute left-0 top-1/4 xl:top-1/2 -translate-y-1/2 pl-6 sm:pl-12 max-w-[90vw] sm:max-w-[60vw] flex items-center pointer-events-none select-none">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
