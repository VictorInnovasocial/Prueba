'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MessageCircle, Clock, Send, Pin, CheckCircle, Globe } from 'lucide-react';
import { threads, categoryColors } from '@/data/forum';
import type { ForumReply } from '@/data/forum';
import { useAuth } from '@/context/AuthContext';

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const thread = threads.find((t) => t.id === id);

  const [replies, setReplies] = useState<ForumReply[]>(thread?.replies ?? []);
  const [replyText, setReplyText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!thread) {
    return (
      <div className="container-main py-20 text-center">
        <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-neutral-700 mb-2">Debate no encontrado</h1>
        <Link href="/foro" className="btn-outline mt-4 text-sm py-2 px-5 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Volver al foro
        </Link>
      </div>
    );
  }

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    const newReply: ForumReply = {
      id: `r${Date.now()}`,
      author: user!.name,
      organization: user!.organization,
      countryFlag: '🌍',
      content: replyText,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setReplies([...replies, newReply]);
    setReplyText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-main py-10 max-w-4xl">
        {/* Back */}
        <Link href="/foro" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-700 transition-colors mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Volver al foro
        </Link>

        {/* Thread */}
        <article className="bg-white rounded-2xl border border-neutral-100 shadow-card mb-6 overflow-hidden">
          <div className="bg-primary-700 px-6 py-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {thread.pinned && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-400 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  <Pin className="w-3 h-3" /> Fijado
                </span>
              )}
              <span className={`badge border text-xs ${categoryColors[thread.category]}`}>
                {thread.category}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {thread.title}
            </h1>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-neutral-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-xl flex-shrink-0">
                {thread.countryFlag}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">{thread.author}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Globe className="w-3 h-3" />
                  <span>{thread.organization}</span>
                  <span>·</span>
                  <Clock className="w-3 h-3" />
                  <span>{new Date(thread.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{thread.content}</p>
          </div>
        </article>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary-600" />
            {replies.length} respuesta{replies.length !== 1 ? 's' : ''}
          </h2>

          {replies.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-neutral-100 shadow-card">
              <p className="text-neutral-500 text-sm">Aún no hay respuestas. ¡Sé el primero en responder!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {replies.map((reply, index) => (
                <div key={reply.id} className="bg-white rounded-xl border border-neutral-100 shadow-card p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-9 h-9 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-lg">
                        {reply.countryFlag}
                      </div>
                      <span className="text-xs text-neutral-400 font-medium">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-neutral-800">{reply.author}</span>
                        <span className="text-xs text-neutral-400">{reply.organization}</span>
                        <span className="text-neutral-200 ml-auto text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(reply.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply form */}
        {isAuthenticated ? (
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6">
            <h3 className="text-base font-bold text-neutral-800 mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-primary-600" />
              Añadir respuesta
            </h3>
            {submitted && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-4 text-sm text-emerald-700">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Respuesta publicada correctamente.
              </div>
            )}
            <form onSubmit={handleReply} className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-sm text-neutral-600">
                <span className="font-medium">{user?.name}</span>
                <span>·</span>
                <span className="text-neutral-400">{user?.organization}</span>
              </div>
              <textarea
                required
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Escribe tu respuesta, aportación o experiencia relacionada con este tema..."
                className="input-base resize-none"
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  <Send className="w-4 h-4" />
                  Publicar respuesta
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
            <MessageCircle className="w-10 h-10 text-primary-300 mx-auto mb-3" />
            <p className="text-primary-800 font-semibold mb-1">¿Quieres responder?</p>
            <p className="text-primary-600 text-sm mb-4">Inicia sesión para participar en este debate.</p>
            <Link href="/login" className="btn-primary inline-flex">
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
