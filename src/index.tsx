import React, { useEffect, useMemo } from 'react';
import { Box, Text, render, useWindowSize } from 'ink';
import {
  registerComponent,
  ScenarioManagementProvider,
  CurrentScreen,
  KeyboardProvider,
  useKeyboard,
  SelectInput,
  ThemeProvider,
  useTheme,
  LanguageProvider,
  useI18n,
  gotoScreen,
} from '@baigao_h/ink-kit';
import type { Item } from '@baigao_h/ink-kit';
import { registerSetting } from './base/setting/setting-center.js';
import type { SelectSetting, SettingEntry } from './base/setting/types.js';
import { SettingsScreen } from './ui/setting/screen.js';
import { OptionPickerScreen } from './ui/setting/option-picker.js';

const LOGO_LINES = [
  '  ████████╗██╗  ██╗███████╗    ██╗     ██╗███████╗███████╗',
  '  ╚══██╔══╝██║  ██║██╔════╝    ██║     ██║██╔════╝██╔════╝',
  '     ██║   ███████║█████╗      ██║     ██║█████╗  █████╗  ',
  '     ██║   ██╔══██║██╔══╝      ██║     ██║██╔══╝  ██╔══╝  ',
  '     ██║   ██║  ██║███████╗    ███████╗██║██║     ███████╗',
  '     ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝╚═╝     ╚══════╝',
];

interface MenuItemValue {
  action: 'newGame' | 'continue' | 'settings' | 'quit';
}

function Menu() {
  
  const { boundKeyboard } = useKeyboard();
  const { color, themeId, themes, setTheme } = useTheme();
  const { t, setLanguage, currentLanguage, getLanguages } = useI18n();
  

  const titleColor = color('titleColor') ?? 'magentaBright';
  const dimColor = color('dimColor') ?? 'gray';
  

  const {rows} = useWindowSize()

  const menuItems: Item<MenuItemValue>[] = useMemo(
    () => [
      { label: t('menu.newGame'), value: { action: 'newGame' }, Key: 'newGame' },
      { label: t('menu.continue'), value: { action: 'continue' }, Key: 'continue' },
      { label: t('menu.settings'), value: { action: 'settings' }, Key: 'settings' },
      { label: t('menu.quit'), value: { action: 'quit' }, Key: 'quit' },
    ],
    [currentLanguage],
  );

  const handleSelect = (item: Item<MenuItemValue>) => {
    switch (item.value.action) {
      case 'quit':
        process.exit(0);
        break;
      case 'settings':
        gotoScreen(SettingsScreen, {});
        break;
    }
  };

  useEffect(() => {
    const unbind = boundKeyboard(['q'], () => process.exit(0));

    // 注册设置项
    try {
      registerSetting({
        id: 'theme',
        label: 'settings.theme',
        description: 'settings.theme.desc',
        renderer: 'select',
        options: themes.map((id) => ({ label: id, value: id })),
        defaultValue: themeId,
        onAction: (value: string) => setTheme(value),
      } satisfies SelectSetting);
    } catch { /* already registered */ }

    try {
      registerSetting({
        id: 'language',
        label: 'settings.language',
        description: 'settings.language.desc',
        renderer: 'select',
        options: getLanguages().map((id) => ({ label: id, value: id })),
        defaultValue: currentLanguage,
        onAction: (value: string) => setLanguage(value),
      } satisfies SelectSetting);
    } catch { /* already registered */ }

    return () => unbind();
  }, [currentLanguage, themeId, themes]);

  return (
    <Box flexDirection="column" padding={1} alignItems="center" height={rows} justifyContent="center">
      {LOGO_LINES.map((line, i) => (
        <Text key={i} color={titleColor} bold>
          {line}
        </Text>
      ))}

      <Box marginTop={1} />

      <SelectInput<MenuItemValue>
        items={menuItems}
        onSelect={handleSelect}
        focusId="main-menu"
      />

      <Box marginTop={1} />

      <Text color={dimColor}>{t('menu.hint.navigate')}</Text>
      <Text color={dimColor}>{t('menu.hint.theme')}</Text>
      <Text color={dimColor}>{t('menu.hint.language')}</Text>
    </Box>
  );
}
registerComponent(Menu, {});
registerComponent(SettingsScreen, {}, { parent: Menu });
registerComponent(OptionPickerScreen, { setting: {} as SettingEntry }, { parent: SettingsScreen });

/** 在所有界面生效的全局快捷键 */
function GlobalKeys() {
  const { globalKeys } = useKeyboard();
  const { themes, themeId, setTheme } = useTheme();
  const { getLanguages, currentLanguage, setLanguage } = useI18n();

  useEffect(() => {
    globalKeys([
      {
        key: 't',
        operate: () => {
          const idx = themes.indexOf(themeId);
          const next = themes[(idx + 1) % themes.length];
          if (next) setTheme(next);
        },
        cover: false,
      },
      {
        key: 'l',
        operate: () => {
          const langs = getLanguages();
          const idx = langs.indexOf(currentLanguage);
          const next = langs[(idx + 1) % langs.length];
          if (next) setLanguage(next);
        },
        cover: false,
      },
    ]);
  }, [themes, themeId, currentLanguage]);

  return null;
}

function App() {
  return (
    <ThemeProvider path="./assets/themes" defaultTheme="default">
      <LanguageProvider path="./assets/languages" defaultLanguage="zh-CN" fallbackLanguage="en-US">
        <KeyboardProvider>
          <GlobalKeys />
          <CurrentScreen />
        </KeyboardProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

render(
  <ScenarioManagementProvider defaultScreen={Menu}>
    <App />
  </ScenarioManagementProvider>,
);
