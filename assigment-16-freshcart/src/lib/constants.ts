export const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";
export const API_BASE_URL_V2 = "https://ecommerce.routemisr.com/api/v2";

// Keys used to persist the auth session on the client.
// The cookie is a lightweight mirror of localStorage so the proxy (middleware)
// can redirect unauthenticated visitors away from protected routes before
// the page ever renders.
export const AUTH_TOKEN_KEY = "freshcart_token";
export const AUTH_USER_KEY = "freshcart_user";

export const CURRENCY = "EGP";

// Matches the "Free Shipping on Orders 500 EGP" messaging shown throughout
// the design -- orders at or above this subtotal ship free; below it, a
// flat shipping fee applies.
export const FREE_SHIPPING_THRESHOLD = 500;
export const STANDARD_SHIPPING_FEE = 50;

export const PROTECTED_ROUTES = [
  "/cart",
  "/wishlist",
  "/orders",
  "/profile",
  "/checkout",
];

export const GUEST_ONLY_ROUTES = [
  "/login",
  "/signup",
  "/forget-password",
  "/reset-password",
];
