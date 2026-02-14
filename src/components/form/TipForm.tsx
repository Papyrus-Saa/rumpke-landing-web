'use client'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSubmit } from './hooks/useSubmit'
import Turnstile from 'react-turnstile'
import { useState } from 'react';
import { useRainbow } from '@/hooks/useRainBow';

export type TipFormData = {
  tippgeberName: string;
  tippgeberKontakt: string;
  tippgeberAdresse: string;
  beziehungEigentuemer: string;
  immobilienAdresse: string;
  plzOderStadt: string;
  eigentuemerName?: string;
  eigentuemerKontakt?: string;
  praemie: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
  terms: boolean;
  captchaToken: string;
  neueEigenschaft1?: string;
  neueEigenschaft2?: string;
};

interface TipFormProps {
  selectedPrize?: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
}

const PRAEMIEN = [
  { value: 'Urlaub', label: 'Urlaub' },
  { value: 'E-Bike', label: 'E-Bike' },
  { value: 'Gutschein', label: 'Gutschein' },
  { value: 'Küche', label: 'Küche' }
];

export default function TipForm({ selectedPrize }: TipFormProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const { submit, loading, success, error: submitError } = useSubmit();
  const errorRef = useRef<HTMLDivElement>(null);

  const { rainbowActive } = useRainbow();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TipFormData>({
    defaultValues: {
      tippgeberName: '',
      tippgeberKontakt: '',
      tippgeberAdresse: '',
      beziehungEigentuemer: '',
      immobilienAdresse: '',
      plzOderStadt: '',
      eigentuemerName: '',
      eigentuemerKontakt: '',
      praemie: selectedPrize,
      terms: false,
      captchaToken: '',
    }
  });

  useEffect(() => {
    if ((submitError || localError) && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitError, localError]);

  useEffect(() => {
    if (selectedPrize) setValue('praemie', selectedPrize);
  }, [selectedPrize, setValue]);

  function setError(message: string) {
    setLocalError(message);
  }

  const onSubmit = async (data: TipFormData) => {
    setLocalError(null);

    if (!data.captchaToken) {
      setError('Bitte bestätige, dass du kein Roboter bist.');
      return;
    }
    const submitResult = await submit(data);
    if (
      submitResult &&
      typeof submitResult === 'object' &&
      submitResult.ok &&
      submitResult.result &&
      submitResult.result.totalSubmissions !== undefined
    ) {
      reset();
    }
  };

  const inputBase =
    "duration-100 w-full px-4 py-2 rounded-lg  outline-none duration-100 bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-700 shadow-sm focus:border-mint-600 dark:focus:border-mint-600 focus:ring-2 focus:ring-mint-600 dark:focus:ring-mint-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all";

  const labelCls = "block text-sm font-medium mb-1";
  const errorCls = "text-sm text-red-500 mt-1";

  return (
    <div className="px-2 sm:px-6 md:px-8 lg:px-10  mb-10 bg-light pt-6">
      <motion.form
        id='contact-form'
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className={
          "mx-auto max-w-2xl rounded-xl shadow dark:shadow-subtle-d space-y-5 p-4 md:p-8 duration-100 bg-light-100 dark:bg-dark-200 sm:w-[80%] mb-2 scroll-mt-40"
        }
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {(submitError || localError) && (
          <div
            ref={errorRef}
            className="mx-auto mb-3 mt-1 flex items-center justify-center w-fit px-4 py-2 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-medium shadow-sm text-center">
            {submitError || localError}
          </div>
        )}

        {/* Prämie auswählen */}
        <div>
          <label className={labelCls} htmlFor="praemie"><span className='text-gradient-orange-yellow'>Prämie auswählen *</span></label>
          <select
            id="praemie"
            autoComplete="off"
            className={`${inputBase} ${rainbowActive ? 'rainbow-border' : ''}`}
            {...register('praemie', { required: 'Prämie auswählen ist erforderlich' })}
            aria-invalid={!!errors.praemie}
          >
            <option value="">Bitte wählen…</option>
            {PRAEMIEN.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          {errors.praemie && <p className={errorCls}>{errors.praemie.message}</p>}
        </div>

        {/* Daten des Tippgebers */}
        <h3 className="mt-6 mb-2 text-lg font-semibold text-mint-600">Daten des Tippgebers</h3>
        <div>
          <label className={labelCls} htmlFor="tippgeberName">Vorname & Nachname *</label>
          <input
            id="tippgeberName"
            autoComplete="name"
            className={inputBase}
            placeholder="Vorname Nachname"
            {...register('tippgeberName', { required: 'Name ist erforderlich' })}
          />
          {errors.tippgeberName && <p className={errorCls}>{errors.tippgeberName.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="tippgeberKontakt">E-Mail-Adresse *</label>
          <input
            id="tippgeberKontakt"
            type="email"
            autoComplete="email"
            className={inputBase}
            placeholder="E-Mail-Adresse"
            {...register('tippgeberKontakt', {
              required: 'E-Mail ist erforderlich',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Bitte eine gültige E-Mail-Adresse eingeben.'
              }
            })}
          />
          {errors.tippgeberKontakt && <p className={errorCls}>{errors.tippgeberKontakt.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="tippgeberAdresse">Adresse *</label>
          <input
            id="tippgeberAdresse"
            autoComplete="street-address"
            className={inputBase}
            placeholder="Straße Nr."
            {...register('tippgeberAdresse', { required: 'Adresse ist erforderlich' })}
          />
          {errors.tippgeberAdresse && <p className={errorCls}>{errors.tippgeberAdresse.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="beziehungEigentuemer">Beziehung zum Eigentümer *</label>
          <input
            id="beziehungEigentuemer"
            autoComplete="organization"
            className={inputBase}
            placeholder="z. B. Nachbar, Makler, Freund…"
            {...register('beziehungEigentuemer', { required: 'Beziehung ist erforderlich' })}
          />
          {errors.beziehungEigentuemer && <p className={errorCls}>{errors.beziehungEigentuemer.message}</p>}
        </div>

        {/* Daten der Immobilie */}
        <h3 className="mt-6 mb-2 text-lg font-semibold text-mint-600 text">Daten der Immobilie</h3>
        <div>
          <label className={labelCls} htmlFor="immobilienAdresse">Adresse *</label>
          <input
            id="immobilienAdresse"
            autoComplete="street-address"
            className={inputBase}
            placeholder="Straße, Nr."
            {...register('immobilienAdresse', { required: 'Adresse der Immobilie ist erforderlich' })}
          />
          {errors.immobilienAdresse && <p className={errorCls}>{errors.immobilienAdresse.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="plzOderStadt">PLZ/Stadt *</label>
          <input
            id="plzOderStadt"
            autoComplete="postal-code"
            className={inputBase}
            placeholder="PLZ oder Stadt"
            {...register('plzOderStadt', { required: 'PLZ oder Stadt ist erforderlich' })}
          />
          {errors.plzOderStadt && <p className={errorCls}>{errors.plzOderStadt.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="eigentuemerName">Name des Eigentümers (optional)</label>
          <input
            id="eigentuemerName"
            autoComplete="name"
            className={inputBase}
            placeholder="Eigentümer Name"
            {...register('eigentuemerName')}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="eigentuemerKontakt">Kontakt des Eigentümers (optional)</label>
          <input
            id="eigentuemerKontakt"
            autoComplete="tel"
            className={inputBase}
            placeholder="Eigentümer Kontakt"
            {...register('eigentuemerKontakt')}
          />
        </div>

        {/* Términos y captcha */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-base font-medium" htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              {...register('terms', { required: 'Bitte akzeptiere die AGB.' })}
              className="w-5 h-5 accent-mint-600"
            />
            Ich akzeptiere die AGB *
          </label>
          {errors.terms && (
            <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
          )}
          <p
            className="text-xs text-gray-600 dark:text-gray-300 mt-1 pl-3 py-2 border-l-4 border-mint-600 dark:border-mint-700 bg-light-300 dark:bg-dark-300 rounded duration-100"
          >
            Deine Daten werden ausschließlich zur Bearbeitung deines Tipps verwendet und nicht an Dritte weitergegeben.
          </p>
        </div>
        {success && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm mt-2">
            {success}
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
          <div className="sm:ml-auto mx-auto">
            <button
              type="submit"
              disabled={loading}
              className={
                "inline-flex items-center justify-center rounded px-3 py-1 sm:py-1 font-medium text-white hover:brightness-110 active:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer w-full bg-linear-to-tr grad bg-gradient-orange-yellow"
              }
            >
              {loading ? 'Senden…' : 'Tipp senden'}
            </button>
          </div>
        </div>
        <div className='w-full text-center'>
          <Turnstile
            sitekey="0x4AAAAAAB1HyJ9z8VQZIM0v"
            onVerify={(token) => setValue('captchaToken', token)}
            theme="light"
          />
        </div>
      </motion.form>
    </div>
  );
}
