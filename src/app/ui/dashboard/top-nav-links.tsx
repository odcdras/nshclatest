'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', 
    href: '/', },
  {
    name: 'Test',
    href: '/dashboard/invoices',
  },
  { name: 'Customers', 
    href: '/dashboard/newcustomer',
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex grow items-stretch justify-start gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >            
            <p className=" md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
