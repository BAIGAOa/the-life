import BaseIncident, { type BaseIncidentOptions } from "../BaseIncident.js";
import Player from "../../game/Player.js";

export interface GenericIncidentOptions extends BaseIncidentOptions {
  message: string | ((player: Player) => string);
  apply?: (player: Player) => void;
}

/**
 * A reusable incident whose message and side-effects are configured
 * at construction time rather than requiring a dedicated subclass.
 */
export default class GenericIncident extends BaseIncident {
  private _message: string | ((player: Player) => string);
  private _apply: ((player: Player) => void) | undefined;

  constructor(options: GenericIncidentOptions) {
    super(options);
    this._message = options.message;
    this._apply = options.apply;
  }

  apply(player: Player): void {
    this._apply?.(player);
  }

  message(player: Player): string {
    return typeof this._message === "function"
      ? this._message(player)
      : this._message;
  }
}
