import { titleFonts } from '@/config/fonts'
import React from 'react'

const MainTitle = () => {
  return (
    <div className={`${titleFonts.className} fixed right-2 bottom-1 duration-100 text-center text-xs text-gray-300 dark:text-gray-800 select-none`}>Ich schenke dir was</div>
  )
}

export default MainTitle
