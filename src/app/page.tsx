"use client";

import { useState, useMemo } from "react";
import { Plus, Sparkles, Grid3X3 } from "lucide-react";
import { apps as initialApps, App } from "@/data/apps";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AppCard from "@/components/AppCard";
import AddAppModal from "@/components/AddAppModal";
import InstallBanner from "@/components/InstallBanner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Buongiorno", emoji: "☀️" };
  if (h < 18) return { text: "Buon pomeriggio", emoji: "🌤️" };
  return { text: "Buonasera", emoji: "🌙" };
}

export default function Home() {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tutte");
  const [showModal, setShowModal] = useState(false);

  const greeting = getGreeting();

  const filtered = useMemo(() => {
    return apps.filter((app) => {
      const matchSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description?.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "Tutte" || app.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [apps, search, activeCategory]);

  const pinned = filtered.filter((a) => a.pinned);
  const rest = filtered.filter((a) => !a.pinned);

  const handleAdd = (app: App) => {
    setApps((prev) => [...prev, app]);
    setShowModal(false);
  };

  return (
    <>
      <ServiceWorkerRegister />

      <div className="bg-mesh min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 safe-top">
          <div className="glass border-b border-white/[0.06] backdrop-blur-2xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="font-bold text-white text-base tracking-tight">
                  Soli <span className="text-indigo-400">Dome</span>
                </span>
              </div>

              {/* Search — centro */}
              <div className="flex-1 max-w-md hidden sm:block">
                <SearchBar value={search} onChange={setSearch} />
              </div>

              {/* Add button */}
              <button
                onClick={() => setShowModal(true)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Aggiungi</span>
              </button>
            </div>

            {/* Search mobile */}
            <div className="sm:hidden px-4 pb-3">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
        </header>

        {/* Install Banner */}
        <InstallBanner />

        {/* Main */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">

          {/* Hero greeting */}
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {greeting.emoji} {greeting.text}
            </h1>
            <p className="text-white/40 text-sm">
              {apps.length} app nel tuo portale
            </p>
          </div>

          {/* Category filter */}
          <div className="mb-6">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-white/40 text-sm">Nessuna app trovata</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("Tutte"); }}
                className="mt-4 text-indigo-400 text-sm hover:underline"
              >
                Resetta filtri
              </button>
            </div>
          )}

          {/* Pinnate */}
          {pinned.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                  Preferite
                </h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                {pinned.map((app, i) => (
                  <AppCard key={app.id} app={app} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Tutte le altre */}
          {rest.length > 0 && (
            <section>
              {pinned.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Grid3X3 className="w-4 h-4 text-white/30" />
                  <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                    {activeCategory === "Tutte" ? "Tutte le app" : activeCategory}
                  </h2>
                </div>
              )}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                {rest.map((app, i) => (
                  <AppCard key={app.id} app={app} index={i} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Add App Modal */}
      {showModal && (
        <AddAppModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
