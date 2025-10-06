import React, { useState } from "react";
import { Badge } from "./WhyTrustUs";
import { FaCertificate, FaShieldAlt } from "react-icons/fa";

export function useTrustUsModal() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showTrustModal, setShowTrustModal] = useState(false);

  const badges: Badge[] = [
    {
      id: 1,
      name: "Zertifikat Immobilienmakler",
      icon: React.createElement(FaCertificate, { className: "text-mint-600 text-3xl" }),
      description: "IHK-zertifizierte Immobilienmaklerin mit umfassender Expertise im Immobilienmarkt.",
      certificateImage: "/certificates/real-estate-agent-cert.jpg"
    },
    {
      id: 2,
      name: "Zertifikat Wertermittlung",
      icon: React.createElement(FaCertificate, { className: "text-mint-600 text-3xl" }),
      description: "Spezialisierte Ausbildung in der professionellen Immobilienbewertung.",
      certificateImage: "/certificates/property-valuation-cert.jpg"
    },
    {
      id: 3,
      name: "Vertrauenswürdigkeit",
      icon: React.createElement(FaShieldAlt, { className: "text-mint-600 text-3xl" }),
      description: "Zuverlässigkeit, Diskretion und kontinuierliche Weiterbildung.",
      details: [
        {
          title: "Rechtliche Rahmenbedingungen für Immobilienmakler",
          items: [
            "Gesetze der Wohnungswirtschaft",
            "Grundstückskaufverkauf und Grundbuch",
            "Miet-, Pacht- und Erbbaurecht",
            "Wohnungseigentumsrecht"
          ]
        },
        {
          title: "Wirtschaftliche und rechtliche Immobiliengrundlagen",
          items: [
            "Der Immobilienmarkt im Überblick",
            "Gesetze und Verordnungen (BauGB, WoFlV, ENEV, HeizkostenV)",
            "Verkehrswertermittlungsverfahren"
          ]
        },
        {
          title: "Finanzierung und Steuern",
          items: [
            "Grundlagen der Finanzierung",
            "Versicherungen",
            "Steuern"
          ]
        }
      ]
    },
  ];

  const openBadgeModal = (badge: Badge) => setSelectedBadge(badge);
  const closeBadgeModal = () => setSelectedBadge(null);

  const openTrustModal = () => setShowTrustModal(true);
  const closeTrustModal = () => setShowTrustModal(false);

  return {
    badges,
    selectedBadge,
    showTrustModal,
    openBadgeModal,
    closeBadgeModal,
    openTrustModal,
    closeTrustModal,
  };
}
