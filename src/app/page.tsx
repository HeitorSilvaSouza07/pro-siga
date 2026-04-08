'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [atividades, setAtividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState('day'); // 'day', 'week', 'month'
  const [error, setError] = useState<string | null>(null);

  // Form Usuário
  const [nameUser, setNameUser] = useState('');
  const [materiaUser, setMateriaUser] = useState('');

  // Form Atividade
  const [idUser, setIdUser] = useState('');
  const [nameAtv, setNameAtv] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [typeAtv, setTypeAtv] = useState(0); // 0=atv, 1=prova

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(null);
      const [resU, resA] = await Promise.all([
        fetch('/api/usuarios'),
        fetch('/api/atividades')
      ]);

      const dataU = await resU.json();
      const dataA = await resA.json();

      if (!resU.ok) {
        setError(`Erro Usuários: ${dataU.error || 'Erro desconhecido'}`);
        return;
      }
      if (!resA.ok) {
        setError(`Erro Atividades: ${dataA.error || 'Erro desconhecido'}`);
        return;
      }

      setUsuarios(Array.isArray(dataU) ? dataU : []);
      setAtividades(Array.isArray(dataA) ? dataA : []);
    } catch (err: any) {
      console.error('Erro ao buscar dados:', err);
      setError('Falha crítica na conexão com a API local.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameUser, materiaUser })
      });
      const result = await res.json();
      if (res.ok) {
        setNameUser('');
        setMateriaUser('');
        fetchData();
      } else {
        alert('Erro: ' + (result.error || 'Falha ao criar usuário'));
      }
    } catch (err) {
      alert('Erro de conexão ao criar usuário');
    }
  };

  const handleCreateAtividade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/atividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: Number(idUser), nameAtv, dataEntrega, typeAtv: Number(typeAtv) })
      });
      const result = await res.json();
      if (res.ok) {
        setNameAtv('');
        setDataEntrega('');
        setIdUser('');
        fetchData();
      } else {
        alert('Erro: ' + (result.error || 'Falha ao criar atividade'));
      }
    } catch (err) {
      alert('Erro de conexão ao criar atividade');
    }
  };

  const isCurrentDay = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isCurrentWeek = (date: Date) => {
    const today = new Date();
    // Ajuste simples de semana (domingo a sábado)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return date >= startOfWeek && date <= endOfWeek;
  };

  const isCurrentMonth = (date: Date) => {
    const today = new Date();
    return date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const filteredAtividades = (Array.isArray(atividades) ? atividades : []).filter(atv => {
    const date = new Date(atv.dataEntrega);
    if (filterMode === 'day') return isCurrentDay(date);
    if (filterMode === 'week') return isCurrentWeek(date);
    if (filterMode === 'month') return isCurrentMonth(date);
    return true;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gerenciador ProSiga</h1>

      {error && (
        <div style={{ border: '2px solid red', padding: '10px', color: 'red', marginBottom: '20px' }}>
          <strong>ERRO DE CONEXÃO COM O BANCO:</strong>
          <pre>{error}</pre>
          <button onClick={fetchData}>Tentar Novamente</button>
        </div>
      )}

      <section>
        <h2>Cadastrar Usuário</h2>
        <form onSubmit={handleCreateUsuario}>
          <input placeholder="Nome do Usuário" value={nameUser} onChange={e => setNameUser(e.target.value)} required />
          <input placeholder="Matéria" value={materiaUser} onChange={e => setMateriaUser(e.target.value)} required />
          <button type="submit">Cadastrar</button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Cadastrar Atividade</h2>
        <form onSubmit={handleCreateAtividade}>
          <input placeholder="Descrição/Nome" value={nameAtv} onChange={e => setNameAtv(e.target.value)} required />
          <input type="datetime-local" value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} required />
          <select value={typeAtv} onChange={e => setTypeAtv(Number(e.target.value))}>
            <option value={0}>Atividade</option>
            <option value={1}>Prova</option>
          </select>
          <select value={idUser} onChange={e => setIdUser(e.target.value)} required>
            <option value="">Selecione o Responsável</option>
            {usuarios.map(u => (
              <option key={u.idUser} value={u.idUser}>{u.nameUser}</option>
            ))}
          </select>
          <button type="submit">Cadastrar Atividade</button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Lista de Atividades</h2>
        <p>Visão: 
          <button onClick={() => setFilterMode('day')} style={{ fontWeight: filterMode === 'day' ? 'bold' : 'normal' }}>Dia</button>
          <button onClick={() => setFilterMode('week')} style={{ fontWeight: filterMode === 'week' ? 'bold' : 'normal' }}>Semana</button>
          <button onClick={() => setFilterMode('month')} style={{ fontWeight: filterMode === 'month' ? 'bold' : 'normal' }}>Mês</button>
        </p>

        {loading ? <p>Carregando...</p> : (
          <table border={1} style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Nome/Descrição</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {filteredAtividades.length === 0 ? (
                <tr><td colSpan={4}>Nenhuma atividade encontrada para este período.</td></tr>
              ) : filteredAtividades.map(atv => (
                <tr key={atv.idAtv}>
                  <td>{atv.nameAtv}</td>
                  <td>{new Date(atv.dataEntrega).toLocaleString()}</td>
                  <td>{atv.typeAtv ? 'Prova' : 'Atividade'}</td>
                  <td>{atv.nameUser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
