import BaseIncident from "../content-base/BaseIncident.js";
import {
  getIncidentByName,
  getAllIncidents,
} from "../content-base/incident-map.js";
import { Reactive } from "../Reactive.js";
import Player from "./Player.js";
import { MessageEntry } from "./types.js";

export default class Game extends Reactive<Game> {
  player: Player;
  incidents = new Map<string, BaseIncident>();

  currentEvent: string = "born";
  currentTurn: number = 1;

  constructor(player: Player) {
    super();
    this.player = player;
  }

  getNextEvent() {
    const incident = getIncidentByName(this.currentEvent);
    return incident.children;
  }

  initialInformation(): MessageEntry[] {
    return [{ id: 1, text: `Welcom, ${this.player.name}` }];
  }

  nextTurn() {
    this.currentTurn++;
    this.autoAdvanceThroughEmptyEvents();
    this.notify();
  }

  /**
   * Find the first incident whose `turn` field matches the given turn
   * number. Only returns incidents that are different from the current
   * event to avoid re-triggering the same incident.
   */
  private findScheduledForTurn(turn: number): BaseIncident | undefined {
    return getAllIncidents().find(
      (inc) => inc.turn === turn && inc.name !== this.currentEvent,
    );
  }

  /**
   * After advancing to a new incident, if it has no children (and isn't
   * the end), automatically fire any incident scheduled for the current
   * turn. Children always take priority — this only runs when the
   * current incident is a dead-end.
   */
  private autoAdvanceThroughEmptyEvents(): void {
    let incident = getIncidentByName(this.currentEvent);
    while (incident.children.length === 0 && !incident.theEnd) {
      const scheduled = this.findScheduledForTurn(this.currentTurn);
      if (!scheduled) break;
      scheduled.apply(this.player);
      this.currentEvent = scheduled.name;
      this.notify();
      incident = getIncidentByName(this.currentEvent);
    }
  }

  getCurrentEvent() {
    return getIncidentByName(this.currentEvent);
  }

  nextEvent(target: string) {
    const childrens = this.getNextEvent();
    let incident: BaseIncident | null = null;
    for (const each of childrens) {
      if (target === each.target.name) {
        incident = each.target;
      }
    }

    if (!incident) {
      throw new Error(`Could not find the option ${target}`);
    }

    incident.apply(this.player);
    this.currentEvent = incident.name;
    this.currentTurn++;
    this.autoAdvanceThroughEmptyEvents();
    this.notify();
  }
}
