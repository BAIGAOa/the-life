/** Payload for player name changes */
export interface PlayerNameChangedPayload {
  newName: string;
  oldName: string;
}

/** Emitted after Player construction */
export interface PlayerCreatedPayload {
  name: string;
}

/** All game events — discriminated by `type` literal */
export type GameEvent =
  | { type: 'player:nameChanged'; payload: PlayerNameChangedPayload }
  | { type: 'player:created'; payload: PlayerCreatedPayload };

export type EventHandler<T extends GameEvent = GameEvent> = (event: T) => void;

export type Unsubscribe = () => void;
