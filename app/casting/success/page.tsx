"use client";

import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

export default function CastingSuccessPage() {
  const router = useRouter();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Richiesta inviata
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Grazie. Ho ricevuto la tua richiesta per il casting. Ti ricontatterò a
          breve per definire disponibilità e organizzazione.
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      <section className="space-y-3 max-w-[70ch]">
        <div className="text-[15px] font-medium text-[#0F0F0F]">
          Cosa succede ora
        </div>
        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-[#0F0F0F]">
          <li>Ti contatto per concordare una data.</li>
          <li>
            Prima del casting ti invierò indicazioni pratiche (outfit e
            preparazione).
          </li>
          <li>Dopo la prova riceverai un feedback e una direzione di percorso.</li>
        </ul>
      </section>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={() => router.push("/brief")}
          className="rounded-lg px-6 py-3 text-sm text-[#F6F4EF] transition"
          style={{
            background: "#0F0F0F",
            boxShadow: "0 14px 40px rgba(15,15,15,0.18)",
          }}
        >
          Torna alla home
        </button>

        <button
          type="button"
          onClick={() => router.push("/casting")}
          className="rounded-lg px-5 py-3 text-sm text-[#0F0F0F] transition hover:opacity-80"
          style={{
            border: "1px solid rgba(15,15,15,0.12)",
            background: "rgba(251,250,247,0.9)",
          }}
        >
          Nuova richiesta casting
        </button>
      </div>
    </div>
  );
}
