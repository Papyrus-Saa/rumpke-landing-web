'use client'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSubmit } from './hooks/useSubmit'
import Turnstile from 'react-turnstile'
import { useState } from 'react';
import { useRainbow } from '@/hooks/useRainBow';

type TipFormData = {
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
      name: '',
      contact: '',
      address: '',
      ownerRelation: '',
      propertyAddress: '',
      ownerName: '',
      ownerContact: '',
      prize: selectedPrize,
    }
  });

  useEffect(() => {
    if ((submitError || localError) && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitError, localError]);

  useEffect(() => {
    if (selectedPrize) setValue('prize', selectedPrize);
  }, [selectedPrize, setValue]);

  function setError(message: string) {
    setLocalError(message);
  }

  const onSubmit = async (data: TipFormData) => {
    setLocalError(null);

    if (!data.captchaToken) {
      setError('Bitte bestätigen Sie, dass Sie kein Roboter sind.');
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
    "w-full rounded-2xl px-4 py-2 outline-none bg-[oklch(98%_0_0)] dark:bg-dark-100 bg-light-200 border-black/10 dark:border-white/10 placeholder:opacity-60 focus:ring-2 focus:ring-mint-600 dark:focus:ring-mint-700 focus:border-transparent border-2 border-transparent duration-300";

  const labelCls = "block text-sm font-medium mb-1";
  const errorCls = "text-sm text-red-500 mt-1";

  return (
    <div className="px-2 sm:px-6 md:px-8 lg:px-10  mb-10 bg-light pt-6">
      <motion.form
        id='contact-form'
        onSubmit={handleSubmit(onSubmit)}
        className={
          "mx-auto max-w-2xl rounded-3xl shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] space-y-5 p-4 md:p-8 duration-300 bg-light-100 dark:bg-dark-200 sm:w-[80%] mb-2 scroll-mt-40"
        }
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {(submitError || localError) && (
          <div
            ref={errorRef}
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm mt-2">
            {submitError || localError}
          </div>
        )}
        <div>
          <label className={labelCls} htmlFor="prize"><span className='text-2xl'>Prämie auswählen *</span></label>
          <select
            id="prize"
            className={`${inputBase} ${rainbowActive ? 'rainbow-border' : ''}`}
            {...register('prize', { required: 'Prämie auswählen ist erforderlich' })}
            aria-invalid={!!errors.prize}
          >
            <option value="">Bitte wählen…</option>
            {PRAEMIEN.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          {errors.prize && <p className={errorCls}>{errors.prize.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="name">Vorname & Nachname *</label>
          <input
            id="name"
            className={inputBase}
            placeholder="Vorname Nachname"
            {...register('name', { required: 'Name ist erforderlich' })}
          />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="contact">Kontakt (E-Mail oder Telefon) *</label>
          <input
            id="contact"
            className={inputBase}
            placeholder="E-Mail oder Telefon"
            {...register('contact', { required: 'Kontakt ist erforderlich' })}
          />
          {errors.contact && <p className={errorCls}>{errors.contact.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="address">Adresse *</label>
          <input
            id="address"
            className={inputBase}
            placeholder="Straße Nr., PLZ Ort"
            {...register('address', { required: 'Adresse ist erforderlich' })}
          />
          {errors.address && <p className={errorCls}>{errors.address.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="ownerRelation">Beziehung zum Eigentümer *</label>
          <input
            id="ownerRelation"
            className={inputBase}
            placeholder="z. B. Nachbar, Makler, Freund…"
            {...register('ownerRelation', { required: 'Beziehung ist erforderlich' })}
          />
          {errors.ownerRelation && <p className={errorCls}>{errors.ownerRelation.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="propertyAddress">Adresse der Immobilie *</label>
          <input
            id="propertyAddress"
            className={inputBase}
            placeholder="Straße Nr., PLZ Ort"
            {...register('propertyAddress', { required: 'Adresse der Immobilie ist erforderlich' })}
          />
          {errors.propertyAddress && <p className={errorCls}>{errors.propertyAddress.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="ownerName">Name des Eigentümers (optional)</label>
          <input
            id="ownerName"
            className={inputBase}
            placeholder="Eigentümer Name"
            {...register('ownerName')}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="ownerContact">Kontakt des Eigentümers (optional)</label>
          <input
            id="ownerContact"
            className={inputBase}
            placeholder="Eigentümer Kontakt"
            {...register('ownerContact')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-base font-medium" htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              {...register('terms', { required: 'Bitte akzeptieren Sie die AGB.' })}
              className="w-5 h-5 accent-mint-600"
            />
            Ich akzeptiere die AGB *
          </label>
          {errors.terms && (
            <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
          )}
          <p
            className="text-xs text-gray-600 dark:text-gray-300 mt-1 pl-3 py-2 border-l-4 border-mint-600 dark:border-mint-700 bg-light-300 dark:bg-dark-300 rounded duration-300"
          >
            Ihre Daten werden ausschließlich zur Bearbeitung Ihres Tipps verwendet und nicht an Dritte weitergegeben.
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
                "inline-flex items-center justify-center rounded px-3 py-1 sm:py-1 font-medium bg-mint-600 dark:bg-mint-700 text-white shadow-[var(--shadow-subtle-l)] dark:shadow-[var(--shadow-subtle-d)] hover:brightness-110 active:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer w-full"
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

