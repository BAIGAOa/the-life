import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { GameEvent } from '../../src/base/event/types.js';

beforeEach(async () => {
  await vi.resetModules();
});

async function freshModules() {
  const eventBus = await import('../../src/base/event/event-bus.js');
  const playerModule = await import('../../src/base/game/Player.js');
  return { Player: playerModule.default, ...eventBus };
}

describe('Player', () => {
  describe('constructor', () => {
    it('should set the name via getter', async () => {
      const { Player } = await freshModules();
      const player = new Player('Alice');
      expect(player.name).toBe('Alice');
    });

    it('should emit player:created on construction', async () => {
      const { Player, on } = await freshModules();
      const handler = vi.fn();
      on('player:created', handler);
      new Player('Alice');
      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0]![0] as GameEvent & { type: 'player:created' };
      expect(event.type).toBe('player:created');
      expect(event.payload.name).toBe('Alice');
    });
  });

  describe('setName', () => {
    it('should update the name', async () => {
      const { Player } = await freshModules();
      const player = new Player('Alice');
      player.setName('Bob');
      expect(player.name).toBe('Bob');
    });

    it('should emit player:nameChanged with old and new names', async () => {
      const { Player, on } = await freshModules();
      const player = new Player('Alice');
      const handler = vi.fn();
      on('player:nameChanged', handler);
      player.setName('Bob');
      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0]![0] as GameEvent & {
        type: 'player:nameChanged';
      };
      expect(event.type).toBe('player:nameChanged');
      expect(event.payload.oldName).toBe('Alice');
      expect(event.payload.newName).toBe('Bob');
    });

    it('should NOT emit when the name is unchanged', async () => {
      const { Player, on } = await freshModules();
      const player = new Player('Alice');
      const handler = vi.fn();
      on('player:nameChanged', handler);
      player.setName('Alice');
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('independent instances', () => {
    it('should not interfere with each other', async () => {
      const { Player, on } = await freshModules();
      const handler = vi.fn();
      on('player:nameChanged', handler);

      const p1 = new Player('One');
      const p2 = new Player('Two');
      p1.setName('First');
      p2.setName('Second');

      expect(p1.name).toBe('First');
      expect(p2.name).toBe('Second');
      expect(handler).toHaveBeenCalledTimes(2);
    });
  });
});
