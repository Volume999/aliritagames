"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

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
              <MenuButton className="flex items-center gap-1">
                Games
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              </MenuButton>
              <MenuItems
                anchor={{ to: "bottom start", gap: "4px" }}
                transition
                className="absolute z-50 mt-1 bg-black origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <Link
                    href="/button"
                    className="block mb-1 rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base px-4"
                  >
                    <Image
                      src="/button-game.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    Button
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/guess"
                    className="block mb-1 rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base px-4"
                  >
                    <Image src="/guess.svg" alt="" width={20} height={20} />
                    Guess
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
