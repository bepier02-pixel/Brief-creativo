"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadBriefDraft } from "../_lib/briefStore";

const ACCENT = "#B89B5E";

export default function BriefStep4Page() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState<"sunday" | "monday" | "both" | null>(null);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const canSend = useMemo(() => {
    return Boolean(fullName.trim() && email.trim() && consent);
  }, [fullName, email, consent]);

  function buildMailto() {
  const draft: any = loadBriefDraft();

  // ✅ Legge Step2 anche se i nomi delle chiavi cambiano
  const usage =
    draft?.step2?.usage ??
    draft?.brief?.step2?.usage ??
    draft?.usage ??
    "";

  const location =
    draft?.step2?.location ??
    draft?.brief?.step2?.location ??
    draft?.location ??
    "";

  const mood =
    draft?.step2?.mood ??
    draft?.brief?.step2?.mood ??
    draft?.mood ??
    "";

  // ✅ Legge Step3 anche se i nomi delle chiavi cambiano
  const timeframe =
    draft?.step3?.timeframe ??
    draft?.brief?.step3?.timeframe ??
    draft?.timeframe ??
    "";

  const specificDate =
    draft?.step3?.specificDate ??
    draft?.brief?.step3?.specificDate ??
    draft?.specificDate ??
    "";

  const periodNotes =
    draft?.step3?.notes ??
    draft?.brief?.step3?.notes ??
    draft?.notes ??
    "";

  const subject = `Brief fotografico — ${fullName}`.trim();

  const lines: string[] = [
    "NUOVO BRIEF FOTOGRAFICO",
    "",
    "CONTATTI",
    `Nome: ${fullName}`,
    `Email: ${email}`,
    `Telefono: ${phone || "-"}`,
    "",
    "BRIEF",
    `Utilizzo: ${usage || "-"}`,
    `Dove: ${location || "-"}`,
    `Mood/Stile: ${mood || "-"}`,
    "",
    "TEMPISTICHE (Step 3)",
    `Periodo: ${timeframe || "-"}`,
    `Data specifica: ${specificDate || "-"}`,
    `Note periodo: ${periodNotes || "-"}`,
    "",
    "DISPONIBILITÀ",
    `Giorni: ${availability || "-"}`,
    "",
    "NOTE FINALI",
    notes || "-",
    "",
  ];

  const body = lines.join("\n");

  const to = "bepier02@gmail.com"; // <-- lascia la tua email

  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}


  function onSend() {
    if (!canSend) return;
    window.location.href = buildMailto();
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Dati e invio scheda
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Inserisci i tuoi contatti e invia il briefing. (Preventivo e pacchetto restano separati.)
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      {/* Contatti */}
      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Nome e cognome *">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={input}
            placeholder="Es. Mario Rossi"
          />
        </Field>

        <Field label="Email *">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
            placeholder="Es. nome@email.it"
          />
        </Field>

        <Field label="Telefono (facoltativo)">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={input}
            placeholder="Es. +39..."
          />
        </Field>
      </section>

      {/* Disponibilità */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-[15px] font-medium text-[#0F0F0F]">Disponibilità (giorni)</div>
          <div className="text-[13.5px] text-[#6F6F6F]">Seleziona la tua preferenza.</div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ChoiceCard
            selected={availability === "sunday"}
            title="Domenica"
            desc="Preferisco la domenica."
            onClick={() => setAvailability("sunday")}
          />
          <ChoiceCard
            selected={availability === "monday"}
            title="Lunedì"
            desc="Preferisco il lunedì."
            onClick={() => setAvailability("monday")}
          />
          <ChoiceCard
            selected={availability === "both"}
            title="Entrambi"
            desc="Va bene domenica o lunedì."
            onClick={() => setAvailability("both")}
          />
        </div>
      </section>

      {/* Note */}
      <section className="space-y-3">
        <div className="text-[13.5px] text-[#6F6F6F]">Note (facoltative)</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          placeholder="Vincoli, richieste, riferimenti, cose da evitare…"
          className={textarea}
        />
      </section>

      {/* Consenso */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span className="text-[13.5px] leading-6 text-[#6F6F6F]">
          Acconsento al trattamento dei dati per essere ricontattato/a.
        </span>
      </label>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/brief/step-3")}
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
          disabled={!canSend}
          onClick={onSend}
          className="rounded-lg px-6 py-3 text-sm text-[#F6F4EF] transition disabled:opacity-40"
          style={{
            background: "#0F0F0F",
            boxShadow: canSend ? "0 14px 40px rgba(15,15,15,0.18)" : "none",
          }}
        >
          Invia
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <div className="text-[13.5px] text-[#6F6F6F]">{label}</div>
      {children}
    </label>
  );
}

function ChoiceCard({
  selected,
  title,
  desc,
  onClick,
}: {
  selected: boolean;
  title: string;
  desc: string;
  onClick: () => void;
}) {
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
        boxShadow: selected ? "0 18px 60px rgba(15,15,15,0.08)" : "0 10px 30px rgba(15,15,15,0.04)",
      }}
    >
      <div className="space-y-1">
        <div className="text-[17px] font-medium tracking-tight text-[#0F0F0F]">{title}</div>
        <p className="text-[14.5px] leading-7 text-[#6F6F6F]">{desc}</p>
      </div>
    </button>
  );
}

const input =
  "w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10";
const textarea =
  "w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10";
