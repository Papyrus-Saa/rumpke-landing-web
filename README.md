
# Rumpke Leads Collector

Next.js project for real estate lead management and collection.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Papyrus-Saa/rumpke-inmo.git
   cd rumpke-leads-collector
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env.local` file in the project root and set the following variables:

```env
NEXT_PUBLIC_GPT_API=https://your-backend.com/rumpkeai
NEXT_PUBLIC_API_BASE_URL=https://your-backend.com
```

Make sure to use your actual backend/API URLs in production.

## Scripts

- `npm run dev` — Start the development server.
- `npm run build` — Build the app for production.
- `npm run start` — Start the app in production mode.
- `npm run lint` — Run the linter.

## Deployment

- **Frontend:** Deploy the project folder to Strato, Vercel, Netlify, etc.
- **Backend:** Deploy your API to AWS, Railway, Render, Supabase, etc.
- **Database:** Use a managed service like Railway, Render, Supabase, Neon, etc.

## Production Recommendations

- Properly configure environment variables and domains.
- Ensure backend and database are accessible from the frontend.
- Enable HTTPS and SSL certificates on your domain.
- Check SEO, optimized images, and accessibility.
- Test form submissions and validations.

## Contact

For support or questions, contact Papyrus-Saa.
