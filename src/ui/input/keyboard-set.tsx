import { Tabs, useI18n } from "@baigao_h/ink-kit";
import type { Tab } from "@baigao_h/ink-kit";
import { SelectInput } from "@baigao_h/ink-kit";
import type { Item } from "@baigao_h/ink-kit";
import type { KeyboardAction } from "../../base/keyboard/types.js";
import { getActionCategories } from "../../base/keyboard/keyboard-manager.js";
import { Box, Text, useWindowSize } from "ink";
import React, { useMemo, useState } from "react";

function BindingItem({
  label,
  value,
  isSelected,
}: Item<KeyboardAction> & { isSelected: boolean }) {
  const { t } = useI18n();
  return (
    <Box>
      <Text bold={isSelected} color={isSelected ? "cyan" : "white"}>
        {label}
      </Text>
      <Text color={isSelected ? "cyan" : "gray"} dimColor={!isSelected}>
        {" "}{value.keys ? `[${value.keys.join(" / ")}]` : `[${t("not.bound")}]`}
      </Text>
    </Box>
  );
}

export default function KeyboardSet() {
  const { rows } = useWindowSize();
  const categories = useMemo(() => getActionCategories(), []);
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? "");
  const { t } = useI18n();

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
              onSelect={() => {}}
              itemComponent={BindingItem}
              limit={5}
            />
          ),
        };
      }),
    [categories],
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
    </Box>
  );
}
