"use client";

import { App } from "@/data/apps";

interface AppCardProps {
  app: App;
  index: number;
}

export default function AppCard({ app, index }: AppCardProps) {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="app-card group block"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className="glass glass-hover rounded-2xl p-4 flex flex-col items-center gap-3 text-center h-full fade-in-up"
        style={{ "--glow-color": `${app.color}55` } as React.CSSProperties}
      >
        {/* Icona */}
        <div
          className="icon-glow w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 relative overflow-hidden"
          style={{ background: `${app.color}22`, border: `1px solid ${app.color}44` }}
        >
          <div
            className="absolute inset-0 opacity-20 rounded-2xl"
            style={{ background: `radial-gradient(circle at 30% 30%, ${app.color}, transparent 70%)` }}
          />
          <span className="relative z-10">{app.icon}</span>
        </div>

        {/* Nome */}
        <div className="flex flex-col gap-0.5 min-w-0 w-full">
          <span className="text-sm font-semibold text-white/90 leading-tight truncate">
            {app.name}
          </span>
          {app.description && (
            <span className="text-xs text-white/40 leading-tight line-clamp-2">
              {app.description}
            </span>
          )}
        </div>

        {/* Pinned badge */}
        {app.pinned && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
            ⭐ Preferita
          </span>
        )}
      </div>
    </a>
  );
}
