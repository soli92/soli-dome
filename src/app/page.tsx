"use client";

import { useState, useMemo } from "react";
import { Plus, Globe, Sparkles } from "lucide-react";
import { apps as initialApps, App } from "@/data/apps";
import { categories } from "@/data/apps";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AppCard from "@/components/AppCard";
import AddAppModal from "@/components/AddAppModal";
import InstallBanner from "@/components/InstallBanner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buongiorno ☀️";
  if (h < 18) return "Buon pomeriggio 🌤️";
  return "Buonasera 🌙";
}

export default function Home() {
  const [appList, setAppList]         = useState<App[]>(initialApps);
  const [search, setSearch]           = useState("");
  const [activeCategory, setCategory] = useState("Tutte");
  const [showModal, setShowModal]     = useState(false);

  const filtered = useMemo(() => {
    return appList.filter((a) => {
      const matchCat  = activeCategory === "Tutte" || a.category === activeCategory;
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [appList, search, activeCategory]);

  const pinned   = filtered.filter((a) => a.pinned);
  const unpinned = filtered.filter((a) => !a.pinned);

  const handleAdd = (newApp: App) => {
    setAppList((prev) => [...prev, newApp]);
  };

  return (
    <>
      <ServiceWorkerRegister />
      <InstallBanner />

      {/* Wrapper principale: scroll libero */}
      <div className="min-h-screen w-full bg-[#0a0a0f] text-white">

        {/* Sfondo decorativo */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-[120px] animate-glow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-700/20 blur-[100px] animate-glow" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-white/5 safe-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Soli Dome
              </span>
            </div>
            <div className="flex-1 max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="hidden sm:flex items-center gap-1 text-sm text-white/40">
              <Globe className="w-4 h-4" />
              <span>{getGreeting()}</span>
            </div>
          </div>
        </header>

        {/* Contenuto scrollabile */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">

          {/* Filtri categoria */}
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setCategory}
          />

          {/* Pinnate */}
          {pinned.length > 0 && (
            <section className="mb-10 animate-slide-up">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                <span>⭐</span> In evidenza
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {pinned.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}

          {/* Tutte le altre */}
          {unpinned.length > 0 && (
            <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {pinned.length > 0 && (
                <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                  Tutte le app
                </h2>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {unpinned.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-white/30 animate-fade-in">
              <Globe className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">Nessuna app trovata</p>
              <p className="text-sm mt-1">Prova a cercare qualcosa di diverso</p>
            </div>
          )}
        </main>

        {/* FAB Aggiungi */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform"
          aria-label="Aggiungi app"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        {/* Modal */}
        {showModal && (
          <AddAppModal
            onAdd={handleAdd}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}
