import Image from "next/image";
import Link from "next/link";
import { CompassIcon, HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6 text-black">
      
      {/* Marca d'água */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/img/logo/logoPreta.png"
          alt=""
          width={900}
          height={900}
          priority
          className="h-auto w-[700px] max-w-[90vw] object-contain opacity-[0.035]"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-[10rem] font-extrabold leading-none tracking-tighter">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold">
          Página não encontrada
        </h2>

        <p className="mt-3 max-w-md text-sm text-black/60">
          A página que você procura pode ter sido movida,
          removida ou não existe.
        </p>

        <div className="mt-8 flex gap-2">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80"
          >
            <HomeIcon className="mr-2 size-4" />
            Início
          </Link>

          <Link
            href="/#formulario"
            className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5"
          >
            <CompassIcon className="mr-2 size-4" />
            Fazer orçamento
          </Link>
        </div>
      </div>
    </main>
  );
}