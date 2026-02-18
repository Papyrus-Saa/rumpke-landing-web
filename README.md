
# RUMPKE Landing Web

## Overview

Public landing page for Rumpke Immobilien digital lead generation.

Built with Next.js and connected to a secure NestJS backend API for email handling and form validation.

This project is the public-facing landing page for collecting property leads.

## Architecture

- **Frontend:** Next.js
- **Backend API:** NestJS
- **Email service:** SMTP / transactional email

The frontend is fully decoupled from the backend and communicates via a secure API endpoint.

## AI Assistant (Beta) – OpenAI Integration

This project includes a lightweight AI assistant powered by OpenAI.

### The assistant:

- Answers questions about the program and how it works
- Provides contextual guidance for users
- Clearly informs users that responses are AI-generated
- Does not store personal conversation data

## Safety & Transparency

- Users are explicitly informed they are interacting with an AI assistant
- No legal or binding advice is provided
- The assistant is limited to predefined context about the program

This feature demonstrates integration of AI services into a production-ready web application.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Server Actions / API calls
- Environment-based configuration
- SEO optimized metadata
- Production-ready deployment (Vercel / Strato)

## Security & Validation

- Client-side validation
- Backend validation (class-validator)
- CORS restrictions
- Rate limiting (handled in backend)
- Captcha integration (Cloudflare Turnstile)
- Honeypot field for bot detection

## Performance & SEO

- Optimized images (next/image)
- Font optimization
- Proper metadata and OpenGraph tags
- Production build optimization

## Local Development

```bash
npm install
npm run dev
```

Application runs at:

http://localhost:3000

## Testing

This project includes comprehensive unit and integration tests using **Vitest** and **React Testing Library**.

### Running Tests

```bash
# Watch mode (development)
npm run test

# Visual UI dashboard
npm run test:ui

# Single run (CI/CD)
npm run test:run

# Coverage report
npm run test:coverage
```

### Test Coverage

- **69 tests** across hooks, components, and integrations
- **100% code coverage** on all tested modules
- All external libraries tested directly (not mocked)

### Testing Guidelines

For detailed testing documentation, methodology, and best practices, see [TESTING.md](./TESTING.md).

Key testing principles:
- Test user behavior, not implementation
- Use React Testing Library's `screen` API for queries
- Follow AAA pattern (Arrange-Act-Assert)
- Mock only browser APIs, not external libraries
- Achieve 100% coverage on all tested files

### Test Files

```
src/__tests__/
├── unit/hooks/
│   ├── useThemeMode.test.ts
│   ├── useScrolled.test.ts
│   └── useRandomColoredWord.test.tsx
├── integration/components/
│   ├── AIButton.test.tsx
│   └── ThemeContext.test.tsx
└── e2e/
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Never commit secrets.**

## Production

Deployed via modern hosting platform with:

- HTTPS
- Custom domain
- CDN
- Environment separation (dev/staging/prod)

## Future Improvements

- Internationalization
- Analytics dashboard
- A/B testing
- Conversion tracking

## License

This project is private and not licensed for redistribution.
