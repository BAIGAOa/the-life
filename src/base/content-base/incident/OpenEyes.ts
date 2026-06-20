import BaseIncident from "../BaseIncident.js";
import Player from "../../game/Player.js";

export default class OpenEyes extends BaseIncident {
    override message(_player: Player): string {
        return 'You open your eyes for the first time. Light floods in.';
    }

    override apply(_player: Player): void {
        /** nothing to do */
    }
}
