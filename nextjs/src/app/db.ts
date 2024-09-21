import { Client, Pool } from "pg";




export const postPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:  process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

export const postClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database:  process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})
await postClient.connect();
