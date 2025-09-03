import Pagination from '@/src/app/ui/materials/pagination';
import Search from '@/src/app/ui/search';
import Table from '@/src/app/ui/materials/table';
import { CreateMaterial } from '@/src/app/ui/materials/buttons';
import { lusitana } from '@/src/app/ui/fonts';
import { MaterialsTableSkeleton } from '@/src/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchMaterialsPages } from '@/src/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Materials',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchMaterialsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Material Stock List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search materials..." />
        <CreateMaterial />
      </div>
      <Suspense key={query + currentPage} fallback={<MaterialsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
