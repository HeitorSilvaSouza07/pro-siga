import sql from 'mssql';

const config: sql.config = {
  user: 'sa',
  password: 'Alfafoto01',
  server: 'localhost',
  database: 'ProSigaDevDb',
  port: 1434, // Porta identificada anteriormente
  options: {
    encrypt: false, // Para conexão local
    trustServerCertificate: true
  }
};

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
