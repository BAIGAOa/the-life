import BaseIncident, { type BaseIncidentOptions } from "../BaseIncident.js";
import Player from "../../game/Player.js";

/**
 * A turn-scheduled incident that fires at turn 2.
 * Demonstrates the scheduled-event system: it only triggers when the
 * current incident has no children, giving children priority.
 */
export default class Walking extends BaseIncident {
  constructor(options: BaseIncidentOptions) {
    super(options);
  }

  apply(player: Player): void {
    // Walking is a minor exertion — small health cost.
    player.health -= 2;
    player.dexterity += 1;
  }

  message(_player: Player): string {
    return "You learn to walk. The world expands around you.";
  }
}
