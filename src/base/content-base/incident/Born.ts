import Player from "../../game/Player.js";
import BaseIncident from "../BaseIncident.js";

export default class Born extends BaseIncident{
    
    override message(_player: Player): string {
        return 'You are born'
    }

    override apply(_player: Player): void {
        /** nothing to do */
    }
}