
"use client";
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import CookieInput from "./CookieInput";
import CookieButton from "./CookieButton";

type CookieCategories = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

const defaultCategories: CookieCategories = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
};

const COOKIE_KEY = "cookieConsent";

function setCookie(name: string, value: string, days: number) {
  if (typeof window === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] || null
  );
}

export default function CookieConsentClient(): React.JSX.Element | null {
  const [open, setOpen] = useState<boolean>(true);
  const [categories, setCategories] = useState<CookieCategories>(defaultCategories);


  useEffect(() => {
    const consent = getCookie(COOKIE_KEY) || window.localStorage.getItem(COOKIE_KEY);
    if (consent) setOpen(false);
  }, []);

  function insertGoogleAnalyticsScript() {
    if (!document.getElementById('google-analytics')) {
      const script = document.createElement('script');
      script.id = 'google-analytics';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-54X5RBNXJ8';
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-54X5RBNXJ8');`;
      document.head.appendChild(inlineScript);
    }
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const updateConsentMode = (categories: CookieCategories) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: categories.marketing ? 'granted' : 'denied',
        analytics_storage: categories.statistics ? 'granted' : 'denied',
      });
    }
  };

  const saveConsent = (accepted: boolean) => {
    let consentCategories;
    if (accepted) {
      consentCategories = { necessary: true, preferences: true, statistics: true, marketing: true };
      setCookie(COOKIE_KEY, "all", 365);
      window.localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...consentCategories, accepted: true }));
      insertGoogleAnalyticsScript();
    } else {
      consentCategories = { necessary: true, preferences: false, statistics: false, marketing: false };
      setCookie(COOKIE_KEY, "necessary", 365);
      window.localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...consentCategories, accepted: false }));
    }
    updateConsentMode(consentCategories);
    setOpen(false);
  };

  const saveCustomConsent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCookie(COOKIE_KEY, "custom", 365);
    window.localStorage.setItem(COOKIE_KEY, JSON.stringify(categories));
    if (categories.statistics) {
      insertGoogleAnalyticsScript();
    }
    updateConsentMode(categories);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="duration-100 fixed bottom-0 lg:py-4 left-0 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2 w-full 2xl:w-[85%] z-50 bg-light-100/90 dark:bg-dark-300/90 dark:text-white hover:bg-white dark:hover:bg-dark-300 border-t border-gray-200 dark:border-gray-800">
      <div className="font-bold mb-1 text-center">Cookies & Datenschutz</div>
      <div className="lg:flex mx-auto w-[90%] py-2">
        <div className="flex-1">
          <div className="text-sm mb-4 px-2 text-left">
            Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern, den Datenverkehr zu analysieren und personalisierte Werbung anzuzeigen. Sie können alle Cookies akzeptieren oder Ihre Präferenzen festlegen.
          </div>
          <form className="flex flex-wrap lg:block gap-4 text-xs mb-4 px-2">
            <CookieInput
              name="necessary"
              checked={categories.necessary}
              label="Notwendig"
              disabled
            />
            <CookieInput
              name="preferences"
              checked={categories.preferences}
              label="Präferenzen"
              onChange={handleCategoryChange}
            />
            <CookieInput
              name="statistics"
              checked={categories.statistics}
              label="Statistik"
              onChange={handleCategoryChange}
            />
            <CookieInput
              name="marketing"
              checked={categories.marketing}
              label="Marketing"
              onChange={handleCategoryChange}
            />
          </form>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 ">
          <CookieButton
            title="Alle akzeptieren"
            onClick={() => saveConsent(true)}
            className="bg-mint-600 "
          />
          <CookieButton
            title="Auswahl speichern"
            onClick={saveCustomConsent}
            className="bg-dark-200"
          />
          <CookieButton
            title="Marketing & Statistik ablehnen"
            onClick={() => saveConsent(false)}
            className="bg-dark-100"
          />
        </div>
      </div>
    </div>
  );
}
