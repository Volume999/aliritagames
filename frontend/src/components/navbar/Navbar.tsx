"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="font-sans border-b">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="text-xl font-medium">
            AliRitaGames
          </Link>

          <div className="flex items-center space-x-8 py-1">
            <Menu>
              <MenuButton>Games</MenuButton>
              <MenuItems
                anchor={{ to: "bottom start", gap: "4px" }}
                transition
                className="absolute z-50 mt-1 bg-black origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <Link href="/button" className="block">
                    Button
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
            <Link href="/about">About</Link>
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
