import { registerAction } from "./keyboard/keyboard-manager.js";

export function registerAllActions(){
  registerAction({
    cat: 'base',
    actionId: 'exit',
    action: () => process.exit(0),
    title: 'action.exit',
    keys: ['ctrl+q']
  })
}


