import { fetchCustomers } from '@/src/app/lib/data';
import Form from '@/src/app/ui/materials/create-form';
import Breadcrumbs from '@/src/app/ui/materials/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Stock',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stocks', href: '/dashboard/materials' },
          {
            label: 'Create Stocks',
            href: '/dashboard/materials/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
