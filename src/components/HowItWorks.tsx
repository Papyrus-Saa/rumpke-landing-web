import React from 'react'
import Card from './Card'
import { FiCheckCircle, FiGift, FiHome, FiSearch } from 'react-icons/fi'
import { titleFonts } from '@/config/fonts'


const HowItWorks = () => {
  return (

    <>
      <div className='dark:bg-dark-300 bg-white lg:px-16 xl:px-20 2xl:px-70 py-2'>
        <h3 className={`${titleFonts.className} ml-2 mb-4 text-lg`}>So einfach geht's</h3>

        <Card
          icon={<FiCheckCircle />}
          title="Du hörst von einem geplanten verkauf"
          className='border border-gray-600'
        />
        <Card
          icon={<FiHome />}

          title="Du meldest uns den Tipp"
          className='border border-gray-600'

        />
        <Card
          icon={<FiSearch />}

          title="Wir kümmern uns um den Rest"
          className='border border-gray-600'

        />
        <Card
          icon={<FiGift />}
          title="Kommt der Verkauf zustande, bekommst du dein Geschenk"
          className='border border-green-600'
        />
      </div>
    </>

  )
}

export default HowItWorks
