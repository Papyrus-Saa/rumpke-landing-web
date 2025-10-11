
import Image from 'next/image'
import { titleFonts } from "@/config/fonts"
import slides from "@/data/gallerySlides"

const AwardProducts = () => {
  return (
    <section className="w-full py-8  flex flex-col items-center overflow-x-hidden">
      <h2 className={`${titleFonts.className} text-center text-xl sm:text-2xl px-2 w-full mb-4`}>Unsere Prämien</h2>
      <div className="xl:w-[80%] 2xl:w-[70%] sm:w-[90%] w-full mx-auto grid sm:grid-cols-2 gap-4 sm:gap-6 px-2">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="duration-100 p-1 flex flex-col items-center rounded-xl md:p-4  mb-2 sm:mb-0 ">
            <div className="w-full text-center py-2 px-2 md:px-0">
              <span className="inline-block text-base md:text-lg font-semibold dark:text-mint-200 tracking-wide truncate max-w-[180px] md:max-w-[220px]">{slide.title}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-center items-center ">
              {slide.images.map((img, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 flex flex-col items-center shadow dark:shadow-subtle-d"
                >
                  <div
                    className="w-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                    style={{ aspectRatio: '1 / 1', width: '100%', maxWidth: '360px', minWidth: '180px', margin: '0 auto', borderRadius: '0.5rem', overflow: 'hidden' }}
                  >
                    <Image
                      src={`/${img}`}
                      alt={slide.title}
                      fill={true}
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover w-full h-full rounded"
                      priority={i === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="duration-100 w-full text-center px-4 py-3 dark:text-mint-200 text-base">
              {slide.quote}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AwardProducts

