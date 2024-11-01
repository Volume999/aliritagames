import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            AliRita Game Hub
          </h1>
        </div>
        <div className="grid grid-cols-1 w-fit gap-4 items-center flex-col">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/button"
          >
            <Image src="/button-game.svg" alt="" width={20} height={20} />
            The Button
          </Link>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/guess"
          >
            <Image src="/guess.svg" alt="" width={20} height={20} />
            Guess
          </Link>
        </div>
      </main>
    </div>
  );
}
