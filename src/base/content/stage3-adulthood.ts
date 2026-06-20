import GenericIncident from "../content-base/incident/GenericIncident.js";

export function registerAdulthood(): void {
  /* ── Leaves ──────────────────────────────────────── */
  new GenericIncident({
    name: "adult_teach", title: "events.adult.teach",
    descKey: "events.adult.teach.desc",
    message: "You choose the classroom over the podium. Students thrive under your care. Their successes become your legacy.",
    apply(p) { p.wisdom += 2; p.intelligence += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_royal_patron", title: "events.adult.royal_patron",
    descKey: "events.adult.royal_patron.desc",
    message: "The crown offers patronage. Unlimited resources, but your research must serve the throne. Independence traded for influence.",
    apply(p) { p.intelligence += 2; p.charisma += 1; p.wisdom -= 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_independent", title: "events.adult.independent",
    descKey: "events.adult.independent.desc",
    message: "You refuse patronage and pursue truth on your own terms. The work is harder but belongs to no one but you.",
    apply(p) { p.wisdom += 2; p.intelligence += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_battle", title: "events.adult.battle",
    descKey: "events.adult.battle.desc",
    message: "The decisive battle. Smoke, steel, and screams. When the field clears, you are still standing. But the cost is carved into your memory.",
    apply(p) { p.strength += 1; p.constitution += 2; p.wisdom += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_expand", title: "events.adult.expand",
    descKey: "events.adult.expand.desc",
    message: "You build an empire of trade. Ships bearing your flag cross every ocean. Your name is spoken in every port.",
    apply(p) { p.charisma += 2; p.intelligence += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_cautious_trade", title: "events.adult.cautious_trade",
    descKey: "events.adult.cautious_trade.desc",
    message: "Slow and steady. You build a modest but unshakeable business. Competitors who mocked your caution are long gone.",
    apply(p) { p.wisdom += 2; p.intelligence += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_recognized", title: "events.adult.recognized",
    descKey: "events.adult.recognized.desc",
    message: "Patrons compete for your work. Your pieces command prices you never imagined. But does recognition change the art?",
    apply(p) { p.charisma += 2; p.dexterity += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_struggle_artist", title: "events.adult.struggle_artist",
    descKey: "events.adult.struggle_artist.desc",
    message: "Years of obscurity. Your best work sits unsold. But something pure emerges from the struggle — a voice unmistakably yours.",
    apply(p) { p.wisdom += 2; p.constitution += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_enforcer", title: "events.adult.enforcer",
    descKey: "events.adult.enforcer.desc",
    message: "Strength becomes currency. People fear you. You begin to fear yourself.",
    apply(p) { p.strength += 3; p.wisdom -= 2; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_flee", title: "events.adult.flee",
    descKey: "events.adult.flee.desc",
    message: "You run. New city, new name, new life. But the past has a way of finding those who try to bury it.",
    apply(p) { p.dexterity += 1; p.constitution += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_confront", title: "events.adult.confront",
    descKey: "events.adult.confront.desc",
    message: "You face the betrayal head-on. The confrontation is brutal. When it ends, you are bloodied but standing — and finally free.",
    apply(p) { p.strength += 2; p.wisdom += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_family", title: "events.adult.family",
    descKey: "events.adult.family.desc",
    message: "You build a family. Small joys accumulate like compound interest. The laughter of children becomes your wealth.",
    apply(p) { p.charisma += 2; p.wisdom += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adult_trade_skill", title: "events.adult.trade_skill",
    descKey: "events.adult.trade_skill.desc",
    message: "You master a trade through decades of practice. Your hands know what your mind no longer needs to think.",
    apply(p) { p.dexterity += 2; p.strength += 1; },
    children: [], theEnd: false,
  });

  /* ── Level 1 (point to leaves) ───────────────────── */
  new GenericIncident({
    name: "adult_publish", title: "events.adult.publish",
    descKey: "events.adult.publish.desc",
    message: "Your treatise shakes the academic world. Rivals attack your methodology. Supporters defend you fiercely. The controversy only spreads your name further.",
    apply(p) { p.intelligence += 2; p.charisma += 1; },
    children: [
      { description: "incident.adult.royal_patron", target: "adult_royal_patron" },
      { description: "incident.adult.independent", target: "adult_independent" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adult_officer", title: "events.adult.officer",
    descKey: "events.adult.officer.desc",
    message: "You rise to command. Strategy becomes your art. Young soldiers look to you for courage you must manufacture daily.",
    apply(p) { p.intelligence += 2; p.charisma += 1; },
    children: [{ description: "incident.adult.decisive_battle", target: "adult_battle" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "adult_frontline", title: "events.adult.frontline",
    descKey: "events.adult.frontline.desc",
    message: "The front line has no room for theory. Instinct and reflexes keep you alive. You learn to read the air before the arrow flies.",
    apply(p) { p.dexterity += 2; p.strength += 1; },
    children: [{ description: "incident.adult.decisive_battle", target: "adult_battle" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "adult_heist", title: "events.adult.heist",
    descKey: "events.adult.heist.desc",
    message: "The plan is perfect. The execution flawless. But one loose thread unravels everything. Someone talked.",
    apply(p) { p.dexterity += 2; p.intelligence += 1; },
    children: [
      { description: "incident.adult.flee", target: "adult_flee" },
      { description: "incident.adult.confront", target: "adult_confront" },
    ], theEnd: false,
  });

  /* ── Path entries ─────────────────────────────────── */
  new GenericIncident({
    name: "adult_scholar", title: "events.adult.scholar",
    descKey: "events.adult.scholar.desc",
    message: "Years of study yield their first harvest. Your research draws attention, both admiring and envious.",
    apply(p) { p.intelligence += 2; },
    children: [
      { description: "incident.adult.publish", target: "adult_publish" },
      { description: "incident.adult.teach", target: "adult_teach" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adult_soldier", title: "events.adult.soldier",
    descKey: "events.adult.soldier.desc",
    message: "You enlist. The training breaks you down and rebuilds you. Your body becomes a weapon.",
    apply(p) { p.strength += 2; p.constitution += 1; },
    children: [
      { description: "incident.adult.officer", target: "adult_officer" },
      { description: "incident.adult.frontline", target: "adult_frontline" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adult_merchant", title: "events.adult.merchant",
    descKey: "events.adult.merchant.desc",
    message: "Your first investment triples. The market rewards the bold. You taste wealth and hunger for more.",
    apply(p) { p.intelligence += 1; p.charisma += 1; },
    children: [
      { description: "incident.adult.expand", target: "adult_expand" },
      { description: "incident.adult.cautious", target: "adult_cautious_trade" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adult_artist", title: "events.adult.artist",
    descKey: "events.adult.artist.desc",
    message: "Creation consumes you. Canvas, stone, or melody — the medium matters less than the truth you wrestle into form.",
    apply(p) { p.dexterity += 2; p.wisdom += 1; },
    children: [
      { description: "incident.adult.recognized", target: "adult_recognized" },
      { description: "incident.adult.struggle", target: "adult_struggle_artist" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adult_outlaw", title: "events.adult.outlaw",
    descKey: "events.adult.outlaw.desc",
    message: "The law is a line you step across. At first it feels like freedom. Then it feels like a cage of a different shape.",
    apply(p) { p.dexterity += 1; p.strength += 1; p.wisdom -= 1; },
    children: [
      { description: "incident.adult.heist", target: "adult_heist" },
      { description: "incident.adult.enforcer", target: "adult_enforcer" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adult_everyman", title: "events.adult.everyman",
    descKey: "events.adult.everyman.desc",
    message: "You take what work comes. The hours are long, the pay modest. But there is dignity in honest labor.",
    apply(p) { p.constitution += 2; },
    children: [
      { description: "incident.adult.family", target: "adult_family" },
      { description: "incident.adult.trade_skill", target: "adult_trade_skill" },
    ], theEnd: false,
  });

  /* ── Hub (scheduled turn 8) ──────────────────────── */
  new GenericIncident({
    name: "adult_hub", title: "events.adult.hub",
    descKey: "events.adult.hub.desc",
    message: "You enter the world as an adult. The choices you make now will echo for decades. What path will you walk?",
    apply() {},
    children: [
      { description: "incident.adult.scholar", target: "adult_scholar" },
      { description: "incident.adult.soldier", target: "adult_soldier" },
      { description: "incident.adult.merchant", target: "adult_merchant" },
      { description: "incident.adult.artist", target: "adult_artist" },
      { description: "incident.adult.outlaw", target: "adult_outlaw" },
      { description: "incident.adult.everyman", target: "adult_everyman" },
    ], theEnd: false, turn: 8,
  });

  /* ── Scheduled ────────────────────────────────────── */
  new GenericIncident({
    name: "adult_war", title: "events.adult.war",
    descKey: "events.adult.war.desc",
    message: "War. The word spreads like fire through dry grass. Everything you built sits in its path.",
    apply(p) { p.constitution += 1; p.wisdom += 1; },
    children: [], theEnd: false, turn: 10,
  });
  new GenericIncident({
    name: "adult_crisis", title: "events.adult.crisis",
    descKey: "events.adult.crisis.desc",
    message: "A choice presents itself: the easy wrong or the hard right. No one is watching. The decision reveals who you have become.",
    apply(p) { p.wisdom += 2; },
    children: [], theEnd: false, turn: 13,
  });
}
