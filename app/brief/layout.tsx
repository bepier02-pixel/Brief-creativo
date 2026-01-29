import Image from "next/image";

export default function BriefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#0F0F0F]">
      {/* Header condiviso */}
      <header className="sticky top-0 z-10 border-b border-[#DED9CF] bg-[#F6F4EF]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[760px] items-center justify-between px-5 py-5">
          <div className="shrink-0">
            <Image
              src="/logo.png"
              alt="Piero Beghi Photography"
              width={260}
              height={60}
              priority
            />
          </div>

          {/* lo step verrà cambiato più avanti */}
          <div className="text-xs tracking-wide text-[#7A7A7A]">
            BRIEF
          </div>
        </div>
      </header>

      {/* Contenuto della pagina */}
      <main className="mx-auto w-full max-w-[760px] px-5 py-10 md:py-14">
        {children}
      </main>
    </div>
  );
}
