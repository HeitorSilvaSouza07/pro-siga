'use client';

import { useState, useEffect } from 'react';

export default function CriarAtividadePage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form states
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
        alert('Atividade criada com sucesso!');
      } else {
        setError('Erro: ' + (result.error || 'Falha ao criar atividade'));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao criar atividade:', err.message);
      } else {
        console.error('Erro de conexão desconhecido:', err);
      }
      setError('Erro de conexão ao criar atividade');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Criar Atividade</h1>
        <p className="text-gray-600">Cadastre uma nova atividade ou prova</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6'>
          <strong>Erro!</strong>
          <p className='mt-2'>{error}</p>
        </div>
      )}

      {/* Form Section */}
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-2xl'>
        <form onSubmit={handleCreateAtividade} className='flex flex-col gap-6'>
          {/* Responsável */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Responsável *
            </label>
            <select
              className='w-full border border-purple-300 bg-purple-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition'
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

          {/* Nome/Descrição */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Descrição / Nome da Atividade *
            </label>
            <input
              type='text'
              className='w-full border border-purple-300 bg-purple-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition'
              placeholder="Ex: Exercício de Matemática, Prova de História"
              value={nameAtv}
              onChange={e => setNameAtv(e.target.value)}
              required
            />
          </div>

          {/* Data de Entrega */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Data e Hora de Entrega *
            </label>
            <input
              type='datetime-local'
              className='w-full border border-purple-300 bg-purple-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition'
              value={dataEntrega}
              onChange={e => setDataEntrega(e.target.value)}
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Tipo de Atividade *
            </label>
            <select
              className='w-full border border-purple-300 bg-purple-50 rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition'
              value={typeAtv}
              onChange={e => setTypeAtv(Number(e.target.value))}
            >
              <option value={0}>📝 Atividade</option>
              <option value={1}>📖 Prova</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitted || loading}
            className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-4'
          >
            {submitted ? 'Criando...' : 'Criar Atividade'}
          </button>
        </form>
      </div>
    </div>
  );
}
