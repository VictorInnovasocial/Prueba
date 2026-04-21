import Link from 'next/link';
import { Globe, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-neutral-300 mt-20">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Globe className="w-6 h-6 text-accent-400" />
              <span>RedCoopera</span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Ecosistema digital para la cooperación internacional del Tercer Sector. Conectamos organizaciones,
              compartimos conocimiento y construimos alianzas para multiplicar el impacto social.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent-400 transition-colors">Inicio</Link></li>
              <li><Link href="/repositorio" className="hover:text-accent-400 transition-colors">Repositorio</Link></li>
              <li><Link href="/comunidad" className="hover:text-accent-400 transition-colors">Comunidad</Link></li>
              <li><Link href="/mentoring" className="hover:text-accent-400 transition-colors">Mentoring</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <a href="mailto:info@redcoopera.org" className="hover:text-accent-400 transition-colors">
                  info@redcoopera.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <a href="#" className="hover:text-accent-400 transition-colors">
                  redcoopera.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} RedCoopera — Plataforma para el Tercer Sector Internacional</p>
          <p>Herramienta de código abierto para la cooperación y el desarrollo sostenible</p>
        </div>
      </div>
    </footer>
  );
}
