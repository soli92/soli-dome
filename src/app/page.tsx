"use client";

import { useState, useMemo } from "react";
import { Plus, Globe, Sparkles } from "lucide-react";
import { apps as initialApps, App } from "@/data/apps";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AppCard from "@/components/AppCard";
import AddAppModal from "@/components/AddAppModal";
import InstallBanner from "@/components/InstallBanner";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Buongiorno";
  if (hour >= 12 && hour < 18) return "Buon pomeriggio";
  return "Buonasera";
}

export default function Home() {
  const [apps, setApps] = useState<App[]>(initialApps);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tutte");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "Tutte" || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apps, search, activeCategory]);

  const pinnedApps = filteredApps.filter((app) => app.pinned);
  const unpinnedApps = filteredApps.filter((app) => !app.pinned);

  const handleAddApp = (newApp: App) => {
    setApps((prev) => [...prev, newApp]);
  };

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-20 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">
              {getGreeting()}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            Soli Dome
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-1.5">
            <Globe size={14} />
            {apps.length} applicazioni disponibili
          </p>
        </header>

        {/* Search */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Category filter */}
        <div className="mb-8">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Pinned apps */}
        {pinnedApps.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-indigo-400/50" />
              Preferiti
              <span className="w-4 h-px bg-indigo-400/50" />
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {pinnedApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        )}

        {/* All apps */}
        {unpinnedApps.length > 0 && (
          <section>
            {pinnedApps.length > 0 && (
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-gray-500/50" />
                Tutte le app
                <span className="w-4 h-px bg-gray-500/50" />
              </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {unpinnedApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {filteredApps.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Globe size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Nessuna app trovata</p>
            <p className="text-sm mt-1">Prova con un altro termine di ricerca</p>
          </div>
        )}
      </div>

      {/* FAB Add button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:scale-110 transition-transform z-40"
        aria-label="Aggiungi app"
      >
        <Plus size={24} />
      </button>

      {/* Add App Modal */}
      <AddAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddApp}
      />

      {/* PWA Install Banner */}
      <InstallBanner />
    </main>
  );
}
