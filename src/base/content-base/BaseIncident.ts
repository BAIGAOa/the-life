import z from "zod";
import Player from "../game/Player.js";
import { getIncidentByName, registerIncident } from "./incident-map.js";

export const childrenSchema = z.array(
  z.object({
    description: z.string(),
    target: z.string(),
  }),
);

export const BaseIncidentSchema = z.object({
  name: z.string(),
  title: z.string(),
  descKey: z.string(),
  children: childrenSchema,
  theEnd: z.boolean(),
  turn: z.number().optional(),
});

export type ChildIncident = z.infer<typeof childrenSchema>;

export type BaseIncidentOptions = z.infer<typeof BaseIncidentSchema>;

export type Child = {
  description: string;
  target: BaseIncident;
};

export default class BaseIncident {
  public name = "No-Name-Incident";
  public title = "Event-Key";
  public descKey = "Event-Desc-Key";

  public children: Child[] = [];
  public theEnd = false;

  public turn: number;

  constructor(baseIncidentOptions: BaseIncidentOptions) {
    this.name = baseIncidentOptions.name;

    registerIncident(this);

    this.children = baseIncidentOptions.children.map((each) => {
      return {
        description: each.description,
        target: getIncidentByName(each.target),
      };
    });
    this.theEnd = baseIncidentOptions.theEnd;
    this.title = baseIncidentOptions.title;
    this.descKey = baseIncidentOptions.descKey;
    this.turn = baseIncidentOptions.turn ?? -1;
  }

  apply(player: Player) {
    player.health -= 10;
  }

  message(player: Player): string {
    return `An incident occurred! ${player.name} lost 10 health.`;
  }
}
