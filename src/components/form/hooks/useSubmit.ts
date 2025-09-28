'use client'
import { useState } from 'react'

export type TipFormData = {
  name: string;
  contact: string;
  address: string;
  ownerRelation: string;
  propertyAddress: string;
  ownerName?: string;
  ownerContact?: string;
  prize: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
  terms: boolean;
  captchaToken: string;
};

export function useSubmit() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async (data: TipFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const emailBody = `Neue Tipp-Einreichung!\n\nPrämie: ${data.prize}\nName: ${data.name}\nKontakt: ${data.contact}\nAdresse: ${data.address}\nBeziehung zum Eigentümer: ${data.ownerRelation}\nAdresse der Immobilie: ${data.propertyAddress}\nName des Eigentümers: ${data.ownerName || '-'}\nKontakt des Eigentümers: ${data.ownerContact || '-'}\nAGB akzeptiert: ${data.terms ? 'Ja' : 'Nein'}\n`;

      const res = await fetch('https://api.ichschenkedirwas.de/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'info@rumpke-immobilien.de',
          subject: 'Neue Tipp-Einreichung über das Formular',
          text: emailBody,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.message || 'Unbekannter Fehler');
      }
      setSuccess('Vielen Dank! Ihre Angaben wurden übermittelt. 😊');
      return { ok: true, result };
    } catch (e) {
      const errorMsg = (e instanceof Error) ? e.message : String(e);
      setError(
        errorMsg === 'Failed to fetch'
          ? 'Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.'
          : errorMsg
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, error }
}
