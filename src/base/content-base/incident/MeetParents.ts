import BaseIncident from "../BaseIncident.js";
import Player from "../../game/Player.js";

export default class MeetParents extends BaseIncident {
    override message(_player: Player): string {
        return 'Warm hands hold you. Familiar voices. These must be your parents.';
    }

    override apply(_player: Player): void {
        /** nothing to do */
    }
}
