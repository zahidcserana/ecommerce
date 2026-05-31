# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # Type-check and build for production
npm run preview   # Preview production build locally
```

E2E tests use Cypress with baseUrl `http://localhost:5173` (configured in `cypress.config.ts`).

Linting: ESLint + Prettier (`eslintrc.cjs`, `.prettierrc`) — 2-space indent, single quotes, no semicolons.

## Architecture

This is a **Vue 3 SPA** (frontend only) that consumes an external REST API. There is no backend in this repo.

### Environment

Three env vars control connectivity (see `.env`):
- `VITE_BASE_URL` — backend host
- `VITE_BASE_URL_API` — storefront API base (`/api/storefront`)
- `VITE_DOMAIN` — tenant domain

### Data Flow

```
API Layer (src/api/)
  └── apiClient.ts         Axios instance; injects Bearer token from localStorage on every request
  └── productsApi.ts / cartsApi.ts / ordersApi.ts   Domain-scoped endpoint wrappers

State (src/pinia/ + src/stores/)
  └── appStore.ts          Tenant info, tags, featured products; bootstrapped via fetchSettings() before mount
  └── cart.ts              Cart items and totals; persisted to localStorage via pinia-plugin-persistedstate

Pages (src/pages/)          Lazy-loaded by Vue Router (src/routes/routes.ts)
Components (src/components/) Reusable UI; Buttons/, Cart/, Category-Box/, Global/ subdirectories
```

### Key Patterns

- **Bootstrap**: `main.ts` calls `appStore.fetchSettings()` before `app.mount()` to hydrate tenant/category data.
- **Auth**: Bearer token read from `localStorage` via Axios request interceptor. 401 handling is a placeholder.
- **Routing**: Category passed as query param (`?category=`), product identified by SKU param.
- **Styling**: Tailwind with custom theme — primary color `k-main: #FFC700`, font Manrope loaded via Google Fonts CDN in `index.html`.

### API Endpoints (storefront)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Settings (tenant, tags, featured products) |
| GET | `/products` | Paginated product list |
| GET | `/products/{id}` | Product detail |
| GET | `/product_search?sku={sku}` | Product by SKU |
| GET | `/tag_products?category={category}` | Products by category |
| GET/POST | `/cart` | Fetch or add to cart |
| DELETE | `/cart/{id}` | Remove cart item |
| GET/POST | `/orders` | Orders list or create |
| GET | `/orders/{id}` | Order detail |
