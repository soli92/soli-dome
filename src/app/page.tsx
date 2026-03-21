"use client";

import { useState, useMemo } from "react";
import { Plus, Globe, Sparkles } from "lucide-react";
import { apps as initialApps, App } from "@/data/apps";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AppCard from "@/components/AppCard";
import AddAppModal from "@/components/AddAppModal";

export default function Home() {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tutti");
  const [showModal, setShowModal] = useState(false);

  // App filtrate per ricerca e categoria
  const filtered = useMemo(() => {
    return apps.filter((app) => {
      const matchSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "Tutti" || app.category === category;
      return matchSearch && matchCat;
    });
  }, [apps, search, category]);

  // App pinnate (mostrate prima)
  const pinned = filtered.filter((a) => a.pinned);
  const rest = filtered.filter((a) => !a.pinned);

  const handleAddApp = (newApp: App) => {
    setApps((prev) => [...prev, newApp]);
  };

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Buongiorno" : hour < 18 ? "Buon pomeriggio" : "Buonasera";

  return (
    <main className="min-h-screen px-4 py-10 md:py-16 max-w-6xl mx-auto">

      {/* Header */}
      <header className="text-center mb-12 animate-[fadeIn_0.5s_ease_forwards]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center animate-float">
            <Globe size={24} className="text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
            Soli Dome
          </h1>
        </div>

        {/* Saluto dinamico */}
        <p className="text-dome-muted text-sm md:text-base flex items-center justify-center gap-1.5">
          <Sparkles size={14} className="text-violet-400" />
          {greeting} — {apps.length} app disponibili
        </p>
      </header>

      {/* Search */}
      <div className="mb-6 animate-[slideUp_0.4s_ease_forwards]">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Category filter */}
      <div className="mb-10 animate-[slideUp_0.4s_0.1s_ease_forwards] opacity-0" style={{ animationFillMode: "forwards" }}>
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {/* Pinned section */}
      {pinned.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-dome-muted uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-dome-border" />
            Preferiti
            <span className="w-full h-px bg-dome-border" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {pinned.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* All apps */}
      {rest.length > 0 && (
        <section className="mb-8">
          {pinned.length > 0 && (
            <h2 className="text-xs font-semibold text-dome-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-dome-border" />
              Tutte le app
              <span className="w-full h-px bg-dome-border" />
            </h2>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {rest.map((app, i) => (
              <AppCard key={app.id} app={app} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 animate-[fadeIn_0.3s_ease_forwards]">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-dome-muted text-sm">
            Nessuna app trovata per &ldquo;{search}&rdquo;
          </p>
        </div>
      )}

      {/* Add app button — floating */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-violet-600 hover:bg-violet-700 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-600/30 transition-all hover:scale-110 active:scale-95 z-40"
        title="Aggiungi app"
      >
        <Plus size={24} className="text-white" />
      </button>

      {/* Footer */}
      <footer className="text-center mt-16 text-dome-muted text-xs">
        Fatto con ✦ da{" "}
        <span className="gradient-text font-medium">Soli</span>
      </footer>

      {/* Modal */}
      {showModal && (
        <AddAppModal onClose={() => setShowModal(false)} onAdd={handleAddApp} />
      )}
    </main>
  );
}
