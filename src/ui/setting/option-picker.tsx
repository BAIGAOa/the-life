import React, { useMemo, useEffect } from 'react';
import { Box, Text, useWindowSize } from 'ink';
import {
  SelectInput,
  useScreenSystem,
  useI18n,
  useKeyboard,
} from '@baigao_h/ink-kit';
import type { Item } from '@baigao_h/ink-kit';
import type { SettingEntry } from '../../base/setting/types.js';

export interface OptionPickerScreenProps {
  setting: SettingEntry;
}

function OptionPickerScreen({ setting }: OptionPickerScreenProps) {
  const { t } = useI18n();
  const { back } = useScreenSystem();
  const { boundKeyboard } = useKeyboard();
  const { rows } = useWindowSize();

  useEffect(() => {
    const unbind = boundKeyboard(['escape'], () => back());
    return () => unbind();
  }, []);

  const options: Item<string>[] = useMemo(
    () => {

      if (setting.options && setting.component === undefined) {
        return setting.options.map((opt) => ({
          label: t(opt.label),
          value: opt.value,
          Key: opt.value,
        }))
      }

      return []

    },
    [setting.options],
  );


  return (
    <Box flexDirection="column" padding={1} height={rows} justifyContent="center" alignItems="center" width="100%">
      <Text bold>{t(setting.label)}</Text>
      {setting.description ? (
        <Text color="gray">{t(setting.description)}</Text>
      ) : null}
      <Box marginTop={1} />

      {setting.component ?
        (
          <setting.component />
        ) :
        (
          <SelectInput<string>
            items={options}
            onSelect={(item) => {
              if (setting.onAction) {
                setting.onAction(item.value);
              }
              back();
            }}
            focusId={`setting-${setting.id}`}
          />
        )
      }
      <Box marginTop={1} />
      <Text color="gray">{t('settings.hint.back')}</Text>
    </Box>
  );
}


export { OptionPickerScreen };
