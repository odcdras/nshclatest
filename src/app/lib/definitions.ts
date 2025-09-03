// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  customer_id: string;
  name: string;
  email: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  name: string;
  receipt: string;
  patientcode: string;
  serialno: string;
  referred: string;
  details: string;
  vendorname: string;
  modelname: string;
  description: string;
  quantity: number;
  paidamount: number;
  totalamount: number;
  date: string;
  mode: 'cash' | 'others';
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  customer_id: string;
  name: string;
  contact: number;
  email: string;
  age: number;
  gender: string;
  paidamount: number;
  totalamount: number;
};

export type FormattedCustomersTable = {
  customer_id: string;
  name: string;
  contact: number;
  email: string;
  age: number;
  gender: string;
  total_pending: number;
  total_paid: number;
};

export type CustomerField = {
  customer_id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  paidamount: number;
  totalamount: number;
  mode: 'cash' | 'others';
  status: 'pending' | 'paid';
};

export type MaterialField = {
  material_id: string;
  material_mn: string;
};

export type MaterialsTable = {
  material_id: string;
  material_sn: string;
  material_model: string;
  material_vn: string;
  material_quantity: string;
  material_price: string;
  date: string;
};

