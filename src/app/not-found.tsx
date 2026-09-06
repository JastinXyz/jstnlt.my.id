import Character from "@/components/character";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar lost />

      <main className="shell pt-16 md:pt-24">
        <div className="grid items-end gap-x-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="display tnum text-display leading-none">404</p>
            <h1 className="display-sm mt-4 text-xl md:text-2xl">
              That page isn’t here<span className="text-accent">.</span>
            </h1>
            <p className="prose mt-4">
              The link is either old or mistyped. Everything that does exist is one row up.
            </p>

            <Link
              href="/"
              className="label mt-8 inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-150 hover:text-accent-text"
            >
              Back home <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Breathing only here. A page nobody meant to land on is not a toy. */}
          <Character
            variant="lost"
            className="char mt-12 h-[240px] justify-self-end md:col-span-4 md:mt-0 md:h-[320px]"
          />
        </div>
      </main>
    </>
  );
}
