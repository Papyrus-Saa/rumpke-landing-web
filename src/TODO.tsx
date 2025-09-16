// Frontend:
// Lo puedes subir a Strato (en tu dominio principal o un subdominio como www.tudominio.com o app.tudominio.com).

// Backend:
// Lo puedes desplegar en AWS (por ejemplo, en EC2, Elastic Beanstalk, o algún servicio de contenedores) y exponerlo en un subdominio como api.tudominio.com.

// Base de datos:
// Lo ideal es usar un servicio gestionado como Railway, Render, Supabase, Neon, etc.
// Así no tienes que preocuparte por instalar, actualizar ni hacer backups manualmente.

// Resumen profesional:

// El frontend puede estar en Strato.
// El backend en AWS.
// La base de datos en un servicio gestionado (Railway, Render, Supabase, Neon, etc.).


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

// ; ✅ Rate-limit + hCaptcha/reCAPTCHA verificado en servidor.HECHO

// ; ✅ Validación (class-validator) ya ✔️; añade sanitización básica (escape/strip).HECHO

// ; ✅ Logs estructurados (p. ej. pino) sin PII sensible; traza de errores.NO HACE FALTA

// ; ✅ Health check /health para monitor.//*IMPORTANTE para monitorear

// ; Base de datos & archivos

// ; ✅ Postgres gestionado (Railway/Render/Supabase/etc.) + migraciones y backups diarios. //*POR HACER

// ; ✅ Índices simples (created_at) y estado de payout (pending/paid).NO HACE FALTA

// ; ✅ Carpeta/.bucket si guardas adjuntos (ahora no).NO HACE FALTA

// ; Frontend

// ; ✅ Corregir preload warnings (no pre-cargar fuentes/CSS manuales si usas next/font).HECHO

// ; ✅ Imágenes optimizadas (next/image), tamaños/sizes correctos; evitar // en rutas.HECHO

// ; ✅ SEO: <title>, <meta description>, OG/Twitter y og:image.//TODO muy importante hacer

// ; ✅ Schema.org: Organization, FAQPage, WebSite (con SearchAction opcional).//TODO muy importante hacer

// ; ✅ Lighthouse móvil: CLS bajo, fuentes display: swap.HECHO

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
