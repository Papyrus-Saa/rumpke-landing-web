


import AwardsLogo from "./AwardsLogo";
import { titleFonts } from "@/config/fonts";
import AwardsSelected from '@/components/awards/AwardsSelected';
import { FaArrowDown } from "react-icons/fa";


const Awards = () => {
  return (

    <div className="flex flex-col justify-between items-center py-4 lg:p-0 dark:bg-dark-300 bg-white">
      <AwardsLogo />
      <h2 className={`${titleFonts.className} text-center mb-12`}>
        Wähle jetzt einen der vier Preise, den du gewinnen möchtest
      </h2>
      <FaArrowDown className='text-2xl text-green-500 mb-6' />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 lg:w-[50%] xl:w-[30%] gap-6 lg:gap-2 sm:gap-10 w-[90%] mx-auto mb-8">
        <AwardsSelected icon={<span role="img" aria-label="Urlaub">🏖️</span>} title="Urlaub" />
        <AwardsSelected icon={<span role="img" aria-label="E-Bike">🚲</span>} title="E-Bike" />
        <AwardsSelected icon={<span role="img" aria-label="Geld">💰</span>} title="Gutschein - 2222 €" />
        <AwardsSelected icon={<span role="img" aria-label="Roller">🛵</span>} title="Küche" />
      </div>
    </div>


  )
}

export default Awards
