import React from 'react'

const PrivacyPage = () => {
  return (
    <main className="w-full min-h-[80vh] flex justify-center items-center py-10 px-2">
      <section className="w-full max-w-xl bg-white dark:bg-dark-200 rounded-2xl shadow-lg p-8 sm:p-16 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-extrabold mb-8 text-mint-700 dark:text-mint-600 text-center">Datenschutzerklärung</h1>
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-6 text-center">
          Die Datenschutzerklärung finden Sie im Abschnitt <span className="font-semibold">"Datenschutz &amp; Datenverarbeitung"</span> unserer <a href="/agb" className="underline text-mint-700 dark:text-mint-600">AGB</a>.
        </p>
        <p className="text-sm text-gray-500 text-center mb-8">Für alle Details zum Umgang mit Ihren Daten besuchen Sie bitte unsere <a href="/agb" className="underline text-mint-700 dark:text-mint-600">AGB-Seite</a>.</p>
        <div className="flex-1" />
      </section>
    </main>
  );
}

export default PrivacyPage;
