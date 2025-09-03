import { fetchCustomers } from '@/src/app/lib/data';
import Form from '@/src/app/ui/customers/create-form';
import Breadcrumbs from '@/src/app/ui/customers/breadcrumbs';
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
          { label: 'customers', href: '/dashboard/customers' },
          {
            label: 'Create Customers',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
