import NextLink from 'next/link';
import { Mail, ExternalLink, Users, Briefcase, Star } from 'lucide-react';
import { Entity } from '@/data/entities';

interface EntityCardProps {
  entity: Entity;
}

export default function EntityCard({ entity }: EntityCardProps) {
  return (
    <article className="card group flex flex-col h-full">
      <div className="p-5 pb-3 flex-1">
        <div className="flex items-start gap-3 mb-4">
          <NextLink href={`/comunidad/${entity.id}`} className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-2xl leading-none shadow-sm hover:scale-105 transition-transform">
              {entity.countryFlag}
            </div>
          </NextLink>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <NextLink href={`/comunidad/${entity.id}`}>
                <h3 className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-snug hover:underline decoration-primary-300">
                  {entity.name}
                </h3>
              </NextLink>
              {entity.mentorAvailable && (
                <span className="badge bg-accent-50 text-accent-600 border border-accent-200 flex-shrink-0 whitespace-nowrap">
                  <Star className="w-3 h-3 mr-1" />Mentor
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-neutral-500">{entity.country}</span>
              <span className="text-neutral-200">·</span>
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100">
                {entity.sector}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-4">{entity.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {entity.expertise.slice(0, 3).map((skill) => (
            <span key={skill} className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full font-medium">
              {skill}
            </span>
          ))}
          {entity.expertise.length > 3 && (
            <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-400 rounded-full">+{entity.expertise.length - 3}</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{entity.projectsCount} proyectos</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{entity.teamSize} personas</span>
          <span>Desde {entity.foundedYear}</span>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <NextLink
            href={`/comunidad/${entity.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-700 text-white text-xs font-semibold rounded-lg hover:bg-primary-800 transition-colors"
          >
            Ver perfil
          </NextLink>
          <a
            href={`mailto:${entity.contactEmail}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 text-neutral-600 text-xs font-medium rounded-lg hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
          <a
            href={entity.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 text-neutral-600 text-xs font-medium rounded-lg hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
