import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { createStorage } from '@baigao_h/ink-kit';

const CONFIG_DIR = join(homedir(), '.the-life');
const CONFIG_PATH = join(CONFIG_DIR, 'config.json');

export const store = createStorage({ dir: CONFIG_DIR, file: 'config.json' });

/**
 * Synchronously read a persisted preference value.
 *
 * Used at module top level to supply initial values to providers
 * before the first render, avoiding a flash of defaults.
 *
 * @param key          The config key to look up.
 * @param defaultValue Fallback when the file is missing, corrupt,
 *                     or the key does not exist / has the wrong type.
 */
export function loadPreference<T>(key: string, defaultValue: T): T {
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf-8');
    const data: unknown = JSON.parse(raw);
    if (typeof data === 'object' && data !== null && key in data) {
      const value = (data as Record<string, unknown>)[key];
      if (typeof value === typeof defaultValue) return value as T;
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
    await store.write.any(key, value);
  } catch {
    /* disk write failed — ignore; no recovery needed */
  }
}
