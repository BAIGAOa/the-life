import React, { useMemo, useEffect } from 'react';
import { Box, Text, useWindowSize } from 'ink';
import {
  SelectInput,
  useScreenSystem,
  useI18n,
  useKeyboard,
} from '@baigao_h/ink-kit';
import type { Item } from '@baigao_h/ink-kit';
import { getAllSettings } from '../../base/setting/setting-center.js';
import type { SettingEntry } from '../../base/setting/types.js';
import { OptionPickerScreen } from './option-picker.js';

interface SettingItemValue {
  setting: SettingEntry;
}

function SettingsScreen() {
  const { t } = useI18n();
  const { skip, back } = useScreenSystem();
  const { boundKeyboard } = useKeyboard();
  const { rows } = useWindowSize();

  useEffect(() => {
    const unbind = boundKeyboard(['escape'], () => back());
    return () => unbind();
  }, []);

  const allSettings = getAllSettings();

  const items: Item<SettingItemValue>[] = useMemo(
    () =>
      allSettings.map((setting) => ({
        label: t(setting.label),
        value: { setting },
        Key: setting.id,
      })),
    [allSettings],
  );

  const handleSelect = (item: Item<SettingItemValue>) => {
    skip(OptionPickerScreen, { setting: item.value.setting });
  };

  return (
    <Box flexDirection="column" padding={1} height={rows} justifyContent="center" alignItems="center" width="100%">
      <Text bold>{t('settings.title')}</Text>
      <Box marginTop={1} />

      {items.length === 0 ? (
        <Text color="gray">{t('settings.empty')}</Text>
      ) : (
        <SelectInput<SettingItemValue>
          items={items}
          onSelect={handleSelect}
          focusId="settings-list"
        />
      )}

      <Box marginTop={1} />
      <Text color="gray">{t('settings.hint.back')}</Text>
    </Box>
  );
}

export { SettingsScreen };
