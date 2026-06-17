import type { GameEvent, EventHandler, Unsubscribe } from './types.js';

const listeners = new Map<string, Set<EventHandler<any>>>();

/** Subscribe to a game event. Returns an unsubscribe function. */
export function on<T extends GameEvent>(
  eventType: T['type'],
  handler: EventHandler<T>,
): Unsubscribe {
  let set = listeners.get(eventType);
  if (!set) {
    set = new Set();
    listeners.set(eventType, set);
  }
  set.add(handler);
  return () => {
    set.delete(handler);
  };
}

/** Emit a game event to all registered handlers. */
export function emit<T extends GameEvent>(event: T): void {
  const handlers = listeners.get(event.type);
  if (!handlers) return;
  for (const handler of handlers) {
    handler(event);
  }
}

/** Remove all listeners. Test-only; not used in production. */
export function clearAllListeners(): void {
  listeners.clear();
}
