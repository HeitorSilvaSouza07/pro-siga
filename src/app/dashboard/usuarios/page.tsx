'use client';

import { useState, useEffect } from 'react';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
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
        fetchUsuarios();
      } else {
        setError('Erro: ' + (result.error || 'Falha ao criar usuário'));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao criar usuário:', err.message);
      } else {
        console.error('Erro ao criar usuário desconhecido:', err);
      }
      setError('Erro de conexão ao criar usuário');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Gerenciar Usuários</h1>
        <p className="text-gray-600">Cadastre novos usuários responsáveis pelas atividades</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6'>
          <strong>Erro!</strong>
          <p className='mt-2'>{error}</p>
          <button 
            onClick={fetchUsuarios}
            className='mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
          >
            Tentar Novamente
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <section className='bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-purple-700 mb-6'>Cadastrar Novo Usuário</h2>
          <form onSubmit={handleCreateUsuario} className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Nome do Usuário
              </label>
              <input
                type='text'
                className='w-full border border-purple-300 bg-purple-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition'
                placeholder="Digite o nome do usuário"
                value={nameUser}
                onChange={e => setNameUser(e.target.value)}
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Matéria / Disciplina
              </label>
              <input
                type='text'
                className='w-full border border-purple-300 bg-purple-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition'
                placeholder="Ex: Matemática, Português, etc"
                value={materiaUser}
                onChange={e => setMateriaUser(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {submitted ? 'Cadastrando...' : 'Cadastrar Usuário'}
            </button>
          </form>
        </section>

        {/* Users List Section */}
        <section className='bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-purple-700 mb-6'>Usuários Cadastrados</h2>
          
          {loading ? (
            <div className='text-center py-8'>
              <p className='text-purple-600 font-semibold'>Carregando usuários...</p>
            </div>
          ) : usuarios.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-500'>Nenhum usuário cadastrado ainda.</p>
            </div>
          ) : (
            <div className='space-y-3 max-h-96 overflow-y-auto'>
              {usuarios.map((usuario) => (
                <div
                  key={usuario.idUser}
                  className='p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-400 transition'
                >
                  <p className='font-semibold text-purple-900'>{usuario.nameUser}</p>
                  <p className='text-sm text-gray-600'>{usuario.materiaUser}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
