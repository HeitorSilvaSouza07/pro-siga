import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
};

let pool: mysql.Pool | null = null;

export async function getDb() {
  if (pool) return pool;
  
  try {
    console.log(`Tentando conectar ao banco MySQL no host: ${config.host} porta: ${config.port}`);
    pool = mysql.createPool(config);
    return pool;
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    throw err;
  }
}
