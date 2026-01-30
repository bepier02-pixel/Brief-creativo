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
  const [finalNotes, setFinalNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const canSend = useMemo(() => {
    return Boolean(fullName.trim() && email.trim() && consent);
  }, [fullName, email, consent]);

  function buildMailto() {
    const draft: any = loadBriefDraft();

    const usage = draft?.step2?.usage ?? "";
    const location = draft?.step2?.location ?? "";
    const mood = draft?.step2?.mood ?? "";

    const timeframeRaw = draft?.step3?.timeframe ?? "";
    const availabilityRaw = draft?.step3?.availability ?? "";
    const periodNotes = draft?.step3?.notes ?? "";
    const specificDate = draft?.step3?.specificDate ?? "";

    // Traduzioni ITA
    const timeframeMap: Record<string, string> = {
      this_month: "Questo mese",
      next_months: "Nei prossimi mesi",
      specific_date: "Data specifica",
    };

    const availabilityMap: Record<string, string> = {
      sunday: "Domenica",
      monday: "Lunedì",
      both: "Domenica o Lunedì",
    };

    const usageMap: Record<string, string> = {
      social: "Social / contenuti",
      portfolio: "Portfolio personale",
      personalBrand: "Brand personale / lavoro",
      other: "Altro",
    };

    const locationMap: Record<string, string> = {
      studio: "Studio",
      outdoor: "Esterni",
      undecided: "Non ho deciso",
    };

    const timeframe = timeframeMap[timeframeRaw] ?? "-";
    const availability = availabilityMap[availabilityRaw] ?? "-";
    const usageLabel = usageMap[usage] ?? (usage || "-");
    const locationLabel = locationMap[location] ?? (location || "-");

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
      `Utilizzo: ${usageLabel}`,
      `Dove: ${locationLabel}`,
      `Mood / Stile: ${mood || "-"}`,
      "",
      "TEMPISTICHE",
      `Periodo: ${timeframe}`,
      timeframeRaw === "specific_date" && specificDate ? `Data: ${specificDate}` : "",
      periodNotes ? `Note: ${periodNotes}` : "",
      "",
      "DISPONIBILITÀ",
      `Giorni: ${availability}`,
      "",
      "NOTE FINALI",
      finalNotes || "-",
      "",
    ].filter(Boolean);

    const body = lines.join("\n");

    // ✅ metti qui la tua email
    const to = "bepier02@gmail.com";

    return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function onSend() {
    if (!canSend) return;

    // 1) costruisco la mail PRIMA (serve leggere i dati)
    const href = buildMailto();

    // 2) apro la mail
    window.location.href = href;

    // 3) azzero TUTTO (Step 2/3 inclusi)
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch {}

    // 4) reset campi step 4
    setFullName("");
    setEmail("");
    setPhone("");
    setFinalNotes("");
    setConsent(false);

    // 5) esco dal flusso (al rientro sarà pulito)
    router.push("/brief/success");
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Dati e invio scheda
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Inserisci i tuoi contatti e invia il briefing.
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Nome e cognome *">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={input}
            placeholder="Es. Mario Rossi"
            autoComplete="name"
          />
        </Field>

        <Field label="Email *">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
            placeholder="Es. nome@email.it"
            autoComplete="email"
          />
        </Field>

        <Field label="Telefono (facoltativo)">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={input}
            placeholder="Es. +39..."
            autoComplete="tel"
          />
        </Field>
      </section>

      <section className="space-y-3">
        <div className="text-[13.5px] text-[#6F6F6F]">Note finali (facoltative)</div>
        <textarea
          value={finalNotes}
          onChange={(e) => setFinalNotes(e.target.value)}
          rows={6}
          placeholder="Ultime informazioni utili…"
          className={textarea}
        />
      </section>

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

const input =
  "w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10";

const textarea =
  "w-full rounded-[18px] border border-[#DED9CF] bg-[#FBFAF7] px-5 py-4 text-[14.5px] leading-7 text-[#0F0F0F] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-black/10";
