import GenericIncident from "../content-base/incident/GenericIncident.js";

export function registerTwilight(): void {
  /* ── Leaves pointing to endings ──────────────────── */
  new GenericIncident({
    name: "twilight_succeed", title: "events.twilight.succeed",
    descKey: "events.twilight.succeed.desc",
    message: "Against all odds, you succeed. The world takes notice one final time. Your name will be remembered.",
    apply(p) { p.charisma += 2; },
    children: [
      { description: "incident.twilight.scholar_end", target: "ending_scholar" },
      { description: "incident.twilight.hero_end", target: "ending_hero" },
      { description: "incident.twilight.artisan_end", target: "ending_artisan" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_fail", title: "events.twilight.fail",
    descKey: "events.twilight.fail.desc",
    message: "The final gamble fails. The mountain was too high. But in the attempt, you discovered something about yourself.",
    apply(p) { p.wisdom += 2; },
    children: [
      { description: "incident.twilight.sage_end", target: "ending_sage" },
      { description: "incident.twilight.visionary_end", target: "ending_visionary" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_family", title: "events.twilight.family",
    descKey: "events.twilight.family.desc",
    message: "Surrounded by family, you watch the next generation step forward. Your story lives on in theirs.",
    apply(p) { p.charisma += 1; p.wisdom += 1; },
    children: [
      { description: "incident.twilight.parent_end", target: "ending_parent" },
      { description: "incident.twilight.teacher_end", target: "ending_teacher" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_solitude", title: "events.twilight.solitude",
    descKey: "events.twilight.solitude.desc",
    message: "You retreat into nature. The mountain accepts you without judgment. Peace settles into your bones like a long-awaited guest.",
    apply(p) { p.wisdom += 2; p.constitution += 1; },
    children: [
      { description: "incident.twilight.farmer_end", target: "ending_farmer" },
      { description: "incident.twilight.sage_mountain_end", target: "ending_sage_mountain" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_community", title: "events.twilight.community",
    descKey: "events.twilight.community.desc",
    message: "You give back to the community that shaped you. The circle completes. What you took, you now return multiplied.",
    apply(p) { p.charisma += 2; },
    children: [
      { description: "incident.twilight.servant_end", target: "ending_servant" },
      { description: "incident.twilight.merchant_end", target: "ending_merchant" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_power", title: "events.twilight.power",
    descKey: "events.twilight.power.desc",
    message: "You reach for political power. The machinery of influence grinds slowly but inevitably. You rise — but the view from the top is vertigo-inducing.",
    apply(p) { p.charisma += 2; p.strength += 1; },
    children: [
      { description: "incident.twilight.tyrant_end", target: "ending_tyrant" },
      { description: "incident.twilight.bureaucrat_end", target: "ending_bureaucrat" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_wealth", title: "events.twilight.wealth",
    descKey: "events.twilight.wealth.desc",
    message: "The final accumulation. Every coin a monument to your effort. But the counting brings less joy than it once did.",
    apply(p) { p.intelligence += 2; },
    children: [
      { description: "incident.twilight.miser_end", target: "ending_miser" },
      { description: "incident.twilight.fame_end", target: "ending_fame" },
      { description: "incident.twilight.destitute_end", target: "ending_destitute" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_revolutionary", title: "events.twilight.revolutionary",
    descKey: "events.twilight.revolutionary.desc",
    message: "You rally the desperate and the hopeful. The old order trembles. But revolutions eat their children.",
    apply(p) { p.charisma += 2; p.dexterity += 1; },
    children: [
      { description: "incident.twilight.prophet_end", target: "ending_prophet" },
      { description: "incident.twilight.war_end", target: "ending_war" },
      { description: "incident.twilight.sacrifice_end", target: "ending_sacrifice" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_reform", title: "events.twilight.reform",
    descKey: "events.twilight.reform.desc",
    message: "You face your victims. Some forgive. Some do not. Both responses are earned. The act of asking is the transformation.",
    apply(p) { p.charisma += 1; p.wisdom += 2; },
    children: [
      { description: "incident.twilight.reformed_end", target: "ending_reformed" },
      { description: "incident.twilight.letter_end", target: "ending_letter" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_help_others", title: "events.twilight.help_others",
    descKey: "events.twilight.help_others.desc",
    message: "You dedicate your remaining strength to others. The work is quiet, unglamorous, and deeply satisfying. Every small rescue redeems a piece of your past.",
    apply(p) { p.wisdom += 1; p.constitution += 2; },
    children: [
      { description: "incident.twilight.late_bloomer_end", target: "ending_late_bloomer" },
      { description: "incident.twilight.prisoner_end", target: "ending_prisoner" },
    ], theEnd: false,
  });

  /* ── Path entries ─────────────────────────────────── */
  new GenericIncident({
    name: "twilight_glory", title: "events.twilight.glory",
    descKey: "events.twilight.glory.desc",
    message: "You pursue a final triumph. The ambition that drove you through life burns brightest at the end. One last mountain to climb.",
    apply(p) { p.intelligence += 1; p.charisma += 1; },
    children: [
      { description: "incident.twilight.succeed_glory", target: "twilight_succeed" },
      { description: "incident.twilight.fail_glory", target: "twilight_fail" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_peace", title: "events.twilight.peace",
    descKey: "events.twilight.peace.desc",
    message: "You choose stillness. The frantic race is over. What remains is to savor what you have built and let go of what you have not.",
    apply(p) { p.wisdom += 2; },
    children: [
      { description: "incident.twilight.family_peace", target: "twilight_family" },
      { description: "incident.twilight.solitude", target: "twilight_solitude" },
      { description: "incident.twilight.community", target: "twilight_community" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_gamble", title: "events.twilight.gamble",
    descKey: "events.twilight.gamble.desc",
    message: "One more throw of the dice. The hunger never really left. Fortune favors the bold — or so you tell yourself.",
    apply(p) { p.intelligence += 1; p.wisdom -= 1; },
    children: [
      { description: "incident.twilight.power", target: "twilight_power" },
      { description: "incident.twilight.wealth", target: "twilight_wealth" },
      { description: "incident.twilight.revolution", target: "twilight_revolutionary" },
    ], theEnd: false,
  });
  new GenericIncident({
    name: "twilight_atone", title: "events.twilight.atone",
    descKey: "events.twilight.atone.desc",
    message: "You look back and see the faces of those you wronged. Redemption is a door that opens only from the inside. You reach for the handle.",
    apply(p) { p.wisdom += 3; },
    children: [
      { description: "incident.twilight.reform", target: "twilight_reform" },
      { description: "incident.twilight.help_others", target: "twilight_help_others" },
    ], theEnd: false,
  });

  /* ── Hub (scheduled turn 16) ─────────────────────── */
  new GenericIncident({
    name: "twilight_hub", title: "events.twilight.hub",
    descKey: "events.twilight.hub.desc",
    message: "The years have etched their story into your face. The end is no longer an abstract concept. How will you spend your remaining time?",
    apply(p) { p.wisdom += 1; },
    children: [
      { description: "incident.twilight.glory", target: "twilight_glory" },
      { description: "incident.twilight.peace", target: "twilight_peace" },
      { description: "incident.twilight.gamble", target: "twilight_gamble" },
      { description: "incident.twilight.atone", target: "twilight_atone" },
    ], theEnd: false, turn: 16,
  });

  /* ── Scheduled ────────────────────────────────────── */
  new GenericIncident({
    name: "twilight_reflection", title: "events.twilight.reflection",
    descKey: "events.twilight.reflection.desc",
    message: "You sit alone and review the ledger of your life. The columns do not balance — they never do. But the totals tell a story only you can read.",
    apply(p) { p.wisdom += 1; },
    children: [], theEnd: false, turn: 18,
  });
}
