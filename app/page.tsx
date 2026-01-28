"use client";

import { useState } from "react";
import Image from "next/image";

type Purpose = "personal" | "casting";

const ACCENT = "#B89B5E"; // oro caldo (accento brand)

export default function BriefPage() {
  const [purpose, setPurpose] = useState<Purpose | null>(null);

  const Card = ({
    value,
    title,
    desc,
  }: {
    value: Purpose;
    title: string;
    desc: string;
  }) => {
    const selected = purpose === value;

    return (
      <button
        type="button"
        onClick={() => setPurpose(value)}
        className={[
          "w-full text-left rounded-[20px] border px-6 py-6 transition",
          "bg-[#FBFAF7] border-[#DED9CF] hover:border-black/25",
          "focus:outline-none focus:ring-2 focus:ring-black/10",
        ].join(" ")}
        style={{
          borderColor: selected ? "rgba(15,15,15,0.40)" : "#DED9CF",
          boxShadow: selected
            ? "0 18px 60px rgba(15,15,15,0.08)"
            : "0 10px 30px rgba(15,15,15,0.04)",
        }}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[17px] font-medium tracking-tight text-[#0F0F0F]">
                {title}
              </div>
              <p className="text-[14.5px] leading-7 text-[#6F6F6F]">{desc}</p>
            </div>

            {/* indicatore selezione (accento) */}
            <div className="flex items-center gap-2 pt-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  background: selected ? ACCENT : "rgba(15,15,15,0.18)",
                }}
                aria-hidden
              />
              <div
                className="h-px w-10"
                style={{
                  background: selected ? ACCENT : "rgba(15,15,15,0.12)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#0F0F0F]">
      {/* Header brand */}
      <header className="sticky top-0 z-10 border-b border-[#DED9CF] bg-[#F6F4EF]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[760px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
<Image
  src="/logo.png"
  alt="Piero Beghi Photography"
  width={260}
  height={60}
  priority
/>

            {/* micro accent */}
            <div className="hidden md:block h-5 w-px bg-[#DED9CF]" />
            <div className="hidden md:block text-xs text-[#6F6F6F]">
              Creative Brief
            </div>
          </div>

          <div className="text-xs tracking-wide text-[#7A7A7A]">
            PASSO <span className="text-[#0F0F0F]/70">1</span> / 6
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-5 py-10 md:py-14">
        <div className="space-y-8">
          {/* Titolo */}
          <div className="space-y-3">
            <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
              Raccontami cosa vuoi realizzare
            </h1>
            <p className="max-w-[62ch] text-[15.5px] leading-7 text-[#6F6F6F]">
              Queste informazioni mi permettono di preparare lo shooting nel modo più adatto a te.
            </p>

            {/* linea accent */}
            <div className="pt-2">
              <div className="h-px w-28 bg-[#DED9CF]" />
              <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-4">
            <Card
              value="personal"
              title="Shooting personale"
              desc="Per raccontare te stessa, la tua immagine, un momento personale o creativo."
            />
            <Card
              value="casting"
              title="Casting / percorso di valutazione"
              desc="Per chi vuole mettersi alla prova su un set, ricevere un feedback professionale e capire, insieme, se esistono doti e possibilità di crescita come fotomodella."
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={!purpose}
              className="rounded-lg px-6 py-3 text-sm text-[#F6F4EF] transition disabled:opacity-40"
              style={{
                background: "#0F0F0F",
                boxShadow: purpose ? "0 14px 40px rgba(15,15,15,0.18)" : "none",
              }}
            >
              Continua
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
