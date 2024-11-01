import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import Navbar from "@/components/navbar/Navbar";
import { renderWithNoSession } from "../../utils";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all navigation links", () => {
    renderWithNoSession(<Navbar />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Play Guess")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
