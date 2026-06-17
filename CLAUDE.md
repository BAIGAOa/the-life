# The Life

A terminal-based life simulation game built with Ink + React + TypeScript.

## Background

This project is built on **@baigao_h/ink-kit**, a terminal UI framework and toolkit for Ink that provides:

- **Screen management** — tree-based component navigation via `registerComponent` / `skip` / `back` / `gotoScreen` / `overlay`
- **Keyboard system** — layered per-screen keybindings (`boundKeyboard`, `globalKeys`, `blockedKey`, `stop`) with focus management
- **i18n** — multi-language support via `LanguageProvider` + `useI18n` (`t()`, `setLanguage`)
- **Themes** — theme switching via `ThemeProvider` + `useTheme` (`color()`, `setTheme`)
- **UI components** — `SelectInput`, `MultiSelectInput`, `TextInput`, `SearchInput`, `NumberInput`, `Spinner`, `ProgressBar`, `Tabs`, `Fold`, `ConfirmDialog`, `Form`, `KeyHint`, etc.
- **Persistence** — typed key-value storage via `createStorage()` with atomic writes, read-time type validation + auto-repair

To understand how a specific feature works, inspect `node_modules/@baigao_h/ink-kit/` — the source and types there are the authoritative reference.

## Project

- **Stack:** TypeScript (strict, ESM, Node16), Ink 7 (React for terminal UI), @baigao_h/ink-kit (screens, keyboard, i18n, themes, persistence)
- **Entry:** `src/index.tsx` — renders the `<App>` component tree via `render()` from Ink
- **Runtime:** `tsx` (not Node directly)
- **i18n:** `assets/languages/{zh-CN,en-US}.json`; themes: `assets/themes/*.json`

## Commands

| Command            | Purpose                          |
|--------------------|----------------------------------|
| `npm start`        | Run the game (`tsx src/index.tsx`) |
| `npm run dev`      | Run with hot reload (`tsx watch`)  |
| `npm run build`    | TypeScript type-check (`tsc`)      |
| `npm test`         | Run tests once (`vitest run`)      |
| `npm run test:watch` | Run tests in watch mode (`vitest`) |

## Architecture

- `src/index.tsx` — Entry point: logo, main menu (`Menu`), global keybindings (`GlobalKeys`), and component registration. Wires up `<ThemeProvider>` → `<LanguageProvider>` → `<KeyboardProvider>` → `<CurrentScreen>`.
- `src/base/setting/setting-center.ts` — In-memory settings registry. `registerSetting(entry)` stores the entry; `getSetting(id)` / `getAllSettings()` retrieve them. Duplicate ids throw.
- `src/base/setting/types.ts` — `SelectSetting` and `MultiSelectSetting` discriminated unions; `SettingEntry = SelectSetting | MultiSelectSetting`.
- `src/ui/setting/screen.tsx` — Settings list screen; reads all registered settings via `getAllSettings()`, displays with `SelectInput`.
- `src/ui/setting/option-picker.tsx` — Single-setting picker; renders `SelectInput` or `MultiSelectInput` depending on `setting.renderer`.
- `tests/` — Vitest unit tests for setting-center.

## Conventions

- **ESM** — All source is `"type": "module"`; imports use `.js` extension (e.g. `'./types.js'`).
- **Strict TS** — `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` all on.
- **React components** — Functional components with hooks only; screens are registered via `registerComponent(Component, defaultProps?, opts?)` from ink-kit.
- **Screen navigation** — `gotoscreen(Screen, props)` / `skip(Screen, props)` / `back()` from `useScreenSystem()`; screens live in `src/ui/`.
- **i18n** — All user-visible text through `t('key.path')` from `useI18n()`; keys in `assets/languages/`.
- **Themes** — Colors via `color('tokenName')` from `useTheme()`; toggle with `T`, switch language with `L` (global keys).
- **Testing** — Vitest with `vi.mock`/`vi.resetModules`; tests use dynamic `import()` (`freshModule()`) to isolate module state per test.

## Coding Standards

- **Directory roles** — `src/base/` holds pure logic modules and infrastructure (e.g. setting), with no dependency on React/Ink. `src/ui/` holds UI modules (screens, components), which may depend on React/Ink and `src/base/`.
- **Subsystem directories** — Every subsystem gets its own directory under both `src/base/<name>/` and `src/ui/<name>/`. For example, the settings subsystem lives in `src/base/setting/` (logic) and `src/ui/setting/` (UI).
- **Type definitions** — Each subsystem's type definitions go in a `types.ts` file within that subsystem's base directory (e.g. `src/base/setting/types.ts`).
- **Test directories** — Tests live under `tests/<subsystem>/`, mirroring the subsystem name. For example, setting tests go in `tests/setting/`.
- **Test quality** — No happy-path-only tests. Every subsystem's tests must cover: (a) basic functionality, (b) edge cases and boundary conditions, and (c) integration paths between modules where applicable.
- **TDD (test-driven development)** — Write tests first, then implement. Before adding any new module or feature, start with a failing test that defines the expected behavior. The TDD workflow is detailed in `.reasonix/skills/tdd/` — load it via `/tdd` for the full red-green-refactor loop, mocking guidelines, and deep-module design.
- **Comments** — All comments must be written in English. No useless or decorative comments. Don't write restatements of what the code already says (e.g. `// define a variable`, `// this is a function`). No ASCII divider/separator comments — they only draw attention without adding meaning. Comments must explain **why** the code does something, not **what** it does. Public API exports (functions, types, classes) must have detailed JSDoc blocks.
- **Long-comment versioning** — Any comment that spans more than 5 lines, whether it's `//` line comments or `/* */` block comments, MUST include a version tag and date at the top of the comment block. The version is taken from `package.json`'s `"version"` field, and the date must be precise to the day (format: `YYYY-MM-DD`). Example:
  ```
  // @v0.1.0 2026-06-13
  // This is a long explanatory comment that
  // spans more than five lines because the
  // reasoning behind this approach is
  // non-obvious and needs documentation...
  ```
  or for block comments:
  ```
  /*
   * @v0.1.0 2026-06-13
   * Longer explanation that goes into detail
   * about why this approach was chosen over
   * alternatives, covering trade-offs,
   * edge cases, and design rationale...
   */
  ```
- **Clarifying requirements** — When a request is vague or underspecified, load the `grill-me` skill (`/grill-me` or `.reasonix/skills/grill-me/SKILL.md`) to systematically interview the user one question at a time until the design is fully understood.
- **Plan confirmation** — After the planning discussion ends and before writing any code, restate your understanding of the plan, highlight any assumptions, and explicitly ask the user whether adjustments are needed or if your understanding is correct and free of deviations. Do not begin implementing until confirmed.
- **No over-engineering** — Do exactly what the user asks, nothing more. Never optimize prematurely, extract shared code, add tests, or pull out common hooks/functions without asking first. If you see an opportunity for improvement, surface it to the user for approval — do not act on it unilaterally.
- **Asset files** — Configuration/data files go under `assets/<type>/`, one directory per type. For example, themes live in `assets/themes/`, languages in `assets/languages/`.
