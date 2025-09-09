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
        className="relative rounded-lg shadow-lg z-10  bg-red-600 w-fit mx-auto"
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
    <div className="justify-between bg-white dark:bg-dark-300 py-4 lg:py-0">
      <h5 className={`${titleFonts.className} text-center lg:text-xl py-6 px-6`}>Als Dankeschön kannst du dir etwas aussuchen - zum Beispiel:</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-2 xl:w-[70%] 2xl:w-[60%] lg:gap-6 gap-1 sm:w-[90%] w-full mx-auto">
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
            <ProductMiniSlider id={id} />
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
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AwardProducts
