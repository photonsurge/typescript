
import bcrypt from 'bcrypt';

import { invoices, customers, users, revenue } from '../lib/placeholder-data';
import { getSQLClient } from '@/app/db';
import { Client } from 'pg';


async function seedUsers(client: Client) {

  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await client.query(`DROP TABLE IF EXISTS users;`)
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );`);





  return users.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4);`
    const values = [user.id, user.name, user.email, hashedPassword]
    const sd = await client.query(query, values);
    return sd
  });
}

async function seedInvoices(client: Client) {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await client.query(`DROP TABLE IF EXISTS invoices;`)
  await client.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `);

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.query(`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES ($1, $2, $3, $4);
      `, [invoice.customer_id, invoice.amount, invoice.status, invoice.date]),
    ),
  );

  return insertedInvoices;
}

async function seedCustomers(client: Client) {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await client.query(`DROP TABLE IF EXISTS customers;`)
  await client.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `);

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.query(`
        INSERT INTO customers (id, name, email, image_url)
        VALUES ($1, $2, $3, $4);
      `, [customer.id, customer.name, customer.email, customer.image_url]),
    ),
  );

  return insertedCustomers;
}

async function seedRevenue(client: Client) {
  await client.query(`DROP TABLE IF EXISTS revenue;`)
  await client.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `);

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.query(`
        INSERT INTO revenue (month, revenue)
        VALUES ($1, $2)
        ON CONFLICT (month) DO NOTHING;
      `, [rev.month, rev.revenue]),
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  const client: Client = await getSQLClient();
  try {


    console.log("en english")
    await client.query(`BEGIN`);
    await seedUsers(client);
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);
    await client.query(`COMMIT`);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.log(error)
    await client.query(`ROLLBACK`);
    return Response.json({ error }, { status: 500 });
  }
}
