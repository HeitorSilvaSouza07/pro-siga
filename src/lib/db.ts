import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

export async function getDb() {
  try {
    // A simple query to test the connection
    await pool.query('SELECT NOW()');
    console.log(`Conectado ao banco PostgreSQL no host: ${process.env.DB_SERVER} porta: ${process.env.DB_PORT || 5432}`);
    return pool;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erro ao conectar no banco de dados:', err.message);
      throw err;
    }
    console.error('Erro ao conectar no banco de dados: Unknown error');
    throw new Error('Unknown database connection error');
  }
}
