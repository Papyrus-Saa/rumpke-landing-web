import { z } from 'zod'


export const PRAEMIEN = [
{ value: 'opt1', label: 'Prämienoption 1' },
{ value: 'opt2', label: 'Prämienoption 2' },
{ value: 'opt3', label: 'Prämienoption 3' },
{ value: 'opt4', label: 'Prämienoption 4' },
{ value: 'opt5', label: 'Prämienoption 5' },
{ value: 'opt6', label: 'Prämienoption 6' },
] as const


export const tipFormSchema = z.object({
praemie: z.string().min(1, 'Bitte eine Prämie auswählen.'),
vorname: z.string().min(2, 'Vorname ist erforderlich.'),
nachname: z.string().min(2, 'Nachname ist erforderlich.'),
email: z.string().email('Bitte eine gültige E-Mail eingeben.').optional().or(z.literal('')),
telefon: z.string().optional().or(z.literal('')),
immobilienAdresse: z.string().min(5, 'Adresse der Immobilie ist erforderlich.'),
eigentuemerName: z.string().optional(),
eigentuemerTelefon: z.string().optional(),
zusatzInfo: z.string().max(2000, 'Maximal 2000 Zeichen.').optional(),
rechteAkzeptiert: z.literal(true, { errorMap: () => ({ message: 'Bitte Rechte & Datenschutz akzeptieren.' }) }),
}).refine((d) => (d.email && d.email.length > 0) || (d.telefon && d.telefon.length > 0), {
message: 'Bitte E-Mail **oder** Telefonnummer angeben.',
path: ['email'],
})


export type TipFormData = z.infer<typeof tipFormSchema>
