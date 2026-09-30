"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import ShopFilters, { ShopFiltersState } from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import Pagination from "@/components/ui/Pagination";
import { useProducts } from "../hooks/useProducts";
import { ProductQueryParams } from "../types/product.types";

const emptyFilters: ShopFiltersState = {
  category: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
};

export default function ProductListing({
  title,
  lockedCategory,
  lockedBrand,
  syncUrl = false,
}: {
  title?: string;
  lockedCategory?: string;
  lockedBrand?: string;
  /** When true, filters/page/keyword are reflected in the URL (used by /shop and /search). */
  syncUrl?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const readFiltersFromUrl = (): ShopFiltersState => ({
    category: lockedCategory ?? searchParams.get("category") ?? "",
    brand: lockedBrand ?? searchParams.get("brand") ?? "",
    sort: searchParams.get("sort") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
  });

  const [localFilters, setLocalFilters] = useState<ShopFiltersState>(readFiltersFromUrl);
  const [localPage, setLocalPage] = useState(Number(searchParams.get("page")) || 1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");

  // useState's initializer only runs on mount, so if the user searches again
  // (or clicks a different category link) while this same component instance
  // is already showing -- e.g. from the navbar while already on /search --
  // the URL changes but our local state wouldn't otherwise notice. Re-sync
  // when the query string changes, using React's "adjust state during render"
  // pattern (rather than an effect) to avoid an extra cascading render.
  const [syncedParams, setSyncedParams] = useState(searchParamsString);
  if (syncedParams !== searchParamsString) {
    setSyncedParams(searchParamsString);
    setLocalFilters(readFiltersFromUrl());
    setLocalPage(Number(searchParams.get("page")) || 1);
    setKeyword(searchParams.get("keyword") ?? "");
  }

  const filters = useMemo(
    () =>
      lockedCategory
        ? { ...localFilters, category: lockedCategory }
        : lockedBrand
        ? { ...localFilters, brand: lockedBrand }
        : localFilters,
    [localFilters, lockedCategory, lockedBrand]
  );

  const updateUrl = (patch: Record<string, string | number>) => {
    if (!syncUrl) return;
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (patch: Partial<ShopFiltersState>) => {
    setLocalFilters((prev) => ({ ...prev, ...patch }));
    setLocalPage(1);
    updateUrl({ ...patch, page: 1 });
  };

  const handleReset = () => {
    setLocalFilters(emptyFilters);
    setKeyword("");
    setLocalPage(1);
    if (syncUrl) router.push("?", { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setLocalPage(page);
    updateUrl({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const queryParams: ProductQueryParams = useMemo(() => {
    const params: ProductQueryParams = { page: localPage, limit: 12 };
    if (filters.category) params.category = filters.category;
    if (filters.brand) params.brand = filters.brand;
    if (filters.sort) params.sort = filters.sort;
    if (filters.minPrice) params["price[gte]"] = Number(filters.minPrice);
    if (filters.maxPrice) params["price[lte]"] = Number(filters.maxPrice);
    if (keyword) params.keyword = keyword;
    return params;
  }, [filters, keyword, localPage]);

  const { data, isPending, isError } = useProducts(queryParams);

  return (
    <div className="bg-gray-50/60">
      <div className="container py-8">
        <nav className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{title ?? "Products"}</span>
        </nav>

        {title && <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">{title}</h1>}

        {syncUrl && (
          <form
            className="relative mb-6 max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              setLocalPage(1);
              updateUrl({ keyword, page: 1 });
            }}
          >
            <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              placeholder="Search for products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <ShopFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            hideCategory={Boolean(lockedCategory)}
            hideBrand={Boolean(lockedBrand)}
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <p className="text-sm text-gray-500">
                {data ? (
                  <>
                    Showing <span className="font-semibold text-gray-800">{data.data.length}</span> products
                  </>
                ) : (
                  "Loading products..."
                )}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="sort" className="text-gray-500">Sort by</label>
                <select
                  id="sort"
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange({ sort: e.target.value })}
                >
                  <option value="">Default</option>
                  <option value="-createdAt">Newest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-sold">Best Selling</option>
                  <option value="-ratingsAverage">Top Rated</option>
                </select>
              </div>
            </div>

            <ProductGrid
              products={data?.data}
              isPending={isPending}
              isError={isError}
              emptyMessage={
                lockedCategory
                  ? "There are no products in this category yet."
                  : lockedBrand
                  ? "There are no products from this brand yet."
                  : keyword
                  ? `No products match "${keyword}". Try a different search.`
                  : "No products found. Try adjusting your filters."
              }
            />
            {data && (
              <Pagination
                page={data.metadata.currentPage}
                totalPages={data.metadata.numberOfPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
