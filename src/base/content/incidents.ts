import Born from "../content-base/incident/Born.js"

let init = false

export function loadContent(){
    if(!init){
        init = true

        new Born({
            name: 'born',
            children: [

            ],
            theEnd: false
        })
    }
}