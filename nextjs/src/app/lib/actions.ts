'use server';
import { z } from 'zod';
import { getSQLClient } from '../db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }


    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    // Test it out:


    const client = await getSQLClient();
    try {
        await client.query(`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES ($1, $2, $3, $4)`, [customerId, amountInCents, status, date])
        client.end();
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    try {
        const client = await getSQLClient();
        await client.query(`
      UPDATE invoices
      SET customer_id = $1, amount = $2, status = $3
      WHERE id = ${id}
    `, [customerId, amountInCents, status, id])

        client.end();
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


export async function deleteInvoice(id: string) {

    try {
        const client = await getSQLClient();
        await client.query(`DELETE FROM invoices WHERE id = $1`, [id]);
        client.end();
        revalidatePath('/dashboard/invoices');
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice' };
    }
}