'use client'
import { useState } from 'react'

export type TipFormData = {
  tippgeberName: string;
  tippgeberKontakt: string;
  tippgeberAdresse: string;
  plzOderStadt: string;
  beziehungEigentuemer: string;
  immobilienAdresse: string;
  eigentuemerName?: string;
  eigentuemerKontakt?: string;
  praemie: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
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
      const { terms, ...dataToSend } = data;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ichschenkedirwas.de'}/rumpkeai/tip-form`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        const j = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(j.message || 'Es ist ein Fehler aufgetreten. Bitte lade die Seite neu. Wenn das Problem weiterhin besteht, versuche es später erneut.');
      }
      setSuccess('Vielen Dank für deine Empfehlung! Wir haben deine Angaben erhalten und unser Team prüft diese zeitnah. Du erhältst in Kürze eine Rückmeldung von uns. Deine Daten sind bei uns sicher und werden vertraulich behandelt. 😊');
      return { ok: true, result };
    } catch (e) {
      const errorMsg = (e instanceof Error) ? e.message : String(e);
      setError(
        errorMsg === 'Failed to fetch'
          ? 'Verbindung zum Server fehlgeschlagen. Bitte versuche es später erneut.'
          : errorMsg
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, error }
}
