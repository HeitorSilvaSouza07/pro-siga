'use client';

import { useState, useEffect } from 'react';
import { showCreatedSuccess } from '@/lib/swal';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nameUser, setNameUser] = useState('');
  const [materiaUser, setMateriaUser] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setError(null);
      const res = await fetch('/api/usuarios');
      const data = await res.json();

      if (!res.ok) {
        setError(`Erro: ${data.error || 'Erro ao buscar usuários'}`);
        return;
      }

      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao buscar usuários:', err.message);
      } else {
        console.error('Erro ao buscar usuários desconhecido:', err);
      }
      setError('Falha na conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

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
        setSubmitted(false);
        await showCreatedSuccess(
          'Usuário cadastrado!',
          'O usuário foi criado com sucesso.'
        );
        fetchUsuarios();
      } else {
        setSubmitted(false);
        setError('Erro: ' + (result.error || 'Falha ao criar usuário'));
      }
    } catch (err: unknown) {
      setSubmitted(false);
      if (err instanceof Error) {
        console.error('Erro ao criar usuário:', err.message);
      } else {
        console.error('Erro ao criar usuário desconhecido:', err);
      }
      setError('Erro de conexão ao criar usuário');
    }
  };

  return (
    <div className="text-slate-950">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
          Gerenciar Usuários
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Cadastre novos usuários responsáveis pelas atividades
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-800">
          <strong className="font-semibold">Erro</strong>
          <p className="mt-2 text-sm">{error}</p>
          <button
            onClick={fetchUsuarios}
            className="mt-3 bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-950"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <section className="border border-slate-800 bg-white p-8 shadow-xl shadow-slate-900/5">
          <h2 className="text-xl font-semibold text-slate-800">Cadastrar novo usuário</h2>
          <p className="mt-1 text-sm text-slate-500">Preencha os dados do responsável</p>
          <form onSubmit={handleCreateUsuario} className="mt-6 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nome do usuário
              </label>
              <input
                type="text"
                className="w-full border border-slate-800 bg-slate-50 p-3 outline-none transition focus:border-slate-700 "
                placeholder="Digite o nome do usuário"
                value={nameUser}
                onChange={e => setNameUser(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Matéria / disciplina
              </label>
              <input
                type="text"
                className="w-full border border-slate-800 bg-slate-50 p-3 outline-none transition focus:border-slate-700 "
                placeholder="Ex: Matemática, Português"
                value={materiaUser}
                onChange={e => setMateriaUser(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="mt-2 w-full bg-[#0f3460] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:border hover:bg-white hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitted ? 'Cadastrando...' : 'Cadastrar usuário'}
            </button>
          </form>
        </section>

        <section className=" border border-slate-800 bg-white p-8 shadow-xl shadow-slate-900/5">
          <h2 className="text-xl font-semibold text-slate-800">Usuários cadastrados</h2>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? 'Carregando...' : `${usuarios.length} usuário(s)`}
          </p>

          {loading ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-slate-600">Carregando usuários...</p>
            </div>
          ) : usuarios.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">Nenhum usuário cadastrado ainda.</p>
            </div>
          ) : (
            <div className="mt-6 max-h-96 space-y-3 overflow-y-auto">
              {usuarios.map(usuario => (
                <div
                  key={usuario.idUser}
                  className= "border border-slate-800 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                >
                  <p className="font-semibold text-slate-800">{usuario.nameUser}</p>
                  <p className="mt-1 text-sm text-slate-600">{usuario.materiaUser}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
