import { useState } from "react"
import ProductMiniSlider from "../ProductShowcaseSlider"
import { Dialog } from '@headlessui/react'
import { titleFonts } from "@/config/fonts"


const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
  <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto hidden sm:block">
    <div className="flex  items-center justify-center min-h-screen">
      <div
        className="fixed inset-0 bg-gray-900/50 blur-2xl "
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className="relative rounded-lg shadow-lg z-10  w-fit mx-auto"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  </Dialog>
)

const AwardProducts = () => {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)

  const isLargeScreen = typeof window !== "undefined" && window.innerWidth >= 640

  return (
    <div className="py-4 lg:py-0 mb-6 duration-500">
      <h5 className={`${titleFonts.className} text-center lg:text-2xl font-black py-6 px-6`}>Als Dankeschön kannst du dir etwas aussuchen - zum Beispiel:</h5>
      <div className="xl:w-[80%] 2xl:w-[70%] sm:w-[90%] mx-auto duration-500 bg-light-100 dark:bg-dark-200 p-6 shadow border dark:border-dark-100 border-light-200 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-2  lg:gap-6 gap-1  w-full mx-auto">
          {[1, 2, 3, 4].map(id => (
            <div
              key={id}
              className="cursor-pointer"
              onClick={() => {
                if (window.innerWidth >= 640) {
                  setActiveId(id)
                  setOpen(true)
                }
              }}
            >
              <ProductMiniSlider
                id={id}
                autoplayDelay={id === 1 ? 3000 : id === 2 ? 5000 : id === 3 ? 7000 : 4000} />
            </div>
          ))}
        </div>
        {open && activeId && (
          <Modal onClose={() => setOpen(false)}>
            <div className=" max-w-2xl mx-auto">
              <ProductMiniSlider
                id={activeId}
                heightClass="h-[60vh] md:h-[70vh] lg:h-[60vh]"
                widthClass="w-[90vw] max-w-3xl"
                autoplayDelay={activeId === 1 ? 3000 : activeId === 2 ? 5000 : activeId === 3 ? 7000 : 4000}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default AwardProducts
