import Form from '@/src/app/ui/materials/edit-form';
import Breadcrumbs from '@/src/app/ui/materials/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/src/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Material stock',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Materials Stock List', href: '/dashboard/materials' },
          {
            label: 'Edit Material',
            href: `/dashboard/materials/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
