'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import logoImg from '../img/image 11.png';

export default function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard/usuarios', label: 'Criar Usuário' },
    { href: '/dashboard/atividades/criar', label: 'Criar Atividade' },
    { href: '/dashboard/atividades', label: 'Ver Atividades' },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <nav className="bg-slate-950 text-white shadow-xl shadow-slate-900/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-3 text-left"
        >
          <div className="relative h-11 w-11 rounded-3xl bg-white shadow-sm shadow-slate-900/10">
            <Image src={logoImg} alt="Pro Siga" fill className="object-contain p-2" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pro Siga</p>
            <p className="text-sm font-semibold">Dashboard</p>
          </div>
        </button>

        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                isActive(item.href)
                  ? 'bg-slate-200 text-slate-950 shadow-sm'
                  : 'bg-slate-900/80 text-slate-100 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
