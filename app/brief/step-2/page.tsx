"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadBriefDraft, updateBriefDraft } from "../_lib/briefStore";

const ACCENT = "#B89B5E";

type Usage = "social" | "portfolio" | "personalBrand" | "other";
type LocationPref = "studio" | "outdoor" | "undecided";

export default function BriefStep2Page() {
  const router = useRouter();

  const [usage, setUsage] = useState<Usage | null>(null);
  const [location, setLocation] = useState<LocationPref | null>(null);
  const [mood, setMood] = useState<string>("");

  // ✅ carica dati salvati
  useEffect(() => {
    const draft = loadBriefDraft();
    if (draft.step2) {
      setUsage(draft.step2.usage ?? null);
      setLocation(draft.step2.location ?? null);
      setMood(draft.step2.mood ?? "");
    }
  }, []);

  const canContinue = useMemo(() => Boolean(usage && location), [usage, location]);

  function persist() {
    updateBriefDraft({
      step2: { usage, location, mood },
    });
  }

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
        aria-pressed={selected}
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
    <div className="space-y-10">
      {/* Titolo */}
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Definiamo il risultato che vuoi ottenere
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Mi aiuta a capire lo stile, le scelte di set e cosa consegnarti in modo più efficace.
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
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
            selected={usage === "personalBrand"}
            title="Brand personale / lavoro"
            desc="Immagini professionali per sito, LinkedIn o comunicazione business."
            onClick={() => setUsage("personalBrand")}
          />
          <ChoiceCard
            selected={usage === "other"}
            title="Altro"
            desc="Se l’obiettivo è diverso, descrivilo nelle note qui sotto."
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
            Va bene anche “non ho deciso”.
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
            selected={location === "undecided"}
            title="Non ho deciso"
            desc="Valutiamolo insieme in base al mood."
            onClick={() => setLocation("undecided")}
          />
        </div>
      </section>

      {/* 3) Mood */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Mood e stile (facoltativo)
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Se ti va, descrivi l’atmosfera che immagini (luce, emozione, energia).
          </div>
        </div>

        <textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          rows={6}
          placeholder="Esempio: luce morbida, mood editoriale, toni caldi, naturale…"
          className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </section>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            persist();
            router.push("/brief");
          }}
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
          onClick={() => {
            persist();
            router.push("/brief/step-3");
          }}
          className="rounded-lg px-6 py-3 text-sm text-[#F6F4EF] transition disabled:opacity-40"
          style={{
            background: "#0F0F0F",
            boxShadow: canContinue ? "0 14px 40px rgba(15,15,15,0.18)" : "none",
          }}
        >
          Continua
        </button>
      </div>
    </div>
  );
}
