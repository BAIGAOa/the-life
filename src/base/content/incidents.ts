import Born from "../content-base/incident/Born.js"
import FirstCry from "../content-base/incident/FirstCry.js";
import OpenEyes from "../content-base/incident/OpenEyes.js";
import FeelHungry from "../content-base/incident/FeelHungry.js";
import MeetParents from "../content-base/incident/MeetParents.js";

let init = false

export function loadContent(){
    if(!init){
        init = true

        new FirstCry({
            name: 'first_cry',
            children: [],
            theEnd: false
        })

        new OpenEyes({
            name: 'open_eyes',
            children: [],
            theEnd: false
        })

        new FeelHungry({
            name: 'feel_hungry',
            children: [],
            theEnd: false
        })

        new MeetParents({
            name: 'meet_parents',
            children: [],
            theEnd: false
        })

        new Born({
            name: 'born',
            children: [
                { description: 'incident.born.cry', target: 'first_cry' },
                { description: 'incident.born.open_eyes', target: 'open_eyes' },
                { description: 'incident.born.hungry', target: 'feel_hungry' },
                { description: 'incident.born.meet_parents', target: 'meet_parents' },
            ],
            theEnd: false
        })
    }
}
