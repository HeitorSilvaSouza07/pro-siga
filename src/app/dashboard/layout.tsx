import DashboardNav from '@/components/DashboardNav';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(10,33,93,0.12),_transparent_45%),linear-gradient(180deg,#f6f9ff_0%,#e6edff_55%,#f8fbff_100%)]">
      <DashboardNav />
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        {children}
      </div>
    </div>
  );
}
