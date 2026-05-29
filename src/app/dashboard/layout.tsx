import DashboardNav from '@/components/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav />
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        {children}
      </div>
    </div>
  );
}
