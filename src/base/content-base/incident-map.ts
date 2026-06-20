import BaseIncident from "./BaseIncident.js";

const incidentMap = new Map<string, BaseIncident>();

export function registerIncident(incident: BaseIncident) {
    if (incidentMap.has(incident.name)) {
        console.warn(`Incident with name "${incident.name}" is already registered. Skipping.`);
        return;
    }
    incidentMap.set(incident.name, incident);
}


export function getAllIncidents(): BaseIncident[] {
    return Array.from(incidentMap.values());
}


export function getIncidentByName(name: string){
    const incident = incidentMap.get(name);
    if(!incident){
        throw new Error(`Incident with name "${name}" not found.`);
    }
    return incident;
}