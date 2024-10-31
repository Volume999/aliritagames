"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-black border-b-2 border-black"
      : "text-gray-600 hover:text-black transition-colors";
  };

  return (
    <header className="font-sans border-b">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="text-xl font-medium">
            AliRitaGames
          </Link>

          {/* Main Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/guess" className={`${isActive("/about")} py-1`}>
              Play Guess
            </Link>
            <Link href="/about" className={`${isActive("/about")} py-1`}>
              About
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-black transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
