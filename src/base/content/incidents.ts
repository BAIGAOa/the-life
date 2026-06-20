import { registerEndings } from "./endings.js";
import { registerChildhood } from "./stage1-childhood.js";
import { registerAdolescence } from "./stage2-adolescence.js";
import { registerAdulthood } from "./stage3-adulthood.js";
import { registerTwilight } from "./stage4-twilight.js";

let init = false;

/**
 * Load all game content. Idempotent — subsequent calls are no-ops.
 * Registration order matters: leaf incidents and endings must be
 * registered before the incidents that reference them as children.
 */
export function loadContent() {
  if (!init) {
    init = true;
    registerEndings();
    registerChildhood();
    registerAdolescence();
    registerAdulthood();
    registerTwilight();
  }
}
