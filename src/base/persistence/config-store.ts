import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { createStorage } from '@baigao_h/ink-kit';
import type { ZodType } from 'zod';

const CONFIG_DIR = join(homedir(), '.the-life');
const CONFIG_PATH = join(CONFIG_DIR, 'config.json');

export const store = createStorage({ dir: CONFIG_DIR, file: 'config.json' });

/** Zod schemas for every persisted config key in the application. */
export const ConfigSchemas = {
  /** Theme identifier (matches a filename under assets/themes/). */
  theme: z.string(),
  /** Language identifier (e.g. "zh-CN", "en-US"). */
  language: z.string(),
  /** Per-action shortcut key overrides: actionId → key list. */
  shortcutKeys: z.record(z.string(), z.array(z.string())),
};

/**
 * Synchronously read a persisted preference value, validated against
 * a zod schema.
 *
 * Used at module top level to supply initial values to providers
 * before the first render, avoiding a flash of defaults.
 *
 * @param key          The config key to look up.
 * @param schema       Zod schema to validate the stored value against.
 * @param defaultValue Fallback when the file is missing, corrupt,
 *                     the key does not exist, or the stored value
 *                     fails schema validation.
 */
export function loadPreference<T>(
  key: string,
  schema: ZodType<T>,
  defaultValue: T,
): T {
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf-8');
    const data: unknown = JSON.parse(raw);
    if (typeof data === 'object' && data !== null && key in data) {
      const value = (data as Record<string, unknown>)[key];
      const parsed = schema.safeParse(value);
      if (parsed.success) return parsed.data;
    }
  } catch {
    /* file missing or corrupt — fall through to default */
  }
  return defaultValue;
}

/**
 * Persist a single preference key-value pair to disk.
 *
 * Fire-and-forget; errors are silently swallowed (the preference
 * will be saved on the next change).
 */
export async function savePreference(key: string, value: unknown): Promise<void> {
  try {
    await store.write.schema(key, value);
  } catch {
    /* disk write failed — ignore; no recovery needed */
  }
}
