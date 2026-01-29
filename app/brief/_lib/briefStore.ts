export type Step2Draft = {
  usage: "social" | "portfolio" | "personalBrand" | "other" | null;
  location: "studio" | "outdoor" | "undecided" | null;
  mood: string;
};

export type Step3Draft = {
  timeframe: "this_month" | "next_months" | "specific_date" | null;
  specificDate: string;
  notes: string;
};

export type Step4Draft = {
  outputs: {
    jpg: boolean;
    tiff: boolean;
    web: boolean;
    proofs: boolean;
  };
  finalPhotosCount: number | null;
  retouchLevel: "none" | "basic" | "advanced";
  deliveryTiming: string;
  revisionRounds: number | null;
  deliveryChannel: "link" | "ftp" | "physical";
  notes: string;
};

export type BriefDraft = {
  step2?: Step2Draft;
  step3?: Step3Draft;
  step4?: Step4Draft;
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
