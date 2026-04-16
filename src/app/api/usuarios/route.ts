//api simples para funcionamento da aplicação na parte de usuarios 
import { NextResponse } from 'next/server';
import { getDb } from '@/src/lib/db';

//função para buscar todos os usuarios
export async function GET() {
  try {
    const pool = await getDb();
    const [rows] = await pool.execute('SELECT * FROM tblUsuarios');
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//função para criar um usuario
export async function POST(req: Request) {
  try {
    const { nameUser, materiaUser } = await req.json();
    const pool = await getDb();
    
    await pool.execute(
      'INSERT INTO tblUsuarios (nameUser, materiaUser) VALUES (?, ?)',
      [nameUser, materiaUser]
    );
    
    return NextResponse.json({ message: 'Usuário criado com sucesso' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
