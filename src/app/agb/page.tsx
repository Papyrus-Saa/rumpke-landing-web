export default function TermsPage() {
  return (
    <main className="w-full flex justify-center items-start py-10 px-2">
      <section className="w-full max-w-5xl bg-white dark:bg-dark-200 rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold mb-6 text-mint-700 dark:text-mint-600 text-center">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <h2 className="text-lg font-semibold mb-2 text-center text-gray-700 dark:text-gray-200">für die Plattform „Ich schenke dir was“<br className="sm:hidden" /> (betrieben durch Rumpke Immobilien / Ann‑Christin Rumpke)</h2>
        <div className="mt-8 text-gray-800 dark:text-gray-100 text-base sm:text-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna 1 */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">1. Geltungsbereich</h3>
              <p>Diese AGB gelten für die Nutzung der Landingpage ichschenkedirwas.de sowie aller damit verbundenen Dienste, insbesondere für das Abgeben von Tipps über mögliche Immobilienverkäufe.</p>
              <p className="mt-2">Anbieterin dieser Plattform ist:<br />
                <span className="font-semibold">Rumpke Immobilien</span>,<br />
                vertreten durch Ann‑Christin Rumpke<br />
                Haselünner Straße 4‑8<br />
                49844 Bawinkel
              </p>
              <p className="mt-2">Abweichende Bedingungen des Tippgebers werden nicht anerkannt, es sei denn, sie wurden ausdrücklich schriftlich vereinbart.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">2. Zweck der Plattform</h3>
              <p>Ziel der Plattform ist es, Hinweise auf potenzielle Immobilienverkäufer zu sammeln („Tippgeber-Hinweise“). Die Anbieterin prüft diese Hinweise nach eigenem Ermessen und entscheidet, ob ein Kontakt zum Verkäufer aufgenommen wird. Es besteht kein Anspruch, dass jeder abgegebene Tipp genutzt oder weiterverfolgt wird.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">3. Voraussetzungen für einen gültigen Tipp</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Er sich auf einen neuen und bislang unbekannten Fall bezieht (kein bereits bekanntes Objekt).</li>
                <li>Die Immobilie zum Zeitpunkt des Tipps noch nicht öffentlich zur Veräußerung angeboten wurde.</li>
                <li>Das Objekt liegt in einem Gebiet, in dem Rumpke Immobilien tätig ist (sofern territorial begrenzt).</li>
                <li>Der Tipp enthält alle Mindestangaben, die im Formular verlangt werden (z. B. vollständiger Name, Kontaktdaten des Tippgebers, Adresse der Immobilie usw.).</li>
                <li>Der Tippgeber den AGB ausdrücklich zustimmt (z. B. Checkbox „Ich akzeptiere die AGB“).</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">4. Prämien / Vergütung</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Ein Maklervertrag mit dem Eigentümer der Immobilie zustande kommt,</li>
                <li>Der Verkauf erfolgreich abgeschlossen wird,</li>
                <li>Der Tipp zu einem nachweislich neuen Kontakt geführt hat.</li>
              </ul>
              <p className="mt-2">Die Höhe der Prämie richtet sich nach der auf der Plattform angegebenen Prämienstaffel (z. B. E‑Bike, Urlaub, Gutschein etc.). Die Anbieterin wählt die konkrete Prämienart aus, ggf. gestaffelt nach Verkaufswert. Es besteht kein Anspruch auf Prämie, wenn eine der Bedingungen nicht erfüllt ist (z. B. Tipp nicht neu, kein Verkauf). Die Auszahlung erfolgt nach Abschluss des Verkaufs und positiver Prüfung aller Anforderungen.</p>
            </section>
          </div>
          {/* Columna 2 */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">5. Pflichten des Tippgebers</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Der Tippgeber ist verpflichtet, zutreffende und vollständige Angaben zu machen.</li>
                <li>Der Tippgeber versichert, dass er berechtigt ist, die Informationen weiterzugeben und keine Datenschutzrechte verletzt.</li>
                <li>Bei falschen Angaben, Missbrauch oder Vorsatz kann der Anspruch auf Prämie verworfen und ggf. Schadensersatz verlangt werden.</li>
                <li>Auf Anforderung hat der Tippgeber ergänzende Informationen bereitzustellen, z. B. um Kontakt zum Eigentümer herzustellen.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">6. Haftung / Ausschluss</h3>
              <p>Die Anbieterin haftet nur für Schäden aufgrund vorsätzlichen oder grob fahrlässigen Verhaltens. Für entgangene Chancen, nicht genutzte Tipps oder entgangene Provisionen wird keine Haftung übernommen. Sofern gesetzlich zulässig, ist eine weitergehende Haftung ausgeschlossen. Die Anbieterin garantiert nicht, dass aus jedem Tipp ein erfolgreicher Verkauf wird.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">7. Datenschutz &amp; Datenverarbeitung</h3>
              <p>Die Anbieterin verarbeitet personenbezogene Daten gemäß ihrer Datenschutzerklärung, abrufbar unter <a href="https://rumpke-immobilien.de/datenschutz" className="underline text-mint-700 dark:text-mint-600" target="_blank" rel="noopener noreferrer">rumpke-immobilien.de/datenschutz</a>. Die Daten des Tippgebers werden ausschließlich zur Abwicklung des Tippverfahrens verwendet und nur dann an Dritte weitergegeben, wenn es zur Bearbeitung erforderlich ist (z. B. zur Kontaktaufnahme mit dem Eigentümer). Der Tippgeber hat im Rahmen der DSGVO die Rechte auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">8. Widerruf / Teilnahme-Abbruch</h3>
              <p>Der Tippgeber kann seine Teilnahme jederzeit vor Abgabe eines Tipps widerrufen, indem er seine Zustimmung zur AGB zurückzieht oder eine schriftliche Mitteilung an die Anbieterin sendet. Nach Abgabe eines Tipps ist ein Rücktritt in der Regel nur möglich, wenn die Anbieterin dies ausdrücklich gestattet und sofern der Tipp noch nicht weiterverarbeitet wurde.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">9. Änderungen der AGB</h3>
              <p>Die Anbieterin behält sich das Recht vor, diese AGB mit angemessener Ankündigungsfrist zu ändern. Änderungen gelten als akzeptiert, wenn der Tippgeber nicht innerhalb einer bestimmten Frist widerspricht. Bei wesentlichen Änderungen wird eine erneute Zustimmung eingeholt.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-2 text-mint-700 dark:text-mint-600">10. Schlussbestimmungen &amp; Gerichtsstand</h3>
              <p>Es gilt das Recht der Bundesrepublik Deutschland, unter Ausschluss des UN-Kaufrechts. Gerichtsstand — soweit zulässig — ist Lingen (Ems). Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
