
import Image from 'next/image'
import { titleFonts } from "@/config/fonts"
import slides from "@/data/gallerySlides"

const AwardProducts = () => {
  return (
    <section className="w-full py-8 sm:py-10 flex flex-col items-center overflow-x-hidden">
      <h2 className={`${titleFonts.className} text-center text-xl sm:text-2xl md:text-3xl font-bold text-mint-600 mb-4 sm:mb-6 px-2 w-full`}>Unsere Prämien</h2>
      <div className="xl:w-[80%] 2xl:w-[70%] sm:w-[90%] w-full mx-auto grid sm:grid-cols-2 gap-4 sm:gap-6 px-2">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="duration-100 p-1 flex flex-col items-center rounded-xl md:p-4 transition-all  hover:scale-[1.02] mb-2 sm:mb-0 hover:shadow-[var(--shadow-subtle-l)] dark:hover:shadow-[var(--shadow-subtle-d)]">
            <div className="w-full text-center py-2 px-2 md:px-0">
              <span className="inline-block text-base md:text-lg font-semibold dark:text-mint-200 tracking-wide truncate max-w-[180px] md:max-w-[220px] text-mint-600">{slide.title}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-center items-center py-2 md:py-4 group">
              {slide.images.map((img, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 flex flex-col items-center justify-end overflow-hidden transition-all duration-300 group-hover:ring-4 group-hover:ring-mint-600 border-amber-50 dark:border-gray-700 border-2"
                  style={{ boxShadow: 'var(--shadow-subtle-l)', borderRadius: '0.5rem' }}
                >
                  <div
                    className="w-full"
                    style={{ aspectRatio: '1 / 1', width: '100%', maxWidth: '360px', minWidth: '180px', margin: '0 auto', borderRadius: '0.5rem', overflow: 'hidden' }}
                  >
                    <Image
                      src={`/${img}`}
                      alt={slide.title}
                      fill={true}
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover w-full h-full"
                      priority={i === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="duration-100 w-full text-center rounded px-4 py-3 mt-2 dark:text-mint-200 text-base">
              {slide.quote}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AwardProducts

