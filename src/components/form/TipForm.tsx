'use client'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSubmit } from './hooks/useSubmit'

type TipFormData = {
  name: string;
  contact: string;
  address: string;
  ownerRelation: string;
  propertyAddress: string;
  ownerName?: string;
  ownerContact?: string;
  prize: "Urlaub" | "E-Bike" | "Gutschein" | "Küche";
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
  const { submit, loading, success, error } = useSubmit();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TipFormData>({
    defaultValues: {
      name: '',
      contact: '',
      address: '',
      ownerRelation: '',
      propertyAddress: '',
      ownerName: '',
      ownerContact: '',
      prize: selectedPrize
    }
  });


  useEffect(() => {
    if (selectedPrize) setValue('prize', selectedPrize);
  }, [selectedPrize, setValue]);

 const onSubmit = async (data: TipFormData) => {
    const submitResult = await submit(data);
    if (submitResult && typeof submitResult === 'object' && submitResult.ok && submitResult.result && submitResult.result.totalSubmissions !== undefined) {
      reset();
    }
  };
  const inputBase =
    "w-full rounded-2xl px-4 py-2  outline-none " +
    "bg-[oklch(98%_0_0)] dark:bg-dark-200 " +
    "border-black/10 dark:border-white/10 placeholder:opacity-60 " +
    "focus:ring-2 focus:ring-mint-600 focus:border-transparent";

  const labelCls = "block text-sm font-medium mb-1";
  const errorCls = "text-sm text-red-500 mt-1";

  return (
    <div className="px-2 sm:px-6 md:px-8 lg:px-10 dark:bg-dark-300 bg-white pt-6 pb-10">
      <motion.form
        id='contact-form'
        onSubmit={handleSubmit(onSubmit)}
        className={
          "mx-auto max-w-2xl rounded-3xl border shadow-lg space-y-5 p-4 md:p-8 " +
          " " +
          "border-black/10 dark:border-white/10 sm:w-[80%] mb-2"
        }
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className={labelCls} htmlFor="prize"><span className='text-2xl'>Prämie auswählen *</span></label>
          <select
            id="prize"
            className={inputBase}
            {...register('prize', { required: 'Prämie auswählen ist erforderlich' })}
            aria-invalid={!!errors.prize}
          >
            <option value="">Bitte wählen…</option>
            {PRAEMIEN.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
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

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
          <div className="sm:ml-auto mx-auto">
            <button
              type="submit"
              disabled={loading}
              className={
                "inline-flex items-center justify-center rounded px-3 py-1 sm:py-1 font-medium " +
                "bg-mint-600 text-white shadow-sm " +
                "hover:brightness-110 active:brightness-95 " +
                "disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer w-full "
              }
            >
              {loading ? 'Senden…' : 'Tipp senden'}
            </button>
          </div>
        </div>
        {success && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm mt-2">
            {success}
          </div>
        )}
      </motion.form>
    </div>
  );
}
