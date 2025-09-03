import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  MaterialsTable,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  //noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.totalamount, customers.name, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.name
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  //noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN totalamount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN totalamount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices1(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(query)
  console.log(offset)

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.receipt,
        invoices.patientcode,
        invoices.serialno,
        invoices.modelname,
        invoices.quantity,
        invoices.paidamount,
        invoices.totalamount,
        invoices.referred,
        invoices.patientcode,
        invoices.details,
        invoices.mode,
        invoices.status,
        customers.name        
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.name
      WHERE
        customers.name ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log('query raise'+ query)
  console.log('offset val:'+ offset)

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.receipt,
        invoices.patientcode,
        invoices.serialno,
        invoices.modelname,
        invoices.quantity,
        invoices.paidamount,
        invoices.totalamount,
        invoices.referred,
        invoices.patientcode,
        invoices.details,
        invoices.mode,
        invoices.status,
        customers.name        
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.name
      WHERE
        customers.name ILIKE ${`%${query}%`} OR        
        invoices.totalamount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  //noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.name
    WHERE
      customers.name ILIKE ${`%${query}%`} OR      
      invoices.paidamount::text ILIKE ${`%${query}%`} OR
      invoices.totalamount::text ILIKE ${`%${query}%`} OR  
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.mode::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log('Total pages for invoices:', totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchCustomersPages(query: string) {
  //noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.name
    WHERE
      customers.name ILIKE ${`%${query}%`} OR      
      invoices.paidamount::text ILIKE ${`%${query}%`} OR
      invoices.totalamount::text ILIKE ${`%${query}%`} OR  
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.mode::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log('Total pages for customers:', totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  //noStore();
  console.log('fetchInvoiceById:'+ id)
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.paidamount,
        invoices.totalamount,
        invoices.mode,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        customer_id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomersnew(query: string) {
  //noStore();
  console.log('----')
  console.log(query)
  console.log('--nn--')
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.customer_id,
		  customers.name,
		  customers.contact,
		  customers.email,
      customers.age,
      customers.gender
		FROM customers
	  `;

    console.log('fetchFilteredCustomers')
    console.log(data)
    console.log('----')
    console.log(query)

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: customer.total_pending,
      total_paid: customer.total_paid,
    }));

    console.log('customers:'+customers)

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchFilteredCustomersold(query: string) {
  //noStore();
  console.log('----')
  console.log(query)
  console.log('--nn--')
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.customer_id,
		  customers.name,
		  customers.contact,
		  customers.email,
      customers.age,
      customers.sex,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.totalamount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.totalamount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.customer_id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.customer_id, customers.name, customers.contact, customers.email
		ORDER BY customers.name ASC
	  `;

    console.log('fetchFilteredCustomers')
    console.log(data)
    console.log('----')
    console.log(query)

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  //noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const customers = await sql<CustomersTableType>`
      SELECT
        customers.customer_id,
        customers.name,
        customers.contact,
        customers.email,
        customers.age,
        customers.gender,
        customers.paidamount,
        customers.totalamount
      FROM customers      
      ORDER BY customers.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return customers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer id.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchMaterialsPages(query: string) {
  //noStore();
  try {
    const count = await sql`SELECT COUNT(*) FROM materials    
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of materials.');
  }
}



export async function fetchFilteredMaterials(
  query: string,
  currentPage: number,
) {
  //noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const materials = await sql<MaterialsTable>`
      SELECT
        materials.material_id,
        materials.material_sn,
        materials.material_model,
        materials.material_vn,
        materials.material_quantity,
        materials.material_price
      FROM materials      
      ORDER BY materials.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return materials.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch material id.');
  }
}
