const ImprintPage = () => {
  return (
    <main className="w-full bg-white dark:bg-dark-300 flex justify-center items-start py-10 px-2">
      <section className="w-full max-w-3xl bg-light-100 dark:bg-dark-200 rounded-2xl border-mint-600 border p-6 sm:p-10 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold border-l-4 border-mint-600 text-mint-600 pl-4 mb-6 text-center">
          Impressum
        </h1>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-mint-600 mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>Rumpke Immobilien</strong><br />
            Ann-Christin Rumpke<br />
            Haselünner Straße 4-8<br />
            49844 Bawinkel<br />
          </p>
          <p className="mt-2">
            Telefon: +49 (0) 5963-45999709<br />
            E-Mail: <a href="mailto:info@rumpke-immobilien.de" className="text-gray-500 underline">info@rumpke-immobilien.de</a><br />
            Kontaktformular: <a href="https://www.rumpke-immobilien.de/kontakt" target="_blank" rel="noopener noreferrer" className="text-gray-500 underline">www.rumpke-immobilien.de/kontakt</a><br />
            WhatsApp: 0172 – 3244468
          </p>
        </section>

        <div className="border-t border-mint-100 dark:border-dark-100" />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            <strong>DE366828289</strong>
          </p>
        </section>

        <div className="border-t border-mint-100 dark:border-dark-100" />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">Vertretungsberechtigte Person</h2>
          <p>Ann-Christin Rumpke, Inhaberin</p>
        </section>

        <div className="border-t border-mint-100 dark:border-dark-100" />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">Zuständige Aufsichtsbehörde</h2>
          <p>
            Industrie- und Handelskammer Osnabrück-Emsland-Grafschaft Bentheim<br />
            Neuer Graben 38<br />
            49074 Osnabrück<br />
            <a href="https://www.ihk.de/osnabrueck" target="_blank" rel="noopener noreferrer" className="text-gray-500 underline">www.ihk.de/osnabrueck</a>
          </p>
        </section>

        <div className="border-t border-mint-100 dark:border-dark-100" />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">Geltungsbereich</h2>
          <p>
            Dieses Impressum gilt für alle Angebote unter der Domain <strong>www.rumpke-immobilien.de</strong> inklusive aller Subdomains sowie für unsere Auftritte in den sozialen Netzwerken:
          </p>
          <ul className="list-disc list-inside pl-2 mt-2 text-gray-700 dark:text-gray-200">
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </section>

        <div className="border-t border-mint-100 dark:border-dark-100" />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">Haftungshinweis</h2>
          <p>
            Alle Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
          <p className="mt-2">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </section>

        <div className="border-t border-mint-100 dark:border-dark-100" />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">Stand</h2>
          <p>Dieses Impressum gilt ab dem <strong>26.07.2024</strong>.</p>
        </section>
      </section>
    </main>
  );
};

export default ImprintPage;
