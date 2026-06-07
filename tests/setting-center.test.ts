import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SelectSetting, MultiSelectSetting } from '../src/base/setting/types.js';

// 每个测试前重置模块，获得全新的 settings Map
beforeEach(async () => {
  await vi.resetModules();
});

async function freshModule() {
  return import('../src/base/setting/setting-center.js');
}

const selectSetting: SelectSetting = {
  id: 'theme',
  label: 'settings.theme',
  description: 'pick a theme',
  renderer: 'select',
  options: [
    { label: 'default', value: 'default' },
    { label: 'dark', value: 'dark' },
  ],
  defaultValue: 'default',
  onAction: () => {},
};

const multiSetting: MultiSelectSetting = {
  id: 'features',
  label: 'settings.features',
  renderer: 'multiSelect',
  options: [
    { label: 'Feature A', value: 'a' },
    { label: 'Feature B', value: 'b' },
  ],
  defaultValue: ['a'],
  onAction: () => {},
};

describe('setting-center', () => {
  describe('registerSetting', () => {
    it('应该成功注册一个 SelectSetting 并可通过 getSetting 取回', async () => {
      const { registerSetting, getSetting } = await freshModule();
      registerSetting(selectSetting);
      expect(getSetting('theme')).toEqual(selectSetting);
    });

    it('应该成功注册一个 MultiSelectSetting', async () => {
      const { registerSetting, getSetting } = await freshModule();
      registerSetting(multiSetting);
      expect(getSetting('features')).toEqual(multiSetting);
    });

    it('重复注册相同 id 应该抛出错误', async () => {
      const { registerSetting } = await freshModule();
      registerSetting(selectSetting);
      expect(() => registerSetting(selectSetting)).toThrow(
        'Setting with id "theme" is already registered.',
      );
    });

    it('不同 id 互不冲突', async () => {
      const { registerSetting, getSetting } = await freshModule();
      registerSetting(selectSetting);
      registerSetting(multiSetting);
      expect(getSetting('theme')).toEqual(selectSetting);
      expect(getSetting('features')).toEqual(multiSetting);
    });
  });

  describe('getSetting', () => {
    it('id 不存在时返回 undefined', async () => {
      const { getSetting } = await freshModule();
      expect(getSetting('nonexistent')).toBeUndefined();
    });

    it('注册后能精确返回对应 setting', async () => {
      const { registerSetting, getSetting } = await freshModule();
      registerSetting(selectSetting);
      const result = getSetting('theme');
      expect(result).toBeDefined();
      expect(result!.id).toBe('theme');
      expect(result!.renderer).toBe('select');
    });
  });

  describe('getAllSettings', () => {
    it('无注册时返回空数组', async () => {
      const { getAllSettings } = await freshModule();
      expect(getAllSettings()).toEqual([]);
    });

    it('注册多个后全部返回', async () => {
      const { registerSetting, getAllSettings } = await freshModule();
      registerSetting(selectSetting);
      registerSetting(multiSetting);
      const all = getAllSettings();
      expect(all).toHaveLength(2);
      expect(all.map((s) => s.id).sort()).toEqual(['features', 'theme']);
    });

    it('返回的是注册对象的引用，修改选项不影响已注册数据', async () => {
      const { registerSetting, getAllSettings } = await freshModule();
      registerSetting(selectSetting);
      const all = getAllSettings();
      expect(all).toHaveLength(1);

      // 注册一个新 setting 后，已取出的数组不会自动更新
      registerSetting(multiSetting);
      const allAgain = getAllSettings();
      expect(allAgain).toHaveLength(2);
    });
  });
});
