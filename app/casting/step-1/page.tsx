"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadCastingDraft, updateCastingDraft } from "../_lib/castingStore";

const ACCENT = "#B89B5E";

export default function CastingStep1Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [instagram, setInstagram] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const draft = loadCastingDraft();
    if (draft.step1) {
      setName(draft.step1.name ?? "");
      setAge(draft.step1.age ?? "");
      setSize(draft.step1.size ?? "");
      setInstagram(draft.step1.instagram ?? "");
      setCity(draft.step1.city ?? "");
    }
  }, []);

  const canContinue = useMemo(() => {
    return Boolean(
      name.trim() &&
        age.trim() &&
        size.trim() &&
        instagram.trim() &&
        city.trim()
    );
  }, [name, age, size, instagram, city]);

  function persist() {
    updateCastingDraft({
      step1: { name, age, size, instagram, city },
    });
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Profilo base
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Partiamo da alcune informazioni essenziali per inquadrare il tuo
          profilo.
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Nome *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es. Maria Rossi"
            className={input}
          />
        </Field>

        <Field label="Eta *">
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            inputMode="numeric"
            placeholder="Es. 22"
            className={input}
          />
        </Field>

        <Field label="Taglia *">
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Es. 40 / S / 26"
            className={input}
          />
        </Field>

        <Field label="Citta *">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Es. Milano"
            className={input}
          />
        </Field>
      </section>

      <section className="space-y-2">
        <Field label="Profilo Instagram *">
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@username"
            className={input}
          />
        </Field>
      </section>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            persist();
            router.push("/casting");
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
            router.push("/casting/step-2");
          }}
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <div className="text-[13.5px] text-[#6F6F6F]">{label}</div>
      {children}
    </label>
  );
}

const input =
  "w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10";
