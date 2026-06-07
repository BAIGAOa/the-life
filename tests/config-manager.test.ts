import { describe, it, expect, beforeEach, afterEach, afterAll, vi } from 'vitest';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

const TMP_ROOT = process.env.TMP ?? process.env.TEMP ?? '/tmp';
const TMP_DIR = join(TMP_ROOT, `the-life-test-${randomUUID()}`);

vi.mock('node:os', () => ({
  homedir: () => TMP_DIR,
}));

const CONFIG_PATH = join(TMP_DIR, '.the-life', 'config.json');

// 每次测试前清空磁盘文件 + 清空注册表
beforeEach(async () => {
  await rm(join(TMP_DIR, '.the-life'), { recursive: true, force: true });
  const m = await freshModule();
  m._clearDefaults();
});

afterEach(async () => {
  await rm(join(TMP_DIR, '.the-life'), { recursive: true, force: true });
});

afterAll(async () => {
  await rm(TMP_DIR, { recursive: true, force: true });
});

async function freshModule() {
  return import('../src/base/config/config-manager.js');
}

describe('config-manager', () => {
  describe('registerDefault', () => {
    it('应该成功注册单个默认值', async () => {
      const { registerDefault, getDefaultsSnapshot } = await freshModule();
      registerDefault('theme', 'default');
      expect(getDefaultsSnapshot()).toEqual({ theme: 'default' });
    });

    it('应该成功注册多个默认值', async () => {
      const { registerDefault, getDefaultsSnapshot } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('language', 'zh-CN');
      registerDefault('volume', 80);
      expect(getDefaultsSnapshot()).toEqual({
        theme: 'default',
        language: 'zh-CN',
        volume: 80,
      });
    });

    it('重复注册相同 key 应该抛出错误', async () => {
      const { registerDefault } = await freshModule();
      registerDefault('theme', 'default');
      expect(() => registerDefault('theme', 'dark')).toThrow(
        'Config default "theme" is already registered.',
      );
    });
  });

  describe('readConfig', () => {
    it('无注册无文件时应返回空对象', async () => {
      const { readConfig } = await freshModule();
      const cfg = await readConfig();
      expect(cfg).toEqual({});
    });

    it('有注册且文件不存在时应创建文件并返回默认值', async () => {
      const { registerDefault, readConfig } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('language', 'zh-CN');

      const cfg = await readConfig();
      expect(cfg).toEqual({ theme: 'default', language: 'zh-CN' });

      // 确认文件已创建
      const { readFile } = await import('node:fs/promises');
      const raw = await readFile(CONFIG_PATH, 'utf-8');
      expect(JSON.parse(raw)).toEqual({ theme: 'default', language: 'zh-CN' });
    });

    it('文件已有完整数据时应直接返回', async () => {
      await mkdir(join(TMP_DIR, '.the-life'), { recursive: true });
      await writeFile(
        CONFIG_PATH,
        JSON.stringify({ theme: 'ocean', language: 'en-US' }, null, 2),
        'utf-8',
      );

      const { registerDefault, readConfig } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('language', 'zh-CN');

      const cfg = await readConfig();
      expect(cfg).toEqual({ theme: 'ocean', language: 'en-US' });
    });

    it('磁盘文件缺少字段时应从注册表补齐并回写', async () => {
      await mkdir(join(TMP_DIR, '.the-life'), { recursive: true });
      await writeFile(
        CONFIG_PATH,
        JSON.stringify({ language: 'en-US' }, null, 2),
        'utf-8',
      );

      const { registerDefault, readConfig } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('language', 'zh-CN');

      const cfg = await readConfig();
      expect(cfg).toEqual({ theme: 'default', language: 'en-US' });

      // 确认文件被回写补齐
      const { readFile } = await import('node:fs/promises');
      const raw = await readFile(CONFIG_PATH, 'utf-8');
      expect(JSON.parse(raw)).toEqual({ theme: 'default', language: 'en-US' });
    });

    it('磁盘上有多余字段（已在注册表中移除）应保留', async () => {
      await mkdir(join(TMP_DIR, '.the-life'), { recursive: true });
      await writeFile(
        CONFIG_PATH,
        JSON.stringify({ theme: 'dark', deprecated: 'old' }, null, 2),
        'utf-8',
      );

      const { registerDefault, readConfig } = await freshModule();
      registerDefault('theme', 'default');

      const cfg = await readConfig();
      expect(cfg).toEqual({ theme: 'dark', deprecated: 'old' });
    });
  });

  describe('writeConfig', () => {
    it('应写入部分字段并与磁盘已有配置合并', async () => {
      await mkdir(join(TMP_DIR, '.the-life'), { recursive: true });
      await writeFile(
        CONFIG_PATH,
        JSON.stringify({ theme: 'default', language: 'zh-CN' }, null, 2),
        'utf-8',
      );

      const { registerDefault, writeConfig } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('language', 'zh-CN');

      await writeConfig({ theme: 'forest' });

      const { readFile } = await import('node:fs/promises');
      const onDisk = JSON.parse(await readFile(CONFIG_PATH, 'utf-8'));
      expect(onDisk).toEqual({ theme: 'forest', language: 'zh-CN' });
    });

    it('文件不存在时应先创建默认再合并写入', async () => {
      const { registerDefault, writeConfig } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('language', 'zh-CN');

      await writeConfig({ language: 'en-US' });

      const { readFile } = await import('node:fs/promises');
      const onDisk = JSON.parse(await readFile(CONFIG_PATH, 'utf-8'));
      expect(onDisk).toEqual({ theme: 'default', language: 'en-US' });
    });

    it('可以写入完全新的字段（即使未注册默认值）', async () => {
      const { registerDefault, writeConfig } = await freshModule();
      registerDefault('theme', 'default');

      await writeConfig({ gameProgress: 42 });

      const { readFile } = await import('node:fs/promises');
      const onDisk = JSON.parse(await readFile(CONFIG_PATH, 'utf-8'));
      expect(onDisk).toEqual({ theme: 'default', gameProgress: 42 });
    });

    it('readConfig → writeConfig → readConfig 联动', async () => {
      const { registerDefault, readConfig, writeConfig } = await freshModule();
      registerDefault('theme', 'default');
      registerDefault('volume', 50);

      const cfg1 = await readConfig();
      expect(cfg1).toEqual({ theme: 'default', volume: 50 });

      await writeConfig({ theme: 'lava' });

      const cfg2 = await readConfig();
      expect(cfg2).toEqual({ theme: 'lava', volume: 50 });
    });
  });
});
