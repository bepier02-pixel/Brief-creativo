"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

type Experience = "none" | "some" | "good" | "performance";

export default function CastingStep2Page() {
  const router = useRouter();

  const [experience, setExperience] = useState<Experience | null>(null);

  const canContinue = useMemo(() => Boolean(experience), [experience]);

  const Card = ({
    value,
    title,
    desc,
  }: {
    value: Experience;
    title: string;
    desc: string;
  }) => {
    const selected = experience === value;

    return (
      <button
        type="button"
        onClick={() => setExperience(value)}
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
          Esperienza davanti alla camera
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Mi aiuta a capire come guidarti sul set e cosa aspettarmi durante la
          prova.
        </p>

        {/* linea accent */}
        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* Cards */}
      <section className="space-y-4">
        <div className="grid gap-4">
          <Card
            value="none"
            title="Nessuna"
            desc="È la prima volta (o quasi)."
          />
          <Card
            value="some"
            title="Qualche shooting"
            desc="Ho fatto qualche prova, ma non regolarmente."
          />
          <Card
            value="good"
            title="Buona"
            desc="Ho già esperienza e so muovermi abbastanza davanti alla camera."
          />
          <Card
            value="performance"
            title="Ho fatto passerella / recitazione / danza"
            desc="Ho una base di presenza scenica e lavoro sul corpo."
          />
        </div>
      </section>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/casting/step-1")}
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
          onClick={() => router.push("/casting/step-3")}
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
