# The Life

A terminal-based life simulation game powered by **Ink** + **ink-kit**.

> A text-based life that runs in your terminal

## Quick Start

```bash
# Install dependencies
npm install

# Start the game
npm start

# Development mode (hot reload)
npm run dev
```

## Features

- **Theme system** — Built-in default theme, toggle with `T`
- **Multi-language** — Switch between Chinese / English with `L`
- **Keyboard navigation** — Full keyboard controls, `↑↓` to select, `Enter` to confirm, `Q` to quit

## Tech Stack

- [Ink](https://github.com/vadimdemedes/ink) — Build terminal UI with React
- [@baigao_h/ink-kit](https://www.npmjs.com/package/@baigao_h/ink-kit) — Component library for screen management, keyboard system, i18n, themes, etc.
- TypeScript
- tsx — TypeScript execution engine

## Project Structure

```
the-life/
├── assets/
│   ├── languages/     # i18n language packs
│   │   ├── zh-CN.json
│   │   └── en-US.json
│   └── themes/        # Theme configurations
│       └── default.json
├── src/
│   └── index.tsx      # Entry point & main menu
├── package.json
└── tsconfig.json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the game |
| `npm run dev` | Development mode (watch mode) |
| `npm run build` | TypeScript compilation check |

## License

MIT
