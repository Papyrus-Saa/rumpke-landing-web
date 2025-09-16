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
    try {
      setLoading(true); setError(null); setSuccess(null)
      console.log("Enviando:", data);

      const { terms, ...dataToSend } = data;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/rumpkeai/tip-form`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        const j = await res.json().catch(() => ({ message: res.statusText }))
        throw new Error(j.message || 'Unbekannter Fehler')
      }
      setSuccess('Vielen Dank! Ihre Angaben wurden übermittelt. 😊')
      return { ok: true, result }
    }
    catch (e: any) {
      setError(
        e.message === 'Failed to fetch'
          ? 'Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.'
          : e.message
      );
      return false;
    }
    finally {
      setLoading(false);
    }
  }

  return { submit, loading, success, error }
}
