"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

type CastingGoal = "evaluation" | "testShoot" | "unsure";

export default function CastingPage() {
  const router = useRouter();

  const [goal, setGoal] = useState<CastingGoal | null>(null);
  const [age, setAge] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [experience, setExperience] = useState<"none" | "some" | "pro" | null>(null);
  const [links, setLinks] = useState<string>("");

  const canContinue = useMemo(() => {
    return Boolean(goal && age.trim() && city.trim());
  }, [goal, age, city]);

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
              style={{ background: selected ? ACCENT : "rgba(15,15,15,0.18)" }}
              aria-hidden
            />
            <div
              className="h-px w-10"
              style={{ background: selected ? ACCENT : "rgba(15,15,15,0.12)" }}
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
          Casting / percorso di valutazione
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Ti faccio qualche domanda rapida per capire il tuo obiettivo e valutare
          il percorso più adatto.
        </p>

        {/* linea accent */}
        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* Obiettivo */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Cosa cerchi dal casting?
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Seleziona l’opzione più vicina.
          </div>
        </div>

        <div className="grid gap-4">
          <Card
            selected={goal === "evaluation"}
            title="Valutazione e feedback"
            desc="Voglio capire punti di forza, postura, fotogenia e margini di crescita."
            onClick={() => setGoal("evaluation")}
          />
          <Card
            selected={goal === "testShoot"}
            title="Mettermi alla prova su un set"
            desc="Voglio fare un’esperienza guidata e vedere come rendo in camera."
            onClick={() => setGoal("testShoot")}
          />
          <Card
            selected={goal === "unsure"}
            title="Non sono sicura/o"
            desc="Voglio parlarne e capire se ha senso intraprendere un percorso."
            onClick={() => setGoal("unsure")}
          />
        </div>
      </section>

      {/* Dati rapidi */}
      <section className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <div className="text-[13.5px] text-[#6F6F6F]">Età *</div>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            inputMode="numeric"
            placeholder="Es. 22"
            className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </label>

        <label className="space-y-2">
          <div className="text-[13.5px] text-[#6F6F6F]">Città *</div>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Es. Milano"
            className="w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </label>
      </section>

      {/* Esperienza */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Esperienza precedente
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Giusto per contestualizzare.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card
            selected={experience === "none"}
            title="Nessuna"
            desc="È la prima volta o quasi."
            onClick={() => setExperience("none")}
          />
          <Card
            selected={experience === "some"}
            title="Un po’"
            desc="Qualche shooting, ma non regolare."
            onClick={() => setExperience("some")}
          />
          <Card
            selected={experience === "pro"}
            title="Buona"
            desc="Ho già esperienza e set strutturati."
            onClick={() => setExperience("pro")}
          />
        </div>
      </section>

      {/* Link */}
      <section className="space-y-3">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">
            Link / riferimento (facoltativo)
          </div>
          <div className="text-[13.5px] text-[#6F6F6F]">
            Instagram, portfolio, Drive, ecc.
          </div>
        </div>

        <textarea
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          rows={4}
          placeholder="Incolla qui uno o più link…"
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
          onClick={() => router.push("/casting/step-1")}
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
