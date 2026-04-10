import sql from 'mssql'


//configuração de conexão com o banco de dados, crie o banco com o 
//script do db que está na lib e faça a conexão com base na sua maquina 
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

//delcara uma variavel para armazenar a conexão com o banco 
let pool: sql.ConnectionPool | null = null;

//função para conectar com o banco de dados
export async function getDb() {
  if (pool) return pool;
  
  //tenta conectar com o banco de dados, se der erro retorna err
  try {
    pool = await new sql.ConnectionPool(config).connect();
    return pool;
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    throw err;
  }
}
