import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renderizza placeholder e valore", () => {
    const onChange = vi.fn();
    render(<SearchBar value="test" onChange={onChange} />);
    const input = screen.getByPlaceholderText(/Cerca un'app/i);
    expect(input).toHaveValue("test");
  });

  it("chiama onChange quando si digita", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    await user.type(screen.getByPlaceholderText(/Cerca un'app/i), "abc");
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls.at(-1)?.[0];
    expect(last).toBe("c");
  });

  it("pulsante clear azzera tramite onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="x" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /Cancella ricerca/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
