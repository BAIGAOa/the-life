import BaseIncident from "../BaseIncident.js";
import Player from "../../game/Player.js";

export default class FeelHungry extends BaseIncident {
    override message(_player: Player): string {
        return 'A strange emptiness gnaws at your stomach. You are hungry.';
    }

    override apply(_player: Player): void {
        /** nothing to do */
    }
}
