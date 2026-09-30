# 🛒 FreshCart — E-Commerce Storefront

A modern, responsive e-commerce web app built with **Next.js 16**, **React 19** and **TypeScript**. Browse products, filter by category and brand, manage a wishlist and cart, save addresses, and place orders — all wired to the real [Route Academy E-commerce API](https://documenter.getpostman.com/view/5709532/2s93JqTRWN).

The UI is a pixel-conscious implementation of the FreshCart Figma design across desktop, tablet and mobile.

> Built as **Assignment 16** of the Route Academy front-end course.

<!--
📸 Add screenshots here, for example:
![Home](./docs/screenshots/home.png)
-->

---

## ✨ Features

**Shopping**
- Home page with hero slider, category browser, promo banners, featured products and newsletter
- Shop and search pages with category, brand and price filters, sorting and pagination
- Product details with image gallery, quantity picker, live total, tabs and a "You May Also Like" carousel
- Categories and brands directories with dedicated detail pages

**Cart & checkout**
- Add, increase, decrease and remove items, with instant (optimistic) UI updates and rollback on failure
- Free-shipping threshold and order summary
- Checkout with saved addresses or a new one, and Cash on Delivery or online card payment

**Account**
- Sign up, sign in and a 3-step password recovery flow (email → verification code → new password)
- Wishlist, order history with expandable order details
- Profile settings (update profile, change password) and address book
- Route protection: guests are redirected away from account pages, and signed-in users away from auth pages

**Quality**
- Fully responsive layouts
- Form validation with clear inline errors
- Toast notifications, loading spinners and empty states throughout

---

## 🧰 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Server state | TanStack Query |
| Client state | Redux Toolkit |
| HTTP | Axios |
| Forms & validation | React Hook Form + Zod |
| UI extras | Swiper, Sonner (toasts), Tabler Icons |
| Tooling | ESLint, React Compiler |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or newer
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HassanHammad-Ai/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |

No environment variables are needed. The API base URLs live in `src/lib/constants.ts`.

---

## 🗂️ Project Structure

The project is **feature-based**: each feature owns its components, hooks, services, types and validation schemas.

```
src/
├── app/                  # Routing only: thin pages composing feature components
│   ├── (auth)/           # login, signup, forget-password
│   └── (main)/           # home, shop, product, cart, wishlist, orders, checkout,
│                         # categories, brands, search, profile, terms, contact
├── features/
│   ├── auth/  products/  categories/  brands/  cart/
│   └── wishlist/  orders/  addresses/  checkout/  profile/  home/
├── components/
│   ├── layout/           # Navbar, Footer, TrustBar
│   └── ui/               # Spinner, RatingStars, Pagination, EmptyState
├── store/                # Redux store and typed hooks
├── providers/            # TanStack Query + Toaster providers
├── lib/                  # Axios instances, constants, utilities
└── proxy.ts              # Route guard for protected and guest-only pages
```

---

## 🔐 Authentication & Route Protection

- The JWT and user are stored in `localStorage` and mirrored to a cookie, so `src/proxy.ts` can redirect visitors **before** a page renders.
- The API expects the token in a plain `token` header (not `Authorization: Bearer`). This is configured once in `src/lib/axios.ts`.
- Protected routes: `/cart`, `/wishlist`, `/orders`, `/checkout`, `/profile`.

---

## 🛍️ Cart Implementation Notes

The v2 cart endpoints identify a cart line by its **product id**, not the line's own `_id`. The cart service (`src/features/cart/services/cart.api.ts`) handles this and:

- updates quantity and removes items using the product id, with a fallback to the line id;
- re-fetches the cart after every change so the UI always matches the server;
- applies changes optimistically in the UI and rolls back if the server rejects them;
- makes the product-page quantity picker add the exact amount chosen.

---

## 🔌 API

All data comes from the Route Academy E-commerce API:

- Base URL: `https://ecommerce.routemisr.com/api/v1` (and `/api/v2` for the cart)
- Documentation: [Postman docs](https://documenter.getpostman.com/view/5709532/2s93JqTRWN)

The Google and Facebook sign-in buttons and the app-store badges match the design but are placeholders, since the API only supports email and password authentication.

---

## 🗺️ Roadmap

- [ ] Real product reviews
- [ ] Edit saved addresses
- [ ] Social sign-in
- [ ] Unit and end-to-end tests

---

## 👤 Author

**Hassan Hammad** — Computer Science student and aspiring Front-End (React) developer

- GitHub: [@HassanHammad-Ai](https://github.com/HassanHammad-Ai)
- LinkedIn: [Hassan Hammad](https://linkedin.com/in/hassan-hammad-2548a5384)

Design and API by [Route Academy](https://routeacademy.com/). This project is for educational purposes.
