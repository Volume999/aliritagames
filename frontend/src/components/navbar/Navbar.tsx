"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
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

          <div className="flex items-center space-x-8">
            <Link href="/guess" className={`${isActive("/guess")} py-1`}>
              Play Guess
            </Link>
            <Link href="/about" className={`${isActive("/about")} py-1`}>
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="font-medium">
                  {session.user?.name || session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
