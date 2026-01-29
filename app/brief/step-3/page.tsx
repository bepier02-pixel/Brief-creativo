"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

type DayPref = "sunday" | "monday";
type PeriodPref = "thisMonth" | "nextMonth" | "twoThreeMonths" | "toDefine";

export default function BriefStep3Page() {
  const router = useRouter();

  const [day, setDay] = useState<DayPref | null>(null);
  const [period, setPeriod] = useState<PeriodPref | null>(null);
  const [notes, setNotes] = useState<string>("");

  const canContinue = useMemo(() => {
    return Boolean(day && period);
  }, [day, period]);

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
          Disponibilità e periodo
        </h1>
        <p className="max-w-[75ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Lavoro prevalentemente in studio. Di norma gli shooting li tengo la
          domenica e il lunedì. Fammi sapere cosa preferisci.
        </p>

        {/* linea accent */}
        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* 1) Giorno */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Scegli il giorno
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Seleziona quello che preferisci.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ChoiceCard
            selected={day === "sunday"}
            title="Domenica"
            desc="Disponibilità principale."
            onClick={() => setDay("sunday")}
          />
          <ChoiceCard
            selected={day === "monday"}
            title="Lunedì"
            desc="Disponibilità principale."
            onClick={() => setDay("monday")}
          />
        </div>
      </section>

      {/* 2) Periodo */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            In quale periodo vorresti farlo?
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Anche una stima va benissimo.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ChoiceCard
            selected={period === "thisMonth"}
            title="Questo mese"
            desc="Se riusciamo a incastrare le date."
            onClick={() => setPeriod("thisMonth")}
          />
          <ChoiceCard
            selected={period === "nextMonth"}
            title="Mese prossimo"
            desc="Opzione consigliata per organizzarsi bene."
            onClick={() => setPeriod("nextMonth")}
          />
          <ChoiceCard
            selected={period === "twoThreeMonths"}
            title="Tra 2–3 mesi"
            desc="Programmazione con più margine."
            onClick={() => setPeriod("twoThreeMonths")}
          />
          <ChoiceCard
            selected={period === "toDefine"}
            title="Da definire"
            desc="Ne parliamo insieme."
            onClick={() => setPeriod("toDefine")}
          />
        </div>
      </section>

      {/* 3) Note */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Note aggiuntive (facoltative)
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Es. vincoli orari, richieste o altro...
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
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
