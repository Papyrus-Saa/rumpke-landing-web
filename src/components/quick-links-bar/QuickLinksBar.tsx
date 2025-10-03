


import Link from 'next/link'
import React from 'react'
const QuickLinksBar = () => {
  return (
    <div className=' w-full flex flex-col justify-center items-center gap-4 py-4 lg:py-6'>
      <Link href="/privacy" className="text-sm hover:underline">
        Datenschutzerklärung
      </Link>
      <Link href="/imprint" className="text-sm hover:underline">
        Impressum
      </Link>
      <Link href={"/terms"} className="text-sm hover:underline">
        AGB
      </Link>
    </div>
  )
}

export default QuickLinksBar
