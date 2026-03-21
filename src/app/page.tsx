"use client";

import { useState, useMemo } from "react";
import { Plus, Globe, Sparkles } from "lucide-react";
import { apps as initialApps, App } from "@/data/apps";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AppCard from "@/components/AppCard";
import AddAppModal from "@/components/AddAppModal";
import InstallBanner from "@/components/InstallBanner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export default function Home() {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tutte");
  const [showModal, setShowModal] = useState(false);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buongiorno";
    if (h < 18) return "Buon pomeriggio";
    return "Buonasera";
  };

  const filtered = useMemo(() => {
    return apps.filter((app) => {
      const matchSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase());
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
      <InstallBanner />

      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
        {/* Header */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-gray-950/70 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-400 w-5 h-5" />
              <span className="text-white font-bold text-lg tracking-tight">Soli Dome</span>
            </div>
            <div className="flex-1 max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Aggiungi</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {greeting()} 👋
            </h1>
            <p className="text-white/40 text-sm flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {apps.length} applicazioni disponibili
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Pinned */}
          {pinned.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                ⭐ Preferiti
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {pinned.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {/* All Apps */}
          {rest.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                Tutte le app
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {rest.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/20 text-lg">Nessuna app trovata</p>
              <p className="text-white/10 text-sm mt-1">Prova a cercare qualcos&apos;altro</p>
            </div>
          )}
        </div>

        {/* Add Modal */}
        {showModal && (
          <AddAppModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
        )}
      </main>
    </>
  );
}
