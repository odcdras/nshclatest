'use client';

import { CustomerField } from '@/src/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/src/app/ui/button';
import { createInvoice } from '@/src/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);
  console.log('customers state:', customers);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customers
              </option>
              {customers.map((customer) => (
                <option key={customer.name} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* receipt */}
        <div className="mb-4">
          <label htmlFor="receipt" className="mb-2 block text-sm font-medium">
            Receipt Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="receipt"
                name="receipt"
                type="string"
                placeholder="Enter receipt number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="receipt-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="receipt-error" aria-live="polite" aria-atomic="true">
            {state.errors?.receipt &&
              state.errors.receipt.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        {/* patiencode */}
        <div className="mb-4">
          <label htmlFor="patientcode" className="mb-2 block text-sm font-medium">
            Patient Code
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="patientcode"
                name="patientcode"
                type="string"
                placeholder="Enter patient code"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="patientcode-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="patientcode-error" aria-live="polite" aria-atomic="true">
            {state.errors?.patientcode &&
              state.errors.patientcode.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* serialno */}
        <div className="mb-4">
          <label htmlFor="serialno" className="mb-2 block text-sm font-medium">
            serialno
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="serialno"
                name="serialno"
                type="string"
                placeholder="Enter serial number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="serialno-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="serialno-error" aria-live="polite" aria-atomic="true">
            {state.errors?.serialno &&
              state.errors.serialno.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* referred */}
        <div className="mb-4">
          <label htmlFor="referred" className="mb-2 block text-sm font-medium">
            Referred
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="referred"
                name="referred"
                type="string"
                placeholder="Enter referred details"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="referred-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="referred-error" aria-live="polite" aria-atomic="true">
            {state.errors?.referred &&
              state.errors.referred.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* details */}
        <div className="mb-4">
          <label htmlFor="details" className="mb-2 block text-sm font-medium">
            Details
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="details"
                name="details"
                type="string"
                placeholder="Enter details"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="details-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="details-error" aria-live="polite" aria-atomic="true">
            {state.errors?.details &&
              state.errors.details.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* vendorname */}
        <div className="mb-4">
          <label htmlFor="vendorname" className="mb-2 block text-sm font-medium">
            vendor name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="vendorname"
                name="vendorname"
                type="string"
                placeholder="Enter vendor name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="vendorname-error"
              />
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="vendorname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.vendorname &&
              state.errors.vendorname.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* modelname */}
        <div className="mb-4">
          <label htmlFor="patientcode" className="mb-2 block text-sm font-medium">
            Model Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="modelname"
                name="modelname"
                type="string"
                placeholder="Enter model name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="modelname-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="modelname-error" aria-live="polite" aria-atomic="true">
            {state.errors?.modelname &&
              state.errors.modelname.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                placeholder="Enter description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            quantity
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
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="quantity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.quantity &&
              state.errors.quantity.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Paid Amount */}
        <div className="mb-4">
          <label htmlFor="paidamount" className="mb-2 block text-sm font-medium">
            Enter Paid amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="paidamount"
                name="paidamount"
                type="number"
                placeholder="Enter Paid amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="paidamount-error"
              />
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="paidamount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.paidamount &&
              state.errors.paidamount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="totalamount" className="mb-2 block text-sm font-medium">
            Enter Invoice amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="totalamount"
                name="totalamount"
                type="number"
                placeholder="Enter Total amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="totalamount-error"
              />
              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="totalamount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.totalamount &&
              state.errors.totalamount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Payment Mode Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Payment Mode status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="cash"
                  name="mode"
                  type="radio"
                  value="cash"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="cash"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  cash <CurrencyRupeeIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Others"
                  name="mode"
                  type="radio"
                  value="Others"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Others"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Others <CurrencyRupeeIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="mode-error" aria-live="polite" aria-atomic="true">
            {state.errors?.mode &&
              state.errors.mode.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
