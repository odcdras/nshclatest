'use client';

import { MaterialField } from '@/src/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/src/app/ui/button';
import { createMaterial } from '@/src/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ customers }: { customers: MaterialField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMaterial, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">        
        {/* Material SN */}
        <div className="mb-4">
          <label htmlFor="materialsn" className="mb-2 block text-sm font-medium">
            Serial Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="materialsn"
                name="materialsn"
                type="string"
                placeholder="Enter material serial number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="materialsn-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="materialsn-error" aria-live="polite" aria-atomic="true">
            {state.errors?.materialsn &&
              state.errors.materialsn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* model name */}
        <div className="mb-4">
          <label htmlFor="modelname" className="mb-2 block text-sm font-medium">
            Model Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="modelname"
                name="modelname"
                type="string"
                placeholder="Enter Model name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="modelname-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="modelname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.materialsn &&
              state.errors.materialsn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        {/* Vendor name */}
        <div className="mb-4">
          <label htmlFor="vendorname" className="mb-2 block text-sm font-medium">
            Vendor name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="vendorname"
                name="vendorname"
                type="string"
                placeholder="Enter Vendor name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="vendorname-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="vendorname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.materialsn &&
              state.errors.materialsn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="string"
                placeholder="Enter quantity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="quantity-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="quantity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.materialsn &&
              state.errors.materialsn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="string"
                placeholder="Enter Price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.materialsn &&
              state.errors.materialsn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/materials"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Stock</Button>
      </div>
    </form>
  );
}
