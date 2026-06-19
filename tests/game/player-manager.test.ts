import { describe, it, expect, beforeEach, vi } from 'vitest';

beforeEach(async () => {
  await vi.resetModules();
});

async function freshPlayerManager() {
  return import('../../src/base/game/player-manager.js');
}

// We need a mock Player class since the manager stores Player | null.
class FakePlayer {
  constructor(public name: string) {}
}

describe('player-manager', () => {
  describe('initial state', () => {
    it('should return null when no player has been set', async () => {
      const { getCurrentPlayer } = await freshPlayerManager();
      expect(getCurrentPlayer()).toBeNull();
    });

    it('should return false from hasCurrentPlayer initially', async () => {
      const { hasCurrentPlayer } = await freshPlayerManager();
      expect(hasCurrentPlayer()).toBe(false);
    });
  });

  describe('setCurrentPlayer / getCurrentPlayer', () => {
    it('should return the player after setting', async () => {
      const { setCurrentPlayer, getCurrentPlayer } =
        await freshPlayerManager();
      const player = new FakePlayer('Test') as any;
      setCurrentPlayer(player);
      expect(getCurrentPlayer()).toBe(player);
    });

    it('should return null after setting null', async () => {
      const { setCurrentPlayer, getCurrentPlayer } =
        await freshPlayerManager();
      const player = new FakePlayer('Test') as any;
      setCurrentPlayer(player);
      setCurrentPlayer(null);
      expect(getCurrentPlayer()).toBeNull();
    });
  });

  describe('hasCurrentPlayer', () => {
    it('should return true after setting a player', async () => {
      const { setCurrentPlayer, hasCurrentPlayer } =
        await freshPlayerManager();
      setCurrentPlayer(new FakePlayer('Test') as any);
      expect(hasCurrentPlayer()).toBe(true);
    });

    it('should return false after clearing', async () => {
      const { setCurrentPlayer, hasCurrentPlayer } =
        await freshPlayerManager();
      setCurrentPlayer(new FakePlayer('Test') as any);
      setCurrentPlayer(null);
      expect(hasCurrentPlayer()).toBe(false);
    });
  });
});
