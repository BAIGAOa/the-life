export type Listener = () => void;
export type Unsubscribe = () => void;


export abstract class Reactive<T = any> {

  private listeners: Set<Listener> = new Set();

  private _version = 0;


  subscribe = (callback: Listener): Unsubscribe => {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  };

  /**
   * Returns a monotonically increasing version number so that
   * React's `useSyncExternalStore` detects state changes via
   * `Object.is` comparison. Returning `this` (same reference)
   * would cause React to skip re-renders even after `notify()`.
   */
  getSnapshot = (): T => {
    return this._version as unknown as T;
  };


  protected notify = (): void => {
    this._version++;
    this.listeners.forEach(cb => cb());
  };


  protected batchUpdate = (fn: () => void): void => {
    fn();
    this.notify();
  };
}