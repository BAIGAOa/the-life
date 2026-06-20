import GenericIncident from "../content-base/incident/GenericIncident.js";
import Born from "../content-base/incident/Born.js";

export function registerChildhood(): void {
  /* ── Leaf incidents first (no children) ──────────── */
  new GenericIncident({
    name: "child_break_vase", title: "events.childhood.break_vase",
    descKey: "events.childhood.break_vase.desc",
    message: "Your mother's favorite vase lies shattered. You were testing if it would always land the same way. A lesson in consequences.",
    apply(p) { p.intelligence += 1; p.wisdom += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "child_first_lie", title: "events.childhood.lie",
    descKey: "events.childhood.lie.desc",
    message: "You tell your first deliberate lie and it works. A new tool in your kit. The truth suddenly seems... optional.",
    apply(p) { p.charisma += 1; p.wisdom -= 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "child_storm", title: "events.childhood.storm",
    descKey: "events.childhood.storm.desc",
    message: "A thunderstorm terrifies the household. You alone sit by the window, transfixed by the raw power. Fear is a choice.",
    apply(p) { p.wisdom += 1; p.constitution += 1; },
    children: [], theEnd: false,
  });

  /* ── Level 1 (children point to leaves) ──────────── */
  new GenericIncident({
    name: "child_read", title: "events.childhood.read",
    descKey: "events.childhood.read.desc",
    message: "You discover books. Symbols become words, words become worlds. The library is your sanctuary.",
    apply(p) { p.intelligence += 2; },
    children: [{ description: "incident.childhood.break_vase", target: "child_break_vase" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "child_explore", title: "events.childhood.explore",
    descKey: "events.childhood.explore.desc",
    message: "The garden becomes a continent. Insects are monsters, puddles are oceans. You map it all in your mind.",
    apply(p) { p.intelligence += 1; p.dexterity += 1; },
    children: [{ description: "incident.childhood.break_vase", target: "child_break_vase" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "child_befriend", title: "events.childhood.befriend",
    descKey: "events.childhood.befriend.desc",
    message: "Your first friend. The concept of 'us' takes shape. Loyalty is born in shared secrets.",
    apply(p) { p.charisma += 2; },
    children: [{ description: "incident.childhood.lie", target: "child_first_lie" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "child_showoff", title: "events.childhood.showoff",
    descKey: "events.childhood.showoff.desc",
    message: "You perform for attention. The applause is intoxicating. You learn that charm opens doors.",
    apply(p) { p.charisma += 1; p.dexterity += 1; },
    children: [{ description: "incident.childhood.lie", target: "child_first_lie" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "child_animals", title: "events.childhood.animals",
    descKey: "events.childhood.animals.desc",
    message: "Animals trust you. They sense the stillness in your heart. You learn their language of gesture and patience.",
    apply(p) { p.wisdom += 2; },
    children: [{ description: "incident.childhood.storm", target: "child_storm" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "child_draw", title: "events.childhood.draw",
    descKey: "events.childhood.draw.desc",
    message: "You draw what you see. Your sketches capture details adults miss. A gift for observation emerges.",
    apply(p) { p.wisdom += 1; p.intelligence += 1; },
    children: [{ description: "incident.childhood.storm", target: "child_storm" }],
    theEnd: false,
  });

  /* ── Path entry points ───────────────────────────── */
  new GenericIncident({
    name: "child_curious_start", title: "events.childhood.curious",
    descKey: "events.childhood.curious.desc",
    message: "You study everything with wide eyes. The patterns of light, the texture of cloth, the rhythm of voices.",
    apply(p) { p.intelligence += 1; },
    children: [
      { description: "incident.childhood.read", target: "child_read" },
      { description: "incident.childhood.explore", target: "child_explore" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "child_social_start", title: "events.childhood.social",
    descKey: "events.childhood.social.desc",
    message: "You smile at strangers. They smile back. A transaction of warmth. You discover your effect on others.",
    apply(p) { p.charisma += 1; },
    children: [
      { description: "incident.childhood.befriend", target: "child_befriend" },
      { description: "incident.childhood.show_off", target: "child_showoff" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "child_quiet_start", title: "events.childhood.quiet",
    descKey: "events.childhood.quiet.desc",
    message: "You watch from corners. The overlooked perspective reveals hidden truths. Silence is your first language.",
    apply(p) { p.wisdom += 1; },
    children: [
      { description: "incident.childhood.animals", target: "child_animals" },
      { description: "incident.childhood.draw", target: "child_draw" },
    ], theEnd: false,
  });

  /* ── Scheduled ────────────────────────────────────── */
  new GenericIncident({
    name: "child_sick", title: "events.childhood.sick",
    descKey: "events.childhood.sick.desc",
    message: "Fever grips you. The world blurs for days. You emerge thinner, more aware of the fragility of your body.",
    apply(p) { p.health -= 5; p.constitution += 1; },
    children: [], theEnd: false, turn: 2,
  });
  new GenericIncident({
    name: "child_talent", title: "events.childhood.talent",
    descKey: "events.childhood.talent.desc",
    message: "A visiting relative notices you have a gift. The attention is both thrilling and uncomfortable. Expectations settle on your shoulders.",
    apply(p) { p.wisdom += 1; p.charisma += 1; },
    children: [], theEnd: false, turn: 3,
  });

  /* ── Root: Born ───────────────────────────────────── */
  new Born({
    name: "born", title: "events.born", descKey: "events.born.desc",
    children: [
      { description: "incident.childhood.curious_choice", target: "child_curious_start" },
      { description: "incident.childhood.social_choice", target: "child_social_start" },
      { description: "incident.childhood.quiet_choice", target: "child_quiet_start" },
    ], theEnd: false,
  });
}
