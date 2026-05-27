'use client';

import { useState, useEffect } from 'react';

export default function VerAtividadesPage() {
  const [atividades, setAtividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState('month');

  useEffect(() => {
    fetchAtividades();
  }, []);

  const fetchAtividades = async () => {
    try {
      setError(null);
      const res = await fetch('/api/atividades');
      const data = await res.json();

      if (!res.ok) {
        setError(`Erro: ${data.error || 'Erro ao buscar atividades'}`);
        return;
      }

      setAtividades(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Erro ao buscar atividades:', err);
      setError('Falha na conexão com a API.');
    } finally {
      setLoading(false);
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Atividades</h1>
        <p className="text-gray-600">Visualize todas as atividades e provas cadastradas</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6'>
          <strong>Erro!</strong>
          <p className='mt-2'>{error}</p>
          <button 
            onClick={fetchAtividades}
            className='mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Filter Buttons */}
      <div className='mb-8 flex gap-4 flex-wrap'>
        <p className='font-semibold text-gray-700 flex items-center'>Visualizar por:</p>
        <button
          onClick={() => setFilterMode('day')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filterMode === 'day'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white border border-purple-300 text-purple-600 hover:bg-purple-50'
          }`}
        >
          📅 Dia
        </button>
        <button
          onClick={() => setFilterMode('week')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filterMode === 'week'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white border border-purple-300 text-purple-600 hover:bg-purple-50'
          }`}
        >
          📆 Semana
        </button>
        <button
          onClick={() => setFilterMode('month')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filterMode === 'month'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white border border-purple-300 text-purple-600 hover:bg-purple-50'
          }`}
        >
          📊 Mês
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className='bg-white rounded-lg shadow-lg p-12 text-center'>
          <p className='text-purple-600 font-semibold text-lg'>Carregando atividades...</p>
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {filteredAtividades.length === 0 ? (
            <div className='p-12 text-center'>
              <p className='text-gray-500 text-lg'>Nenhuma atividade encontrada para este período.</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gradient-to-r from-purple-600 to-purple-700 text-white'>
                  <tr>
                    <th className='px-6 py-4 text-left font-semibold'>Nome/Descrição</th>
                    <th className='px-6 py-4 text-left font-semibold'>Data de Entrega</th>
                    <th className='px-6 py-4 text-left font-semibold'>Tipo</th>
                    <th className='px-6 py-4 text-left font-semibold'>Responsável</th>
                  </tr>
                </thead>
                <tbody className='text-gray-700'>
                  {filteredAtividades.map((atv, index) => (
                    <tr
                      key={atv.idAtv}
                      className={`border-b transition-colors ${
                        index % 2 === 0
                          ? 'bg-purple-50 hover:bg-purple-100'
                          : 'bg-white hover:bg-purple-50'
                      }`}
                    >
                      <td className='px-6 py-4 font-medium text-gray-900'>{atv.nameAtv}</td>
                      <td className='px-6 py-4 text-sm'>
                        {new Date(atv.dataEntrega).toLocaleString('pt-BR')}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            atv.typeAtv
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {atv.typeAtv ? '📖 Prova' : '📝 Atividade'}
                        </span>
                      </td>
                      <td className='px-6 py-4 font-semibold text-purple-900'>{atv.nameUser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <div className='mt-8 grid md:grid-cols-3 gap-4'>
          <div className='bg-purple-100 rounded-lg p-6 text-center'>
            <p className='text-purple-600 font-semibold mb-2'>Total de Atividades</p>
            <p className='text-3xl font-bold text-purple-800'>{atividades.filter(a => a.typeAtv === 0).length}</p>
          </div>
          <div className='bg-red-100 rounded-lg p-6 text-center'>
            <p className='text-red-600 font-semibold mb-2'>Total de Provas</p>
            <p className='text-3xl font-bold text-red-800'>{atividades.filter(a => a.typeAtv === 1).length}</p>
          </div>
          <div className='bg-pink-100 rounded-lg p-6 text-center'>
            <p className='text-pink-600 font-semibold mb-2'>Neste Período</p>
            <p className='text-3xl font-bold text-pink-800'>{filteredAtividades.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
