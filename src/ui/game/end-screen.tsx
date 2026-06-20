import React, { useEffect } from "react";
import { Box, Text, useWindowSize } from "ink";
import { useI18n, useKeyboard, gotoScreen } from "@baigao_h/ink-kit";
import Game from "../../base/game/Game.js";
import Player from "../../base/game/Player.js";
import { GameScreen } from "./game-screen.js";

export interface EndScreenProps {
  game: Game;
}

function statBar(label: string, value: number, max: number, color: string) {
  const filled = Math.max(0, Math.min(max, Math.round((value / max) * 10)));
  const empty = 10 - filled;
  return (
    <Box key={label} flexDirection="row">
      <Box width={14}>
        <Text color={color}>{label}</Text>
      </Box>
      <Text color={color}>
        {"█".repeat(filled)}{"░".repeat(empty)} {value}
      </Text>
    </Box>
  );
}

export function EndScreen({ game }: EndScreenProps) {
  const { t } = useI18n();
  const { boundKeyboard } = useKeyboard();
  const { rows, columns } = useWindowSize();

  const ending = game.getCurrentEvent();

  useEffect(() => {
    const unbindEnter = boundKeyboard(["return"], () => {
      const player = new Player("Adventurer");
      const newGame = new Game(player);
      gotoScreen(GameScreen, { game: newGame });
    });
    const unbindQ = boundKeyboard(["q"], () => process.exit(0), {
      onlyThis: true,
    });
    return () => {
      unbindEnter();
      unbindQ();
    };
  }, []);

  const cardWidth = Math.min(72, columns - 4);

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={rows}
      paddingX={1}
    >
      {/* Top border */}
      <Box width={cardWidth}>
        <Text color="yellow">{"═".repeat(cardWidth)}</Text>
      </Box>

      {/* Title */}
      <Box width={cardWidth} justifyContent="center" paddingY={1}>
        <Text bold color="yellow">
          {t(ending.title)}
        </Text>
      </Box>

      <Box width={cardWidth}>
        <Text color="yellow">{"─".repeat(cardWidth)}</Text>
      </Box>

      {/* Narrative */}
      <Box
        width={cardWidth}
        paddingX={2}
        paddingY={1}
        flexDirection="column"
      >
        <Text color="white">{t(ending.descKey)}</Text>
      </Box>

      <Box width={cardWidth}>
        <Text color="yellow">{"─".repeat(cardWidth)}</Text>
      </Box>

      {/* Character sheet */}
      <Box
        width={cardWidth}
        paddingX={2}
        paddingY={1}
        flexDirection="column"
      >
        <Box marginBottom={1}>
          <Text bold color="cyan">
            {game.player.name}
          </Text>
          <Text color="gray"> — Turn {game.currentTurn}</Text>
        </Box>
        {statBar("Health", game.player.health, 100, "green")}
        {statBar("Strength", game.player.strength, 20, "red")}
        {statBar("Dexterity", game.player.dexterity, 20, "yellow")}
        {statBar("Intelligence", game.player.intelligence, 20, "blue")}
        {statBar("Constitution", game.player.constitution, 20, "magenta")}
        {statBar("Wisdom", game.player.wisdom, 20, "cyan")}
        {statBar("Charisma", game.player.charisma, 20, "green")}
      </Box>

      <Box width={cardWidth}>
        <Text color="yellow">{"─".repeat(cardWidth)}</Text>
      </Box>

      {/* Actions */}
      <Box
        width={cardWidth}
        justifyContent="center"
        paddingY={1}
        flexDirection="column"
        alignItems="center"
      >
        <Text color="white">Press Enter to start a new life</Text>
        <Text color="gray">Press Q to quit</Text>
      </Box>

      {/* Bottom border */}
      <Box width={cardWidth}>
        <Text color="yellow">{"═".repeat(cardWidth)}</Text>
      </Box>
    </Box>
  );
}
