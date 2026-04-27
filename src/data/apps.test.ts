import { describe, it, expect } from "vitest";
import { apps, categories, defaultNewAppCategory } from "./apps";

describe("apps data", () => {
  it("defaultNewAppCategory non è il filtro Tutte", () => {
    expect(defaultNewAppCategory).not.toBe("Tutte");
    expect(categories).toContain(defaultNewAppCategory);
  });

  it("le app hanno id e url", () => {
    for (const app of apps) {
      expect(app.id).toBeTruthy();
      expect(app.url).toMatch(/^https?:\/\//);
    }
  });

  it("include Health, Wand and Fire nel portale", () => {
    const hwf = apps.find((a) => a.id === "health-wand-and-fire");
    expect(hwf).toBeDefined();
    expect(hwf?.name).toBe("Health, Wand and Fire");
    expect(hwf?.url).toBe("https://health-wand-and-fire.vercel.app/");
  });
});
