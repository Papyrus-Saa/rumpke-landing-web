// ; ¡Vas muy bien! Para salir a producción sin sorpresas, te falta (resumen completo):

// ; Contenido & UX

// ; ✅ Un solo bloque de pasos (“So funktioniert’s”) — ya lo tienes, evita duplicados. HECHO

// ; ✅ CTA sticky en móvil (“Tipp abgeben”) que haga scroll al form (si no lo tienes siempre visible). HECHO

// ; ✅ Estado de envío del form: éxito/fracaso con aria-live + foco al primer error. HECHO

// ; ✅ Páginas 404/500 simples y con enlace al formulario.HECHO

// ; Legal & GDPR (DE)

// ; ✅ Datenschutzerklärung, Impressum, AGB (ya enlazadas).HECHO

// ; ✅ Teilnahmebedingungen/Tippgeber-Bedingungen: elegibilidad, cuándo se paga, exclusiones (si ya hay Makler),     plazos, importe, fiscalidad. HECHO

// ; ✅ Consentimiento explícito en el form + retención y borrado de datos (proceso para “Daten löschen”).NO HACE FALTA

// ; ✅ Banner de cookies (si usas analytics con cookies). //*POR HACER


// ; ✅ Aviso e-mail: no compartes datos sin permiso; canal de contacto para reclamaciones.

// ; Email & Dominios

// ; ✅ SMTP de producción + SPF/DKIM/DMARC en tu dominio. //*POR HACER

// ; ✅ Plantilla de correo (admin + confirmación al usuario si dejó email).NO HACE FALTA

// ; ✅ Dirección From y Reply-To verificadas; manejo de rebotes (opcional). //*POR HACER

// ; Backend (Nest) endurecido

// ; ✅ helmet, CORS allowlist (dominio prod), body-limit.HECHO

// ; ✅ Rate-limit + hCaptcha/reCAPTCHA verificado en servidor.

// ; ✅ Validación (class-validator) ya ✔️; añade sanitización básica (escape/strip).

// ; ✅ Logs estructurados (p. ej. pino) sin PII sensible; traza de errores.

// ; ✅ Health check /health para monitor.

// ; Base de datos & archivos

// ; ✅ Postgres gestionado (Railway/Render/Supabase/etc.) + migraciones y backups diarios.

// ; ✅ Índices simples (created_at) y estado de payout (pending/paid).

// ; ✅ Carpeta/.bucket si guardas adjuntos (ahora no).

// ; Frontend

// ; ✅ Corregir preload warnings (no pre-cargar fuentes/CSS manuales si usas next/font).

// ; ✅ Imágenes optimizadas (next/image), tamaños/sizes correctos; evitar // en rutas.

// ; ✅ SEO: <title>, <meta description>, OG/Twitter y og:image.

// ; ✅ Schema.org: Organization, FAQPage, WebSite (con SearchAction opcional).

// ; ✅ Lighthouse móvil: CLS bajo, fuentes display: swap.

// ; Analytics & Medición

// ; ✅ Consent-aware analytics (GA4/Umami/Pl. Libre).

// ; ✅ Eventos: prize_select, form_submit_success, faq_open, cta_click.

// ; ✅ Goal/conversion para el envío del formulario.

// ; Deploy & Ops

// ; ✅ Deploy Front (Vercel/Netlify) + Backend (Railway/Render/Fly).

// ; ✅ Variables .env separadas (prod/staging), secrets no en repo.

// ; ✅ Dominio + SSL, DNS listo.

// ; ✅ Monitor/uptime (Better Stack, UptimeRobot) y alertas e-mail.

// ; Admin/Workflow

// ; ✅ Panel mínimo (privado) para listar tips, filtrar, cambiar estado y exportar CSV.

// ; ✅ Proceso de payout documentado (quién verifica, cuándo se paga, prueba).

// ; “Nice to have”

// ; ✅ reCAPTCHA invisible + honeypot (ya tienes honeypot en el form).

// ; ✅ Sitemaps/robots.txt.

// ; ✅ Tests básicos: e2e de formulario (Playwright) y unit de DTOs.
