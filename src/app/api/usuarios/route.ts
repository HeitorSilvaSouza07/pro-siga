//api simples para funcionamento da aplicação na parte de usuarios 
import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

//função para buscar todos os usuarios
export async function GET() {
  try {
    const pool = await getDb();
    const result = await pool.query(
      `SELECT iduser AS "idUser", nameuser AS "nameUser", materiauser AS "materiaUser"
       FROM tblusuarios
       ORDER BY iduser ASC`
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//função para criar um usuario
export async function POST(req: Request) {
  try {
    const { nameUser, materiaUser } = await req.json();
    const pool = await getDb();
    
    await pool.query(
      'INSERT INTO tblUsuarios (nameUser, materiaUser) VALUES ($1, $2)',
      [nameUser, materiaUser]
    );
    
    return NextResponse.json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
