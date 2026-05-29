import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function getDb() {
  try {
    // A simple query to test the connection
    await pool.query('SELECT NOW()');
    console.log(`Conectado ao banco PostgreSQL no Neon com sucesso!`);
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
