"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clearCastingDraft, loadCastingDraft } from "../_lib/castingStore";

const ACCENT = "#B89B5E";

export default function CastingStep4Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const canSend = useMemo(() => Boolean(email.trim() && consent), [email, consent]);

  function labelExperience(v: string) {
    const map: Record<string, string> = {
      none: "Nessuna",
      some: "Qualche shooting",
      good: "Buona",
      performance: "Passerella / recitazione / danza",
    };
    return map[v] ?? "-";
  }

  function labelComfort(v: string) {
    const map: Record<string, string> = {
      shy: "Mi blocco / sono timida",
      warmup: "Dopo un po’ mi sciolgo",
      natural: "Mi viene naturale",
      needsDirection: "Ho bisogno di indicazioni chiare",
    };
    return map[v] ?? "-";
  }

  function labelStyle(v: string) {
    const map: Record<string, string> = {
      natural: "Naturale / soft",
      fashion: "Fashion / glamour",
      strong: "Decisa / strong",
      guided: "Non lo so, mi affido",
    };
    return map[v] ?? "-";
  }

  function buildMailto() {
    const draft: any = loadCastingDraft();

    const s1 = draft?.step1 ?? {};
    const s2 = draft?.step2 ?? {};
    const s3 = draft?.step3 ?? {};

    const subject = `Casting — ${s1?.name || "Nuova richiesta"}`;

    const lines: string[] = [
      "NUOVO CASTING / PERCORSO DI VALUTAZIONE",
      "",
      "PROFILO",
      `Nome: ${s1?.name || "-"}`,
      `Età: ${s1?.age || "-"}`,
      `Taglia: ${s1?.size || "-"}`,
      `Instagram: ${s1?.instagram || "-"}`,
      `Città: ${s1?.city || "-"}`,
      "",
      "CONTATTI",
      `Email: ${email || "-"}`,
      `Telefono: ${phone || "-"}`,
      "",
      "ESPERIENZA",
      `Esperienza davanti alla camera: ${labelExperience(s2?.experience || "")}`,
      "",
      "STILE E APPROCCIO",
      `Comfort davanti alla camera: ${labelComfort(s3?.comfort || "")}`,
      `Immagine percepita: ${labelStyle(s3?.style || "")}`,
      s3?.notes ? `Note personali: ${s3.notes}` : "",
      "",
    ].filter(Boolean);

    const body = lines.join("\n");

    const to = "bepier02@gmail.com";

    return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function onSend() {
    if (!canSend) return;

    const href = buildMailto();

    // apre la mail
    window.location.href = href;

    // reset SOLO casting
    clearCastingDraft();

    // reset campi step 4
    setEmail("");
    setPhone("");
    setConsent(false);

    // esco dal flusso
    router.push("/casting/success");
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl leading-tight tracking-tight text-[#0F0F0F]">
          Dati e invio
        </h1>
        <p className="max-w-[70ch] text-[15.5px] leading-7 text-[#6F6F6F]">
          Inserisci i contatti e invia la richiesta. Riceverai un riscontro per organizzare il casting.
        </p>

        <div className="pt-2">
          <div className="h-px w-28 bg-[#DED9CF]" />
          <div className="-mt-px h-[2px] w-10" style={{ background: ACCENT }} />
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="Email *">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Es. nome@email.it"
            className={input}
            autoComplete="email"
          />
        </Field>

        <Field label="Telefono (facoltativo)">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Es. +39..."
            className={input}
            autoComplete="tel"
          />
        </Field>
      </section>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span className="text-[13.5px] leading-6 text-[#6F6F6F]">
          Acconsento al trattamento dei dati per essere ricontattata/o.
        </span>
      </label>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/casting/step-3")}
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
