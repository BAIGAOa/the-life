export type Listener = () => void;
export type Unsubscribe = () => void;


export abstract class Reactive<T = any> {
  
  private listeners: Set<Listener> = new Set();

 
  subscribe = (callback: Listener): Unsubscribe => {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  };

  
  getSnapshot = (): T => {
    return this as unknown as T;
  };


  protected notify = (): void => {
    this.listeners.forEach(cb => cb());
  };


  protected batchUpdate = (fn: () => void): void => {
    fn();
    this.notify();
  };
}