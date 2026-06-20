import BaseIncident from "../BaseIncident.js";
import Player from "../../game/Player.js";

export default class FirstCry extends BaseIncident {
    override message(_player: Player): string {
        return 'You let out your first cry. The world hears you.';
    }

    override apply(_player: Player): void {
        /** nothing to do */
    }
}
