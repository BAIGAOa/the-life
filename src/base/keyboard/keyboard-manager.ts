import { ShortcutOperationEntry } from "@baigao_h/ink-kit";

const actions = new Map<string, Map<string, ShortcutOperationEntry>>()

export function registerAction(action: ShortcutOperationEntry & {
  title: string,
  cat: string
}) {
  if(!actions.has(action.cat)){
    actions.set(action.cat, new Map<string, ShortcutOperationEntry>())
  }
  
  const cat = actions.get(action.cat)!
  
  if(cat.has(action.actionId))return

  cat.set(action.actionId, action)
}

export function getAllAction() {
  const actions = new Set<ShortcutOperationEntry>()
  const result: ShortcutOperationEntry[] = []

  
    
  
  
}

export function hasKeys(entry: { keys?: string[] }): entry is { keys: string[] } {
  return entry.keys !== undefined;
}
