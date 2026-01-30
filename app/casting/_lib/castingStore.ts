export type CastingStep1Draft = {
  name: string;
  age: string;
  size: string;
  instagram: string;
  city: string;
};

export type CastingStep2Draft = {
  experience: "none" | "some" | "good" | "performance" | null;
};

export type CastingStep3Draft = {
  comfort: "shy" | "warmup" | "natural" | "needsDirection" | null;
  style: "natural" | "fashion" | "strong" | "guided" | null;
  notes: string;
};

export type CastingDraft = {
  step1?: CastingStep1Draft;
  step2?: CastingStep2Draft;
  step3?: CastingStep3Draft;
};

const KEY = "casting_draft_v1";

export function loadCastingDraft(): CastingDraft {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CastingDraft) : {};
  } catch {
    return {};
  }
}

export function saveCastingDraft(next: CastingDraft) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function updateCastingDraft(patch: Partial<CastingDraft>) {
  const current = loadCastingDraft();
  saveCastingDraft({ ...current, ...patch });
}

export function clearCastingDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
