import Image from 'next/image';
import { UpdateCustomers, DeleteCustomers } from '@/src/app/ui/customers/buttons';
import MaterialStatus from '@/src/app/ui/materials/status';
import { formatDateToLocal, formatCurrency } from '@/src/app/lib/utils';
import { fetchFilteredCustomers } from '@/src/app/lib/data';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);
  console.log('customers table row:' + customers)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((customer) => (
              <div
                key={customer.customer_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">                      
                      <p>{customer.name}</p>
                    </div>
                    
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{customer.name}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCustomers id={customer.customer_id} />
                    <DeleteCustomers id={customer.customer_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Contact Number
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Email ID
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Age
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Gender
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Paid Amount
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Total Amount
                </th>                
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer) => (
                <tr
                  key={customer.customer_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.contact}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.email}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.age}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.gender}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.paidamount}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{customer.totalamount}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCustomers id={customer.customer_id} />
                      <DeleteCustomers id={customer.customer_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
