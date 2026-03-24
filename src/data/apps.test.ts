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
});
