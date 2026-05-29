'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImg from '../img/image 11.png';
import heroImg from '../img/image 1.png';
import professorImg from '../img/image 8.png';
import studentImg from '../img/image 9.png';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/dashboard/atividades');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(10,33,93,0.16),_transparent_45%),linear-gradient(180deg,#f6f9ff_0%,#e6edff_55%,#f8fbff_100%)] text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <button onClick={() => router.push('/')} className="flex items-center gap-3 text-left">
          <div className="relative h-12 w-12 rounded-3xl bg-white shadow-lg shadow-slate-900/10">
            <Image src={logoImg} alt="Pro Siga" fill className="object-contain p-2" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-slate-500">Pro Siga</p>
            <p className="text-sm font-semibold text-slate-950">Painel acadêmico</p>
          </div>
        </button>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <button className="rounded-full border border-slate-300 bg-white px-5 py-2 transition hover:bg-slate-100">Criar Conta</button>
          <button className="rounded-full bg-slate-950 px-5 py-2 text-white transition hover:bg-slate-800">Entrar</button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-8 py-10 shadow-xl shadow-slate-900/5">
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-slate-200/80 blur-3xl" />
            <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
              <Image src={heroImg} alt="Ilustração professor e aluno" fill className="object-contain" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5">
              Feito para o aluno e para o professor
            </div>

            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Feito para o <span className="text-[#0f3460]">aluno</span> e para o <span className="text-[#0f3460]">professor</span>
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                Pro Siga é uma plataforma organizada, moderna e intuitiva, pensada para alunos e professores. Com uma interface clara e funcional, facilita o estudo do professor e torna a experiência do aluno mais fluida.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={handleStartClick} className="rounded-full bg-[#0f3460] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800">
                Experimente já
              </button>
              <button className="rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition hover:border-slate-400">
                Saiba mais aqui
              </button>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-white px-8 py-14 shadow-xl shadow-slate-900/5 sm:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pensado em agilidade e facilidade</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              no caminho da informação
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Centralize tarefas, recados e atualizações em um só lugar, com acesso simples para professores e alunos.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center">
              <div className="relative mx-auto mb-6 h-44 w-full max-w-[260px]">
                <Image src={professorImg} alt="O professor" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">O professor</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Organiza conteúdos, acompanha a turma e simplifica a rotina acadêmica.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center">
              <div className="relative mx-auto mb-6 h-44 w-full max-w-[260px]">
                <Image src={studentImg} alt="O aluno" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-slate-950">O aluno</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Recebe avisos, acompanha informações importantes e se mantém conectado.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button onClick={() => router.push('/dashboard/atividades')} className="rounded-full bg-[#0f3460] px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800">
              Saiba mais aqui
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
