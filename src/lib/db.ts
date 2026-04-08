import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

let pool: sql.ConnectionPool | null = null;

export async function getDb() {
  if (pool) return pool;
  
  try {
    pool = await new sql.ConnectionPool(config).connect();
    return pool;
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    throw err;
  }
}
