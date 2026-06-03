'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImg from '../img/image 11.png';
import heroImg from '../img/professor.png';
import professorImg from '../img/professor.png';
import studentImg from '../img/feliz.png';
import avaliações from '../img/avaliations.png'

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/dashboard/atividades');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(10,33,93,0.16),_transparent_45%),linear-gradient(180deg,#f6f9ff_0%,#e6edff_55%,#f8fbff_100%)] text-[#052659]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <button onClick={() => router.push('/')} className="flex items-center gap-3 text-left">
          <div className="relative h-20 w-20">
            <Image src={logoImg} alt="Pro Siga" fill className="object-contain " />
          </div>

        </button>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <section>
          <div>

          </div>
        </section>
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#052659]/15 blur-3xl" />
            <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
              <Image src={heroImg} alt="Ilustração professor e aluno" fill className="object-contain" />
            </div>
          </div>

          <div className="space-y-8">

            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-[#052659] sm:text-6xl">
                Feito para o <span className="text-[#052659]/60">aluno</span> e para o <span className="text-[#052659]/60">professor</span>
              </h1>
              <p className="text-lg leading-8 text-[#052659]/70">
                Pro Siga é uma plataforma organizada, moderna e intuitiva, pensada para alunos e professores. Com uma interface clara e funcional, facilita o estudo do professor e torna a experiência do aluno mais fluida.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={handleStartClick} className=" bg-[#052659] px-20 py-6 text-sm font-semibold text-white hover:border shadow-[#052659]/15 transition hover:bg-white hover:text-[#052659]">
                Experimente já!
              </button>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols lg:items-center">
          <div className="relative mx-auto h-[600px] w-full max-w-[800px]">
            <Image src={avaliações} alt="Avaliações" fill className="object-contain" />
          </div>
        </section>

        <section className="mt-20 rounded-[2rem]  px-8 py-14 sm:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#052659] sm:text-4xl">Pensado em <span className="text-[#052659]/70">agilidade</span> e <span className="text-[#052659]/70">facilidade</span><br />no caminho da informação</h1>
            <p className="mt-6 text-base leading-7 text-[#052659]/70">
              Centralize tarefas, recados e atualizações em um só lugar, com acesso simples para professores e alunos.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className=" border border-[#052659]/20 bg-[#052659]/5 p-8 text-center">
              <div className="relative mx-auto mb-6 h-44 w-full max-w-[260px]">
                <Image src={professorImg} alt="O professor" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-[#052659]">O professor</h3>
              <p className="mt-4 text-sm leading-7 text-[#052659]/70">
                Organiza conteúdos, acompanha a turma e simplifica a rotina acadêmica.
              </p>
            </div>
            <div className=" border border-[#052659]/20 bg-[#052659]/5 p-8 text-center">
              <div className="relative mx-auto mb-6 h-44 w-full max-w-[260px]">
                <Image src={studentImg} alt="O aluno" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-[#052659]">O aluno</h3>
              <p className="mt-4 text-sm leading-7 text-[#052659]/70">
                Recebe avisos, acompanha informações importantes e se mantém conectado.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button onClick={() => router.push('/dashboard/atividades')} className=" bg-[#0f3460] hover:bg-white hover:border hover:border-[#0f3460] hover:text-[#0f3460] px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-[#052659]/15 transition hover:bg-[#052659]">
              Saiba mais aqui
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
