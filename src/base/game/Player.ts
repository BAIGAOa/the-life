import { emit } from '../event/event-bus.js';

/** Player base class. Emits events via the shared event bus on property changes. */
export default class Player {
  private _name: string;

  public health = 100

  public strength = 10
  public dexterity = 10
  public intelligence = 10
  public constitution = 10
  public wisdom = 10
  public charisma = 10

  constructor(name: string) {
    this._name = name;
    emit({ type: 'player:created', payload: { name } });
  }

  get name(): string {
    return this._name;
  }

  /** Set the player's name and notify subscribers. No-op if the value is unchanged. */
  setName(newName: string): void {
    const oldName = this._name;
    if (newName === oldName) return;
    this._name = newName;
    emit({ type: 'player:nameChanged', payload: { newName, oldName } });
  }
}
