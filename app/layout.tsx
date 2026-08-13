import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Rezept & Einkaufs-App',
  description: 'Kochen, Checken, Einkaufen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-[#FAFAFA] text-gray-900 pb-24 antialiased selection:bg-gray-900 selection:text-white">
        {/* Edler Desktop & Mobile Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 tracking-tight">
              <span className="text-xl">🍳</span> KochApp
            </Link>
            <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition">Rezepte</Link>
              <Link href="/neu" className="hover:text-gray-900 transition">Neues Rezept</Link>
              <Link href="/einkaufsliste" className="hover:text-gray-900 transition">Einkaufsliste</Link>
            </nav>
          </div>
        </header>

        {/* Hauptinhalt */}
        <main>
          {children}
        </main>

        {/* Schwebende, edle mobile Navigation unten */}
        <nav className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-white/90 backdrop-blur-lg border border-gray-200/60 rounded-full flex justify-around py-3 md:hidden z-50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
          <Link href="/" className="flex flex-col items-center text-[11px] font-medium text-gray-600 hover:text-gray-900 transition">
            <span className="text-base mb-0.5">🏠</span> Rezepte
          </Link>
          <Link href="/neu" className="flex flex-col items-center text-[11px] font-medium text-gray-600 hover:text-gray-900 transition">
            <span className="text-base mb-0.5">➕</span> Neu
          </Link>
          <Link href="/einkaufsliste" className="flex flex-col items-center text-[11px] font-medium text-gray-600 hover:text-gray-900 transition">
            <span className="text-base mb-0.5">🛒</span> Einkauf
          </Link>
        </nav>
      </body>
    </html>
  );
}