


import AwardsLogo from "./AwardsLogo";
import { titleFonts } from "@/config/fonts";
import AwardsSelected from '@/components/awards/AwardsSelected';


const AwardsAnotherScreens = () => {
  return (

    <div className="flex flex-col justify-between items-center py-4 lg:p-0 lg:mt-10">
      <AwardsLogo />
      <h2 className={`${titleFonts.className}  text-center sm:text-xl md:text-2xl px-6 mb-8  lg:mb-1 lg:text-sm`}>
        Wähle einen der vier Preise, die du gewinnen möchtest.
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 lg:w-[80%] gap-6 lg:gap-0 sm:gap-10 max-w-lg w-full mx-auto">
        <AwardsSelected icon={<span role="img" aria-label="Urlaub">🏖️</span>} title="Urlaub" />
        <AwardsSelected icon={<span role="img" aria-label="E-Bike">🚲</span>} title="E-Bike" />
        <AwardsSelected icon={<span role="img" aria-label="Geld">💰</span>} title="Gutschein - 2222 €" />
        <AwardsSelected icon={<span role="img" aria-label="Roller">🛵</span>} title="Küche" />
      </div>
    </div>


  )
}

export default AwardsAnotherScreens;
