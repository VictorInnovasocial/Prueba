import { Download, ExternalLink, FileText, FileSpreadsheet, Presentation, Video, Link, BookOpen } from 'lucide-react';
import { Resource, categoryColors } from '@/data/resources';

interface ResourceCardProps {
  resource: Resource;
}

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="w-4 h-4" />,
  DOC: <BookOpen className="w-4 h-4" />,
  XLS: <FileSpreadsheet className="w-4 h-4" />,
  PPT: <Presentation className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  ENLACE: <Link className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  PDF: 'bg-red-50 text-red-600 border-red-100',
  DOC: 'bg-blue-50 text-blue-600 border-blue-100',
  XLS: 'bg-green-50 text-green-600 border-green-100',
  PPT: 'bg-orange-50 text-orange-600 border-orange-100',
  VIDEO: 'bg-purple-50 text-purple-600 border-purple-100',
  ENLACE: 'bg-neutral-50 text-neutral-600 border-neutral-100',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDownloads(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="card group flex flex-col h-full">
      {/* Header */}
      <div className="p-5 pb-3 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <span className={categoryColors[resource.category]}>
              {resource.category}
            </span>
            <span className={`badge border ${typeColors[resource.type]}`}>
              <span className="flex items-center gap-1">
                {typeIcons[resource.type]}
                {resource.type}
              </span>
            </span>
          </div>
          {resource.featured && (
            <span className="badge bg-accent-50 text-accent-600 border border-accent-200 flex-shrink-0">
              Destacado
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-snug mb-2">
          {resource.title}
        </h3>

        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-4">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-400 rounded-full">
              +{resource.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-neutral-100">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-neutral-700 truncate">{resource.author}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-neutral-400 truncate">{resource.organization}</p>
              <span className="text-neutral-200">·</span>
              <p className="text-xs text-neutral-400 whitespace-nowrap">{formatDate(resource.date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Download className="w-3 h-3" />
              {formatDownloads(resource.downloads)}
            </span>
            <a
              href={resource.downloadUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-700 text-white text-xs font-semibold rounded-lg hover:bg-primary-800 transition-colors"
              title={`Descargar ${resource.title}`}
            >
              {resource.type === 'VIDEO' || resource.type === 'ENLACE' ? (
                <>
                  <ExternalLink className="w-3 h-3" />
                  Ver
                </>
              ) : (
                <>
                  <Download className="w-3 h-3" />
                  Descargar
                </>
              )}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
