import { FaUniversity, FaCertificate, FaShieldAlt } from "react-icons/fa";
import { IoEyeOutline, IoClose } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './zoom.css';

export interface Badge {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  certificateImage?: string;
}

const badges: Badge[] = [
  {
    id: 1,
    name: "Zertifikat Immobilienmakler",
    icon: <FaCertificate className="text-mint-600  text-3xl" />,
    description: "IHK-zertifizierte Immobilienmaklerin mit umfassender Expertise im Immobilienmarkt.",
    certificateImage: "/certificates/real-estate-agent-cert.jpg"
  },
  {
    id: 2,
    name: "Zertifikat Wertermittlung",
    icon: <FaCertificate className="text-mint-600  text-3xl" />,
    description: "Spezialisierte Ausbildung in der professionellen Immobilienbewertung.",
    certificateImage: "/certificates/property-valuation-cert.jpg"
  },
  {
    id: 3,
    name: "Vertrauenswürdigkeit",
    icon: <FaShieldAlt className="text-mint-600  text-3xl" />,
    description: "Höchste Zuverlässigkeit und absolute Diskretion bei allen Immobilienangelegenheiten. Langjährige Erfahrung und kontinuierliche Weiterbildung garantieren eine professionelle und vertrauensvolle Betreuung.",
  },
];



const WhyTrustUs: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const handleOpenImage = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  return (
    <section
      id="why-trust-us"
      className="w-full mx-auto mt-6 mb-10 sm:p-12 md:p-6 xl:px-6 transition-opacity duration-100 overflow-auto max-h-screen ">
      <div className="duration-100 bg-light-100 dark:bg-dark-200 shadow-shadow-subtle-l dark:shadow-shadow-subtle-d flex flex-col lg:flex-row items-center gap-10 p-4 sm:rounded-2xl">
        <div className="flex flex-col items-center md:items-start md:w-1/3 ">
          <div className="duration-100 relative w-70 h-56 shadow-shadow-subtle-l dark:shadow-shadow-subtle-d border-4 dark:border-gray-800 border-amber-50 mb-4 bg-white dark:bg-dark-200">
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
            <span className="inline-block bg-mint-100 bg-mint-600 dark:bg-mint-600 px-3 py-1 rounded-full text-xs font-semibold mb-2 text-white">
              -
              Emsland & Grafschaft Bentheim
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-mint-600  mb-2 tracking-tight drop-shadow-lg">
            Warum du uns vertrauen kannst
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
            Vertrauen ist die Basis jeder erfolgreichen Zusammenarbeit. Als erfahrene Immobilienmaklerin mit fundierter Ausbildung und offiziellen Zertifikaten stehe ich dir mit Kompetenz und Engagement zur Seite.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mb-4">
            Mein Ziel ist es, deine Wünsche und Bedürfnisse zu verstehen und gemeinsam die beste Lösung für deine Immobilie zu finden. Diskretion, Zuverlässigkeit und ein starkes Netzwerk von Experten garantieren dir höchste Sicherheit und Professionalität.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="duration-100 w-full flex flex-col items-center bg-light-200 dark:bg-dark-300 rounded-2xl shadow-subtle-l dark:shadow-subtle-d p-6 transition hover:scale-105 h-[210px]"
              >
                <div className="flex-1 flex flex-col items-center">
                  <div className="mb-3">{badge.icon}</div>
                  <span className="text-base font-semibold text-mint-600 text-center mb-2">{badge.name}</span>
                  <p className="text-xs text-gray-600 dark:text-gray-300 text-center">{badge.description}</p>
                </div>
                {badge.certificateImage && (
                  <button
                    onClick={() => handleOpenImage(badge)}
                    className="mt-auto flex items-center gap-2 text-xs text-mint-600 hover:text-cyan-500 dark:text-mint-500 dark:hover:text-mint-400 cursor-pointer"
                  >
                    <IoEyeOutline />
                    <span>Zertifikat ansehen</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[150px] xl:hidden" />

      {selectedBadge && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-auto bg-transparent"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-800/70 transition-colors"
              aria-label="Schließen"
            >
              <IoClose size={24} />
            </button>
            <div className="relative w-full h-[70vh] md:h-[80vh] rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-dark-200">
              <Zoom>
                <Image
                  src={selectedBadge.certificateImage!}
                  alt="Zertifikat"
                  width={1200}
                  height={800}
                  className="w-auto max-w-full max-h-[70vh] md:max-h-[80vh] object-contain mx-auto"
                  priority
                />
              </Zoom>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyTrustUs;
