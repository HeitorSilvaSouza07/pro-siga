import { NextResponse } from 'next/server';
import { getDb } from '@/src/lib/db';
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await getDb();
    // JOIN para buscar o nome do usuário responsável
    const query = `
      SELECT a.*, u.nameUser 
      FROM tblAtividades a 
      INNER JOIN tblUsuarios u ON a.idUser = u.idUser
      ORDER BY a.dataEntrega ASC
    `;
    const result = await pool.request().query(query);
    return NextResponse.json(result.recordset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { idUser, nameAtv, dataEntrega, typeAtv } = await req.json();
    const pool = await getDb();
    
    await pool.request()
      .input('idUser', sql.Int, idUser)
      .input('nameAtv', sql.VarChar, nameAtv)
      .input('dataEntrega', sql.DateTime, new Date(dataEntrega))
      .input('typeAtv', sql.Bit, typeAtv)
      .query(`
        INSERT INTO tblAtividades (idUser, nameAtv, dataEntrega, typeAtv) 
        VALUES (@idUser, @nameAtv, @dataEntrega, @typeAtv)
      `);
    
    return NextResponse.json({ message: 'Atividade criada com sucesso' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
