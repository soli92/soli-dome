"use client";

import { useState, useMemo } from "react";
import { Plus, Globe, Sparkles } from "lucide-react";
import { apps as initialApps, categories, App } from "@/data/apps";
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

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Buongiorno";
    if (h < 18) return "Buon pomeriggio";
    return "Buonasera";
  }, []);

  const filtered = useMemo(() => {
    return apps.filter((app) => {
      const matchSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description?.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "Tutte" || app.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [apps, search, activeCategory]);

  const pinned = filtered.filter((a) => a.pinned);
  const unpinned = filtered.filter((a) => !a.pinned);

  const handleAddApp = (app: App) => {
    setApps((prev) => [...prev, app]);
    setShowModal(false);
  };

  return (
    <>
      <ServiceWorkerRegister />
      <InstallBanner />

      <main className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Soli Dome</span>
            </div>
            <div className="flex-1 max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Aggiungi</span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-violet-400" />
              {greeting}!
            </h1>
            <p className="text-gray-400 mt-1">
              {apps.length} app disponibili nel tuo portale
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
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                ⭐ Preferiti
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {pinned.map((app, index) => (
                  <AppCard key={app.id} app={app} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* All Apps */}
          {unpinned.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                🗂 Tutte le app
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {unpinned.map((app, index) => (
                  <AppCard key={app.id} app={app} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-500">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Nessuna app trovata</p>
              <p className="text-sm mt-1">Prova a cambiare la ricerca o la categoria</p>
            </div>
          )}
        </div>

        {/* FAB mobile */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-900/50 transition-colors z-50"
        >
          <Plus className="w-6 h-6" />
        </button>

        {showModal && (
          <AddAppModal
            onAdd={handleAddApp}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </>
  );
}
