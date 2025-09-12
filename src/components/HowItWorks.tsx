import React from 'react'
import { FiCheckCircle, FiGift, FiHome, FiSearch } from 'react-icons/fi'
import { titleFonts } from '@/config/fonts'

const steps = [
  {
    icon: <FiCheckCircle />,
    title: "Du hörst von einem geplanten verkauf",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
  {
    icon: <FiHome />,
    title: "Du meldest uns den Tipp",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
  {
    icon: <FiSearch />,
    title: "Wir kümmern uns um den Rest",
    className: 'shadow-subtle-l dark:shadow-subtle-d',
  },
  {
    icon: <FiGift />,
    title: "Kommt der Verkauf zustande, bekommst du dein Geschenk",
    className: ' shadow-subtle-l dark:shadow-subtle-d',
  },
]

const HowItWorks = () => {
  return (
    <div className='dark:bg-dark-300 bg-white lg:px-16 xl:px-20 2xl:px-70 py-2 mb-6'>
      <h3 className={`${titleFonts.className} ml-2 mb-4 text-lg`}>So einfach geht<span className='text-mint-600'>'</span>s</h3>
      <ul className="space-y-4">
        {steps.map((step, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-4 rounded-xl px-4 py-3 bg-light-100 dark:bg-dark-200 ${step.className}`}
          >
            <span className="text-2xl text-mint-600 dark:text-mint-200">{step.icon}</span>
            <span className="font-medium">{step.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HowItWorks
