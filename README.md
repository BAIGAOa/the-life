# The Life

一个基于 **Ink** + **ink-kit** 的终端人生模拟游戏。

> 🎮 运行在终端里的文字人生

## 快速开始

```bash
# 安装依赖
npm install

# 启动游戏
npm start

# 开发模式（热重载）
npm run dev
```

## 特性

- 🎨 **主题系统** — 内置默认主题，支持切换（按 `T`）
- 🌍 **多语言** — 中文 / English 切换（按 `L`）
- ⌨️ **键盘导航** — 全程键盘操作，`↑↓` 选择，`Enter` 确认，`Q` 退出

## 技术栈

- [Ink](https://github.com/vadimdemedes/ink) — 用 React 构建终端 UI
- [@baigao_h/ink-kit](https://www.npmjs.com/package/@baigao_h/ink-kit) — 屏幕管理、键盘系统、国际化、主题等组件库
- TypeScript
- tsx — TypeScript 执行引擎

## 项目结构

```
the-life/
├── assets/
│   ├── languages/     # 国际化语言包
│   │   ├── zh-CN.json
│   │   └── en-US.json
│   └── themes/        # 主题配置
│       └── default.json
├── src/
│   └── index.tsx      # 入口 & 主菜单
├── package.json
└── tsconfig.json
```

## 命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动游戏 |
| `npm run dev` | 开发模式（文件监听） |
| `npm run build` | TypeScript 编译检查 |

## 许可证

MIT
