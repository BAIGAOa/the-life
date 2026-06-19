import { store, ConfigSchemas } from "../persistence/config-store.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { KeyboardAction } from "./types.js";

const actions = new Map<string, Map<string, KeyboardAction>>()

export function registerAction(action: KeyboardAction) {
  if(!actions.has(action.cat)){
    actions.set(action.cat, new Map<string, KeyboardAction >())
  }
  
  const cat = actions.get(action.cat)!
  
  if(cat.has(action.actionId))return

  cat.set(action.actionId, action)
}

export function modifyActionKeys(actionId: string, category: string, keys: string[]) {
  const cat = actions.get(category)
  if (!cat) return
  const action = cat.get(actionId)
  if (!action) return

  action.keys = keys
}

export function getAllAction() {
  const merged = new Map<string, KeyboardAction>()

  for (const [, catMap] of actions) {
    for (const [actionId, entry] of catMap) {
      merged.set(actionId, entry)
    }
  }

  return Array.from(merged.values())
}

export function hasKeys(entry: { keys?: string[] }): entry is { keys: string[] } {
  return entry.keys !== undefined;
}

export function getActionCategories() {
  const result: { id: string; items: KeyboardAction[] }[] = []

  for (const [catId, catMap] of actions) {
    result.push({
      id: catId,
      items: Array.from(catMap.values()),
    })
  }

  return result
}

/**
 * Persist all registered action keys to disk as a full snapshot
 * (`Record<actionId, string[]>`). Called after every key rebind.
 */
export async function persistShortcutKeySettings() {
  const snapshot: Record<string, string[]> = {}
  for (const [, catMap] of actions) {
    for (const [actionId, action] of catMap) {
      if (action.keys && action.keys.length > 0) {
        snapshot[actionId] = action.keys
      }
    }
  }
  await store.write.schema("shortcutKeys", snapshot)
}

/**
 * Synchronously load persisted key overrides from disk and apply them
 * to the in-memory actions Map.
 *
 * Must be called after {@link registerAllActions} and before
 * `defineShortcutAction` so that shortcuts are registered with the
 * user-customised keys.
 */
export function loadShortcutKeySettings() {
  const CONFIG_PATH = join(homedir(), '.the-life', 'config.json');

  let raw: string;
  try {
    raw = readFileSync(CONFIG_PATH, 'utf-8');
  } catch {
    /* File does not exist (first run) — no overrides to apply */
    return;
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (cause) {
    process.stderr.write(
      `[the-life] Failed to parse config file at ${CONFIG_PATH}: ${String(cause)}\n`
    );
    process.exit(1);
  }

  if (typeof data !== 'object' || data === null) {
    process.stderr.write(
      `[the-life] Config file at ${CONFIG_PATH} is not a valid JSON object\n`
    );
    process.exit(1);
  }

  const overrides = (data as Record<string, unknown>)['shortcutKeys'];

  /* No overrides key — first run or never customised */
  if (overrides === undefined) return;

  if (Array.isArray(overrides)) {
    /* Legacy format from older versions — skip and overwrite on next persist */
    process.stderr.write(
      `[the-life] Config key "shortcutKeys" is in legacy array format; ignoring\n`
    );
    return;
  }

  const parsed = ConfigSchemas.shortcutKeys.safeParse(overrides);
  if (!parsed.success) {
    process.stderr.write(
      `[the-life] Config key "shortcutKeys" is invalid: ${parsed.error.message}\n`
    );
    process.exit(1);
  }

  for (const [actionId, keys] of Object.entries(parsed.data)) {
    /* Find the category this actionId belongs to and apply the override */
    for (const catMap of actions.values()) {
      const action = catMap.get(actionId);
      if (action) {
        action.keys = keys;
        break;
      }
    }
    /* Unknown actionId — silently skip (action may have been removed) */
  }
}
