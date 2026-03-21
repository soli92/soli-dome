"use client";

import { ExternalLink, Pin } from "lucide-react";
import { App } from "@/data/apps";

interface AppCardProps {
  app: App;
  index: number;
}

export default function AppCard({ app, index }: AppCardProps) {
  const delay = `${(index % 6) * 60}ms`;

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="app-card group relative glass rounded-2xl p-5 border border-white/5 hover:border-violet-500/30 flex flex-col gap-3 cursor-pointer animate-[slideUp_0.4s_ease_forwards] opacity-0"
      style={{ animationDelay: delay, animationFillMode: "forwards" }}
    >
      {/* Pin badge */}
      {app.pinned && (
        <div className="absolute top-3 right-3 text-violet-400 opacity-60">
          <Pin size={12} fill="currentColor" />
        </div>
      )}

      {/* Colored glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${app.color}15 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative"
        style={{ background: `${app.color}20`, border: `1px solid ${app.color}30` }}
      >
        {app.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-dome-text font-semibold text-sm truncate group-hover:text-white transition-colors">
          {app.name}
        </h3>
        <p className="text-dome-muted text-xs mt-0.5 line-clamp-2 leading-relaxed">
          {app.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${app.color}20`, color: app.color }}
        >
          {app.category}
        </span>
        <ExternalLink
          size={14}
          className="text-dome-muted opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </a>
  );
}
