# FreshCart — E-Commerce (Assignment 16)

A full-featured e-commerce storefront built with Next.js 16 (App Router), matching
[freshcart-route.vercel.app](https://freshcart-route.vercel.app/) and wired to the real
[Route e-commerce API](https://documenter.getpostman.com/view/5709532/2s93JqTRWN)
(`https://ecommerce.routemisr.com/api/v1`).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Styling:** Tailwind CSS v4
- **Icons:** Tabler Icons
- **Client state:** Redux Toolkit (`auth` session, `ui` mobile-menu state)
- **Server state:** Tanstack Query + Devtools (products, cart, wishlist, orders, addresses...)
- **HTTP:** axios (see `src/lib/axios.ts` — the API expects the JWT on a plain `token`
  header, not `Authorization: Bearer`)
- **Forms:** react-hook-form + Zod
- **Toasts:** sonner
- **Slider:** Swiper (home page hero)

## Architecture — Feature-Based

```
src/
  app/                # routing only — thin pages that compose feature components
    (auth)/            # login, signup, forget-password, reset-password (no navbar)
    (main)/            # home, shop, product, cart, wishlist, orders, checkout,
                        # categories, brands, search, profile, terms, contact, privacy
  features/
    auth/              # signup/login/forgot-reset flow, session slice, types
    products/          # product listing, filters, details, cards
    categories/ brands/ cart/ wishlist/ orders/ addresses/ checkout/ profile/
  components/
    layout/            # Navbar, Footer
    ui/                # Spinner, RatingStars, Pagination, EmptyState
  store/               # Redux store + typed hooks + StoreProvider
  providers/           # Tanstack Query provider + Toaster, combined AppProviders
  lib/                 # axios instance, constants, utils, shared api types, jwt decode
  proxy.ts             # Next 16's renamed `middleware` — guards protected/guest routes
```

Each feature owns its own `components/ services/ hooks/ types/ schemas/` — cart code
never reaches into products' internals directly except through its public types.

## Auth & Route Protection

- On login/signup the JWT + user are stored in `localStorage` **and** mirrored to a
  cookie so `src/proxy.ts` can redirect unauthenticated visitors away from
  `/cart /wishlist /orders /profile /checkout` before the page renders, and redirect
  already-logged-in users away from the login/signup/forgot/reset pages.
- The API's sign-in response doesn't include the user's id, so it's decoded from the
  JWT payload client-side (`src/lib/jwt.ts`) to call `GET /orders/user/:userId`.

## Known assumptions worth double-checking

- **`/users/updateMe/` and `/users/changeMyPassword`** (used by Profile → Settings)
  were not in the Postman excerpt I could fetch — they're this API's conventional
  paths, but please verify them against the live Postman collection and adjust
  `src/features/profile/services/account.api.ts` if either 404s.
- **Social login buttons** (Google/Facebook) were left out of the login/signup forms
  since there's no real OAuth backend to wire them to — adding them back is only
  worthwhile once there's something for them to call.
- **Newsletter and Contact forms** are UI-only (no such endpoints exist in the API);
  they show a success toast without persisting anything.
- I could not run the dev server against the live API from this sandbox (its network
  egress doesn't include `ecommerce.routemisr.com`), so while `npm run build`,
  `tsc --noEmit`, and `eslint` all pass cleanly, please do a real click-through once
  you run it locally — especially the checkout → Stripe redirect flow.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
