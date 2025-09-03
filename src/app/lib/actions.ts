'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from './../../../auth';
import { AuthError } from 'next-auth';
import { log } from 'console';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({invalid_type_error: 'Please select a customer.',}),
  receipt: z.string({invalid_type_error: 'Please select a receipt.',}),
  patientcode: z.string({invalid_type_error: 'Please select a receipt.',}),
  serialno: z.string({invalid_type_error: 'Please select a receipt.',}),
  referred: z.string({invalid_type_error: 'Please select a receipt.',}),
  details: z.string({invalid_type_error: 'Please select a receipt.',}),
  vendorname: z.string({invalid_type_error: 'Please select a receipt.',}),
  description: z.string({invalid_type_error: 'Please select a receipt.',}),
  modelname: z.string({invalid_type_error: 'Please select a modelname.',}),
  quantity: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),  
  paidamount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  totalamount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  mode: z.enum(['cash', 'others'], {invalid_type_error: 'Please select an mode of payment.',}),
  status: z.enum(['pending', 'paid'], {invalid_type_error: 'Please select an invoice status.',}),
  date: z.string(),
});

const FormUpdateSchema = z.object({
  customerId: z.string({invalid_type_error: 'Please select a customer.',}),
  paidamount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  totalamount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  mode: z.enum(['cash', 'others'], {invalid_type_error: 'Please select an mode of payment.',}),
  status: z.enum(['pending', 'paid'], {invalid_type_error: 'Please select an invoice status.',}),
});

const FormSchemaCustomer = z.object({
  id: z.string(),
  name: z.string({invalid_type_error: 'Please select a customer.',}),
  contact: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  email: z.string({invalid_type_error: 'Please select an invoice status.',}),
  age: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  gender: z.string({invalid_type_error: 'Please select a customer.',}),
  paidamount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  totalamount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  date: z.string(),
});

const FormSchemaMaterial = z.object({
  id: z.string(),
  materialsn: z.string({invalid_type_error: 'Please Enter Material Serial Number.',}),
  modelname: z.string(),
  vendorname: z.string(),
  quantity: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),  
  date: z.string(),
});

const FormUpdateSchemaMaterial = z.object({
  material_id: z.string(),
  material_sn: z.string({invalid_type_error: 'Please Enter Material Serial Number.',}),
  material_mn: z.string(),
  material_vn: z.string(),
  material_quantity: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
  material_price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),  
  date: z.string(),
});


const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormUpdateSchema.omit({  });

const CreateCustomer = FormSchemaCustomer.omit({ date: true, id: true });

const CreateMaterial = FormSchemaMaterial.omit({ id: true, date: true });
const UpdateMaterials = FormUpdateSchemaMaterial.omit({ material_id: true, date: true });

// This is temporary
export type State = {
  errors?: {
    customerId?: string[];
    receipt?: string[];
    patientcode?: string[];
    serialno?: string[];
    referred?: string[];
    details?: string[];
    vendorname?: string[];
    modelname?: string[];
    description?: string[];
    quantity?: string[];
    paidamount?: string[];
    totalamount?: string[];
    mode?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type Stateupdate = {
  errors?: {
    customerId?: string[];
    receipt?: string[];
    patientcode?: string[];
    serialno?: string[];
    referred?: string[];
    details?: string[];
    vendorname?: string[];
    modelname?: string[];
    description?: string[];
    quantity?: string[];
    paidamount?: string[];
    totalamount?: string[];
    mode?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateCustomer = {
  errors?: {
    name?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateMaterial = {
  errors?: {
    materialsn?: string[];
    vendorname?: string[];
    modelname?: string[];    
    quantity?: string[];
    price?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  console.log('createInvoice customerId:'+formData.get('customerId'))
  console.log('createInvoice receipt:'+formData.get('receipt'))
  console.log('createInvoice patientcode:'+formData.get('patientcode'))
  console.log('createInvoice serialno:'+formData.get('serialno'))
  console.log('createInvoice referred:'+formData.get('referred'))
  console.log('createInvoice details:'+formData.get('details'))
  console.log('createInvoice vendorname:'+formData.get('vendorname'))
  console.log('createInvoice modelname:'+formData.get('modelname'))
  console.log('createInvoice description:'+formData.get('description'))
  console.log('createInvoice quantity:'+formData.get('quantity'))
  console.log('createInvoice paidamount:'+formData.get('paidamount'))
  console.log('createInvoice totalamount:'+formData.get('totalamount'))
  console.log('createInvoice mode:'+formData.get('mode'))
  console.log('createInvoice status:'+formData.get('status'))

  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    receipt: formData.get('receipt'),
    patientcode: formData.get('patientcode'),
    serialno: formData.get('serialno'),
    referred: formData.get('referred'),
    details: formData.get('details'),
    vendorname: formData.get('vendorname'),
    description: formData.get('description'),
    modelname: formData.get('modelname'),
    quantity: formData.get('quantity'),
    paidamount: formData.get('paidamount'),
    totalamount: formData.get('totalamount'),
    mode: formData.get('mode'),
    status: formData.get('status'),
  });

  console.log('validatedFields:'+ validatedFields)
  console.log('validatedFields:'+ validatedFields.data)
  console.log('validatedFields:'+ validatedFields.success)
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const {customerId, receipt, modelname, quantity, paidamount, totalamount, mode, status } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  console.log(customerId)
  console.log(date)

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, receipt, modelname, quantity, paidamount, totalamount, mode, status, date)
      VALUES (${customerId}, ${receipt}, ${modelname}, ${quantity}, ${paidamount}, ${totalamount}, ${mode}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
      
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: Stateupdate,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    paidamount: formData.get('paidamount'),
    totalamount: formData.get('invoiceamount'),
    mode: formData.get('mode'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, paidamount, totalamount, mode, status } = validatedFields.data;
  //const customerId = formData.get('customerId');

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, 
          paidamount = ${paidamount}, 
          totalamount = ${totalamount},
          mode = ${mode}, 
          status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('authenticate:', formData)
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('credentials error'+ error.type);
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createCustomer(prevState: StateCustomer, formData: FormData) {
  console.log('createCustomer name:'+formData.get('name'))
  console.log('createCustomer contact:'+formData.get('contact'))
  console.log('createCustomer email:'+formData.get('email'))
  console.log('createCustomer age:'+formData.get('age'))
  console.log('createCustomer gender:'+formData.get('gender'))
  console.log('createCustomer paidamount:'+formData.get('paidamount'))
  console.log('createCustomer totalamount:'+formData.get('totalamount'))

  // Validate form fields using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    contact: formData.get('contact'),
    email: formData.get('email'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    paidamount: formData.get('paidamount'),
    totalamount: formData.get('totalamount')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer data.',
    };
  }

  // Prepare data for insertion into the database
  const { name, contact, email, age, gender, paidamount, totalamount} = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO customers (name, contact, email, age, gender, paidamount, totalamount, date)
      VALUES (${name}, ${contact}, ${email}, ${age}, ${gender}, ${paidamount}, ${totalamount}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    log(error)
    return {
      message: 'Database Error: Failed to Create Customer.',
      
    };
  }

  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

//For material Management

export async function createMaterial(prevState: StateMaterial, formData: FormData) {
  // Validate form fields using Zod
  console.log('createMaterial receipt:'+formData.get('materialsn'))
  console.log('createMaterial receipt:'+formData.get('modelname'))
  console.log('createMaterial receipt:'+formData.get('vendorname'))
  console.log('createMaterial receipt:'+formData.get('quantity'))
  console.log('createMaterial price:'+formData.get('price'))

  const validatedFields = CreateMaterial.safeParse({
    materialsn: formData.get('materialsn'),
    modelname: formData.get('modelname'),
    vendorname: formData.get('vendorname'),    
    quantity: formData.get('quantity'),
    price: formData.get('price'),
  });

  console.log('validatedFields:'+ validatedFields)
  console.log('validatedFields:'+ validatedFields.data)
  console.log('validatedFields:'+ validatedFields.success)
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Stock list.',
    };
  }

  // Prepare data for insertion into the database
  const {materialsn, modelname, vendorname, quantity, price } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  console.log(modelname)
  console.log(date)

  // Insert data into the database
  try {
    await sql`
      INSERT INTO materials (material_sn, material_model, material_vn, material_quantity, material_price, date)
      VALUES (${materialsn}, ${modelname},${vendorname},${quantity},${price}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    log(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
      
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/materials');
  redirect('/dashboard/materials');
}

export async function updateMaterials(
  id: string,
  prevState: StateMaterial,
  formData: FormData,
) {
  const validatedFields = UpdateMaterials.safeParse({
    materialId: formData.get('materialId'),
    materialserialnumber: formData.get('materialserialnumber'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { material_sn, material_vn } = validatedFields.data;
  //const customerId = formData.get('customerId');

  try {
    await sql`
      UPDATE materials
      SET material_id = ${material_sn}, 
          materialserialnumber = ${material_vn}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/materials');
  redirect('/dashboard/materials');
}

export async function deleteMaterial(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM materials WHERE id = ${id}`;
    revalidatePath('/dashboard/materials');
    return { message: 'Deleted material' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete stock.' };
  }
}