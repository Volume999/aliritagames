import { describe, expect, it } from "vitest";
import { renderWithNoSession } from "../utils";
import { screen, within } from "@testing-library/react";
import Home from "@/app/page";

describe("Main page", () => {
  it("shows main", () => {
    renderWithNoSession(<Home />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("shows expected heading", () => {
    renderWithNoSession(<Home />);
    const main = screen.getByRole("main");
    expect(
      within(main).getByRole("heading", { level: 1, name: "AliRita Game Hub" }),
    ).toBeInTheDocument();
  });

  it("shows button", () => {
    renderWithNoSession(<Home />);
    const main = within(screen.getByRole("main"));
    const button = main.getByRole("link", { name: "The Button" });
    expect(button).toBeInTheDocument();
    const buttonIcon = within(button).getByRole("presentation");
    expect(buttonIcon).toBeInTheDocument();
    expect(buttonIcon).toHaveAttribute("src", "/button-game.svg");
  });
});
