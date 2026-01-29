"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

type Usage = "social" | "portfolio" | "casting" | "personalBrand" | "other";
type LocationPref = "studio" | "outdoor" | "indoor" | "undecided";
type Timing = "asap" | "2weeks" | "1month" | "flexible";

export default function BriefStep2Page() {
  const router = useRouter();

  const [usage, setUsage] = useState<Usage | null>(null);
  const [location, setLocation] = useState<LocationPref | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const [mood, setMood] = useState<string>("");

  const canContinue = useMemo(() => {
    return Boolean(usage && location && timing);
  }, [usage, location, timing]);

  const ChoiceCard = ({
    selected,
    title,
    desc,
    onClick,
  }: {
    selected: boolean;
    title: string;
    desc: string;
    onClick: () => void;
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
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
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[17px] font-medium tracking-tight text-[#0F0F0F]">
              {title}
            </div>
            <p className="text-[14.5px] leading-7 text-[#6F6F6F]">{desc}</p>
          </div>

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
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#0F0F0F]">
      {/* Header brand */}
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

          <div className="text-xs tracking-wide text-[#7A7A7A]">
            PASSO <span className="text-[#0F0F0F]/70">2</span> / 6
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-5 py-10 md:py-14">
        <div className="space-y-10">
          {/* Titolo */}
          <div className="space-y-3">
            <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
              Definiamo il risultato che vuoi ottenere
            </h1>
            <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
              Mi aiuta a capire lo stile, le scelte di set e cosa consegnarti in
              modo più efficace.
            </p>

            {/* linea accent */}
            <div className="pt-2">
              <div className="h-px w-28 bg-[#DED9CF]" />
              <div
                className="-mt-px h-[2px] w-10"
                style={{ background: ACCENT }}
              />
            </div>
          </div>

          {/* 1) Uso */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="text-[15px] font-medium text-[#0F0F0F]">
                A cosa ti serviranno principalmente le foto?
              </div>
              <div className="text-[13.5px] text-[#6F6F6F]">
                Scegli l’opzione più vicina al tuo obiettivo.
              </div>
            </div>

            <div className="grid gap-4">
              <ChoiceCard
                selected={usage === "social"}
                title="Social / contenuti"
                desc="Immagini pensate per Instagram, TikTok e comunicazione continua."
                onClick={() => setUsage("social")}
              />
              <ChoiceCard
                selected={usage === "portfolio"}
                title="Portfolio personale"
                desc="Scatti curati per presentarti al meglio e costruire immagine."
                onClick={() => setUsage("portfolio")}
              />
              <ChoiceCard
                selected={usage === "casting"}
                title="Casting / agenzia"
                desc="Immagini più tecniche, leggibili e coerenti con gli standard."
                onClick={() => setUsage("casting")}
              />
              <ChoiceCard
                selected={usage === "personalBrand"}
                title="Brand personale / lavoro"
                desc="Immagini professionali per sito, LinkedIn o comunicazione business."
                onClick={() => setUsage("personalBrand")}
              />
              <ChoiceCard
                selected={usage === "other"}
                title="Altro"
                desc="Se l’obiettivo è diverso, scegli questa opzione e descrivilo sotto."
                onClick={() => setUsage("other")}
              />
            </div>
          </section>

          {/* 2) Location */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="text-[15px] font-medium text-[#0F0F0F]">
                Hai già una preferenza sul luogo?
              </div>
              <div className="text-[13.5px] text-[#6F6F6F]">
                Va bene anche “non so ancora”.
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ChoiceCard
                selected={location === "studio"}
                title="Studio"
                desc="Controllo totale su luce, styling e set."
                onClick={() => setLocation("studio")}
              />
              <ChoiceCard
                selected={location === "outdoor"}
                title="Esterni"
                desc="Atmosfera naturale, ambienti urbani o paesaggio."
                onClick={() => setLocation("outdoor")}
              />
              <ChoiceCard
                selected={location === "indoor"}
                title="Interni"
                desc="Casa, location, hotel o spazi particolari."
                onClick={() => setLocation("indoor")}
              />
              <ChoiceCard
                selected={location === "undecided"}
                title="Non ho deciso"
                desc="Valutiamolo insieme in base al mood."
                onClick={() => setLocation("undecided")}
              />
            </div>
          </section>

          {/* 3) Tempistiche */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="text-[15px] font-medium text-[#0F0F0F]">
                Tempistiche desiderate
              </div>
              <div className="text-[13.5px] text-[#6F6F6F]">
                Anche un’indicazione approssimativa va benissimo.
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ChoiceCard
                selected={timing === "asap"}
                title="Il prima possibile"
                desc="Ho urgenza o una scadenza vicina."
                onClick={() => setTiming("asap")}
              />
              <ChoiceCard
                selected={timing === "2weeks"}
                title="Entro 2 settimane"
                desc="Vorrei organizzarmi a breve."
                onClick={() => setTiming("2weeks")}
              />
              <ChoiceCard
                selected={timing === "1month"}
                title="Entro 1 mese"
                desc="Programmiamo con calma."
                onClick={() => setTiming("1month")}
              />
              <ChoiceCard
                selected={timing === "flexible"}
                title="Flessibile"
                desc="Sono aperta/o a diverse date."
                onClick={() => setTiming("flexible")}
              />
            </div>
          </section>

          {/* 4) Mood / riferimenti */}
          <section className="space-y-3">
            <div className="space-y-1">
              <div className="text-[15px] font-medium text-[#0F0F0F]">
                Mood, stile o riferimenti (facoltativo)
              </div>
              <div className="text-[13.5px] text-[#6F6F6F]">
                Puoi descrivere lo stile che ami, o incollare link (Pinterest,
                Instagram, siti).
              </div>
            </div>

            <textarea
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              rows={5}
              placeholder="Esempio: luce morbida, mood editoriale, toni caldi… Link: https://..."
              className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </section>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => router.push("/brief")}
              className="rounded-lg px-5 py-3 text-sm text-[#0F0F0F] transition hover:opacity-80"
              style={{
                border: "1px solid rgba(15,15,15,0.12)",
                background: "rgba(251,250,247,0.9)",
              }}
            >
              Indietro
            </button>

            <button
              type="button"
              disabled={!canContinue}
              onClick={() => router.push("/brief/step-3")}
              className="rounded-lg px-6 py-3 text-sm text-[#F6F4EF] transition disabled:opacity-40"
              style={{
                background: "#0F0F0F",
                boxShadow: canContinue
                  ? "0 14px 40px rgba(15,15,15,0.18)"
                  : "none",
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
