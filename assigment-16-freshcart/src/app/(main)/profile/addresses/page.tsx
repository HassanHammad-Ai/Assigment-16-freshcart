"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconLoader2, IconMapPin, IconPhone, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { AddressFormValues, addressSchema } from "@/features/addresses/schemas/address.schema";
import { useAddAddress, useAddresses, useRemoveAddress } from "@/features/addresses/hooks/useAddresses";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

export default function AddressesPage() {
  const { data, isPending } = useAddresses();
  const addAddress = useAddAddress();
  const removeAddress = useRemoveAddress();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema) });

  const close = () => {
    setShowForm(false);
    reset();
  };

  const onSubmit = (values: AddressFormValues) => {
    addAddress.mutate(values, { onSuccess: close });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500">Manage your delivery addresses</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <IconPlus size={16} />
          Add Address
        </button>
      </div>

      {isPending ? (
        <Spinner />
      ) : !data || data.results === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100">
          <EmptyState
            icon={<IconMapPin size={32} stroke={1.5} />}
            title="No saved addresses"
            description="Add an address to speed up checkout next time."
          />
        </div>
      ) : (
        <div className="space-y-3">
          {data.data.map((addr) => (
            <div
              key={addr._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
            >
              <span className="size-10 shrink-0 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                <IconMapPin size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{addr.name}</p>
                <p className="text-sm text-gray-600">{addr.details}</p>
                <p className="text-sm text-gray-500 mt-0.5">{addr.city}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                  <IconPhone size={14} /> {addr.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeAddress.mutate(addr._id)}
                disabled={removeAddress.isPending}
                className="size-9 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center disabled:opacity-50"
                aria-label="Remove address"
              >
                <IconTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add New Address</h3>
              <button type="button" onClick={close} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                <IconX size={20} />
              </button>
            </div>

            <div>
              <label htmlFor="name" className={labelClass}>Address Label</label>
              <input id="name" className={inputClass} placeholder="Home, Work..." {...register("name")} />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>City</label>
              <input id="city" className={inputClass} placeholder="Cairo" {...register("city")} />
              {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label htmlFor="details" className={labelClass}>Address Details</label>
              <input id="details" className={inputClass} placeholder="Street, building, apartment" {...register("details")} />
              {errors.details && <p className="text-sm text-red-600 mt-1">{errors.details.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input id="phone" className={inputClass} placeholder="01012345678" {...register("phone")} />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={close}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addAddress.isPending}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
              >
                {addAddress.isPending && <IconLoader2 className="animate-spin" size={16} />}
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
