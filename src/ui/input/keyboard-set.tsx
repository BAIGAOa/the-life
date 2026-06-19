import { normalizeKeyNames, Tabs, useI18n } from "@baigao_h/ink-kit";
import type { Tab } from "@baigao_h/ink-kit";
import { SelectInput } from "@baigao_h/ink-kit";
import type { Item } from "@baigao_h/ink-kit";
import type { KeyboardAction } from "../../base/keyboard/types.js";
import { getActionCategories } from "../../base/keyboard/keyboard-manager.js";
import { Box, Text, useInput, useWindowSize } from "ink";
import React, { useCallback, useMemo, useState } from "react";

export default function KeyboardSet() {
  const { rows } = useWindowSize();
  const categories = useMemo(() => getActionCategories(), []);
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? "");
  const { t } = useI18n();

  
  const [recordingId, setRecordingId] = useState<string | null>(null)
  const [overrides, setOverrides] = useState<Record<string, string[]>>({})

  // useInput here does nothing except capture keystrokes during recording.
  // It won't conflict with ink-kit's useInput.
  useInput((input, key) => {
    if (!recordingId) return
    const names = normalizeKeyNames(input, key)
    const keyName = names[names.length - 1]
    if (keyName) {
      setOverrides(prev => ({ ...prev, [recordingId]: [keyName] }))
      setRecordingId(null)
    }
  }, { isActive: recordingId !== null })

  const handler = useCallback((item: Item<KeyboardAction>) => {
    setRecordingId(item.Key ?? item.value.actionId)
  }, [])


  function BindingItem({
    label,
    value,
    isSelected,
  }: Item<KeyboardAction> & { isSelected: boolean }) {
    const displayKeys = overrides[value.actionId] ?? value.keys
    return (
      <Box>
        <Text bold={isSelected} color={isSelected ? "cyan" : "white"}>
          {label}
        </Text>
        <Text color={isSelected ? "cyan" : "gray"} dimColor={!isSelected}>
          {" "}{displayKeys ? `[${displayKeys.join(" / ")}]` : `[${t("not.bound")}]`}
        </Text>
      </Box>
    );
  }

  const tabs: Tab[] = useMemo(
    () =>
      categories.map((cat) => {
        const items: Item<KeyboardAction>[] = cat.items.map((action) => ({
          label: action.title,
          value: action,
          Key: action.actionId,
        }));

        return {
          id: cat.id,
          label: cat.id,
          content: (
            <SelectInput
              focusId={`keyboard-set-${cat.id}`}
              items={items}
              onSelect={handler}
              itemComponent={BindingItem}
              limit={5}
            />
          ),
        };
      }),
    [categories, overrides],
  );

  return (
    <Box
      borderStyle="double"
      borderColor="white"
      height={rows}
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {tabs.length > 0 ? (
        <Tabs
          focusId="keyboard-set"
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      ) : (
        <Text dimColor>{t("no.bindings")}</Text>
      )}

      <Box marginTop={1}>
        {recordingId ? (
          <Text color="yellow">{t("keyboard.recording")}</Text>
        ) : (
          <Text dimColor>{t("keyboard.hint")}</Text>
        )}
      </Box>
    </Box>
  );
}
