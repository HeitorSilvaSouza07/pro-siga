//api simples para funcionamento da aplicação na parte de atividades 
import { NextResponse } from 'next/server';
import { getDb } from '@/src/lib/db';

//função para buscar todas as atividades
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
    const [rows] = await pool.execute(query);
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//função para criar uma atividade
export async function POST(req: Request) {
  try {
    const { idUser, nameAtv, dataEntrega, typeAtv } = await req.json();
    const pool = await getDb();
    
    await pool.execute(`
        INSERT INTO tblAtividades (idUser, nameAtv, dataEntrega, typeAtv) 
        VALUES (?, ?, ?, ?)
      `,
      [idUser, nameAtv, new Date(dataEntrega), typeAtv ? 1 : 0]
    );
    
    return NextResponse.json({ message: 'Atividade criada com sucesso' });
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(err);
  }
}
