import { Client, Pool, QueryResultRow } from "pg";

const postPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})
export  async function poolQuery<T>(query:string, data:any[]=[] ){
 // interface iT extends QueryResultRow{};
  type TT = {rows:T[]}
  const result = await postPool.query(query, data);
  return {rows:result.rows} as TT
}

export const getSQLClient = async ():Promise<Client> => {
  const postClient = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
  })
  await postClient.connect();
  return postClient
}

export default postPool;