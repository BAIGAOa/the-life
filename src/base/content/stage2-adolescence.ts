import GenericIncident from "../content-base/incident/GenericIncident.js";

export function registerAdolescence(): void {
  /* ── Leaves (no children) ────────────────────────── */
  new GenericIncident({
    name: "adol_accept_mentor", title: "events.adolescence.accept_mentor",
    descKey: "events.adolescence.accept_mentor.desc",
    message: "You pack your belongings. Your mother weeps. The road ahead is uncertain, but the hunger to know burns brighter than fear.",
    apply(p) { p.intelligence += 2; p.charisma -= 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_refuse_mentor", title: "events.adolescence.refuse_mentor",
    descKey: "events.adolescence.refuse_mentor.desc",
    message: "You stay. Duty to family outweighs ambition. But the road not taken haunts your quiet moments.",
    apply(p) { p.wisdom += 1; p.constitution += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_sea_storm", title: "events.adolescence.sea_storm",
    descKey: "events.adolescence.sea_storm.desc",
    message: "A storm nearly claims the ship. You help lash the sails in howling wind. When dawn breaks, the crew nods at you differently.",
    apply(p) { p.constitution += 2; p.strength += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_wolf", title: "events.adolescence.wolf",
    descKey: "events.adolescence.wolf.desc",
    message: "A wounded wolf, cornered, meets your eyes. You lower your weapon. It limps away. Strength is not always in the killing.",
    apply(p) { p.wisdom += 2; p.strength -= 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_masterpiece", title: "events.adolescence.masterpiece",
    descKey: "events.adolescence.masterpiece.desc",
    message: "Your first commissioned work exceeds all expectations. The client pays double. Your name begins to circulate.",
    apply(p) { p.dexterity += 2; p.charisma += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_accident", title: "events.adolescence.accident",
    descKey: "events.adolescence.accident.desc",
    message: "The saw slips. Three fingers on your left hand will never move the same way. You learn to work around the limitation.",
    apply(p) { p.dexterity -= 2; p.constitution += 2; p.wisdom += 1; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_crime", title: "events.adolescence.crime",
    descKey: "events.adolescence.crime.desc",
    message: "The gang's initiation requires a theft. You succeed, but the shopkeeper's terrified face stays with you.",
    apply(p) { p.dexterity += 2; p.wisdom -= 2; },
    children: [], theEnd: false,
  });
  new GenericIncident({
    name: "adol_manifesto", title: "events.adolescence.manifesto",
    descKey: "events.adolescence.manifesto.desc",
    message: "You write a manifesto. It spreads through the town. Some call you dangerous. Others call you prophet.",
    apply(p) { p.intelligence += 1; p.charisma += 2; },
    children: [], theEnd: false,
  });

  /* ── Level 1 (point to leaves) ───────────────────── */
  new GenericIncident({
    name: "adol_mentor_offer", title: "events.adolescence.mentor_offer",
    descKey: "events.adolescence.mentor_offer.desc",
    message: "A renowned scholar offers to take you as an apprentice. But it means leaving home, perhaps forever.",
    apply(p) { p.wisdom += 1; },
    children: [
      { description: "incident.adolescence.accept", target: "adol_accept_mentor" },
      { description: "incident.adolescence.refuse", target: "adol_refuse_mentor" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adol_stowaway", title: "events.adolescence.stowaway",
    descKey: "events.adolescence.stowaway.desc",
    message: "You sneak onto a merchant vessel. Discovered on the third day, the captain, impressed by your nerve, puts you to work instead of throwing you overboard.",
    apply(p) { p.dexterity += 2; p.charisma += 1; },
    children: [{ description: "incident.adolescence.sea_storm", target: "adol_sea_storm" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "adol_hunt", title: "events.adolescence.hunt",
    descKey: "events.adolescence.hunt.desc",
    message: "You join the hunting parties. The forest teaches what no book can: patience, precision, and the weight of taking a life.",
    apply(p) { p.strength += 1; p.dexterity += 1; p.wisdom += 1; },
    children: [{ description: "incident.adolescence.wolf", target: "adol_wolf" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "adol_gang", title: "events.adolescence.gang",
    descKey: "events.adolescence.gang.desc",
    message: "You find your tribe among the outcasts. Together you are strong. But the gang's code demands things you're not sure you believe in.",
    apply(p) { p.strength += 1; p.charisma += 1; p.wisdom -= 1; },
    children: [{ description: "incident.adolescence.crime", target: "adol_crime" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "adol_loner_rebel", title: "events.adolescence.loner_rebel",
    descKey: "events.adolescence.loner_rebel.desc",
    message: "You rebel alone. Your defiance is quiet but absolute. The world does not bend to you, but neither do you bend to it.",
    apply(p) { p.wisdom += 1; p.constitution += 1; },
    children: [{ description: "incident.adolescence.manifesto", target: "adol_manifesto" }],
    theEnd: false,
  });

  /* ── Level 2 ─────────────────────────────────────── */
  new GenericIncident({
    name: "adol_debate", title: "events.adolescence.debate",
    descKey: "events.adolescence.debate.desc",
    message: "You win the regional debate. Your opponent, twice your age, shakes your hand with grudging respect. Words are weapons.",
    apply(p) { p.intelligence += 1; p.charisma += 1; },
    children: [{ description: "incident.adolescence.mentor_offer", target: "adol_mentor_offer" }],
    theEnd: false,
  });
  new GenericIncident({
    name: "adol_astronomy", title: "events.adolescence.astronomy",
    descKey: "events.adolescence.astronomy.desc",
    message: "Nights spent charting stars. You find a celestial pattern no one has documented. The universe feels both vast and intimate.",
    apply(p) { p.intelligence += 2; p.wisdom += 1; },
    children: [{ description: "incident.adolescence.mentor_offer", target: "adol_mentor_offer" }],
    theEnd: false,
  });

  /* ── Path entries ─────────────────────────────────── */
  new GenericIncident({
    name: "adol_scholar", title: "events.adolescence.scholar",
    descKey: "events.adolescence.scholar.desc",
    message: "You devour every book within reach. The local tutor calls you gifted. But knowledge without experience is hollow.",
    apply(p) { p.intelligence += 2; },
    children: [
      { description: "incident.adolescence.debate", target: "adol_debate" },
      { description: "incident.adolescence.astronomy", target: "adol_astronomy" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adol_adventurer", title: "events.adolescence.adventurer",
    descKey: "events.adolescence.adventurer.desc",
    message: "Restlessness courses through you. The horizon calls. Maps of distant lands cover your walls.",
    apply(p) { p.dexterity += 1; p.constitution += 1; },
    children: [
      { description: "incident.adolescence.stowaway", target: "adol_stowaway" },
      { description: "incident.adolescence.hunt", target: "adol_hunt" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adol_crafter", title: "events.adolescence.crafter",
    descKey: "events.adolescence.crafter.desc",
    message: "You apprentice at the workshop. Your hands learn what your mind cannot articulate. Wood, metal, and leather become your vocabulary.",
    apply(p) { p.dexterity += 2; },
    children: [
      { description: "incident.adolescence.masterpiece", target: "adol_masterpiece" },
      { description: "incident.adolescence.accident", target: "adol_accident" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "adol_rebel", title: "events.adolescence.rebel",
    descKey: "events.adolescence.rebel.desc",
    message: "Rules feel like chains. Authority feels like oppression. You push back against everything and everyone.",
    apply(p) { p.strength += 1; p.wisdom -= 1; },
    children: [
      { description: "incident.adolescence.gang", target: "adol_gang" },
      { description: "incident.adolescence.loner", target: "adol_loner_rebel" },
    ], theEnd: false,
  });

  /* ── Hub (scheduled turn 4) ──────────────────────── */
  new GenericIncident({
    name: "adol_hub", title: "events.adolescence.hub",
    descKey: "events.adolescence.hub.desc",
    message: "You stand at the threshold of youth. The world beyond the familiar beckons. Who will you become?",
    apply() {},
    children: [
      { description: "incident.adolescence.scholar", target: "adol_scholar" },
      { description: "incident.adolescence.adventurer", target: "adol_adventurer" },
      { description: "incident.adolescence.crafter", target: "adol_crafter" },
      { description: "incident.adolescence.rebel", target: "adol_rebel" },
    ], theEnd: false, turn: 4,
  });

  /* ── Scheduled ────────────────────────────────────── */
  new GenericIncident({
    name: "adol_love", title: "events.adolescence.love",
    descKey: "events.adolescence.love.desc",
    message: "Someone looks at you differently. The world suddenly has a center, and it is not you. First love batters the heart like a storm.",
    apply(p) { p.charisma += 1; p.wisdom += 1; },
    children: [], theEnd: false, turn: 6,
  });
  new GenericIncident({
    name: "adol_betrayal", title: "events.adolescence.betrayal",
    descKey: "events.adolescence.betrayal.desc",
    message: "Someone you trusted sells your secret. The wound is deep because it came from inside the walls. You learn to guard your heart.",
    apply(p) { p.wisdom += 1; p.charisma -= 1; p.constitution += 1; },
    children: [], theEnd: false, turn: 7,
  });
}
