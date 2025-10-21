import TipForm from '@/components/form/TipForm'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="px-4 py-8  mx-auto">
      <header className="text-center mb-2">
        <h1 className="text-3xl font-bold mb-2">Hey — schön, dass du hier bist! <span aria-hidden>😊</span></h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Hier können Angaben zur Immobilie und Kontaktdaten übermittelt werden. Das Ausfüllen dauert ca. 1 Minute. Alternativ ist die Abgabe des Tipps auch über unsere Hauptwebsite möglich — bitte den Button nutzen.</p>
        <div className="mt-4">
          <Link href="/" title="Öffnet die Website mit weiteren Informationen zum Tipp-Prozess" aria-label="Zur Website - weitere Informationen" className="inline-flex items-center bg-gradient-orange-yellow text-white px-4 py-2 rounded-lg shadow">
            Zur Website
            <span className="ml-3 inline-block animate-bounce" aria-hidden>
              👉
            </span>
          </Link>
          <p className="text-green-500 text-xs mt-2 max-w-3xl mx-auto">Mehr Informationen zum Ablauf finden Sie auf unserer Website.</p>
        </div>
      </header>

      <main>
        <TipForm />
      </main>
    </div>
  )
}

export default page
