'use client';

import { useState, useEffect } from 'react';

type Atividade = {
  idAtv: number;
  idUser: number;
  nameAtv: string;
  dataEntrega: string;
  typeAtv: boolean;
  descAtv?: string;
  nameUser: string;
};

export default function VerAtividadesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao buscar atividades:', err.message);
      } else {
        console.error('Erro ao buscar atividades desconhecido:', err);
      }
      setError('Falha na conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentDay = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const filteredAtividades = (Array.isArray(atividades) ? atividades : []).filter(atv => {
    const date = new Date(atv.dataEntrega);
    if (filterMode === 'day') return isCurrentDay(date);
    if (filterMode === 'week') return isCurrentWeek(date);
    if (filterMode === 'month') return isCurrentMonth(date);
    return true;
  });

  const filterButtonClass = (mode: string) =>
    `border px-5 py-2 text-sm font-semibold transition ${
      filterMode === mode
        ? 'border-slate-800 bg-slate-800 text-white'
        : 'border-slate-800 bg-white text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <div className="text-slate-950">
      <header className="mb-8">
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          Atividades
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Visualize todas as atividades e provas cadastradas
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-800">
          <strong className="font-semibold">Erro</strong>
          <p className="mt-2 text-sm">{error}</p>
          <button
            onClick={fetchAtividades}
            className="mt-3 rounded-full bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-950"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-slate-700">Visualizar por:</span>
        <button onClick={() => setFilterMode('day')} className={filterButtonClass('day')}>
          Dia
        </button>
        <button onClick={() => setFilterMode('week')} className={filterButtonClass('week')}>
          Semana
        </button>
        <button onClick={() => setFilterMode('month')} className={filterButtonClass('month')}>
          Mês
        </button>
      </div>

      {loading ? (
        <div className="border border-slate-200 bg-white p-12 text-center shadow-xl shadow-slate-900/5">
          <p className="text-sm font-semibold text-slate-600">Carregando atividades...</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          {filteredAtividades.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500">Nenhuma atividade encontrada para este período.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-800">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Nome / descrição</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Data de entrega</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Responsável</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {filteredAtividades.map((atv, index) => (
                    <tr
                      key={atv.idAtv}
                      className={`border-b border-slate-100 transition-colors ${
                        index % 2 === 0 ? 'bg-slate-50 hover:bg-slate-100/80' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{atv.nameAtv}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(atv.dataEntrega).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center border px-3 py-1 text-xs font-semibold ${
                            atv.typeAtv
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {atv.typeAtv ? 'Prova' : 'Atividade'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{atv.nameUser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!loading && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className=" border border-slate-800 bg-white p-6 text-center shadow-lg shadow-slate-900/5">
            <p className="text-sm font-semibold text-slate-500">Total de atividades</p>
            <p className="mt-2 text-3xl font-semibold text-slate-800">
              {atividades.filter(a => a.typeAtv === false).length}
            </p>
          </div>
          <div className=" border border-slate-800 bg-slate-50 p-6 text-center shadow-lg shadow-slate-900/5">
            <p className="text-sm font-semibold text-slate-500">Total de provas</p>
            <p className="mt-2 text-3xl font-semibold text-slate-800">
              {atividades.filter(a => a.typeAtv === true).length}
            </p>
          </div>
          <div className=" border border-slate-800 bg-white p-6 text-center shadow-lg shadow-slate-900/5">
            <p className="text-sm font-semibold text-slate-500">Neste período</p>
            <p className="mt-2 text-3xl font-semibold text-[#0f3460]">{filteredAtividades.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
