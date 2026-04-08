import { NextResponse } from 'next/server';
import { getDb } from '@/src/lib/db';
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await getDb();
    const result = await pool.request().query('SELECT * FROM tblUsuarios');
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nameUser, materiaUser } = await req.json();
    const pool = await getDb();
    await pool.request()
      .input('nameUser', sql.VarChar, nameUser)
      .input('materiaUser', sql.VarChar, materiaUser)
      .query('INSERT INTO tblUsuarios (nameUser, materiaUser) VALUES (@nameUser, @materiaUser)');
    
    return NextResponse.json({ message: 'Usuário criado com sucesso' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
