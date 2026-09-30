"use client";

import { IconFilter } from "@tabler/icons-react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useBrands } from "@/features/brands/hooks/useBrands";

export interface ShopFiltersState {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-100 pt-5">
      <h4 className="text-sm font-bold text-gray-900 mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function ShopFilters({
  filters,
  onChange,
  onReset,
  hideCategory = false,
  hideBrand = false,
}: {
  filters: ShopFiltersState;
  onChange: (patch: Partial<ShopFiltersState>) => void;
  onReset: () => void;
  hideCategory?: boolean;
  hideBrand?: boolean;
}) {
  const { data: categoriesData, isPending: categoriesPending } = useCategories();
  const { data: brandsData, isPending: brandsPending } = useBrands();

  const radioRow = (name: string, value: string, current: string, label: string, onPick: () => void) => (
    <label key={value || "all"} className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
      <input
        type="radio"
        name={name}
        checked={current === value}
        onChange={onPick}
        className="size-4 accent-primary-600"
      />
      <span className="line-clamp-1">{label}</span>
    </label>
  );

  return (
    <aside className="lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5 lg:sticky lg:top-28">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <IconFilter size={18} className="text-primary-600" />
            Filters
          </h3>
          <button type="button" onClick={onReset} className="text-sm text-primary-600 hover:underline">
            Clear all
          </button>
        </div>

        {!hideCategory && (
          <Group title="Categories">
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {radioRow("category", "", filters.category, "All Categories", () => onChange({ category: "" }))}
              {!categoriesPending &&
                categoriesData?.data?.map((cat) =>
                  radioRow("category", cat._id, filters.category, cat.name, () => onChange({ category: cat._id }))
                )}
            </div>
          </Group>
        )}

        <Group title="Price Range (EGP)">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              placeholder="Min"
              className="form-control w-full text-sm"
              value={filters.minPrice}
              onChange={(e) => onChange({ minPrice: e.target.value })}
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              className="form-control w-full text-sm"
              value={filters.maxPrice}
              onChange={(e) => onChange({ maxPrice: e.target.value })}
            />
          </div>
        </Group>

        {!hideBrand && (
          <Group title="Brands">
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {radioRow("brand", "", filters.brand, "All Brands", () => onChange({ brand: "" }))}
              {!brandsPending &&
                brandsData?.data?.map((brand) =>
                  radioRow("brand", brand._id, filters.brand, brand.name, () => onChange({ brand: brand._id }))
                )}
            </div>
          </Group>
        )}
      </div>
    </aside>
  );
}
