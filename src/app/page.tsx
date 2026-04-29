"use client";

import { Suspense, useState, useMemo, useEffect, startTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Sparkles, Grid3X3 } from "lucide-react";
import { apps as initialApps, App } from "@/data/apps";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AppCard from "@/components/AppCard";
import AddAppModal from "@/components/AddAppModal";
import InstallBanner from "@/components/InstallBanner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import SoliBrandLogo from "@/components/SoliBrandLogo";
import SoliLogoLoader from "@/components/SoliLogoLoader";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Buongiorno", emoji: "☀️" };
  if (h < 18) return { text: "Buon pomeriggio", emoji: "🌤️" };
  return { text: "Buonasera", emoji: "🌙" };
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [apps, setApps] = useState<App[]>(initialApps);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tutte");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("action") !== "add") return;
    startTransition(() => {
      setShowModal(true);
    });
    router.replace("/", { scroll: false });
  }, [searchParams, router]);

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
        <header className="sticky top-0 z-30 safe-top">
          <div className="glass border-b border-border/50 backdrop-blur-2xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <SoliBrandLogo className="w-[124px] sm:w-[148px] h-auto" priority />
              </div>

              <div className="flex-1 max-w-md hidden sm:block">
                <SearchBar value={search} onChange={setSearch} />
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/25 transition-all"
              >
                <Plus className="w-4 h-4 text-[var(--sd-color-icon-primary)]" />
                <span className="hidden sm:inline">Aggiungi</span>
              </button>
            </div>

            <div className="sm:hidden px-4 pb-3">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
        </header>

        <InstallBanner />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {greeting.emoji} {greeting.text}
            </h1>
            <p className="text-muted-foreground text-sm">
              {apps.length} app nel tuo portale
            </p>
          </div>

          <div className="mb-6">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-muted-foreground text-sm">Nessuna app trovata</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("Tutte");
                }}
                className="mt-4 text-primary text-sm hover:underline"
              >
                Resetta filtri
              </button>
            </div>
          )}

          {pinned.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[var(--sd-color-icon-primary)]" />
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
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

          {rest.length > 0 && (
            <section>
              {pinned.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Grid3X3 className="w-4 h-4 text-[var(--sd-color-icon-muted)]" />
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
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

      {showModal && (
        <AddAppModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<SoliLogoLoader />}>
      <HomeContent />
    </Suspense>
  );
}
