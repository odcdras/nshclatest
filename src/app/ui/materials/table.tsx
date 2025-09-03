import Image from 'next/image';
import { UpdateMaterial, DeleteMaterial } from '@/src/app/ui/materials/buttons';
import MaterialStatus from '@/src/app/ui/materials/status';
import { formatDateToLocal, formatCurrency } from '@/src/app/lib/utils';
import { fetchFilteredMaterials } from '@/src/app/lib/data';

export default async function MaterialsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const materials = await fetchFilteredMaterials(query, currentPage);
  console.log('materials table row:' + materials)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {materials?.map((material) => (
              <div
                key={material.material_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">                      
                      <p>{material.material_sn}</p>
                    </div>
                    
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{material.date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMaterial id={material.material_id} />
                    <DeleteMaterial id={material.material_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Serial Number
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Model Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Vendor Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Price
                </th>                
              </tr>
            </thead>
            <tbody className="bg-white">
              {materials?.map((material) => (
                <tr
                  key={material.material_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{material.material_sn}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{material.material_model}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{material.material_vn}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{material.material_quantity}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{material.material_price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateMaterial id={material.material_id} />
                      <DeleteMaterial id={material.material_id} />
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
