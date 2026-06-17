import type Player from './Player.js';

let currentPlayer: Player | null = null;

/** Set the active Player instance. Pass null to clear. */
export function setCurrentPlayer(player: Player | null): void {
  currentPlayer = player;
}

/** Get the active Player instance, or null if no game is running. */
export function getCurrentPlayer(): Player | null {
  return currentPlayer;
}

/** Check whether an active Player exists. */
export function hasCurrentPlayer(): boolean {
  return currentPlayer !== null;
}
