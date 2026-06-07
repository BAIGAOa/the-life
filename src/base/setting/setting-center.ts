import type { SettingEntry } from './types.js';

const settings = new Map<string, SettingEntry>();

export function registerSetting(entry: SettingEntry): void {
  if (settings.has(entry.id)) {
    throw new Error(`Setting with id "${entry.id}" is already registered.`);
  }
  settings.set(entry.id, entry);
}

export function getSetting(id: string): SettingEntry | undefined {
  return settings.get(id);
}

export function getAllSettings(): SettingEntry[] {
  return [...settings.values()];
}
