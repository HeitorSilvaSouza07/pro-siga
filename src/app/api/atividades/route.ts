//api simples para funcionamento da aplicação na parte de atividades
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

//função para buscar todas as atividades
export async function GET() {
  try {
    const pool = await getDb();
    // JOIN para buscar o nome do usuário responsável
    const query = `
      SELECT
        a.idatv AS "idAtv",
        a.iduser AS "idUser",
        a.nameatv AS "nameAtv",
        a.dataentrega AS "dataEntrega",
        a.typeatv AS "typeAtv",
        a.descatv AS "descAtv",
        u.nameuser AS "nameUser"
      FROM tblatividades a
      INNER JOIN tblusuarios u ON a.iduser = u.iduser
      ORDER BY a.dataentrega ASC
    `;
    const [rows] = await pool.execute(query);
    return NextResponse.json(rows);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error('Erro desconhecido:', err);
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
