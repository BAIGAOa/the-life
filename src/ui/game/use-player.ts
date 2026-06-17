import { useSyncExternalStore } from 'react';
import { on } from '../../base/event/event-bus.js';
import { getCurrentPlayer } from '../../base/game/player-manager.js';
import type Player from '../../base/game/Player.js';

// Module-level version counter so all hook instances share the same trigger.
let version = 0;
const listeners = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function notify(): void {
  version++;
  for (const cb of listeners) {
    cb();
  }
}

// Global subscription — set up once when the module loads.
let _initialized = false;
function ensureSubscribed(): void {
  if (_initialized) return;
  _initialized = true;
  on('player:nameChanged', () => notify());
  on('player:created', () => notify());
}

/** Returns the current Player instance and re-renders when it changes. */
export function usePlayer(): Player | null {
  ensureSubscribed();

  // useSyncExternalStore ensures we always read the latest player
  // after an event fires, without stale closure issues.
  return useSyncExternalStore(
    subscribe,
    getCurrentPlayer,
  );
}
