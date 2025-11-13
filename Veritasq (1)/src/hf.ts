/// <reference types="vite/client" />
// src/lib/hf.ts  (or src/hf.ts if that's your path)

// Local copy of the FileData shape so we don't depend on types.
type FileData = { url?: string; name?: string };

async function loadGradioClient(): Promise<{ Client: any }> {
  try {
    // Try local dependency (if installed). Use a variable so TS doesn't try to resolve it.
    const localSpecifier = "@gradio/client" as string;
    const mod: any = await import(/* @vite-ignore */ localSpecifier);
    return { Client: mod.Client ?? mod.default ?? mod };
  } catch {
    // Fallback to CDN if not installed
    const cdnSpecifier = "https://esm.sh/@gradio/client@latest?bundle";
    const mod: any = await import(/* @vite-ignore */ cdnSpecifier);
    return { Client: mod.Client ?? mod.default ?? mod };
  }
}

export type ClauseResult = {
  clause: string;
  verdict: "Fully" | "Partially" | "Insufficient" | string;
  evidence: string | string[];
  gaps: string | string[];
};

export type ValidationResponse = {
  file: string;
  results: ClauseResult[];
};

// Normalize Gradio Dataframe output to rows
function normalizeDataframe(df: any): { headers: string[]; rows: any[][] } {
  if (df && Array.isArray(df.data) && Array.isArray(df.headers)) {
    return { headers: df.headers, rows: df.data };
  }
  if (Array.isArray(df)) return { headers: [], rows: df };
  return { headers: [], rows: [] };
}

export async function validateWithSpace(
  file: File,
  kPerCheck = 8,
  modelName = "intfloat/e5-base-v2"
): Promise<{
  filename: string;
  table: { headers: string[]; rows: any[][] };
  csvUrl?: string;
  summaryMd: string;
}> {
  // These require Vite env typings (see env.d.ts below)
  const SPACE_ID = import.meta.env.VITE_HF_SPACE_ID || "Sanjai2004/Veritasq";
  const TOKEN = import.meta.env.VITE_HF_TOKEN; // optional

  const { Client } = await loadGradioClient();
  const client = await Client.connect(SPACE_ID, { hf_token: TOKEN });

  const payload = {
    file,
    k_per_check: kPerCheck,
    model_name: modelName,
  };

  let result: any;
  try {
    result = await client.predict("/validate", payload as Record<string, any>);
  } catch {
    result = await client.predict(0, payload as Record<string, any>);
  }

  const [nameOut, df, csvFile, summaryMd] = result?.data ?? [];

  let csvUrl: string | undefined;
  if (csvFile && (csvFile as FileData).url) {
    csvUrl = (csvFile as FileData).url;
  }

  const table = normalizeDataframe(df);
  return {
    filename: nameOut || file.name,
    table,
    csvUrl,
    summaryMd: summaryMd || "",
  };
}
