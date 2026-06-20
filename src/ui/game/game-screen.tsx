import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Box, Text, useWindowSize } from 'ink';
import { useScreenSystem, useKeyboard } from '@baigao_h/ink-kit';
import type { MessageEntry } from '../../base/game/types.js';
import { usePlayer } from './use-player.js';
import Game from '../../base/game/Game.js';

export interface GameScreenProps {
  game: Game
}

function GameScreen({game}: GameScreenProps) {
  const player = usePlayer();
  const { back } = useScreenSystem();
  const { boundKeyboard } = useKeyboard();
  const { rows, columns } = useWindowSize();
  
  const data = useSyncExternalStore(game.subscribe, game.getSnapshot)

  const [events, _setEvents] = useState<MessageEntry[]>(data.initialInformation());

  useEffect(() => {
    const unbind = boundKeyboard(['escape'], () => back());
    return () => unbind();
  }, []);

  // Reserve space for top bar and bottom hint
  const contentHeight = rows - 4;

  // Max visible lines in the event area
  const maxEventLines = contentHeight - 2;
  
  // Width of the right-side attributes panel
  const attrWidth = Math.max(20, Math.floor(columns * 0.3));
  
  return (
    
    <Box flexDirection="column" height={rows} width="100%" paddingX={1}>
      {/* Top bar: player name */}
      <Box height={1} flexDirection="row" justifyContent="space-between">
        <Box>
          <Text bold color="cyan">
            Player: {player?.name ?? '???'}
          </Text>
        </Box>
        <Box>
          <Text color="gray">Turn: 1</Text>
        </Box>
      </Box>

      {/* Divider line */}
      <Box height={1}>
        <Text color="gray">{'─'.repeat(columns - 2)}</Text>
      </Box>

      {/* Main content area */}
      <Box flexGrow={1} flexDirection="row">
        {/* Left: events / message area */}
        <Box
          flexGrow={1}
          flexDirection="column"
          borderStyle="single"
          borderColor="gray"
          paddingX={1}
        >
          <Box>
            <Text bold color="yellow">
              Events
            </Text>
          </Box>
          <Box flexDirection="column" marginTop={1}>
            {events.slice(-maxEventLines).map((evt) => (
              <Text key={evt.id} color="white">
                {evt.text}
              </Text>
            ))}
          </Box>
        </Box>

        {/* Right: attributes panel */}
        <Box
          width={attrWidth}
          flexDirection="column"
          borderStyle="single"
          borderColor="gray"
          paddingX={1}
          marginLeft={1}
        >
          <Box>
            <Text bold color="green">
              Attributes
            </Text>
          </Box>
          <Box flexDirection="column" marginTop={1}>
            <Text color="white">Name: {player?.name ?? '???'}</Text>
            <Text color="white">Health: {player?.health ?? '???'}</Text>
            <Text color="gray">(more to come...)</Text>
          </Box>
        </Box>
      </Box>

      {/* Bottom hint bar */}
      <Box height={1}>
        <Text color="gray">Press Esc to return to menu</Text>
      </Box>
    </Box>
  );
}

export { GameScreen };
