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
    <div>
      <div className='flex justify-center font-mono'>
        <h1 className='text-purple-800 text-3xl font-extrabold'>Pro</h1>
        <h1 className='text-purple-400 text-3xl font-bold'>Siga</h1>
      </div>
      <h2 className='font-bold text-purple-600 flex justify-center '>Atividades | Provas | Organização</h2>

      <div className='flex justify-center mt-2'>
      {error && (
        <div className='bg-red-300 rounded-lg p-5 w-[80%] h-auto '>
          <strong>ERRO DE CONEXÃO COM O BANCO:</strong>
          <pre>{error}</pre>
          <button onClick={fetchData} >Tentar Novamente</button>
        </div>
      )}
      </div>
      <div className='flex justify-center gap-5 mt-5'>
        <section className='bg-purple-300 w-[45%] py-6 rounded-lg  flex flex-col align-center'>
          <h2 className='font-bold text-purple-600 flex justify-center text-2xl font-bold'>Cadastrar Usuário</h2>
          <form onSubmit={handleCreateUsuario} className='flex flex-col items-center w-full'>
            <input className='border border-purple-600 bg-purple-200 rounded-lg p-2 w-[80%] mt-2 outline-none focus:ring-2 focus:ring-purple-600' placeholder="Nome do Usuário" value={nameUser} onChange={e => setNameUser(e.target.value)} required />
            <input className='border border-purple-600 bg-purple-200 rounded-lg p-2 w-[80%] mt-2 outline-none focus:ring-2 focus:ring-purple-600' placeholder="Matéria" value={materiaUser} onChange={e => setMateriaUser(e.target.value)} required />
            <button type="submit" className='bg-purple-600 text-white p-2 rounded-lg w-[50%] mt-4 transition-all duration-300 hover:bg-purple-700 cursor-pointer hover:scale-105 font-bold shadow-md'>Cadastrar</button>
          </form>
        </section>

        <section className='bg-purple-300 w-[45%] py-6 rounded-lg flex flex-col '>
          <h2 className='font-bold text-purple-600 flex justify-center text-2xl font-bold'>Cadastrar Atividade</h2>
          <form onSubmit={handleCreateAtividade} className='flex flex-col items-center w-full'>
            <input className='border border-purple-600 bg-purple-200 rounded-lg p-2 w-[80%] mt-2 outline-none focus:ring-2 focus:ring-purple-600' placeholder="Descrição/Nome" value={nameAtv} onChange={e => setNameAtv(e.target.value)} required />
            <input className='border border-purple-600 bg-purple-200 rounded-lg p-2 w-[80%] mt-2 outline-none focus:ring-2 focus:ring-purple-600' type="datetime-local" value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} required />
            <select className='border border-purple-600 bg-purple-200 rounded-lg p-2 w-[80%] mt-2 outline-none focus:ring-2 focus:ring-purple-600' value={typeAtv} onChange={e => setTypeAtv(Number(e.target.value))}>
              <option value={0}>Atividade</option>
              <option value={1}>Prova</option>
            </select>
            <select className='border border-purple-600 bg-purple-200 rounded-lg p-2 w-[80%] mt-2 outline-none focus:ring-2 focus:ring-purple-600' value={idUser} onChange={e => setIdUser(e.target.value)} required>
              <option value="">Selecione o Responsável</option>
              {usuarios.map(u => (
                <option key={u.idUser} value={u.idUser}>{u.nameUser}</option>
              ))}
            </select>
            <button type="submit" className='bg-purple-600 text-white rounded-lg p-2 w-[50%] mt-4 transition-all duration-300 hover:bg-purple-700 cursor-pointer hover:scale-105 font-bold shadow-md'>Cadastrar Atividade</button>
          </form>
        </section>
      </div>

      <section className='p-2'>
        <h2 className='flex text-purple-900 justify-center font-extrabold text-2xl'>Lista de Atividades</h2>
        <p className='flex justify-center font-bold text-1xl text-purple-700'>Visão: </p>
        <div className='flex gap-5 justify-center'>
          
          <button className='bg-purple-600 mt-2 text-white p-2 rounded-lg w-[20%] transition-all duration-300 hover:bg-purple-700 cursor-pointer' onClick={() => setFilterMode('day')}>Dia</button>
          <button className='bg-purple-600 text-white p-2 rounded-lg w-[20%] transition-all duration-300 hover:bg-purple-700 cursor-pointer' onClick={() => setFilterMode('week')}>Semana</button>
          <button className='bg-purple-600 text-white p-2 rounded-lg w-[20%] transition-all duration-300 hover:bg-purple-700 cursor-pointer' onClick={() => setFilterMode('month')}>Mês</button>
        </div>

        {loading ? <p className='text-center mt-5 font-bold text-purple-600'>Carregando...</p> : (
          <div className='overflow-x-auto w-full mt-8 flex justify-center pb-10'>
            <table className='w-[90%] bg-white shadow-xl rounded-xl overflow-hidden text-center border-collapse'>
              <thead className='bg-purple-600 text-white'>
                <tr>
                  <th className='py-4 px-4 uppercase font-semibold text-sm tracking-wider'>Nome/Descrição</th>
                  <th className='py-4 px-4 uppercase font-semibold text-sm tracking-wider'>Data</th>
                  <th className='py-4 px-4 uppercase font-semibold text-sm tracking-wider'>Tipo</th>
                  <th className='py-4 px-4 uppercase font-semibold text-sm tracking-wider'>Responsável</th>
                </tr>
              </thead>
              <tbody className='text-gray-700'>
                {filteredAtividades.length === 0 ? (
                  <tr><td colSpan={4} className='py-8 font-semibold text-purple-500'>Nenhuma atividade encontrada para este período.</td></tr>
                ) : filteredAtividades.map((atv, index) => (
                  <tr key={atv.idAtv} className={`border-b border-purple-100 transition-colors ${index % 2 === 0 ? 'bg-purple-50 hover:bg-purple-100' : 'bg-white hover:bg-purple-100'}`}>
                    <td className='py-4 px-4 font-medium'>{atv.nameAtv}</td>
                    <td className='py-4 px-4 text-sm'>{new Date(atv.dataEntrega).toLocaleString()}</td>
                    <td className='py-4 px-4'>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${atv.typeAtv ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {atv.typeAtv ? 'Prova' : 'Atividade'}
                      </span>
                    </td>
                    <td className='py-4 px-4 font-semibold text-purple-900'>{atv.nameUser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
