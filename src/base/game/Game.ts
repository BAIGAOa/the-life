import BaseIncident from "../content-base/BaseIncident.js";
import { getIncidentByName } from "../content-base/incident-map.js";
import { Reactive } from "../Reactive.js";
import Player from "./Player.js";
import { MessageEntry } from "./types.js";


export default class Game extends Reactive<Game>{
    public player: Player
    public incidents = new Map<string, BaseIncident>()

    public currentEvent: string = 'born'

    
    constructor(player: Player){
        super()
        this.player = player
    }

    getNextEvent() {
        const incident = getIncidentByName(this.currentEvent)
        return incident.children
    }

    initialInformation(): MessageEntry[]{
        return [
            {id: 1, text: `Welcom, ${this.player.name}`}
        ]
    }

    getCurrentEvent(){
        return getIncidentByName(this.currentEvent)
    }

    nextEvent(target: string){
        const childrens = this.getNextEvent()
        let incident: BaseIncident | null = null
        for(const each of childrens){
            if(target === each.target.name){
                incident = each.target
            }
        }

        if (!incident) {
            throw new Error(`Could not find the option ${target}`)
        }
        
        this.currentEvent = incident.name
    }
}