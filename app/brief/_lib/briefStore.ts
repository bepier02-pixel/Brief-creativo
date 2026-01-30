export type Step2Draft = {
  usage: "social" | "portfolio" | "personalBrand" | "other" | null;
  location: "studio" | "outdoor" | "undecided" | null;
  mood: string;
};

export type Step3Draft = {
  timeframe: "this_month" | "next_months" | "specific_date" | null;
  specificDate: string;
  notes: string;
  availability: "sunday" | "monday" | "both" | null;
};

export type BriefDraft = {
  step2?: Step2Draft;
  step3?: Step3Draft;
};

const KEY = "brief_draft_v1";

export function loadBriefDraft(): BriefDraft {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BriefDraft) : {};
  } catch {
    return {};
  }
}

export function saveBriefDraft(next: BriefDraft) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function updateBriefDraft(patch: Partial<BriefDraft>) {
  const current = loadBriefDraft();
  saveBriefDraft({ ...current, ...patch });
}
