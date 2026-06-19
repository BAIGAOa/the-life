import { KeyboardAction } from "./types.js";

const actions = new Map<string, Map<string, KeyboardAction>>()

export function registerAction(action: KeyboardAction) {
  if(!actions.has(action.cat)){
    actions.set(action.cat, new Map<string, KeyboardAction >())
  }
  
  const cat = actions.get(action.cat)!
  
  if(cat.has(action.actionId))return

  cat.set(action.actionId, action)
}

export function getAllAction() {
  const merged = new Map<string, KeyboardAction>()

  for (const [, catMap] of actions) {
    for (const [actionId, entry] of catMap) {
      merged.set(actionId, entry)
    }
  }

  return Array.from(merged.values())
}

export function hasKeys(entry: { keys?: string[] }): entry is { keys: string[] } {
  return entry.keys !== undefined;
}

export function getActionCategories() {
  const result: { id: string; items: KeyboardAction[] }[] = []

  for (const [catId, catMap] of actions) {
    result.push({
      id: catId,
      items: Array.from(catMap.values()),
    })
  }

  return result
}
