import React, { useEffect, useMemo } from 'react';
import { Box, Text, render, useWindowSize } from 'ink';
import {
  registerComponent,
  ScenarioManagementProvider,
  CurrentScreen,
  useScreenSystem,
  KeyboardProvider,
  useKeyboard,
  SelectInput,
  ThemeProvider,
  useTheme,
  LanguageProvider,
  useI18n,
} from '@baigao_h/ink-kit';
import type { Item } from '@baigao_h/ink-kit';

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
  const { skip } = useScreenSystem();
  const { boundKeyboard } = useKeyboard();
  const { color } = useTheme();
  const { t, setLanguage, currentLanguage, getLanguages } = useI18n();

  const titleColor = color('titleColor') ?? 'magentaBright';
  const dimColor = color('dimColor') ?? 'gray';
  const primaryColor = color('primaryColor') ?? 'cyan';

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
      // newGame / continue / settings — TBD
    }
  };

  useEffect(() => {
    const unbind: (() => void)[] = [];
    unbind.push(boundKeyboard(['q'], () => process.exit(0)));
    unbind.push(boundKeyboard(['l'], () => {
      const langs = getLanguages();
      const idx = langs.indexOf(currentLanguage);
      const next = langs[(idx + 1) % langs.length];
      setLanguage(next);
    }));
    return () => unbind.forEach(fn => fn());
  }, [currentLanguage]);

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

function App() {
  return (
    <ThemeProvider path="./assets/themes" defaultTheme="default">
      <LanguageProvider path="./assets/languages" defaultLanguage="zh-CN" fallbackLanguage="en-US">
        <KeyboardProvider>
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
