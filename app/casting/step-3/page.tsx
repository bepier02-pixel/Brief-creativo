"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

type Comfort = "shy" | "warmup" | "natural" | "needsDirection";
type Style = "natural" | "fashion" | "strong" | "guided";

export default function CastingStep3Page() {
  const router = useRouter();

  const [comfort, setComfort] = useState<Comfort | null>(null);
  const [style, setStyle] = useState<Style | null>(null);
  const [notes, setNotes] = useState("");

  const canContinue = useMemo(() => Boolean(comfort && style), [comfort, style]);

  const Card = ({
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
          Stile e approccio
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Mi aiuta a capire come guidarti sul set e che tipo di immagine ti
          rappresenta di più.
        </p>

        {/* linea accent */}
        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* Comfort */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Come ti senti davanti alla camera?
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Scegli l’opzione più vicina.
          </div>
        </div>

        <div className="grid gap-4">
          <Card
            selected={comfort === "shy"}
            title="Mi blocco / sono timida"
            desc="All’inizio faccio fatica."
            onClick={() => setComfort("shy")}
          />
          <Card
            selected={comfort === "warmup"}
            title="Dopo un po’ mi sciolgo"
            desc="Ho bisogno di qualche minuto per ingranare."
            onClick={() => setComfort("warmup")}
          />
          <Card
            selected={comfort === "natural"}
            title="Mi viene naturale"
            desc="Mi muovo con facilità davanti alla camera."
            onClick={() => setComfort("natural")}
          />
          <Card
            selected={comfort === "needsDirection"}
            title="Ho bisogno di indicazioni chiare"
            desc="Rendo meglio con guida e feedback continui."
            onClick={() => setComfort("needsDirection")}
          />
        </div>
      </section>

      {/* Stile */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Che immagine ti rappresenta di più?
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Anche “non lo so” va benissimo.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card
            selected={style === "natural"}
            title="Naturale / soft"
            desc="Pulita, semplice, autentica."
            onClick={() => setStyle("natural")}
          />
          <Card
            selected={style === "fashion"}
            title="Fashion / glamour"
            desc="Più editoriale, curata, d’impatto."
            onClick={() => setStyle("fashion")}
          />
          <Card
            selected={style === "strong"}
            title="Decisa / strong"
            desc="Energia, intensità, presenza."
            onClick={() => setStyle("strong")}
          />
          <Card
            selected={style === "guided"}
            title="Non lo so, mi affido"
            desc="Preferisco essere guidata/o."
            onClick={() => setStyle("guided")}
          />
        </div>
      </section>

      {/* Note */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Note personali (facoltative)
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Limiti, cose da evitare, insicurezze, richieste particolari.
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          placeholder="Scrivi qui…"
          className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </section>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/casting/step-2")}
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
          onClick={() => router.push("/casting/step-4")}
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
  );
}
