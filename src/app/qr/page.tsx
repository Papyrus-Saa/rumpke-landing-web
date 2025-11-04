import TipForm from '@/components/form/TipForm'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="md:px-0 py-8  mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-5xl font-bold my-10 ">Willkommen bei Ich schenke dir was</h1>
        <p className="text-md md:text-l  font-bold max-w-3xl mx-auto mb-6">Hier können Angaben zur Immobilie und Kontaktdaten übermittelt werden. Das Ausfüllen dauert ca. 1 Minute.</p>
        <div className="mt-4">
          <p className="text-green-500 text-xs font-bold mb-6 max-w-3xl mx-auto">Mehr Informationen zum Ablauf finden Sie auf unserer Website.</p>
          <Link href="/" title="Öffnet die Website mit weiteren Informationen zum Tipp-Prozess" aria-label="Zur Website - weitere Informationen" className="inline-flex items-center bg-gradient-orange-yellow text-white px-2 py-1 mb-6 rounded-lg shadow">
            Zur Website
            <span className="ml-3 inline-block animate-bounce" aria-hidden>
              👉
            </span>
          </Link>
        </div>
      </header>
      <main>
        <TipForm />
      </main>
      <div className="max-w-2xl mx-auto mt-3 p-3 rounded-md  bg-light-200 dark:bg-dark-200 text-sm text-gray-700 dark:text-gray-200">
        <strong className="block text-sm font-semibold text-center mb-2 bg-red-500/80 dark:bg-red-500/40 text-white">Wichtig für deinen Tipp!</strong>
        <ul className="list-disc list-inside leading-snug text-xs">
          <li>Wir wissen bisher noch nichts von dem geplanten Verkauf.</li>
          <li>Das Ganze ist noch nicht offiziell (kein Schild im Garten, keine Anzeige im Internet).</li>
          <li>Es liegt in einer Region, in der wir aktiv sind.</li>
        </ul>
        <p className="mt-2 text-xs">Die Region gilt als ein Umkreis von <strong>100 km</strong> um die Adresse: <strong>49844 Bawinkel</strong>.</p>
        <p className="mt-2 text-xs">Du kannst auf unserer Website im Kartenbereich prüfen, ob die Adresse oder die Postleitzahl gültig ist. Drücke dazu den Button <em>Zur Website</em> oben.</p>
      </div>
    </div>
  )
}

export default page
