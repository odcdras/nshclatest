import Form from '@/src/app/ui/customers/edit-form';
import Breadcrumbs from '@/src/app/ui/customers/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/src/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NSHC',
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
          { label: 'Materials Stock List', href: '/dashboard/customers' },
          {
            label: 'Edit Customers',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
