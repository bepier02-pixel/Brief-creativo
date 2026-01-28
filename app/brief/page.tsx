"use client";

import { useState } from "react";

type Purpose = "personal" | "casting";

const ACCENT = "#B89B5E"; // accento brand (oro caldo)

export default function BriefPage() {
  const [purpose, setPurpose] = useState<Purpose | null>(null);

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#0F0F0F]">
      {/* Header brand */}
      <header className="sticky top-0 z-10 bg-[#F6F4EF]/90 backdrop-blur border-b border-[#DED9CF]">
        <div className="mx-auto w-full max-w-[760px] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo placeholder: lo sostituiamo quando mi dai il file */}
            <div
              className="h-9 w-9 rounded-full border border-[#DED9CF] bg-[#FBFAF7] flex items-center justify-center"
              aria-hidden
              style={{ boxShadow: "0 10px 30px rgba(15,15,15,0.05)" }}
            >
              <div className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
            </div>

            <div className="leading-tight">
              <div className="text-[14px] tracking-[0.18em] uppercase text-[#0F0F0F]">
                Piero Beghi
              </div>
              <div className="text-[12px] text-[#6F6F6F]">
                Photography
              </div>
            </div>
          </div>

          <div className="text-xs tracking-wide text-[#7A7A7A]">
            PASSO <span className="text-[#0F0F0F]/70">1</span> / 6
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-5 py-10 md:py-14">
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl leading-tight tracking-tight">
              Raccontami cosa vuoi realizzare
            </h1>
            <p className="max-w-[60ch] text-[15.5px] leading-7 text-[#6F6F6F]">
              Queste informazioni mi permettono di preparare lo shooting nel modo più adatto a te.
            </p>

            {/* Accent divider */}
            <div className="pt-2">
              <div className="h-px w-24 bg-[#DED9CF]" />
              <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
            </div>
          </div>

          {/* Options */}
          <div className="grid gap-4">
            <OptionCard
              selected={purpose === "personal"}
              onClick={() => setPurpose("personal")}
              title="Shooting personale"
              desc="Per raccontare te stessa, la tua immagine, un momento personale o creativo."
              accent={ACCENT}
            />

            <OptionCard
              selected={purpose === "casting"}
              onClick={() => setPurpose("casting")}
              title="Casting / percorso di valutazione"
              desc="Per chi vuole mettersi alla prova su un set, ricevere un feedback professionale e capire insieme se esistono doti e possibilità di crescita come fotomodella."
              accent={ACCENT}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-2">
            <button
              disabled={!purpose}
              className="rounded-lg px-6 py-3 text-sm transition disabled:opacity-40"
              style={{
                background: purpose ? "#0F0F0F" : "#0F0F0F",
                color: "#F6F4EF",
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

function OptionCard({
  selected,
  onClick,
  title,
  desc,
  accent,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-[20px] border px-6 py-6 text-left transition bg-[#FBFAF7]",
        "border-[#DED9CF] hover:border-black/25",
        selected ? "ring-1 ring-black/10" : "",
      ].join(" ")}
      style={{
        boxShadow: selected ? "0 18px 60px rgba(15,15,15,0.08)" : "0 8px 30px rgba(15,15,15,0.04)",
        borderColor: selected ? "rgba(15,15,15,0.35)" : "#DED9CF",
      }}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[17px] font-medium">{title}</div>

          {/* Accent marker */}
          <div className="flex items-center gap-2 pt-1">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: selected ? accent : "rgba(15,15,15,0.20)" }}
              aria-hidden
            />
            <div
              className="h-px w-10"
              style={{ background: selected ? accent : "rgba(15,15,15,0.12)" }}
              aria-hidden
            />
          </div>
        </div>

        <div className="text-sm leading-7 text-[#6F6F6F]">{desc}</div>
      </div>
    </button>
  );
}
