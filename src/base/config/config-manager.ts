import { homedir } from 'node:os';
import path from 'node:path';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// ── 类型 ──────────────────────────────────────────────
export type ConfigValue = unknown;
export type ConfigData = Record<string, ConfigValue>;

// ── 文件路径 ──────────────────────────────────────────
const CONFIG_DIR = path.join(homedir(), '.the-life');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');

// ── 默认值注册表 ──────────────────────────────────────
/**
 * 运行时默认值注册表。
 *
 * 模块在启动时调用 `registerDefault(key, value)` 声明自己需要持久化
 * 的字段及其默认值。`readConfig` 读取磁盘文件时会用注册表补齐缺失字段。
 */
const defaults = new Map<string, ConfigValue>();

/** 注册一个字段的默认值。重复注册同一个 key 会抛错。 */
export function registerDefault(key: string, value: ConfigValue): void {
  if (defaults.has(key)) {
    throw new Error(`Config default "${key}" is already registered.`);
  }
  defaults.set(key, value);
}

/** 获取当前已注册的所有默认值（浅拷贝，用于测试） */
export function getDefaultsSnapshot(): Record<string, ConfigValue> {
  return Object.fromEntries(defaults);
}

/** 清空注册表（仅用于测试） */
export function _clearDefaults(): void {
  defaults.clear();
}

// ── 读写 ──────────────────────────────────────────────

/** 确保目录存在并写文件 */
async function flush(data: ConfigData): Promise<void> {
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * 读取完整配置。
 *
 * 流程：
 * 1. 尝试读取磁盘文件
 * 2. 用注册表的默认值补齐文件中缺失 / 不存在的字段
 * 3. 若文件不存在或存在缺失字段，回写完整配置
 */
export async function readConfig(): Promise<ConfigData> {
  let disk: ConfigData;
  let needFlush = false;

  try {
    const raw = await readFile(CONFIG_PATH, 'utf-8');
    disk = JSON.parse(raw) as ConfigData;
  } catch {
    disk = {};
    needFlush = true;
  }

  // 补齐缺失字段
  for (const [k, v] of defaults) {
    if (!(k in disk)) {
      disk[k] = v;
      needFlush = true;
    }
  }

  if (needFlush) {
    await flush(disk);
  }

  return disk;
}

/**
 * 写入部分配置（与已有配置合并后落盘）。
 */
export async function writeConfig(partial: ConfigData): Promise<void> {
  const current = await readConfig();
  const merged: ConfigData = { ...current, ...partial };
  await flush(merged);
}
