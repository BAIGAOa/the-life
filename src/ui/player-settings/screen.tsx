import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Text, useWindowSize } from 'ink';
import {
  SelectInput,
  TextInput,
  useScreenSystem,
  useKeyboard,
  useI18n,
} from '@baigao_h/ink-kit';
import type { Item } from '@baigao_h/ink-kit';
import { usePlayer } from '../game/use-player.js';
import type Player from '../../base/game/Player.js';

/** Describes an editable player attribute shown in the sidebar. */
interface PlayerAttributeCategory {
  id: string;
  label: string;
  getValue: (player: Player) => string;
}

const CATEGORIES: PlayerAttributeCategory[] = [
  {
    id: 'name',
    label: 'playerSettings.category.name',
    getValue: (player) => player.name,
  },
];

function PlayerSettingsScreen() {
  const player = usePlayer();
  const { t } = useI18n();
  const { back } = useScreenSystem();
  const { boundKeyboard } = useKeyboard();
  const { rows, columns } = useWindowSize();

  const [selectedCategoryId, setSelectedCategoryId] = useState('name');
  const [editValue, setEditValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === selectedCategoryId) ?? CATEGORIES[0]!,
    [selectedCategoryId],
  );

  const currentValue = player ? selectedCategory.getValue(player) : '';

  // Sync edit/saved value when category or current value changes.
  useEffect(() => {
    setEditValue(currentValue);
    setSavedValue(currentValue);
  }, [selectedCategoryId, currentValue]);

  const handleSave = useCallback(
    (value: string) => {
      if (!player || value.trim().length === 0) return;
      if (selectedCategoryId === 'name') {
        player.setName(value.trim());
      }
      setSavedValue(value.trim());
      setEditValue(value.trim());
    },
    [player, selectedCategoryId],
  );

  const handleReset = useCallback(() => {
    setEditValue(savedValue);
  }, [savedValue]);

  useEffect(() => {
    const unbindEsc = boundKeyboard(['escape'], () => back());
    const unbindR = boundKeyboard(['r'], () => handleReset());
    return () => { unbindEsc(); unbindR(); };
  }, [handleReset]);

  // Empty state — no active player.
  if (!player) {
    return (
      <Box flexDirection="column" padding={1} height={rows} justifyContent="center" alignItems="center">
        <Text bold color="yellow">
          {t('playerSettings.noPlayer')}
        </Text>
        <Box marginTop={1} />
        <Text color="gray">{t('playerSettings.noPlayerHint')}</Text>
        <Box marginTop={1} />
        <Text color="gray">{t('playerSettings.back')}</Text>
      </Box>
    );
  }

  const sidebarWidth = Math.max(16, Math.floor(columns * 0.22));
  const panelWidth = columns - sidebarWidth - 4;

  const categoryItems: Item<string>[] = CATEGORIES.map((cat) => ({
    label: t(cat.label),
    value: cat.id,
    Key: cat.id,
  }));

  return (
    <Box flexDirection="column" height={rows} width="100%" paddingX={1}>
      {/* Title bar */}
      <Box height={1}>
        <Text bold>{t('playerSettings.title')}</Text>
      </Box>
      <Box height={1}>
        <Text color="gray">{'─'.repeat(columns - 2)}</Text>
      </Box>

      {/* Main content: sidebar + edit panel */}
      <Box flexGrow={1} flexDirection="row">
        {/* Left sidebar: category selector */}
        <Box
          width={sidebarWidth}
          flexDirection="column"
          borderStyle="single"
          borderColor="gray"
          paddingX={1}
        >
          <Box>
            <Text bold color="cyan">
              {t('playerSettings.sidebarTitle')}
            </Text>
          </Box>
          <Box marginTop={1} flexDirection="column">
            <SelectInput<string>
              items={categoryItems}
              onSelect={(item) => setSelectedCategoryId(item.value)}
              focusId="player-category-select"
            />
          </Box>
        </Box>

        {/* Right panel: attribute editor */}
        <Box
          width={panelWidth}
          flexDirection="column"
          borderStyle="single"
          borderColor="gray"
          paddingX={1}
          marginLeft={1}
        >
          <Box>
            <Text bold color="green">
              {t(selectedCategory.label)}
            </Text>
          </Box>

          <Box marginTop={1} flexDirection="column">
            <Text color="gray">
              {t('playerSettings.currentValue')}: {currentValue || t('playerSettings.empty')}
            </Text>
            <Box marginTop={1} />
            <TextInput
              focusId={`player-edit-${selectedCategoryId}`}
              value={editValue}
              onChange={setEditValue}
              onSubmit={handleSave}
              placeholder={t('playerSettings.enterValue')}
              showCursor
            />
          </Box>

          {/* Hints */}
          <Box marginTop={1}>
            <Text color="gray">{t('playerSettings.saveHint')}</Text>
          </Box>
          <Box>
            <Text color="gray">{t('playerSettings.resetHint')}: [R]</Text>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box height={1}>
        <Text color="gray">{t('playerSettings.back')}</Text>
      </Box>
    </Box>
  );
}

export { PlayerSettingsScreen };
