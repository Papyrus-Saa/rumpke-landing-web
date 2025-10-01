import images from "@/data/images";
import Image from "next/image";

const HeroSliderShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-8 px-4 max-w-7xl mx-auto bg-white dark:bg-dark-300">
    {images.map((slide) => (
      <div
        key={slide.id}
        className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.025] hover:shadow-2xl"
      >
        {/* Imagen con quote sobrepuesta */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
          <Image
            src={`/${slide.image}`}
            alt={slide.quote}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
            priority={slide.id === 1}
          />
          {/* Quote abajo, sobre la imagen */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
            <p className="text-white text-lg font-semibold drop-shadow-lg">
              {slide.quote}
            </p>
          </div>
        </div>
        {/* Welcome debajo de la imagen */}
        <div className="w-full px-6 py-6 flex flex-col items-center bg-mint-50 dark:bg-mint-900/30">
          <span className="inline-block text-mint-700 dark:text-mint-200 text-base sm:text-lg font-bold text-center animate-fade-in-up">
            {slide.welcome}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default HeroSliderShowcase;
