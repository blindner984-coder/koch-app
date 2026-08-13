import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'KochApp',
  description: 'Deine digitale Kochkunst',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-[#FAFAFC] text-slate-900 pb-24 antialiased selection:bg-slate-900 selection:text-white">
        
        {/* Die echte Menüleiste (ohne Logo, Menüpunkte links) */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-start gap-3 overflow-x-auto no-scrollbar">
            <Link href="/neu" className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl transition-all text-sm flex items-center gap-1.5 shadow-sm">
              <span>✨</span> <span>Neues Rezept</span>
            </Link>
            <Link href="/manuell" className="shrink-0 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl border border-slate-200/80 transition-all text-sm flex items-center gap-1.5">
              <span>✍️</span> <span>Manuelle Rezepte</span>
            </Link>
            <Link href="/einkaufsliste" className="shrink-0 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl border border-slate-200/80 transition-all text-sm flex items-center gap-1.5">
              <span>🛒</span> <span>Einkaufsliste</span>
            </Link>
          </div>
        </header>

        <main>
          {children}
        </main>

        {/* Mobile Navigation Unten */}
        <nav className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-white/90 backdrop-blur-lg border border-gray-200/60 rounded-full flex justify-around py-3 md:hidden z-50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
          <Link href="/" className="flex flex-col items-center gap-1">
            <span className="text-lg">🏠</span>
            <span className="text-[10px] font-medium text-slate-500">Rezepte</span>
          </Link>
          <Link href="/neu" className="flex flex-col items-center gap-1">
            <span className="text-lg">➕</span>
            <span className="text-[10px] font-medium text-slate-500">Neu</span>
          </Link>
          <Link href="/einkaufsliste" className="flex flex-col items-center gap-1">
            <span className="text-lg">🛒</span>
            <span className="text-[10px] font-medium text-slate-500">Einkauf</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}