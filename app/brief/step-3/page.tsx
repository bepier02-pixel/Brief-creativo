"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

type DayPref = "sunMon" | "weekend" | "weekdays" | "flexible";
type SessionType = "studio" | "outdoor" | "indoor" | "undecided";

export default function BriefStep3Page() {
  const router = useRouter();

  const [session, setSession] = useState<SessionType | null>("studio");
  const [days, setDays] = useState<DayPref | null>("sunMon");
  const [area, setArea] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const canContinue = useMemo(() => {
    return Boolean(session && days && area.trim().length >= 2);
  }, [session, days, area]);

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
          Organizziamo logistica e disponibilità
        </h1>
        <p className="max-w-[75ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Lavoro prevalentemente in studio. Di norma gli shooting li tengo la
          domenica e il lunedì, ma possiamo valutare anche altri giorni.
          Per distanze maggiori ci accordiamo insieme.
        </p>

        {/* linea accent */}
        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* 1) Tipo sessione */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Preferisci studio o location?
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Se non sei sicuro/a, va benissimo: lo definiamo insieme.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ChoiceCard
            selected={session === "studio"}
            title="Studio"
            desc="Opzione consigliata: controllo totale su luce e set."
            onClick={() => setSession("studio")}
          />
          <ChoiceCard
            selected={session === "outdoor"}
            title="Esterni"
            desc="Urbano o naturale, in base al mood."
            onClick={() => setSession("outdoor")}
          />
          <ChoiceCard
            selected={session === "indoor"}
            title="Interni / location"
            desc="Casa, hotel, spazi particolari (da valutare)."
            onClick={() => setSession("indoor")}
          />
          <ChoiceCard
            selected={session === "undecided"}
            title="Non ho deciso"
            desc="Valutiamolo insieme in base all’obiettivo."
            onClick={() => setSession("undecided")}
          />
        </div>
      </section>

      {/* 2) Giorni preferiti */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Giorni preferiti
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Indica la tua disponibilità: aiuta a trovare la data più adatta.
          </div>
        </div>

        <div className="grid gap-4">
          <ChoiceCard
            selected={days === "sunMon"}
            title="Domenica / Lunedì"
            desc="Preferenza ideale per organizzare lo shooting."
            onClick={() => setDays("sunMon")}
          />
          <ChoiceCard
            selected={days === "weekend"}
            title="Weekend"
            desc="Se ti è più comodo/a, valutiamo anche il sabato."
            onClick={() => setDays("weekend")}
          />
          <ChoiceCard
            selected={days === "weekdays"}
            title="In settimana"
            desc="Possibile in base a disponibilità e organizzazione."
            onClick={() => setDays("weekdays")}
          />
          <ChoiceCard
            selected={days === "flexible"}
            title="Flessibile"
            desc="Mi adatto: scegliamo insieme la soluzione migliore."
            onClick={() => setDays("flexible")}
          />
        </div>
      </section>

      {/* 3) Zona */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Città / zona di riferimento
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Scrivi l’area in cui ti trovi o dove vorresti fare lo shooting.
          </div>
        </div>

        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Es. città, zona o provincia"
          className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </section>

      {/* 4) Note */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Note logistiche (facoltative)
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Es. vincoli orari, distanze, disponibilità particolari, richieste.
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Scrivi qui eventuali dettagli utili…"
          className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </section>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/brief/step-2")}
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
          onClick={() => router.push("/brief/step-4")}
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
