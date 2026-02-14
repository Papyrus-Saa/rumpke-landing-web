
export default function ImpressumPage() {
  return (
    <main className="w-full flex justify-center items-start py-10 px-2">
      <section className="w-full max-w-5xl bg-white dark:bg-dark-200 rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold mb-6 text-mint-700 dark:text-mint-600 text-center">
          Impressum
        </h1>
        <div className="mt-8 text-gray-800 dark:text-gray-100 text-base sm:text-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna 1 */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Angaben gemäß § 5 TMG</h3>
              <p><span className="font-semibold">Rumpke Immobilien</span><br />Ann-Christin Rumpke<br />Haselünner Straße 4-8<br />49844 Bawinkel</p>
              <p className="mt-2">Telefon: +49 (0) 5963-45999709<br />E-Mail: <a href="mailto:info@rumpke-immobilien.de" className="underline text-mint-700 dark:text-mint-600">info@rumpke-immobilien.de</a><br />Kontakt: <a href="https://www.rumpke-immobilien.de/kontakt" className="underline text-mint-700 dark:text-mint-600" target="_blank" rel="noopener noreferrer">www.rumpke-immobilien.de/kontakt</a><br />WhatsApp: 0172 – 3244468</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Umsatzsteuer-Identifikationsnummer</h3>
              <p>DE366828289</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Geltungsbereich</h3>
              <p>Dieses Impressum gilt für alle Angebote unter der Domain <span className="font-semibold">www.rumpke-immobilien.de</span> inklusive aller Subdomains sowie für unsere Auftritte in den sozialen Netzwerken:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </section>
          </div>
          {/* Columna 2 */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Vertretungsberechtigte Person</h3>
              <p>Ann-Christin Rumpke, Inhaberin</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Zuständige Aufsichtsbehörde</h3>
              <p>Industrie- und Handelskammer Osnabrück-Emsland-Grafschaft Bentheim<br />Neuer Graben 38<br />49074 Osnabrück<br /><a href="https://www.ihk.de/osnabrueck" className="underline text-mint-700 dark:text-mint-600" target="_blank" rel="noopener noreferrer">www.ihk.de/osnabrueck</a></p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Haftungshinweis</h3>
              <p>Alle Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
              <p className="mt-2">Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">Stand</h3>
              <p>Dieses Impressum gilt ab dem <span className="font-semibold">26.07.2024</span>.</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
