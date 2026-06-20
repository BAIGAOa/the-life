import React, { useSyncExternalStore, useMemo, useState, useEffect } from "react";
import Game from "../../base/game/Game.js";
import { Box, Text, useWindowSize } from "ink";
import { useI18n, SelectInput, useKeyboard } from "@baigao_h/ink-kit";
import type { Item } from "@baigao_h/ink-kit";
import type { Child } from "../../base/content-base/BaseIncident.js";

interface ChildItemValue {
  child: Child;
}

const CONSOLE_HEIGHT = 35;

export default function Console({game}: {game: Game}){
    const data = useSyncExternalStore(game.subscribe, game.getSnapshot)
    const {t} = useI18n()
    const { boundKeyboard, focusUnregister } = useKeyboard();
    const { rows } = useWindowSize();

    const maxTop = Math.max(0, rows - CONSOLE_HEIGHT);
    const initialTop = Math.max(0, Math.floor((rows - CONSOLE_HEIGHT) / 2));
    const [top, setTop] = useState(initialTop);

    const children = data.getNextEvent();

    const items: Item<ChildItemValue>[] = useMemo(
      () =>
        children.map((child, i) => ({
          label: t(child.description),
          value: { child },
          Key: `console-child-${i}`,
        })),
      [children],
    );

    /*
     * @v0.1.0 2026-06-20
     * Each boundKeyboard with { focusId } registers a FocusTarget in
     * the overlay's layer. The per-binding unbind functions remove
     * individual BoundKeyEntry entries; focusUnregister deletes the
     * entire FocusTarget and cleans focusOrder to prevent dead slots
     * in Tab rotation. Both levels of cleanup are required.
     */
    useEffect(() => {
      const unbindUp = boundKeyboard(['up'], () => {
        setTop(prev => Math.max(0, prev - 1));
      }, {
        focusId: 'console-control'
      });
      const unbindDown = boundKeyboard(['down'], () => {
        setTop(prev => Math.min(maxTop, prev + 1));
      }, {
        focusId: 'console-control'
      });
      return () => {
        unbindUp();
        unbindDown();
        focusUnregister('console-control');
      };
    }, [maxTop, focusUnregister]);

    return (
        <Box position="absolute" top={top} left={0} height={CONSOLE_HEIGHT} width='100%' borderStyle='bold' borderColor='cyan' backgroundColor='black' flexDirection="column" paddingX={1} >
            <Box height={1} justifyContent="center">
              <Text bold color="cyan">
                {t('console.title')}
              </Text>
            </Box>
            <Box flexGrow={1} marginTop={1} justifyContent="center">
              {items.length === 0 ? (
                <Box flexGrow={1} alignItems="center" justifyContent="center">
                  <Text bold color="blue">
                    {t('console.tip')}
                  </Text>
                </Box>
              ) : (
                  <SelectInput<ChildItemValue>
                  items={items}
                  focusId="console-select"
                  limit={10}
                  onSelect={() => {
                    /* Selection logic will be added in a later iteration */
                  }}
                />
              )}
            </Box>
        </Box>
    )
}
