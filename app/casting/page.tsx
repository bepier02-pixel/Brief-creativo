"use client";

import { useRouter } from "next/navigation";

const ACCENT = "#B89B5E";

export default function CastingPage() {
  const router = useRouter();

  return (
    <div className="space-y-10">
      {/* Titolo */}
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Casting / percorso di valutazione
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Questo percorso è pensato per chi vuole mettersi alla prova su un set,
          ricevere un feedback professionale e capire se esistono doti e
          possibilità di crescita nel mondo della fotografia e della moda.
        </p>

        {/* linea accent */}
        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* Contenuto */}
      <section className="space-y-6 max-w-[70ch]">
        <p className="text-[15.5px] leading-7 text-[#0F0F0F]">
          Il casting non è un servizio fotografico tradizionale, ma un momento di
          valutazione e confronto. Serve a capire insieme:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-[15px] leading-7 text-[#0F0F0F]">
          <li>come ti muovi davanti alla camera</li>
          <li>come reagisci alla luce e alle indicazioni</li>
          <li>che tipo di immagine puoi costruire</li>
          <li>se e come può avere senso un percorso successivo</li>
        </ul>

        <p className="text-[15.5px] leading-7 text-[#6F6F6F]">
          Non è richiesta esperienza precedente.
        </p>
      </section>

      {/* CTA */}
      <div className="flex gap-4 pt-4">
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
          onClick={() => router.push("/casting/step-1")}
          className="rounded-lg px-6 py-3 text-sm text-[#F6F4EF] transition"
          style={{
            background: "#0F0F0F",
            boxShadow: "0 14px 40px rgba(15,15,15,0.18)",
          }}
        >
          Inizia il percorso
        </button>
      </div>
    </div>
  );
}
