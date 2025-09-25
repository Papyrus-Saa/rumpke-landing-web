import { FaUniversity, FaCertificate, FaShieldAlt } from "react-icons/fa";
import Image from "next/image";

export interface Badge {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const badges: Badge[] = [
  {
    id: 1,
    name: "IHK Zertifikat",
    icon: <FaCertificate className="text-mint-600  text-3xl" />,
    description: "Offiziell geprüfte Immobilienmaklerin und Wertermittlerin durch die IHK.",
  },
  {
    id: 2,
    name: "Universitätsabschluss",
    icon: <FaUniversity className="text-mint-600  text-3xl" />,
    description: "Fundierte Ausbildung und Abschluss an einer renommierten Universität.",
  },
  {
    id: 3,
    name: "Vertrauenswürdigkeit",
    icon: <FaShieldAlt className="text-mint-600  text-3xl" />,
    description: "Zuverlässigkeit und Diskretion bei allen Immobilienangelegenheiten.",
  },
];



const WhyTrustUs: React.FC = () => (
  <section
    id="why-trust-us"
    className="w-full mx-auto mt-6 mb-10 sm:p-12 md:p-6 xl:px-6 transition-opacity duration-100 overflow-auto max-h-screen ">
    <div className="bg-white dark:bg-dark-300 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] flex flex-col lg:flex-row items-center gap-10 p-4 sm:rounded-2xl">
      <div className="flex flex-col items-center md:items-start md:w-1/3 ">
        <div className="relative w-70 h-56 shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] border-4 dark:border-gray-800 border-amber-50 mb-4 bg-white dark:bg-dark-200">
          <Image
            src="/howItWorksPic.jpg"
            alt="Ann-Christin Rumpke"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-mint-600  mb-1">Ann-Christin Rumpke</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Geprüfte Immobilienmaklerin & Wertermittlerin</p>
          <span className="inline-block bg-mint-100 bg-mint-600 dark:bg-mint-700 px-3 py-1 rounded-full text-xs font-semibold mb-2 text-white">
            -
            Emsland & Grafschaft Bentheim
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 ">
        <h2 className="text-3xl md:text-4xl font-extrabold text-mint-600 dark:text-mint-700 mb-2 tracking-tight drop-shadow-lg">
          Warum Sie uns vertrauen können
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
          Vertrauen ist die Basis jeder erfolgreichen Zusammenarbeit. Als erfahrene Immobilienmaklerin mit fundierter Ausbildung und offiziellen Zertifikaten stehe ich Ihnen mit Kompetenz und Engagement zur Seite.
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-4">
          Mein Ziel ist es, Ihre Wünsche und Bedürfnisse zu verstehen und gemeinsam die beste Lösung für Ihre Immobilie zu finden. Diskretion, Zuverlässigkeit und ein starkes Netzwerk von Experten garantieren Ihnen höchste Sicherheit und Professionalität.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="w-full flex flex-col items-center bg-light-100 dark:bg-dark-100 rounded-2xl shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] p-6 transition hover:scale-105"
            >
              <div className="mb-3">{badge.icon}</div>
              <span className="text-base font-semibold text-mint-600  text-center mb-2">{badge.name}</span>
              <p className="text-xs text-gray-600 dark:text-gray-300 text-center">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="h-[150px] xl:hidden" />
  </section>
);

export default WhyTrustUs;
