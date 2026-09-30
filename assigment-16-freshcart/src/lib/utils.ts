import { CURRENCY, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "./constants";

/** Formats a number as an EGP price string, e.g. 1234 -> "1,234 EGP" */
export function formatPrice(value: number | undefined | null): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return `0 ${CURRENCY}`;
  }
  return `${new Intl.NumberFormat("en-US").format(value)} ${CURRENCY}`;
}

/** Returns the discount percentage between an original and a discounted price. */
export function calcDiscountPercent(
  price: number,
  priceAfterDiscount?: number
): number | null {
  if (!priceAfterDiscount || priceAfterDiscount >= price) return null;
  return Math.round(((price - priceAfterDiscount) / price) * 100);
}

/** Truncates text to a maximum number of words, appending an ellipsis. */
export function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Computes the shipping fee and grand total for a given subtotal, applying
 * the site-wide free-shipping threshold (orders >= 500 EGP ship free). */
export function calcShipping(subtotal: number): {
  isFree: boolean;
  fee: number;
  total: number;
  amountToFreeShipping: number;
} {
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const fee = isFree ? 0 : STANDARD_SHIPPING_FEE;
  return {
    isFree,
    fee,
    total: subtotal + fee,
    amountToFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  };
}
