'use client';

import { useState, useEffect } from 'react';
import { showCreatedSuccess } from '@/lib/swal';

type Usuario = {
  idUser: number;
  nameUser: string;
  materiaUser: string;
};

const inputClass =
  'w-full border border-slate-800 bg-slate-50 p-3 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-800/20';

export default function CriarAtividadePage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [idUser, setIdUser] = useState('');
  const [nameAtv, setNameAtv] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [typeAtv, setTypeAtv] = useState(0);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setError(null);
      const res = await fetch('/api/usuarios');
      const data = await res.json();

      if (!res.ok) {
        setError(`Erro ao buscar usuários: ${data.error}`);
        return;
      }

      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro:', err.message);
      } else {
        console.error('Erro desconhecido:', err);
      }
      setError('Falha na conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAtividade = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const res = await fetch('/api/atividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUser: Number(idUser),
          nameAtv,
          dataEntrega,
          typeAtv: Number(typeAtv)
        })
      });

      const result = await res.json();

      if (res.ok) {
        setNameAtv('');
        setDataEntrega('');
        setIdUser('');
        setTypeAtv(0);
        setSubmitted(false);
        await showCreatedSuccess(
          'Atividade criada!',
          'A atividade foi registrada com sucesso.'
        );
      } else {
        setSubmitted(false);
        setError('Erro: ' + (result.error || 'Falha ao criar atividade'));
      }
    } catch (err: unknown) {
      setSubmitted(false);
      if (err instanceof Error) {
        console.error('Erro ao criar atividade:', err.message);
      } else {
        console.error('Erro de conexão desconhecido:', err);
      }
      setError('Erro de conexão ao criar atividade');
    }
  };

  return (
    <div className="text-slate-950">
      <header className="mb-10">
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          Criar atividade
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Cadastre uma nova atividade ou prova
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-800">
          <strong className="font-semibold">Erro</strong>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}

      <section className="max-w-2xl border border-slate-800 bg-white p-8 shadow-xl shadow-slate-900/5">
        <h2 className="text-xl font-semibold text-slate-800">Nova atividade</h2>
        <p className="mt-1 text-sm text-slate-500">Preencha os campos abaixo</p>

        <form onSubmit={handleCreateAtividade} className="mt-6 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Responsável *
            </label>
            <select
              className={inputClass}
              value={idUser}
              onChange={e => setIdUser(e.target.value)}
              required
            >
              <option value="">Selecione um usuário</option>
              {loading ? (
                <option disabled>Carregando usuários...</option>
              ) : usuarios.length === 0 ? (
                <option disabled>Nenhum usuário disponível</option>
              ) : (
                usuarios.map(u => (
                  <option key={u.idUser} value={u.idUser}>
                    {u.nameUser} - {u.materiaUser}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Descrição / nome da atividade *
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder="Ex: Exercício de Matemática, Prova de História"
              value={nameAtv}
              onChange={e => setNameAtv(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Data e hora de entrega *
            </label>
            <input
              type="datetime-local"
              className={inputClass}
              value={dataEntrega}
              onChange={e => setDataEntrega(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tipo de atividade *
            </label>
            <select
              className={inputClass}
              value={typeAtv}
              onChange={e => setTypeAtv(Number(e.target.value))}
            >
              <option value={0}>Atividade</option>
              <option value={1}>Prova</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitted || loading}
            className="mt-2 w-full hover:border hover:text-slate-800 hover:bg-white bg-[#0f3460] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitted ? 'Criando...' : 'Criar atividade'}
          </button>
        </form>
      </section>
    </div>
  );
}
