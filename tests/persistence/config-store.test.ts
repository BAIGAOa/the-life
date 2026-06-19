import { describe, it, expect, beforeEach, vi } from 'vitest';
import { z } from 'zod';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const testDir = join(os.tmpdir(), `the-life-persistence-test-${Date.now()}`);

vi.mock('node:os', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:os')>();
  return {
    ...actual,
    homedir: () => testDir,
  };
});

function configPath() {
  return join(testDir, '.the-life', 'config.json');
}

function writeConfig(data: unknown) {
  const dir = join(testDir, '.the-life');
  mkdirSync(dir, { recursive: true });
  writeFileSync(configPath(), JSON.stringify(data), 'utf-8');
}

beforeEach(async () => {
  await vi.resetModules();
  try { rmSync(testDir, { recursive: true }); } catch { /* not created yet */ }
});

async function freshModule() {
  return import('../../src/base/persistence/config-store.js');
}

const stringSchema = z.string();
const recordSchema = z.record(z.string(), z.array(z.string()));

describe('config-store', () => {
  describe('loadPreference', () => {
    it('returns parsed value when file, key, and schema all match', async () => {
      writeConfig({ language: 'en-US' });
      const { loadPreference } = await freshModule();

      const result = loadPreference('language', stringSchema, 'zh-CN');
      expect(result).toBe('en-US');
    });

    it('returns defaultValue when the config file does not exist', async () => {
      const { loadPreference } = await freshModule();
      // No writeConfig call — file doesn't exist

      const result = loadPreference('language', stringSchema, 'zh-CN');
      expect(result).toBe('zh-CN');
    });

    it('returns defaultValue when the config file contains invalid JSON', async () => {
      const dir = join(testDir, '.the-life');
      mkdirSync(dir, { recursive: true });
      writeFileSync(configPath(), '{broken json', 'utf-8');

      const { loadPreference } = await freshModule();

      const result = loadPreference('language', stringSchema, 'zh-CN');
      expect(result).toBe('zh-CN');
    });

    it('returns defaultValue when the key is absent from the file', async () => {
      writeConfig({ theme: 'dark' });
      const { loadPreference } = await freshModule();

      const result = loadPreference('language', stringSchema, 'zh-CN');
      expect(result).toBe('zh-CN');
    });

    it('returns defaultValue when the stored value fails zod schema validation', async () => {
      writeConfig({ language: 123 }); // number, not string
      const { loadPreference } = await freshModule();

      const result = loadPreference('language', stringSchema, 'zh-CN');
      expect(result).toBe('zh-CN');
    });

    it('returns defaultValue when stored value is null (fails string schema)', async () => {
      writeConfig({ language: null });
      const { loadPreference } = await freshModule();

      const result = loadPreference('language', stringSchema, 'zh-CN');
      expect(result).toBe('zh-CN');
    });

    it('validates shortcutKeys schema correctly', async () => {
      writeConfig({ shortcutKeys: { jump: ['w'], quit: ['q', 'ctrl+q'] } });
      const { loadPreference } = await freshModule();

      const result = loadPreference('shortcutKeys', recordSchema, {});
      expect(result).toEqual({ jump: ['w'], quit: ['q', 'ctrl+q'] });
    });

    it('rejects shortcutKeys with non-array values', async () => {
      writeConfig({ shortcutKeys: { jump: 'w' } }); // string instead of string[]
      const { loadPreference } = await freshModule();

      const result = loadPreference('shortcutKeys', recordSchema, {});
      expect(result).toEqual({});
    });
  });

  describe('savePreference', () => {
    it('persists a value that loadPreference can read back', async () => {
      const { savePreference } = await freshModule();
      await savePreference('theme', 'dark');

      // Verify it was written to disk
      const { loadPreference } = await freshModule();
      const result = loadPreference('theme', stringSchema, 'default');
      expect(result).toBe('dark');
    });

    it('overwrites an existing key without affecting other keys', async () => {
      writeConfig({ theme: 'light', language: 'zh-CN' });

      const { savePreference } = await freshModule();
      await savePreference('theme', 'dark');

      const { loadPreference } = await freshModule();
      expect(loadPreference('theme', stringSchema, 'default')).toBe('dark');
      // Unrelated key untouched
      expect(loadPreference('language', stringSchema, 'zh-CN')).toBe('zh-CN');
    });
  });

  describe('ConfigSchemas', () => {
    it('exports theme, language, and shortcutKeys schemas', async () => {
      const { ConfigSchemas } = await freshModule();
      expect(ConfigSchemas.theme).toBeDefined();
      expect(ConfigSchemas.language).toBeDefined();
      expect(ConfigSchemas.shortcutKeys).toBeDefined();
    });

    it('theme schema accepts any string', async () => {
      const { ConfigSchemas } = await freshModule();
      expect(ConfigSchemas.theme.safeParse('dark').success).toBe(true);
      expect(ConfigSchemas.theme.safeParse('').success).toBe(true);
      expect(ConfigSchemas.theme.safeParse(123).success).toBe(false);
    });

    it('shortcutKeys schema accepts Record<string, string[]>', async () => {
      const { ConfigSchemas } = await freshModule();
      const valid = { a: ['x'], b: ['y', 'z'] };
      expect(ConfigSchemas.shortcutKeys.safeParse(valid).success).toBe(true);
      expect(ConfigSchemas.shortcutKeys.safeParse({}).success).toBe(true);
      expect(ConfigSchemas.shortcutKeys.safeParse([]).success).toBe(false);
      expect(ConfigSchemas.shortcutKeys.safeParse({ a: 'not-array' }).success).toBe(false);
    });
  });

  describe('store', () => {
    it('exports a store instance from ink-kit', async () => {
      const { store } = await freshModule();
      expect(store).toBeDefined();
      expect(typeof store.write).toBe('object');
      expect(typeof store.read).toBe('object');
      expect(typeof store.write.schema).toBe('function');
      expect(typeof store.read.schema).toBe('function');
    });
  });
});
