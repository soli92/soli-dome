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
        app.description.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "Tutte" || app.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [apps, search, activeCategory]);

  const pinned = filtered.filter((a) => a.pinned);
  const unpinned = filtered.filter((a) => !a.pinned);

  const handleAdd = (app: App) => {
    setApps((prev) => [...prev, app]);
    setShowModal(false);
  };

  return (
    <>
      <ServiceWorkerRegister />

      {/* Tutto il layout è un normale div che fluisce — scroll sul body */}
      <div className="bg-animated min-h-screen">
        <InstallBanner />

        {/* Header */}
        <header className="glass sticky top-0 z-40 safe-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-none">Soli Dome</h1>
                <p className="text-xs text-white/40 leading-none mt-0.5">Il tuo portale personale</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 text-sm text-white/50">
                <Sparkles className="w-3.5 h-3.5" />
                {greeting}
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Aggiungi</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content — padding bottom ampio per non tagliare l'ultima riga */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          {/* Search */}
          <div className="mb-6">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Pinned */}
          {pinned.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>⭐</span> Preferiti
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {pinned.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}

          {/* All apps */}
          {unpinned.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Tutte le app
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {unpinned.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-white/30">
              <Globe className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">Nessuna app trovata</p>
              <p className="text-sm mt-1">Prova con un altro termine o categoria</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <AddAppModal
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
          categories={categories}
        />
      )}
    </>
  );
}
