export default function TermsPage() {
  return (
    <main className="w-full bg-white dark:bg-dark-300 flex justify-center items-start py-10 px-2">
      <section className="w-full max-w-3xl bg-light-100 dark:bg-dark-200 rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-mint-600 text-center">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Diese AGB gelten für alle Verträge, die zwischen dem Nutzer dieser Website und Rumpke Immobilien abgeschlossen werden.
        </p>
        <div className="border-t border-mint-100 dark:border-dark-100 my-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold mt-6 mb-3 text-mint-600">
          1. Leistungen
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Rumpke Immobilien bietet Dienstleistungen im Bereich der Immobilienvermittlung an. Die genaue Beschreibung der einzelnen Leistungen ergibt sich aus den auf der Website dargestellten Angeboten.
        </p>
        <div className="border-t border-mint-100 dark:border-dark-100 my-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold mt-6 mb-3 text-mint-600">
          2. Haftung
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Rumpke Immobilien haftet nicht für die Richtigkeit und Vollständigkeit der auf dieser Website bereitgestellten Informationen. Haftungsansprüche gegen uns, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
        </p>
        <div className="border-t border-mint-100 dark:border-dark-100 my-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold mt-6 mb-3 text-mint-600">
          3. Gerichtsstand
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz von Rumpke Immobilien.
        </p>
      </section>
    </main>
  );
}
