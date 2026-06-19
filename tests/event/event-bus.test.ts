import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { GameEvent } from '../../src/base/event/types.js';

beforeEach(async () => {
  await vi.resetModules();
});

async function freshEventBus() {
  return import('../../src/base/event/event-bus.js');
}

describe('event-bus', () => {
  describe('on / emit', () => {
    it('should call handler when matching event is emitted', async () => {
      const { on, emit } = await freshEventBus();
      const handler = vi.fn();
      on('player:nameChanged', handler);
      const event: GameEvent = {
        type: 'player:nameChanged',
        payload: { newName: 'Bob', oldName: 'Alice' },
      };
      emit(event);
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should not call handler for other event types', async () => {
      const { on, emit } = await freshEventBus();
      const handler = vi.fn();
      on('player:nameChanged', handler);
      emit({ type: 'player:created', payload: { name: 'Alice' } });
      expect(handler).not.toHaveBeenCalled();
    });

    it('should call all registered handlers for the same event', async () => {
      const { on, emit } = await freshEventBus();
      const h1 = vi.fn();
      const h2 = vi.fn();
      on('player:nameChanged', h1);
      on('player:nameChanged', h2);
      emit({
        type: 'player:nameChanged',
        payload: { newName: 'X', oldName: 'Y' },
      });
      expect(h1).toHaveBeenCalledTimes(1);
      expect(h2).toHaveBeenCalledTimes(1);
    });
  });

  describe('unsubscribe', () => {
    it('should remove the handler after calling unsubscribe', async () => {
      const { on, emit } = await freshEventBus();
      const handler = vi.fn();
      const unsub = on('player:nameChanged', handler);
      unsub();
      emit({
        type: 'player:nameChanged',
        payload: { newName: 'X', oldName: 'Y' },
      });
      expect(handler).not.toHaveBeenCalled();
    });

    it('should be idempotent — calling unsubscribe twice does not throw', async () => {
      const { on } = await freshEventBus();
      const unsub = on('player:nameChanged', vi.fn());
      unsub();
      expect(() => unsub()).not.toThrow();
    });
  });

  describe('clearAllListeners', () => {
    it('should remove all subscriptions', async () => {
      const { on, emit, clearAllListeners } = await freshEventBus();
      const h1 = vi.fn();
      const h2 = vi.fn();
      on('player:nameChanged', h1);
      on('player:created', h2);
      clearAllListeners();
      emit({
        type: 'player:nameChanged',
        payload: { newName: 'X', oldName: 'Y' },
      });
      emit({ type: 'player:created', payload: { name: 'X' } });
      expect(h1).not.toHaveBeenCalled();
      expect(h2).not.toHaveBeenCalled();
    });
  });

  describe('emit with no listeners', () => {
    it('should not throw when no handler is registered', async () => {
      const { emit } = await freshEventBus();
      expect(() =>
        emit({
          type: 'player:nameChanged',
          payload: { newName: 'X', oldName: 'Y' },
        }),
      ).not.toThrow();
    });
  });
});
