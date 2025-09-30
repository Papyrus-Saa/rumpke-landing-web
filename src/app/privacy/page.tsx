export default function PrivacyPolicyPage() {
  return (
    <main className="w-full  flex justify-center items-start py-10 px-2">
      <section className="w-full max-w-3xl bg-light-100 dark:bg-dark-200 rounded-2xl border-mint-600 border p-6 sm:p-10">
        <h1 className="text-2xl font-extrabold mb-6 text-mint-600 text-center">
          Datenschutzerklärung
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Der Schutz deiner persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten deine Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
        </p>
        <div className="border-t border-mint-100 dark:border-dark-100 my-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold mt-6 mb-3 text-mint-600">
          Kontakt mit uns
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Wenn du per Formular auf der Website oder per E-Mail Kontakt mit uns aufnimmst, werden deine angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.
        </p>
        <div className="border-t border-mint-100 dark:border-dark-100 my-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold mt-6 mb-3 text-mint-600">
          Deine Rechte
        </h2>
        <p className="mb-2 text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Dir stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.
        </p>
        <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed">
          Wenn du glaubst, dass die Verarbeitung deiner Daten gegen das Datenschutzrecht verstößt oder deine datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, kannst du dich bei der Aufsichtsbehörde beschweren.
        </p>
      </section>
    </main>
  );
}
