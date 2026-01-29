"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadBriefDraft, updateBriefDraft } from "../_lib/briefStore";

const ACCENT = "#B89B5E";

type Timeframe = "this_month" | "next_months" | "specific_date";

export default function BriefStep3Page() {
  const router = useRouter();

  const [timeframe, setTimeframe] = useState<Timeframe | null>(null);
  const [specificDate, setSpecificDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const draft = loadBriefDraft();
    if (draft.step3) {
      setTimeframe(draft.step3.timeframe ?? null);
      setSpecificDate(draft.step3.specificDate ?? "");
      setNotes(draft.step3.notes ?? "");
    }
  }, []);

  const canContinue = useMemo(() => {
    if (!timeframe) return false;
    if (timeframe === "specific_date") return Boolean(specificDate);
    return true;
  }, [timeframe, specificDate]);

  function persist() {
    updateBriefDraft({
      step3: {
        timeframe,
        specificDate,
        notes,
      },
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
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Tempistiche
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Seleziona il periodo preferito. È solo un’indicazione, poi ci organizziamo insieme.
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <ChoiceCard
            selected={timeframe === "this_month"}
            title="Questo mese"
            desc="Preferibilmente entro fine mese."
            onClick={() => setTimeframe("this_month")}
          />
          <ChoiceCard
            selected={timeframe === "next_months"}
            title="Mesi successivi"
            desc="Anche nel prossimo periodo va bene."
            onClick={() => setTimeframe("next_months")}
          />
          <ChoiceCard
            selected={timeframe === "specific_date"}
            title="Data specifica"
            desc="Ho una data precisa."
            onClick={() => setTimeframe("specific_date")}
          />
        </div>
      </section>

      {timeframe === "specific_date" && (
        <section className="space-y-2">
          <div className="text-[13.5px] text-[#6F6F6F]">Seleziona una data</div>
          <input
            type="date"
            value={specificDate}
            onChange={(e) => setSpecificDate(e.target.value)}
            className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </section>
      )}

      <section className="space-y-3">
        <div className="text-[13.5px] text-[#6F6F6F]">Note periodo (facoltative)</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Vincoli, finestre orarie, preferenze…"
          className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </section>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            persist();
            router.push("/brief/step-2");
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
            router.push("/brief/step-4");
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
