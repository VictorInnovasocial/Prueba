import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: {
    default: 'RedCoopera — Red Internacional del Tercer Sector',
    template: '%s | RedCoopera',
  },
  description:
    'Ecosistema digital para la cooperación internacional del Tercer Sector. Conectamos ONGs, fundaciones y asociaciones de todo el mundo para compartir conocimiento, recursos y construir alianzas de impacto.',
  keywords: ['ONG', 'tercer sector', 'cooperación internacional', 'recursos', 'mentoring', 'comunidad', 'organizaciones sociales'],
  authors: [{ name: 'RedCoopera' }],
  creator: 'RedCoopera',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://redcoopera.org',
    siteName: 'RedCoopera',
    title: 'RedCoopera — Red Internacional del Tercer Sector',
    description: 'Ecosistema digital para la cooperación internacional del Tercer Sector.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-neutral-50">
        <AuthProvider>
          <Navigation />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
