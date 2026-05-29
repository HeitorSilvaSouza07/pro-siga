import sql from 'mssql'

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT)
    };

let pool: Pool | null = null;

export async function getDb() {
  if (pool) return pool;
  
  try {
    console.log(
      process.env.DATABASE_URL
        ? 'Tentando conectar ao banco PostgreSQL via DATABASE_URL'
        : `Tentando conectar ao banco PostgreSQL no host: ${process.env.DB_SERVER} porta: ${process.env.DB_PORT}`
    );
    pool = new Pool(poolConfig);
    return pool;
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    throw err;
  }
}
